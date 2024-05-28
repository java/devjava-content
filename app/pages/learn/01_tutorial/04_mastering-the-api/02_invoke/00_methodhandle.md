---
id: api.invoke
title: "Introduction to Method Handles"
slug: learn/introduction_to_method_handles
type: tutorial
category: api
category_order: 1
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
description: "What is method handle mechanism, how is it different from Reflection API, and what tooling does it provide."
author: ["NataliiaDziubenko"]
toc:
  - What are method handles {intro}
  - Access checking {access}
  - Method handle lookup {lookup}
  - Method type {methodtype}
  - Method handle invocation {invocation}
  - Accessing fields {fields}
  - Working with arrays {arrays}
  - Exception handling {exceptions}
  - Method handle transformations {transformations}
  - Method Handles vs Reflection API {vsreflection}
  - Conversion between Reflection API and method handles {unreflect}
  - Conclusion {conclusion}
last_update: 2024-05-04
---

<a id="intro">&nbsp;</a>
## What are method handles
Method handles are a low level mechanism used for method lookup and invocation. It is often compared to reflection,
because both the Reflection API and method handles provide means to invoke methods, constructors and access fields.

What exactly is a method handle? It's a directly invocable reference to an underlying method, constructor, or field.
The Method Handle API allows manipulations on top of simple pointer to the method, that allow us to insert or reorder the
arguments, or transform the return values, for example.

Let's take a closer look at what method handle mechanism can provide and how we can effectively use it.

<a id="access">&nbsp;</a>
## Access checking
The access checking for method handle invocations is done differently compared to the Reflection API. With reflection,
each call results in access checks for the caller. For method handles, the access is only checked when the method handle
is created.

It is important to keep in mind that if the method handle is created within a context where it can access non-public
members, when passed outside, it can still access those non-public members. As a result, non-public members can
potentially be accessed from code where they shouldn't be accessible. It's a developer's responsibility to keep such
method handles private to their context. Alternatively, the method handle can be created with access limitations right
away using the appropriate lookup object.

<a id="lookup">&nbsp;</a>
## Method handle lookup
To create a method handle we first need to create a [`Lookup`](javadoc:Lookup) object, which acts as a factory for
creating method handles. Depending on how the lookup object itself or the method handles are going to be used, we can
decide whether we should limit its access level.

For example, if we create a method handle pointing to a private method and that method handle is accessible from outside,
so is the private method. Normally we would like to avoid that. One way is to make the lookup object and method handle
`private` too. Another option is to create the lookup object using the [`MethodHandles.publicLookup`](javadoc:MethodHandles.publicLookup())
method, so it will only be able to search for public members in public classes within packages that are exported unconditionally:

```java
MethodHandles.Lookup publicLookup = MethodHandles.publicLookup();
```

If we are going to keep the lookup object and the method handles private, it's safe to give them access to any members,
including private and protected ones:

```java
MethodHandles.Lookup lookup = MethodHandles.lookup();
```

<a id="methodtype">&nbsp;</a>
## Method type
To look up a method handle we also need to provide the type information of the method or field. The method
type information is represented as [`MethodType`](javadoc:MethodType) object. To instantiate a `MethodType`,
we have to provide the return type as the first parameter followed by all the argument types:

```java
MethodType methodType = MethodType.methodType(int.class /* the method returns integer */,
        String.class /* and accepts a single String argument*/);
```

Having the `Lookup` and the `MethodType` instances, we can look up the method handle. For instance methods, we should
use [`Lookup.findVirtual`](javadoc:MethodHandles.Lookup.findVirtual(Class,String,MethodType)), and for static methods
[`Lookup.findStatic`](javadoc:MethodHandles.Lookup.findStatic(Class,String,MethodType)). Both of these methods accept the
following arguments: a `Class` where the method is located, a method name represented as a `String`, and a `MethodType`
instance.

In the example below, we are using `Lookup.findVirtual` method to look up an instance method
[`String.replace`](javadoc:String.replace(char,char)), which accepts two `char` arguments and returns a `String`:

```java
MethodHandles.Lookup lookup = MethodHandles.lookup();
MethodType replaceMethodType = MethodType.methodType(String.class, char.class, char.class);
MethodHandle replaceMethodHandle = lookup.findVirtual(String.class, "replace", replaceMethodType);
```

In the next example, we are using `Lookup.findStatic` to look up a static method
[`String.valueOf`](javadoc:String.valueOf(Object)), which accepts an `Object` and returns a `String`:

