+++
date= 2020-06-03T08:02:00Z
title = "Project Work 2 – Volumes"

[extra]
author = "Stephan Seitz"
+++

# Getting started

**Important: You have to work alone on your project work. No team partners allowed anymore 😔!**

CT reconstruction treats the problem of recovering a three-dimensional volume from a set of X-ray images.
So we will need two classes that represent our volume and our stack of projections.
It turns out that we can interpret our projections and our volume just as a list of 2-d images.

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


No comes the interesting part: visualize the volume!
You will need the update [`src/main/java/lme/DisplayUtils.java`](https://github.com/mt2-erlangen/exercises-ss2020/blob/master/src/main/java/lme/DisplayUtils.java).

```java
    public void show() {
        lme.DisplayUtils.showVolume(this);
    }
```

You can download a volume from [the Cancer Imaging Archive](https://wiki.cancerimagingarchive.net/display/Public/RIDER+Lung+CT).
Use one of the folowing links.

- [Volume 1](https://services.cancerimagingarchive.net/services/v3/TCIA/query/getImage?SeriesInstanceUID=1.3.6.1.4.1.9328.50.1.152572901056058406211409536989510187742)
- [Volume 2](https://services.cancerimagingarchive.net/services/v3/TCIA/query/getImage?SeriesInstanceUID=1.3.6.1.4.1.9328.50.1.136792069117584747719409894247257396682)
- [Volume 3](https://services.cancerimagingarchive.net/services/v3/TCIA/query/getImage?SeriesInstanceUID=1.3.6.1.4.1.9328.50.1.245630263591502535745452645381329674063)

Unzip the folder and drag the whole folder onto a running ImageJ.
E.g. by creating a file `src/main/java/project/Playground.java`.


```java
// This file is only for you to experiment. We will not correct it.

package project;

import mt.Volume;

class Playground {

    public static void main(String[] args) {
        // Starts ImageJ
        (new ij.ImageJ()).exitWhenQuitting(true);

        // You can now use drag & drop to convert the downloaded folder into a *.tif file
        
    }

}

```

Save it the opened DICOM as a `*.tif` file (*File > Save As > Tiff...*).
There are more smaller test volumes on studOn.

<video controls loop width="700">
  <source src="../dicom_import_demo.webm" type="video/webm">
</video> 
<!--- [Volume 1](https://services.cancerimagingarchive.net/services/v3/TCIA/query/getImage?SeriesInstanceUID=1.3.6.1.4.1.14519.5.2.1.4320.5030.411911859032422710586149276741)-->
<!--- [Volume 2](https://services.cancerimagingarchive.net/services/v3/TCIA/query/getImage?SeriesInstanceUID=1.3.6.1.4.1.14519.5.2.1.4320.5030.300069571844254433153455037441)-->
<!--- [Volume 3](https://services.cancerimagingarchive.net/services/v3/TCIA/query/getImage?SeriesInstanceUID=1.3.6.1.4.1.14519.5.2.1.4320.5030.167938164374243671184910060739)-->


Open the saved tiff file in the main of a file `src/main/java/project/Playground.java`:


```java
// This file is only for you to experiment. We will not correct it.

package project;

import mt.Volume;

class Playground {

    public static void main(String[] args) {
        (new ij.ImageJ()).exitWhenQuitting(true);
        
        Volume groundTruth = DisplayUtils.openDicomFolder("path/to/file.tif");
        groundTruth.show();
        
    }

}

```

You can now scroll through the different slices.
<iframe src="https://giphy.com/embed/3o6gbenQcUjEGTaNfW" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/sloth-sloths-slothilda-3o6gbenQcUjEGTaNfW">via GIPHY</a></p>

Here a short summary of handy functions of ImageJ when working with CT images.

- Ctrl+Shift+C: Brightness and Contrast
- Ctrl+Shift+H: Orthogonal Views (view volume from three sides)
- After selecting a line: Ctrl+K Line Plot
- Ctrl+I: Get patient information of a DICOM
- Look at a [3-d rendering with ClearVolume](../clearvolume)

[Previous: Introduction](../introduction) 

[Next: Forward Projection](../projection)
