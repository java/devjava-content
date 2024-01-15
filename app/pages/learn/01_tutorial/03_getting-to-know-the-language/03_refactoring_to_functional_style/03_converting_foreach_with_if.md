---
id: refactoring.foreach.withif
title: Converting foreach with if
slug: learn/refactoring-to-functional-style/foreachwithif
type: tutorial-group
group: refactoring-to-functional-style
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Iterating with foreach {foreach}
- From Imperative to Functional Style {imperativetofunctional}
- Picking elements with if {picking}
- Mappings {mappings}
description: "Converting Imperative Iteration using foreach with if to Functional Style."
last_update: 2023-07-06
author: ["VenkatSubramaniam"]
---

<a id="foreach">&nbsp;</a>
## Iterating with foreach

In the previous articles in this [tutorial series](id:refactoring) we looked at converting loops written in the imperative style to the functional style. In this article we'll see how to convert an imperative style iteration using `foreach` to the functional style. In addition, we'll also see how to pick select elements using `if` transforms to the functional style.

Java 5 introduced the very popular `foreach` syntax. For example, to iterate over a collection of `String`s representing names, we'd write something like `for(String name: names)`. Under the hood, the `foreach` is converted, at the bytecode level, to use an `Iterator`&mdash;while the iterator tells us there is another element, fetch the next element for processing. In other words, the `foreach` is a nice concise syntax sugar for iteration with a `while` loop over the elements provided by an `Iterator`. We can convert a `foreach` into the functional style quite easily. Let's see how.

<a id="imperativetofunctional">&nbsp;</a>
## From Imperative to Functional Style

Here's an example of iteration, using the `foreach`, over a collection of names:

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
for(String name: names) {
  System.out.println(name);
}
```

Each step through the iteration, the `name` variable is bound to a new value, as the iteration advances from one element to the next in the given collection. Converting the imperative style `foreach` to the functional style is a straight up use of the `forEach` internal iterator method. It is called an internal iterator because the advancing to the next element is handled internally and automatically instead of externally or explicitly.

Let's refactor the loop to use functional style.

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
names.forEach(name -> System.out.println(name));
```

That was pretty straightforward, the `for` loop turned into a call to the `forEach()` method on the collection. Each step through the iteration, the lambda provided to the `forEach()` as an argument is invoked with the next element in the collection.

A slightly variation of this iteration, using `stream()`, is shown next.

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
names.stream()
  .forEach(name -> System.out.println(name));
```
The `forEach()` method is available both on a `Collection<T>` and on a `Stream<T>`. Functions like `filter()`, which we'll use soon, are available only on a `Stream<T>` and not on the `Collection`. This is by design in order to provide efficiency when multiple intermediate operations may precede the terminal operation like `forEach()`, `findFirst()`, etc.

<a id="picking">&nbsp;</a>
## Picking select elements with if

Suppose, in the middle of the iteration, we want to pick some values from the collection based on some condition. For example, what if we want to print only names of length 4? In the imperative style we could do the following:

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
for(String name: names) {
  if(name.length() == 4) {
    System.out.println(name);
  }
}
```

For the functional style, the `filter` method of `Stream` becomes a direct replacement of the imperative style `if`. The `filter` method will allow an element in the collection to pass through to the next stage in the functional pipeline if the predicate, passed in as a lambda, to the `filter()` method evaluates to `true`; otherwise, the value is discarded from further processing.

Let's conver the previous code to functional style:

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
names.stream()
  .filter(name -> name.length() == 4)
  .forEach(name -> System.out.println(name));
```

The `filter()` method acts like a gate, it opens to let some elements pass through and closes to reject or discard some elements, as the iteration moves forward.

We saw in the previous articles the functional style equivalent for the traditional `for` loops. In this article we saw how the imperative style `foreach` of Java 5 transforms into an elegant syntax in the functional style. Furthermore, the `if` condition within a loop of the imperative style translates to a call to the `filter()` method of the `Stream` API.

<a id="mappings">&nbsp;</a>
## Mappings

Anywhere you see a `foreach` loop, use the `forEach()` method directly on the collection. If the body of the `foreach` has a `if` statement to selectively pick some value, then use the `stream()` API with the call to the `filter()` method.

