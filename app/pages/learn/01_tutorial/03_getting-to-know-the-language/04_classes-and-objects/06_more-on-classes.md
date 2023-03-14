---
id: lang.classes.more_classes
title: More on Classes
slug: learn/classes-objects/more-on-classes
slug_history:
- learn/more-on-classes
type: tutorial-group
group: classes-and-objects
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- More on Classes {intro}
- Returning a Value from a Method {returning-a-value}
- Returning a Class or Interface {returning-a-reference}
- Using the this Keyword {using-this}
- Controlling Access to Members of a Class {controlling-access}
- Understanding Class Members {class-members}
- Initializing Fields {initializing-fields}
- Summary of Creating and Using Classes and Objects {wrapping-up}
description: "Understanding the dot operator, the this keyword and access control."
---


<a id="intro">&nbsp;</a>
## More on Classes

This section covers more aspects of classes that depend on using object references and the dot operator that you learned about in the preceding sections on objects:

- Returning values from methods.
- The `this` keyword.
- Class vs. instance members.
- Access control.


<a id="returning-a-value">&nbsp;</a>
## Returning a Value from a Method

A method returns to the code that invoked it when it

- completes all the statements in the method,
- reaches a `return` statement, or
- throws an exception (covered later),
- whichever occurs first.

You declare a method's return type in its method declaration. Within the body of the method, you use the `return` statement to return the value.

Any method declared `void` does not return a value. It does not need to contain a `return` statement, but it may do so. In such a case, a `return` statement can be used to branch out of a control flow block and exit the method and is simply used like this:

```java
return;
```

If you try to return a value from a method that is declared `void`, you will get a compiler error.

Any method that is not declared `void` must contain a `return` statement with a corresponding return value, like this:

```java
return returnValue;
```

The data type of the return value must match the method's declared return type; you cannot return an integer value from a method declared to return a `boolean`.

The `getArea()` method in the `Rectangle` class that was discussed in the sections on objects returns an integer:

```java
// a method for computing the area of the rectangle
public int getArea() {
    return width * height;
}
```

This method returns the integer that the expression `width*height` evaluates to.

The `getArea()` method returns a primitive type. A method can also return a reference type. For example, in a program to manipulate `Bicycle` objects, we might have a method like this:

```java
public Bicycle seeWhosFastest(Bicycle myBike, Bicycle yourBike, Environment env) {
    Bicycle fastest;
    // code to calculate which bike is 
    // faster, given each bike's gear 
    // and cadence and given the 
    // environment (terrain and wind)
    return fastest;
}
```


<a id="returning-a-reference">&nbsp;</a>
## Returning a Class or Interface

If this section confuses you, skip it and return to it after you have finished the section on interfaces and inheritance.

When a method uses a class name as its return type, such as `seeWhosFastest()` does, the class of the type of the returned object must be either a subclass of, or the exact class of, the return type. Suppose that you have a class hierarchy in which `ImaginaryNumber` is a subclass of `java.lang.Number`, which is in turn a subclass of `Object`, as illustrated in the following figure.

<figure>
<p align="center">
    <img src="/assets/images/classes-objects/03_class-hierarchy-imaginary.png" 
        alt="The class hierarchy for `ImaginaryNumber`"
        width="30%"/>
</p>
<figcaption align="center">The class hierarchy for `ImaginaryNumber`</figcaption>
</figure>

Now suppose that you have a method declared to return a `Number`:

```java
public Number returnANumber() {
    ...
}
```

The `returnANumber()` method can return an `ImaginaryNumber` but not an `Object`. An instance of `ImaginaryNumber` is also an instance of `Number` because `ImaginaryNumber` a subclass of `Number`. However, an `Object` is not necessarily a `Number` — it could be a `String` or another type.

You can override a method and define it to return a subclass of the original method, like this:

```java
public ImaginaryNumber returnANumber() {
    ...
}
```

This technique, called _covariant return type_, means that the return type is allowed to vary in the same direction as the subclass.

> Note: You also can use interface names as return types. In this case, the object returned must implement the specified interface.


<a id="using-this">&nbsp;</a>
## Using the this Keyword

Within an instance method or a constructor, this is a reference to the _current object_ — the object whose method or constructor is being called. You can refer to any member of the current object from within an instance method or a constructor by using `this`.

### Using this with a Field

