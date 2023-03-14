---
id: lang.object
title: Objects, Classes, Interfaces, Packages, and Inheritance
slug: learn/oop
slug_history:
- oop
type: tutorial
category: language
category_order: 1
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
toc:
- What is an Object? {object}
- What is a Class? {class}
- What is Inheritance? {inheritance}
- What is an Interface? {interface}
- What is a Package? {package}
description: "Introducing the object oriented programming."
---

If you've never used an object-oriented programming language before, you will need to learn a few basic concepts before you can begin writing any code. This section will introduce you to objects, classes, inheritance, interfaces, and packages. Each discussion focuses on how these concepts relate to the real world, while simultaneously providing an introduction to the syntax of the Java programming language.


<a id="object">&nbsp;</a>
## What is an Object?

An object is a software bundle of related state and behavior. This section explains how state and behavior are represented within an object, introduces the concept of data encapsulation, and explains the benefits of designing your software in this manner.

Objects share two characteristics: they all have state and behavior. Dogs have state (name, color, breed, hungry) and behavior (barking, fetching, wagging tail). Bicycles also have state (current gear, current pedal cadence, current speed) and behavior (changing gear, changing pedal cadence, applying brakes). Identifying the state and behavior for real-world objects is a great way to begin thinking in terms of object-oriented programming.

Take a minute right now to observe the real-world objects that are in your immediate area. For each object that you see, ask yourself two questions: "What possible states can this object be in?" and "What possible behavior can this object perform?". Make sure to write down your observations. As you do, you'll notice that real-world objects vary in complexity; your desktop lamp may have only two possible states (on and off) and two possible behaviors (turn on, turn off), but your desktop radio might have additional states (on, off, current volume, current station) and behavior (turn on, turn off, increase volume, decrease volume, seek, scan, and tune). You may also notice that some objects, in turn, will also contain other objects. These real-world observations are a starting point to understand the world of object-oriented programming. 

<figure>
<p align="center">
    <img src="/assets/images/oop/01_object.png" 
        alt="A software object"
        width="60%"/>
</p>
<figcaption align="center">A software object</figcaption>
</figure>


Software objects consist of state and related behavior. An object stores its state in _fields_ (variables in some programming languages) and exposes its behavior through _methods_ (functions in some programming languages). Methods operate on an object's internal state and serve as the primary mechanism for object-to-object communication. Hiding internal state and requiring all interaction to be performed through an object's methods is known as _data encapsulation_ — a fundamental principle of object-oriented programming.

Consider a bicycle, for example:

<figure>
<p align="center">
    <img src="/assets/images/oop/02_bicycle.png" 
        alt="A bicycle modeled as a software object"
        width="60%"/>
</p>
<figcaption align="center">A bicycle modeled as a software object</figcaption>
</figure>

By attributing state (current speed, current pedal cadence, and current gear) and providing methods for changing that state, the object remains in control of how the outside world is allowed to use it. For example, if the bicycle only has 6 gears, a method to change gears could reject any value that is less than 1 or greater than 6.

Bundling code into individual software objects provides a number of benefits, including:

1. Modularity: The source code for an object can be written and maintained independently of the source code for other objects. Once created, an object can be easily passed around inside the system.
2. Information-hiding: By interacting only with an object's methods, the details of its internal implementation remain hidden from the outside world.
3. Code re-use: If an object already exists (perhaps written by another software developer), you can use that object in your program. This allows specialists to implement/test/debug complex, task-specific objects, which you can then trust to run in your own code.
4. Pluggability and debugging ease: If a particular object turns out to be problematic, you can simply remove it from your application and plug in a different object as its replacement. This is analogous to fixing mechanical problems in the real world. If a bolt breaks, you replace it, not the entire machine.


<a id="class">&nbsp;</a>
## What is a Class?

In your applications, you will often find many individual objects all of the same kind. There may be thousands of other bicycles in existence, all of the same make and model. Each bicycle was built from the same set of blueprints and therefore contains the same components. In object-oriented terms, we say that your bicycle is an instance of the _class of objects_ known as bicycles. A _class_ is the blueprint from which individual objects are created.

The following `Bicycle` class is one possible implementation of a bicycle:

```java
class Bicycle {

    int cadence = 0;
    int speed = 0;
    int gear = 1;

    void changeCadence(int newValue) {
         cadence = newValue;
    }

    void changeGear(int newValue) {
         gear = newValue;
    }

    void speedUp(int increment) {
         speed = speed + increment;   
    }

    void applyBrakes(int decrement) {
         speed = speed - decrement;
    }

    void printStates() {
         System.out.println("cadence:" +
             cadence + " speed:" + 
             speed + " gear:" + gear);
    }
}
```

The syntax of the Java programming language may look new to you, but the design of this class is based on the previous discussion of bicycle objects. The fields `cadence`, `speed`, and `gear` represent the object's state, and the methods (`changeCadence()`, `changeGear()`, `speedUp()` etc.) define its interaction with the outside world.

You may have noticed that the `Bicycle` class does not contain a `main()` method. That is because it is not a complete application; it is just the blueprint for bicycles that might be used in an application. The responsibility of creating and using new `Bicycle` objects belongs to some other class in your application.

Here is a `BicycleDemo` class that creates two separate `Bicycle` objects and invokes their methods:

