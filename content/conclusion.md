+++
date= 2026-06-20T08:00:25Z
title = "Project Work 5 - Outlook and Conclusion"
[extra]
author= "Zhengguo Tan, Jinho Kim, Mischa Dombrowski"
+++

# Overview

1) [Introduction](../introduction)
2) [*k*-Space](../kspace)
3) [Image Reconstruction](../fftshift)
4) [Filters](../filters) 
5) Outlook and Conclusion


# 5. Outlook and Conclusion
In this project, you learned the concept of $k$-space and Fourier transform in MRI.
Now you know the basic concepts of how MR images are created.
In subsequent steps, image processing can be applied to facilitate the diagnosis for the radiologist.
There is great research interest in MRI and various processing methods.

* Name at least two examples of current trends in image processing in MRI. Provide citations for each example and describe them briefly.
* For your examples, are they already applied to clinical routine? If not, do you think they soon will be? Try to explain why or why not.

In the last part, summarize what you have implemented and explained in your project report. Review the shortcomings of your approaches and how they could be mitigated in the future, and conclude your report.

# Submission

Submit your project report as a PDF and your code as a ZIP file.
Your project must compile as a whole!

## Packaging your code

Use the provided script to create the ZIP file:

```sh
./zip_submission.sh
```

This creates `submission.zip` which unpacks directly to `src/`. No extra nesting, no build artifacts.
**Do not pack the folder manually.** A wrongly structured ZIP (e.g. unpacking to a project folder instead of `src/`) cannot be graded automatically and may result in **0 points**.
If you choose to pack manually anyway, make sure the ZIP unpacks to exactly `src/` and nothing else.
