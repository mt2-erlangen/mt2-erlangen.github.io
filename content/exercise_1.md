+++
date= 2020-03-30
title = "Exercise 1"

[extra]
author="Stephan Seitz"
+++

# Signals and Convolution

Submission date: 11.05.20 23:59h

## ImageJ

The imaging processing program we want to use during this semester is called ImageJ.
It was developed at the US National Institutes of Health and is used nowadays especially in research 
for medical and biological images.

If you want to, you can download a stand-alone version of the program [here](https://fiji.sc/).

## Getting started

ImageJ can not only be used as a Java library.
We already created a Java that uses ImageJ.
You can download it from TODO and import with the IDE of your choice:


 - [Instructions for Eclipse](../import_eclipse)
 - [Instructions for IntelliJ](../import_intellij)

## Tasks
Standard project layout
http://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html

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
    - Inherit `Signal`
    - Implement `public Signal LinearFiler.apply(Signal input)`
    - Test

## Questions

- Filter with `{1,1,1,1,1}/5`,`{1,1,1}/3`, `{-0.5,0,0.5}`
- Show images of filters and Signals
<!--- Observe FFT. How do the filters affect the spectrum?-->

