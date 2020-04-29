+++
date= 2020-04-05
title = "Exercise 2"

[extra]
author="Stephan Seitz"
+++

<!--files = glob.glob('**/*mat', recursive=True)-->

<!--import scipy.io -->
 
<!--for f in files: -->
    <!--data = scipy.io.loadmat(f) -->
    <!--scipy.io.savemat(f, data) -->
     

** This is just a draft and may be changed until the official release of this exercise **

# Statistical Measures

In this exercise, we want to have a look on how we can analyze signals using simple statistical measures.
We will use a freely available ECG data set with the goal to distinguish healthy from unhealthy patients.

![ECG curve](../heartbeat.png)

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

# Loading one of File of the Data Set

`Exercise02.java` ([available here](https://github.com/mt2-erlangen/exercises-ss2020/blob/master/src/main/java/exercises/Exercise02.java)) should alread contain some code for parsing the program parameters:

```java
    public static void main(String[] args) throws IOException {
	(new ij.ImageJ()).exitWhenQuitting(true);

	System.out.println("Started with the following arguments:");
	for (String arg : args) {
	    System.out.println(arg);
	}

	if (args.length == 1) {
	    File file = new File(args[0]);
	    if (file.isFile()) {
		// A file should be opened 


	    } else if (file.isDirectory()) {
		// A directory should be opened 


	    } else {
		System.err.println("Could not find " + file);
	    }

	} else {
	    System.out.println("Wrong argcount: " + args.length);
	    System.exit(-1);
	}
    }
```

Launch `Exercise02` with the one of the files of the data set as an argument (e.g. `<where_you_saved_your_data_set>/MLII/1 NSR/100m (0).mat`)!

[How to do that in Eclipse](../set_args_eclipse)





![dimensionless ECG curve](../dimensionless.png)


# Extension of Signal.java

To analyze our signals, add the following to your `Signal` class.

```java
    public float min()         //< lowest signal value
    public float max()         //< largest signal value
    public double sum()        //< sum of all signal values
    public double mean()       //< mean value of the signal
    public double variance()   //< variance of the signal
    public double stddev()     //< standard deviation of the signal
```

In the last exercise, we treated signals as pure sequence of numbers without any physical dimensions.
But for medical measurements physical dimensions are important.
Because of this 

![pic alt](../find_peaks.png)


 <!--https://data.mendeley.com/datasets/7dybx7wyfn/3-->

<!--```-->
 <!--Plawiak, Pawel (2017), “ECG signals (1000 fragments)”, Mendeley Data, v3 http://dx.doi.org/10.17632/7dybx7wyfn.3 -->
 <!--```-->
<!--For research purposes, the ECG signals were obtained from the PhysioNet service (http://www.physionet.org)-->
<!--from the MIT-BIH Arrhythmia database. -->
<!--The created database with ECG signals is described below. -->
<!--1) The ECG signals were from 45 patients: 19 female (age: 23-89) and 26 male (age: 32-89).-->
<!--2) The ECG signals contained 17 classes: normal sinus rhythm, pacemaker rhythm, and 15 types-->
<!--of cardiac dysfunctions (for each of which at least 10 signal fragments were collected).-->
<!--3) All ECG signals were recorded at a sampling frequency of 360 [Hz] and a gain of 200 [adu / mV]. 4)-->
<!--For the analysis, 1000, 10-second (3600 samples) fragments of the ECG signal (not overlapping) were randomly selected.-->
<!--5) Only signals derived from one lead, the MLII, were used.-->
<!--6) Data are in mat format (Matlab).-->
