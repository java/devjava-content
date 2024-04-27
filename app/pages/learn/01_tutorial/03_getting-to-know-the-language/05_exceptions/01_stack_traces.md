---
id: lang.exceptions.stacktrace
title: Reading Stack Traces
slug: learn/exceptions/stacktrace
type: tutorial-group
group: exceptions
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- What is a stack trace? {intro}
- A simple stack trace {simple}
- Printing stack traces {printing}
- The Caused by section {cause}
- Suppressed exceptions {suppressed}
- Reading bigger stack traces {bigger}
- Summary {summary}
description: "This article explains what stack traces are as well as how they can be read."
last_update: 2024-04-27
author: ["DanielSchmid"]
---

<a id="intro">&nbsp;</a>
## What is a stack trace?

When an exception occurs in a Java program, a stack trace is often printed to the console. These stack traces often look scary, especially with complex frameworks but actually provide a lot of useful information for solving the issue causing the exeption. Specifically, stack traces show what exception occured as well as where exactly that happened and how the Java program got to that point.

<a id="simple">&nbsp;</a>
## A simple stack trace

Before coming to complex stack traces, we first investigate a stack trace originating from a very simple Java application.

```java
package com.example.someapplication;

public class StackTraceDemo {
    public static void main(String[] args) {
        someMethod();
    }
    
    private static void someMethod() {
        throw new IllegalStateException("This is for demonstration.");
    }
}
```

Running this class results in the following output.

```none
Exception in thread "main" java.lang.IllegalStateException: This is for demonstration.
	at com.example.someapplication.StackTraceDemo.someMethod(StackTraceDemo.java:9)
	at com.example.someapplication.StackTraceDemo.main(StackTraceDemo.java:5)
```

First of all, Java tells us that we got an exception in a thread called `main`. As we haven't used anything related to starting other threads, this is the only application thread in this example. In applications involving multiple threads, the thread name can be a useful piece of diagnostic information. This part may be omitted or look different depending on what printed the stack trace.

After the thread name, the full class name of the exception is shown. As we have thrown an `IllegalStateException` in our example, this is `java.lang.IllegalStateException`. If a message is associated with the exception, that message is included in the stack trace as well. In our case, we passed the message `This is for demonstration.` to the `IllegalStateException` constructor resulting in that text being part of the stack trace.

The lines following start with the word `at` and provide detailed information on where the exception occured and what method calls lead to the program getting to that. The first such line is `at com.example.someapplication.StackTraceDemo.someMethod(StackTraceDemo.java:9)`. This tells us that the exception occured in a method called `someMethod` in the class `StackTraceDemo` located in the package `com.example.someapplication`. It also informs us that the exception was thrown in line 9 of the file `StackTraceDemo.java`. With many IDEs, you can even click on the `StackTraceDemo.java:9` and the IDE automatically opens the relevant file and navigates to the line in question. If we take a look at that line, we can see that it is `throw new IllegalStateException("This is for demonstration");` which matches the stack trace. Similarly, the next line is `at com.example.someapplication.StackTraceDemo.main(StackTraceDemo.java:5)`. This line tells us that where `someMethod` was called. This happened in the `main` method of our `StackTraceDemo` class.

Now, just from the stack trace, we can see where the exception was originating from. The `main` method called `someMethod` which threw an `IllegalStateException` with the message `This is for demonstration.`

<a id="printing">&nbsp;</a>
## Printing stack traces

Sometimes, it is necessary to print the stack trace to the console or some other location when catching an exception without re-throwing it. For doing that, we can make use of the [`printStackTrace`](javadoc:Throwable.printStackTrace()) method. Calling that method prints the stack trace of a given exception to `System.err`. We can adapt our previous program to do catch the exception and print the stack trace by ourselves.

```java
package com.example.someapplication;

public class StackTraceDemo {
    public static void main(String[] args) {
        try {
            someMethod();
        } catch(IllegalStateException e) {
            System.out.println("An exception occured.");
            e.printStackTrace();
        }
        System.out.println("The program is finished.");
    }
    
    private static void someMethod() {
        throw new IllegalStateException("This is for demonstration.");
    }
}
```

This will print the following to the console:

```none
An exception occured.
java.lang.IllegalStateException: This is for demonstration.
	at com.example.someapplication.StackTraceDemo.someMethod(StackTraceDemo.java:15)
	at com.example.someapplication.StackTraceDemo.main(StackTraceDemo.java:6)
The program is finished.
```

