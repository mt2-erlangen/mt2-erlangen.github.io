+++
date= 2020-06-01
title = "Exercise 6"

[extra]
author="Stephan Seitz"
+++


**Submission deadline: 29.06.20 23:55h**

In the last exercise, we want to have a look at edge detection and segmentation.

## Edge Detection
<P align=right> <i>7 Points</i>


Open a test image in a new file `src/main/java/exercise/Exercise06.java`.

```java
// Your name
// Team parnter name
package exercises;

import lme.DisplayUtils;
import mt.LinearImageFilter;

public class Exercise06 {
    public static void main(String[] args) {
	(new ij.ImageJ()).exitWhenQuitting(true);
	mt.Image pacemaker = lme.DisplayUtils.openImageFromInternet("https://mt2-erlangen.github.io/pacemaker.png", ".png");

    }
}
```

We will use the [Sobel Filter](https://en.wikipedia.org/wiki/Sobel_operator), to estimate gradient of the image.
The Sobel Filter uses two filter kernels. One to determine the x-component of the gradient and one for the y-component.

![Sobel](../sobel.png)

Create two `LinearImageFilter`s with those coeffients. You can use `filterX.setBuffer(new float[]{...})` to `setAtIndex` do that.
Filter the original image with both of them!

<table>
    <tr>
	<td><a href="../Edges_X.png" ><img align="center" src="../Edges_X.png" ></a></td>
	<td><a href="../Edges_Y.png" ><img align="center" src="../Edges_Y.png" ></a></td>
    </tr>
    <tr>
	<th>X component of gradient $\delta_x$</th>
	<th>Y component of gradient $\delta_y$</th>
    </tr>
</table>

You should now have two intermediate results that can be interpreted as the x-component $\delta_x$
and y-component $\delta_y$of the estimated gradient for each pixel.


Use those two images to calculate the norm of the gradient for each pixel!

$$ \left|\left| \nabla I \right|\right| =\left|\left| \left(\delta_x,\\ \delta_x \right) \right|\right| = \sqrt{ \delta_x^2 + \delta_y^2}$$


![Gradient](../Gradient_Magnitude.png)

Find a good threshold and set all gradient magnitude values to zero that are above this values and all other to `1.f` to
obtain an image like this with a clear segmentation in edge pixels and non-edge pixels.

![Gradient Segmented](../Gradient_Segmented.png)

## Segmentation

<P align=right> <i>3 Points</i>

![Breast Cancer](https://upload.wikimedia.org/wikipedia/commons/c/c4/Breast_cancer_cells.jpg)

<P align=right> <i>Source: Dr. Cecil Fox (Photographer)</i>

For the histologic examination of breast cancer samples a colored subtances called stain is used to enhance the constrast
of different portions of the tissue. Open the image in `Exercise06.main`.

```java
    mt.Image cells = lme.DisplayUtils.openImageFromInternet("https://upload.wikimedia.org/wikipedia/commons/c/c4/Breast_cancer_cells.jpg", ".jpg");
```
Use a suitable threshold to segment the individual sites with high contrast (0 background, 1 contrasted cells).
You can use one of method to overlay your segmentation with the original image.


![Breast Cancer](../color_segmentation.png)

```java
    // In lme.DisplayUtils
    public static void showSegmentedCells(mt.Image original, mt.Image segmented) 
```

<!--## Morphologic Operations-->

<!--<P align=right> <i>5 Bonus points</i>-->

<!--[>![Breast Cancer](../one_color.png)<]-->
<!--![Breast Cancer](../one_color.png)-->

