---
id: lang.basics.operators
title: Using Operators in Your Programs
slug: learn/language-basics/using-operators
type: tutorial-group
group: language-basics
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Operators {intro}
- The Simple Assignment Operator {assignement}
- The Arithmetic Operators {arithmetic}
- The Unary Operators {unary}
- The Equality and Relational Operators {equality-relational}
- The Conditional Operators {conditional}
- The Type Comparison Operator Instanceof {instanceof}
- Bitwise and Bit Shift Operators {bitwise-bitshift}
description: "Computing things with operators."
---


<a id="intro">&nbsp;</a>
## Operators

Now that you have learned how to declare and initialize variables, you probably want to know how to _do something_ with them. Learning the operators of the Java programming language is a good place to start. Operators are special symbols that perform specific operations on one, two, or three operands, and then return a result.

As we explore the operators of the Java programming language, it may be helpful for you to know ahead of time which operators have the highest precedence. The operators in the following table are listed according to precedence order. The closer to the top of the table an operator appears, the higher its precedence. Operators with higher precedence are evaluated before operators with relatively lower precedence. Operators on the same line have equal precedence. When operators of equal precedence appear in the same expression, a rule must govern which is evaluated first. All binary operators except for the assignment operators are evaluated from left to right; assignment operators are evaluated right to left.

| Operators            | Precedence                                                       |
|----------------------|------------------------------------------------------------------|
| postfix              |  `expr++` `expr--`                                               |
| unary                |  `++expr` `--expr` `+expr` `-expr` `~` `!`                       |
| multiplicative       |  `*` `/` `%`                                                     |
| additive             |  `+` `-`                                                         |
| shift                |  `<<` `>>` `>>>`                                                 |
| relational           |  `<` `>` `<=` `>=` `instanceof`                                  |
| equality             |  `==` `!=`                                                       |
| bitwise AND          |  `&`                                                             |
| bitwise exclusive OR |  `^`                                                             |
| bitwise inclusive OR |  <code>&#124;</code>                                             |
| logical AND          |  `&&`                                                            |
| logical OR           |  <code>&#124;&#124;</code>                                       |
| ternary              |  `? :`                                                           |
| assignment           |  `=` `+=` `-=` `*=` `/=` `%=` `&=` `^=` <code>&#124;=</code> `<<=` `>>=` `>>>=`  |

In general-purpose programming, certain operators tend to appear more frequently than others; for example, the assignment operator `=` is far more common than the unsigned right shift operator `>>>`. With that in mind, the following discussion focuses first on the operators that you're most likely to use on a regular basis, and ends focusing on those that are less common. Each discussion is accompanied by sample code that you can compile and run. Studying its output will help reinforce what you've just learned.


<a id="assignement">&nbsp;</a>
## The Simple Assignment Operator

One of the most common operators that you'll encounter is the simple assignment operator `=`. You saw this operator in the `Bicycle` class; it assigns the value on its right to the operand on its left:

```java
int cadence = 0;
int speed = 0;
int gear = 1;
```

This operator can also be used on objects to assign object references, as discussed in the section [Creating Objects](id:lang.classes.creating_objects).


<a id="arithmetic">&nbsp;</a>
## The Arithmetic Operators

The Java programming language provides operators that perform addition, subtraction, multiplication, and division. There is a good chance you will recognize them by their counterparts in basic mathematics. The only symbol that might look new to you is `%`, which divides one operand by another and returns the remainder as its result.

| Operator | Description                                            |
|----------|--------------------------------------------------------|
| `+`      | Additive operator (also used for String concatenation) |
| `-`      | Subtraction operator                                   |
| `*`      | Multiplication operator                                | 
| `/`      | Division operator                                      |
| `%`      | Remainder operator                                     |

The following program, `ArithmeticDemo`, tests the arithmetic operators.

```java
class ArithmeticDemo {

    public static void main (String[] args) {

        int result = 1 + 2;
        // result is now 3
        System.out.println("1 + 2 = " + result);
        int original_result = result;

        result = result - 1;
        // result is now 2
        System.out.println(original_result + " - 1 = " + result);
        original_result = result;

        result = result * 2;
        // result is now 4
        System.out.println(original_result + " * 2 = " + result);
        original_result = result;

        result = result / 2;
        // result is now 2
        System.out.println(original_result + " / 2 = " + result);
        original_result = result;

        result = result + 8;
        // result is now 10
        System.out.println(original_result + " + 8 = " + result);
        original_result = result;

        result = result % 7;
        // result is now 3
        System.out.println(original_result + " % 7 = " + result);
    }
}
```