```java
MethodType valueOfMethodType = MethodType.methodType(String.class, Object.class);
MethodHandle valueOfMethodHandle = lookup.findStatic(String.class, "valueOf", valueOfMethodType);
```

Similarly, we could use [`Lookup.findConstructor`](javadoc:MethodHandles.Lookup.findConstructor(Class,MethodType))
method to look up a method handle pointing to any constructor.

Finally, when we have obtained a method handle, we can invoke the underlying method.

<a id="invocation">&nbsp;</a>
## Method handle invocation
The invocation can also be done in multiple ways.

All the methods that facilitate invocation eventually funnel down to a single method that is called in the end:
[`MethodHandle.invokeExact`](javadoc:MethodHandle.invokeExact(Object...)). As the method name suggests, the arguments
provided to `invokeExact` method must strictly match the method handle's type.

For example, if we invoke a `String.replace` method, the arguments must strictly
correspond to a `String` return type and two `char` arguments:

```java
MethodType replaceMethodType = MethodType.methodType(String.class, char.class, char.class);
MethodHandle replaceMethodHandle = lookup.findVirtual(String.class, "replace", replaceMethodType);
String result = (String) replaceMethodHandle.invokeExact("dummy", 'd', 'm');
```

[`MethodHandle.invoke`](javadoc:MethodHandle.invoke(Object...)) is more permissive. It attempts to obtain a new method
handle with adjusted types that would strictly match the types of provided arguments. After that, it will be able to
invoke the adjusted method handle using `invokeExact`.

```java
MethodType replaceMethodType = MethodType.methodType(String.class, char.class, char.class);
MethodHandle replaceMethodHandle = lookup.findVirtual(String.class, "replace", replaceMethodType);
String result = (String) replaceMethodHandle.invoke((Object)"dummy", (Object)'d', (Object)'m'); // would fail with `invokeExact`
```

One other alternative to invoke a method handle is to use [`MethodHandle.invokeWithArguments`](javadoc:MethodHandle.invokeWithArguments(Object...)).
The result of this method invocation is equivalent to `invoke`, with the only difference that all the arguments can be
provided as an array or list of objects.

One interesting feature of this method is that if the number of provided arguments exceeds the expected number, all the
leftover arguments will be squashed into the last argument, which will be treated as an array.

<a id="fields">&nbsp;</a>
## Accessing fields
It is possible to create method handles that have read or write access to fields. For instance fields, this is
facilitated by [`findGetter`](javadoc:MethodHandles.Lookup.findGetter(Class,String,Class)) and
[`findSetter`](javadoc:MethodHandles.Lookup.findSetter(Class,String,Class)) methods, and for static fields, by
[`findStaticGetter`](javadoc:MethodHandles.Lookup.findStaticGetter(Class,String,Class)) and
[`findStaticSetter`](javadoc:MethodHandles.Lookup.findStaticSetter(Class,String,Class)) methods. We don't need to provide
a `MethodType` instance; instead, we should provide a single type, which is the type of the field.

For example, if we have a static field `magic` in our `Example` class:

```java
private static String magic = "initial value static field";
```

Given that we have created a `Lookup` object:

```java
MethodHandles.Lookup lookup = MethodHandles.lookup();
```

We can simply create both setter and getter method handles and invoke them separately:

```java
MethodHandle setterStaticMethodHandle = lookup.findStaticSetter(Example.class, "magic", String.class);
MethodHandle getterStaticMethodHandle = lookup.findStaticGetter(Example.class, "magic", String.class);

setterStaticMethodHandle.invoke("new value static field");
String staticFieldResult = (String) getterStaticMethodHandle.invoke(); // staticFieldResult == `new value static field`
```

Here is an instance field `abc` of class `Example`:

```java
private String abc = "initial value";
```

We can similarly create method handles for reading and writing to the instance field:

```java
MethodHandle setterMethodHandle = lookup.findSetter(Example.class, "abc", String.class);
MethodHandle getterMethodHandle = lookup.findGetter(Example.class, "abc", String.class);
```

To use setter and getter method handles with an instance field, we must first obtain an instance of the class where the
field belongs:

```java
Example example = new Example();
```

Afterward, we must provide an instance of `Example` for invocation of our setter and getter:

```java
setterMethodHandle.invoke(example, "new value");
String result = (String) getterMethodHandle.invoke(example); // result == `new value`
```

