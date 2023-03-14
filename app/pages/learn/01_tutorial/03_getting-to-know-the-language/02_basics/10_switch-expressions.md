---
id: lang.basics.switch_expressions
title: Branching with Switch Expressions
slug: learn/language-basics/switch-expression
slug_history:
- learn/branching-with-switch-expressions
group: language-basics
type: tutorial-group
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
toc:
- Modifying the Switch Syntax {switch-syntax}
- Producing a Value {producing-value}
- Adding a Default Clause {default}
- Writing Colon Case in Switch Expressions {colon-case}
- Dealing with Null Values {null-values}
description: "Extend switch so it can be used as either a statement or an expression."
last_update: 2021-09-22
---


<a id="switch-syntax">&nbsp;</a>
## Modifying the Switch Syntax

In Java SE 14 you can use another, more convenient syntax for the `switch` keyword: the `switch` expression.

Several things have motivated this new syntax.

1. The default control flow behavior between switch labels is to fall through. This syntax is error-prone and leads to bugs in applications.
2. The `switch` block is treated as one block. This may be an impediment in the case where you need to define a variable only in one particular `case`.
3. The `switch` statement is a statement. In the examples of the previous sections, a variable is given a value in each `case`. Making it an expression could lead to better and more readable code.

The syntax covered in the previous section, known as _switch statement_ is still available in Java SE 14 and its semantics did not change. Starting with Java SE 14 a new syntax for the `switch` is available: the _switch expression_.

This syntax modifies the syntax of the switch label. Suppose you have the following _switch statement_ in your application.

```java
int day = ...; // any day
int len = 0;
switch (day) {
    case MONDAY:
    case FRIDAY:
    case SUNDAY:
        len = 6;
        break;
    case TUESDAY:
        len = 7;
        break;
    case THURSDAY:
    case SATURDAY:
        len = 8;
        break;
    case WEDNESDAY:
        len = 9;
        break;
}
System.out.println("len = " + len);
```

With the _switch expression_ syntax, you can now write it in the following way.

```java
int day = ...; // any day
int len =
    switch (day) {
        case MONDAY, FRIDAY, SUNDAY -> 6;
        case TUESDAY                -> 7;
        case THURSDAY, SATURDAY     -> 8;
        case WEDNESDAY              -> 9;
    }
System.out.println("len = " + len);
```

The syntax of switch label is now `case L ->`. Only the code to the right of the label is executed if the label is matched. This code may be a single expression, a block, or a throw statement. Because this code is one block, you can define variables in it that are local to this particular block.

This syntax also supports multiple constants per case, separated by commas, as shown on the previous example.


<a id="producing-value">&nbsp;</a>
## Producing a Value

This switch statement can be used as an expression. For instance, the example of the previous section can be rewritten with a switch statement in the following way.

```java
int quarter = ...; // any value

String quarterLabel =
    switch (quarter) {
        case 0  -> "Q1 - Winter";
        case 1  -> "Q2 - Spring";
        case 2  -> "Q3 - Summer";
        case 3  -> "Q3 - Summer";
        default -> "Unknown quarter";
    };
```

If there is only one statement in the `case` block, the value produced by this statement is returned by the `switch` expression.

The syntax in the case of a block of code is a little different. Traditionally, the `return` keyword is used to denote the value produced by a block of code. Unfortunately this syntax leads to ambiguity in the case of the switch statement. Let us consider the following example. This code does not compile, it is just there as an example.

```java
// Be careful, this code does NOT compile!
public String convertToLabel(int quarter) {
    String quarterLabel =
        switch (quarter) {
            case 0  -> {
                System.out.println("Q1 - Winter");
                return "Q1 - Winter";
            };
            default -> "Unknown quarter";
        };
    }
    return quarterLabel;
}
```

The block of code executed in the case where `quarter` is equal to 0 needs to return a value. It uses the `return` keyword to denote this value. If you take a close look at this code, you see that there are two `return` statements: one in the `case` block, and another one in the method block. This is where the ambiguity lies: one may be wondering what is the semantics of the first `return`. Does it mean that the program exits the method with this value? Or does it leave the `switch` statement? Such ambiguities lead to poor readability and error-prone code.

A new syntax has been created to solve this ambiguity: the `yield` statement. The code of the previous example should be written in the following way.

```java
public String convertToLabel(int quarter) {
    String quarterLabel =
        switch (quarter) {
            case 0  -> {
                System.out.println("Q1 - Winter");
                yield "Q1 - Winter";
            };
            default -> "Unknown quarter";
        };
    }
    return quarterLabel;
}
```

The `yield` statement is a statement that can be used in any `case` block of a `switch` statement. It comes with a value, that becomes the value of the enclosing `switch` statement.


<a id="default">&nbsp;</a>
## Adding a Default Clause

Default clauses allow your code to handle cases where the selector value does not match any `case` constant.

The cases of a switch expression must be exhaustive. For all possible values, there must be a matching switch label. Switch statements are not required to be exhaustive. If the selector target does not match any switch label, this switch statement will not do anything, silently. This may be a place for bugs to hide in your application, something you want to avoid.

In most of the cases, exhaustiveness can be achieved using a `default` clause; however, in the case of an `enum` `switch` expression that covers all known constants, you do not need to add this `default` clause.

There is still a case that needs to be dealt with. What would happen if someone adds an enumerated value in an enumeration, but forget to update the switch statements on this enumeration? To handle this case, the compiler adds a `default` clause for you in exhaustive switch statements. This `default` clause will never be executed in normal cases. It will be only if an enumerated value has been added, and will throw an `IncompatibleClassChangeError`.

Handling exhaustiveness is a feature of `switch` expressions that is not provided by traditional `switch` statements and that is used in other cases than `switch` on enumerated values.


<a id="colon-case">&nbsp;</a>
## Writing Colon Case in Switch Expressions

A `switch` expression can also use a traditional `case` block with `case L:`. In this case the fall through semantics does apply. Values are yielded using the `yield` statement.

```java
int quarter = ...; // any value

String quarterLabel =
    switch (quarter) {
        case 0 :  yield "Q1 - Winter";
        case 1 :  yield "Q2 - Spring";
        case 2 :  yield "Q3 - Summer";
        case 3 :  yield "Q3 - Summer";
        default: System.out.println("Unknown quarter");
                 yield "Unknown quarter";
    };
```


<a id="null-values">&nbsp;</a>
## Dealing with Null Values

So far, `switch` statements do not accept null selector values. If you try to `switch` on a null value you will get a `NullPointerException`.

Java SE 17 has a preview feature that enhances `switch` expressions to allow for null values, so you can expect this situation to change.
