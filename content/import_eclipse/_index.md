
+++
date= 2020-04-21
title = "Import a Gradle project with Eclipse"

[extra]
author="Stephan Seitz"
[page]
page.title="Import with Eclipse"
+++


- On Windows, [download the latest Java version (14.1) from Oracle](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html).
  On Ubuntu Linux, you can install `sudo apt install openjdk-14-jdk`

- Install Eclipse from [https://www.eclipse.org/downloads/](https://www.eclipse.org/downloads/)

- Open Eclipse 

  ![ss](1.png)  

- Import...

  ![ss](2.png)  

- Existing Gradle Project...

  ![ss](3.png)  

- Chose path of the downloaded project and click `Next`

  ![ss](4.png)  

- Grab a coffee while it's downloading ImageJ

  ![ss](5.png)  

- Try to run Exercise01

  ![ss](run.png)  

- You are seeing red squiggles, you found a bug in a Eclipse plugin. Upgrade it in the Eclipse Marketplace! 

  ![ss](marketplace.png)  

- Search for `gradle build`! Then, click on the `Installed` button of "Buildship Gradle Integration.

  ![ss](search_for_gradle_build.png)

- ... and click on `Update`! This should solve the bug after a restart.

  ![ss](eclipse_gradle.png)

- You should now see ImageJ when you start Exercise01

  ![ss](imagej.png)



<!--- Ensure that Eclipse can find your Java Runtime Enviroment-->
  <!--![ss](../openproperties.png)  -->
