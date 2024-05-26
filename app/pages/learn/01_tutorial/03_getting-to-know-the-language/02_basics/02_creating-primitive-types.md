---
id: lang.basics.primitives
title: Creating Primitive Type Variables in Your Programs
slug: learn/language-basics/primitive-types
slug_history:
- learn/creating-primitive-type-variables-in-your-programs
type: tutorial-group
group: language-basics
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Primitive Types {primitive-types}
- Initializing a Variable with a Default Value {init-with-default-value}
- Creating Values with Literals {creating-with-literals}
- Integer Literals {int-literals}
- Floating-Point Literals {floating-point-literal}
- Character and String Literals {character-string-literals}
- Using Underscore Characters in Numeric Literals {using-underscore}
description: "Syntax to create and initialize primitive type variables."
last_update: 2021-09-22
---

You have already learned that objects store their state in fields. However, the Java programming language also uses the term _variable_ as well. This section discusses this relationship, plus variable naming rules and conventions, basic data types (primitive types, character strings, and arrays), default values, and literals.

<a id="primitive-types">&nbsp;</a>
## Primitive Types

The Java programming language is statically-typed, which means that all variables must first be declared before they can be used. This involves stating the variable's type and name, as you have already seen:

```java
int gear = 1;
```

Doing so tells your program that a field named `gear` exists, holds numerical data, and has an initial value of `1`. A variable's data type determines the values it may contain, plus the operations that may be performed on it. In addition to `int`, the Java programming language supports seven other primitive data types. A primitive type is predefined by the language and is named by a reserved keyword. Primitive values do not share state with other primitive values. The eight primitive data types supported by the Java programming language are:

- `byte`: The `byte` data type is an 8-bit signed two's complement integer. It has a minimum value of -128 and a maximum value of 127 (inclusive). The `byte` data type can be useful for saving memory in large arrays, where the memory savings actually matters. They can also be used in place of `int` where their limits help to clarify your code; the fact that a variable's range is limited can serve as a form of documentation.
- `short`: The `short` data type is a 16-bit signed two's complement integer. It has a minimum value of -32,768 and a maximum value of 32,767 (inclusive). As with `byte`, the same guidelines apply: you can use a short to save memory in large arrays, in situations where the memory savings actually matters.
- `int`: By default, the `int` data type is a 32-bit signed two's complement integer, which has a minimum value of -2<sup>31</sup> and a maximum value of 2<sup>31</sup>-1. In Java SE 8 and later, you can use the `int` data type to represent an unsigned 32-bit integer, which has a minimum value of 0 and a maximum value of 2<sup>32</sup>-1. Use the [`Integer`](javadoc:Integer) class to use `int` data type as an unsigned integer. See the section [The Number Classes](id:lang.numbers_strings.numbers) for more information. Static methods like [`compareUnsigned()`](javadoc:Integer.compareUnsigned(int,int)) have been added to the [`Integer`](javadoc:Integer) class to support the arithmetic operations for unsigned integers.
- `long`: The `long` data type is a 64-bit two's complement integer. The signed long has a minimum value of -2<sup>63</sup> and a maximum value of 2<sup>63</sup>-1. In Java SE 8 and later, you can use the `long` data type to represent an unsigned 64-bit long, which has a minimum value of 0 and a maximum value of 2<sup>64</sup>-1. Use this data type when you need a range of values wider than those provided by `int`. The [`Long`](javadoc:Long) class also contains methods like [`compareUnsigned()`](javadoc:Long.compareUnsigned(long,long)), [`divideUnsigned()`](javadoc:Long.divideUnsigned(long,long)) etc to support arithmetic operations for unsigned long.

