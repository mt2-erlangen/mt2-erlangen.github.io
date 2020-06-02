+++
date= 2020-06-03
title = "Project Work - Projection"

[extra]
author = "Stephan Seitz"
+++

# Projections

To understand how we can reconstruct volume from X-ray images, we will first go through the process how these X-ray images
were acquired from the physical volume.

In your project report you should...

- explain the reader the physical process of **X-ray attenuation** and how this process is material dependent
- explain the **fundamental theorem** describes this process. Give a formula!
- prove your explanations with references, also provide the source of the formula

In this project work, we will make some simplifying assumptions on the acquisition geometry.
I made drawing of the path of a single X-ray through a slice of our volume.
Since this ray crosses the origin of our coordinate system we call it the principal ray.

What are the coordinates of a point P on the line of the principal ray in depedency of the angle $\alpha$ and the distance
from origin $l$?

In reality, not all X-rays cross the coordinate origin. 
We assume parallel rays.
What are the coordinates of a point P that is on a ray that hits the detector at coordinate $s$ in depedency of $l$ and $\anlge$?

Unfortunally, the figure was written on paper and you shouldn't use hand drawn figures in the project report.
Please one or two plots on the computer that are explaining your derived the ray equations to the reader of the project
report

- How does the described situation differ from the **actual acquisition geometry** of modern CT scanners?
  What are the reasons for that? Could our simplified situation be implemented in reality?
<!--- **After Implementation:** what would you need to change in your implementation to cover the real geometry?-->
- **After Implementation:** Describe briefly your implementation of the projection? 
  what physical effects were neglected in our simulation but are present in reality?
  Name at least three non-idealities of real systems.

This part of the project work should be not longer than 1.5 pages.

## Implementation


