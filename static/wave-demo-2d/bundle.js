
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop$1() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop$1;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop$1;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            callbacks.slice().forEach(fn => fn(event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop$1,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop$1;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.37.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    // Adapted from https://github.com/hperrin/svelte-material-ui/blob/master/packages/common/forwardEvents.js

    // prettier-ignore
    const events = [
        'focus', 'blur',
        'fullscreenchange', 'fullscreenerror', 'scroll',
        'cut', 'copy', 'paste',
        'keydown', 'keypress', 'keyup',
        'auxclick', 'click', 'contextmenu', 'dblclick',
        'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup',
        'pointerlockchange', 'pointerlockerror', 'select', 'wheel',
        'drag', 'dragend', 'dragenter', 'dragstart', 'dragleave', 'dragover', 'drop',
        'touchcancel', 'touchend', 'touchmove', 'touchstart',
        'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 
        'gotpointercapture', 'lostpointercapture'
      ];

    function forwardEventsBuilder() {
      const component = current_component;

      return node => {
        const destructors = events.map(event =>
          listen(node, event, e => bubble(component, e))
        );

        return {
          destroy: () => destructors.forEach(destroy => destroy())
        };
      };
    }

    /* node_modules/svelte-canvas/src/Canvas.svelte generated by Svelte v3.37.0 */
    const file$1 = "node_modules/svelte-canvas/src/Canvas.svelte";

    function create_fragment$2(ctx) {
    	let canvas_1;
    	let canvas_1_style_value;
    	let canvas_1_width_value;
    	let canvas_1_height_value;
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);

    	const block = {
    		c: function create() {
    			canvas_1 = element("canvas");
    			t = space();
    			if (default_slot) default_slot.c();
    			attr_dev(canvas_1, "style", canvas_1_style_value = "width: " + /*width*/ ctx[1] + "px; height: " + /*height*/ ctx[2] + "px;" + (/*style*/ ctx[3] ? ` ${/*style*/ ctx[3]}` : ""));
    			attr_dev(canvas_1, "width", canvas_1_width_value = /*width*/ ctx[1] * /*pixelRatio*/ ctx[0]);
    			attr_dev(canvas_1, "height", canvas_1_height_value = /*height*/ ctx[2] * /*pixelRatio*/ ctx[0]);
    			attr_dev(canvas_1, "class", "svelte-o3oskp");
    			add_location(canvas_1, file$1, 111, 0, 2306);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, canvas_1, anchor);
    			/*canvas_1_binding*/ ctx[12](canvas_1);
    			insert_dev(target, t, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(/*forwardEvents*/ ctx[5].call(null, canvas_1));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*width, height, style*/ 14 && canvas_1_style_value !== (canvas_1_style_value = "width: " + /*width*/ ctx[1] + "px; height: " + /*height*/ ctx[2] + "px;" + (/*style*/ ctx[3] ? ` ${/*style*/ ctx[3]}` : ""))) {
    				attr_dev(canvas_1, "style", canvas_1_style_value);
    			}

    			if (!current || dirty & /*width, pixelRatio*/ 3 && canvas_1_width_value !== (canvas_1_width_value = /*width*/ ctx[1] * /*pixelRatio*/ ctx[0])) {
    				attr_dev(canvas_1, "width", canvas_1_width_value);
    			}

    			if (!current || dirty & /*height, pixelRatio*/ 5 && canvas_1_height_value !== (canvas_1_height_value = /*height*/ ctx[2] * /*pixelRatio*/ ctx[0])) {
    				attr_dev(canvas_1, "height", canvas_1_height_value);
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 1024) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[10], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(canvas_1);
    			/*canvas_1_binding*/ ctx[12](null);
    			if (detaching) detach_dev(t);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const KEY = {};

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Canvas", slots, ['default']);
    	const forwardEvents = forwardEventsBuilder();
    	let canvas, context;
    	let redrawNeeded = true, resizeNeeded = true, resortNeeded = true;
    	let setups = [], renderers = [], prioritized = [];

    	let { width = 640 } = $$props,
    		{ height = 640 } = $$props,
    		{ pixelRatio = undefined } = $$props,
    		{ style = null } = $$props,
    		{ autoclear = true } = $$props;

    	const getCanvas = () => canvas,
    		getContext = () => context,
    		redraw = () => redrawNeeded = true;

    	const resize = () => resizeNeeded = true, priorityChange = () => resortNeeded = true;

    	const draw = () => {
    		if (resizeNeeded) {
    			context.scale(pixelRatio, pixelRatio);
    			resizeNeeded = false;
    		}

    		if (resortNeeded) {
    			prioritized = renderers.map((renderer, i) => {
    				const rank = renderer.priority();
    				renderer.rank = rank || i - renderers.length;
    				return renderer;
    			}).sort((a, b) => a.rank - b.rank);

    			resortNeeded = false;
    		}

    		if (setups.length !== 0) {
    			for (let setup of setups) {
    				setup({ context, width, height });
    				setups.splice(setups.indexOf(setup), 1);
    			}

    			redrawNeeded = true;
    		}

    		if (redrawNeeded) {
    			if (autoclear) {
    				context.clearRect(0, 0, width, height);
    			}

    			for (let { render } of prioritized) {
    				render({ context, width, height });
    			}

    			redrawNeeded = false;
    		}

    		window.requestAnimationFrame(draw);
    	};

    	const register = ({ setup, renderer }) => {
    		if (setup) setups.push(setup);
    		renderers.push(renderer);

    		onDestroy(() => {
    			renderers.splice(renderers.indexOf(renderer), 1);
    			priorityChange();
    			redraw();
    		});
    	};

    	setContext(KEY, { register, redraw, priorityChange });

    	if (pixelRatio === undefined) {
    		if (typeof window === "undefined") {
    			pixelRatio = 2;
    		} else {
    			pixelRatio = window.devicePixelRatio;
    		}
    	}

    	onMount(() => {
    		context = canvas.getContext("2d");
    		draw();
    	});

    	const writable_props = ["width", "height", "pixelRatio", "style", "autoclear"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Canvas> was created with unknown prop '${key}'`);
    	});

    	function canvas_1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			canvas = $$value;
    			$$invalidate(4, canvas);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("width" in $$props) $$invalidate(1, width = $$props.width);
    		if ("height" in $$props) $$invalidate(2, height = $$props.height);
    		if ("pixelRatio" in $$props) $$invalidate(0, pixelRatio = $$props.pixelRatio);
    		if ("style" in $$props) $$invalidate(3, style = $$props.style);
    		if ("autoclear" in $$props) $$invalidate(6, autoclear = $$props.autoclear);
    		if ("$$scope" in $$props) $$invalidate(10, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		KEY,
    		onMount,
    		onDestroy,
    		setContext,
    		forwardEventsBuilder,
    		forwardEvents,
    		canvas,
    		context,
    		redrawNeeded,
    		resizeNeeded,
    		resortNeeded,
    		setups,
    		renderers,
    		prioritized,
    		width,
    		height,
    		pixelRatio,
    		style,
    		autoclear,
    		getCanvas,
    		getContext,
    		redraw,
    		resize,
    		priorityChange,
    		draw,
    		register
    	});

    	$$self.$inject_state = $$props => {
    		if ("canvas" in $$props) $$invalidate(4, canvas = $$props.canvas);
    		if ("context" in $$props) context = $$props.context;
    		if ("redrawNeeded" in $$props) redrawNeeded = $$props.redrawNeeded;
    		if ("resizeNeeded" in $$props) resizeNeeded = $$props.resizeNeeded;
    		if ("resortNeeded" in $$props) resortNeeded = $$props.resortNeeded;
    		if ("setups" in $$props) setups = $$props.setups;
    		if ("renderers" in $$props) renderers = $$props.renderers;
    		if ("prioritized" in $$props) prioritized = $$props.prioritized;
    		if ("width" in $$props) $$invalidate(1, width = $$props.width);
    		if ("height" in $$props) $$invalidate(2, height = $$props.height);
    		if ("pixelRatio" in $$props) $$invalidate(0, pixelRatio = $$props.pixelRatio);
    		if ("style" in $$props) $$invalidate(3, style = $$props.style);
    		if ("autoclear" in $$props) $$invalidate(6, autoclear = $$props.autoclear);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*width, height, pixelRatio, autoclear*/ 71) {
    			(resize(), redraw());
    		}
    	};

    	return [
    		pixelRatio,
    		width,
    		height,
    		style,
    		canvas,
    		forwardEvents,
    		autoclear,
    		getCanvas,
    		getContext,
    		redraw,
    		$$scope,
    		slots,
    		canvas_1_binding
    	];
    }

    class Canvas extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			width: 1,
    			height: 2,
    			pixelRatio: 0,
    			style: 3,
    			autoclear: 6,
    			getCanvas: 7,
    			getContext: 8,
    			redraw: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Canvas",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get width() {
    		throw new Error("<Canvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Canvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<Canvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Canvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pixelRatio() {
    		throw new Error("<Canvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pixelRatio(value) {
    		throw new Error("<Canvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Canvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Canvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autoclear() {
    		throw new Error("<Canvas>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autoclear(value) {
    		throw new Error("<Canvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getCanvas() {
    		return this.$$.ctx[7];
    	}

    	set getCanvas(value) {
    		throw new Error("<Canvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getContext() {
    		return this.$$.ctx[8];
    	}

    	set getContext(value) {
    		throw new Error("<Canvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get redraw() {
    		return this.$$.ctx[9];
    	}

    	set redraw(value) {
    		throw new Error("<Canvas>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-canvas/src/Layer.svelte generated by Svelte v3.37.0 */

    const { Error: Error_1 } = globals;

    function create_fragment$1(ctx) {
    	const block = {
    		c: noop$1,
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop$1,
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: noop$1
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Layer", slots, []);
    	const { register, redraw, priorityChange } = getContext(KEY);

    	let { setup = undefined } = $$props,
    		{ render = () => {
    			
    		} } = $$props,
    		{ priority = undefined } = $$props;

    	if (typeof setup !== "function" && setup !== undefined) {
    		throw new Error("setup must be a function");
    	}

    	if (typeof render !== "function") {
    		throw new Error("render must be a function");
    	}

    	if (priority && (!Number.isInteger(priority) || priority <= 0)) {
    		throw new Error("priority must be a positive integer");
    	}

    	register({
    		setup,
    		renderer: { render, priority: () => priority }
    	});

    	const writable_props = ["setup", "render", "priority"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Layer> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("setup" in $$props) $$invalidate(0, setup = $$props.setup);
    		if ("render" in $$props) $$invalidate(1, render = $$props.render);
    		if ("priority" in $$props) $$invalidate(2, priority = $$props.priority);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		KEY,
    		register,
    		redraw,
    		priorityChange,
    		setup,
    		render,
    		priority
    	});

    	$$self.$inject_state = $$props => {
    		if ("setup" in $$props) $$invalidate(0, setup = $$props.setup);
    		if ("render" in $$props) $$invalidate(1, render = $$props.render);
    		if ("priority" in $$props) $$invalidate(2, priority = $$props.priority);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*priority*/ 4) {
    			(priorityChange());
    		}

    		if ($$self.$$.dirty & /*priority, render*/ 6) {
    			(redraw());
    		}
    	};

    	return [setup, render, priority];
    }

    class Layer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { setup: 0, render: 1, priority: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Layer",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get setup() {
    		throw new Error_1("<Layer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set setup(value) {
    		throw new Error_1("<Layer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get render() {
    		throw new Error_1("<Layer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set render(value) {
    		throw new Error_1("<Layer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get priority() {
    		throw new Error_1("<Layer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set priority(value) {
    		throw new Error_1("<Layer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop$1) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop$1) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop$1;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    let frame;

    const now = Date.now();

    function start(set) {
      set(Date.now() - now);

      frame = window.requestAnimationFrame(() => start(set));
      return () => window.cancelAnimationFrame(frame);
    }

    function noop() {}

    var t = readable(
      Date.now() - now,
      typeof window === 'undefined' ? noop : start
    );

    /* src/App.svelte generated by Svelte v3.37.0 */
    const file = "src/App.svelte";

    // (126:3) <Canvas     width={WIDTH}     margin={(0, 0, 0, 0)}     height={HEIGHT}     on:mouseup={e => {      if (e.button == 0) {       $points.push({        x: $coords.x,        y: $coords.y,        magnitude,        isCos       });      }     }}     on:mouseleave={_ => (inScreen = false)}     on:mousemove={e => {      const rect = e.currentTarget.getBoundingClientRect();      coords.set({       x: e.clientX - rect.x,       y: e.clientY - rect.y      });      inScreen = true;     }}>
    function create_default_slot_2(ctx) {
    	let layer;
    	let current;

    	layer = new Layer({
    			props: { render: /*renderKSpace*/ ctx[10] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(layer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const layer_changes = {};
    			if (dirty & /*renderKSpace*/ 1024) layer_changes.render = /*renderKSpace*/ ctx[10];
    			layer.$set(layer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(126:3) <Canvas     width={WIDTH}     margin={(0, 0, 0, 0)}     height={HEIGHT}     on:mouseup={e => {      if (e.button == 0) {       $points.push({        x: $coords.x,        y: $coords.y,        magnitude,        isCos       });      }     }}     on:mouseleave={_ => (inScreen = false)}     on:mousemove={e => {      const rect = e.currentTarget.getBoundingClientRect();      coords.set({       x: e.clientX - rect.x,       y: e.clientY - rect.y      });      inScreen = true;     }}>",
    		ctx
    	});

    	return block;
    }

    // (154:3) <Canvas width={WIDTH} height={HEIGHT}>
    function create_default_slot_1(ctx) {
    	let layer;
    	let current;

    	layer = new Layer({
    			props: { render: /*renderCos*/ ctx[11] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(layer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const layer_changes = {};
    			if (dirty & /*renderCos*/ 2048) layer_changes.render = /*renderCos*/ ctx[11];
    			layer.$set(layer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(154:3) <Canvas width={WIDTH} height={HEIGHT}>",
    		ctx
    	});

    	return block;
    }

    // (159:3) <Canvas width={WIDTH} height={HEIGHT}>
    function create_default_slot(ctx) {
    	let layer;
    	let current;

    	layer = new Layer({
    			props: { render: /*renderTotal*/ ctx[12] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(layer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const layer_changes = {};
    			if (dirty & /*renderTotal*/ 4096) layer_changes.render = /*renderTotal*/ ctx[12];
    			layer.$set(layer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(159:3) <Canvas width={WIDTH} height={HEIGHT}>",
    		ctx
    	});

    	return block;
    }

    // (167:43) {:else}
    function create_else_block(ctx) {
    	let t_1;

    	const block = {
    		c: function create() {
    			t_1 = text("sin");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t_1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(167:43) {:else}",
    		ctx
    	});

    	return block;
    }

    // (167:32) {#if ok}
    function create_if_block(ctx) {
    	let t_1;

    	const block = {
    		c: function create() {
    			t_1 = text("cos");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t_1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(167:32) {#if ok}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let table;
    	let tr0;
    	let td0;
    	let canvas0;
    	let t0;
    	let td1;
    	let canvas1;
    	let t1;
    	let td2;
    	let canvas2;
    	let t2;
    	let tr1;
    	let td3;
    	let t3;
    	let t4_value = /*kx*/ ctx[4].toFixed(2) + "";
    	let t4;
    	let t5;
    	let t6_value = /*ky*/ ctx[5].toFixed(2) + "";
    	let t6;
    	let t7;
    	let t8;
    	let td4;
    	let t9_value = /*magnitude*/ ctx[6].toFixed(2) + "";
    	let t9;
    	let t10;
    	let t11;
    	let t12;
    	let td5;
    	let t13;
    	let label;
    	let h3;
    	let t14;
    	let t15_value = /*magnitude*/ ctx[6].toFixed(3) + "";
    	let t15;
    	let t16;
    	let t17;
    	let input0;
    	let t18;
    	let input1;
    	let t19;
    	let br;
    	let t20;
    	let button;
    	let current;
    	let mounted;
    	let dispose;

    	canvas0 = new Canvas({
    			props: {
    				width: /*WIDTH*/ ctx[0],
    				margin: (0),
    				height: /*HEIGHT*/ ctx[1],
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	canvas0.$on("mouseup", /*mouseup_handler*/ ctx[19]);
    	canvas0.$on("mouseleave", /*mouseleave_handler*/ ctx[20]);
    	canvas0.$on("mousemove", /*mousemove_handler*/ ctx[21]);

    	canvas1 = new Canvas({
    			props: {
    				width: /*WIDTH*/ ctx[0],
    				height: /*HEIGHT*/ ctx[1],
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	canvas2 = new Canvas({
    			props: {
    				width: /*WIDTH*/ ctx[0],
    				height: /*HEIGHT*/ ctx[1],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function select_block_type(ctx, dirty) {
    		if (/*ok*/ ctx[9]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			table = element("table");
    			tr0 = element("tr");
    			td0 = element("td");
    			create_component(canvas0.$$.fragment);
    			t0 = space();
    			td1 = element("td");
    			create_component(canvas1.$$.fragment);
    			t1 = space();
    			td2 = element("td");
    			create_component(canvas2.$$.fragment);
    			t2 = space();
    			tr1 = element("tr");
    			td3 = element("td");
    			t3 = text("$k = ($");
    			t4 = text(t4_value);
    			t5 = text(" $,$ ");
    			t6 = text(t6_value);
    			t7 = text(" $)$");
    			t8 = space();
    			td4 = element("td");
    			t9 = text(t9_value);
    			t10 = text("$\\cdot$");
    			if_block.c();
    			t11 = text("\n\t\t\t$\\left(\\langle k,x\\rangle\\cdot 2 \\pi\\right)$");
    			t12 = space();
    			td5 = element("td");
    			t13 = space();
    			label = element("label");
    			h3 = element("h3");
    			t14 = text("Magnitude (");
    			t15 = text(t15_value);
    			t16 = text(")");
    			t17 = space();
    			input0 = element("input");
    			t18 = space();
    			input1 = element("input");
    			t19 = text("\nCosine\n");
    			br = element("br");
    			t20 = space();
    			button = element("button");
    			button.textContent = "Clear";
    			add_location(td0, file, 124, 2, 3228);
    			add_location(td1, file, 152, 2, 3777);
    			add_location(td2, file, 157, 2, 3880);
    			add_location(tr0, file, 123, 1, 3221);
    			add_location(td3, file, 164, 2, 3998);
    			add_location(td4, file, 165, 2, 4056);
    			add_location(td5, file, 170, 2, 4179);
    			add_location(tr1, file, 163, 1, 3991);
    			add_location(table, file, 120, 0, 3035);
    			add_location(h3, file, 175, 1, 4212);
    			attr_dev(input0, "type", "range");
    			attr_dev(input0, "min", "0");
    			attr_dev(input0, "max", /*MAX_MAGNITUDE*/ ctx[2]);
    			attr_dev(input0, "step", "0.01");
    			add_location(input0, file, 176, 1, 4257);
    			add_location(label, file, 174, 0, 4203);
    			attr_dev(input1, "type", "checkbox");
    			add_location(input1, file, 183, 0, 4362);
    			add_location(br, file, 185, 0, 4416);
    			add_location(button, file, 186, 0, 4423);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);
    			append_dev(table, tr0);
    			append_dev(tr0, td0);
    			mount_component(canvas0, td0, null);
    			append_dev(tr0, t0);
    			append_dev(tr0, td1);
    			mount_component(canvas1, td1, null);
    			append_dev(tr0, t1);
    			append_dev(tr0, td2);
    			mount_component(canvas2, td2, null);
    			append_dev(table, t2);
    			append_dev(table, tr1);
    			append_dev(tr1, td3);
    			append_dev(td3, t3);
    			append_dev(td3, t4);
    			append_dev(td3, t5);
    			append_dev(td3, t6);
    			append_dev(td3, t7);
    			append_dev(tr1, t8);
    			append_dev(tr1, td4);
    			append_dev(td4, t9);
    			append_dev(td4, t10);
    			if_block.m(td4, null);
    			append_dev(td4, t11);
    			append_dev(tr1, t12);
    			append_dev(tr1, td5);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, label, anchor);
    			append_dev(label, h3);
    			append_dev(h3, t14);
    			append_dev(h3, t15);
    			append_dev(h3, t16);
    			append_dev(label, t17);
    			append_dev(label, input0);
    			set_input_value(input0, /*magnitude*/ ctx[6]);
    			insert_dev(target, t18, anchor);
    			insert_dev(target, input1, anchor);
    			input1.checked = /*isCos*/ ctx[7];
    			insert_dev(target, t19, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t20, anchor);
    			insert_dev(target, button, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(table, "wheel", prevent_default(/*wheel_handler*/ ctx[22]), false, true, false),
    					listen_dev(table, "contextmenu", prevent_default(/*contextmenu_handler*/ ctx[23]), false, true, false),
    					listen_dev(input0, "change", /*input0_change_input_handler*/ ctx[24]),
    					listen_dev(input0, "input", /*input0_change_input_handler*/ ctx[24]),
    					listen_dev(input1, "change", /*input1_change_handler*/ ctx[25]),
    					listen_dev(button, "mouseup", /*mouseup_handler_1*/ ctx[26], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const canvas0_changes = {};
    			if (dirty & /*WIDTH*/ 1) canvas0_changes.width = /*WIDTH*/ ctx[0];
    			if (dirty & /*HEIGHT*/ 2) canvas0_changes.height = /*HEIGHT*/ ctx[1];

    			if (dirty & /*$$scope, renderKSpace*/ 268436480) {
    				canvas0_changes.$$scope = { dirty, ctx };
    			}

    			canvas0.$set(canvas0_changes);
    			const canvas1_changes = {};
    			if (dirty & /*WIDTH*/ 1) canvas1_changes.width = /*WIDTH*/ ctx[0];
    			if (dirty & /*HEIGHT*/ 2) canvas1_changes.height = /*HEIGHT*/ ctx[1];

    			if (dirty & /*$$scope, renderCos*/ 268437504) {
    				canvas1_changes.$$scope = { dirty, ctx };
    			}

    			canvas1.$set(canvas1_changes);
    			const canvas2_changes = {};
    			if (dirty & /*WIDTH*/ 1) canvas2_changes.width = /*WIDTH*/ ctx[0];
    			if (dirty & /*HEIGHT*/ 2) canvas2_changes.height = /*HEIGHT*/ ctx[1];

    			if (dirty & /*$$scope, renderTotal*/ 268439552) {
    				canvas2_changes.$$scope = { dirty, ctx };
    			}

    			canvas2.$set(canvas2_changes);
    			if ((!current || dirty & /*kx*/ 16) && t4_value !== (t4_value = /*kx*/ ctx[4].toFixed(2) + "")) set_data_dev(t4, t4_value);
    			if ((!current || dirty & /*ky*/ 32) && t6_value !== (t6_value = /*ky*/ ctx[5].toFixed(2) + "")) set_data_dev(t6, t6_value);
    			if ((!current || dirty & /*magnitude*/ 64) && t9_value !== (t9_value = /*magnitude*/ ctx[6].toFixed(2) + "")) set_data_dev(t9, t9_value);

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(td4, t11);
    				}
    			}

    			if ((!current || dirty & /*magnitude*/ 64) && t15_value !== (t15_value = /*magnitude*/ ctx[6].toFixed(3) + "")) set_data_dev(t15, t15_value);

    			if (!current || dirty & /*MAX_MAGNITUDE*/ 4) {
    				attr_dev(input0, "max", /*MAX_MAGNITUDE*/ ctx[2]);
    			}

    			if (dirty & /*magnitude*/ 64) {
    				set_input_value(input0, /*magnitude*/ ctx[6]);
    			}

    			if (dirty & /*isCos*/ 128) {
    				input1.checked = /*isCos*/ ctx[7];
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(canvas0.$$.fragment, local);
    			transition_in(canvas1.$$.fragment, local);
    			transition_in(canvas2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(canvas0.$$.fragment, local);
    			transition_out(canvas1.$$.fragment, local);
    			transition_out(canvas2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    			destroy_component(canvas0);
    			destroy_component(canvas1);
    			destroy_component(canvas2);
    			if_block.d();
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(label);
    			if (detaching) detach_dev(t18);
    			if (detaching) detach_dev(input1);
    			if (detaching) detach_dev(t19);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t20);
    			if (detaching) detach_dev(button);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let ok;
    	let lol;
    	let renderKSpace;
    	let renderCos;
    	let renderTotal;
    	let $points;
    	let $coords;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let { WIDTH = 250 } = $$props;
    	let { HEIGHT = 250 } = $$props;
    	let { MAX_K = 10 } = $$props;
    	let { MAX_MAGNITUDE = 5 } = $$props;
    	let coords = writable({ x: 50, y: 50 });
    	validate_store(coords, "coords");
    	component_subscribe($$self, coords, value => $$invalidate(13, $coords = value));
    	let points = writable([]);
    	validate_store(points, "points");
    	component_subscribe($$self, points, value => $$invalidate(8, $points = value));
    	let inScreen = false;
    	let kx;
    	let ky;
    	let x;
    	let y;
    	let magnitude = 1;
    	let isCos = writable(true);

    	coords.subscribe(coords => {
    		$$invalidate(17, x = coords.x);
    		$$invalidate(18, y = coords.y);
    		$$invalidate(4, kx = (coords.x / (1 * WIDTH) - 0.5) * MAX_K);
    		$$invalidate(5, ky = (coords.y / (1 * HEIGHT) - 0.5) * MAX_K);
    	});

    	const writable_props = ["WIDTH", "HEIGHT", "MAX_K", "MAX_MAGNITUDE"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const mouseup_handler = e => {
    		if (e.button == 0) {
    			$points.push({
    				x: $coords.x,
    				y: $coords.y,
    				magnitude,
    				isCos
    			});
    		}
    	};

    	const mouseleave_handler = _ => $$invalidate(3, inScreen = false);

    	const mousemove_handler = e => {
    		const rect = e.currentTarget.getBoundingClientRect();

    		coords.set({
    			x: e.clientX - rect.x,
    			y: e.clientY - rect.y
    		});

    		$$invalidate(3, inScreen = true);
    	};

    	const wheel_handler = e => $$invalidate(6, magnitude = Math.min(Math.max(magnitude + Math.sign(e.deltaY) * 0.1, 0), MAX_MAGNITUDE));
    	const contextmenu_handler = _ => $$invalidate(7, isCos = !isCos);

    	function input0_change_input_handler() {
    		magnitude = to_number(this.value);
    		$$invalidate(6, magnitude);
    	}

    	function input1_change_handler() {
    		isCos = this.checked;
    		$$invalidate(7, isCos);
    	}

    	const mouseup_handler_1 = _ => set_store_value(points, $points = [], $points);

    	$$self.$$set = $$props => {
    		if ("WIDTH" in $$props) $$invalidate(0, WIDTH = $$props.WIDTH);
    		if ("HEIGHT" in $$props) $$invalidate(1, HEIGHT = $$props.HEIGHT);
    		if ("MAX_K" in $$props) $$invalidate(16, MAX_K = $$props.MAX_K);
    		if ("MAX_MAGNITUDE" in $$props) $$invalidate(2, MAX_MAGNITUDE = $$props.MAX_MAGNITUDE);
    	};

    	$$self.$capture_state = () => ({
    		Canvas,
    		Layer,
    		t,
    		writable,
    		WIDTH,
    		HEIGHT,
    		MAX_K,
    		MAX_MAGNITUDE,
    		coords,
    		points,
    		inScreen,
    		kx,
    		ky,
    		x,
    		y,
    		magnitude,
    		isCos,
    		ok,
    		lol,
    		renderKSpace,
    		$points,
    		renderCos,
    		renderTotal,
    		$coords
    	});

    	$$self.$inject_state = $$props => {
    		if ("WIDTH" in $$props) $$invalidate(0, WIDTH = $$props.WIDTH);
    		if ("HEIGHT" in $$props) $$invalidate(1, HEIGHT = $$props.HEIGHT);
    		if ("MAX_K" in $$props) $$invalidate(16, MAX_K = $$props.MAX_K);
    		if ("MAX_MAGNITUDE" in $$props) $$invalidate(2, MAX_MAGNITUDE = $$props.MAX_MAGNITUDE);
    		if ("coords" in $$props) $$invalidate(14, coords = $$props.coords);
    		if ("points" in $$props) $$invalidate(15, points = $$props.points);
    		if ("inScreen" in $$props) $$invalidate(3, inScreen = $$props.inScreen);
    		if ("kx" in $$props) $$invalidate(4, kx = $$props.kx);
    		if ("ky" in $$props) $$invalidate(5, ky = $$props.ky);
    		if ("x" in $$props) $$invalidate(17, x = $$props.x);
    		if ("y" in $$props) $$invalidate(18, y = $$props.y);
    		if ("magnitude" in $$props) $$invalidate(6, magnitude = $$props.magnitude);
    		if ("isCos" in $$props) $$invalidate(7, isCos = $$props.isCos);
    		if ("ok" in $$props) $$invalidate(9, ok = $$props.ok);
    		if ("lol" in $$props) lol = $$props.lol;
    		if ("renderKSpace" in $$props) $$invalidate(10, renderKSpace = $$props.renderKSpace);
    		if ("renderCos" in $$props) $$invalidate(11, renderCos = $$props.renderCos);
    		if ("renderTotal" in $$props) $$invalidate(12, renderTotal = $$props.renderTotal);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*isCos*/ 128) {
    			$$invalidate(9, ok = isCos);
    		}

    		if ($$self.$$.dirty & /*magnitude, isCos, kx, ky*/ 240) {
    			$$invalidate(11, renderCos = ({ context, width, height }) => {
    				context.clearRect(0, 0, width, height);
    				let id = context.getImageData(0, 0, width, height);
    				let pixels = id.data;
    				let offset = 0;

    				for (let y = 0; y < height; ++y) {
    					for (let x = 0; x < width; ++x) {
    						let posX = x * 1 / width - 0.5;
    						let posY = y * 1 / height - 0.5;

    						let value = magnitude * (isCos
    						? (Math.cos(2 * Math.PI * (kx * posX + ky * posY)) + 0.5) * 255
    						: (Math.sin(2 * Math.PI * (kx * posX + ky * posY)) + 0.5) * 255);

    						pixels[offset++] = value;
    						pixels[offset++] = value;
    						pixels[offset++] = value;
    						pixels[offset++] = 255;
    					}
    				}

    				context.putImageData(id, 0, 0);
    			});
    		}

    		if ($$self.$$.dirty & /*$points, inScreen, magnitude, isCos, kx, ky, WIDTH, MAX_K, HEIGHT*/ 66043) {
    			$$invalidate(12, renderTotal = ({ context, width, height }) => {
    				context.clearRect(0, 0, width, height);
    				let id = context.getImageData(0, 0, width, height);
    				let pixels = id.data;
    				let normFactor = 1 / ($points.reduce((acc, x) => acc + x.magnitude, 0) + (inScreen ? magnitude : 0) + 0.00001);
    				let offset = 0;

    				for (let y = 0; y < height; ++y) {
    					for (let x = 0; x < width; ++x) {
    						let posX = x * 1 / width - 0.5;
    						let posY = y * 1 / height - 0.5;
    						let value = 0;

    						if (inScreen) {
    							value += magnitude * (isCos
    							? (Math.cos(2 * Math.PI * (kx * posX + ky * posY)) + 0.5) * 255
    							: (Math.sin(2 * Math.PI * (kx * posX + ky * posY)) + 0.5) * 255);
    						}

    						$points.forEach(p => {
    							let kx = (p.x / (1 * WIDTH) - 0.5) * MAX_K;
    							let ky = (p.y / (1 * HEIGHT) - 0.5) * MAX_K;

    							value += p.magnitude * (p.isCos
    							? (Math.cos(2 * Math.PI * (kx * posX + ky * posY)) + 0.5) * 255
    							: (Math.sin(2 * Math.PI * (kx * posX + ky * posY)) + 0.5) * 255);
    						});

    						pixels[offset++] = value * normFactor;
    						pixels[offset++] = value * normFactor;
    						pixels[offset++] = value * normFactor;
    						pixels[offset++] = 255;
    					}
    				}

    				context.putImageData(id, 0, 0);
    			});
    		}

    		if ($$self.$$.dirty & /*$points, inScreen, isCos, x, y, magnitude*/ 393672) {
    			$$invalidate(10, renderKSpace = ({ context }) => {
    				$points.forEach(p => {
    					context.fillStyle = p.isCos ? "blue" : "red";
    					context.beginPath();
    					context.arc(p.x, p.y, p.magnitude * 5, 0, 2 * Math.PI);
    					context.fill();
    				});

    				if (inScreen) {
    					context.fillStyle = isCos ? "blue" : "red";
    					context.beginPath();
    					context.arc(x, y, magnitude * 5, 0, 2 * Math.PI);
    					context.fill();
    				}
    			});
    		}
    	};

    	lol = points;

    	return [
    		WIDTH,
    		HEIGHT,
    		MAX_MAGNITUDE,
    		inScreen,
    		kx,
    		ky,
    		magnitude,
    		isCos,
    		$points,
    		ok,
    		renderKSpace,
    		renderCos,
    		renderTotal,
    		$coords,
    		coords,
    		points,
    		MAX_K,
    		x,
    		y,
    		mouseup_handler,
    		mouseleave_handler,
    		mousemove_handler,
    		wheel_handler,
    		contextmenu_handler,
    		input0_change_input_handler,
    		input1_change_handler,
    		mouseup_handler_1
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			WIDTH: 0,
    			HEIGHT: 1,
    			MAX_K: 16,
    			MAX_MAGNITUDE: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get WIDTH() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set WIDTH(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get HEIGHT() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set HEIGHT(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get MAX_K() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set MAX_K(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get MAX_MAGNITUDE() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set MAX_MAGNITUDE(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    let div = document.querySelector('#wave-demo-2d');
    const app = div && new App({
    	target: div,
    	props: {
    	},
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
