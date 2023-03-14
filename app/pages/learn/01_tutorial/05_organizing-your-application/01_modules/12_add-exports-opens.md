---
id: organizing.modules.addexport
title: Circumventing Strong Encapsulation with `--add-exports` and `--add-opens`
slug: learn/modules/add-exports-opens
slug_history:
- learn/extending-the-module-graph-with---add-modules-and---add-reads
group: modules
type: tutorial-group
layout: learn/tutorial-group.html
main_css_id: learn
description: "The command line flags `--add-exports` and `--add-opens` give access to an internal API, be it part of the JDK or a dependency, by exporting a package at compile or run time or by opening it for reflection at run time."
---

The module system is very strict about access to internal APIs:
If the package isn't exported or opened, access will be denied.
But a package can't just be exported or opened by a module's author - there are also the command line flags `--add-exports` and `--add-opens`, which allow the module's _user_ to do that as well.

That way, it is possible to write and run code that accesses internals of the app's dependencies or of the JDK APIs.
Since this comes with a trade-off between more features or performance (presumably) versus less maintainability or undermined platform integrity, this decision should not be made lightly.
And because it ultimately concerns not just the developer but also the user of the resulting app, these command line flags have to be applied at launch time, so the user is aware that the trade-off is being made.

**Note**:
To fully understand this feature, you need a thorough understanding of a few different aspects of the module system, namely [its basics](id:organizing.modules.intro), [the support for reflection](id:organizing.modules.reflection), [qualified `exports` and `opens`](id:organizing.modules.qualifiedexports), [how to build and launch from the command line](id:organizing.modules.building), and [why strong encapsulation is important](id:organizing.modules.strongencaps).


## Exporting Packages with `--add-exports`

The option `--add-exports $MODULE/$PACKAGE=$READING_MODULE`, available for the `java` and `javac` commands, exports `$PACKAGE` of _$MODULE_ to _$READING_MODULE_.
Code in _$READING_MODULE_ can hence access all public types and members in `$PACKAGE` but other modules can not.
When setting _$READING_MODULE_ to `ALL-UNNAMED`, all code from the class path can access that package.
In a project that doesn't use modules, you will always use that placeholder - only once your own code runs in modules can you limit exported packages to specific modules.

The space after `--add-exports` can be replaced with an equal sign `=`, which helps with some tool configurations (Maven, for example):
`--add-exports=.../...=...`.

### At Compile Time

As an example, see this code that tries to create an instance of the internal class `sun.util.BuddhistCalendar`:

```java
BuddhistCalendar calendar = new BuddhistCalendar();
```

If we compile it like that, we get the following error, either on the import or the line itself if there's no import:

```shell
error: package sun.util is not visible
  (package sun.util is declared in module java.base, which does not export it)
```

The option `--add-exports` can work around that.
If the code above is compiled without module declaration, we need to open the package to `ALL-UNNAMED`:

```shell
javac
	--add-exports java.base/sun.util=ALL-UNNAMED
	Internal.java
```

If it's in module named _com.example.internal_, we can be more precise and thus minimize exposure of internals:

```shell
javac
	--add-exports java.base/sun.util=com.example.internal
	module-info.java Internal.java
```

### At Run Time

When launching the code (on JDK 17 and higher), we get a run-time error:

```shell
java.lang.IllegalAccessError:
	class Internal (in unnamed module @0x758e9812)
	cannot access class sun.util.BuddhistCalendar (in module java.base)
	because module java.base does not export sun.util to unnamed module @0x758e9812
```

To solve this problem, we need to repeat the `--add-exports` option at launch time.
For code in the class path:

```shell
java
	--add-exports java.base/sun.util=ALL-UNNAMED
	--class-path com.example.internal.jar
	com.example.internal.Internal
```

If it's in module named _com.example.internal_ (that defines a main class), we can again be more precise:

```shell
java
	--add-exports java.base/sun.util=com.example.internal
	--module-path com.example.internal.jar
	--module com.example.internal
```


## Opening Packages with `--add-opens`

The command line option `--add-opens $MODULE/$PACKAGE=$REFLECTING_MODULE` opens `$PACKAGE` of _$MODULE_ to _$REFLECTING_MODULE_.
Code in _$REFLECTING_MODULE_ can hence reflectively access all types and members, public and non-public ones, in `$PACKAGE` but other modules can not.
When setting _$READING_MODULE_ to `ALL-UNNAMED`, all code from the class path can reflectively access that package.
In a project that doesn't use modules, you will always use that placeholder - only once your own code runs in modules can you limit opened packages to specific modules.

The space after `--add-opens` can be replaced with an equal sign `=`, which helps with some tool configurations:
`--add-opens=.../...=...`.

Since `--add-opens` is bound to reflection, a pure run time concept, it only makes sense for the `java` command.
But given that numerous command line options work across multiple tools, it's helpful to report and explain when an option _doesn't_ and so `javac` does not reject the option and instead issues the warning that "--add-opens has no effect at compile time".

### At Run Time

As an example, see this code in a class `Internal` that tries to use reflection to create an instance of the internal class `sun.util.BuddhistCalendar`:

```java
Class.forName("sun.util.BuddhistCalendar").getConstructor().newInstance();
```

Since the code doesn't _compile_ against the internal class `BuddhistCalendar`, compilation works without additional command line flags.
But on JDK 17 and higher, executing the resulting code leads to an exception at run time:

```shell
Exception in thread "main" java.lang.IllegalAccessException:
	class Internal cannot access class sun.util.BuddhistCalendar (in module java.base)
	because module java.base does not export sun.util to unnamed module @1f021e6c
		at java.base/jdk.internal.reflect.Reflection.newIllegalAccessException(Reflection.java:392)
		at java.base/java.lang.reflect.AccessibleObject.checkAccess(AccessibleObject.java:674)
		at java.base/java.lang.reflect.Constructor.newInstanceWithCaller(Constructor.java:489)
		at java.base/java.lang.reflect.Constructor.newInstance(Constructor.java:480)
```

The option `--add-opens` can work around that.
If the code above is in a JAR on the class path, we need to open the package `sun.util` to `ALL-UNNAMED`:

```shell
java
	--add-opens java.base/sun.util=ALL-UNNAMED
	--class-path com.example.internal.jar
	com.example.internal.Internal
```

(Recall from [the article on strong encapsulation](id:organizing.modules.strongencaps), that it is not necessary to open the packages `sun.misc` and `sun.reflect` because they are exported by _jdk.unsupported_.)

If it's in module named _com.example.internal_ (that defines a main class), we can be more precise and thus minimize exposure of internals:

```shell
java
	--add-opens java.base/sun.util=com.example.internal
	--module-path com.example.internal.jar
	--module com.example.internal
```
