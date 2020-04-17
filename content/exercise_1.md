+++
date= 2020-03-30
title = "Exercise 1"

[extra]
author="Stephan Seitz"
+++

# Signals

Submission date: 11.05.20 23:59h

## Getting started

During this semester we will create Java library for signal and image processing.
Unlike AuD, were you wrote most the

Standard project layout
http://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html

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
    ```

    - Accessors

	```java

	public int size() 
	public float[] buffer() 
	public int indexOrigin()
	```


    - Implement
	```java
	public void show() {
		DisplayUtils.showArray(buffer, name, origin, spacing=1);
	}
	public float atIndex(int i, BoundaryHandling boundaryHandling)
	```
    
    - Test

 - Implement `Filter.java`
     ```java
	public Signal apply(Signal input);
     ```


    - Implement `LinearFilter.java`
    - Inherit `Signal`. implement `Filter`
    - Implement `public Signal LinearFiler.apply(Signal input)`
    - Test

## Questions

- Filter with `{1,1,1,1,1}/5`,`{1,1,1}/3`, `{-1,1,-1}/3`
- Show images of filters and Signals
<!--- Observe FFT. How do the filters affect the spectrum?-->