Although it is possible to read and write field values using method handles, it's not common practice. For fields,
it's more suitable to use [`VarHandle`](javadoc:VarHandle)s instead, which can be created using
[`findVarHandle`](javadoc:MethodHandles.Lookup.findVarHandle(Class,String,Class)) and
[`findStaticVarHandle`](javadoc:MethodHandles.Lookup.findStaticVarHandle(Class,String,Class))
methods.

<a id="arrays">&nbsp;</a>
## Working with arrays
The [`MethodHandles`](javadoc:MethodHandles) class contains methods that provide a number of preset method handles.
These include method handles that allow array manipulations. Creating these method handles doesn't require access checking,
so the lookup object is not necessary.

Let's create an array of Strings containing 5 elements using [`arrayConstructor`](javadoc:MethodHandles.arrayConstructor(Class)):

```java
MethodHandle arrayConstructor = MethodHandles.arrayConstructor(String[].class);
String[] arr = (String[]) arrayConstructor.invoke(5);
```

To modify a single element, we can use [`arrayElementSetter`](javadoc:MethodHandles.arrayElementSetter(Class)), to which
we provide the reference to the target array, the index of an element, and the new value:

```java
MethodHandle elementSetter = MethodHandles.arrayElementSetter(String[].class);
elementSetter.invoke(arr, 4, "test");
```

To read the value of a single element, we should use [`arrayElementGetter`](javadoc:MethodHandles.arrayElementGetter(Class))
method handle, to which we provide the reference to an array and the element index:

```java
MethodHandle elementGetter = MethodHandles.arrayElementGetter(String[].class);
String element = (String) elementGetter.invoke(arr, 4); // element == "test"
```

We could also use the method handle provided by [`arrayLength`](javadoc:MethodHandles.arrayLength(Class)) to get the array
length as integer:

```java
MethodHandle arrayLength = MethodHandles.arrayLength(String[].class);
int length = (int) arrayLength.invoke(arr); // length == 5
```

<a id="exceptions">&nbsp;</a>
## Exception handling
Both `invokeExact` and `invoke` throw [`Throwable`](javadoc:Throwable), so there is no limitation to what an underlying
method can throw. The method that invokes a method handle must either explicitly throw a `Throwable` or catch it.

There are certain methods in the `MethodHandles` API that can make exception handling easier. Let's take a look at
several examples.

### `catch` wrapper
The [`MethodHandles.catchException`](javadoc:MethodHandles.catchException(MethodHandle,Class,MethodHandle)) method can
wrap a given method handle inside a provided exception handler method handle.

Say, we have a method `problematicMethod` that performs some business logic, and a method `exceptionHandler` that handles
a particular [`IllegalArgumentException`](javadoc:IllegalArgumentException). The exception handler method must
return the same type as the original method. The first argument it accepts is a `Throwable` that we're interested in,
after which follow the rest of the arguments that we've originally accepted:

```java
public static int problematicMethod(String argument) throws IllegalArgumentException {
    if ("invalid".equals(argument)) {
        throw new IllegalArgumentException();
    }
    return 1;
}

public static int exceptionHandler(IllegalArgumentException e, String argument) {
    // log exception
    return 0;
}
```

We can look up the method handles for both these methods and wrap `problematicMethod` inside an `exceptionHandler`. The
resulting `MethodHandle` will handle the `IllegalArgumentException` properly on invocation, continuing to throw any
other exceptions if they arise.

```java
MethodHandles.Lookup lookup = MethodHandles.lookup();
MethodHandle methodHandle = lookup.findStatic(Example.class, "problematicMethod", MethodType.methodType(int.class, String.class));
MethodHandle handler = lookup.findStatic(Example.class, "exceptionHandler",
MethodType.methodType(int.class, IllegalArgumentException.class, String.class));
MethodHandle wrapped = MethodHandles.catchException(methodHandle, IllegalArgumentException.class, handler);

System.out.println(wrapped.invoke("valid")); // outputs "1"
System.out.println(wrapped.invoke("invalid")); // outputs "0"
```

### `finally` wrapper
The [`MethodHandles.tryFinally`](javadoc:MethodHandles.tryFinally(MethodHandle,MethodHandle)) method works similarly,
but instead of an exception handler, it wraps a target method adding a try-finally block.

Let's say we have a separate method `cleanupMethod` containing cleanup logic. The return type of this method must be the
same as the target method's return type. It must accept a `Throwable` followed by the resulting value coming from the
target method, followed by all the arguments.

