+++
date= 2022-01-10T08:02:00Z
title = "Project Work 2 – Volumes"

[extra]
author = "Stephan Seitz"
+++

# Getting started

**Important: You have to work alone on your project work. No team partners allowed anymore 😔!**

MR reconstruction for a three-dimensional volume can be done with two different methods. We are using slice selection in this project.
So we will need one class that represents our volume of the MRI images.
It turns out that we can interpret our volume just as a list of 2-d images.

Explain in you report the method of slice selection:
* Which field of the MRI scanner is used to encode specific positions in the patient?
* How many of these fields exist and which directions do they cover?
* How is a specific slice selected?


<table>
<tr>
<td><img align="center" src="../volume_slices.png" ></td>
</tr>
<tr>
<th>A volume: very much just multiple images stacked one over another</th>
</tr>
</table>

Create a class `mt.Volume`

```java
// Your name <your idm>
// No team partner... So sad 😢!

package mt;

import java.util.Arrays;
import java.util.stream.IntStream;

public class Volume {
    // Here we store our images
    protected mt.Image[] slices;

    // Dimensions of our volume
    protected int width, height, depth;

    // Spacing and origin like for mt.Image
    protected float spacing = 1.f; // spacing is now our voxel size
    protected float[] origin = new float[]{0, 0, 0}; // position of the top-left-bottom corner

    // A name for the volume
    protected String name;

}
```

Create a constructor. Remember: `width`, `height`, `depth`, `name` must be set and `slices` must be created as an array.
We need `depth` images of size `width` $\times$ `height` for the `slices`.

```java
    public Volume(int width, int height, int depth, String name)
```

Getters/setters...
```java
    public int width()
    public int height()
    public int depth()
    public float physicalWidth() // width * spacing()
    public float physicalHeight() // height * spacing()
    public float physicalDepth() // depth * spacing()

    public mt.Image getSlice(int z) 
    public void setSlice(int z, mt.Image slice)

    public float spacing()
    public void setSpacing(float spacing) // should also set spacing also for all slices!
    public String name()
    public float[] origin()

    // should set origin to (-0.5 physicalWidth, -0.5 physicalHeight, -0.5 physicalDepth) and call centerOrigin on each slice
    public void centerOrigin()
```

We need also another setter Method in our `image` class:
```java
public void setSpacing(float spacing) // set spacing for the image

```

Now comes the interesting part: visualize the volume!
You will need to update [`src/main/java/lme/DisplayUtils.java`](https://github.com/mt2-erlangen/exercises-ss2020/blob/master/src/main/java/lme/DisplayUtils.java) file and use the following command to visualize the volume.

```java
    public void show() {
        lme.DisplayUtils.showVolume(this);
    }
```

We will work for our upcoming post-processing tasks with a magnetic resonance angiography (MRA) dataset. MRA is a special method in MRI to visualize vessels in images. You can download a volume from [https://www.nitrc.org/projects/icbmmra](https://www.nitrc.org/projects/icbmmra).

*Note: The data set is in the NIfTI (Neuroimaging Informatics Technology Initiative) format, which you need to convert into our .tif format. ImageJ has a Plugin for it, which you would need to install.*

You can also use one of the three already converted image sets:

* [Image set 1](https://faubox.rrze.uni-erlangen.de/getlink/fiEiBLTLYJYTcrRKXhqyt7BJ/Volume1)
* [Image set 2](https://faubox.rrze.uni-erlangen.de/getlink/fiXR5Rswri8h8bXwX4Cm313K/Volume2)
* [Image set 3](https://faubox.rrze.uni-erlangen.de/getlink/fi9rmMH2NvvcUgeMyaQsD6tq/Volume3)



Open the saved tiff file in the main of a file `src/main/java/project/Playground.java`:


```java

package project;

import mt.Volume;

class Playground {

    public static void main(String[] args) {
        (new ij.ImageJ()).exitWhenQuitting(true);
        
        Volume groundTruth = DisplayUtils.openVolume("path/to/file.tif");
        groundTruth.show();
        
    }

}

```

You can now scroll through the different slices.
<iframe src="https://giphy.com/embed/3o6gbenQcUjEGTaNfW" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/sloth-sloths-slothilda-3o6gbenQcUjEGTaNfW">via GIPHY</a></p>

Here a short summary of handy functions of ImageJ when working with MRI images.

- Ctrl+Shift+C: Brightness and Contrast
- Ctrl+Shift+H: Orthogonal Views (view volume from three sides)
- After selecting a line: Ctrl+K Line Plot
- Ctrl+I: Get patient information of a DICOM
- Look at a [3-d rendering with ClearVolume](../clearvolume)


[Previous: Introduction](../introduction) 

[Next: Post-Processing](../postprocessing)
