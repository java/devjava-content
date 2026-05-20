---
title: Lazy Initialization in Java Using Lazy Constants
author: Garima Agarwal
layout: learn
sections:
- title: What is Lazy Initialization?
- title: The Old Way
- title: LazyConstant
- title: Lazy Collections
- title: How to Enable It
- title: Summary
---
# Lazy Initialization in Java Using Lazy Constants

*Java Tutorials | New Features*  
*Estimated read time: 10 minutes*

---

## What is Lazy Initialization?

When you write a Java application, not every object you create is needed right away. Some objects are expensive to build maybe they open a database connection, read a config file, or do a lot of calculation. Creating them at the start of the program, even when they might not be used, wastes time and memory.

**Lazy initialization** is a simple idea: don't create an object until the moment it is actually needed.

Think of it like this. Imagine a restaurant that preps every dish on the menu before the restaurant opens, whether or not anyone orders it that day. That would be very wasteful. A smarter kitchen waits for a dish to be ordered, then prepares it and only then.

That is exactly what lazy initialization does in Java.

---

## The Old Way: What Java Developers Have Been Doing for 25 Years

The most common pattern for lazy initialization is called **double-checked locking**. If you open almost any large Java codebase, you will find something like this:

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

**`volatile`** : This keyword tells Java "do not cache this value; always read it fresh from memory." Without it, different threads might each see a different, stale version of `instance`. It was only properly fixed in Java 5.

**`synchronized`** : This makes sure only one thread at a time can run the block of code inside. Without it, two threads might both see `instance == null` at the same moment and both try to create a new connection which you don't want.

**The double null check** : The outer `if` avoids locking on every single call (locking is slow). The inner `if` handles the case where two threads both passed the outer check at the same time.

This works. But notice how much code is needed just to say "create this object once, when it's first needed." It's a lot to remember, and easy to get wrong. If you forget the `volatile`, or get the checks in the wrong order, you get a subtle bug that only appears under heavy load, the worst kind.

---

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

This is perfectly safe and simple. But it creates the connection the moment the class is loaded even if your program never ends up needing it. For one object that might not matter. But if your application has dozens of services all doing this, your startup time grows for no reason.

In serverless environments (like AWS Lambda) or command-line tools, startup time is everything. Every millisecond counts.

---

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
- It only works for static singletons (one per application)
- The trick relies on how Java loads inner classes a concept that confuses many developers
- If you have ten different services that need this pattern, you end up with ten inner `Holder` classes cluttering your code

---

## The New Way: LazyConstant (JEP 531)

Java 26 introduced a new tool called `LazyConstant`. It is currently a **preview feature**, which means it is available to try out but the API might have small changes before it becomes permanent.

> **What is a preview feature?** It's a feature that is fully working but not yet finalized. You can use it by adding `--enable-preview` to your compile and run commands. Oracle wants developer feedback before locking it in forever.

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

---

## Understanding the Key Rules

There are three important things to know about `LazyConstant`:

**Rule 1 : The variable holding it must be `final`.**

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

---

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

---

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
|---|---|---|---|---|
| Eager static final | Y | N | Y | Y |
| Double-checked locking | Y (if done right) | Y | N (volatile fence) | Y |
| Holder idiom | Y | Y | Y | Confusing |
| `LazyConstant` | Y | Y | Y | Y |

---

## How to Enable It in Your Project

`LazyConstant` is a preview feature in JDK 26 (JEP 526) and JDK 27 (JEP 531). You need to turn on preview features to use it.

**With Maven**, add this to your `pom.xml`:

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
```

Also update your `maven-surefire-plugin` so tests can run with preview enabled:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <configuration>
        <argLine>--enable-preview</argLine>
    </configuration>
</plugin>
```

**With Gradle** (Kotlin DSL), add to your `build.gradle.kts`:

```kotlin
tasks.withType<JavaCompile> {
    options.compilerArgs.addAll(listOf("--enable-preview", "--release", "26"))
}

tasks.withType<JavaExec> {
    jvmArgs("--enable-preview")
}

tasks.withType<Test> {
    jvmArgs("--enable-preview")
}
```

**From the command line:**

```bash
# Compile
javac --enable-preview --release 26 MyClass.java

# Run
java --enable-preview MyClass
```

