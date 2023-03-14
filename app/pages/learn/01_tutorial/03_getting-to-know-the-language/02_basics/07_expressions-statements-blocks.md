---
id: lang.basics.expressions
title: Expressions, Statements and Blocks
slug: learn/language-basics/expressions-statements-blocks
slug_history:
- learn/expressions-statements-and-blocks
type: tutorial-group
group: language-basics
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Expressions {expressions}
- Floating Point Arithmetic {floating-point-arithmetic}
- Statements {statements}
- Blocks {blocks}
description: "Understanding expressions, statements and blocks, and how to group statements into blocks."
last_update: 2021-09-22
---


<a id="expressions">&nbsp;</a>
## Expressions

An _expression_ is a construct made up of variables, operators, and method invocations, which are constructed according to the syntax of the language, that evaluates to a single value. You have already seen examples of expressions, illustrated in code below:

```java
int cadence = 0;
anArray[0] = 100;
System.out.println("Element 1 at index 0: " + anArray[0]);

int result = 1 + 2; // result is now 3
if (value1 == value2)
    System.out.println("value1 == value2");
```

The data type of the value returned by an expression depends on the elements used in the expression. The expression `cadence = 0` returns an `int` because the assignment operator returns a value of the same data type as its left-hand operand; in this case, `cadence` is an `int`. As you can see from the other expressions, an expression can return other types of values as well, such as `boolean` or `String`.

The Java programming language allows you to construct compound expressions from various smaller expressions as long as the data type required by one part of the expression matches the data type of the other. Here is an example of a compound expression:

```java
1 * 2 * 3
```

In this particular example, the order in which the expression is evaluated is unimportant because the result of multiplication is independent of order; the outcome is always the same, no matter in which order you apply the multiplications. However, this is not true of all expressions. For example, the following expression gives different results, depending on whether you perform the addition or the division operation first:

```java
x + y / 100    // ambiguous
```

You can specify exactly how an expression will be evaluated using balanced parenthesis: `(` and `)`. For example, to make the previous expression unambiguous, you could write the following:

```java
(x + y) / 100  // unambiguous, recommended
```

If you don't explicitly indicate the order for the operations to be performed, the order is determined by the precedence assigned to the operators in use within the expression. Operators that have a higher precedence get evaluated first. For example, the division operator has a higher precedence than does the addition operator. Therefore, the following two statements are equivalent:

```java
x + y / 100   // ambiguous

x + (y / 100) // unambiguous, recommended
```

When writing compound expressions, be explicit and indicate with parentheses which operators should be evaluated first. This practice makes code easier to read and to maintain.


<a id="floating-point-arithmetic">&nbsp;</a>
## Floating Point Arithmetic

Floating point arithmetic is a special world in which common operations may behave unexpectedly. Consider the following code.

```java
double d1 = 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1;
System.out.println("d1 == 1 ? " + (d1 == 1.0));
```

You would probably expect that it prints `true`. Due to the way floating point addition is conducted and rounded, it prints `false`.

Presenting how floating point arithmetic is implemented in Java is beyond the scope of this tutorial. If you need to learn more on this topic, you may watch the following vide.

{% set embed = { slug: 'ajaHQ9S4uTA' } %}
{% include "../../../../templates/partials/_youtube_embed.html" %}


<a id="statements">&nbsp;</a>
## Statements

Statements are roughly equivalent to sentences in natural languages. A statement forms a complete unit of execution. The following types of expressions can be made into a statement by terminating the expression with a semicolon (`;`).

- Assignment expressions
- Any use of `++` or `--`
- Method invocations
- Object creation expressions
- Such statements are called expression statements. Here are some examples of expression statements.

```java
// assignment statement
aValue = 8933.234;

// increment statement
aValue++;

// method invocation statement
System.out.println("Hello World!");

// object creation statement
Bicycle myBike = new Bicycle();
```

In addition to expression statements, there are two other kinds of statements: declaration statements and control flow statements. A declaration statement declares a variable. You have seen many examples of declaration statements already:

```java
// declaration statement
double aValue = 8933.234;
```

Finally, control flow statements regulate the order in which statements get executed. You will learn about control flow statements in the next section, Control Flow Statements.


<a id="blocks">&nbsp;</a>
## Blocks

A _block_ is a group of zero or more statements between balanced braces and can be used anywhere a single statement is allowed. The following example, `BlockDemo`, illustrates the use of blocks:

```java
class BlockDemo {
     public static void main(String[] args) {
          boolean condition = true;
          if (condition) { // begin block 1
               System.out.println("Condition is true.");
          } // end block one
          else { // begin block 2
               System.out.println("Condition is false.");
          } // end block 2
     }
}
```

