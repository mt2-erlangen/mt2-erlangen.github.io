+++
date= 2021-04-06
title = "Exercise 1"

[extra]
author="Stephan Seitz"
+++


# Signals and Waves

**Submission deadline: 10.05.21 23:59h**

Please ensure that all files you created also contain **your name and your IDM ID**
and also your partner's name and IDM ID if you're not working alone.

Each exercise has **10 points**. You have to achieve **30 of 60 points in six homework exercises** to pass the module.

### Signal.java

<P align="right"><i>4 Points</i>

As a first step, we will implement the class `Signal` 
which should hold a signal of finite length.
Create the file `src/main/java/mt/Signal.java`.

```java
// <your name> <your idm>
// <your partner's name> <your partner's idm> (if you submit with a group partner)
package mt;

import lme.DisplayUtils;
import ij.gui.Plot;

public class Signal {

}
```

Signal should have the following members

```java
    protected float[] buffer; // Array to store signal values
    protected String name;    // Name of the signal
    protected int minIndex;   // Index of first array element (should be 0 for signals)
```

Implement two constructors for `Signal`

```java
    public Signal(int length, String name)     // Create signal with a certain length (set values later)
    public Signal(float[] buffer, String name) // Create a signal from a provided array
```

Implement the following getter methods for `Signal`
    
```java
    public int size()        // Size of the signal
    public float[] buffer()  // Get the internal array 
    public int minIndex()    // Get lowest index of signal (that is stored in buffer)
    public int maxIndex()    // Get highest index of signal (that is stored in buffer)
    public String name()     // Get the name of the signal
```

Next, we want to visualize our Signal in the method `show`. You can use provided function `lme.DisplayUtils.showArray`.
To test it, create a `Signal` with arbitray values in the main method of `src/main/java/exercises/Exercise01.java` and call its `show` method.

```java
    public void show() {
        DisplayUtils.showArray(this.buffer, this.name, /*start index=*/0, /*distance between values=*/1);
    }
```

In our black board exercises, we agreed that we want to continue our signals with zeros where we don't have any values stored.
If we access indices of our `Signal` with values smaller than `minIndex()` or larger `maxIndex()` we want to return `0.0f`.
If a user accesses an index between `minIndex()` and `maxIndex()` we want to return the corresponding value stored in our array.


![minIndex](../signal-min-max.png)

Implement the method `atIndex` and `setAtIndex`. Please be aware that `minIndex` can be smaller than 0 for subclasses of Signal.
If `setAtIndex` is called with an invalid index (smaller than `minIndex` or greater than `maxIndex`), it's ok for the program to crash.
This should not happen for `atIndex`.

```java
    public float atIndex(int i)
    public void setAtIndex(int i, float value)
```

You can check the correctness of `atIndex`/`setAtIndex` with the test `testAtIndex` in file `src/test/java/SignalTests.java`.

### Waves

<P align="right"><i>4 Points</i>

As a first step, we will implement the classes `CosineWave` and `SineWave`
which should hold a signal of finite length.
Create two files `src/main/java/mt/CosineWave.java`/`src/main/java/mt/SineWave.java`.

The two classes should represent the following two signals:

$$a\left[i\right] = \cos\left(\frac{k}{N}\cdot 2\pi\right) $$

$$b\left[i\right] = \sin\left(\frac{k}{N}\cdot 2\pi\right) $$

$N$ should be the length (number of samples) of the signal and $k$ is parameter. Add $k$ and $N$ to the constructors of the two classes.

Construct some objects of the two classes in `src/main/java/exercises/Exercise01.java`. How does $k$ influence the shape of the signal?

### The Perfect Wave

<P align="right"><i>2 Points</i>

Professor Maier said that you can create any signal just using waves. Try to 

Add to methods to the signal class in order to add and multipy signals.
The methods should not modify the original signal but create a new signal with meaningful name.

```java
    // Adds the signal with another one elementwise
	public Signal plus(Signal other)

    // Multiplies the signal with a scalar
	public Signal times(float scalar)
```

How many sine and cosine waves with what coefficients do you need?

## Submitting

Please ensure that all files you created also contain your name and your IDM ID and also your partner's name and IDM ID if you're not working alone.
You only need to submit the code. No need to submit answers to the questions in the text.

Then, compress your source code folder `src` to a zip archive (`src.zip`) and submit it and your PDF document via StudOn!



