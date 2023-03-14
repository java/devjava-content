---
id: lang.inheritance.object_class
title: Object as a Superclass
slug: learn/inheritance/objects
slug_history:
- inheritance/objects
type: tutorial-group
group: inheritance
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Methods From the Object Class {object-class}
- The toString() Method {toString}
- The equals() Method {equals}
- The hashCode() Method {hashCode}
- The getClass() Method {getClass}
- The clone() Method {clone}
- The finalize() Method {finalize}
description: "Listing the methods from the Object class. "
---


<a id="object-class">&nbsp;</a>
## Methods From the Object Class

The Object class, in the [`java.lang`](javadoc:java.lang) package, sits at the top of the class hierarchy tree. Every class is a descendant, direct or indirect, of the [`Object`](javadoc:Object) class. Every class you use or write inherits the instance methods of [`Object`](javadoc:Object). You need not use any of these methods, but, if you choose to do so, you may need to override them with code that is specific to your class. The methods inherited from [`Object`](javadoc:Object) that are discussed in this section are:

- [`protected Object clone() throws CloneNotSupportedException`](javadoc:Object.clone()): Creates and returns a copy of this object.
- [`public boolean equals(Object obj)`](javadoc:Object.equals(Object)): Indicates whether some other object is "equal to" this one.
- [`protected void finalize() throws Throwable`](javadoc:Object.finalize()): Called by the garbage collector on an object when garbage
collection determines that there are no more references to the object
- [`public final Class getClass()`](javadoc:Object.getClass()): Returns the runtime class of an object.
- [`public int hashCode()`](javadoc:Object.hashCode()): Returns a hash code value for the object.
- [`public String toString()`](javadoc:Object.toString()): Returns a string representation of the object.

Note that, as of Java SE 9 the [`finalize()`](javadoc:Object.finalize()) method had been deprecated. Overriding this method is strongly discouraged. 

The [`notify()`](javadoc:Object.notify()), [`notifyAll()`](javadoc:Object.notifyAll()), and [`wait()`](javadoc:Object.wait()) methods of [`Object`](javadoc:Object) all play a part in synchronizing the activities of independently running threads in a program, which is discussed in a later section and will not be covered here. There are five of these methods:

- [`public final void notify()`](javadoc:Object.notify())
- [`public final void notifyAll()`](javadoc:Object.notifyAll())
- [`public final void wait()`](javadoc:Object.wait())
- [`public final void wait(long timeout)`](javadoc:Object.wait(long))
- [`public final void wait(long timeout, int nanos)`](javadoc:Object.wait(long,int))

> Note: There are some subtle aspects to a number of these methods, especially the clone method.


<a id="toString">&nbsp;</a>
## The toString() Method

You should always consider overriding the [`toString()`](javadoc:Object.toString()) method in your classes.

The Object's [`toString()`](javadoc:Object.toString()) method returns a [`String`](javadoc:String) representation of the object, which is very useful for debugging. The [`String`](javadoc:String) representation for an object depends entirely on the object, which is why you need to override [`toString()`](javadoc:Object.toString()) in your classes.

You can use [`toString()`](javadoc:Object.toString()) along with [`System.out.println()`](javadoc:PrintStream.println()) to display a text representation of an object, such as an instance of `Book`:

```java
System.out.println(firstBook.toString());
```

which would, for a properly overridden [`toString()`](javadoc:Object.toString()) method, print something useful, like this:

```java
ISBN: 0201914670; The Swing Tutorial; A Guide to Constructing GUIs, 2nd Edition
```

<a id="equals">&nbsp;</a>
## The equals() Method

The [`equals()`](javadoc:Object.equals(Object)) method compares two objects for equality and returns true if they are equal. The [`equals()`](javadoc:Object.equals(Object)) method provided in the [`Object`](javadoc:Object) class uses the identity operator (`==`) to determine whether two objects are equal. For primitive data types, this gives the correct result. For objects, however, it does not. The [`equals()`](javadoc:Object.equals(Object)) method provided by [`Object`](javadoc:Object) tests whether the object references are equal—that is, if the objects compared are the exact same object.

To test whether two objects are equal in the sense of equivalency (containing the same information), you must override the [`equals()`](javadoc:Object.equals(Object)) method. Here is an example of a `Book` class that overrides [`equals()`](javadoc:Object.equals(Object)):

```java
public class Book {
    String ISBN;
    
    public String getISBN() { 
        return ISBN;
    }
    
    public boolean equals(Object obj) {
        if (obj instanceof Book)
            return ISBN.equals((Book)obj.getISBN()); 
        else
            return false;
    }
}
```

Consider this code that tests two instances of the `Book` class for equality:

```java
// Swing Tutorial, 2nd edition
Book firstBook  = new Book("0201914670");
Book secondBook = new Book("0201914670");
if (firstBook.equals(secondBook)) {
    System.out.println("objects are equal");
} else {
    System.out.println("objects are not equal");
}
```

This program displays objects are equal even though `firstBook` and `secondBook` reference two distinct objects. They are considered equal because the objects compared contain the same ISBN number.

You should always override the [`equals()`](javadoc:Object.equals(Object)) method if the identity operator is not appropriate for your class.