This program prints the following:

```shell
1 + 2 = 3
3 - 1 = 2
2 * 2 = 4
4 / 2 = 2
2 + 8 = 10
10 % 7 = 3
```

You can also combine the arithmetic operators with the simple assignment operator to create compound assignments. For example, `x += 1;` and `x = x + 1;` both increment the value of `x` by 1.

The `+` operator can also be used for concatenating (joining) two strings together, as shown in the following `ConcatDemo` program:

```java
class ConcatDemo {
    public static void main(String[] args){
        String firstString = "This is";
        String secondString = " a concatenated string.";
        String thirdString = firstString+secondString;
        System.out.println(thirdString);
    }
}
```

By the end of this program, the variable `thirdString` contains `This is a concatenated string.`, which gets printed to standard output.


<a id="unary">&nbsp;</a>
## The Unary Operators

The unary operators require only one operand; they perform various operations such as incrementing/decrementing a value by one, negating an expression, or inverting the value of a boolean.

| Operator | Description |
|----------|-------------|
| `+`        | Unary plus operator; indicates positive value (numbers are positive without this, however) |
| `-`        | Unary minus operator; negates an expression |
| `++`       | Increment operator; increments a value by 1 |
| `--`       | Decrement operator; decrements a value by 1 |
| `!`        | Logical complement operator; inverts the value of a boolean |

The following program, `UnaryDemo`, tests the unary operators:

```java
class UnaryDemo {

    public static void main(String[] args) {

        int result = +1;
        // result is now 1
        System.out.println(result);

        result--;
        // result is now 0
        System.out.println(result);

        result++;
        // result is now 1
        System.out.println(result);

        result = -result;
        // result is now -1
        System.out.println(result);

        boolean success = false;
        // false
        System.out.println(success);
        // true
        System.out.println(!success);
    }
}
```

The increment/decrement operators can be applied before (prefix) or after (postfix) the operand. The code `result++;` and `++result;` will both end in result being incremented by one. The only difference is that the prefix version (`++result`) evaluates to the incremented value, whereas the postfix version (`result++`) evaluates to the original value. If you are just performing a simple increment/decrement, it doesn't really matter which version you choose. But if you use this operator in part of a larger expression, the one that you choose may make a significant difference.

The following program, `PrePostDemo`, illustrates the prefix/postfix unary increment operator:

```java
class PrePostDemo {
    public static void main(String[] args){
        int i = 3;
        i++;
        // prints 4
        System.out.println(i);
        ++i;			   
        // prints 5
        System.out.println(i);
        // prints 6
        System.out.println(++i);
        // prints 6
        System.out.println(i++);
        // prints 7
        System.out.println(i);
    }
}
```


<a id="equality-relational">&nbsp;</a>
## The Equality and Relational Operators

The equality and relational operators determine if one operand is greater than, less than, equal to, or not equal to another operand. The majority of these operators will probably look familiar to you as well. Keep in mind that you must use `==`, not `=`, when testing if two primitive values are equal.

| Operator | Description              |
|----------|--------------------------|
| `==`     | equal to                 |
| `!=`     | not equal to             |
| `>`      | greater than             |
| `>=`     | greater than or equal to |
| `<`      | less than                |
| `<=`     | less than or equal to    |

The following program, `ComparisonDemo`, tests the comparison operators:

```java
class ComparisonDemo {

    public static void main(String[] args){
        int value1 = 1;
        int value2 = 2;
        if(value1 == value2)
            System.out.println("value1 == value2");
        if(value1 != value2)
            System.out.println("value1 != value2");
        if(value1 > value2)
            System.out.println("value1 > value2");
        if(value1 < value2)
            System.out.println("value1 < value2");
        if(value1 <= value2)
            System.out.println("value1 <= value2");
    }
}
```

Running this program produces the following output: 

```shell
value1 != value2
value1 <  value2
value1 <= value2
```


<a id="conditional">&nbsp;</a>
## The Conditional Operators

The `&&` and <code>&#124;&#124;</code> operators perform Conditional-AND and Conditional-OR operations on two boolean expressions. These operators exhibit "short-circuiting" behavior, which means that the second operand is evaluated only if needed.

