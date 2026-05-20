---
id: new_features.lazy-initialization
title: Lazy Initialization in Java Using Lazy Constants
slug: learn/new-features/lazy-constants
type: tutorial
layout: learn/tutorial.html
main_css_id: learn
subheader_select: tutorials
toc:
  - What is Lazy Initialization? {what}
  - The Old Way {old}
  - Why Not Just Use a Static Field? {static}
  - LazyConstant {lazy-constant}
  - Lazy Collections {lazy-collections}
  - How to Enable It {enabling}
  - Summary {summary}
description: "<insert short description here>"
author: ["GarimaAgarwal"]
---
<a id="old">&nbsp;</a>
## What is Lazy Initialization?

When you write a Java application, not every object you create is needed right away. Some objects are expensive to build maybe they open a database connection, read a config file, or do a lot of calculation. Creating them at the start of the program, even when they might not be used, wastes time and memory.

**Lazy initialization** is a simple idea: don't create an object until the moment it is actually needed.

Think of it like this. Imagine a restaurant that preps every dish on the menu before the restaurant opens, whether or not anyone orders it that day. That would be very wasteful. A smarter kitchen waits for a dish to be ordered, then prepares it and only then.

That is exactly what lazy initialization does in Java.

<a id="what">&nbsp;</a>
## The Old Way: What Java Developers Have Been Doing for 25 Years

The most common pattern for lazy initialization is called *double-checked locking*. If you open almost any large Java codebase, you will find something like this:

```java
public class DatabaseConnection {

    private static volatile DatabaseConnection instance;

    private DatabaseConnection() {
        // imagine this takes a few seconds to set up
        System.out.println("Connecting to the database...");
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) {                         // first check
            synchronized (DatabaseConnection.class) {
                if (instance == null) {                 // second check
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
}
```

This pattern has been around since the late 1990s. It looks complicated because it is.

Let's break down what each part is doing, so you can see exactly why it became a headache:

**`volatile`** : This keyword tells Java "do not cache this value; always read it fresh from memory." Without it, different threads might each see a different, stale version of `instance`.

**`synchronized`** : This makes sure only one thread at a time can run the block of code inside. Without it, two threads might both see `instance == null` at the same moment and both try to create a new connection which you don't want.

**The double null check** : The outer `if` avoids locking on every single call (locking is slow). The inner `if` handles the case where two threads both passed the outer check at the same time.

This works. But notice how much code is needed just to say "create this object once, when it's first needed." It's a lot to remember, and easy to get wrong. If you forget the `volatile`, or get the checks in the wrong order, you get a subtle bug that only appears under heavy load, the worst kind.

<a id="static">&nbsp;</a>
## Why Not Just Use a Static Field?

A fair question. Why not write this instead?

```java
public class DatabaseConnection {
    private static final DatabaseConnection INSTANCE = new DatabaseConnection();

    public static DatabaseConnection getInstance() {
        return INSTANCE;
    }
}
```

This is perfectly safe and simple. But it creates the connection the moment
the class is loaded, even if your program never ends up needing it. The
startup cost depends not on how many services you have, but on how expensive
each one is to initialize. Opening a database connection, reading a config
file, or parsing a large resource all take real time and eager
initialization means you pay that cost upfront, whether or not those
resources are ever used.

## A Slightly Better Old Pattern (But Still Tricky)

Some Java developers use a technique called the **initialization-on-demand holder idiom**:

```java
public class DatabaseConnection {

    private DatabaseConnection() {
        System.out.println("Connecting to the database...");
    }

    private static class Holder {
        static final DatabaseConnection INSTANCE = new DatabaseConnection();
    }

    public static DatabaseConnection getInstance() {
        return Holder.INSTANCE;
    }
}
```

This actually works well. The inner class `Holder` is only loaded when `getInstance()` is called, so initialization is lazy. And because `INSTANCE` is `final`, Java can optimize it very well.

But it has limits:
- It only works for static singletons (one per application).
- The trick relies on how Java loads inner classes a concept that confuses many developers.
- If you have ten different services that need this pattern, you end up with ten inner `Holder` classes cluttering your code.

<a id="lazy-constant">&nbsp;</a>
## The New Way: LazyConstant (JEP 531)

Java 26 introduced a new tool called `LazyConstant`. It is currently a **preview feature**, which means it is available to try out but the API might have small changes before it becomes permanent.

> **What is a preview feature?** It's a feature that is fully working but not yet finalized. You can use it by adding `--enable-preview` to your compile and run commands. The OpenJDK community actively welcomes developer feedback during preview rounds that feedback directly shapes the final API.

Here is the same `DatabaseConnection` example using `LazyConstant`:

```java
import java.lang.invoke.LazyConstant;

public class DatabaseConnection {

    private static final LazyConstant<DatabaseConnection> INSTANCE =
        LazyConstant.of(DatabaseConnection::new);

    private DatabaseConnection() {
        System.out.println("Connecting to the database...");
    }

    public static DatabaseConnection getInstance() {
        return INSTANCE.get();
    }
}
```

