+++
date= 2024-06-24T11:00:00Z
title = "Project Work 4 - Edge Detection"
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


# 4: Primitive Edge-Detection Filters

Similar to Thresholding and Segmentation, Edge-Detection is a commonly used technique in image processing (i.e. to descern boundarys of objects within an image etc.). In your project you will first be implementing a set of primitive edge-detection filters, as well as the more advanced Canny-Edge-Filter (Task 5). 

---

## 4.1: The Filter-Kernels
There are a variety of different Kernels used for edge detection; some of the most common ones are Sobel, Scharr, and Prewitt - Kernels.

**Sobel**:

X-Direction:

1  0  -1 <br>
2  0  -2 <br> 
1  0  -1 

Y-Direction:

1  2  1 <br> 
0  0  0 <br> 
-1  -2  -1 

**Scharr**:

X-Direction:

47 0 -47 <br> 
162 0 -162 <br> 
47 0 -47

Y-Direction:

47 162 47 <br> 
0 0 0 <br> 
-47 -162 -47


**Prewitt**:

X-Direction:

1  0  -1 <br> 
1 0 -1 <br> 
1 0 -1

Y-Direction:

1  1  1 <br> 
0 0 0 <br> 
-1 -1  -1

When applying these Filter-Kernels to an image through __convolution__, you essentially create the derivative of the image. 
This is because these Kernels result in higher pixel-values in regions, where the image contains a sharp change in brightness (similar to derivatives in analysis). This "derivation" is performed in X- and Y-direction seperately.
Using both the X- and Y-derivative of an image, you can then generate the  __image-gradient__ by calculating the __euclidean norm__ over both derivatives at each pixel of the image. 

> $G$ = $\sqrt{G_{x} ^ 2+G_{y} ^ 2}$

This image-gradient will then show the edges as bright and the rest of the image as black.

---

## 4.2: Filtering and Gradient


To do:

1. Open the `Task_4_Filters`-class and create a new method: 
   ```java
   public FloatProcessor applyFilter (FloatProcessor In, int[][] kernel){}
   ```
2. Create a new `FloatProcessor` to store the resulting image
3. Iterate through the input image and perform the convolution 
   > __Note__: 
    >Since you are working with a 3x3 kernel, you can't simply iterate through the entire image because you would encounter OutOfBounds-exceptions when getting to the rim of the image. 
    For the sake of simplicity you can therefore ignore the outermost row/column of pixels.
4. Return the resulting image

Now that your plugin can perform a convolution (and therefore a derivation), you can calculate the image-gradient.

To do: 

1. Create a new method:
    ```java
   public FloatProcessor getGradient (FloatProcessor In_X, FloatProcessor In_Y){}
   ```

    (In_X and In_Y are the derivatives in X- and Y-direction respectively)
2. Check if the input-images have the same dimensions, if not throw a fitting exception
3. Create a new `FloatProcessor` to store the resulting image
4. Iterate through the image and calculate the Gradient value for each pixel in the output-image
5. Return the resulting image-gradient

---

## 4.3: User-Dialog

At this point your plugin contains everything needed to perform primitive edge-detection. 
As a final step you will implement a simple user-dialog, which will allow the user to select between the three filters mentioned above. 
The following code should be implemented in the `run`-method

To do:

1. Create a new `GenericDialog`
2. Create a `String`-array:
   ```java
   String[] Filters = {"Sobel","Scharr","Prewitt"};
   ```
3. Add a popup-menu to select which filter you want to use 
   >:bulb: Tip: Check the [ImageJ-API](https://imagej.net/ij/developer/api/ij/ij/gui/GenericDialog.html)

4. Show the dialog
5. Check if the dialog was cancelled. If yes, terminate the plugin 
6. Get the __index__ (in the popup-menu) of the selected filter
7. Perform the edge-detection using the selected filter and the methods you implemented
8. Show your result

---

## 4.4: Project-Report

The part of your report concerning Task_4 should contain the following:

+ A short description on how these primitive Edge-Detection-Filters work
+ Possible limitiations, which would require a more sophisticated approach to edge-detection
+ Images you generated with your code


[Next](../cannyedge)