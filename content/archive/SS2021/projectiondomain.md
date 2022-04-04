+++
date= 2021-06-07T08:04:00Z
title = "Project Work 4 – K-Space"
[extra]
author = "Paul Stöwer"
+++

## K-Space

Now that we have created our frequency domains for our MRI images, we want to learn more about this domain aka k-space!

In the project report you should explain the properties of the k-space:

* How is the k-space sampled from the input signal?
* How are points in k-space representing pixels in the resulting image?
* How are the frequencies organized in k-space?

Below are two videos which show how different parts of the k-space correspond to different regions and properties of the final MRI image.

* Construction from the center outward:

<image align="center" src="/rad_kspace.gif" >

[Courtesy by Brian Hargreaves From http://www-mrsrl.stanford.edu/~brian/mri-movies/kspace-outward.mov](http://www-mrsrl.stanford.edu/~brian/mri-movies/kspace-outward.mov)

* Construction from top to bottom:

<image align="center" src="/rect_kspace.gif" >

[Courtesy by Brian Hargreaves.
From http://www-mrsrl.stanford.edu/~brian/mri-movies/kspace-sequential.mov](http://www-mrsrl.stanford.edu/~brian/mri-movies/kspace-sequential.mov)


## Masking Up!

To visualize the properties of our k-space images we want to create different masks, which cover up parts of our k-spaces.
After applying the mask we will reconstruct the MRI image from our masked k-space image.


Create two types of masks in our `Projector` class. A radial mask, which has its origin in the middle of the image, regulates its size from 0-1 and can be inversed with a boolean:

```java

public static Image radialMask(int width, int height, String name, float size, boolean inverse)
```

Remember the formula of the circle: 
$$(x-center)^2 + (y-center)^2 = (radius*size)^2$$

The second mask should cover the image from top to bottom depending on the size parameter or the other way around if inverse is true.

```java

public static Image rectangleMask(int width, int height, String name, float size, boolean inverse)
```

The mask should look like this:

<table>
<tr>
<td><image align="center" src="/radMask.png" ></td>
 <td><image align="center" src="/rectMask.png" ></td>
</tr>
</table>

Now we can multiply our masks with our frequency domain images. We provided a function for you, which you need to add to the `Pojector` class:

```java
    public void filterMask(ImagePlus kspace_slice, Image mask){
        DisplayUtils.fftfilter(kspace_slice, mask);
    }

```

After applying the filter you can make an inverse Fourier transformation and see how your MRI image changes depending on the regions you are canceling out.
*Note: To look at the masked k space image you can call it with `show()` after applying the filter and then use the Menu in ImageJ: Process->FFT->Display Power Spectrum.*

Use at least two filtered images and their reconstruction for your report:
* Describe the filter and the canceled out regions in your kspace
* How does the reconstructions look like?
* Which filter types can you reproduce from the lecture and the exercises?

This section should be half a page to one page long.

[Previous: Projection](../projection)

[Next: Postprocessing](../postprocessing)