- `float`: The `float` data type is a single-precision 32-bit IEEE 754 floating point. Its range of values is beyond the scope of this discussion, but is specified in the [Floating-Point Types, Formats, and Values](doc:floating-point-types) section of the [Java Language Specification](doc:java-language-specification). As with the recommendations for `byte` and `short`, use a `float` (instead of `double`) if you need to save memory in large arrays of floating point numbers. This data type should never be used for precise values, such as currency. For that, you will need to use the [`java.math.BigDecimal`](javadoc:BigDecimal) class instead. [Numbers and Strings](id:lang.numbers_strings) covers [`BigDecimal`](javadoc:BigDecimal) and other useful classes provided by the Java platform.
- `double`: The `double` data type is a double-precision 64-bit IEEE 754 floating point. Its range of values is beyond the scope of this discussion, but is specified in the [Floating-Point Types, Formats, and Values](doc:floating-point-types) section of the [Java Language Specification](doc:java-language-specification). For decimal values, this data type is generally the default choice. As mentioned above, this data type should never be used for precise values, such as currency. 
 - `boolean`: The `boolean` data type has only two possible values: `true` and `false`. Use this data type for simple flags that track true/false conditions. This data type represents one bit of information, but its "size" isn't something that's precisely defined.
- `char`: The `char` data type is a single 16-bit Unicode character. It has a minimum value of `\u0000` (or 0) and a maximum value of `\uffff` (or 65,535 inclusive).

In addition to the eight primitive data types listed above, the Java programming language also provides special support for character strings via the [`java.lang.String`](javadoc:String) class. Enclosing your character string within double quotes will automatically create a new [`String`](javadoc:String) object; for example:

```java
String s = "this is a string";
```

[`String`](javadoc:String) objects are immutable, which means that once created, their values cannot be changed. The [`String`](javadoc:String) class is not technically a primitive data type, but considering the special support given to it by the language, you will probably tend to think of it as such. You will learn more about the [`String`](javadoc:String) class in the section [Strings](id:lang.numbers_strings).


<a id="init-with-default-value">&nbsp;</a>
## Initializing a Variable with a Default Value

It is not always necessary to assign a value when a field is declared. Fields that are declared but not initialized will be set to a reasonable default by the compiler. Generally speaking, this default will be zero or null, depending on the data type. Relying on such default values, however, is generally considered bad programming style.

The following table summarizes the default values for the above data types.

| Data Type              | Default Value (for fields) |
|------------------------|----------------------------|
| byte                   | 0                          |
| short                  | 0                          |
| int                    | 0                          |
| long                   | 0L                         |
| float                  | 0.0f                       |
| double                 | 0.0d                       |
| char                   | `\u0000`                   |
| String (or any object) | null                       |
| boolean                | `false`                    |

Local variables are slightly different; the compiler never assigns a default value to an uninitialized local variable. If you cannot initialize your local variable where it is declared, make sure to assign it a value before you attempt to use it. Accessing an uninitialized local variable will result in a compile-time error.

<a id="creating-with-literals">&nbsp;</a>
## Creating Values with Literals

You may have noticed that the `new` keyword is not used when initializing a variable of a primitive type. Primitive types are special data types built into the language; they are not objects created from a class. A literal is the source code representation of a fixed value; literals are represented directly in your code without requiring computation. As shown below, it is possible to assign a literal to a variable of a primitive type:

```java
boolean result = true;
char capitalC = 'C';
byte b = 100;
short s = 10000;
int i = 100000;
```

<a id="int-literals">&nbsp;</a>
## Integer Literals

An integer literal is of type `long` if it ends with the letter `L` or `l`; otherwise it is of type `int`. It is recommended that you use the upper case letter `L` because the lower case letter `l` is hard to distinguish from the digit `1`.

Values of the integral types `byte`, `short`, `int`, and `long` can be created from `int` literals. Values of type `long` that exceed the range of `int` can be created from `long` literals. Integer literals can be expressed by these number systems:

- Decimal: Base 10, whose digits consists of the numbers 0 through 9; this is the number system you use every day
- Hexadecimal: Base 16, whose digits consist of the numbers 0 through 9 and the letters A through F
- Binary: Base 2, whose digits consists of the numbers 0 and 1 (you can create binary literals in Java SE 7 and later)

For general-purpose programming, the decimal system is likely to be the only number system you will ever use. However, if you need to use another number system, the following example shows the correct syntax. The prefix `0x` indicates hexadecimal and `0b` indicates binary:

