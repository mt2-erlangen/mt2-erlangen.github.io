+++
date= 2021-06-07T08:03:00Z
title = "Project Work 3 – Projection"
[extra]
author = "Paul Stöwer"
+++


## Projections

In this part we will touch on the MRI image reconstruction. First we are going to look at how the magnetic fields in the MRI are acquiring the data from the physical volume.

In the project report you should answer the following questions:

* How do the magnetic fields of the MRI scanner excite matter in the body and how many fields does a scanner need?
* What are the specific tasks of the different magnetic fields?
* How do we get a signal from the MRI scanner and how is it stored?
* What is the difference between T1 and T2 imaging?

This section should all in all be about one page long.


In the report we are trying to explore the basic behavior of MRI imaging. The simplified steps to create an image from the scanner to an actual image can be seen below:

<table>
<tr>
<td><img align="center" src="/MRI_process.png" ></td>
</tr>
</table>


## Implementation

We organized image slices of MRI images to volumes in the previous part of the project already. As you can see above, the Fourier transform plays again a role in the image reconstruction. To get raw data we are reversing the image reconstruction process and creating our own frequency domain images. The frequency domain images will be called k-space images.

Due to properties of the frequency domain our k-space images will be not part of our `Image` class and will stay as `ImagePlus` objects from our ImageJ library. `ImagePlus` Objects can use many functions for different purposes: [https://imagej.nih.gov/ij/developer/api/ij/ij/ImagePlus.html](https://imagej.nih.gov/ij/developer/api/ij/ij/ImagePlus.html).

We added therefore already some ImagePlus features to our `Volume` class:

```java
protected ImagePlus [] kslices;
boolean kspace;
public ImagePlus getkSlice(int z)
```

Add an extra constructor if we have images from our frequency domain:

```java
public Volume(int width, int height, int depth, String name, boolean kspace)
```

In the next step we want to store our MRI images and the corresponding k-space images.
For this create a class `mt.Projector` in a file `src/main/java/mt/Projector.java`, which can hold both volume slices
and the k-space images.

```java
// Your name here <your idm>
package mt;

import java.util.stream.IntStream;

public class Projector {
    // Our volume
    private mt.Volume volume;
    // Our sinogram
    private mt.Volume kspace;

}
```

Implement a constructor for this class.


```java
    public Projector(mt.Volume projectionVolume, mt.Volume kspace) {
        ... // Implementation here
        assert kspace.depth() == volume.depth() : "Should have same amount of slices";
    }
```

Constructor and Setters/Getters:
```java
    public void setkSpace(Volume kspace)
    public Volume kspace()

    public void setVolume(Volume volume)
    public Volume volume()

```
In the MRI image constrcution process we are using an inverse Fourier Transform to build our image from k-space. Now we are transforming our MRI images with the Fourier Transform again into k-space. 

ImageJ provides us with the Fourier transform and also an inverse one. You can download the updated `DisplayUtils`for the function.

However, remember the formula of the Fourier transformation:

$$ F(u,v)= \int\limits_{-\infty}^{+\infty}\int\limits_{-\infty}^{+\infty} f(x,y) e^{-2\pi i(ux + vy)} \, dx\, dy\quad $$

And the inverse transform:

$$  f(x,y)=\int\limits_{-\infty}^{+\infty}\int\limits_{-\infty}^{+\infty} F(u,v) e^{2\pi i(ux + vy)} \, du\, dv\quad $$

Explain the Fourier transform in the project report using the formulas!

We will need to set up a new method in our image class which not only shows our transform, but also returns it. Add therefore the following methods to our `Image` class:

```java
    public static ImagePlus fft(Image image) {
        ImagePlus fft = DisplayUtils.fft(image.buffer(), image.name(), image.width(), image.origin(), /*spacing()*/ 1.0f);
        return fft;
    }

    public static Image inverse_fft(ImagePlus image) {
        var inv_fft = DisplayUtils.inversefft(image);
        return inv_fft;
    }
```

To build our Projector you can now run through your volume of MRI images and calculate the Fourier Transform of the image and after that store them in our k-Space Volumes. The method has a boolean which indicates if we're transforming forward or inverse. The method should be part of our `Volume` class:

```java
    public static Volume transform(Volume volume, boolean inverse)

```
After the transformation you can build a `Projector` object with the MRI and k-space volume.

You should now have your MRI volume and salso as a k-space volume!


<table>
<tr>
<td><image align="center" src="https://media.giphy.com/media/Ov5R3vGIvyXA8ia4BB/giphy.gif" ></td>
 <td><image align="center" src="https://media.giphy.com/media/f4FVUzT92S4gyYkUhJ/giphy.gif" ></td>
</tr>
</table>



[Previous: Volume](../volume) 

[Next: k-Space](../projectiondomain)