As the stack trace was printed to `System.err`, it will be displayed in red or highlighted in some way with most IDEs. If we want to print it to a different location, we can pass a [`PrintWriter`](javadoc:PrintWriter) or [`PrintStream`](javadoc:PrintStream) to the overloads of `printStackTrace`. For example, we could change `e.printStackTrace();` to `e.printStackTrace(System.out);` in order to print the stack trace to `System.out`.

<a id="cause">&nbsp;</a>
## The `Caused by` section

Sometimes, you might want to [throw an exception that was caused by a different exception](/learn/exceptions/throwing/#chained-exceptions).

```java
package com.example.someapplication;

public class StackTraceDemo {
    public static void main(String[] args) {
        someMethod();
    }

    private static void someMethod() {
        try {
            otherMethod();
        } catch(Exception e) {
            throw new RuntimeException(e);
        }
    }
    
    private static void otherMethod() {
        throw new IllegalStateException("This is for demonstration.");
    }
}
```

When the stack trace of that exception is then printed, we can not only see information about the `RuntimeException` but also about the original `IllegalStateException`.

```none
Exception in thread "main" java.lang.RuntimeException: java.lang.IllegalStateException: This is for demonstration.
	at com.example.someapplication.StackTraceDemo.someMethod(StackTraceDemo.java:12)
	at com.example.someapplication.StackTraceDemo.main(StackTraceDemo.java:5)
Caused by: java.lang.IllegalStateException: This is for demonstration.
	at com.example.someapplication.StackTraceDemo.otherMethod(StackTraceDemo.java:17)
	at com.example.someapplication.StackTraceDemo.someMethod(StackTraceDemo.java:10)
	... 1 more
```

Here, we can see that the `RuntimeException` was "Caused by" an `IllegalStateException` and we see the stack trace of both exceptions.

<a id="suppressed">&nbsp;</a>
## `Suppressed` exceptions

As with exceptions causing other exceptions, it is also possible that [an exception suppresses another](/learn/exceptions/catching-handling/#suppressed). Consider the following example.

```java
package com.example.someapplication;

import java.io.Closeable;
import java.io.IOException;

public class StackTraceDemo {
    public static void main(String[] args) throws IOException {
        try(UnclosableResource res = new UnclosableResource()) {
            someMethod();
        }
    }
    
    private static void someMethod() {
        throw new IllegalStateException("This is for demonstration.");
    }
}

class UnclosableResource implements Closeable {
    @Override
    public void close() throws IOException {
        throw new IOException("This cannot be closed.");
    }
}

```

Here, the `IOException` thrown in `UnclosableResource#close` is suppressed by the `IllegalStateException` thrown in `someMethod`. The stack trace printed by this application includes information about both exceptions.

```none
Exception in thread "main" java.lang.IllegalStateException: This is for demonstration.
	at com.example.someapplication.StackTraceDemo.someMethod(StackTraceDemo.java:14)
	at com.example.someapplication.StackTraceDemo.main(StackTraceDemo.java:9)
	Suppressed: java.io.IOException: This cannot be closed.
		at com.example.someapplication.UnclosableResource.close(StackTraceDemo.java:21)
		at com.example.someapplication.StackTraceDemo.main(StackTraceDemo.java:8)
```

<a id="bigger">&nbsp;</a>
## Reading bigger stack traces

Especially when using complex libraries and frameworks, it is possible that stack traces become fairly long as there are often multiple `Caused By` sections. When that happens, it's important to know which part of the stack trace to focus on. If multiple exceptions are thrown and printed in short succession, it's often the first exception that is causing the other issues. As you want to know what originally caused the exception to happen, you typically want to first take a look at the last `Caused By` section of the first exception.

There may be many lines in the `Caused By` section related to framework code. As the problem is likely within your code, you should focus on the lines corresponding to classes/methods that are part of your code which you can see using the package name. However, you shouldn't forget that other parts of the stack trace may be important as well. If the last `Caused By` section doesn't contain anything about your application code, you might want to take a look at the `Caused By` sections before. Aside from that, the name of the exeption and the message often contain important information as well. Let's inspect an example of what that could look like.

```none
com.someframework.utils.ValidationException: java.lang.IllegalArgumentException: argument cannot be empty string!
	at com.someframework.utils.SomeFrameworkClass.getOtherClass(SomeFrameworkClass.java:8)
	at com.example.someapplication.StackTraceDemo.doSomething(StackTraceDemo.java:18)
	at com.someframework.runner.ExecutingCode.callProgram(ExecutingCode.java:15)
	at com.someframework.runner.ExecutingCode.lambda$0(ExecutingCode.java:7)
	at java.base/java.lang.Thread.run(Thread.java:1583)
Caused by: java.lang.IllegalArgumentException: argument cannot be empty string!
	at com.someframework.utils.SomeFrameworkClass.validate(SomeFrameworkClass.java:15)
	at com.someframework.utils.SomeFrameworkClass.getOtherClass(SomeFrameworkClass.java:6)
	... 4 more
Exception in thread "some-framework-thread" com.someframework.runner.FrameworkException: java.lang.NullPointerException: Cannot invoke "com.someframework.utils.OtherFrameworkClass.doWork()" because "otherFrameworkClass" is null
	at com.someframework.runner.ExecutingCode.lambda$0(ExecutingCode.java:9)
	at java.base/java.lang.Thread.run(Thread.java:1583)
Caused by: java.lang.NullPointerException: Cannot invoke "com.someframework.utils.OtherFrameworkClass.doWork()" because "otherFrameworkClass" is null
	at com.someframework.utils.SomeFrameworkClass.doSomething(SomeFrameworkClass.java:20)
	at com.example.someapplication.StackTraceDemo.doSomething(StackTraceDemo.java:22)
	at com.someframework.runner.ExecutingCode.callProgram(ExecutingCode.java:15)
	at com.someframework.runner.ExecutingCode.lambda$0(ExecutingCode.java:7)
	... 1 more
```

First, we can see that two exceptions occured after each other. We first have a `ValidationException` which is then followed by a `FrameworkException`. We first inspect the last `Caused By` section of the first exception.

```none
Caused by: java.lang.IllegalArgumentException: argument cannot be empty string!
	at com.someframework.utils.SomeFrameworkClass.validate(SomeFrameworkClass.java:15)
	at com.someframework.utils.SomeFrameworkClass.getOtherClass(SomeFrameworkClass.java:6)
	... 4 more
```

From its message, we can see that the exception occured because some argument should not be empty. However, all lines in that stack trace seem to come from the framework as we can see from the package name starting with `com.someframwork` which is (in this example) not the code we are working on. Due to this, we look at what was printed before the `Caused By` section.

```none
com.someframework.utils.ValidationException: java.lang.IllegalArgumentException: argument cannot be empty string!
	at com.someframework.utils.SomeFrameworkClass.getOtherClass(SomeFrameworkClass.java:8)
	at com.example.someapplication.StackTraceDemo.doSomething(StackTraceDemo.java:18)
	at com.someframework.runner.ExecutingCode.callProgram(ExecutingCode.java:15)
	at com.someframework.runner.ExecutingCode.lambda$0(ExecutingCode.java:7)
	at java.base/java.lang.Thread.run(Thread.java:1583)
```

This part of the stack trace actually contains a line referring to our own code. Specifically, there is a line `at com.example.someapplication.StackTraceDemo.doSomething(StackTraceDemo.java:18)`. As we now know the exception is somehow originating from line 18 of `StackTraceDemo.java`, we take a look at the `StackTraceDemo` class and check what happens in line 18.

```java
package com.example.someapplication;

import com.someframework.utils.OtherFrameworkClass;
import com.someframework.utils.SomeFrameworkClass;
import com.someframework.utils.ValidationException;

public class StackTraceDemo {

    private final SomeFrameworkClass frameworkObject;

    public StackTraceDemo(SomeFrameworkClass frameworkObject) {
        this.frameworkObject = frameworkObject;
    }

    public void doSomething() {
        OtherFrameworkClass otherClass = null;
        try {
            otherClass = frameworkObject.getOtherClass("");
        } catch (ValidationException e) {
            e.printStackTrace();
        }
        frameworkObject.doSomething(otherClass);

    }
}
```

Indeed, in this line we are passing an empty `String` to `frameworkObject.getOtherClass()` which is likely the reason the exception occured.

<a id="summary">&nbsp;</a>
## Summary

Even if stack traces may look intiminating at first, they are just a lot of diagnostic information helping you to find what caused the exception. As this information is often helpful in finding what caused the issue, you should typically not just ignore exceptions by adding a `System.err.println("An error occured");` or similar. Instead, either wrap the exception in another exception so that information about the original exception is preserved in a `Caused By` section or (if you actually want to continue executing after the exception occured) print the stack trace using the [`printStackTrace`](javadoc:Throwable.printStackTrace()) method.

```java
try {
    doSomething();
} catch(SomeException e) {
    // System.err.println("Error!"); // This will lose all the useful information in the stack trace
    throw new OtherException(e); // throw a different exception for someone else to handle preserving information about the original stack trace
    // e.printStackTrace(); // if you don't want to rethrow it, consider printing the stack trace
}
```
