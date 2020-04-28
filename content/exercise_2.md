+++
date= 2020-04-05
title = "Exercise 2"

[extra]
author="Stephan Seitz"
+++


** This is just a draft and may be changed until the official release of this exercise **

# Statistical Measures

In this exercise, we want to have a look on how we can analyze signals using simple statistical measures.
We will use a freely available ECG data set with the goal to distinguish healthy from unhealthy patients.
You can find the original data set [here](https://data.mendeley.com/datasets/7dybx7wyfn/3)
but we recommend to use a post-processed version available on studOn.

## Gradle Build System

In Medizintechnik II we use the build system [Gradle](https://gradle.org/).
Gradle is especially popular for Android projects since it's easy to add new software dependencies that will be automatically
downloaded.

In our case, the published data set is saved as Matlab `*.mat` files.
To read those files, an external dependency was already added to our `build.gradle` file.

```groovy
    implementation 'us.hebi.matlab.mat:mfl-core:0.5.6'
```

does the magic and automatically downloaded a [*.mat file reader](https://github.com/HebiRobotics/MFL).
In case, you need to add external software to your own projects you can use [this search engine](https://search.maven.org/).

## Tasks

# Extension of Signal.java

To analyze our signals, add the following to your `Signal` class.

``java
	public float min()         //< Lowest signal value
	public float max()         //< Largest signal value
	public double sum()        //< Sum of all signal values
	public double mean()       //< Mean value of the signal
    public double variance()   //< Variance of the signal
	public double stdDev()     //< Standard deviation of the signal
```

In the last exercise, we treated signals as pure sequence of numbers without any physical dimensions.
But for medical measurements physical dimensions are important.
Apart from out indexing a integer numbers


 https://data.mendeley.com/datasets/7dybx7wyfn/3

```
 Plawiak, Pawel (2017), “ECG signals (1000 fragments)”, Mendeley Data, v3 http://dx.doi.org/10.17632/7dybx7wyfn.3 
 ```
For research purposes, the ECG signals were obtained from the PhysioNet service (http://www.physionet.org)
from the MIT-BIH Arrhythmia database. 
The created database with ECG signals is described below. 
1) The ECG signals were from 45 patients: 19 female (age: 23-89) and 26 male (age: 32-89).
2) The ECG signals contained 17 classes: normal sinus rhythm, pacemaker rhythm, and 15 types
of cardiac dysfunctions (for each of which at least 10 signal fragments were collected).
3) All ECG signals were recorded at a sampling frequency of 360 [Hz] and a gain of 200 [adu / mV]. 4)
For the analysis, 1000, 10-second (3600 samples) fragments of the ECG signal (not overlapping) were randomly selected.
5) Only signals derived from one lead, the MLII, were used.
6) Data are in mat format (Matlab).
