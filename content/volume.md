+++
date= 2020-06-03
title = "Project Work – Volumes"

[extra]
author = "Stephan Seitz"
+++

# Getting started

**Important: You have to work alone on your project work. No team partners' allow anymore 😔!**

CT reconstruction treats the problem of recovering a three-dimensional volume from a set of X-ray images.
So we will need two classes that represent our volume and our stack of projections
It turns out that we can interpret our projects and our volume just as a list of 2-d images.

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

    public mt.Image getSlice(int z) 
    public void setSlice(int z, mt.Image slice)

    public float spacing()
    public String name()
    public float[] origin()
```


No comes the interstig part visualize the volume!
You will need the update [`src/main/java/lme/DisplayUtils.java`](https://github.com/mt2-erlangen/exercises-ss2020/blob/master/src/main/java/lme/DisplayUtils.java).

```java
    public void show() {
        lme.DisplayUtils.showVolume(this);
    }
```

You can download a volume from [the Cancer Imaging Archive].
Open the folder with the DICOM image in the main of a file `src/main/java/project/ProjectMain.java`


```java
// Your name <your idm>

package project;

import mt.Volume;

class ProjectMain {

    public static void main(String[] args) {
        (new ij.ImageJ()).exitWhenQuitting(true);
        
        Volume groundTruth = DisplayUtils.openDicomFolder("path/to/folder/with/dicoms");
        groundTruth.show();
        
    }

}

```

You can now scroll through the different slices.
<iframe src="https://giphy.com/embed/3o6gbenQcUjEGTaNfW" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/sloth-sloths-slothilda-3o6gbenQcUjEGTaNfW">via GIPHY</a></p>

Here a short summary of handy function of ImageJ when working with CT images.

- Ctrl+Shift+C: Brightness and Contrast
- Ctrl+Shift+H: Orthogonal Views (view volume from three sides)
- After selecting a line: Ctrl+K Line Plot
- Look at a [3-d rendering with ClearVolume](../clearvolume)

[Next: Forward Projection](../projection)
