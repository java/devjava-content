---
id: lang.basics.var
title: Using the Var Type Identifier
slug: learn/language-basics/using-var
slug_history:
- learn/var
type: tutorial-group
group: language-basics
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- The Var Keyword {intro}
- Examples with Var {examples}
- Restrictions on Using Var {restrictions}
description: "Defining Variables with Var."
last_update: 2021-09-23
---


<a id="intro">&nbsp;</a>
## The Var Keyword

Starting with Java SE 10, you can use the `var` type identifier to declare a local variable. In doing so, you let the compiler decide what is the real type of the variable you create. Once created, this type cannot be changed.

Consider the following example.

```java
String message = "Hello world!";
Path path = Path.of("debug.log");
InputStream stream = Files.newInputStream(path);
```

In that case, having to declare the explicit types of the three variables `message`, `path` and `stream` is redundant.

With the `var` type identifier the previous code can be written as follow:

```java
var message = "Hello world!";
var path = Path.of("debug.log");
var stream = Files.newInputStream(path);
```


<a id="examples">&nbsp;</a>
## Examples with Var

The following example shows you how you can use the `var` type identifier to make your code simpler to read. Here the `strings` variable is given the type [`List<String>`](javadoc:List) and the `element` variable the type [`String`](javadoc:String).


```java
var list = List.of("one", "two", "three", "four");
for (var element: list) {
    System.out.println(element);
}
```

On this example, the `path` variable is of type [`Path`](javadoc:Path), and the `stream` variable is of type [`InputStream`](javadoc:InputStream).

```java
var path = Path.of("debug.log");
try (var stream = Files.newInputStream(path)) {
    // process the file
}
```

Note that on the two previous examples, you have used `var` to declare a variable in a for statement and in a try-with-resources statement. These two statements are covered later in this tutorial.


<a id="restrictions">&nbsp;</a>
## Restrictions on Using Var

There are restrictions on the use of the `var` type identifier.

1. You can only use it for _local variables_ declared in methods, constructors and initializer blocks.
2. `var` cannot be used for fields, not for method or constructor parameters.
3. The compiler must be able to choose a type when the variable is declared. Since `null` has no type, the variable must have an initializer.

Following the these restriction, the following class does not compile, because using `var` as a type identifier is not possible for a field or a method parameter.

```java
public class User  {
    private var name = "Sue";

    public void setName(var name) {
        this.name = name;
    }
}
```

The same goes for the following code.

In that case, the compiler cannot guess the real type of `message` because is lacks an initializer.

```java
public String greetings(int message) {
    var greetings;
    if (message == 0) {
        greetings = "morning";
    } else {
        greetings = "afternoon";
    }
    return "Good " + greetings;
}
```
