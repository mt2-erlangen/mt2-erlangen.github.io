+++
date= 2020-06-03T08:05:00Z
title = "Project Work 5 – Backprojection and Reconstruction"

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
and uniformly smear it into the direction orthogonal to the detector plane in a range where we assume the object is located.
We call this process **back-projection**.

![sinogram](../sinogram.png)
**TODO**

Implement the following method, that is calculating the value that we want to smear back.
```java
    // in mt.Projector
    public float backprojectRay(mt.Image sinogramSlice, int angleIdx, float s) {
        return sinogramSlice.interpolatedAt(angleIdx * sinogram.spacing, s) // * sinogram.spacing is necessary because spacing is not valid for our angle indices (actually each coordinate should have their own spacing).
                / (volume.physicalWidth()) // we guess that this is the size of our object
                / sinogramSlice.width()    // we will back-project for each angle. We can take the mean of all angle position that we have here.
                );
    }
```
Use this method in `projectBackwardSlice` to back-project for each pixel `x`, `y` a horizontal line of the sinogram (all possible angles).

```java
    // in mt.Projector
    public void projectBackwardSlice(int sliceIdx)
    // A helper method
    public void projectBackwardSlice(int sliceIdx, int angleIdx)
```

To do this 

- Create a loop over all `angleIdx`
    - Call the helper method for all angle indices (there are `sinogram.width` angles)
- In `public void projectBackwardSlice(int sliceIdx, int angleIdx)`
    - Get the slice with index `sliceIdx`
    - Loop over all `x`, `y` of this image
    - Calculate the physical coordinates from the integers `x` and `y` (times `spacing` plus `origin`!)
    - Calculate the actual angle `theta` from the `angleIdx`
    - Calculate `s` from the physical coordinate.
      `s` is the physical distance of the point $\vec{x}$ from the ray through the origin at angle `theta`.
      Can you write down the line equation for the line?
      Can you use the line equation to calculate the distance of $\vec{x}$ an the line through the origin?
    - Call `backprojectRay` with `angleIdx` and `s`
    - Add this result of `backprojectRay` to current value at position `x`, `y` and save the sum at that position

## Reconstruction

Next, we want to try out whether we can use our back-projection to reconstruct a volume.
When 

[Next section](../backprojection)