The most common reason for using the `this` keyword is because a field is shadowed by a method or constructor parameter.

For example, the `Point` class was written like this: 

```java
public class Point {
    public int x = 0;
    public int y = 0;
        
    //constructor
    public Point(int a, int b) {
        x = a;
        y = b;
    }
}
```

but it could have been written like this:

```java
public class Point {
    public int x = 0;
    public int y = 0;
        
    //constructor
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```

Each argument to the constructor shadows one of the object's fields — inside the constructor `x` is a local copy of the constructor's first argument. To refer to the `Point` field `x`, the constructor must use `this.x`.


### Using this with a Constructor

From within a constructor, you can also use the `this` keyword to call another constructor in the same class. Doing so is called an explicit constructor invocation. Here is another `Rectangle` class, with a different implementation from the one in the Objects section.

```java
public class Rectangle {
    private int x, y;
    private int width, height;
        
    public Rectangle() {
        this(0, 0, 1, 1);
    }
    public Rectangle(int width, int height) {
        this(0, 0, width, height);
    }
    public Rectangle(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    ...
}
```

This class contains a set of constructors. Each constructor initializes some or all of the rectangle's member variables. The constructors provide a default value for any member variable whose initial value is not provided by an argument. For example, the no-argument constructor creates a 1x1 Rectangle at coordinates 0,0. The two-argument constructor calls the four-argument constructor, passing in the `width` and `height` but always using the 0,0 coordinates. As before, the compiler determines which constructor to call, based on the number and the type of arguments.

If present, the invocation of another constructor must be the first line in the constructor.


<a id="controlling-access">&nbsp;</a>
## Controlling Access to Members of a Class

Access level modifiers determine whether other classes can use a particular field or invoke a particular method. There are two levels of access control:

- At the top level—`public`, or package-private (no explicit modifier).
- At the member level—`public`, `private`, `protected`, or package-private (no explicit modifier).

A class may be declared with the modifier `public`, in which case that class is visible to all classes everywhere. If a class has no modifier (the default, also known as package-private), it is visible only within its own package (packages are named groups of related classes — you will learn about them in a later section.)

At the member level, you can also use the `public` modifier or no modifier (package-private) just as with top-level classes, and with the same meaning. For members, there are two additional access modifiers: `private` and `protected`. The `private` modifier specifies that the member can only be accessed in its own class. The `protected` modifier specifies that the member can only be accessed within its own package (as with package-private) and, in addition, by a subclass of its class in another package.

The following table shows the access to members permitted by each modifier.

| Modifier      | Class | Package | Subclass | World |
|---------------|-------|---------|----------|-------|
| `public`      | Y     | Y       | Y        | Y     |
| `protected`   | Y     | Y       | Y        | N     |
| _no modifier_ | Y     | Y       | N        | N     |
| `private`     | Y     | N       | N        | N     |

The first data column indicates whether the class itself has access to the member defined by the access level. As you can see, a class always has access to its own members. 

The second column indicates whether classes in the same package as the class (regardless of their parentage) have access to the member. 

The third column indicates whether subclasses of the class declared outside this package have access to the member. 

The fourth column indicates whether all classes have access to the member.

Access levels affect you in two ways. First, when you use classes that come from another source, such as the classes in the Java platform, access levels determine which members of those classes your own classes can use. Second, when you write a class, you need to decide what access level every member variable and every method in your class should have.

### Tips on Choosing an Access Level:

If other programmers use your class, you want to ensure that errors from misuse cannot happen. Access levels can help you do this.

Use the most restrictive access level that makes sense for a particular member. Use `private` unless you have a good reason not to.

Avoid `public` fields except for constants. Many of the examples in the tutorial use `public` fields. This may help to illustrate some points concisely, but is not recommended for production code. This is not a good practice because `public` fields tend to link you to a particular implementation and limit your flexibility in changing your code.


<a id="class-members">&nbsp;</a>
## Understanding Class Members

In this section, we discuss the use of the `static` keyword to create fields and methods that belong to the class, rather than to an instance of the class.

### Class Variables

When a number of objects are created from the same class blueprint, they each have their own distinct copies of instance variables. In the case of the `Bicycle` class, the instance variables are `cadence`, `gear`, and `speed`. Each `Bicycle` object has its own values for these variables, stored in different memory locations.

