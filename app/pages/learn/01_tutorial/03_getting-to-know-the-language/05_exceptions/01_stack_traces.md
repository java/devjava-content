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
description: "This article explains what stack traces are as well as how they can be read."
last_update: 2024-04-26
author: ["DanielSchmid"]
---

<a id="intro">&nbsp;</a>
## What is a stack trace?

When an exception occurs in a Java program, a stack trace is often printed to the console. These stack traces often look scary, especially with complex frameworks but actually provide a lot of useful information for solving the issue causing the exeption. Specifically, stack traces show where exactly and exception occured and how the Java program got to that point.

<a id="simple">&nbsp;</a>
## A simple stack trace

Before coming to complex stack traces, we first investigate a stack trace originating from a very simple application.

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

Running this class results in the following output:
```
Exception in thread "main" java.lang.IllegalStateException: This is for demonstration.
	at com.example.someapplication.StackTraceDemo.someMethod(StackTraceDemo.java:9)
	at com.example.someapplication.StackTraceDemo.main(StackTraceDemo.java:5)
```

First of all, Java tells us that we got an exception in a thread called `main`. As we haven't used anything related starting other threads, this is the only application thread in this example. In applications involving multiple thread, the thread name can be a useful piece of diagnostic information. This part may be omitted or look different depending on what printed the stack trace.

After the thread name, the full class name of the exception is shown. As we have thrown an `IllegalStateException` in our example, this is `java.lang.IllegalStateException`. If a message is associated with the exception, that message is included in the stack trace as well. In our case, we passed the message `This is for demonstration.` to the `IllegalStateException` constructor resulting in that text being part of the stack trace.

The lines following start with the word `at` and provide detailed information on where the exception occured and what method calls lead to the program getting to that. The first such line is `at com.example.someapplication.StackTraceDemo.someMethod(StackTraceDemo.java:9)`. This tells us that the exception occured in a method called `someMethod` in the class `StackTraceDemo` located in the package `com.example.someapplication`. It also informs us that the exception was thrown in line 9 of the file `StackTraceDemo.java`. If we take a look at that line, we can see that it is `throw new IllegalStateException("This is for demonstration");` which matches the stack trace. Similarly, the next line is `at com.example.someapplication.StackTraceDemo.main(StackTraceDemo.java:5)`. This line tells us that where `someMethod` was called. This happened in the `main` method of our `StackTraceDemo` class.

Now, just from the stack trace, we can see where the exception was originating from. The `main` method called `someMethod` which threw an `IllegalStateException` with the message `This is for demonstration.`

<a id="printing">&nbsp;</a>
## Printing stack traces

Sometimes, it is necessary to print the stack trace to the console or some other location when catching an exception without re-throwing it. For doing that, we can make use of the [`printStackTrace`](javadoc:Throwable.printStackTrace()) method. Calling that method prints the stack trace of a given exception to `System.err`. We can adapt our previous program to do catch the exception and print 

```java
package com.example.someapplication;

public class StackTraceDemo {
    public static void main(String[] args) {
        try {
            someMethod();
        } catch(IllegalStateException e) {
            System.out.println("An exception occured.");
            e.printStackTrace();
            System.out.println("We printed the stack trace.");
        }
    }
    
    private static void someMethod() {
        throw new IllegalStateException("This is for demonstration.");
    }
}
```

This will print the following to the console:

```
An exception occured.
java.lang.IllegalStateException: This is for demonstration.
	at com.example.someapplication.StackTraceDemo.someMethod(StackTraceDemo.java:15)
	at com.example.someapplication.StackTraceDemo.main(StackTraceDemo.java:6)
We printed the stack trace.
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

```
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

```
Exception in thread "main" java.lang.IllegalStateException: This is for demonstration.
	at com.example.someapplication.StackTraceDemo.someMethod(StackTraceDemo.java:14)
	at com.example.someapplication.StackTraceDemo.main(StackTraceDemo.java:9)
	Suppressed: java.io.IOException: This cannot be closed.
		at com.example.someapplication.UnclosableResource.close(StackTraceDemo.java:21)
		at com.example.someapplication.StackTraceDemo.main(StackTraceDemo.java:8)
```
