
+++
date= 2021-04-06
title = "Import a Gradle project with Eclipse"

[extra]
author="Stephan Seitz"
+++


- On Windows, [download the latest Java version 16 from Oracle](https://www.oracle.com/java/technologies/javase-jdk16-downloads.html).
  On Ubuntu Linux, you can install `sudo apt install openjdk-14-jdk` or `sudo apt install openjdk-11-jdk`.
  At least Java 8 is required. If you have a working installtion from AuD, you can skip this step.

- Install Eclipse from [https://www.eclipse.org/downloads/](https://www.eclipse.org/downloads/)

- Open Eclipse 

  ![ss](1.png)  

- Import...

  ![ss](2.png)  

- Existing Gradle Project...

  ![ss](3.png)  

- Chose path of the downloaded project and click `Next` (it must be the folder that contains `build.gradle`)

  ![ss](4.png)  

- Grab a coffee while it's downloading ImageJ

  ![ss](5.png)  

- Try to run Exercise00

  ![ss](run.png)  

- You are seeing red squiggles, you found a bug in a Eclipse plugin. Upgrade it in the Eclipse Marketplace! 
  *Update: I think this bug is resolved on new Eclipse versions. So you don't have to upgrade "Buildship Gradle Integration" on new versions!*

  ![ss](marketplace.png)  

- Search for `gradle build`! Then, click on the `Installed` button of "Buildship Gradle Integration".

  ![ss](search_for_gradle_build.png)

- ... and click on `Update`! This should solve the bug after a restart.

  ![ss](eclipse_gradle.png)


- You should now see ImageJ when you start Exercise01.

  ![ss](imagej.png)

- If you're still facing problems: please also check whether a valid Java Runtime Enviroment was found by right-clicking on the project folder
  (if it still has red crosses). Select `Properties` -> `Java Build Path`. Sometimes Eclipse does not find your Java
  installation. You can select it there.

  ![ss](6.png)

Still facing problems? Are you sure you imported the folder that contains `build.gradle`.
If you imported a subfolder or a folder that contain the folder that contains `build.gradle`, Eclipse will be very confused
but does not yield an error.

[Back to exercise 00](../exercise-0)