```java
public static int cleanupMethod(Throwable e, int result, String argument) {
    System.out.println("inside finally block");
    return result;
}
```

We can wrap the method handle from previous example inside the try-finally block as follows:

```java
MethodHandle cleanupMethod = lookup.findStatic(Example.class, "cleanupMethod",
        MethodType.methodType(int.class, Throwable.class, int.class, String.class));

MethodHandle wrappedWithFinally = MethodHandles.tryFinally(methodHandle, cleanupMethod);

System.out.println(wrappedWithFinally.invoke("valid")); // outputs "inside finally block" and "1"
System.out.println(wrappedWithFinally.invoke("invalid")); // outputs "inside finally block" and throws java.lang.IllegalArgumentException 
```

<a id="transformations">&nbsp;</a>
## Method handle transformations
As seen from previous examples, method handles can encapsulate more behavior than simply pointing to an underlying
method. We can obtain **adapter** method handles, which wrap target method handles to add certain behaviors such as
argument reordering, pre-inserting, or filtering of the return values.

Let's take a look at a couple of such transformations.

### Type transformation
A method handle's type can be adapted to a new type using the [`asType`](javadoc:MethodHandle.asType(MethodType)) method.
If such type conversion is impossible, we will get a [`WrongMethodTypeException`](javadoc:WrongMethodTypeException).
Remember, when we apply transformations, we actually have two method handles, where the original method handle is wrapped
into some extra logic. In this case, the wrapper will take in the arguments and try to convert them to match the original
method handle's arguments. Once the original method handle does its job and returns a result, the wrapper will attempt to
cast this result to the given type.

Assume we have a `test` method that accepts an `Object` and returns a `String`. We can adapt such a method to accept a
more specific argument type, such as `String`:

```java
MethodHandle targetMethodHandle = lookup.findStatic(Example.class, "test", 
        MethodType.methodType(String.class, Object.class));
MethodHandle adapter = targetMethodHandle.asType(
        MethodType.methodType(String.class, String.class));
String originalResult = (String) targetMethodHandle.invoke(111); // works
String adapterResult = (String) adapter.invoke("aaaaaa"); // works
adapterResult = (String) adapter.invoke(111); // fails
```

In fact, each time we use `invoke` on a `MethodHandle`, the first thing that happens is an `asType` call. `invoke`
accepts and returns `Object`s, which are then attempted to be converted to more specific types. These specific types are
derived from our code, i.e., the exact values that we pass as arguments and the type that we cast our return value to.
Once the types are successfully converted, the `invokeExact` method is then called for these specific types.

### Permute arguments
To obtain an adapter method handle with reordered arguments, we can use
[`MethodHandles.permuteArguments`](javadoc:MethodHandles.permuteArguments(MethodHandle,MethodType,int...)).

For example, let's create a `test` method that accepts a bunch of arguments of different types:

```java
public static void test(int v1, String v2, long v3, boolean v4) {
    System.out.println(v1 + v2 + v3 + v4);
}
```

And look up a method handle for it:

```java
MethodHandle targetMethodHandle = lookup.findStatic(Example.class, "test",
        MethodType.methodType(void.class, int.class, String.class, long.class, boolean.class));
```

The `permuteArguments` method accepts:
- Target method handle, in our case the one pointing to `test` method;
- New `MethodType` with all the arguments reordered in desired way;
- An index array designating the new order of the arguments.

```java
MethodHandle reversedArguments = MethodHandles.permuteArguments(targetMethodHandle,
        MethodType.methodType(void.class, boolean.class, long.class, String.class, int.class), 3, 2, 1, 0);
reversedArguments.invoke(false, 1L, "str", 123); // outputs: "123str1false"
```

### Insert arguments
The [`MethodHandles.insertArguments`](javadoc:MethodHandles.insertArguments(MethodHandle,int,Object...)) method provides
a `MethodHandle` with one or more bound arguments.

For example, let's look again at the method handle from previous example:

```java
MethodHandle targetMethodHandle = lookup.findStatic(Example.class, "test",
        MethodType.methodType(void.class, int.class, String.class, long.class, boolean.class));
```

We can easily obtain an adapter `MethodHandle` with `String` and `long` arguments bound in advance:

```java
MethodHandle boundArguments = MethodHandles.insertArguments(targetMethodHandle, 1, "new", 3L);
```

