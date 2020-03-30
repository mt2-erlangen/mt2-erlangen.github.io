+++
date= 2020-03-30
title = "Exercise 1"

[extra]
author="Stephan Seitz"
+++

# Signals

Submission date: XX/XX/XX

## Getting started

During this semester we will cre

## Tasks

 - Download Git
 - Clone project
 - Download ImageJ from website
 - Add ImageJ dependency
    - run with `new ImageJ`
 - Open in Eclipse/IntelliJ
 - Create `Exercise01.java` with main
 - Implement `Signal.java`
    - Constructor
    ```java
	public Signal(int length) 

	public Signal(int length, String name)

	public Signal(float[] buffer, String name) 
    ```
    - Member

    ```java
	private float buffer[];
	private String name;
	protected int indexOrigin = 0;

	public final int DIMENSIONS = 1;
    ```

    - Accessors
```java
	public void show() {
		DisplayUtilsKt.showArray(buffer, name, indexOrigin);
	}

	public int size() 
	public float[] buffer() 
	public int indexOrigin()
```


    - Implement
    ```java
    public void show()
	public float atIndex(int i, BoundaryHandling boundaryHandling)
    
    - Test
    ```
 - Implement `Filter.java`
 ```java
    public Signal apply(Signal input);
 ```
 - Implement `LinearFilter.java`
    - Inherit `Signal`. implement `Filter`
    - Implement `public Signal LinearFiler.apply(Signal input)`
    - Test

## Questions

- Open HeartCurve
- Filter with `{1,1,1,1,1}/5`,`{1,1,1}/3`, `{-1,1,-1}/3`
- Show images of filters and Signals
- Observe FFT. How do the filters affect the spectrum?

## Dataset

 https://data.mendeley.com/datasets/7dybx7wyfn/3
 Plawiak, Pawel (2017), “ECG signals (1000 fragments)”, Mendeley Data, v3 http://dx.doi.org/10.17632/7dybx7wyfn.3 
