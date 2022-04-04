+++
date= 2021-06-07T08:06:00Z
title = "Project Work 6 – Conclusion"
[extra]
author = "Paul Stöwer"
+++

# Segmentation

In the end we want to make a quick segmentation of our MIP images we created before. If you want to make segment the edges of the vessels you can use an edge detection filter of your choice (for example the Sobel Filter from Exercise 06 or you can use your filtered projections). Proceed as before and find a good threshold which separates the vessels from other structures. You can also segment the image directly without edge detection.

The direct segmentation of the axial plane could look like this:

<table>
<tr>
<td><image align="center" src="/MaximimIntensityProjection.png" ></td>
 <td><image align="center" src="/brain_axial_segmented.png" ></td>
</tr>
</table>

Think in the report about:

* Why and when do you use segmentation methods?
* Are their methods to find a good threshold?
* If yes, give a short explanation of one.

The section should be half a page long.

# Outlook

Before our conclusion we want to look at the potential of computer science and medical imaging. We were remodeling basic reconstruction and image processing methods. Many more applications are already developed or in development. Automatic classification of pathologies or automatic segmentation with the help of artificial intelligence is already a reality:

* Explain shortly two methods which use artificial intelligence in medical image processing
* How will methods like this potentially influence diagnosis and radiology in general?

The section should be half a page long.


# Conclusion

In the last part, summarize want you have implemented and explained in your project report.
Review the shortcomings of your simplified approach and how they could be mitigated in the future.
Draw a conclusion on your work!

This part of the project work should be about a quarter page long and should contain no images.

# Submission

Submit your project report as a PDF and your entire project folder of your code until **August 08 23:55h**.
Your project must compile as a whole!
Make sure that you had a last look at our [checklist](../checklist).


# Evaluation

We hope you had a fun project work!
[You can help us to improve the instructions for next year!](https://forms.gle/rKV9SyBPMGqrShE19)

[Previous section](../postprocessing)
