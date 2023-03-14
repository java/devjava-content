---
id: lang.pattern_matching
title: Using Pattern Matching
slug: learn/pattern-matching
slug_history:
- learn/using-pattern-matching
type: tutorial
category: language
category_order: 12
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
toc:
- Introducing Pattern Matching {intro}
- Pattern Matching for Instanceof {instanceof}
- Pattern Matching for Switch {switch}
- Record Pattern {record}
- Pattern Matching for Enhanced for statement {foreach}
- More Patterns {more}
description: "Pattern matching is the next major evolution of the Java language. It brings new features, one by one, that greatly improve the way you can write your Java code."
last_update: 2022-12-21
---

<a id="intro">&nbsp;</a>
## Introducing Pattern Matching

Pattern matching is a feature that is still being worked on. Some elements of this feature have been released as final features in the Java language, some have been released as preview features, and some are still being discussed.

If you want to learn more about pattern matching and provide feedback, then you need to visit the [Amber project page](doc:amber.project.page). The Amber project page is the one-stop page for everything related to pattern matching in the Java language.

If you are new to pattern matching, the first thing you may have in mind is pattern matching in regular expressions. If this is the case, then you may be wondering what does it have to do with "Pattern Matching for instanceof"?

Regular expressions are a form of pattern matching that has been created to analyze strings of characters. It is a good and easy to understand starting point.

Let us write the following code.

```java
String sonnet = "From fairest creatures we desire increase,\n" +
        "That thereby beauty's rose might never die,\n" +
        "But as the riper should by time decease\n" +
        "His tender heir might bear his memory:\n" +
        "But thou, contracted to thine own bright eyes,\n" +
        "Feed'st thy light's flame with self-substantial fuel,\n" +
        "Making a famine where abundance lies,\n" +
        "Thyself thy foe, to thy sweet self too cruel.\n" +
        "Thou that art now the world's fresh ornament,\n" +
        "And only herald to the gaudy spring,\n" +
        "Within thine own bud buriest thy content,\n" +
        "And, tender churl, mak'st waste in niggardly.\n" +
        "Pity the world, or else this glutton be,\n" +
        "To eat the world's due, by the grave and thee.";

Pattern pattern = Pattern.compile("\\bflame\\b");
Matcher matcher = pattern.matcher(sonnet);
while (matcher.find()) {
    String group = matcher.group();
    int start = matcher.start();
    int end = matcher.end();
    System.out.println(group + " " + start + " " + end);
}
```

This code takes the first sonnet of Shakespeare as a text. This text is analyzed with the regular expression `\bflame\b`. This regular expression starts and ends with `\b`. This escaped character has a special meaning in regular expressions: it denotes the start or the end of a word. In this example it means that this pattern matches the word `flame`.

You can do much more things with regular expression. It is outside the scope of this tutorial. If you want to learn more about regular expressions, you can check the [Regular Expressions](id:api.regex) page.

If you run this code, it will print the following:

```shell
flame 233 238
```

This result tells you that there is a single occurrence of `flame` between the index 233 and the index 238 in the sonnet.

Pattern matching with regular expression works in this way:

1. it matches a given _pattern_; `flame` is this example and matches it to a text
2. then it gives you information on the place where the pattern has been matched.

There are three notions that you need to keep in mind for the rest of this tutorial:

1. What you need to match; this is called the _matched target_. Here it is the sonnet.
2. What you match against; this is called the _pattern_. Here the regular expression `flame`.
3. The result of the matching; here the start index and the end index.

These three elements are the fundamental elements of pattern matching.


<a id="instanceof">&nbsp;</a>
## Pattern Matching for Instanceof

### Matching Any Object to a Type with Instanceof

There are several ways of extending pattern matching. The first one that we cover is called _Pattern matching for instanceof_; which has been released as a final feature in Java SE 16.

Let us extend the example of the previous section to the `instanceof` use case. For that, let us consider the folowing example.

```java
public void print(Object o) {
    if (o instanceof String s){
        System.out.println("This is a String of length " + s.length());
    } else {
        System.out.println("This is not a String");
    }
}
```

Let us describe the three elements we presented there.

The _matched target_ is any object of any type. It is the left-hand side operand of the `instanceof` operator: `o`.

The _pattern_ is a type followed by a variable declaration. It is the right hand-side of the `instanceof`. The type can be a class, an abstract class or an interface. In this case, it is just `String s`.

