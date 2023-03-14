---
id: organizing.modules.building
title: Building Modules on the Command Line
slug: learn/modules/building
slug_history:
- learn/building-modules-on-the-command-line
group: modules
type: tutorial-group
layout: learn/tutorial-group.html
main_css_id: learn
description: "Learn how to use the javac, jar, and java commands to compile, package, and launch your modular application by hand - good to know even though build tools do most of the heavy lifting."
---

When using the module system to create modules for your code, you will likely do that in a project that uses a build tool and so it is its task to get things right.
But it helps tremendously to understand what "right" looks like and how to correctly configure `javac`, `jar`, and `java` to compile, package, and run your application.
This will give you a better understanding of the module system and help debug problems in case the build tool doesn't get it right.

**Note**:
You need to know [the module system basics](id:organizing.modules.intro) to get the most out of this article.
You may also want to check out [the description of the core JDK tools](id:jvm.core_tools.overview).


## A Basic Build

Given a project with a few source files, a module declaration, and a few dependencies, this is how you can compile, package, and run it in the simplest way:

```shell
# compile sources files, including module-info.java
$ javac
	--module-path $DEPS
	-d $CLASS_FOLDER
	$SOURCES
# package class files, including module-info.class
$ jar --create
    --file $JAR
    $CLASSES
# run by specifying a module by name
$ java
	--module-path $JAR:$DEPS
	--module $MODULE_NAME/$MAIN_CLASS
```

There's a bunch of placeholders in there:

* `$DEPS` is the list of dependencies. These are typically paths to JAR files separated by `:` (Unix) or `;` (Windows), but on the module path, this can also just be folder names (without the `/*`-trickery that's required on the class path).
* `$CLASS_FOLDER` is the path to the folder where the `*.class` files will be written to.
* `$SOURCES` is the list of `*.java` files and must include `module-info.java`.
* `$JAR` is the path to the JAR file that will be created.
* `$CLASSES` is the list of `*.class` files that was created during compilation (thus found in `$CLASS_FOLDER`) and must include `module-info.class`.
* `$MODULE_NAME/$MAIN_CLASS` is the name of the initial module (i.e. the one where module resolution starts) followed by the name of the class containing the app's `main` method.

For a simple "Hello World" style project with the common `src/main/java` structure, just a single source file, dependencies in a `deps` folder, and using Maven's `target` folder that would look as follows:

```shell
$ javac
	--module-path deps
	-d target/classes
	src/main/java/module-info.java
	src/main/java/com/example/Main.java
$ jar --create
    --file target/hello-modules.jar
	target/classes/module-info.class
	target/classes/com/example/Main.class
$ java
	--module-path target/hello-modules.jar:deps
	--module com.example/com.example.Main
```


## Defining a Main Class

The `jar` option `--main-class $MAIN_CLASS` embeds `$MAIN_CLASS` as the class containing the `main` method in the module descriptor, which allows you to launch a module without having to name the main class:

```shell
$ jar --create
    --file target/hello-modules.jar
	--main-class com.example.Main
	target/classes/module-info.class
	target/classes/com/example/Main.class
$ java
	--module-path target/hello-modules.jar:deps
	--module com.example
```

Note that it is possible to override that class and launch another, simply by naming it as before:

```shell
# create a JAR with `Main` and `Side`,
# making `Main` the main class
$ jar --create
    --file target/hello-modules.jar
	--main-class com.example.Main
	target/classes/module-info.class
	target/classes/com/example/Main.class
	target/classes/com/example/Side.class
# override the main class and launch `Side`
$ java
	--module-path target/hello-modules.jar:deps
	--module com.example/com.example.Side
```


## Circumventing Strong Encapsulation

The module system is [very strict about access to internal APIs](id:organizing.modules.strongencaps):
If the package isn't exported or opened, access will be denied.
But a package can't just be exported or opened by a module's author - there are also the command line flags `--add-exports` and `--add-opens`, which allow the module's _user_ to do that as well.

As an example, see this code that tries to create an instance of the internal class `sun.util.BuddhistCalendar`:

```java
BuddhistCalendar calendar = new BuddhistCalendar();
```

To compile and run it, we need to use `--add-exports`:

```shell
javac
	--add-exports java.base/sun.util=com.example.internal
	module-info.java Internal.java
# package with `jar`
java
	--add-exports java.base/sun.util=com.example.internal
	--module-path com.example.internal.jar
	--module com.example.internal
```

If the access is reflective...

```java
Class.forName("sun.util.BuddhistCalendar").getConstructor().newInstance();
```

... compilation will work without further configuration, but we need to add `--add-opens` when running the code:

```shell
java
	--add-opens java.base/sun.util=com.example.internal
	--module-path com.example.internal.jar
	--module com.example.internal
```

Details on [strong encapsulation](id:organizing.modules.strongencaps) and [circumventing it with `add-exports` and `add-opens`](id:organizing.modules.addexport).


## Extending the Module Graph

Starting with an initial set of root modules, the module system computes all of their dependencies and builds a graph, where the modules are nodes and their readability relations are directed edges.
This [module graph can be extended](id:organizing.modules.addreads) with the command line flags `--add-modules` and `--add-reads`, which add modules (and their dependencies) and readability edges, respectively.

As an example, let's imagine a project that has [an optional dependency](id:organizing.modules.optdepedencies) on _java.sql_, but the module is not otherwise required.
That means it's not added to the module graph without a little help:

```shell
# launch without java.sql
$ java
	--module-path example.jar:deps
	--module com.example/com.example.Main

# launch with java.sql
$ java
	--module-path example.jar:deps
	--add-modules java.sql
	--module com.example/com.example.Main
```

An alternative approach to optional dependencies would be to not list the dependency at all and only add it with `--add-modules` and `--add-reads` (this is rarely helpful and not generally recommended - just an example):

```shell
$ java
	--module-path example.jar:deps
	--add-modules java.sql
	--add-reads com.example=java.sql
	--module com.example/com.example.Main
```

Details on [extending the module graph with `--add-modules` and `--add-reads`](id:organizing.modules.addreads).

<!--
TODO:

  --module-version <version>
        Specify version of modules that are being compiled
  --patch-module <module>=<file>(:<file>)*
        Override or augment a module with classes and resources
        in JAR files or directories
  --upgrade-module-path <path>
        Override location of upgradeable modules

-->
