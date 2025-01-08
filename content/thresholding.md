+++
date= 2024-06-24T08:00:00Z
title = "Project Work 1 - Thresholding"
[extra]
author= "Sebastian Dietz, Mischa Dombrowski"
+++

# Overview

0) [Introduction](../introduction)
1) [Thresholding](../thresholding)
2) [Segmentation](../segmentation)
3) [Otsu's Method](../otsu)
4) [Edge Detection](../edgedetection) 
5) [Canny Edge](../cannyedge) 
6) [Outlook and Conclusion](../conclusion)


# 1: Thresholding and Illumination-Correction

# 1.1: Introduction 
Your first task consists of implementing an ImageJ-Plugin capable of performing a classic thresholding operation, as well as correcting for uneven illumination within an image. 

To get you started, you have been provided with an incomplete class called `Task_1_Threshold`. 
___

# 1.2: Thresholding 
The concept of thresholding - as the name implies - is based on evaluating an image pixel by pixel and checking each time, whether it falls above or below a given threshold-value.
If the pixel value in question is above the specified value, it will be set to white. If not it will be set to black. 

To do:

1. Create a new method:
     ```java
     public ByteProcessor threshold ( ImageProcessor ip , int threshold ){} 
     ```

2. Create a new `ByteProcessor` to store your result
3. Iterate over the entire input image and check the threshold-condition for each pixel
4. Set each pixel in the output - ByteProcessor according to your evaluation
5. Return your result

<div style="background-color:rgb(235, 235, 235); border: 1px solid rgb(235, 235, 235); border-radius: 15px; padding: 15px; margin: 10px 0;">
   &#128221; <strong> Note: </strong> <br>
   Do not use inbuilt methods provided by ImageJ to perform the thresholding operation 
   </div>   

___
# 1.3: Illumination-Correction

For cases where the illumination of the image is uneven, you will now add the functionality to perform Illumination-Correction.

To do:

1. Create a new method:
    ```java
    public ByteProcessor correctIllumination ( ImageProcessor ip ){}
    ```
2. Convert the input image to a `FloatProcessor` (make sure, that the original image remains unchanged)
3. Apply a `Gaussian Filter` to the newly created image ($\sigma$ = 75) by using the `blurGaussian()`-function provided by ImageJ.

4. Divide the original image by the filtered image (result should also be a  `FloatProcessor`)
5. Convert your result to a `ByteProcessor` and return it

<div style="background-color:rgb(235, 235, 235); border: 1px solid rgb(235, 235, 235); border-radius: 15px; padding: 15px; margin: 10px 0;">
   &#128161; <strong> Tip: </strong> <br>
The division of two images can simply be performed by iterating over them and performing it "pixelwise". 

There is however a method provided by ImageJ, which allows you to move (copy) the entire image-data of one image to another, while applying a simple operation (such as division) to every pixel of both images in one go. Check the [ImageJ-API](https://imagej.net/ij/developer/api/ij/ij/process/Blitter.html) in case you want to use this method.
</div>

___

To allow you to test your results, the `run`-method already contains code for a simple user interface, which gives you the option to select a value for your threshold, as well as let you choose whether or not you want to correct the illumination before thresholding. This code has been commented out to avoid causing errors by calling methods you had not implemented yet.

It pays to have a look at this code now, as you will eventually be creating a few dialogues of your own in later tasks.

Consider using the "Cells" image to try out your code, since it will be the image you will be working with for the rest of your project. 

___
# 1.4: Project Introduction

To begin the written section of your Final Project, you will first need to come up with an introduction. This introduction should:

+ Capture the readers interest with a short motivation of the project 
+ Summarize and contextualize the approach to other research methods
+ Position your approach with respect to other approaches
+ Define the research problem and problem statement
+ Give an overview of the paper's structure

# 1.5: Project-Report

The part of your report concerning Task_1 should contain the following:

+ A brief description of the methods you implemented
+ Provide a mathematically sound formulation of the thresholding operation
+ A short discussion on why it may be necessary to correct the illumination in microscopy-images
+ Images __you__ generated with __your code__, that showcase what you described 
+ Create a figure that shows a few examples of the image before and after thresholding. What does `correctIllumination` do? 


[Next](../segmentation)
