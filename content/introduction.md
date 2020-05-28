+++
date= 2020-06-03
title = "Project Work – Introduction"

[extra]
author = "Stephan Seitz"
+++

# Our Goal

The goal for this year project work is to reconstruct a computer tomography (CT) volume from multiple (simulated) X-ray images.
You can download these images from studOn.

Open ImageJ in a file `src/main/java/project/Playground.java`. Use this file to try things out. We won't correct it.

```java
package project;

class Playground {

    public static void main(String[] args) {
        (new ij.ImageJ()).exitWhenQuitting(true);

    }

}
```

Open `projections.tif` by dragging it onto ImageJ.

<video controls loop>
  <source src="../drag_drop.webm" type="video/webm">
</video> 

**HINT FOR TUTORS: NEEDS TO BE REPLACED BY REAL PROJECTIONS!!!**

# Introduction

During this semester we will learn how CT reconstruction algorithms work.
Your first task is to find out more about computer tomography and write an introduction for your project report.

- Find an **informative title** for your project report. "Project Report" and "Introduction" are not good titles.
- **What is computer tomography**?
  What is the problem it tries to solve? When and how was it first introduced?
  What are kind of electromagnetic radition is used to aquire the images.
  How did modern CT devices improve over their predecessors?
- What are **adavatages and disadantages** of CT in comparison with other modalities. Include at least 2 advatages and
  two disadvantages.
- Give a **short overview** of the contents of the following sections of your project report.
- Proof all your statements with **references**. You should use at least four distinct sources in your introduction that are
  not webpages.

The introduction shound not be longer than one page. 
Whenever we refer to the maximum length of a section we're not counting figures and tables and just consider the length
of the text. Your introduction and conclusion should not contain any images.

Please have a look on our checklist for a good project report **TODO**.

[Next task](../volume)

