---
id: lang.classes-objects.enums
title: Enumerations
slug: learn/classes-objects/enums
type: tutorial-group
group: classes_objects
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
description: "Working with enumerations."
last_update: 2023-09-28
author: ["DanielSchmid"]
---
## What are enums?
Enums are classes where all instances are known to the compiler.
They are used for creating types that can only have few possible values.

Enums can be created similar to classes but use the `enum` keyword instead of `class`.
In the body, there is a list of instances of the enum named enum constants which are seperated by `,`.
No instances of the enum can be created outside of enum constants.

```java
public enum DayOfWeek {
	MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
```

All enums implicitely extend `java.lang.Enum` and cannot have any subclasses.

## Accessing and comparing enums
The values of an enum can be used as constants.
In order to check whether two instances of an enum are the same, the `==` operator can be used.
```java
DayOfWeek weekStart = DayOfWeek.MONDAY;

if (weekStart == DayOfWeek.MONDAY) {
	System.out.println("The week starts on Monday.");
}
```

It is also possible to use `switch` for performing actions depending on the value of the enum.

```java
DayOfWeek someDay = DayOfWeek.FRIDAY;

switch (someDay) {
	case MONDAY:
		System.out.println("The week just started.");
		break;
	case TUESDAY:
	case WEDNESDAY:
	case THURSDAY:
		System.out.println("We are somewhere in the middle of the week.");
		break;
	case FRIDAY:
		System.out.println("The weekend is near.");
		break;
	case SATURDAY:
	case SUNDAY:
		System.out.println("Weekend");
		break;
	default:
		throw new AssertionError("Should not happen");
}
```

With [Switch Expressions](id:lang.classes-objects.switch-expression),
the compiler can check whether all values of the enum are handled.
```java
DayOfWeek someDay = DayOfWeek.FRIDAY;

String text = switch (someDay) {
	case MONDAY -> "The week just started.";
	case TUESDAY, WEDNESDAY, THURSDAY -> "We are somewhere in the middle of the week.";
	case FRIDAY -> "The weekend is near.";
	case SATURDAY, SUNDAY -> "Weekend";
};

System.out.println(text);
```

## Adding members to enums

Just like classes, enums can have constructors, methods and fields.
In order to add these, it is necessary to add a `;` after the list of enum constants.
Arguments to the constructor are passed in parenthesis after the declaration of the enum constant.

```java
public enum DayOfWeek {
	MONDAY("MON"), TUESDAY("TUE"), WEDNESDAY("WED"), THURSDAY("THU"), FRIDAY("FRI"), SATURDAY("SAT"), SUNDAY("SUN");
	
	private final String abbreviation;
	
	DayOfWeek(String abbreviation) {
		this.abbreviation = abbreviation;
	}
	
	public String getAbbreviation() {
		return abbreviation;
	}
}
```

## Special methods
All enums have a few methods that are added implicitely.

For example, the method `name()` is present in all enum instances and can be used to get the name of the enum constant.
Similarly, a method named `ordinal()` returns the position of the enum constant in the declaration.
```java
System.out.println(DayOfWeek.MONDAY.name());//MONDAY
System.out.println(DayOfWeek.MONDAY.ordinal());//0 because MONDAY is the first constant in the DayOfWeek enum
```

Aside from instance methods, there are also static methods added to all enums.
The method `values()` returns an array containing all instances of the enum and the method `valueOf(String)` can be used to get a specific instance by its name.
```java
DayOfWeek[] days = DayOfWeek.values();//all days of the week
DayOfWeek monday = DayOfWeek.valueOf("MONDAY");
```

## Using enums for singletons
Since enums can only have a specific number of instances, it is possible to create a singleton by creating an enum with only a single enum constant.
```java
public enum SomeSingleton {
	INSTANCE;
	//fields, methods, etc.
}
```

## Abstract methods in enums
Even though enums cannot be extended, they can still have `abstract` methods. In that case, an implementation must be present in each enum constant.
```java
enum MyEnum {
	A() {
		@Override
		void doSomething() {
			System.out.println("a");
		}
	},
	B() {
		@Override
		void doSomething() {
			System.out.println("b");
		}
	};
	
	abstract void doSomething();
}
```