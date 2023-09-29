---
id: lang.classes.enums
title: Enums
slug: learn/classes-objects/enums
type: tutorial-group
group: classes-and-objects
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- What are enums? {intro}
- Accessing, evaluating, and comparing enums {accessing}
- Adding members to enums {members}
- Special methods {functionality}
- Using enums as singletons {singletons}
- Abstract methods in enums {abstract}
- Precautions {precautions}
- Conclusion {conclusion}
description: "Working with enums."
last_update: 2023-09-29
author: ["DanielSchmid"]
---
<a id="intro">&nbsp;</a>
## What are enums?

Enums are classes where all instances are known to the compiler.
They are used for creating types that can only have few possible values.

Enums can be created similar to classes but use the `enum` keyword instead of `class`.
In the body, there is a list of instances of the enum called enum constants which are seperated by `,`.
No instances of the enum can be created outside of enum constants.

```java
public enum DayOfWeek {
    // enum constant are listed here:
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
```

All enums implicitly extend [`java.lang.Enum`](javadoc:Enum) and cannot have any subclasses.

<a id="accessing">&nbsp;</a>
## Accessing, evaluating, and comparing enums

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
    case MONDAY ->
        System.out.println("The week just started.");
    case TUESDAY, WEDNESDAY, THURSDAY ->
        System.out.println("We are somewhere in the middle of the week.");
    case FRIDAY ->
        System.out.println("The weekend is near.");
    case SATURDAY, SUNDAY ->
        System.out.println("Weekend");
    default ->
        throw new AssertionError("Should not happen");
}
```

With [Switch Expressions](id:lang.classes-objects.switch-expression),
the compiler can check whether all values of the enum are handled.
If any possible value is missing in a switch expression, there will be a compiler error.
This is referred to as Exhaustiveness and can also be achieved with regular classes 
through [Sealed Classes](https://openjdk.org/jeps/409).

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

<a id="members">&nbsp;</a>
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

<a id="functionality">&nbsp;</a>
## Special methods

All enums have a few methods that are added implicitly.

For example, the method `name()` is present in all enum instances and can be used to get the name of the enum constant.
Similarly, a method named `ordinal()` returns the position of the enum constant in the declaration.
```java
System.out.println(DayOfWeek.MONDAY.name());    // prints "MONDAY"
System.out.println(DayOfWeek.MONDAY.ordinal()); // prints "0" because MONDAY is the first constant in the DayOfWeek enum
```

Aside from instance methods, there are also static methods added to all enums.
The method `values()` returns an array containing all instances of the enum and the method `valueOf(String)` can be used to get a specific instance by its name.
```java
DayOfWeek[] days = DayOfWeek.values(); // all days of the week
DayOfWeek monday = DayOfWeek.valueOf("MONDAY");
```

Furthermore, enums implement the interface [`Comparable`](javadoc:Comparable).
By default, enums are ordered according to their ordinal number
i.e. in the order of occurrence of the enum constant.
This allows for comparing instances of enums as well as sorting or searching.

```java
public void compareDayOfWeek(DayOfWeek dayOfWeek){
    int comparison = dayOfWeek.compareTo(DayOfWeek.WEDNESDAY);
    if ( comparison < 0) {
        System.out.println("It's before the middle of the work week.");
    } else if(comparison > 0){
        System.out.println("It's after the middle of the work week.");
    } else {
        System.out.println("It's the middle of the work week.");
    }
}
```

```java
List<DayOfWeek> days = new ArrayList<>(List.of(DayOfWeek.FRIDAY, DayOfWeek.TUESDAY, DayOfWeek.SATURDAY));
Collections.sort(days);
```


<a id="singletons">&nbsp;</a>
## Using enums as singletons

Since enums can only have a specific number of instances, it is possible to create a singleton by creating an enum with only a single enum constant.
```java
public enum SomeSingleton {
    INSTANCE;
    //fields, methods, etc.
}
```

<a id="abstract">&nbsp;</a>
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

<a id="changing-instances">&nbsp;</a>
## Precautions

Care should be taken when using enums where the number (or names) of instances is subject to change.
Whenever enum constants are changed, other code expecting the old version of the enum might not work as expected.
This may manifest in compilation errors (e.g. when referencing a removed enum constant),
runtime errors (e.g. if there is a `default` case even though the new enum constant should be handled separately)
or other inconsistencies (e.g. if the value of the enum was saved to a file which is then read and expecting that value to still exist).

When changing enum constants, it is recommended to review all code using the enum.
This is especially important in cases where the enum is also used by other people's code.

Furthermore, it might be worth considering to use other options
in case of many instances since listing a lot of instances at a single location in code can be inflexible.
For example, it may be better to use a configuration file for listing all instances
and reading these configuration files in the program in cases like this.

<a id="conclusion">&nbsp;</a>
## Conclusion

Enums provide a simple and safe way of representing a fixed set of constants while keeping most of the flexibilities of classes. They are another special type of class that can be used to write code that is elegant, readable, and maintainable, and work well with other newer modern features like [Switch Expressions](id:lang.classes-objects.switch-expression).

To learn more, visit the javadoc [`java.lang.Enum`](javadoc:Enum).