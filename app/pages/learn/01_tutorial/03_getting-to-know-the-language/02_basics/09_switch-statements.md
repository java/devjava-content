---
id: lang.basics.switch_statements
title: Branching with Switch Statements
slug: learn/language-basics/switch-statement
slug_history:
- learn/branching-with-switch-statements
group: language-basics
type: tutorial-group
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
toc:
- Using Switch Statements to Control the Flow of Your Program {intro}
- Choosing Between Switch Statements and If-then-else Statements {choosing-between-switch-and-if}
- Using String as a Type for the Case Labels {case-strings}
- Null Selector Variables {null-selector}
description: "How to use switch statements to control the flow of your program."
---


<a id="intro">&nbsp;</a>
## Using Switch Statements to Control the Flow of Your Program

The `switch` statement is one of the five control flow statements available in the Java language. It allows for any number of execution path. A `switch` statement takes a selector variable as an argument and uses the value of this variable to choose the path that will be executed. 

You must choose the type of your selector variable among the following types: 

- `byte`, `short`, `char`, and `int` primitive data types
- `Character`, `Byte`, `Short`, and `Integer` wrapper types
- enumerated types
- the `String` type. 

It is worth noting that the following primitive types cannot be used for the type of your selector variable: `boolean`, `long`, `float`, and `double`. 

Let us see a first example of a `switch` statement. 

```java
int quarter = ...; // any value

String quarterLabel = null;
switch (quarter) {
	case 0: quarterLabel = "Q1 - Winter"; 
			break;
	case 1: quarterLabel = "Q2 - Spring"; 
			break;
	case 2: quarterLabel = "Q3 - Summer"; 
			break;
	case 3: quarterLabel = "Q3 - Summer"; 
			break;
	default: quarterLabel = "Unknown quarter";
};
```

The body of a `switch` statement is known as a `switch` block. A statement in the `switch` block can be labeled with one or more `case` or `default` labels. The `switch` statement evaluates its expression, then executes all statements that follow the matching `case` label.

You may have noticed the use of the `break` keyword. Each `break` statement terminates the enclosing `switch` statement. Control flow continues with the first statement following the `switch` block. The `break` statements are necessary because without them, statements in `switch` blocks fall through. All statements after the matching `case` label are executed in sequence, regardless of the expression of subsequent `case` labels, until a `break` statement is encountered. 

The following code uses fall through to fill the `futureMonths` list. 

```java
int month = 8;
List<String> futureMonths = new ArrayList<>();

switch (month) {
	case 1:  futureMonths.add("January");
	case 2:  futureMonths.add("February");
	case 3:  futureMonths.add("March");
	case 4:  futureMonths.add("April");
	case 5:  futureMonths.add("May");
	case 6:  futureMonths.add("June");
	case 7:  futureMonths.add("July");
	case 8:  futureMonths.add("August");
	case 9:  futureMonths.add("September");
	case 10: futureMonths.add("October");
	case 11: futureMonths.add("November");
	case 12: futureMonths.add("December");
			 break;
	default: break;
}
```

Technically, the final `break` is not required because flow falls out of the `switch` statement. Using a `break` is recommended so that modifying the code is easier and less error prone. 

The `default` section handles all values that are not explicitly handled by one of the `case` sections.

The following code example, shows how a statement can have multiple `case` labels. The code example calculates the number of days in a particular month:

```java
int month = 2;
int year = 2021;
int numDays = 0;

switch (month) {
	case 1: case 3: case 5:   // January March May
	case 7: case 8: case 10:  // July August October
	case 12:
		numDays = 31;
		break;
	case 4: case 6:   // April June
	case 9: case 11:  // September November
		numDays = 30;
		break;
	case 2: // February
		if (((year % 4 == 0) && 
			 !(year % 100 == 0))
			 || (year % 400 == 0))
			numDays = 29;
		else
			numDays = 28;
		break;
	default:
		System.out.println("Invalid month.");
		break;
}
```

This code has one statement for more than one `case`. 


<a id="choosing-between-switch-and-if">&nbsp;</a>
## Choosing Between Switch Statements and If-then-else Statements

Deciding whether to use `if-then-else` statements or a `switch` statement is based on readability and the expression that the statement is testing. An `if-then-else` statement can test expressions based on ranges of values or conditions, whereas a `switch` statement tests expressions based only on a single integer, enumerated value, or `String` object.

For instance, the following code could be written with a `switch` statement. 

```java
int month = ...; // any month
if (month == 1) {
    System.out.println("January");
} else if (month == 2) {
    System.out.println("February");
} ... // and so on
```

On the other hand the following could not be written with a `switch` statement, because `switch` statements do not support labels of type `boolean`.

```java
int temperature = ...; // any temperature
if (temperature < 0) {
    System.out.println("Water is ice");
} else if (temperature < 100){
    System.out.println("Water is liquid, known as water");
} else {
    System.out.println("Water is vapor");
}
```


<a id="case-strings">&nbsp;</a>
## Using String as a Type for the Case Labels

In Java SE 7 and later, you can use a `String` object in the `switch` statement's expression. The following code example displays the number of the month based on the value of the `String` named month. 

```java
String month = ...; // any month
int monthNumber = -1;

switch (month.toLowerCase()) {
	case "january":
		monthNumber = 1;
		break;
	case "february":
		monthNumber = 2;
		break;
	case "march":
		monthNumber = 3;
		break;
	case "april":
		monthNumber = 4;
		break;
	case "may":
		monthNumber = 5;
		break;
	case "june":
		monthNumber = 6;
		break;
	case "july":
		monthNumber = 7;
		break;
	case "august":
		monthNumber = 8;
		break;
	case "september":
		monthNumber = 9;
		break;
	case "october":
		monthNumber = 10;
		break;
	case "november":
		monthNumber = 11;
		break;
	case "december":
		monthNumber = 12;
		break;
	default: 
		monthNumber = 0;
		break;
}
```

The `String` in the `switch` expression is compared with the expressions associated with each `case` label as if the `String.equals()` method were being used. In order for this example to accept any month regardless of case, month is converted to lowercase (with the `toLowerCase()` method), and all the strings associated with the `case` labels are in lowercase.


<a id="null-selector">&nbsp;</a>
## Null Selector Variables

The selector variable of a `switch` statement can be an object, so this object can be null. You should protect your code from null selector variables, because in this case the switch statement will throw a `NullPointerException`.  
