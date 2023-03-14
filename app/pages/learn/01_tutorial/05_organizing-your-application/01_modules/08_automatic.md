---
id: organizing.modules.automatic
title: Incremental Modularization with Automatic Modules
slug: learn/modules/automatic-module
slug_history:
- learn/incremental-modularization-with-automatic-modules
group: modules
type: tutorial-group
layout: learn/tutorial-group.html
main_css_id: learn
description: "Plain JARs on the module path become automatic modules, where they can act as a bridge from modular JARs to the class path."
---

The module system requires all dependencies of a module to be found on the module path (or in the runtime).
If only modular JARs would work on the module path, a project's dependencies would all have to be modules before the project itself can become one and larger projects would have to be modularized in one step.
To avoid that ecosystem-wide bottom-up modularization effort as well as big-bang modularizations of larger projects, the module system also allows plain JARs on the module path where they turn into automatic modules.
Once a few special rules are applied, they work as all other modules.
One special rule is that automatic modules can read the unnamed module, which allows them to serve as a bridge from the module path to the class path.

**Note**:
You need to know [the module system basics](id:organizing.modules.intro), about [the unnamed module](id:organizing.modules.unnamed), and [implied readability](id:organizing.modules.implreadability) to get the most out of this article.


## Automatic Modules

For every JAR on the module path that has no module descriptor, the module system creates an _automatic module_.
As any other module it has three central properties:

* a name: an automatic module's name can be defined in the JAR's manifest with the `Automatic-Module-Name` header (more on that below); if it is missing, the module system generates a name from the file name
* dependencies: an automatic module reads all other modules that make it into the graph, including the unnamed module
* exports: an automatic module exports all its packages and also [opens them for reflection](id:organizing.modules.reflection)

[Services](id:organizing.modules.services) provided in `META-INF/services` are made available to the `ServiceLoader`.

Automatic modules are full-fledged named modules, which means:

* They can be referenced by their name in other modules' declarations, for example to require them.
* Even on Java 9 to 16, they weren't subject to [the exception from strong encapsulation of JDK modules](id:organizing.modules.strongencaps).
* They are subject to reliability checks like split packages.

To try automatic modules out, you can put the following two lines of code into a class that you package as a plain JAR:

```java
String moduleName = this.getClass().getModule().getName();
System.out.println("Module name: " + moduleName);
```

When launched from the class path, the output is `Module name: null`, indicating that the class ended up in the unnamed module.
When launched from the module path, you get the expected `Module name: $JAR`, where `$JAR` is the name you gave to the JAR file.
If you add in a manifest with a `Automatic-Module-Name` header that defines a name, you will see that name when launching the JAR from the module path.
To experiment with depending on automatic modules, you can create a second project and add a `requires $JAR` to its module declaration.


## Automatic Module Names - Small Detail, Big Impact

The main point of turning plain JARs into modules is to be able to require them in module declarations.
For this they need a name, but lacking module descriptors, where would it come from?

### First Manifest Entries, Then File Name

One way to determine a plain JAR's module name relies on its manifest, which is a file `MANIFEST.MF` in a JAR's `META-INF` folder.
If a JAR on the module path contains no descriptor, the module system follows a two-step process to determine the automatic module's name:

1. It looks for the `Automatic-Module-Name` header in the manifest.
   If it finds it, it uses the corresponding value as the module's name.
2. If the header is not present in the manifest, the module system infers a module name from the file name.

Being able to infer the module's name from the manifest is preferable by a wide margin because it is much more stable - more in that below.
The exact rules for inferring a module name from the file name are a little complicated, but the details are not overly important - here's the gist:

* JAR file names often end with a version string (like `-2.0.5`).
  These are recognized and ignored.
* Every character apart from letters and digits is turned into a dot.