The result of the matching is a new reference to the _matched target_. This reference is put in the variable that is declared as a part of the pattern, `s` in this example. It is created if the _matched target_ matches the _pattern_. This variable has the type you have matched. The `s` variable is called a _pattern variable_ of the pattern. Some pattern may have more than one _pattern variable_.

In our example, the variable `o` is the element you need to match; it is your _matched target_. The _pattern_ is the `String s` declaration. The result of the matching is the variable `s` declared along with the type [`String`](javadoc:String). This variable is created only if `o` is of type [`String`](javadoc:String).

This special syntax where you can define a variable along with the type declared with the `instanceof` is a new syntax added to Java SE 16.

The pattern `String s` is called a _type pattern_, because it checks the type of the matched target. Note that because the type [`String`](javadoc:String) extends the type [`CharSequence`](javadoc:CharSequence), the following pattern would match:

```java
public void print(Object o) {
    if (o instanceof CharSequence cs) {
        System.out.println("This is a CharSequence of length " + s.length());
    }
}
```

### Using the Pattern Variable

The compiler allows you to use the variable `s` wherever it makes sense to use it. The `if` branch is the first scope that comes to mind. It turns out that you can also use this variable in some parts of the `if` statement.

The following code checks if `object` is an instance of the [`String`](javadoc:String) class, and if it is a non-empty string. You can see that it uses the variable `s` in the boolean expression after the `&&`. It makes perfect sense because you evaluate this part of the boolean expression only if the first part is `true`. In that case the variable `s` is created.

```java
public void print(Object o) {
    if (o instanceof String s && !s.isEmpty()) {
        int length = s.length();
        System.out.println("This object is a non-empty string of length " + length);
    } else {
        System.out.println("This object is not a string.");
    }
}
```

There are cases where your code checks for the real type of a variable, and if this type is not the one you expect, then you skip the rest of your code. Consider the following example.

```java
public void print(Object o) {
    if (!(o instanceof String)) {
        return;
    }
    String s = (String)s;
    // do something with s
}
```

Starting with Java SE 16, you can write this code in that way, leveraging pattern matching for `instanceof`:

```java
public void print(Object o) {
    if (!(o instanceof String s)) {
        return;
    }

    System.out.println("This is a String of length " + s.length());
}
```

The `s` pattern variable is available oustide of the `if` statement, as long as your code leaves the method from the `if` branch: either with a `return`, or by throwing an exception. If your code can execute the `if` branch and can carry one with the rest of the method, then the pattern variable is not created.

There are cases where the compiler can tell if the matching fails. Let us consider the following example:

```java
Double pi = Math.PI;
if (pi instanceof String s) {
    // this will never be true!
}
```

The compiler knows that the [`String`](javadoc:String) class is final. So there is no way that the variable `pi` can be of type [`String`](javadoc:String). The compiler will issue an error on this code.

### Writing Cleaner Code with Pattern Matching for Instanceof

There are many places where using this feature will make your code much more readable.

Let us create the following `Point` class, with an `equals()` method. The `hashCode()` method is omitted here.

```java
public class Point {
    private int x;
    private int y;

    public boolean equals(Object o) {
        if (!(o instanceof Point)) {
            return false;
        }
        Point point = (Point) o;
        return x == point.x && y == point.y;
    }

    // constructor, hashCode method and accessors have been omitted
}
```

This is the classic way of writing an `equals()` method; it could have been generated by an IDE.

You can rewrite this `equals()` method with the following code that is leveraging the pattern matching for `instanceof` feature, leading to a much more readable code.

```java
public boolean equals(Object o) {
    return o instanceof Point point &&
            x == point.x &&
            y == point.y;
}
```


<a id="switch">&nbsp;</a>
## Pattern Matching for Switch

### Extending Switch Expressions to Use Type Patterns for Case Labels

Pattern Matching for Switch is not a final feature of the JDK. It is presented as a preview feature in Java SE 17, 18, 19 and 20. We describe the last version here.

Pattern Matching for Switch uses switch statements or expressions. It allows you to match a _matched target_ to several _patterns_ at once. So far the _patterns_ are _type patterns_, just as in the pattern matching for `instanceof`.

In this case the _matched target_ is the selector expression of the switch. There are several _patterns_ in such a feature; each case of the switch expression is itself a type pattern that follows the syntax described in the previous section.

Let us consider the following code.