That's it. No `volatile`. No `synchronized`. No double null check. No inner class.

The first time `INSTANCE.get()` is called, Java runs `DatabaseConnection::new` to create the connection. Every time after that, it returns the same object instantly with no locking at all.

And if multiple threads call `getInstance()` at the very same moment? Only one of them runs the constructor. The others wait, and then all of them get the same instance back. Thread safety is built in.

## Understanding the Key Rules

There are three important things to know about `LazyConstant`:

**Recommendation 1: Declare the variable `final`.**

`final` is not required for `LazyConstant` to work correctly or
safely, thread safety is built in regardless. However, declaring
it `final` is strongly recommended because it is the only way to
enable the JVM's constant-folding optimization on the hot path.
Without `final`, the JVM cannot treat the value as a true constant
after initialization, and you lose the main performance benefit of
using `LazyConstant` over simpler alternatives.

For static fields, `static final` enables full constant folding
today. For instance fields, the benefit is more limited due to
current JVM constraints — but `final` is still good practice for
clarity and correctness.

```java
// WRONG : will not give you the JVM's optimization benefits
private static LazyConstant<DatabaseConnection> instance =
    LazyConstant.of(DatabaseConnection::new);

// RIGHT
private static final LazyConstant<DatabaseConnection> INSTANCE =
    LazyConstant.of(DatabaseConnection::new);
```

The `final` keyword tells Java this variable will never point to a different `LazyConstant` object. That lets Java treat the value inside as a true constant once it's set, similar to how it treats a `static final int`.

**Rule 2 : Your supplier cannot return `null`.**

```java
// This will throw a NullPointerException when .get() is called
private static final LazyConstant<String> NAME =
    LazyConstant.of(() -> null);  // BAD
```

If your value might legitimately be `null`, wrap it in `Optional`:

```java
private static final LazyConstant<Optional<String>> NAME =
    LazyConstant.of(() -> Optional.ofNullable(findName()));
```

**Rule 3 : It is not Serializable.**

If you are working with older code that sends objects across a network or saves them to disk using Java's built-in serialization, `LazyConstant` cannot be used directly as the backing store for that. This is rare in modern code, but worth knowing.

<a id="lazy-collections">&nbsp;</a>
## Lazy Collections: The Even More Exciting Part

`LazyConstant` also unlocks something new in Java's standard collections: **lazy initialization per element**.

New factory methods were added to `List`, `Map`, and `Set`:
- `List.ofLazy(size, supplier)` - each element is created the first time that index is accessed
- `Map.ofLazy(keys, supplier)` - each value is created the first time that key is looked up
- `Set.ofLazy(keys, supplier)` - each element is resolved the first time it is checked

Let's look at a real example. Imagine your app has feature flags, settings that turn certain features on or off. Each flag is stored in a database, and fetching it takes time.

```java
enum Feature {
    DARK_MODE,
    EXPORT_TO_PDF,
    BETA_SEARCH,
    ANALYTICS
}

// Without lazy initialization : ALL flags fetched at startup, even unused ones
Map<Feature, Boolean> flags = new HashMap<>();
for (Feature f : Feature.values()) {
    flags.put(f, database.fetchFlag(f));  // 4 database calls at startup
}
```

Now with `Map.ofLazy()`:

```java
import java.util.Map;
import java.util.EnumSet;

Map<Feature, Boolean> flags =
    Map.ofLazy(EnumSet.allOf(Feature.class), database::fetchFlag);

// At this point: zero database calls have been made

boolean isDarkMode = flags.get(Feature.DARK_MODE);
// NOW: one database call is made, just for DARK_MODE
// EXPORT_TO_PDF, BETA_SEARCH, ANALYTICS are still not fetched
```

If a user never triggers a feature, its flag is never fetched. For a system with 50 flags and typical requests that only touch 5 of them, this can make a meaningful difference.

The same idea works with `List.ofLazy()`. Say you have a lookup table of 1000 pre-computed values, but most requests only need a handful of them:

```java
// Each value is computed only when that index is first accessed
List<String> lookupTable = List.ofLazy(1000, index -> computeValue(index));

String first = lookupTable.get(0);    // computed now
String second = lookupTable.get(1);   // computed now
// lookupTable.get(2) through .get(999) are still not computed
```

## Why Does This Make Your Code Faster?

There are two performance wins here, and they are worth understanding separately.

**Win 1 : Faster startup.**
Lazy initialization means your application does less work before it's ready to serve requests. Only the things needed on the startup path are created. Everything else waits until it's actually used.

**Win 2 : Faster repeated access.**
This one is more technical, but important. Java has a JIT compiler (Just-In-Time compiler) that watches your code as it runs and converts hot paths into highly optimized machine code.

When the JIT sees a `final` field, it knows the value will never change, so it can "fold" the value directly into the compiled code. This is called **constant folding**. It means the JIT doesn't even need to read the field from memory anymore; it just uses the value directly.

