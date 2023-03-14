---
id: organizing.modules.unnamed
title: Code on the Class Path - the Unnamed Module
slug: learn/modules/unnamed-module
slug_history:
- learn/code-on-the-class-path---the-unnamed-module
group: modules
type: tutorial-group
layout: learn/tutorial-group.html
main_css_id: learn
description: "All JARs on the class path, modular or not, become part of the unnamed module. This makes 'everything a module', while the chaos of the class path can live on."
---

The module system wants everything to be a module, so it can apply its rules uniformly but, at the same time, creating modules isn't mandatory (and making it so wouldn't be backwards compatible).
The mechanism that reconciles these two seemingly contradictory requirements is the unnamed module.
It contains all classes from the class path and has some special rules applied to it but once that's done, it works like any other module.

That means if you launch your code from the class path, the unnamed module will be in play.
And unless your application is fairly small, it will likely require an incremental modularization, which involves mixing JARs and modules, class path and module path.
This makes it important to understand how the module system's "class path mode" works.

**Note**:
You need to know [the module system basics](id:organizing.modules.intro) to get the most out of this article.


## The Unnamed Module

The unnamed module contains all "non-modular classes", which are

* at compile time, the classes that are getting compiled if they do not include a module descriptor
* at compile and run time, all classes loaded from the class path

All modules have three central properties and this is also true for the unnamed module:

* a name: the unnamed module has none (makes sense, right?), which means no other module can mention it in its declaration (for example to require it)
* dependencies: the unnamed module reads all other modules that make it into the graph
* exports: the unnamed module exports all its packages and also [opens them for reflection](id:organizing.modules.reflection)

It is in contrast to the unnamed module that all other modules are said to be _named_.
[Services](id:organizing.modules.services) provided in `META-INF/services` are made available to the `ServiceLoader`.

While not exactly straightforward, the concept of the unnamed module makes sense.
Here you have the orderly module graph and over there, a little to the side, you have the chaos of the class path, lumped into its own free-for-all module with some special properties.


## The Chaos of the Class Path

The unnamed module's main goal is to capture the class path content and make it work in the module system.
Since there were never any boundaries between JARs on the class path, it makes no sense to establish them now and so there's a single unnamed module for the entire class path.
Within it, just like on the class path, all public classes are accessible to one another and packages can be split across JARs.

The unnamed module's distinct role and its focus on backwards compatibility gives it a few special properties.
One was the intermittent access to [strongly encapsulated APIs in Java 9 to 16](id:organizing.modules.strongencaps).
Another is that it's not exposed to many checks that are applied to named modules.
As a consequence, packages split between it and other modules are not discovered and the class path portion is simply not available.
(That means you can get errors for missing classes that are actually present on the class path if the same package also exists in a named module.)

One detail that's a little counterintuitive and easy to get wrong is what exactly constitutes the unnamed module.
It seems obvious that modular JARs become modules and hence plain JARs go into the unnamed module, right?
But that is not the case, the unnamed module is in charge of _all JARs on the class path_, modular or not.
Consequently, modular JARs are not bound to be loaded as modules!
So if a library starts delivering modular JARs, its users are by no means forced to use them as modules.
They can instead leave them on the class path, where their code gets bundled into the unnamed module.
This allows the ecosystem to modularize almost independently of one another.

To try this out, you can put the following two lines of code into a class that you package as a modular JAR:

```java
String moduleName = this.getClass().getModule().getName();
System.out.println("Module name: " + moduleName);
```

When launched from the class path, the output is `Module name: null`, indicating that the class ended up in the unnamed module.
When launched from the module path, you get the expected `Module name: $MODULE`, where `$MODULE` is the name you gave to the module.


## Module Resolution for the Unnamed Module

An important aspect of the unnamed module's relation to the rest of the module graph is which other modules it can read.
As described, these are all that make it into the graph.
But which modules are that?
Remember from [the module system basics](id:organizing.modules.intro) that module resolution builds a module graph by starting with the root modules (particularly the initial module) and then iteratively adding all their direct and transitive dependencies.
How would that work if the code under compilation or the application's `main` method is in the unnamed module as is the case when launching an application from the class path?
After all, plain JARs don't express any dependencies.

If the initial module is the unnamed one, module resolution starts in a predefined set of root modules.
As a rule of thumb, these are the modules found in the run time, but the actual rule is a little more detailed:

* The precise set of _java.*_ modules that become root depends on the presence of the _java.se_ module (that is the module representing the entire Java SE API; it is present in full JRE images, but may be absent from custom runtime images created with `jlink`):
	* If _java.se_ is observable, it becomes root.
	* If it is not, every _java.*_ module that exports at least one package [without qualification](id:organizing.modules.qualifiedexports) becomes root.
* Beyond _java.*_ modules, every other module in the runtime that is not an incubating module and exports at least one package without qualification becomes a root module.
  This is particularly relevant for _jdk.*_ modules.
* Modules [listed with `--add-modules`](id:organizing.modules.addreads) are always root modules.

Note that with the unnamed module as the initial one, the set of root modules is always a subset of the modules contained in the runtime image.
Modules present on the module path will never be resolved unless added explicitly with `--add-modules`.
If you handcrafted the module path to contain exactly the modules you need, you might want to add all of them with `--add-modules ALL-MODULE-PATH` as explained [in this article](id:organizing.modules.addreads).


## Depending on the Unnamed Module

One of the module system's primary goals is reliable configuration:
A module must express its dependencies and the module system must be able to guarantee their presence.
We discussed that for explicit modules with a module descriptor but what would happen if we tried to expand reliable configuration to the class path?

### A Thought Experiment

Imagine modules could depend on the class path content, maybe with something like `requires class-path` in their descriptor.
What guarantees could the module system make for such a dependency?
As it turns out, almost none.
As long as there is at least one class on the class path, the module system would have to assume that the dependency is fulfilled.
That would not be very helpful.
Even worse, it would seriously undermine reliable configuration because you might end up depending on a module that `requires class-path`.
But that contains next to no information - what _exactly_ needs to go on the class path?

Spinning this hypothetical even further, imagine two modules _com.example.framework_ and _com.example.library_ depended on the same third module, say SLF4J.
One declared the dependency before SLF4J was modularized and hence `requires class-path`, the other declared its dependency on a modularized SLF4J and hence `requires org.slf4j`.
Now, on which path would anybody depending on _com.example.framework_ and _com.example.library_ place the SLF4J JAR?
Whichever they chose, the module system had to determine that one of the two transitive dependencies were not fulfilled.

Thinking this through leads to the conclusion that depending on arbitrary class path content is not a good idea if you want reliable modules.
And for that exact reason there is no `requires class-path`.

### Hence, Unnamed

So how to best express that the module that ends up holding the class path content can't be depended upon?
In a module system that uses names to reference other modules?
Not giving that module a name, making it _unnamed_, so to speak, sounds reasonable.
And there you have it:
The unnamed module has no name because no module is supposed to ever reference it in a `requires` directive - or any other directive, for that matter.
Without `requires`, there's no readability edge, and without that edge, code in the unnamed module is inaccessible to modules.

In summary, for an explicit module to depend on an artifact, that artifact has to be on the module path.
This might well mean that you place plain JARs on the module path, which turns them into automatic modules - a concept we explore next.