This process can lead to unfortunate results, where the resulting module name is invalid.
An example is the bytecode manipulation tool [ByteBuddy](https://bytebuddy.net):
It is published in Maven Central as `byte-buddy-$VERSION.jar`, which lead to the automatic module name `byte.buddy` (before it defined a proper name).
Unfortunately, this is illegal, because `byte` is of course a Java keyword.

### Finding Out the Name

If you need to find out a plain JAR's automatic module name, you can run `jar --describe-module --file $FILE` against the JAR file.
Unfortunately, this does not tell you whether the name was picked from the manifest entry or the file name.
To find that out you have several options:

* Extract the manifest with `jar --file $JAR --extract META-INF/MANIFEST.MF` and look at it manually.
* On Linux, `unzip -p $JAR META-INF/MANIFEST.MF` prints the manifest to the terminal and thus saves you the time to open the file.
* Rename the file and run `jar --describe-module` again.

### When to Set `Automatic-Module-Name`

If you are maintaining a project that is publicly released, meaning its artifacts are available via Maven Central or some other public repository, you should carefully consider when to set the `Automatic-Module-Name` in the manifest.
As already alluded to, it makes using your project as an automatic module much more reliable, but it also comes with the promise that in the future, explicit modules will be drop-in replacements for the current JARs.
You're essentially saying: "This is what the modules will look like, I just didn't get around to releasing them yet".

The fact that defining an automatic module name invites your users to start relying on your project artifacts as modules has a few important implications:

* The names of the future modules must be exactly those that you declare now.
  (Otherwise, reliable configuration will bite your users because modules are missing.)
* The artifact structure must remain the same, so you can't start moving supported classes or packages from one JAR to another.
  (Even without modules, this isn't recommended practice, but with the class path it doesn't matter which JAR contains a class, so you could get away with it.
  With the module system in play, on the other hand, a class' origin is very relevant because accessibility forces users to require the correct module.)
* The project runs reasonably well on Java 9 and later.
  If it needs command line options or other workarounds, these are well documented.
  (Otherwise you can't be sure that there aren't problems hidden in your code that make the other promises moot.)


## Module Resolution for Automatic Modules

Automatic modules are created from plain JARs, so they have no explicit dependencies, which begs the question how they behave during resolution.
JARs have the tendency to depend on one another and if the module system would only resolve automatic modules that are explicitly required, all other automatic modules would need to be [added to the graph with `--add-modules`](id:organizing.modules.addreads).
Imagine doing that for a large project with hundreds of dependencies that you decided to all place on the module path.

To prevent such excessive and fragile manual module adding, the module system pulls in _all_ automatic modules once it encounters _the first one_ that is explicitly required.
In other words, you either get all plain JARs as automatic modules (if at least one is required or added) or none (otherwise).
Another aspect is that automatic modules [imply readability](id:organizing.modules.implreadability) on other automatic modules, which means any module that reads _one_, reads _all_ of them.

If automatic modules could only read other named modules, we would be done now.
Once you place a plain JAR on the module path, all of its direct dependencies would have to go onto the module path as well and then their dependencies and so on until all transitive dependencies are treated as modules, explicit or automatic ones.

Turning a plain JAR into an automatic module may not work, though, because of the checks it is exposed to (e.g. search for split packages).
So it would be nice to be able to leave plain JARs on the class path and have them loaded into the unnamed module instead.
And indeed the module system allows just that by letting automatic modules read the unnamed module, which means their dependencies can be on the class path _or_ the module path.

When we focus on platform modules for a moment, we see that an automatic module can not express dependencies on them.
As a consequence, the module graph might or might not contain them and if it doesn't, the automatic module is likely to fail at run time with an exception due to missing classes.
The only way around this is for the project's maintainers to very publicly document which modules they need, so that their users can make sure the required modules are present.
Users can do that by either requiring them explicitly, for example in the module that depends on the automatic module, or with `--add-modules`.


## Depending on Automatic Modules

The sole purpose of automatic modules is to depend on plain JARs, so it becomes possible to create explicit modules without having to wait until all dependencies are modularized.
There is an important caveat, though:
If the JAR's manifest does not contain the `Automatic-Module-Name` entry, the automatic module name is inferred from the file name.

But depending on their setup, different projects might use different names for the same JARs.
Furthermore, most projects use a Maven-backed local repository, where the JAR files are named `${artifactID}-$VERSION`, from which the module system will likely infer _${artifactID}_ as the automatic module's name.
That's problematic because artifact ID's generally don't follow the reverse-domain naming convention, which means once the project gets modularized, the module name is likely going to change.

Taken together, the same JAR might get different module names in different projects (depending on their setup) and at different times (before and after modularization).
This has the potential to cause havoc downstream and needs to be avoided at all costs!

It might look as if the critical mistake is to require a plain JAR by a module name that is based on its file name.
But that's not generally the case - using this approach is perfectly fine for applications and in other scenarios where the developer has full control over the module descriptors requiring such automatic modules.
No, mistake is to _publish_ modules with such dependencies to a public repository.
Only then can users come into a situation where a module implicitly depends on details that they have no control over and that can lead to additional work or even unresolvable divergences.

So you should never publish (to an openly accessible repository) modules that require a plain JAR without an `Automatic-Module-Name` entry in its manifest.
Only with that entry are automatic module names sufficiently stable to rely on.
Yes, that might mean that you can not yet publish a modularized version of your library or framework and must wait for your dependencies to add that entry.
That's unfortunate, but doing it anyway would be a great disservice to your users.