---

## Putting It All Together: A Before and After

Let's look at a complete, realistic example. Suppose you have a service that loads application configuration from a file. You only want to read the file once, and only when the config is first requested.

**Before (double-checked locking):**

```java
public class AppConfig {

    private static volatile AppConfig instance;

    private final String databaseUrl;
    private final int maxConnections;

    private AppConfig() {
        // reads config.properties from disk
        Properties props = loadFromDisk();
        this.databaseUrl = props.getProperty("db.url");
        this.maxConnections = Integer.parseInt(props.getProperty("db.maxConnections"));
    }

    public static AppConfig getInstance() {
        if (instance == null) {
            synchronized (AppConfig.class) {
                if (instance == null) {
                    instance = new AppConfig();
                }
            }
        }
        return instance;
    }

    public String getDatabaseUrl() { return databaseUrl; }
    public int getMaxConnections() { return maxConnections; }
}
```

**After (LazyConstant):**

```java
import java.lang.invoke.LazyConstant;

public class AppConfig {

    private static final LazyConstant<AppConfig> INSTANCE =
        LazyConstant.of(AppConfig::new);

    private final String databaseUrl;
    private final int maxConnections;

    private AppConfig() {
        // reads config.properties from disk
        Properties props = loadFromDisk();
        this.databaseUrl = props.getProperty("db.url");
        this.maxConnections = Integer.parseInt(props.getProperty("db.maxConnections"));
    }

    public static AppConfig getInstance() {
        return INSTANCE.get();
    }

    public String getDatabaseUrl() { return databaseUrl; }
    public int getMaxConnections() { return maxConnections; }
}
```

The behavior is identical. The `LazyConstant` version is easier to read, easier to review, and impossible to break by forgetting a `volatile` or getting a null check in the wrong order.

---

## Common Questions

**Q: Is `LazyConstant` ready to use in production?**

It is a preview feature, which means it requires `--enable-preview` and the API could have small changes between Java versions. For production code, it is best to wait for it to become a standard (non-preview) feature, expected around Java 28 or 29. For personal projects, side projects, or learning, it is completely fine to use today.

**Q: Can I use `LazyConstant` for an instance field, not just a static one?**

Yes, but the field still needs to be `final`. It works for per-instance lazy values too:

```java
public class Report {
    private final LazyConstant<String> summary =
        LazyConstant.of(this::generateSummary);

    public String getSummary() {
        return summary.get();
    }

    private String generateSummary() {
        // expensive computation
        return "...";
    }
}
```

**Q: What happens if my supplier throws an exception?**

If the supplier throws a `RuntimeException` or `Error`, it propagates up to the caller of `.get()`. The `LazyConstant` is reset, and the next call to `.get()` will try the supplier again.

**Q: How is this different from `Optional`?**

`Optional` is for representing a value that may or may not be present. `LazyConstant` is for representing a value that is definitely present, but computed later. They solve different problems, though as shown above, you can combine them when your value might be `null`.

---

## Summary

`LazyConstant` is a clean, simple solution to a problem Java developers have been solving with complex boilerplate for decades.

Here is what to remember:

- Use `LazyConstant.of(supplier)` to create a value that is computed once on first access
- Always declare the `LazyConstant` variable as `final`
- The supplier must not return `null`, use `Optional` wrapping if needed
- Use `Map.ofLazy()`, `List.ofLazy()`, or `Set.ofLazy()` when you want per-element lazy initialization inside a collection
- It requires `--enable-preview` in JDK 26 and 27, not yet a finalized feature

To try it today, download a JDK 26 or JDK 27 early-access build from [jdk.java.net](https://jdk.java.net) and add `--enable-preview` to your compile and run commands.

---

*This tutorial covers `LazyConstant` as introduced in JEP 526 (JDK 26, Second Preview) and JEP 531 (JDK 27, Third Preview). As a preview feature, the API may have minor changes before it is finalized. For the latest details, see the [OpenJDK JEP index](https://openjdk.org/jeps/0).*

*Looking to explore further? See the tutorials on [Virtual Threads](https://dev.java/learn/new-features/virtual-threads/) and [Records](https://dev.java/learn/records/) on dev.java.*
