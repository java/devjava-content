---
id: lang.packages
title: Packages
slug: learn/packages
type: tutorial
category: language
category_order: 11
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
toc:
- Understanding Packages {intro}
- Creating a Package {creating}
- Naming a Package and Naming Conventions {naming}
- Using Package Members {using}
- Wrapping up Packages {wrapping-up}
description: "How to bundle classes and interfaces into packages, how to use classes that are in packages, and how to arrange your file system so that the compiler can find your source files."
---


<a id="intro">&nbsp;</a>
## Understanding Packages

To make types easier to find and use, to avoid naming conflicts, and to control access, programmers bundle groups of related types into packages.

> Definition: A package is a grouping of related types providing access protection and name space management. Note that types refers to classes, interfaces, enumerations, and annotation types. Enumerations and annotation types are special kinds of classes and interfaces, respectively, so types are often referred to in this section simply as classes and interfaces.

The types that are part of the Java platform are members of various packages that bundle classes by function: fundamental classes are in [`java.lang`](javadoc:java.lang), classes for reading and writing (input and output) are in [`java.io`](javadoc:java.io), and so on. You can put your types in packages too.

Suppose you write a group of classes that represent graphic objects, such as circles, rectangles, lines, and points. You also write an interface, `Draggable`, that classes implement if they can be dragged with the mouse.

```java
//in the Draggable.java file
public interface Draggable {
    ...
}

//in the Graphic.java file
public abstract class Graphic {
    ...
}

//in the Circle.java file
public class Circle extends Graphic
    implements Draggable {
    . . .
}

//in the Rectangle.java file
public class Rectangle extends Graphic
    implements Draggable {
    . . .
}

//in the Point.java file
public class Point extends Graphic
    implements Draggable {
    . . .
}

//in the Line.java file
public class Line extends Graphic
    implements Draggable {
    . . .
}
```

You should bundle these classes and the interface in a package for several reasons, including the following:

- You and other programmers can easily determine that these types are related.
- You and other programmers know where to find types that can provide graphics-related functions.
- The names of your types will not conflict with the type names in other packages because the package creates a new namespace.
- You can allow types within the package to have unrestricted access to one another yet still restrict access for types outside the package.


<a id="creating">&nbsp;</a>
## Creating a Package

To create a package, you choose a name for the package (naming conventions are discussed in the next section) and put a package statement with that name at the top of every source file that contains the types (classes, interfaces, enumerations, and annotation types) that you want to include in the package.

The package statement (for example, `package graphics;`) must be the first line in the source file. There can be only one package statement in each source file, and it applies to all types in the file.

> Note: If you put multiple types in a single source file, only one can be public, and it must have the same name as the source file. For example, you can define `public class Circle` in the file `Circle.java`, define `public interface Draggable` in the file `Draggable.java`, define `public enum Day` in the file `Day.java`, and so forth.
> 
> You can include non-public types in the same file as a public type (this is strongly discouraged, unless the non-public types are small and closely related to the public type), but only the public type will be accessible from outside of the package. All the top-level, non-public types will be package private.

If you put the graphics interface and classes listed in the preceding section in a package called `graphics`, you would need six source files, like this:

```java
//in the Draggable.java file
package graphics;
public interface Draggable {
    . . .
}

//in the Graphic.java file
package graphics;
public abstract class Graphic {
    . . .
}

//in the Circle.java file
package graphics;
public class Circle extends Graphic
    implements Draggable {
    . . .
}

//in the Rectangle.java file
package graphics;
public class Rectangle extends Graphic
    implements Draggable {
    . . .
}

//in the Point.java file
package graphics;
public class Point extends Graphic
    implements Draggable {
    . . .
}

//in the Line.java file
package graphics;
public class Line extends Graphic
    implements Draggable {
    . . .
}
```

If you do not use a `package` statement, your type ends up in an unnamed package. Generally speaking, an unnamed package is only for small or temporary applications or when you are just beginning the development process. Otherwise, classes and interfaces belong in named packages.


<a id="naming">&nbsp;</a>
## Naming a Package and Naming Conventions