To invoke the resulting adapter method handle, we only need to provide the arguments that are not pre-filled:

```java
boundArguments.invoke(1, true); // outputs: "1new3true"
```

If we try to pass the arguments that are already prefilled, we will fail with a `WrongMethodTypeException`.

### Filter arguments
We can use [`MethodHandles.filterArguments`](javadoc:MethodHandles.filterArguments(MethodHandle,int,MethodHandle...))
to apply transformations to arguments before invocation of the target method handle. To make it work, we have to provide:

- The target method handle;
- The position of the first argument to transform;
- Method handles for the transformations of each argument.

If certain arguments don't require transformation, we can skip them by passing `null`. It's also possible to skip the
rest of the arguments entirely if we only need to transform a subset of them.

Let's reuse the method handle from the previous section and filter some its arguments before its invocation.

```java
MethodHandle targetMethodHandle = lookup.findStatic(Example.class, "test",
        MethodType.methodType(void.class, int.class, String.class, long.class, boolean.class));
```

Let's create a method that transforms any `boolean` value by negating it:

```java
private static boolean negate(boolean original) {
    return !original;
}
```

and also construct a method that increments any given integer value:

```java
private static int increment(int original) {
    return ++original;
}
```

We can obtain method handles for these transformation methods:

```java
MethodHandle negate = lookup.findStatic(Example.class, "negate", MethodType.methodType(boolean.class, boolean.class));
MethodHandle increment = lookup.findStatic(Example.class, "increment", MethodType.methodType(int.class, int.class));
```

and use them to get a new method handle having filtered arguments:

```java
// applies filter 'increment' to argument at index 0, 'negate' to the last argument, 
// and passes the result to 'targetMethodHandle'
MethodHandle withFilters = MethodHandles.filterArguments(targetMethodHandle, 0, increment, null, null, negate);
withFilters.invoke(3, "abc", 5L, false); // outputs "4abc5true"
```

### Fold arguments
When we want to perform pre-processing of one or more arguments before the invocation of a `MethodHandle`, we
can use [`MethodHandles.foldArguments`](javadoc:MethodHandles.foldArguments(MethodHandle,int,MethodHandle)) and provide
it with the method handle of any combiner method which will accept arguments starting at any preferred position.

Let's assume that we have a `target` method:

```java
private static void target(int ignored, int sum, int a, int b) {
    System.out.printf("%s + %s equals %s and %s is ignored%n", a, b, sum, ignored);
}
```

Using `foldArguments` we can pre-process a subset of its arguments and insert the resulting value as another
argument and proceed to execution of the `target` method.

In our example, we have arguments `int a, int b` at the end. We can pre-process any amount of arguments, but they all
must be at the end. Let's say, we would like to calculate a sum of these two values `a` and `b`, so let's create a method
for that:

```java
private static int sum(int a, int b) {
    return a + b;
}
```

Where will the resulting value go exactly? It will be inserted into one of the arguments of our `target` method. It must
be the argument right before the arguments that we are going to fold, so in our example argument `int sum`. The argument
reserved for the folding result can't be at any other position. If the `target` method needs to accept more arguments not
related to this folding logic, they all must go first.

Let's create the method handles and see how we should combine them together:

```java
MethodHandle targetMethodHandle = lookup.findStatic(Example.class, "target",
        MethodType.methodType(void.class, int.class, int.class, int.class, int.class));
MethodHandle combinerMethodHandle = lookup.findStatic(Example.class, "sum",
        MethodType.methodType(int.class, int.class, int.class));
MethodHandle preProcessedArguments = MethodHandles.foldArguments(targetMethodHandle, 1, combinerMethodHandle);
```

The `foldArguments` method accepts:
- Target method handle, in our case the one pointing to `target` method;
- `int` number specifying the starting position of arguments related to folding. In our case, the `sum` argument
  is located at position `1`, so we passed `1`. If we skip this argument, `pos` will default to `0`.
- Combiner method handle, in our case it's the one pointing to `sum` method.

At the end, we can invoke the resulting method handle and pass all the arguments except `sum` which is going to be
pre-calculated:

```java
preProcessedArguments.invokeExact(10000, 1, 2); // outputs: "1 + 2 equals 3 and 10000 is ignored"
```

It is possible that the combiner method processes values but doesn't return anything. In this case, there is no need
for a result placeholder in `target` method argument list.

### Filter return value
Similarly to arguments, we can use an adapter that will apply transformations to the return value.

