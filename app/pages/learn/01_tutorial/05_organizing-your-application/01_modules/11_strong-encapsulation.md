---
id: organizing.modules.strongencaps
title: Strong Encapsulation (of JDK Internals)
slug: learn/modules/strong-encapsulation
slug_history:
- learn/strong-encapsulation-(of-jdk-internals)
group: modules
type: tutorial-group
layout: learn/tutorial-group.html
main_css_id: learn
description: "Strong encapsulation is a corner stone of the module system. It avoids (accidental) use of internal APIs, chiefly non-public types/members in `java.*` packages and much of `sun.*` and `com.sun.*`."
---

Almost all dependencies - whether they're frameworks, libraries, JDK APIs, or your own (sub)projects - have a public, supported, and stable API as well as internal code needed to make the public portion work.
Strong encapsulation is about avoiding the (accidental) use of internal APIs to make projects more robust and maintainable.
We'll explore why that is needed, what exactly constitutes internal APIs (particularly for the JDK), and how strong encapsulation works in practice.

**Note**:
You need to know [the module system basics](id:organizing.modules.intro) and about [the support for reflection](id:organizing.modules.reflection) to get the most out of this article.


## What Is Strong Encapsulation About?

In many respects the OpenJDK code base is similar to any other software project and one constant is refactoring.
Code is changed, moved around, removed, etc. to keep the code base clean and maintainable.
Not all code of course:
The public API, the contract with Java's users, is extremely stable.

As you can see, the distinction between public API and internal code is paramount to uphold compatibility, to the JDK developers but also to you.
You need to be sure that your project, meaning your code _and_ your dependencies, doesn't rely on internals that can change in any minor JDK update, causing surprising and unnecessary work.
Worse, such dependencies might block you from updating the JDK.
At the same time, you might be in a situation where an internal API provides unique capabilities without which your project couldn't compete.

Together, this means that a mechanism that locks internal APIs away by default but allows you to unlock specific ones for specific use cases is essential.
Strong encapsulation is that mechanism.

Since only types in exported or opened packages are accessible outside of a module, everything else is considered internal and thus inaccessible.
First and foremost this applies to the JDK itself, which is split into modules since Java 9.


## What Are Internal APIs?

So which JDK APIs are internal?
To answer that, we need to look at three namespaces:

First `java.*`:
Of course these packages make up the public API but that only extends to public members of public classes.
Less visible classes and members are internal and strongly encapsulates by the module system.

Then there's `sun.*`.
Almost all such packages are internal, but there are two exceptions:
The `sun.misc` and `sun.reflect` packages are exported and opened by the module _jdk.unsupported_ because they provide functionality that is critical to a number of projects and doesn't have feasible alternatives within or outside the JDK (most prominently `sun.misc.Unsafe`).
Don't let these very specific exceptions confuse the larger point, though:
Generally speaking, `sun.*` packages should be seen as internal and all but these two actually are.

Last is `com.sun.*`, which is more complicated.
The entire namespace is JDK-specific, meaning it's not part of Java's standard API, and some JDKs may not contain it.
Around 90% of it are non-exported packages and they are internal.
The remaining 10% are packages exported by _jdk.*_ modules and they're supported for use outside the JDK.
That means they are evolved with a similar regard for compatibility as standardized APIs.
[Here's a list](https://cr.openjdk.java.net/~mr/jigsaw/jdk8-packages-strongly-encapsulated) of internal vs exported packages.

In summary, use `java.*`, avoid `sun.*`, be careful with `com.sun.*`.


## Experiments with Strong Encapsulation

To experiment with strong encapsulation, let's create a simple class that uses a class from a public API:

```java
public class Internal {

	public static void main(String[] args) {
		System.out.println(java.util.List.class.getSimpleName());
	}

}
```

Since it's a single class, you can run it straight away without explicit compilation:

```shell
java Internal.java
```

This should run successfully and print "List".

Next, let's mix in one of those exceptions that are accessible for compatibility reasons:

```java
// add to `main` method
System.out.println(sun.misc.Unsafe.class.getSimpleName());
```

You will still be able to run this straight away, printing "List" and "Unsafe".

Now let's use an internal class that is not accessible:

```java
// add to `main` method
System.out.println(sun.util.BuddhistCalendar.class.getSimpleName());
```

If you try to run this as before, you get a compile error (the `java` command compiles in memory):

```shell
Internal.java:8: error: package sun.util is not visible
                System.out.println(sun.util.PreHashedMap.class.getSimpleName());
                                      ^
  (package sun.util is declared in module java.base, which does not export it)
1 error
error: compilation failed
```

The error message is pretty clear:
The package `sun.util` belongs to the module _java.base_ and because that doesn't export it, it is considered internal and thus inaccessible.

We can avoid the type during compilation and use reflection instead:

```java
Class.forName("sun.util.BuddhistCalendar").getConstructor().newInstance();
```

Executing that leads to an exception at run time:

```shell
Exception in thread "main" java.lang.IllegalAccessException:
	class Internal cannot access class sun.util.BuddhistCalendar (in module java.base)
	because module java.base does not export sun.util to unnamed module @1f021e6c
		at java.base/jdk.internal.reflect.Reflection.newIllegalAccessException(Reflection.java:392)
		at java.base/java.lang.reflect.AccessibleObject.checkAccess(AccessibleObject.java:674)
		at java.base/java.lang.reflect.Constructor.newInstanceWithCaller(Constructor.java:489)
		at java.base/java.lang.reflect.Constructor.newInstance(Constructor.java:480)
		at org.codefx.lab.internal.Internal.main(Internal.java:9)
```


## Strong Encapsulation in Practice

If you absolutely need to access internal APIs, there are two command line flags that let you work around strong encapsulation:

* `--add-exports` makes public types and members in the exported packages accessible at compile or run time
* `--add-opens` makes all types and their members in the opened package accessible at run time for reflection

More on the two options and how to use them [in this article](id:organizing.modules.addexport).

When applying `--add-exports` during compilation, it must be applied again when running the app and of course `--add-opens` only makes sense at run time.
That means that whatever code (yours or your dependencies) needs access to JDK internals, the exceptions need to be configured when launching the app.
That gives the app's owner full transparency into these issues and allows them to assess the situation and either change the code/dependency or knowingly accept the maintainability hazard that comes from using internal APIs.

Strong encapsulation is in effect around all explicit modules.
That includes the entire JDK, which is fully modularized, but potentially also your code and your dependencies, should they come as modular JARs that you place on the module path.
In that case, everything said so far applies to these modules as well:

* only public types and members in exported packages are accessible outside the module at compile and run time
* all types and members in opened packages are accessible outside the module at run time
* other types and members are inaccessible during compilation and at run time
* exceptions can be created with `--add-exports` (for static dependencies) and `--add-opens` (for reflective access)

That means you can expand the benefits of strong encapsulation beyond the JDK APIs to include your code and your dependencies.


## Evolution of Strong Encapsulation

Strong encapsulation is a corner stone of the module system, which was introduced in Java 9, but for compatibility reasons, code from the class path could still access internal JDK APIs.
This was managed with the command line option `--illegal-access`, which had the default value `permit` in JDK 9 to 15.
JDK 16 changed that default to `deny` and 17 deactivates the option entirely.

From 17 on, only `--add-exports` and `--add-opens` give access to internal APIs.
