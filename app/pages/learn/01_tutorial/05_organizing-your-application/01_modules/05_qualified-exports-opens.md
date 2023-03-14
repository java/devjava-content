---
id: organizing.modules.qualifiedexports
title: Qualified `exports` and `opens`
slug: learn/modules/qualified-exports-opens
slug_history:
- learn/qualified-exports-and-opens
group: modules
type: tutorial-group
layout: learn/tutorial-group.html
main_css_id: learn
description: "Use `exports ... to ...` and `opens ... to ...` to limit accessibility of exported or opened packages to specific modules."
---

The module systems allows modules to export and open packages to make them accessible to outside code, in which case every module reading the exporting/opening one can access types in those packages.
That means we have to choose between either strongly encapsulating a package or making it accessible to everybody all of the time.
To handle use cases that do not easily fit into that dichotomy, the module system offers qualified variants of the `exports` and `opens` directives that only give specific modules access.

**Note**:
You need to know [the module system basics](id:organizing.modules.intro) and [how to open packages](id:organizing.modules.reflection) to get the most out of this article.


## Qualified Export/Open of Packages

The `exports` directive can be _qualified_ by following it up with `to $MODULES`, where `$MODULES` is a comma-separated list of target module names.
To the modules named in an `exports to` directive, the package will be exactly as accessible as with a regular `exports` directive.
To all other modules the package will be as strongly encapsulated as if there were no `exports` at all.
The same is the case for the `opens` directive, which can also be qualified with `to $MODULES` with the same effects:
For the targeted modules, the package is open; fo all others, it's strongly encapsulated.

There are lots of examples of qualified exports within the JDK itself, but we'll focus on _java.xml_, which defines the _Java API for XML Processing_ (JAXP).
Six of its internal packages, prefixed with `com.sun.org.apache.xml.internal` and `com.sun.org.apache.xpath.internal` are used by _java.xml.crypto_ (the API for XML cryptography) and are thus exported to it (and only it):

```java
module java.xml {
	// lots of regular exports

    exports com.sun.org.apache.xml.internal.dtm to
        java.xml.crypto;
    exports com.sun.org.apache.xml.internal.utils to
        java.xml.crypto;
    exports com.sun.org.apache.xpath.internal to
        java.xml.crypto;
    exports com.sun.org.apache.xpath.internal.compiler to
        java.xml.crypto;
    exports com.sun.org.apache.xpath.internal.functions to
        java.xml.crypto;
    exports com.sun.org.apache.xpath.internal.objects to
        java.xml.crypto;
    exports com.sun.org.apache.xpath.internal.res to
        java.xml.crypto;

	// lots of services usages
}
```

Two small notes on compilation:

* If a module that declares a qualified export/open is compiled and the target module can't be found, the compiler will issue a warning.
  It is no error because the target module is mentioned but not required.
* It is not allowed to use a package in an `exports` and in an `exports to` _or_ in an `opens` and in an `opens to` directive.
  If either pair of directives were present, the qualified variant would be effectively useless and so this situation is interpreted as an implementation error and thus results in a compile error.

And there are two details to point out:

* The target modules can depend on the exporting/opening module (indeed _java.xml.crypto_ depends on _java.xml_), creating a cycle.
  Thinking about it, unless [implied readability](id:organizing.modules.implreadability) is used this actually _must_ be the case - how else would the target module read the exporting/opening one?
* Whenever a new modules needs access to the qualified-exported packages, the owning module needs to be changed, so it gives accesses to this new module.
  While letting the exporting module control who can access the packages is the whole point of qualified exports, it can still be cumbersome.


## When to Use Qualified Exports

As explained, the use case for qualified exports is to stay in control over which modules can access the relevant packages.
How often does that apply?
Generally speaking, every time a set of modules wants to share functionality between them without exposing it.

This is symmetrical to the problem of hiding utility classes before the module system was introduced.
As soon as a utility class has to be available across packages, it has to be public, but before Java 9 that meant that all other code could access it.
Strong encapsulation solved that by allowing us to make public classes inaccessible outside a module.

Now we are in a similar situation, where we want to hide a package (formerly, a class) but as soon as it has to be available across modules (packages), it has to be exported (made public) and can thus be accessed by all other modules (all other classes).
This is where qualified exports step in.
They allow modules to share a package between them without making it generally available.
This makes it very useful for libraries and frameworks that consist of several modules and want to share code without clients being able to use it.
It will also come in handy for large applications that want to restrict dependencies on specific APIs.

Qualified exports can be seen as lifting strong encapsulation from guarding types in artifacts to guarding packages in sets of modules.


## When to Use Qualified Opens

Qualified exports have target modules that are under your control, which makes these directives an important tool to prevent colleagues and users from introducing accidental dependencies on internal APIs.
The target modules for qualified opens, on the other hand, are typically frameworks and whether you open a package for reflection to every module or just to Hibernate, either way Spring won't start depending on it.
As such, the use case for qualified opens is much smaller than for qualified exports.

A downside of qualified opens is that until frameworks start adopting a `Lookup`/`VarHandle`-based approach, which allows "forwarding" reflective access, packages must always be opened to the exact module that does the actual reflection.
So in cases where specifications and implementations are separated (for example, JPA and Hibernate) you might find yourself having to open entity packages to the implementation instead of the API (e.g. a Hibernate module instead of a JPA module).
If your project tries to stick to the standard and avoid all mentions of the implementation in code, that is unfortunate.

Taken together, a good default approach for opening packages for reflection is to not qualify the access unless your project uses a lot of reflection over its own code, in which case the benefits are similar to those of qualified exports.
Opening just to frameworks seems not worth the hassle and should probably be avoided altogether in cases where it requires targeting specific implementation modules.
