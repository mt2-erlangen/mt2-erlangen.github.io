+++
date= 2020-05-25
title = "Exercise 5"

[extra]
author="Stephan Seitz"
+++

# Submission

**Submission deadline: 08.06.20 23:55h**

Please ensure that all files you created also contain **your name and your IDM ID** and also your partner's name and IDM ID if you're not working alone.

Each exercise has **10 points**. You have to achieve **30 of 60 points in six homework exercises** to pass the module.

# Meassuring Errors

<P align="right"><i>3 Points</i>

In [Exercise03](../exercise03), we have seen that we can you linear low-pass filters, like the Gauss filter, to reduce 
the amount of noise in images. Let's test that!

Add two static methods to the `Image` class:

```java
public static float meanSquaredError(Image a, Image b);
public static float psnr(Image a, Image b);
```

Take adavatage of the fact that you already implemented a `minus` method.
Static also means that you will use them like `float mse = Image.meanSquaredError(imageA, imageB);`.

Open a DICOM test image add some noise using `addNoise`.
Apply a Gauss filter (choose a good `filterSize` and `sigma`) on the noise image and compare the result with the original image.
Can the error reduced in comparision to the unfiltered noisy image?

*Hint: You can use a for-loop to try out different values for `sigma`*

# Non-Linear Filters

A quality criterion for CT images are sharp edges.
However, though the Gauss filter reduces the noise it also blurs out the edges.
In this exercise, we try to 

<!--Java unzip: https://www.journaldev.com/960/java-unzip-file-example-->
<!--https://services.cancerimagingarchive.net/services/v3/TCIA/query/getImage?SeriesInstanceUID=1.3.6.1.4.1.14519.5.2.1.2857.5885.605148569068237074211642729801-->