Let's imagine a situation where we have a method that returns a `String`, and we would like to channel any returned
value from this method into another method that replaces character `d` with `m` and brings the resulting value to the
uppercase.

Here's the method handle for the `getSomeString` method which always returns the value `"dummy"`:

```java
MethodHandle getSomeString = lookup.findStatic(Example.class, "getSomeString", MethodType.methodType(String.class));
```

Here's the `resultTransform` method that performs transformations:

```java
private static String resultTransform(String value) {
    return value.replace('d', 'm').toUpperCase();
}
```

Here is the method handle for our transformator method:

```java
MethodHandle resultTransform = lookup.findStatic(Example.class, "resultTransform", MethodType.methodType(String.class, String.class));
```

Finally, this is the combination of the two method handles where the result returned by the `getSomeString` method is
then provided to the `resultTransform` method and modified accordingly:

```java
MethodHandle getSomeUppercaseString = MethodHandles.filterReturnValue(getSomeString, resultTransform);
System.out.println(getSomeUppercaseString.invoke()); // outputs: "MUMMY"
```

<a id="vsreflection">&nbsp;</a>
## Method Handles vs Reflection API
Method handles were introduced in [JDK7](https://docs.oracle.com/javase/7/docs/index.html) as a tool to assist
compiler and language runtime developers. They were never meant to replace reflection. The Reflection API offers something
that method handles cannot, which is listing the class members and inspecting their properties. Method handles, on the
other hand, can be transformed and manipulated in a way that is not possible with Reflection API.

When it comes to method invocation, there are differences related to access checking and security considerations. The
Reflection API performs access checking against every caller, on every call, while for method handles, access is
checked only during construction. This makes invocation through method handles faster than through reflection.
However, certain precautions have to be taken so the method handle is not passed to the code where it shouldn't be
accessible.

<a id="unreflect">&nbsp;</a>
## Conversion between Reflection API and method handles
The `Lookup` object can be used to convert Reflection API objects to behaviorally equivalent method handles, which
provide more direct and efficient access to the underlying class members.

To create a method handle pointing to a given [`Method`](javadoc:Method) (given that the lookup class has permission to do so), we can
use `unreflect`.

Let's say we have a `test` method in our `Example` class which accepts a `String` argument and returns a `String`. Using
the Reflection API, we can obtain a `Method` object:

```java
Method method = Example.class.getMethod("test", String.class);
```

With the help of the lookup object, we can [`unreflect`](javadoc:MethodHandles.Lookup.unreflect(Method)) the `Method`
object to obtain a `MethodHandle`:

```java
MethodHandles.Lookup lookup = MethodHandles.lookup();
MethodHandle methodHandle = lookup.unreflect(method);
String result = (String) methodHandle.invoke("something");
```

Similarly, given a [`Field`](javadoc:Field) object, we can obtain getter and setter method handles:

```java
Field field = Example.class.getField("magic");
MethodHandle setterMethodHandle = lookup.unreflectSetter(field);
MethodHandle getterMethodHandle = lookup.unreflectGetter(field);
setterMethodHandle.invoke("something");
String result = (String) getterMethodHandle.invoke(); // result == "something"
```

Conversion from `MethodHandle` to a [`Member`](javadoc:Member) is also possible, with the condition that no transformations
have been performed to the given `MethodHandle`.

Let's say we have a method handle pointing directly to a method. We can use the
[`MethodHandles.reflectAs`](javadoc:MethodHandles.reflectAs(Class,MethodHandle)) method to obtain the `Method` object:

```java
Method method = MethodHandles.reflectAs(Method.class, methodHandle);
```

It works similarly for the `Field` object:

```java
Field field = MethodHandles.reflectAs(Field.class, getterMethodHandle); // same result is achieved by reflecting `setterMethodHandle`
```

<a id="conclusion">&nbsp;</a>
## Conclusion
In this tutorial, we have looked into the method handle mechanism and learned how to efficiently use it. We now know,
that method handles provide means for efficient method invocation, but this mechanism is not meant to replace the
Reflection API.

Method handles offer a performance advantage for method invocation due to a different access checking approach. However,
since access is checked only on method handle creation, method handles should be passed around with caution.

Unlike the Reflection API, method handles don't provide any tooling for listing class members and inspecting their properties.
On the other hand, the Method Handle API allows us to wrap direct pointers to methods and fields into more complex
logic, such as argument and return value manipulations.