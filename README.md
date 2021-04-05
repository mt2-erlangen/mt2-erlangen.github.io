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

Execises
- [Exercise01](content/exercise_1.md)
- [Exercise02](content/exercise_2.md)
- [Exercise03](content/exercise_3.md)
- [Exercise04](content/exercise_4.md)
- [Exercise05](content/exercise_5.md)
- [Exercise06](content/exercise_6.md)

Project (2020)
- [Introduction](content/archive/2020/introduction.md)
- [Volume](content/archive/2020/volume.md)
- [Projection](content/archive/2020/projection.md)
- [Sinogram](content/archive/2020/sinogram.md)
- [Backprojection](content/archive/2020/backprojection.md)
- [Iterative Reconstruction and Conclusion](content/archive/2020/reconstruction.md)

## Rebuild Search Index 

https://github.com/mre/tinysearch

```bash
tinysearch --optimize --path static public/json/index.html
```
