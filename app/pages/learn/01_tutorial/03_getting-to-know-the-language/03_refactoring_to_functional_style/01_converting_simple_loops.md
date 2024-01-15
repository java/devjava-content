---
id: refactoring.simple.loops
title: Converting Simple Loops
slug: learn/refactoring-to-functional-style/simpleloops
type: tutorial-group
group: refactoring-to-functional-style
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Imperative vs. Functional Styles {styles}
- Simple for Loops {simplefor}
- Mappings {mappings}
description: "Converting Simple Imperative Loops to Functional Style."
last_update: 2023-07-06
author: ["VenkatSubramaniam"]
---

<a id="styles">&nbsp;</a>
## Imperative vs. Functional Styles

The older versions of Java supported the Object-Oriented paradigm mixed with the imperative style of programming. Starting Java 8, you can also mix the functional style of programming in your code. If your code base was started during the Java 7 or earlier times or later by programmers mostly familiar with older versions of Java, it will be filled with the imperative style code.

Imperative style is where we tell what to do and also how to do it. Functional style is declarative in nature, where we tell what to do and delegate the how or the details to the underlying libraries. Imperative style code may be easier to write since most of us are very familiar with it. However, the code becomes verbose, complex, and hard to read. Functional style may be hard at first, mainly because most programmers are less familiar with it. In general, it's easier to read, understand, and change.  With practice, it becomes easier to write as well.

In this [tutorial series](id:refactoring) we will take a look at a number of common imperative style code and find a mapping or an equivalent functional style code that we can use instead. As you work with your code based, when you're ready to fix a bug or make an enhancement, you may find it useful to refactor some of the imperative style code to the functional style. You can use this tutorial as a guide to find the imperative to functional style mappings for some common situations.

In this tutorial we'll focus on simple loops. 

<a id="simplefor">&nbsp;</a>
## Simple for Loops

Let's start with the traditional for loop where we perform an action for values of an index over a range.

```java
for(int i = 0; i < 5; i++) {
  System.out.println(i);
}
```

In the above code, the essence is the range, from `0` to one less than `5`. The ceremony, the noise, from the __how__, is the syntax plus the increment operation on the index variable `i`. We can keep the essence and remove the ceremony by turning the code to the functional style.

If you like to use the functional style to write this `for` loop, you can do quite easily and the clue is in the sentence before the code: __index over a range__. Since we're iterating over a range, the `range` method of `IntStream` is the direct equivalent for this.

```java
import java.util.stream.IntStream;

...
IntStream.range(0, 5)
  .forEach(i -> System.out.println(i));
```

You can further make this concise by using a methor reference for the `println` method.

```java
import java.util.stream.IntStream;

...
IntStream.range(0, 5)
  .forEach(System.out::println);
```

The functional style code is more concise, easier to read, and the intention is clearer in this version than in the imperative version.

What if your `for` loop runs to include the ending value, like in the following code, you may wonder.

```java
for(int i = 0; i <= 5; i++) {
  System.out.println(i);
}
```

The `IntStream` interface has you covered, it has a `rangeClosed` method exactly for this purpose.

```java
import java.util.stream.IntStream;

...
IntStream.rangeClosed(0, 5)
  .forEach(System.out::println);
```

The `rangeClosed` method is useful to iterate from the starting value all the way to include the ending value.

Whether you use the `range` method or the `rangeClosed` method, you get a stream of `int` values over which you can use the internal iterator to perform actions. Later in this series we will look at operations beyond `forEach`.

In the previous code examples, the internal iterator removed the burden of iterating from your shoulders. The stream takes care of stepping over the range of values, one at a time. You only have to focus on what to do for each element, as they're provided to you, in the `forEach` method. In our examples, we merely printed the provided value. You can do just about any operation you like, like saving the information to a database, sending it off to a remote service, etc.

Unlike the external iterator provided by the `for` loop, the code that uses the internal iterator is more concise, has less noise, avoids the need to explicitly mutate the index variable, is easier to read, easier to modify, and more pleasant to work with.

Proceed to look for opportunities in your own code base where you see the traditional `for` loop and modify it to using the `IntStream`'s `range` or `rangeClosed` method. Make sure you verify that the code works as expected after the change, preferably by running automated tests that you may already have.

<a id="mappings">&nbsp;</a>
## Mappings

Anywhere you see a simple `for` loop, you can use either the `range` or the `rangeClosed` method of `IntStream`. Use the `range` method if you want to iterate until but not including the ending value. Use the `rangeClosed` to include the ending value as well in your iteration.

