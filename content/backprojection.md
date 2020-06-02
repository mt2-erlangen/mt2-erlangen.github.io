+++
date= 2020-06-03T08:05:00Z
title = "Project Work 5 – Backprojection and Reconstruction"

[extra]
author = "Stephan Seitz"
+++

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
We call this process **backprojection**.

![sinogram](../sinogram.png)
**TODO**




[Next section](../backprojection)