```java
// The number 26, in decimal
int decimalValue = 26;

//  The number 26, in hexadecimal
int hexadecimalValue = 0x1a;

// The number 26, in binary
int binaryValue = 0b11010;
```

<a id="floating-point-literal">&nbsp;</a>
## Floating-Point Literals

A floating-point literal is of type `float` if it ends with the letter `F` or `f`; otherwise its type is `double` and it can optionally end with the letter `D` or `d`.

The floating point types (`float` and `double`) can also be expressed using `E` or `e` (for scientific notation), `F` or `f` (32-bit float literal) and `D` or `d` (64-bit double literal; this is the default and by convention is omitted).

```java
double d1 = 123.4;

// same value as d1, but in scientific notation
double d2 = 1.234e2;
float f1  = 123.4f;
```

<a id="character-string-literals">&nbsp;</a>
## Character and String Literals

Literals of types `char` and `String` may contain any Unicode (UTF-16) characters. If your editor and file system allow it, you can use such characters directly in your code. If not, you can use a "Unicode escape" such as `\u0108` (capital C with circumflex), or "S\u00ED Se\u00F1or" (Sí Señor in Spanish). Always use 'single quotes' for `char` literals and "double quotes" for `String` literals. Unicode escape sequences may be used elsewhere in a program (such as in field names, for example), not just in `char` or `String` literals.

The Java programming language also supports a few special escape sequences for `char` and `String` literals: `\b` (backspace), `\t` (tab), `\n` (line feed), `\f` (form feed), `\r` (carriage return), `\"` (double quote), `\'` (single quote), and `\\` (backslash).

There is also a special `null` literal that can be used as a value for any reference type. The `null` literal may be assigned to any variable, except variables of primitive types. There is little you can do with a `null` value beyond testing for its presence. Therefore, `null` is often used in programs as a marker to indicate that some object is unavailable.

Finally, there is also a special kind of literal called a _class literal_, formed by taking a type name and appending `.class`; for example, `String.class`. This refers to the object that represents the type itself, of type [`Class`](javadoc:Class).

<a id="using-underscore">&nbsp;</a>
## Using Underscore Characters in Numeric Literals

In Java SE 7 and later, any number of underscore characters (`_`) can appear anywhere between digits in a numerical literal. This feature enables you, for example. to separate groups of digits in numeric literals, which can improve the readability of your code.

For instance, if your code contains numbers with many digits, you can use an underscore character to separate digits in groups of three, similar to how you would use a punctuation mark like a comma, or a space, as a separator.

The following example shows other ways you can use the underscore in numeric literals:

```java
long creditCardNumber = 1234_5678_9012_3456L;
long socialSecurityNumber = 999_99_9999L;
float pi =  3.14_15F;
long hexBytes = 0xFF_EC_DE_5E;
long hexWords = 0xCAFE_BABE;
long maxLong = 0x7fff_ffff_ffff_ffffL;
byte nybbles = 0b0010_0101;
long bytes = 0b11010010_01101001_10010100_10010010;
```

You can place underscores only between digits; you cannot place underscores in the following places:

- At the beginning or end of a number
- Adjacent to a decimal point in a floating point literal
- Prior to an `F` or `L` suffix
- In positions where a string of digits is expected

The following examples demonstrate valid and invalid underscore placements in numeric literals:

```java
// Invalid: cannot put underscores
// adjacent to a decimal point
float pi1 = 3_.1415F;
// Invalid: cannot put underscores
// adjacent to a decimal point
float pi2 = 3._1415F;
// Invalid: cannot put underscores
// prior to an L suffix
long socialSecurityNumber1 = 999_99_9999_L;

// OK (decimal literal)
int x1 = 5_2;
// Invalid: cannot put underscores
// At the end of a literal
int x2 = 52_;
// OK (decimal literal)
int x3 = 5_______2;

// Invalid: cannot put underscores
// in the 0x radix prefix
int x4 = 0_x52;
// Invalid: cannot put underscores
// at the beginning of a number
int x5 = 0x_52;
// OK (hexadecimal literal)
int x6 = 0x5_2;
// Invalid: cannot put underscores
// at the end of a number
int x7 = 0x52_;
```
