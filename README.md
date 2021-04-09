Website for Medizintechnik II exercises: https://mt2-erlangen.github.io/

Either install [zola](https://www.getzola.org/documentation/getting-started/installation/) and run

```bash
zola serve
```

or just look into the contents of [`content`](content).

You can also edit the contents of the markdown file using Gitlab's/Github's web ui.

**Be sure to clone with submodules (to clone with the theme folder)!**

## Import Instructions

- [Eclipse](content/import_eclipse/_index.md)
- [IntelliJ](content/import_intellij/_index.md)

## Content

- [2021](content)
- [2020](content/archive/2020)

## Rebuild Search Index 

https://github.com/mre/tinysearch

```bash
tinysearch --optimize --path static public/json/index.html
```
