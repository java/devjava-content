---
id: organizing.modules.services
title: Decoupling Modules with Services
slug: learn/modules/services
slug_history:
- learn/decoupling-modules-with-services
group: modules
type: tutorial-group
layout: learn/tutorial-group.html
main_css_id: learn
description: "Decouple users and providers of a service with Java's ServiceLoader API, which the module system makes a first-class concept with `uses` and `provides` directives in the module declaration."
---

In Java it is common to model APIs as interfaces (or sometimes abstract classes) and then pick the best implementation given the circumstances.
Ideally, the consumer of the API is completely decoupled from the implementations, meaning there is no direct dependency between them.
Java's service loader API allows to apply this approach to JARs (modular or not) and the module system integrates it as a first-class concept with `uses` and `provides` directives in the module declaration.

**Note**:
You need to know [the module system basics](id:organizing.modules.intro) to get the most out of this article.



## Services in the Java Module System

### Exemplifying the Problem

Let's start with an example that uses these three types in three modules:

* class `Main` in _com.example.app_
* interface `Service` in _com.example.api_
* class `Implementation` (implements `Service`) in _com.example.impl_

`Main` wants to use `Service` but needs to create `Implementation` to get an instance:

```java
public class Main {

	public static void main(String[] args) {
		Service service = new Implementation();
		use(service);
	}

	private static void use(Service service) {
		// ...
	}

}
```

This leads to the following module declarations:

```java
module com.example.api {
	exports com.example.api;
}

module com.example.impl {
	requires com.example.api;
	exports com.example.impl;
}

module com.example.app {
	// dependency on the API: ✅
	requires com.example.api;
	// dependency on the implementation: ⚠️
	requires com.example.impl;
}
```

As you can see, the challenge of using interfaces to decouple user and provider of an API is that at some point a specific implementation has to be instantiated.
If that happens as a regular constructor call (as in `Main`), it creates a dependency on the implementation and thus a dependency between the two modules.
This is what services solve.

### Service Locator Pattern as Solution

Java solves this problem by implementing the [the service locator pattern](https://en.wikipedia.org/wiki/Service_locator_pattern) with the class [`ServiceLoader`](javadoc:ServiceLoader) acting as the central registry.
Here's how it works.

A service is an accessible type (doesn't have to be an interface; abstract and even concrete classes work as well) that one module wants to use and another module provides an instance of:

* The module _consuming_ the service has to express its requirement with a `uses $SERVICE` directive in its module descriptor, where `$SERVICE` is the fully qualified name of the service type.
* The module _providing_ the service has to express its offer with a `provides $SERVICE with $PROVIDER` directive, where `$SERVICE` is the same type as in the `uses` directive and `$PROVIDER` the fully qualified name of another class, which is...
	* _either_ a concrete class that extends or implements `$SERVICE` and has a public, parameterless constructor (called a _provider constructor_)
	* _or_ an arbitrary type with a public, static, parameterless method `provide` that returns a type that extends or implements `$SERVICE` (called a _provider method_)

At run time, the depending module can use the `ServiceLoader` class to get all provided implementations of a service by calling `ServiceLoader.load($SERVICE.class)`.
The module system will then return a `ServiceLoader<$SERVICE>` that you can use in various ways to get access to the service providers.
The Javadoc of [`ServiceLoader`](javadoc:ServiceLoader) goes into detail on that (and, in fact, everything else service-related).

### Exemplifying the Solution

Here's how the three classes and modules we examined earlier can use services.
We start with the module declarations:

```java
module com.example.api {
	exports com.example.api;
}

module com.example.impl {
	requires com.example.api;

	provides com.example.api.Service
		with com.example.impl.Implementation;
}

module com.example.app {
	requires com.example.api;

	uses com.example.api.Service;
}
```

Note that _com.example.app_ no longer requires _com.example.impl_.
Instead it declares that it uses `Service` and _com.example.impl_ declares that it provides it with `Implementation`.
Furthermore, _com.example.impl_ no longer exports the `com.example.impl` package.
The service loader does not demand the service implementation to be accessible outside the module and if no other class in that package needs to be, we can stop exporting it.
This is an added bonus of services because it can reduce the API surface of a module.

Here's how `Main` can get an implementation of `Service`:

```java
public class Main {

	public static void main(String[] args) {
		Service service = ServiceLoader
			.load(Service.class)
			.findFirst()
			.orElseThrow();
		use(service);
	}

	private static void use(Service service) {
		// ...
	}

}
```

### Some JDK Services

The JDK itself uses services as well.
For example, the _java.sql_ module, which contains the JDBC API, uses `java.sql.Driver` as a service:

```java
module java.sql {
	// requires...
	// exports...
    uses java.sql.Driver;
}
```

This also showcases that a module can use one of its own types as a service.

Another exemplary use of services in the JDK is `java.lang.System.LoggerFinder`.
This is part of an API that allows users to pipe the JDK's log messages (not the runtime's!) into the logging framework of their choice (say, Log4J or Logback).
Simply put, instead of writing to standard out, the JDK uses a `LoggerFinder` to create `Logger` instances and then logs all messages with them.
And since it uses `LoggerFinder` as a service, logging frameworks can provide implementations of it.

```java
module com.example.logger {
	// `LoggerFinder` is the service interface
	provides java.lang.System.LoggerFinder
		with com.example.logger.ExLoggerFinder;
}

public class ExLoggerFinder implements System.LoggerFinder {

	// `ExLoggerFinder` must have a parameterless constructor

	@Override
	public Logger getLogger(String name, Module module) {
		// `ExLogger` must implement `Logger`
		return new ExLogger(name, module);
	}

}
```


## Services During Module Resolution

If you've ever started a simple modular application with the command line option `--show-module-resolution` and observed what exactly the module system is doing, you might have been surprised by the number of platform modules that are resolved.
With a simple enough application the only platform modules should be _java.base_ and maybe one or two more, so why are there so many others?
Services are the answer.

Remember from [the module system basics](id:organizing.modules.intro) that only modules that make it into the graph during module resolution are available at run time.
To make sure that's the case for all providers of a service, the resolution process takes `uses` and `provides` directives into account.
So beyond tracking down dependencies, once it resolves a module that uses a service, it also adds all modules to the graph that provide that service.
This process is called _service binding_.
