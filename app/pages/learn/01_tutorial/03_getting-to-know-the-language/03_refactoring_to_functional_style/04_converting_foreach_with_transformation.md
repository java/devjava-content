---
id: refactoring.iteration.withtransformation
title: Converting Iteration with transformation
slug: learn/refactoring-to-functional-style/iteartionwithtransformation
type: tutorial-group
group: refactoring-to-functional-style
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Transforming while Iterating {transforming}
- From Imperative to Functional Style {imperativetofunctional}
- Picking Elements to Transform {picking}
- Mappings {mappings}
description: "Converting Imperative Iteration with transformation to Functional Style."
last_update: 2024-01-08
author: ["VenkatSubramaniam"]
---

<a id="transforming">&nbsp;</a>
## Transforming while Iterating

In the previous articles in this [tutorial series](id:refactoring) we looked at converting loops with `if` or conditional statements in the imperative style to the functional style. In this article we'll see how to convert an imperative style iteration that transforms data to the functional style. In addition, we'll also refactor code that mixes transforming data with code that picks select elements before the transformation.

Anytime we are transforming data in an imperative style loop, we can use the `map()` function in the functional style. Let's see how.


<a id="imperativetofunctional">&nbsp;</a>
## From Imperative to Functional Style

Here's an example of an iteration, using the `foreach`, that transforms to uppercase a collection of names:

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
for(String name: names) {
  System.out.println(name.toUpperCase());
}
```

Each step through the iteration, the `name` variable is bound to a new value. As the iteration advances from one element to the next in the given collection, each name is transformed to uppercase using the `toUpperCase()` function and the resulting value is printed. We have already seen, in the previous article, how to convert the imperative style `foreach` to the functional style&mdash;using the `stream()` internal iteration. If we merely apply what we have seen before, the resulting functional style code would be rather unwieldy, with the lambda passed to `forEach` performing both transformation and printing, like so:

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
names.forEach(name -> System.out.println(name.toUpperCase())); //Don't do this
```

Even though the above functional style code will produce the same results as the imperative style code, the lambda passed to the `forEach()` function is not cohesive, hard to read, and hard to change.

Before refactoring the imperative style code above to the function style, we should first refactor the imperative style to yet another imperative style implementation to make each line more cohesive, like so:

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
for(String name: names) {
  String nameInUpperCase = name.toUpperCase();
  System.out.println(nameInUpperCase);
}
```

From the previous articles in this series, we know that the `for` can turn into a `stream()` and the printing of the value can be done from within the `forEach()`. That leaves us with the transformation, the call to the `toUpperCase()` function. Such transformations can be done using the `map()` operation on the `stream()`.

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
names.stream()
  .map(name -> name.toUpperCase())
  .forEach(nameInUpperCase -> System.out.println(nameInUpperCase));
```
The `map()` operation transforms the data to a different value based on the function invoked from within the lambda expression that's passed to `map()`. In this example, each name is transformed to its uppercase value. The transformed value is then printed out from within the lambda expression passed to `forEach()`.

We can make the code a bit more concise by using method references instead of lambda expressions, like so:

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
names.stream()
  .map(String::toUpperCase)
  .forEach(System.out::println);
```

Use the `map()` function to transform data while iterating over a collection of data.

<a id="picking">&nbsp;</a>
## Picking Elements to Transform

Suppose, in the middle of the iteration, we want to pick some values from the collection based on some condition and apply a transformation only on those elements. For example, what if we want to transform and print only names of length 4? In the imperative style we could do the following:

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
for(String name: names) {
  if(name.length() == 4) {
    System.out.println(name.toUpperCase());
  }
}
```

We already know that the imperative style `if` can be refactored to the `filter()` function in the functional style. We can perform the transformation, using `map()`, after the `filter()` operation, like so:

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
names.stream()
  .filter(name -> name.length() == 4)
  .map(String::toUpperCase)
  .forEach(System.out::println);
```

The `filter()` function discards data that's not desired and passes on only the values we like to use. The `map()` function transforms the values it sees after the filter.

<a id="mappings">&nbsp;</a>
## Mappings

Anywhere you see transformation of data within a for loop, use the `map()` function to perform the transformation in the functional style. In addition, if the body of the loop has a `if` statement to selectively some value for transformation, then use the `stream()` API with the call to the `filter()` method before using the `map()` method.
