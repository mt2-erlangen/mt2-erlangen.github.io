+++
date= 2020-06-03T08:05:00Z
title = "Project Work 5 – Backprojection"

[extra]
author = "Stephan Seitz"
+++


## Backprojection

I we have a look at the sinogram values corresponding to one detector position we get some information about the projected object.
For instance, we can se the profile of the projected circle in the following image.

![sinogram](../sinogram.png)

However, if we have no access to the original volume slice we can not tell anything about the distance of the object to the detector.
All the following situations would generate the same projection!


![sinogram](../sinogram.png)
**TODO**

So apparently, we get some information in the direction of the detector plane, but all information orthogonal to the detector plane
is lost.
So one thing that we can do if we want do if we want to perform a reconstruction from the sinogram is to take the information in direction of the detector plane
and uniormly smear it into the direction orthogonal to the detector plane in a range where we assume the object is located.
We call this process **backprojection**.

![sinogram](../sinogram.png)
**TODO**

Implement the following method, that is calculating the value that we want to smear back.
```java
    // in mt.Projector
    public float backprojectRay(mt.Image sinogramSlice, int angleIdx, float s) {
        return sinogramSlice.interpolatedAt(angleIdx * sinogram.spacing, s) // * sinogram.spacing is necessary because spacing is not valid for our angle indices (actually each coordinate should have their own spacing).
                / (volume.physicalWidth()) // we guess that this is the size of our object
                / sinogramSlice.width()    // we will backproject for each angle. We can take the mean of all angle position that we have here.
                );
    }
```
Use this method in `backprojectSlice` to backproject for each pixel `x`, `y` a horizontal line of the sinogram (all possible angles).

```java
    // in mt.Projector
    public void backprojectSlice(int sliceIdx)
    // A helper method
    public void backprojectSlice(int sliceIdx, int angleIdx)
```

To do this 

- Create a loop over all `angleIdx`
    - Call the helper method for all angle indices (there are `sinogram.width` angles)
- In `public void backprojectSlice(int sliceIdx, int angleIdx)`
    - Get the slice with index `sliceIdx`
    - Loop over all `x`, `y` of this image
    - Calculate the physical coordinates from the integers `x` and `y` (times `spacing` plus `origin`!)
    - Calculate the actual angle `theta` from the `angleIdx`
    - Calculate `s` from the physical coordinate.
      - `s` is the physical distance of the point $\vec{x}$ from the ray through the origin at angle `theta`.
      - Can you write down the line equation for the line?
      - Can you use the line equation to calculate the distance of $\vec{x}$ an the line through the origin?
    - Call `backprojectRay` with `angleIdx` and `s`
    - Add this result of `backprojectRay` to current value at position `x`, `y` and save the sum at that position

<!--*Hint: You may have seen that all the CT reconstructions from the Cancer Imaging Archive contain only image information-->
<!--within a circular region. If you want to, you can only regard `x`,`y` coordinates within that region or set them to 0 after-->
<!--the backprojection. If you do that, you should mention it in the project report.*-->


## Reconstruction

Next, we want to try out whether we can use our backprojection to reconstruct a volume.
Whenever we want to test whether method works, we need something to compare with.
We the best possible result, the "true" values, is usally called ground truth.
We can use one of the reconstructions that we downloaded from the Cancer Imaging Archive as a ground thruth volume.
The best possible result for our reconstruction is to come as close as possible to the origin volume.

Create a file `src/main/java/project/GroundTruthReconstruction.java`.

```java
// Your name <your idm>
package project;

import mt.Projector;
import mt.Volume;

class GroundTruthReconstruction {

    public static void main(String[] args) {
        (new ij.ImageJ()).exitWhenQuitting(true);

    }
}
```

It's important that we never mix up the ground truth with the results of our algorithm.
Create therefore a instance of `Projector` that will have the task to simulate projections.
You can call it `groundTruthProjector`. 
Open a test volume and create an empty (all pixels 0) sinogram. They are needed to call the constructor of `Projector`.

Call `groundTruthProjector.projectSlice` with an arbiray slice index. You get the generated sinogram slice with
`groundTruthProjector.sinogram().getSlice(...)`.

Create an empty volume (all pixels 0)  with the same dimensions as the ground truth volume and a copy sinogram with the
same size as our ground truth sinogram. You add the following method to `mt.Volume` to create copies.

```java
    // in mt/Volume.java
    public Volume clone(String name) {
        Volume result = new Volume(width(), height(), depth(), name);
        IntStream.range(0, depth()).forEach(z-> result.getSlice(z).setBuffer(Arrays.copyOf(slices[z].buffer(), slices[z].buffer().length)));
        return result;
    }
```

Create a new projector `reconstructionProjector` with the empty volume and the copy of our sinogram.
Use `backprojectSlice(...)` to create your first reconstruction of a slice.

## Project Report

For the project report, you should briefly describe your backprojection reconstruction algorithm.

- Describe your implementation, create at least one figure supporting your explanations.
You should never mention implementation details like for-loops or variable names, but important parameters like the number
of projection angles you used
- Test your reconstruction algorithm
    - using a simple test image like a white circle or square
    - using a CT reconstruction that you downloaded . Cite the data source!
- How do images look like? If they are blurry, what is the reason for that.
Mention in one sentence how the Filtered Backprojection algorithm tries to solve that problem.
Show the images in your project report.
- How big are your errors in comparison to the ground truth? If you are using a measure like the Mean Squared Error give
a formula defining it.


The text for this section should be about one page long. 
[Next section](../reconstruction)
