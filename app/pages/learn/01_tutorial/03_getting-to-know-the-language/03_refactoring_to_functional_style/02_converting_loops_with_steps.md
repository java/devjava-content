---
id: refactoring.loops.withsteps
title: Converting Loops with Steps
slug: learn/refactoring-to-functional-style/loopswithsteps
type: tutorial-group
group: refactoring-to-functional-style
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Iterating with Steps {steps}
- From Imperative to Functional Style {imperativetofunctional}
- Unbounded Iteration with a break {break}
- Mappings {mappings}
description: "Converting Imperative Loops with Steps to Functional Style."
last_update: 2023-07-06
author: ["VenkatSubramaniam"]
---

<a id="steps">&nbsp;</a>
## Iterating with Steps

In the previous article in this series we looked at converting simple loops written in the imperative style to the functional style. In this article we'll see how to take on loops that are a bit more complex&mdash;when we have to step over some values in an interval.

When looping over a range of values, one at a time, the `range()` method of `IntStream` came in handy to implement in the functional style. This method returns a stream that will generate one value at a time for values within the specified range. At first thought, to skip some values we may be tempted to use the `filter()` method on the stream. However, there's a simpler solution, the `iterate()` method of `IntStream`.

<a id="imperativetofunctional">&nbsp;</a>
## From Imperative to Functional Style

Here's a loop that uses step to skip a few values in the desired range:

```java
for(int i = 0; i < 15; i = i + 3) {
  System.out.println(i);
}
```

The value of the index variable `i` starts at `0` and then is incremented by `3` as the iteration moves forward. When you find yourself looking at a loop like that where the iteration is not over every single value in a range, but some values are skipped, consider using the `iterate()` method of `IntStream`.

Before we refactor the code, let's take a closer look at the `for()` loop in the previous code, but with a pair of imaginary glasses that let us look at potential uses for lambdas.

```java
//imaginary code
for(int i = 0; i < 15; i = i + 3) //imperative
for(seed, i -> i < 15, i -> i + 3) //functional
```

The first argument passed to the `for` loop is the starting value or the seed for the iteration and it can stay as is. The second argument is a predicate that tells the value of the index variable, `i`, should not exceed the value of `15`. We can replace that in the functional style with a `IntPredicate`. The third argument is incrementing the value of the index variable and that, in functional style, is simply a `IntUnaryOperator`. The `IntStream` interface has a `static` method named `iterate()` that nicely represents the imaginary code: `iterate(int seed, IntPredicate hasNext, IntUnaryOperator next)`.

Let's refactor the loop to use functional style.

```java
import java.util.stream.IntStream;

...
IntStream.iterate(0, i -> i < 15, i -> i + 3)
  .forEach(System.out::println);
```

That was pretty straightforward, the `;`s became `,`s, we made use of two lambdas: one for the `IntPredicate` and the other for the `IntUnaryOperator`.

In addition to stepping over values, we often use an unbounded loop and that throws a bit more complexity on us, but nothing the functional APIs of Java can't handle, as we'll see next.

<a id="break">&nbsp;</a>
## Unbounded Iteration with a break 

Let's take a look at the following imperative style loop which, in addition to the step, is unbounded and uses the `break` statement.

```java
for(int i = 0;; i = i + 3) {
  if(i > 20) {
    break;
  }

  System.out.println(i);
}
```

The terminating condition of `i < 15` is gone and the loop is unbounded as indicated by the repeated `;;`s. Within the loop, however, we have the `break` statement to exit out of the iteration if the value of `i` is greater than `20`.

For the functional style, we can get rid of the second argument, the `IntPredicate` from the `iterate()` method call but that will turn the iteration into an infinite stream. The functional programming equivalent of the imperative style `break` is the `takeWhile()` method. This method will terminate the internal iterator, the stream, if the `IntPredicate` passed to it evaluates to `false`. Let's refactor the previous imperative style unbounded `for` with `break` to functional style.

```java
IntStream.iterate(0, i -> i + 3)
  .takeWhile(i -> i <= 20)
  .forEach(System.out::println);
```

The `iterate()` method is overloaded and comes in two flavors, one with the `IntPredicate` and the other without. We made use of the version without the predicate to create an infinite stream that generates values from the seed or the starting value. The `IntUnaryOperator` passed as the second argument determines the steps. Thus, in the given code example, the stream will generate values `0`, `3`, `6`, and so on. Since we want to limit the iteration so that the index does not exceed the value of `20` we use the `takeWhile()`. The predicate passed in to `takeWhile()` tells that the iteration may continue as long as the value of the parameter given, the index `i`, does not exceed the value of `20`.

We saw in the previous article that `range()` and `rangeClosed()` are direct replacement for the simple `for` loop. If the loop gets a bit more complex, no worries, Java has you covered, you can use the `IntStream`'s `iterate()` method and optionally the `takeWhile()` if the loop is terminated using `break`.

<a id="mappings">&nbsp;</a>
## Mappings

Anywhere you see a `for` loop with step, use the `iterate()` method with three arguments, a seed or the starting value, a `IntPredicate` for the terminating condition, and a `IntUnaryOperator` for the steps. If your loop uses the `break` statement, then drop the `IntPredicate` from the `iterate()` method call and instead use the `takeWhile()` method. The `takeWhile()` is the functional equivalent of the imperative style `break`.

