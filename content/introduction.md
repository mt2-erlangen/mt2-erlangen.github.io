+++
date= 2023-06-12T08:00:00Z
title = "Project Work 1 - Introduction"
[extra]
author= "Mischa Dombrowski, Zhengguo Tan, Jinho Kim"
+++

# Overview

1) Introduction
2) [*k*-Space](../kspace)
3) [Image Reconstruction](../fftshift)
4) [Filters](../filters)
5) [Outlook and Conclusion](../conclusion)

# 0. Disclaimer
All the illustrations are done using an mri scan of a brain, however, you are required to reimplement the project using a scan of a knee:

<p style="text-align: center;">
<table><tr>
<td> <img src="../kneescan.png" alt="Trulli" align="center"> </td>
</tr></table>
<p>

Please replace the figures in the report with results from your own implementation.
For general information and best practices have a look at our [project report guidelines](../checklist).

We also provide you with a basic [java template](https://github.com/mt2-erlangen/project-ws2022) including some useful helper functions, similar to what you saw during the exercises. You have to use this template as the starting point of your project. For more information on the **installation** have a look at our [getting started guide](../installation).

Furthermore, we provide a [**latex-template**](https://github.com/mt2-erlangen/latex-template) that you should use. It gives a more detailed structure for the report. Don't change the order and replace all images with images generated from your own implementation.

# 1. Introduction

In this semester's project work, you will learn some basic concepts of magnetic resonance imaging (MRI). The MRI scanner acquires data in the spatial frequency domain, known as *k*-space. MR image reconstruction requires the (inverse) Fourier transform of the acquired *k*-space data.

Your first task is to write an introduction, which should include:

* **What is MRI?**  Motivation an purpose of MRI.
* **Image acquisition**:  Why is a strong magnetic field needed? What does the word "resonance" in MRI mean? Why is an antenna (receiver coil) needed? From a signal processing point of view, what is the relationship between the data acquired from an MRI machine and MR images?
* What are the **advantages and disadvantages of MRI** compared to other imaging modalities, like computer tomography (CT)? e.g. Does MRI require ionizing radiation? Does MRI provide better soft-tissue contrast? Is the acquisition speed of MRI as fast as CT? If not, why?
* Give a **brief overview** of the contents of the following tasks.

Use **references** when necessary. Try to cite scientific publications (e.g. journal papers) in your introduction.
Your introduction and conclusion should not contain any images.


[Next task: *k*-Space](../kspace)
