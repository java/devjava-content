---
id: refactoring.to.streams
title: Converting to Streams
slug: learn/refactoring-to-functional-style/convertingtostreams
type: tutorial-group
group: refactoring-to-functional-style
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Thinking in Streams {streams}
- From Imperative to Functional Style {imperativetofunctional}
- Mappings {mappings}
description: "Converting to use the Streams API."
last_update: 2024-03-25
author: ["VenkatSubramaniam"]
---

<a id="streams">&nbsp;</a>
## Thinking in Streams

In the previous articles in this [tutorial series](id:refactoring) we looked at converting loops written in the imperative style to the functional style. In this article we'll look at viewing the source of data, through the functional eyes, as a stream of data and convert the iteration to use the Streams API.

We saw how we can use `filter()` and `map()` functions to select and transform data, respectively. We can perform these operations in the middle of the functional pipeline. In the examples in the previous articles we used functions like `range()` and `rangeClosed()` to create a stream of values in a range of numbers. That worked nicely when we want to iterate over a known range of values, but, often we may want to work with data that comes from external resources, like from a file, for example. If we are able to work with the external resource as a stream, then we can readily apply the operations of the functional pipeline. In this article we'll take a look at an example that illustrates that idea.

<a id="imperativetofunctional">&nbsp;</a>
## From Imperative to Functional Style

Suppose we want to iterate over a file and count the number of lines with one or more occurrences of a word. Here's an all too familiear imperative style code to accomplish that task:

```java
//Sample.java
import java.nio.file.*;

public class Sample {
  public static void main(String[] args) {
    try {
      final var filePath = "./Sample.java";
      final var wordOfInterest = "public";

      try (var reader = Files.newBufferedReader(Paths.get(filePath))) {
        String line = "";
        long count = 0;

        while((line = reader.readLine()) != null) {
          if(line.contains(wordOfInterest)) {
            count++;
          }
        }

        System.out.println(String.format("Found %d lines with the word %s", count, wordOfInterest));
      }
    } catch(Exception ex) {
      System.out.println("ERROR: " + ex.getMessage());
    }
  }
}

```

In order to make it easy to work with this example, we look for the number of lines with the word "public" in the same source file as the code resides. You may change the value of the `filePath` to refer to a different file and/or the value of the `wordOfInterest` to something else if you like.


There are two major parts in this example. We use the `BufferedReader` returned by the `newBufferedReader()` method to access the contents of the file we're interested in looking into. Then, in the `while` loop we check each line to see if it contains the desired word and, if so, increment the `count` to indicate we found another line with the word. Let's examine the two parts, with the second one first.

Looking closely at the loop, from our discussions in the previous articles, we can recognize that the presence of `if` is a sign that we may use the `filter()` operation if we can write the code as a functional pipeline. Once we filter out or select the lines with the desired word, we can count the number of lines, using the `count()` method of stream. You're most likely curious and bursting to ask, "but, where's the Stream?" To answer that question, let's take a look at the first part of the code.

The data, that is the lines of text, is coming from the file whose path is provided in the variable `filePath`. We're reading the data using the `BufferedReader`'s `readLine()` method and the imperative style to iterate over each line of text. In order to use the functional pipeline, with the operations like `filter()` we need a `Stream` of data. Hence the question, "is it possible to get a Stream of data for the contents in  a file?"

The answer, thankfully, is a resounding yes. The developers behind the JDK and the Java language did not merely introduce the capability to do functional programming and say "good luck." They took the pains to enhance the JDK to add functions so we, as programmers, can make good use of the functional capabilities of Java for our routine tasks.

An easy way to turn the contents of a file into a stream of data is using the `lines()` method of the `Files` class that is part of the `java.nio.file` package. Let's refactor the previous imperative style code to the functional style, with the help of the `lines()` method that gives us the `Stream` over the contents of a file, like so:

```java
//Sample.java
import java.util.*;
import java.nio.file.*;

public class Sample {
  public static void main(String[] args) {
    try {
      final var filePath = "./Sample.java";    
      final var wordOfInterest = "public";

      long count = Files.lines(Paths.get(filePath))
        .filter(line -> line.contains(wordOfInterest))
        .count();

      System.out.println(String.format("Found %d lines with the word %s", count, wordOfInterest));
    } catch(Exception ex) {
      System.out.println("ERROR: " + ex.getMessage());
    }
  }
}
```

Not only does the `lines()` method provide a stream of data over the contents of a file, it remove so much of the cruft around reading the lines. Instead of the external iterator where we fetched one line at a time, the stream makes it possible to use the internal iterator where we can focus on what to do for each line of text as it emerges in the stream's pipeline.

<a id="mappings">&nbsp;</a>
## Mappings

Any where you're working with a collection of data from an external resource, ask if there is a way to get a stream of data over the contents of that resource. The chances are that you may find a function for that within the JDK or a third-party library. Once we get a stream, we can use the highly effective functional operators like `filter()`, `map()`, etc. to fluently iterate over the collection of data that's part of the resource.