With programmers worldwide writing classes and interfaces using the Java programming language, it is likely that many programmers will use the same name for different types. In fact, the previous example does just that: It defines a `Rectangle` class when there is already a `Rectangle` class in the [`java.awt`](javadoc:java.awt) package. Still, the compiler allows both classes to have the same name if they are in different packages. The fully qualified name of each `Rectangle` class includes the package name. That is, the fully qualified name of the `Rectangle` class in the `graphics` package is `graphics.Rectangle`, and the fully qualified name of the `Rectangle` class in the [`java.awt`](javadoc:java.awt) package is `java.awt.Rectangle`.

This works well unless two independent programmers use the same name for their packages. What prevents this problem? Convention.

Package names are written in all lower case to avoid conflict with the names of classes or interfaces.

Companies use their reversed Internet domain name to begin their package names—for example, `com.example.mypackage` for a package named `mypackage` created by a programmer at `example.com`.

Name collisions that occur within a single company need to be handled by convention within that company, perhaps by including the region or the project name after the company name (for example, `com.example.region.mypackage`).

Packages in the Java language itself begin with `java.` or `javax.`

In some cases, the internet domain name may not be a valid package name. This can occur if the domain name contains a hyphen or other special character, if the package name begins with a digit or other character that is illegal to use as the beginning of a Java name, or if the package name contains a reserved Java keyword, such as `int`. In this event, the suggested convention is to add an underscore. For example:

| Domain Name                   | Package Name Prefix           |
| ----------------------------- | ----------------------------- |
| `hyphenated-name.example.org` | `org.example.hyphenated_name` |
| `example.int`                 | `int_.example`                |
| `123name.example.com`         | `com.example._123name`        |


<a id="using">&nbsp;</a>
## Using Package Members

The types that comprise a package are known as the package members.

To use a `public` package member from outside its package, you must do one of the following:

- Refer to the member by its fully qualified name
- Import the package member
- Import the member's entire package

Each is appropriate for different situations, as explained in the sections that follow.

### Referring to a Package Member by Its Qualified Name

So far, most of the examples in this tutorial have referred to types by their simple names, such as `Rectangle` and `StackOfInts`. You can use a package member's simple name if the code you are writing is in the same package as that member or if that member has been imported.

However, if you are trying to use a member from a different package and that package has not been imported, you must use the member's fully qualified name, which includes the package name. Here is the fully qualified name for the `Rectangle` class declared in the graphics package in the previous example.

```java
graphics.Rectangle
```

You could use this qualified name to create an instance of `graphics.Rectangle`:

```java
graphics.Rectangle myRect = new graphics.Rectangle();
```

Qualified names are all right for infrequent use. When a name is used repetitively, however, typing the name repeatedly becomes tedious and the code becomes difficult to read. As an alternative, you can import the member or its package and then use its simple name.

### Importing a Package Member

To import a specific member into the current file, put an `import` statement at the beginning of the file before any type definitions but after the `package` statement, if there is one. Here iss how you would import the `Rectangle` class from the graphics package created in the previous section.

```java
import graphics.Rectangle;
```

Now you can refer to the `Rectangle` class by its simple name.

```java
Rectangle myRectangle = new Rectangle();
```

This approach works well if you use just a few members from the graphics package. But if you use many types from a package, you should import the entire package.

### Importing an Entire Package

To import all the types contained in a particular package, use the import statement with the asterisk (`*`) wildcard character.

```java
import graphics.*;
```

Now you can refer to any class or interface in the graphics package by its simple name.

```java
Circle myCircle = new Circle();
Rectangle myRectangle = new Rectangle();
```

The asterisk in the import statement can be used only to specify all the classes within a package, as shown here. It cannot be used to match a subset of the classes in a package. For example, the following does not match all the classes in the graphics package that begin with `A`.

```java
// does not work
import graphics.A*;
```

Instead, it generates a compiler error. With the import statement, you generally import only a single package member or an entire package.

> Note: Another, less common form of import allows you to import the public nested classes of an enclosing class. For example, if the `graphics.Rectangle` class contained useful nested classes, such as `Rectangle.DoubleWide` and `Rectangle.Square`, you could import `Rectangle` and its nested classes by using the following two statements.

