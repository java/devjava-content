---
id: refactoring
title: "Refactoring from the Imperative to the Functional Style"
slug: learn/refactoring-to-functional-style
type: tutorial
category: language
category_order: 3
group: refactoring-to-functional-style
layout: learn/tutorial-group-top.html
subheader_select: tutorials
main_css_id: learn
description: "Learning to change code from the Imperative to the Functional Style."
author: ["VenkatSubramaniam"]
---

This part of the tutorial helps you to learn the functional style equivalent of the imperative style code we often find. As you move forward in your projects, wherever it makes sense, you can change imperative style code to functional style code using the mappings you learn in this tutorial.

In this series we cover the following conversions from the imperative to the functional style:

| Tutorial                                             |Imperative Style | Functional Style Equivalent  |
|------------------------------------------------------|-----------------|------------------------------|
| [Converting Simple Loops](id:refactoring.simple.loops) | `for()`           | `range()` or `rangeClosed()` |
| [Converting Loops with Steps](id:refactoring.loops.withsteps) | `for(...i = i + ...)` | `iterate()` with `takeWhile()` |