> Note: If you override [`equals()`](javadoc:Object.equals(Object)), you must override [`hashCode()`](javadoc:Object.hashCode()) as well.


<a id="hashCode">&nbsp;</a>
## The hashCode() Method

The value returned by [`hashCode()`](javadoc:Object.hashCode()) is the object's hash code, which is an integer value generated by a hashing algorithm.

By definition, if two objects are equal, their hash code must also be equal. If you override the [`equals()`](javadoc:Object.equals(Object)) method, you change the way two objects are equated and [`Object`](javadoc:Object)'s implementation of [`hashCode()`](javadoc:Object.hashCode())is no longer valid. Therefore, if you override the [`equals()`](javadoc:Object.equals(Object)) method, you must also override the [`hashCode()`](javadoc:Object.hashCode()) method as well.


<a id="getClass">&nbsp;</a>
## The getClass() Method

You cannot override [`getClass()`](javadoc:Object.getClass()).

The [`getClass()`](javadoc:Object.getClass()) method returns a [`Class`](javadoc:Class) object, which has methods you can use to get information about the class, such as its name ([`getSimpleName()`](javadoc:Class.getSimpleName())), its superclass ([`getSuperclass()`](javadoc:Class.getSuperclass())), and the interfaces it implements ([`getInterfaces()`](javadoc:Class.getInterfaces())). For example, the following method gets and displays the class name of an object:

```java
void printClassName(Object obj) {
    System.out.println("The object's" + " class is " +
        obj.getClass().getSimpleName());
}
```

The [`Class`](javadoc:Class) class, in the [`java.lang`](javadoc:java.lang) package, has a large number of methods (more than 50). For example, you can test to see if the class is an annotation ([`isAnnotation()`](javadoc:Class.isAnnotation())), an interface ([`isInterface()`](javadoc:Class.isInterface())), or an enumeration ([`isEnum()`](javadoc:Class.isEnum())). You can see what the object's fields are ([`getFields()`](javadoc:Class.getFields())) or what its methods are ([`getMethods()`](javadoc:Class.getMethods())), and so on.


<a id="clone">&nbsp;</a>
## The clone() Method

If a class, or one of its superclasses, implements the [`Cloneable`](javadoc:Cloneable) interface, you can use the [`clone()`](javadoc:Object.clone()) method to create a copy from an existing object. To create a clone, you write:

```java
aCloneableObject.clone();
```

[`Object`](javadoc:Object)'s implementation of this method checks to see whether the object on which [`clone()`](javadoc:Object.clone()) was invoked implements the [`Cloneable`](javadoc:Cloneable) interface. If the object does not, the method throws a [`CloneNotSupportedException`](javadoc:CloneNotSupportedException) exception. Exception handling will be covered in the section [Exception](id:lang.exception). For the moment, you need to know that [`clone()`](javadoc:Object.clone()) must be declared as

```java
protected Object clone() throws CloneNotSupportedException
```

or

```java
public Object clone() throws CloneNotSupportedException
```

if you are going to write a [`clone()`](javadoc:Object.clone()) method to override the one in [`Object`](javadoc:Object).

If the object on which [`clone()`](javadoc:Object.clone()) was invoked does implement the [`Cloneable`](javadoc:Cloneable) interface, Object's implementation of the [`clone()`](javadoc:Object.clone()) method creates an object of the same class as the original object and initializes the new object's member variables to have the same values as the original object's corresponding member variables.

The simplest way to make your class cloneable is to add `implements` [`Cloneable`](javadoc:Cloneable) to your class's declaration. then your objects can invoke the [`clone()`](javadoc:Object.clone()) method.

For some classes, the default behavior of Object's [`clone()`](javadoc:Object.clone()) method works just fine. If, however, an object contains a reference to an external object, say `ObjExternal`, you may need to override [`clone()`](javadoc:Object.clone()) to get correct behavior. Otherwise, a change in `ObjExternal` made by one object will be visible in its clone also. This means that the original object and its clone are not independent—to decouple them, you must override [`clone()`](javadoc:Object.clone()) so that it clones the object and `ObjExternal`. Then the original object references `ObjExternal` and the clone references a clone of `ObjExternal`, so that the object and its clone are truly independent.


<a id="finalize">&nbsp;</a>
## The finalize() Method

The Object class provides a callback method, [`finalize()`](javadoc:Object.finalize()), that may be invoked on an object when it becomes garbage. Object's implementation of [`finalize()`](javadoc:Object.finalize()) does nothing—you can override [`finalize()`](javadoc:Object.finalize()) to do cleanup, such as freeing resources.

The [`finalize()`](javadoc:Object.finalize()) method may be called automatically by the system, but when it is called, or even if it is called, is uncertain. Therefore, you should not rely on this method to do your cleanup for you. For example, if you do not close file descriptors in your code after performing I/O and you expect [`finalize()`](javadoc:Object.finalize()) to close them for you, you may run out of file descriptors.

As of Java SE 9 the [`finalize()`](javadoc:Object.finalize()) method had been deprecated. Overriding this method is now strongly discouraged. If you need to clean up some resources, you may do so by implementing the [`AutoCloseable`](javadoc:AutoCloseable) interface. This point is covered in detail in the Java I/O section. 