```java
Object o = ...; // any object
String formatted = null;
if (o instanceof Integer i) {
    formatted = String.format("int %d", i);
} else if (o instanceof Long l) {
    formatted = String.format("long %d", l);
} else if (o instanceof Double d) {
    formatted = String.format("double %f", d);
} else {
    formatted = String.format("Object %s", o.toString());
}
```

You can see that it contains three _type patterns_, one for each if statement. Pattern matching for switch allows to write this code in the following way.

```java
Object o = ...; // any object
String formatter = switch(o) {
    case Integer i -> String.format("int %d", i);
    case Long l    -> String.format("long %d", l);
    case Double d  -> String.format("double %f", d);
    case Object o  -> String.format("Object %s", o.toString());
}
```

Not only does pattern matching for switch makes your code more readable; it also makes it more performant. Evaluating a if-else-if statement is proportional to the number of branches this statement has; doubling the number of branches doubles the evaluation time. Evaluating a switch does not depend on the number of cases. We say that the time complexity of the if statement is _O(n)_ whereas the time complexity of the switch statement is _O(1)_.

So far it is not an extension of pattern matching itself; it is a new feature of the switch, that accepts a type pattern as a case label.

In its current version, the switch expression accepts the following for the case labels:

1. the following numeric types: `byte`, `short`, `char`, and `int` (`long` is not accepted)
2. the corresponding wrapper types: [`Byte`](javadoc:Byte), [`Short`](javadoc:Short), [`Character`](javadoc:Character) and [`Integer`](javadoc:Integer)
3. the type [`String`](javadoc:String)
4. enumerated types.

Pattern matching for switch adds the possibility to use type patterns for the case labels.

### Using Guarded Patterns

In the case of Pattern Matching for `instanceof`, you already know that the pattern variable created if the matched target matches the pattern can be used in the boolean expression that contains the `instanceof`, as in the following example.

```java
Object object = ...; // any object
if (object instanceof String s && !s.isEmpty()) {
    int length = s.length();
    System.out.println("This object is a non-empty string of length " + length);
}
```

This works well in an if statement, because the argument of the statement is a boolean type. In switch expressions, case labels cannot be boolean. So you cannot write the following:

```java
Object o = ...; // any object
String formatter = switch(o) {
    // !!! THIS DOES NOT COMPILE !!!
    case String s && !s.isEmpty() -> String.format("Non-empty string %s", s);
    case Object o                 -> String.format("Object %s", o.toString());
}
```

It turns out that the _pattern matching for switch_ has been extended to allow for a boolean expression to be added after the type pattern. This boolean expression is called a _guard_ and the resulting case label a _guarded case label_. You can add this boolean expression in a `when` clause, with the following syntax.

```java
Object o = ...; // any object
String formatter = switch(o) {
    case String s when !s.isEmpty() -> String.format("Non-empty string %s", s);
    case Object o                   -> String.format("Object %s", o.toString());
}
```

This extended case label is called a _guarded case label_. The expression `String s when !s.isEmpty()` is such a guarded case label. It is formed by a type pattern and a boolean expression.


<a id="record">&nbsp;</a>
## Record Pattern

A _record_ is a special type of immutable class, written as such, introduced in Java SE 16. You can visit our [Record page](id:lang.records) to learn more about this feature.

A record pattern is a special kind of pattern, available as a preview feature in Java SE 19 and 20. A record is built on components, that are declared as part of the declaration of a record. In the following example, the `Point` record has two components: `x` and `y`.

```java
public record Point(int x, int y) {}
```

This information enables a notion called _record deconstruction_, use in record pattern matching. The following code is a first example of the use of a _record pattern_.

```java
Object o = ...; // any object
if (o instanceof Point(int x, int y)) {
    // do something with x and y
}
```

The _target operand_ is still the `o` reference. It is matched to a _record pattern_: `Point(int x, int y)`. This pattern declares two _pattern variables_: `x` and `y`. If `o` is indeed of type `Point`, then these two binding variables are created and initialized by calling the corresponding accessors of the `Point` record.

You can also bind the point itself to another binding variable, with the following syntax.

```java
Object o = ...; // any object
if (o instanceof Point(int x, int y) point) {
    // do something with x, y, and point
}
```

A record pattern is built with the name of the record, `Point` in this example, and one type pattern per component of that record. So when you write `o instanceof Point(int x, int y)`, `int x` and `int y` are type patterns, used to match the first and the second component of the `Point` record. Note that in that case you can define a type pattern with a primitive type. This is not the case for `instanceof`.