```java
import graphics.Rectangle;
import graphics.Rectangle.*;
```
 
> Be aware that the second import statement will not import `Rectangle`.
>
> Another less common form of import, the _static import_ statement, will be discussed at the end of this section.

For convenience, the Java compiler automatically imports two entire packages for each source file: 

1. the [`java.lang`](javadoc:java.lang) package and 
2. the current package (the package for the current file).

### Apparent Hierarchies of Packages

At first, packages appear to be hierarchical, but they are not. For example, the Java API includes a [`java.awt`](javadoc:java.awt) package, a [`java.awt.color`](javadoc:java.awt.color) package, a [`java.awt.font`](javadoc:java.awt.font) package, and many others that begin with [`java.awt`](javadoc:java.awt). However, the [`java.awt.color`](javadoc:java.awt.color) package, the [`java.awt.font`](javadoc:java.awt.font) package, and other `java.awt.xxxx` packages are not included in the [`java.awt`](javadoc:java.awt) package. The prefix [`java.awt`](javadoc:java.awt) (the Java Abstract Window Toolkit) is used for a number of related packages to make the relationship evident, but not to show inclusion.

Importing `java.awt.*` imports all of the types in the [`java.awt`](javadoc:java.awt) package, but it does not import [`java.awt.color`](javadoc:java.awt.color), [`java.awt.font`](javadoc:java.awt.font), or any other `java.awt.xxxx` packages. If you plan to use the classes and other types in [`java.awt.color`](javadoc:java.awt.color) as well as those in [`java.awt`](javadoc:java.awt), you must import both packages with all their files:

```java
import java.awt.*;
import java.awt.color.*;
```

### Name Ambiguities

If a member in one package shares its name with a member in another package and both packages are imported, you must refer to each member by its qualified name. For example, the graphics package defined a class named `Rectangle`. The [`java.awt`](javadoc:java.awt) package also contains a `Rectangle` class. If both `graphics` and [`java.awt`](javadoc:java.awt) have been imported, the following is ambiguous.

```java
Rectangle rect;
```

In such a situation, you have to use the member's fully qualified name to indicate exactly which `Rectangle` class you want. For example,

```java
graphics.Rectangle rect;
```

### The Static Import Statement

There are situations where you need frequent access to static final fields (constants) and static methods from one or two classes. Prefixing the name of these classes over and over can result in cluttered code. The _static import_ statement gives you a way to import the constants and static methods that you want to use so that you do not need to prefix the name of their class.

The [`java.lang.Math`](javadoc:Math) class defines the [`PI`](javadoc:Math.PI) constant and many static methods, including methods for calculating sines, cosines, tangents, square roots, maxima, minima, exponents, and many more. For example,

```java
public static final double PI = 3.141592653589793;

public static double cos(double a) {
    ...
}
```

Ordinarily, to use these objects from another class, you prefix the class name, as follows.

```java
double r = Math.cos(Math.PI * theta);
```

You can use the `static import` statement to import the static members of java.lang.Math so that you don't need to prefix the class name, Math. The static members of Math can be imported either individually:

```java
import static java.lang.Math.PI;
```

or as a group:

```java
import static java.lang.Math.*;
```

Once they have been imported, the static members can be used without qualification. For example, the previous code snippet would become:

```java
double r = Math.cos(PI * theta);
```

Obviously, you can write your own classes that contain constants and static methods that you use frequently, and then use the static import statement. For example,

```java
import static mypackage.MyConstants.*;
```

> Note: Use static import very sparingly. Overusing static import can result in code that is difficult to read and maintain, because readers of the code will not know which class defines a particular static object. Used properly, static import makes code more readable by removing class name repetition.


<a id="wrapping-up">&nbsp;</a>
## Wrapping up  Packages

To create a package for a type, put a `package` statement as the first statement in the source file that contains the type (class, interface, enumeration, or annotation type).

To use a public type that is in a different package, you have three choices: 

1. use the fully qualified name of the type, 
2. import the type, or 
3. import the entire package of which the type is a member.

The path names for a package's source and class files mirror the name of the package.

You might have to set your `CLASSPATH` so that the compiler and the JVM can find the `.class` files for your types.
