+++
date= 2021-06-07T08:05:00Z
title = "Project Work 5 – Post-Processing"
[extra]
author = "Paul Stöwer"
+++

## Post-Processing


Post-proccesing of medical images is an important step when working with medical images. The images can be edited in different ways for better evaluation. For example, it can enhance specific properties of an image or adjust sources of error.
We already implemented some basic post-processing methods like subtraction, addition or rotation.

In the project report you should answer the following question:

* How is post-processing defined, and what are two (or more) examples for it?
* Which problems can be improved by your example applications?

## Multiplanar Reformation

In the beginning we want to change the orientation of our images. In some cases we only get images from one perspective. However, medical images are set in three different planes:


<img align="center"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Human_anatomy_planes%2C_labeled.svg/1280px-Human_anatomy_planes%2C_labeled.svg.png" width = "300" height =" 300">[Source](https://en.wikipedia.org/wiki/Transverse_plane)

We want to work for our post-processing task with a new data set. The data set contains images of a magnetic resonance angiography (MRA). You can download the full data set here:
[https://www.nitrc.org/projects/icbmmra](https://www.nitrc.org/projects/icbmmra) 

*Note: The data set is in the NIfTI (Neuroimaging Informatics Technology Initiative) format, which you need to convert into our .tif format. ImageJ has a Plugin for it, which you would need to install.*

You can also use one of the three already converted image sets:

* [Image set 1](https://faubox.rrze.uni-erlangen.de/getlink/fiEiBLTLYJYTcrRKXhqyt7BJ/Volume1)
* [Image set 2](https://faubox.rrze.uni-erlangen.de/getlink/fiXR5Rswri8h8bXwX4Cm313K/Volume2)
* [Image set 3](https://faubox.rrze.uni-erlangen.de/getlink/fi9rmMH2NvvcUgeMyaQsD6tq/Volume3)


The data set holds images of the head in just the transverse plane. We want to create a method which converts our image to the coronal and sagittal plane. Therefore, implement the following method in our `Volume` class:

```java

public static Volume MultiPlanarReformation(Volume transversalVolume, String direction)

```

The string `direction` should clarify if we want to convert to the coronal or sagittal plane. The method in general will build a new Volume in the converted plane. The most tricky part will be setting the right size for the dimensions of the converted volume:


<img align="center"  src="/plane_transform.png" width = "400" height ="250" >.

As you can see above we are running through our volume, taking all our pixel values in $x$ for $y=0$ and concatenating the vectors in our new image slice. In this case the sagittal plane. Therefore, our volume shape changes to (width, depth, height). Also be careful in which direction you fill the new image slices, so they don't end up upside down.

After the transformation we have three different image planes!


<table>
<tr>
<td><image align="center" src="/brain_axial.gif" ></td>
<td><image align="center" src="/brain_sagittal.gif" ></td>
<td><image align="center" src="/brain_coronal.gif" ></td>
</tr>
</table>

*Note: The reconstructed images might have some distortions in them. Can you improve it with an image filter? You might need to adjust the contrast via the ImageJ menu for a proper display of the new volume.*

*Additional Note: You might need to adjust the Contrast/Brightness of the Image via the ImageJ Menu to see the proper transformed Volume: Image->Adjust *

## Maximum Intensity Projection

We are now looking at a specific post-processing method called maximum intensity projection (MIP), which is an important method for magnetic resonance angiography.


If you scroll through the image sets, you will see bright spots in the different layers. However, we can not see the connected blood vessels in the brain.
That's where the MIP come into play. We are going to implement the following method in our `Volume` class:

```java

public static Image MaximumIntensityProjection(Volume volume)

```

The basic mechanism of the MIP is that we are creating a 2D image from our 3D Volume. We are only taking the maximum values of every slice and saving them into our resulting image. We are going through all our different slices and comparing our image values element by element and saving the highest pixel values in our resulting image:

<img align="center"  src="/mip_z.png"  >


If we scroll again through our MRA image set we see again only small white areas:

<image align="center" src="/brain_axial.gif" >


After we apply our MIP algorithm to all our different images planes we can see all the blood vessels from different perspectives!

<image align="center" src="/MaximimIntensityProjection.png" >


Explain in your project report:

* Explain the difference between MRA and normal MRI. When do we need to do a MRA scan?
* Why do we need a postprocessing method like MIP for this image technique?

Create your own pictures with the framework you are building for the project report.

This section should be half a page to one page long.

[Previous: k-Space](../projectiondomain)

[Next: Conclusion](../conclusion)