| Operator                  | Description     |
|---------------------------|-----------------|
| `&&`                      | Conditional-AND |
| <code>&#124;&#124;</code> | Conditional-OR  |

The following program, `ConditionalDemo1`, tests these operators:

```java
class ConditionalDemo1 {

    public static void main(String[] args){
        int value1 = 1;
        int value2 = 2;
        if ((value1 == 1) && (value2 == 2))
            System.out.println("value1 is 1 AND value2 is 2");
        if ((value1 == 1) || (value2 == 1))
            System.out.println("value1 is 1 OR value2 is 1");
    }
}
```

Another conditional operator is `?:`, which can be thought of as shorthand for an `if-then-else` statement (discussed in the [Control Flow Statements section](id:lang.basics.flow)). This operator is also known as the _ternary_ operator because it uses three operands. In the following example, this operator should be read as: "If someCondition is true, assign the value of value1 to result. Otherwise, assign the value of value2 to result."

The following program, `ConditionalDemo2`, tests the `?:` operator:

```java
class ConditionalDemo2 {

    public static void main(String[] args){
        int value1 = 1;
        int value2 = 2;
        int result;
        boolean someCondition = true;
        result = someCondition ? value1 : value2;

        System.out.println(result);
    }
}
```

Because `someCondition` is true, this program prints "1" to the screen. Use the `?:` operator instead of an `if-then-else` statement if it makes your code more readable; for example, when the expressions are compact and without side-effects (such as assignments).


<a id="instanceof">&nbsp;</a>
## The Type Comparison Operator Instanceof

The `instanceof` operator compares an object to a specified type. You can use it to test if an object is an instance of a class, an instance of a subclass, or an instance of a class that implements a particular interface.

The following program, `InstanceofDemo`, defines a parent class (named `Parent`), a simple interface (named `MyInterface`), and a child class (named `Child`) that inherits from the parent and implements the interface.

```java
class InstanceofDemo {
    public static void main(String[] args) {

        Parent obj1 = new Parent();
        Parent obj2 = new Child();

        System.out.println("obj1 instanceof Parent: "
            + (obj1 instanceof Parent));
        System.out.println("obj1 instanceof Child: "
            + (obj1 instanceof Child));
        System.out.println("obj1 instanceof MyInterface: "
            + (obj1 instanceof MyInterface));
        System.out.println("obj2 instanceof Parent: "
            + (obj2 instanceof Parent));
        System.out.println("obj2 instanceof Child: "
            + (obj2 instanceof Child));
        System.out.println("obj2 instanceof MyInterface: "
            + (obj2 instanceof MyInterface));
    }
}

class Parent {}
class Child extends Parent implements MyInterface {}
interface MyInterface {}
```

The following program produces the following output:

```shell
obj1 instanceof Parent: true
obj1 instanceof Child: false
obj1 instanceof MyInterface: false
obj2 instanceof Parent: true
obj2 instanceof Child: true
obj2 instanceof MyInterface: true
```

When using the `instanceof` operator, keep in mind that `null` is not an instance of anything.


<a id="bitwise-bitshift">&nbsp;</a>
## Bitwise and Bit Shift Operators

The Java programming language also provides operators that perform bitwise and bit shift operations on integral types. The operators discussed in this section are less commonly used. Therefore, their coverage is brief; the intent is to simply make you aware that these operators exist.

The unary bitwise complement operator `~` inverts a bit pattern; it can be applied to any of the integral types, making every "0" a "1" and every "1" a "0". For example, a byte contains 8 bits; applying this operator to a value whose bit pattern is `00000000` would change its pattern to `11111111`.


The signed left shift operator `<<` shifts a bit pattern to the left, and the signed right shift operator `>>` shifts a bit pattern to the right. The bit pattern is given by the left-hand operand, and the number of positions to shift by the right-hand operand. The unsigned right shift operator `>>>` shifts a zero into the leftmost position, while the leftmost position after `>>` depends on sign extension.

The bitwise `&` operator performs a bitwise AND operation.

The bitwise `^` operator performs a bitwise exclusive OR operation.

The bitwise `&` operator performs a bitwise inclusive OR operation.

The following program, `BitDemo`, uses the bitwise AND operator to print the number "2" to standard output.

```java
class BitDemo {
    public static void main(String[] args) {
        int bitmask = 0x000F;
        int val = 0x2222;
        // prints "2"
        System.out.println(val & bitmask);
    }
}
```