```java
class BicycleDemo {
    public static void main(String[] args) {

        // Create two different 
        // Bicycle objects
        Bicycle bike1 = new Bicycle();
        Bicycle bike2 = new Bicycle();

        // Invoke methods on 
        // those objects
        bike1.changeCadence(50);
        bike1.speedUp(10);
        bike1.changeGear(2);
        bike1.printStates();

        bike2.changeCadence(50);
        bike2.speedUp(10);
        bike2.changeGear(2);
        bike2.changeCadence(40);
        bike2.speedUp(10);
        bike2.changeGear(3);
        bike2.printStates();
    }
}
```

The output of this test prints the ending pedal cadence, speed, and gear for the two bicycles:

```shell
cadence:50 speed:10 gear:2
cadence:40 speed:20 gear:3
```


<a id="inheritance">&nbsp;</a>
## What is Inheritance?

Different kinds of objects often have a certain amount in common with each other. Mountain bikes, road bikes, and tandem bikes, for example, all share the characteristics of bicycles (current speed, current pedal cadence, current gear). Yet each also defines additional features that make them different: tandem bicycles have two seats and two sets of handlebars; road bikes have drop handlebars; some mountain bikes have an additional chain ring, giving them a lower gear ratio.

Object-oriented programming allows classes to inherit commonly used state and behavior from other classes. In this example, `Bicycle` now becomes the superclass of `MountainBike`, `RoadBike`, and `TandemBike`. In the Java programming language, each class is allowed to have _one_ direct superclass, and each superclass has the potential for an unlimited number of subclasses:


<figure>
<p align="center">
    <img src="/assets/images/oop/03_inheritance.png" 
        alt="A hierarchy of bicycle classes"
        width="60%"/>
</p>
<figcaption align="center">A hierarchy of bicycle classes</figcaption>
</figure>

The syntax for creating a subclass is simple. At the beginning of your class declaration, use the extends keyword, followed by the name of the class to inherit from:

```java
class MountainBike extends Bicycle {

    // new fields and methods defining 
    // a mountain bike would go here

}
```

This gives `MountainBike` all the same fields and methods as `Bicycle`, yet allows its code to focus exclusively on the features that make it unique. This makes code for your subclasses easy to read. However, you must take care to properly document the state and behavior that each superclass defines, since that code will not appear in the source file of each subclass.


<a id="interface">&nbsp;</a>
## What is an Interface?

As you have already learned, objects define their interaction with the outside world through the methods that they expose. Methods form the object's interface with the outside world; the buttons on the front of your television set, for example, are the interface between you and the electrical wiring on the other side of its plastic casing. You press the "power" button to turn the television on and off.

In its most common form, an interface is a group of related methods with empty bodies. A bicycle's behavior, if specified as an interface, might appear as follows:

```java
interface Bicycle {

    //  wheel revolutions per minute
    void changeCadence(int newValue);

    void changeGear(int newValue);

    void speedUp(int increment);

    void applyBrakes(int decrement);
}
```

To implement this interface, the name of your class would change (to a particular brand of bicycle, for example, such as `ACMEBicycle`), and you would use the `implements` keyword in the class declaration:

```java
class ACMEBicycle implements Bicycle {

    int cadence = 0;
    int speed = 0;
    int gear = 1;

   // The compiler will now require that methods
   // changeCadence, changeGear, speedUp, and applyBrakes
   // all be implemented. Compilation will fail if those
   // methods are missing from this class.

    void changeCadence(int newValue) {
         cadence = newValue;
    }

    void changeGear(int newValue) {
         gear = newValue;
    }

    void speedUp(int increment) {
         speed = speed + increment;   
    }

    void applyBrakes(int decrement) {
         speed = speed - decrement;
    }

    void printStates() {
         System.out.println("cadence:" +
             cadence + " speed:" + 
             speed + " gear:" + gear);
    }
}
```

Implementing an interface allows a class to become more formal about the behavior it promises to provide. Interfaces form a contract between the class and the outside world, and this contract is enforced at build time by the compiler. If your class claims to implement an interface, all methods defined by that interface must appear in its source code before the class will successfully compile.

Note: To actually compile the `ACMEBicycle` class, you will need to add the `public` keyword to the beginning of the implemented interface methods. You will learn the reasons for this later in the sections on [Classes and Objects](id:lang.classes), [Interfaces](id:lang.interface) and [Inheritance](id:lang.numbers_strings.strings).


<a id="package">&nbsp;</a>
## What is a Package?

A package is a namespace that organizes a set of related classes and interfaces. Conceptually you can think of packages as being similar to different folders on your computer. You might keep HTML pages in one folder, images in another, and scripts or applications in yet another. Because software written in the Java programming language can be composed of hundreds or thousands of individual classes, it makes sense to keep things organized by placing related classes and interfaces into packages.

The Java platform provides an enormous class library (a set of packages) suitable for use in your own applications. This library is known as the "Application Programming Interface", or "API" for short. Its packages represent the tasks most commonly associated with general-purpose programming. For example, a [`String`](javadoc:String) object contains state and behavior for character strings; a [`File`](javadoc:File) object allows a programmer to easily create, delete, inspect, compare, or modify a file on the filesystem; a [`Socket`](javadoc:Socket) object allows for the creation and use of network sockets; various GUI objects control buttons and check boxes and anything else related to graphical user interfaces. There are literally thousands of classes to choose from. This allows you, the programmer, to focus on the design of your particular application, rather than the infrastructure required to make it work.

[The Java Platform API Specification](doc:specification) contains the complete listing for all packages, interfaces, classes, fields, and methods supplied by the Java SE platform. Load the page in your browser and bookmark it. As a programmer, it will become your single most important piece of reference documentation.