`LazyConstant` gets this same treatment after the first initialization. So on the warm path, after your application has been running for a while and the JIT has compiled the hot methods, accessing a `LazyConstant` is as fast as accessing a `static final` field. Much faster than the `volatile` read in the old double-checked locking pattern.

Compare the three approaches at a high level (Y means Yes and N means No):

| Pattern | Thread-safe? | Lazy? | JIT-optimized warm path? | Easy to read? |
|---|---|---|---|--|
| Eager static final | Y | N | Y | Y |
| Double-checked locking | Y (if done right) | Y | N (volatile fence) | N (easy to get wrong) |
| Holder idiom | Y | Y | Y | Mostly (tricky concept) |
| `LazyConstant` | Y | Y | Y | Y |

<a id="enabling">&nbsp;</a>
## Using LazyConstant in Your Project

`LazyConstant` is a preview feature in JDK 26 (JEP 526) and JDK 27 (JEP 531). Preview features require opting in at both compile time and runtime using `--enable-preview`.

There is one rule that catches many developers by surprise:

> **The JDK version you compile with must exactly match the version you run with.** Code compiled with JDK 26 preview features will not run on JDK 27, even though JDK 27 also supports preview features. Always compile and run with the same version.

Here is how to opt in across the most common setups.

**From the command line** 

```bash
# Step 1 — Compile
javac --enable-preview --release 26 MyClass.java

# Step 2 — Run with the SAME JDK version used to compile
java --enable-preview MyClass
```

**With Maven** - update `maven-compiler-plugin` to pass the preview flag at compile time, and `maven-surefire-plugin` so your tests can run with it too:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <release>26</release>
        <compilerArgs>
            <arg>--enable-preview</arg>
        </compilerArgs>
    </configuration>
</plugin>

<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <configuration>
        <argLine>--enable-preview</argLine>
    </configuration>
</plugin>
```

**With Gradle (Kotlin DSL)** - add to your `build.gradle.kts`:

```kotlin
tasks.withType<JavaCompile> {
    options.compilerArgs.addAll(listOf("--enable-preview", "--release", "26"))
}

tasks.withType<Test> {
    jvmArgs("--enable-preview")
}
```

**With Gradle (Groovy DSL)** : add to your `build.gradle`:

```groovy
tasks.withType(JavaCompile) {
    options.compilerArgs += ['--enable-preview', '--release', '26']
}

tasks.withType(Test) {
    jvmArgs '--enable-preview'
}
```

> **Note:** Once `LazyConstant` becomes a standard (non-preview) feature, none of this configuration will be needed. You will be able to use it exactly like any other standard Java API setup.

## Putting It All Together: A Before and After

Let's look at a complete, realistic example. Suppose you have a service that loads application configuration from a file. You only want to read the file once, and only when the config is first requested.

**Before (double-checked locking):**

```java
public class HttpClientProvider {

    private static volatile HttpClientProvider instance;

    private final java.net.http.HttpClient client;

    private HttpClientProvider() {
        // HttpClient is expensive to build — it creates a thread pool
        // and establishes connection settings
        this.client = java.net.http.HttpClient.newBuilder()
                .connectTimeout(java.time.Duration.ofSeconds(10))
                .build();
    }

    public static HttpClientProvider getInstance() {
        if (instance == null) {
            synchronized (HttpClientProvider.class) {
                if (instance == null) {
                    instance = new HttpClientProvider();
                }
            }
        }
        return instance;
    }

    public java.net.http.HttpClient client() { return client; }
}
```

**After (LazyConstant):**

```java
import java.lang.invoke.LazyConstant;
import java.net.http.HttpClient;
import java.time.Duration;

public class HttpClientProvider {

    private static final LazyConstant<HttpClient> CLIENT =
            LazyConstant.of(() -> HttpClient.newBuilder()
                    .connectTimeout(Duration.ofSeconds(10))
                    .build());

    public static HttpClient client() {
        return CLIENT.get();
    }
}
```

The behavior is identical. The `LazyConstant` version is easier to read, easier to review, and impossible to break by forgetting a `volatile` or getting a null check in the wrong order.
<a id="summary">&nbsp;</a>
## Summary

`LazyConstant` is a clean, simple solution to a problem Java developers have been solving with complex boilerplate for decades.

Here is what to remember:

- Use `LazyConstant.of(supplier)` to create a value that is computed
  once on first access, in a thread-safe way.
- Declare the `LazyConstant` variable as `final` wherever possible —
  it is not required for correctness, but it enables the JVM's
  constant-folding optimization on the hot path.
- The supplier must not return `null`. If your value might legitimately
  be null, wrap it in `Optional`.
- Use `Map.ofLazy()`, `List.ofLazy()`, or `Set.ofLazy()` when you want
  each element in a collection to be initialized independently on first
  access.
- `LazyConstant` requires `--enable-preview` in JDK 26 and JDK 27 and
  is not yet a finalized feature. The configuration will not be needed
  once it is fully released as a standard Java feature.