The consequence is that a record pattern is built on the same model as the canonical constructor of a record. Even if you create other constructors than the canonical constructor in a given record, the record pattern for that record always follows the syntax of the canonical constructor. So the following code does not compile.

```java
record Point(int x, int y) {
    Point(int x) {
        this(x, 0);
    }
}

Object o = ...; // any object
// !!! THIS DOES NOT COMPILE !!!
if (o intanceof Point(int x)) {

}
```

Record pattern supports type inference. The type of the components you use to write your pattern can be inferred with `var`, or can be an extension of the real type declare in your record.

Because the matching of each component is actually a type pattern, you can match a type that is an extension of the actual type of a component. If you use a type in your pattern that cannot be an extension of the real type of your record component, then you will get a compiler error.

Here is a first example where you can ask the compiler to infer the real type of your binding variable.

```java
record Point(double x, double y) {}

Object o == ...; // any object
if (o instanceof Point(var x, var y)) {
    // x and y are of type double
}
```

On the following example, you can switch on the type of the component of the `Box` record.

```java
record Box(Object o) {}

Object o = ...; // any object
switch (o) {
    case Box(String s)  -> System.out.println("Box contains the string: " + s);
    case Box(Integer i) -> System.out.println("Box contains the integer: " + i);
    default -> System.out.println("Box contains something else");
}
```

As it is the case for `instanceof`, you cannot check for a type that is not possible. Here, the type `Integer` cannot extend the type `CharSequence`, generating a compiler error.

```java
record Box(CharSequence o) {}

Object o = ...; // any object
switch (o) {
    case Box(String s)  -> System.out.println("Box contains the string: " + s);
    // !!! THE FOLLOWING LINE DOES NOT COMPILE !!!
    case Box(Integer i) -> System.out.println("Box contains the integer: " + i);
    default -> System.out.println("Box contains something else");
}
```

Record patterns do not support boxing nor unboxing. So the following code is not valid.

```java
record Point(Integer x, Integer y) {}

Object o = ...; // any object
// !!! DOES NOT COMPILE !!!
if (o instanceof Point(int x, int y)) {
}
```

One last point: record pattern support nesting, so you can write the following code.

```java
record Point(double x, double y) {}
record Circle(Point center, double radius) {}

Object o = ...; // any object
if (o instanceof Circle(Point(var x, var y), var radius)) {
    // Do something with x, y and radius
}
```

<a id="foreach">&nbsp;</a>
## Pattern Matching for Enhanced for statement

The _enhanced for statement_ consists in looping over the elements of an `Iterable` object with the following syntax.

```java
Iterable<String> iterable = ...;
for (String s: iterable) {
    // Do something with s
}
```

Most of the time you will be iterating over collections or arrays, but it is worth noting that you can create your own implementation of `Iterable`, and use this construct with them.

Starting with Java SE 20, Record patterns are supported in this syntax as a preview feature. So you can iterate over a list of points in the following way.

```java
record Point(double x, double y) {}
List<Points> points = ...;

for (Point(double x, double y): points) {
    // Do something with x and y
}
```

There is a number of restrictions though.
1. The collection you iterate over cannot contain any null value. This is only logical: `x` and `y` are initialized by calling the accessors of each instance of `point`.
2. If the pattern you use does not match an element of the collection, then an exception will be thrown.

You need to keep in mind that `double x` and `double y` are themselves type patterns, so you can write a record pattern that may not match all the elements of your iterable object. This is the case in the following example. Note that this example is provided _as is_. Please, never use this kind of thing in your code!

```java
record Box(Object o) {}
List<Box> boxes = List.of(new Box("one"), new Box("two"), new Box(1), new Box(2));

for (Box(String s): boxes) {
    // this code does compile, but will throw a MatchException
    // when reaching the third element
}
```

In both cases, the exception generated is of type `MatchException`, with the exact exception that was thrown as the cause of this exception.


<a id="more">&nbsp;</a>
## More Patterns

Pattern matching is now supported by three elements of the Java language, as final feature or as a preview feature:
- the `instanceof` keyword,
- the `switch` statement and expression,
- and the extends `for` loop.

They all support two kinds of patterns: _type patterns_ and _record patterns_.

There is more to come in the near future. More elements of the Java language could be modified and more kind of patterns will be added. This page will be updated to reflect these modifications.
