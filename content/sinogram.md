+++
date= 2020-06-03T08:04:00Z
title = "Project Work 4 – Sinogram"

[extra]
author = "Stephan Seitz"
+++

<h1 style="background-color:Tomato;">Sinogram</h1>

 - Ein Bild und ein Sinogram von einem Testbild *1P*
 - Ein Bild und ein Sinogram von einem CT-Schnittbild *1P*
 - Erklärung *4P*
    - Sinogram: Eine Koordinatenache: Ort auf Detektorzeile 
    - Radon-Transformation: Integraltransformation der orthografische Projektionen entlang einer Kreisbahn beschreibt.
    - Radon-Trafo in der Theorie invertierbar
- Spalten der Randon-Transformation an einer Stelle $\theta$ symmetrisch zur Zeile $\theta + \pi$, da Positionen von Quelle und Detektor vertauscht.
Gleiche Strahlenwege (nur spiegelverkehrt auf dem Detektor). 180°-Grad daher für Parallelstrahlen ausreichend. *2P*


**Total: 8P**

<h1 style="background-color:Tomato;">Sinogram</h1>

# Sinogram

![sinogram](../sinogram.png)

Now, you should be able to generate sinograms from volume slice.
Generate two sinograms from two volume slices:

- One sinogram from a *simple test image*. You can use for instance a white circle as I was doing in the last section.
- One sinogram from a real *CT reconstruction*. You should cite the source of that image. The Cancer Imaging Archive even
[explains you how to do that](https://wiki.cancerimagingarchive.net/display/Public/RIDER+Lung+CT#871e8e71d08d428c887407cfe6cb0cec).

- Show both the volume slices and the sinograms.
Explain to the reader what they are seeing. What is the radon transform?
Can the radon transform be inverted?
- Do the sinograms contain some kind of symmetry? What is the reason for that.
Do we really need a 360° degree scan?

<!--How can the Fourier-Slice-Theorem be used to reconstruct.-->
<!--Remember to explain the meaning of all variables if you should be using formulas.-->

This section should not be longer than one page.

[Previous section](../projection)

[Next section](../backprojection)