Sometimes, you want to have variables that are common to all objects. This is accomplished with the `static` modifier. Fields that have the `static` modifier in their declaration are called `static` fields or _class variables_. They are associated with the class, rather than with any object. 

Every instance of the class shares a class variable, which is in one fixed location in memory. Any object can change the value of a class variable, but class variables can also be manipulated without creating an instance of the class.

For example, suppose you want to create a number of `Bicycle` objects and assign each a serial number, beginning with 1 for the first object. This `ID` number is unique to each object and is therefore an instance variable. At the same time, you need a field to keep track of how many `Bicycle` objects have been created so that you know what `ID` to assign to the next one. Such a field is not related to any individual object, but to the class as a whole. For this you need a class variable, `numberOfBicycles`, as follows:

```java
public class Bicycle {
        
    private int cadence;
    private int gear;
    private int speed;
        
    // add an instance variable for the object ID
    private int id;
    
    // add a class variable for the
    // number of Bicycle objects instantiated
    private static int numberOfBicycles = 0;
        ...
}
```

Class variables are referenced by the class name itself, as in

```java
Bicycle.numberOfBicycles
```

This makes it clear that they are class variables.

> Note: You can also refer to static fields with an object reference like
> `myBike.numberOfBicycles`
> but this is discouraged because it does not make it clear that they are class variables.

You can use the `Bicycle` constructor to set the `ID` instance variable and increment the `numberOfBicycles` class variable:

```java
public class Bicycle {
        
    private int cadence;
    private int gear;
    private int speed;
    private int id;
    private static int numberOfBicycles = 0;
        
    public Bicycle(int startCadence, int startSpeed, int startGear){
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;

        // increment number of Bicycles
        // and assign ID number
        id = ++numberOfBicycles;
    }

    // new method to return the ID instance variable
    public int getID() {
        return id;
    }
        ...
}
```

### Class Methods

The Java programming language supports static methods as well as static variables. Static methods, which have the `static` modifier in their declarations, should be invoked with the class name, without the need for creating an instance of the class, as in

```java
ClassName.methodName(args)
```

> Note: You can also refer to static methods with an object reference like
> `instanceName.methodName(args)`
> but this is discouraged because it does not make it clear that they are class methods.

A common use for static methods is to access static fields. For example, we could add a static method to the `Bicycle` class to access the `numberOfBicycles` static field:

```java
public static int getNumberOfBicycles() {
    return numberOfBicycles;
}
```

Not all combinations of instance and class variables and methods are allowed:

- Instance methods can access instance variables and instance methods directly.
- Instance methods can access class variables and class methods directly.
- Class methods can access class variables and class methods directly.
- Class methods cannot access instance variables or instance methods directly—they must use an object reference. Also, class methods cannot use the `this` keyword as there is no instance for this to refer to.

### Constants

The `static` modifier, in combination with the `final` modifier, is also used to define constants. The `final` modifier indicates that the value of this field cannot change.

For example, the following variable declaration defines a constant named `PI`, whose value is an approximation of pi (the ratio of the circumference of a circle to its diameter):

```java
static final double PI = 3.141592653589793;
```

Constants defined in this way cannot be reassigned, and it is a compile-time error if your program tries to do so. By convention, the names of constant values are spelled in uppercase letters. If the name is composed of more than one word, the words are separated by an underscore (`_`).

> Note: If a primitive type or a string is defined as a constant and the value is known at compile time, the compiler replaces the constant name everywhere in the code with its value. This is called a compile-time constant. If the value of the constant in the outside world changes (for example, if it is legislated that pi actually should be 3.975), you will need to recompile any classes that use this constant to get the current value.

### The Bicycle Class

After all the modifications made in this section, the `Bicycle` class is now:

```java
public class Bicycle {
        
    private int cadence;
    private int gear;
    private int speed;
        
    private int id;
    
    private static int numberOfBicycles = 0;

        
    public Bicycle(int startCadence,
                   int startSpeed,
                   int startGear) {
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;

        id = ++numberOfBicycles;
    }

    public int getID() {
        return id;
    }

    public static int getNumberOfBicycles() {
        return numberOfBicycles;
    }

    public int getCadence() {
        return cadence;
    }
        
    public void setCadence(int newValue) {
        cadence = newValue;
    }
        
    public int getGear(){
        return gear;
    }
        
    public void setGear(int newValue) {
        gear = newValue;
    }
        
    public int getSpeed() {
        return speed;
    }
        
    public void applyBrake(int decrement) {
        speed -= decrement;
    }
        
    public void speedUp(int increment) {
        speed += increment;
    }
}
```


