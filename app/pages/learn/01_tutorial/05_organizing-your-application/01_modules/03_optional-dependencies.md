---
id: organizing.modules.optdepedencies
title: "Optional Dependencies with `requires static`"
slug: learn/modules/optional-dependencies
slug_history:
- learn/reflective-access-with-open-modules-and-open-packages
group: modules
type: tutorial-group
layout: learn/tutorial-group.html
main_css_id: learn
description: "Use `requires static` for optional dependencies - modules required this way are accessible at compile time but can be absent at run time."
---

The module system has a strong opinion on dependencies:
By default, they need to be required (to be accessible) and then they need to be present both at compile and at run time.
This does not work with optional dependencies, though, where code is written against artifacts that are not necessarily present at run time.
The `requires static` directive solves this problem by demanding presence at compile time but tolerating absence at run time.

**Note**:
You need to know [the module system basics](id:organizing.modules.intro) to get the most out of this article.


## Optional Dependencies With `requires static`

When a module needs to be compiled against types from another module but does not want to depend on it at run time, it can use a `requires static` directive.
If module _A_ `requires static` module _B_, the module system behaves different at compile and run time:

* At compile time, _B_ must be present (or there will be an error) and _B_ is readable by _A_.
  (This is the common behavior for dependencies.)
* At run time, _B_ might be absent and that will cause neither error nor warning.
  If it is present, it is readable by _A_.

How exactly presence is handled is not trivial, but before discussing that let's see an example.
Within the JDK, no dependency is optional, so we have to come up with our own.

Let's imagine an app that solves its business case well enough but can do so better in presence of an additional, proprietary library.
In this example, we call the app's module _com.example.app_ and the library _com.sample.solver_.
We also assume that the integration is coded such that _com.example.app_ references types from _com.sample.solver_, which means _app_ needs to be compiled against the _solver_, which in turn means _app_ must require _solver_:

```java
module com.example.app {
	requires com.sample.solver;
}
```

But as we explored when discussing module resolution, this means tha the module system will throw an error at run time if _com.sample.solver_ is absent - clearly the dependency is not optional.
Let's use `requires static` instead:

```java
module com.example.app {
	requires static com.sample.solver;
}
```

For compilation of _com.example.app_, _com.sample.solver_ is required and must be present, which means its types can be freely used.
At run time, it can be missing, though, which leads to two questions that we will answer next:

* Under what circumstances will the optional dependency be present?
* How can we code against an an optional dependency?


## Resolution Of Optional Dependencies

Module resolution is the process that, starting from the root modules, builds a module graph by resolving `requires` directives.
When a module is being resolved, all modules it requires must be found in the runtime or on the module path and if they are, they are added to the module graph; otherwise an error occurs.
(Note that modules that did not make it into the module graph during resolution are not available later during compilation or execution, either.)
At compile time, module resolution handles optional dependencies just like regular dependencies.
At run time, though, they are mostly ignored.

When the module system encounters a `requires static` directive it does not try to fulfill it, meaning it does not even check whether the referenced module can be found.
As a consequence, even if a module is present on the module path (or in the JDK for that matter), it will *not* be added to the module graph just because of an optional dependency.
It will only make it into the graph if it is also a regular dependency of some other module that is being resolved or because it was added explicitly with the command line flag `--add-modules`.
In that case, the module system will add a readability edge from the requiring mode to the optional dependency.

In other words, an optional dependency is ignored unless it makes it into the module graph some other way, in which case the resulting module graph is the same as if it would've been with a non-optional dependency.


## Coding Against Optional Dependencies

Optional dependencies require a little more thought when writing code against them.
Generally speaking, when the code that is currently being executed references a type, the Java runtime checks whether it is already loaded.
If not, it tells the class loader to do that and if that fails, the result is a `NoClassDefFoundError`, which usually crashes the application or at least fails out of the chunk of logic that was being executed.

This is something JAR hell was famous for and that the module system wants to overcome by checking declared dependencies when launching an application.
But with `requires static` we opt out of that check, which means we can end up with a `NoClassDefFoundError` after all.

### Checking Module Presence

To avoid that, we can query the module system for the presence of a module:

```java
public class ModuleUtils {

	public static boolean isModulePresent(Object caller, String moduleName) {
		return caller.getClass()
				.getModule()
				.getLayer()
				.findModule(moduleName)
				.isPresent();
	}

}
```

The caller needs to pass itself to the method so it can determine the correct layer to query for the desired module.

### Established Dependency

It may not always be ne necessary to explicitly check a module's presence, though.
Imagine a library _com.example.lib_ that helps with the use of various existing APIs, among them the JDBC API in _java.sql_.
Then it makes sense to assume that code that doesn't use JDBC doesn't use that part of the library.
Put differently, we can assume that the JDBC parts of the library are only called from code that already uses JDBC, which means _java.sql_ must be part of the module graph.

Generally speaking, if the code that uses an optional dependency will only ever be called from code that relies on the same dependency, its presence can be assumed and doesn't need to be checked.
