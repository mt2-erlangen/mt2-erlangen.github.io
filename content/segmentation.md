+++
date= 2024-06-24T09:00:00Z
title = "Project Work 2 - Segmentation"
[extra]
author= "Mischa Dombrowski, Zhengguo Tan, Jinho Kim"
+++

# Overview

0) [Introduction](../introduction)
1) [Thresholding](../thresholding)
2) [Segmentation](../segmentation)
3) [Otsu's Method](../otsu)
4) [Edge Detection](../edgedetection) 
5) [Canny Edge](../cannyedge) 
6) [Outlook and Conclusion](../conclusion)


# 2: Segmentation 

For your second task, you will be implementing a plugin, which will be capable of evaluating the quality of a segmentation by comparing it to a given reference-image. In clinical practice these reference images can be attained through manual segmentation of the image by a skilled physician.

In your case the provided reference image will look like this:

<center><img src="../cells_reference.png" width="250" height="250"></center>

---

## 2.1: A new class


In order to quantify the quality of your segmentation, you will be calculating the values for __Sensitivity__ and __Specificity__, which were introduced in your blackboard-exercise. In addition, you will be creating a dedicated class to store and access these values. 

To do:

1. Create a new class in the `src`-Folder named `EvaluationResult` 
2. Create the class-variables `sensitivity` and `specificity` (both double)
3. Implement a constructor:
   ```java
   public EvaluationResult ( double specificity , double sensitivity ){}
   ```
4. Implement getter-methods for both values:
   ```java
    public double getSpecificity (){}
    public double getSensitivity (){}
   ```

---
## 2.2: The Plugin

The rest of the code for this task will be implemented in the provided class `Task_2_EvaluateSegmentation`.

In order to calculate the values for __Sensitivity__ and __Specificity__, you will need to assign a "state" to each pixel of your segmented image. The states in question are:

|State||
| ----------- | ----------- |
|TP|"True Positive" &rarr; the pixel was correctly identified as part of the target|
|TN| "True Negative" &rarr; the pixel was correctly identified  as background |
|FP|"False Positive" &rarr; the pixel was falsely identified as part of the target|
|FN|"False Negative" &rarr; the pixel was falsely identified as background|

For decerning which of these cases applies to a given pixel, the reference image is used as the "correct" segmentation.

**Task**:

1. Create a new method:
   ```java
    private EvaluationResult evaluateSegmentation ( Imageprocessor
    segmentation , ImageProcessor reference ){}
   ```
2. Check if both images have the same dimensions - if not return null
3. Iterate over both images and count up the number of occurrances for each state 
4. Calculate the values for __Sensitivity__ and __Specificity__ using the formulas from your blackboard-exercise
5. Create a new `EvaluationResult`-object to store these values and return it
---

Now that you have created a method which perfroms the actual evaluation, you will need to implement the `run`-method in order to apply the plugin to an image. 

**Task**:

1. Use the `IJ.openImage()`-method to open a window, which allows the user to select the reference image.
2. Check wether the reference image has been loaded successfully - if not throw a fitting exception

   >__Tip__: 
    Check the [ImageJ-API](https://imagej.net/ij/developer/api/ij/ij/io/Opener.html) to see how the method behaves when no image has been loaded

3. Once the image was loaded successfully, apply your `evaluateSegmentation ()`-method and print your results

   >__Note__: As a test for your code, you could for example choose the `cells_reference` image as both "segmentation" and "reference". The plugin should then return 1.0 for both values.

---
## 2.3: Project-Report

The part of your report concerning Task 3 should contain the following:

+ A brief explanation as to what TP, TN, FP, FN mean
+ The formulas for Specificity and Sensitivity
+ A brief explanation on what Specificity and Sensitivity mean in the context of image-segmentation

Additionally you should also include your own results from this exercise:

+ Using your plugin from Task 1 generate __6__ different segmentations of the "cells"-image using approapriate hyperparamters. 
+ Use the plugin you implemented in this task to evaluate each segmentation 
+ Display your results in an appropriate way 
+ Name two other ways to evaluate how good the segmentation is


[Next](../otsu)