<a id="initializing-fields">&nbsp;</a>
## Initializing Fields

As you have seen, you can often provide an initial value for a field in its declaration:

```java
public class BedAndBreakfast {

    // initialize to 10
    public static int capacity = 10;

    // initialize to false
    private boolean full = false;
}
```

This works well when the initialization value is available and the initialization can be put on one line. However, this form of initialization has limitations because of its simplicity. If initialization requires some logic (for example, error handling or a for loop to fill a complex array), simple assignment is inadequate. Instance variables can be initialized in constructors, where error handling or other logic can be used. To provide the same capability for class variables, the Java programming language includes _static initialization blocks_.

> Note: It is not necessary to declare fields at the beginning of the class definition, although this is the most common practice. It is only necessary that they be declared and initialized before they are used.

### Static Initialization Blocks

A static initialization block is a normal block of code enclosed in braces, `{ }`, and preceded by the `static` keyword. Here is an example:

```java
static {
    // whatever code is needed for initialization goes here
}
```

A class can have any number of static initialization blocks, and they can appear anywhere in the class body. The runtime system guarantees that static initialization blocks are called in the order that they appear in the source code.

There is an alternative to static blocks — you can write a private static method:

```java
class Whatever {
    public static varType myVar = initializeClassVariable();
        
    private static varType initializeClassVariable() {

        // initialization code goes here
    }
}
```

The advantage of private static methods is that they can be reused later if you need to reinitialize the class variable.

You should be aware that you cannot redefine the content of a static block. Once it has been written, you cannot prevent this block to be executed. If the content of the static block cannot be executed for whatever reason, then your application will not work properly, because you will not be able to instantiate any object for this class. This may happen if your static block contains code that accesses some external resource, like a file system, or a network. 

### Initializing Instance Members

Normally, you would put code to initialize an instance variable in a constructor. There are two alternatives to using a constructor to initialize instance variables: initializer blocks and final methods.

Initializer blocks for instance variables look just like static initializer blocks, but without the static keyword:

```java
{
    // whatever code is needed for initialization goes here
}
```

The Java compiler copies initializer blocks into every constructor. Therefore, this approach can be used to share a block of code between multiple constructors.

A _final method_ cannot be overridden in a subclass. This is discussed in the section on [Inheritance](id:lang.numbers_strings.strings). Here is an example of using a final method for initializing an instance variable:

```java
class Whatever {
    private varType myVar = initializeInstanceVariable();
        
    protected final varType initializeInstanceVariable() {

        // initialization code goes here
    }
}
```

This is especially useful if subclasses might want to reuse the initialization method. The method is final because calling non-final methods during instance initialization can cause problems.


<a id="wrapping-up">&nbsp;</a>
## Summary of Creating and Using Classes and Objects

A class declaration names the class and encloses the class body between braces. The class name can be preceded by modifiers. The class body contains fields, methods, and constructors for the class. A class uses fields to contain state information and uses methods to implement behavior. Constructors that initialize a new instance of a class use the name of the class and look like methods without a return type.

You control access to classes and members in the same way: by using an access modifier such as public in their declaration.

You specify a class variable or a class method by using the `static` keyword in the member's declaration. A member that is not declared as `static` is implicitly an instance member. Class variables are shared by all instances of a class and can be accessed through the class name as well as an instance reference. Instances of a class get their own copy of each instance variable, which must be accessed through an instance reference.

You create an object from a class by using the `new` operator and a constructor. The `new` operator returns a reference to the object that was created. You can assign the reference to a variable or use it directly.

Instance variables and methods that are accessible to code outside of the class that they are declared in can be referred to by using a qualified name. The qualified name of an instance variable looks like this:

```java
objectReference.variableName
```

The qualified name of a method looks like this:

```java
objectReference.methodName(argumentList)
```

or: 

```java
objectReference.methodName()
```

The garbage collector automatically cleans up unused objects. An object is unused if the program holds no more references to it. You can explicitly drop a reference by setting the variable holding the reference to `null`.

