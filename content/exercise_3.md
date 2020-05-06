+++
date= 2020-11-05
title = "Exercise 3"

[extra]
author="Stephan Seitz"
+++

**Submission deadline: 18.05.20 23:59h**

Please ensure that all files you created also contain **your name and your IDM ID** and also your partner's name and IDM ID if you're not working alone.

Each exercise has **10 points**. You have to achieve **30 of 60 points in six homework exercises** to pass the module.

# Images and Convolution

In this exercise we finally to work with images. It's time to update the file `src/main/java/lme/DisplayUtils.java` [to the newest version](https://github.com/mt2-erlangen/exercises-ss2020/blob/master/src/main/java/lme/DisplayUtils.java).

This should provide you the following methods to work with images:

```java
    // Open a file
    public static mt.Image openImage(String path) 

    // Save an image to a file
    public static void saveImage(mt.Image image, String path) 

    //  Show images
    public static void showImage(float[] buffer, String title, int width) 
    public static void showImage(float[] buffer, String title, long width, float[] origin, double spacing, boolean replaceWindowWithSameName)

```
They all work with the class `mt.Image` so let's create it!

## mt/Image.java

Our goal is to share as much code with our `mt.Signal` class. So `mt.Image` will be a subclass of `mt.Signal`.

```java
// <your name> <your idm>
// <your partner's name> <your partner's idm> (if you submit with a group partner)
package mt;

import lme.DisplayUtils;

public class Image extends Signal {


}
```

`mt.Image` has five members (apart from the ones inherited by `mt.Signal`).

```java
    // Dimensions of the image
    protected int width; 
    protected int height; 

    // Same as Signal.minIndex but for X and Y dimension
    protected int minIndexX;
    protected int minIndexY;

    // Where the top-left point of the image is located in physical space
    protected float[] origin = new float[] { 0, 0 };
```


And two constructors

```java
    // Create an image with given dimensions
    public Image(int width, int height, String name)

    // Create an image with given dimensions and also provide the content
    public Image(int width, int height, String name, float[] pixels)
```
As show in the exercise slides, we will store all the pixels in one array, like we did in `Signal`.
The array should have the size `width * height`.

**TODO: Nice image here. With width and height and buffer_size=width * height**

Call the constructors of the super class `Signal` in the constructors of `Image`.
You can call the constructor of a super class by placing `super(...)` with the respetive arguments in the first line of the constructor of the subclass.

Let's also provide some getters and setters!

```java
    // Image dimensions
    public int width()
    public int height()

    // Minimum and maximum indices (should work like Signal.minIndex/maxIndex)
    public int minIndexX()
    public int minIndexY()
    public int maxIndexX()
    public int maxIndexY()

    // Set position of top-left corner
    public void setOrigin(float x, float y)
    public float[] origin()
```

`atIndex` and `setAtIndex` should work like in `Signal` except that they now have two coordinate indices.
`minIndexX` should `maxIndexY` should be 0 for normal images.

```java
    public float atIndex(int x, int y)
    public void setAtIndex(int x, int y, float value) {
```

Add the method show to display the image
```java
    public void show() {
        DisplayUtils.showImage(buffer, name, width(), origin, spacing(), false);
    }
```

Next, implement the method shape both for `Signal` (`Signal.java`) and for `Image` (`Image.java`).

```java
    public long[] shape() // returns {width, height} for image and {buffer.length} for Signal
```

Open an image **TODO provide file**

## LinearFilter


```java
package mt;

public interface ImageFilter {
	default mt.Image apply(mt.Image image) {
		Image output = new Image(image.width(), image.height(), "Untitled");
		apply(image, output);
		return output;
	}

	default void apply(mt.Image input, mt.Image output) {
		throw new RuntimeException();
	}
}
```


 * Create Gauss filter

## Calculating with Images

* Signal.addNoise
* Image.minus

## Experiment

* Original Image
* Image with addNoise
* Gauss filtered
* 1 - Gauss filtered
