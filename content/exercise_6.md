+++
date= 2021-05-31
title = "Exercise 6"

[extra]
author="Stephan Seitz"
+++


**Submission deadline: 13.06.20 23:55h**

In the last exercise, we want to have a look at edge detection and segmentation.

## Edge Detection
<P align=right> <i>7 Points</i>

First of all you need to update our [DisplayUtils](https://github.com/mt2-erlangen/exercises-ss2021/blob/main/src/main/java/lme/DisplayUtils.java) file from github.

Additionally we need to another function to our `Signal` class, which gives us the highest value of our signal:

```java
public float max() // Returns the highest value of our signal

```


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
	mt.Image cells = lme.DisplayUtils.openImageFromInternet("https://upload.wikimedia.org/wikipedia/commons/8/86/Emphysema_H_and_E.jpg", ".jpg");

    }
}
```

We will use the [Sobel Filter](https://en.wikipedia.org/wiki/Sobel_operator), to estimate the gradient of the image.
The Sobel Filter uses two filter kernels. One to estimate the x-component of the gradient and one for the y-component.

![Sobel](../sobel.png)

Create two `LinearImageFilter`s with those coeffients. You can use `filterX.setBuffer(new float[]{...})`
or `setAtIndex` to do that.
Filter the original image with both of them!

<table>
    <tr>
	<td><img src="/cell2_EdgesX.png" alt=""></td>
	<td><img src="/cell2_EdgesY.png" alt=""></td>
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


![Gradient](../cell2_GradientMagnitude.png)

Find a good threshold and set all gradient magnitude values to zero that are below this values and all other to `1.f` to
obtain an image like this with a clear segmentation in edge pixels and non-edge pixels. You can use your `max` function as a reference.

![Gradient Segmented](../cell2_GradientSegmented.png)

You can write your own helper functions for the tasks.

## Segmentation

<P align=right> <i>3 Points</i>

![cells](https://upload.wikimedia.org/wikipedia/commons/8/86/Emphysema_H_and_E.jpg)

<P align=right> <i>Source: https://commons.wikimedia.org/wiki/File:Emphysema_H_and_E.jpg (cc-by-2.0)</i>

For histologic examinations colored subtances called stains are used to enhance the constrast
of different portions of the tissue.

Use a suitable threshold to segment the individual sites with high contrast (0 background, 1 contrasted cells).
You can use the following method to overlay your segmentation with the original image.

```java
    // In lme.DisplayUtils
    public static void showSegmentedCells(mt.Image original, mt.Image segmented) 
    // You may also try `showSegmentedCells(cells, segmentation, true);` with the newest version of DisplayUtils
```


![cells](../SegmentationOnImageNoWatershed.png)

## Improving your Segmentation
*This is optional and not required for the exercise.
You might want to go directly to the evaluation of this year's exercises:
[https://forms.gle/EhzUoPx9s5Adk1G46](https://forms.gle/EhzUoPx9s5Adk1G46)*

You may notice that by just choosing a threshold you may not be able to separate each individual structure.

![cells](../cell2_segmented.png)

You can try out some operations from the menu *Process > Binary* while you have your 0/1 segmentation focused.
You have to convert to 8-bit first. E.g.

<!--There's a trick to improve your segmentation using [the watershed method](https://en.wikipedia.org/wiki/Watershed_%28image_processing%29). -->
<!--Click on the following menu items while displaying your 0/1 segmentation.-->

-  *Image > Type > 8-bit*
-  *Process > Binary > Watershed*

<!--![cells](./cell2_segmented_watershed.png)-->

Or "click" on menu items in your program code.

```java
    segmentation.show();
    IJ.run("8-bit");
    IJ.run("Watershed");
    DisplayUtils.showSegmentedCells(cells, segmentation);
```

![cells](../SegmentationOnImage.png)

## Evaluation

We redesigned the exercises from scratch for this semester.
Therefore, some of the exercises might have been difficult to understand or too much work. 
We are glad for your feedback to help future semesters' students😊:
[https://forms.gle/EhzUoPx9s5Adk1G46](https://forms.gle/EhzUoPx9s5Adk1G46)


## Submitting

Please ensure that all files you created also contain your name and your IDM ID and also your partner's name and IDM ID if you're not working alone.
You only need to submit the code. No need to submit answers to the questions in the text.

Then, compress your source code folder `src` to a zip archive (`src.zip`) and submit it via StudOn!

