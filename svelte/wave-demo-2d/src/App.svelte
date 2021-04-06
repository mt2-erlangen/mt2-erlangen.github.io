<script>
	import { Canvas, Layer, t } from "svelte-canvas";
	import { writable } from "svelte/store";

	export let WIDTH = 250;
	export let HEIGHT = 250;
	export let MAX_K = 10;
	export let MAX_MAGNITUDE = 5;

	let coords = writable({ x: 50, y: 50 });
	let points = writable([]);
	let inScreen = false;
	let kx;
	let ky;
	let x;
	let y;
	let magnitude = 1.0;
	let isCos = true;

	coords.subscribe(coords => {
		x = coords.x;
		y = coords.y;
		kx = (coords.x / (1.0 * WIDTH) - 0.5) * MAX_K;
		ky = (coords.y / (1.0 * HEIGHT) - 0.5) * MAX_K;
	});

	$: renderKSpace = ({ context }) => {
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
	};

	$: renderCos = ({ context, width, height }) => {
		context.clearRect(0, 0, width, height);
		let id = context.getImageData(0, 0, width, height);
		let pixels = id.data;

		let offset = 0;
		for (let y = 0; y < height; ++y) {
			for (let x = 0; x < width; ++x) {
				let posX = (x * 1.0) / width - 0.5;
				let posY = (y * 1.0) / height - 0.5;
				let value =
					magnitude *
					(isCos
						? (Math.cos(2 * Math.PI * (kx * posX + ky * posY)) +
								0.5) *
						  255
						: (Math.sin(2 * Math.PI * (kx * posX + ky * posY)) +
								0.5) *
						  255);
				pixels[offset++] = value;
				pixels[offset++] = value;
				pixels[offset++] = value;
				pixels[offset++] = 255;
			}
		}
		context.putImageData(id, 0, 0);
	};
	$: renderTotal = ({ context, width, height }) => {
		context.clearRect(0, 0, width, height);
		let id = context.getImageData(0, 0, width, height);
		let pixels = id.data;
		let normFactor =
			1.0 /
			($points.reduce((acc, x) => acc + x.magnitude, 0.0) +
				(inScreen ? magnitude : 0) +
				1e-5);

		let offset = 0;
		for (let y = 0; y < height; ++y) {
			for (let x = 0; x < width; ++x) {
				let posX = (x * 1.0) / width - 0.5;
				let posY = (y * 1.0) / height - 0.5;
				let value = 0;
				if (inScreen) {
					value +=
						magnitude *
						(isCos
							? (Math.cos(2 * Math.PI * (kx * posX + ky * posY)) +
									0.5) *
							  255
							: (Math.sin(2 * Math.PI * (kx * posX + ky * posY)) +
									0.5) *
							  255);
				}
				$points.forEach(p => {
					let kx = (p.x / (1.0 * WIDTH) - 0.5) * MAX_K;
					let ky = (p.y / (1.0 * HEIGHT) - 0.5) * MAX_K;
					value +=
						p.magnitude *
						(p.isCos
							? (Math.cos(2 * Math.PI * (kx * posX + ky * posY)) +
									0.5) *
							  255
							: (Math.sin(2 * Math.PI * (kx * posX + ky * posY)) +
									0.5) *
							  255);
				});
				pixels[offset++] = value * normFactor;
				pixels[offset++] = value * normFactor;
				pixels[offset++] = value * normFactor;
				pixels[offset++] = 255;
			}
		}
		context.putImageData(id, 0, 0);
	};
</script>

<table
	on:wheel|preventDefault={e => (magnitude = Math.min(Math.max(magnitude + Math.sign(e.deltaY) * 0.1, 0), MAX_MAGNITUDE))}
	on:contextmenu|preventDefault={_ => (isCos = !isCos)}>
	<tr>
		<td>
			<Canvas
				width={WIDTH}
				margin={(0, 0, 0, 0)}
				height={HEIGHT}
				on:mouseup={e => {
					if (e.button == 0) {
						$points.push({
							x: $coords.x,
							y: $coords.y,
							magnitude,
							isCos
						});
					}
				}}
				on:mouseleave={_ => (inScreen = false)}
				on:mousemove={e => {
					coords.set({ x: e.clientX, y: e.clientY });
					inScreen = true;
				}}>
				<Layer render={renderKSpace} />
			</Canvas>
		</td>

		<td>
			<Canvas width={WIDTH} height={HEIGHT}>
				<Layer render={renderCos} />
			</Canvas>
		</td>
		<td>
			<Canvas width={WIDTH} height={HEIGHT}>
				<Layer render={renderTotal} />
			</Canvas>
		</td>
	</tr>
</table>
k = ({kx.toFixed(2)},
{ky.toFixed(2)})
<label>
	<h3>Magnitude ({magnitude.toFixed(3)})</h3>
	<input
		bind:value={magnitude}
		type="range"
		min="0"
		max={MAX_MAGNITUDE}
		step="0.01" />
</label>
<input type="checkbox" bind:checked={isCos} />
Cosine
<br />
<button on:mouseup={_ => ($points = [])}> Clear </button>
