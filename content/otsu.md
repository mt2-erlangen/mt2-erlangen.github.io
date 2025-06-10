+++
date= 2025-06-24T10:00:00Z
title = "Project Work 3 - Otsu"
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


# 3: Otsu's Method

Otsu's method is a commonly used algorithm to compute the ideal threshold-value for image-segmentation. It is used in cases where the image-histogram is bimodal (meaning it contains two distinct peaks) to find the ideal "middle ground". 

We highly recommmend that you have a look at the [original publication](https://ieeexplore.ieee.org/document/4310076) from 1975 regarding the algorithm (Access should be granted if you try to access it using the university internet).



___
## 3.1: Theory

Otsu's method works by maximizing the **between class variance** σ<sub>B</sub>² which is defined as:

<div style="background-color:rgb(235, 235, 235); border: 1px solid rgb(235, 235, 235); border-radius: 15px; padding: 15px; margin: 10px 0;">
&sigma;<sub>B</sub><sup>2</sup> (&theta;) = P<sub>1</sub>(&theta;) 	&middot; P<sub>2</sub>(&theta;) &middot; (&mu;<sub>1</sub>(&theta;) - &mu;<sub>2</sub>(&theta;))<sup>2</sup> <br><br>

with

P<sub>1</sub>(&theta;) = $\sum_{i = 0}^{\theta}  h(i)$  (&#8793; number of pixels below the threshold (background))

P<sub>2</sub>(&theta;) = 1 - P<sub>1</sub>(&theta;) = $\sum_{i = \theta +1}^{L-1}  h(i)$ (&#8793; number of pixels above the threshold (foreground))

&mu;<sub>1</sub>(&theta;) = $\frac{1}{P1(\theta)}$ $\cdot$ $\sum_{i = 0}^{\theta} (i+1)h(i)$  (&#8793; mean intensity of the background)

&mu;<sub>2</sub>(&theta;) = $\frac{1}{P2(\theta)}$ $\cdot$ $\sum_{i = \theta +1}^{L-1} (i+1)h(i)$  (&#8793; mean intensity of the foreground)
</div>

with __h(i)__ being the normalized histogram of the image, __&theta;__ being the current threshold and __L__ being the length of the histogram-array.

___
## 3.2: Coding


In order to implement this algorithm, you will need to:

+ Generate the histogram of the image
+ Use the histogram to determine P<sub>1</sub>(θ) and P<sub>2</sub>(θ) for all possible θ's
+ Use these values to calculate μ<sub>1</sub>(θ) and μ<sub>2</sub>(θ) for all possible θ's
+ Calculate σ<sub>B</sub>² (θ) for all possible θ's

Moving foreward, these steps will be explained in further detail. 
Since your code for this task can get rather long, you should pay attention to an orderly programming style to avoid difficulties while debugging later on. You can also add comments to your code to help you keep track of your work. 

To do:

1. Open the  `Task_3_Otsu`-class and take note of the empty methods provided. Each of these methods will be performing one of the calculations detailed above. 

<br/>  

2. Complete the method:
   ```java
      public double[] getHistogram(ImageProcessor in) {}
   ```

   a. Create a `double`-array of appropriate size to store the histogram-values
   
   b. Iterate through the input-image and update the corresponding histogram-entry for each pixel's value
   
   c. Normalize and return the histogram. 

<div style="background-color:rgb(235, 235, 235); border: 1px solid rgb(235, 235, 235); border-radius: 15px; padding: 15px; margin: 10px 0;">
   &#128221; <strong> Note: </strong> <br>
   Normalizing refers to converting the histogram to a probability distribution. If you are unsure how to do that, have a look at the original publication 
</div>

<br>

3. Complete the methods to compute P<sub>1</sub>(θ), P<sub>2</sub>(θ), μ<sub>1</sub>(θ) and μ<sub>2</sub>(θ):
   ```java
   public double[] getP1(double[] histogram){}
   public double[] getP2(double[] P1){}
   public double[] getMu1(double[] histogram, double[] P1){}
   public double[] getMu2(double[] histogram, double[] P2){}
   ```

   P<sub>1</sub>(θ) and P<sub>2</sub>(θ):

      * Consider which values for **θ** are possible in an **8-bit** grayscale image
  
      * Iterate through the possible values of **θ** and calculate P<sub>1</sub>(θ) and P<sub>2</sub>(θ) for each instance 
   </br>

   μ<sub>1</sub>(θ) and μ<sub>2</sub>(θ):

      * Calculate the values for μ<sub>1</sub>(θ) and μ<sub>2</sub>(θ) according to the formulas provided above. 

   <div style="background-color:rgb(235, 235, 235); border: 1px solid rgb(235, 235, 235); border-radius: 15px; padding: 15px; margin: 10px 0;">
   &#128221; <strong> Note: </strong> <br>
   
   __Pay attention to the possibility of dividing by zero.__
   You can handle this, by checking beforehand, if you will be dividing by zero and simply dividing by a very small number instead. We recommend you use **10e-10**
   </div>

<br/>  

4. Determine the values for σ<sub>B</sub>² (θ) in the method:
   ```java
      public double[] getSigmas(double[] P1, double[] P2, double[] mu1, double[] mu2) {}
   ```
   a. Create a new `double`-array of suitable length
   b. Calculate σ<sub>B</sub>² (θ) for each value of θ and store it in the array you just created
   c. Return the array of sigmas
   
<br/>  

5. Find the maximum of your sigmas-array using:
   ```java
      public int getMaximum(double[] sigmas){}
   ```
    Determine the index (within the array of possible σ's) of the maximum value for σ<sub>B</sub>² (θ) and store the index as an `int`-variable
    (In case there is no definite maximum, you can simply select the __σ with the highest index__, as this adds the least amount of extra programming)

    The maximum value this method returns is your __Otsu-Threshold-Value__

 </br>

6. Complete the method: 
   ```java
   public ByteProcessor otsuSegmentation(ImageProcessor ip) {}
   ```
   This method will combine all the steps for calculating the Otsu-Threshold, as well as return the Image after having applied the Otsu-Threshold and print the determined value to the terminal. 
  </br>

   a. First apply an illumnation-correction to the input image. To do this, inherit the methods you implemented in __Task_1__ by using:
   
   ```java
   Task_1_Threshold Threshold = new Task_1_Threshold();
   ```
    You can call methods belonging to the Threshold-Object like this: `Threshold.correctIllumination()`.
  
   b. Use the "illumination-corrected" image to perform all of the calculations you implemented 

   c. Apply a Thresholding-operation to your image using the determined Otsu-Threshold and store the result in a ByteProcessor. 
  
   d. Print the Otsu-Threshold to the terminal and return the result-ByteProcessor  
<br/>

1. Complete the `run`-method such that it applies the Otsu-Segmentation-Process to the Input-Image and displays the resulting image.


To check your code you can perform an Otsu-Segmentation of the "Cells"-image.
Your plugin should return the following: 

<center><img src="../Otsu_Cells.png" width="500" height="500"></center>


___

#### 3.3: Project-Report

The part of your report concerning Task_3 should contain the following:

+ A brief explanation of what Otsu's method is
+ What it aims to achieve and how 
+ Its limitations
+ Example of your segmentation
+ In the original publication, Otsu mentions that "An optimal threshold is selected automatically and stably, not based on the differentiation (i.e. a local property such as valley), but on the integration (i.e., a global
property) of the histogram." Explain what this means, especially where the integration comes from. 
+  Compare the results to the naive thresholding method 
+ Otsu's method, while still applied and useful in practice, has several shortcomings. Discuss two of them and name examples of current methods that can be applied to similar problems that solve these issues, by providing a citation and briefly explaining them. 


[Next](../edgedetection)
