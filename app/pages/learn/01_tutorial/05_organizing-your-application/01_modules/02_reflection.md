---
id: organizing.modules.reflection
title: Reflective Access with Open Modules and Open Packages
slug: learn/modules/opening-for-reflection
slug_history:
- learn/introduction-to-modules-in-java
group: modules
type: tutorial-group
layout: learn/tutorial-group.html
main_css_id: learn
description: "Use open packages and open modules to allow reflective access to otherwise encapsulated packages."
---

The module system's strong encapsulation also applies to reflection, which has lost its "super power" to break into internal APIs.
Of course reflection is an important part of the Java ecosystem and so the module system has specific directives that support reflection.
It allows opening packages, which keeps them inaccessible at compile time but allows deep reflection at run time, and opening entire modules.

**Note**:
You need to know [the module system basics](id:organizing.modules.intro) to get the most out of this article.


## Why Exporting Packages Is Unsuitable for Reflection

The chief mechanism to make types accessible outside of a module is to export the package that contains them with an `exports` directive in the module declaration.
This is unsuitable for reflection for two reasons:

1. Exporting a package makes it part of a module's public API.
   This invites other modules to use the types it contains and conveys a degree of stability.
   That is often not a good fit for classes that handle HTTP requests or interact with the database.
2. A more technical problem is that even in exported packages only public members of public types are accessible.
   But frameworks that rely on reflection often access non-public types, constructors, accessors, or fields, which would still fail.

Open packages (and modules) are designed specifically to address these two points.


## Opening Packages for Reflection

A module can _open a package_ for reflection by adding the `opens` directive to the module declaration:

```java
module com.example.app {
	opens com.example.entities;
}
```

At compile time, the package is fully encapsulated as if the directive weren't there.
That means code outside of the module _com.example.app_ that uses types from the package `com.example.entities` won't compile.

At run time, on the other hand, the package's types are available for reflection.
That means reflection can freely interact with all types and members - public or not (using [`AccessibleObject.setAccessible()`](javadoc:AccessibleObject.setAccessible(boolean)) as usual for non-public members).

As you can probably tell, `opens` was designed specifically for the use case of reflection and behaves very differently from `exports`:

* allows access to all members, thus not impacting your decisions regarding visibility
* prevents compilation against code in opened packages and only allows access at run time
* communicates the intend to use the package with a reflection-based framework

In case this is necessary, a package can be exported and opened.


## Opening Modules

If you have a large module with many packages that need to be exposed to reflection, you might find it tiresome to open each of them individually.
While there is no wildcard like `opens com.example.*`, something close to it exists.
By putting the keyword `open` before `module` in the module declaration, an _open module_ is created:

```java
open module com.example.entities {
	// ...
}
```

An open module opens all packages it contains as if each of them was used individually in an `opens` directive.
Consequently, it doesn't make sense to manually open further packages, which is why `opens` directives in an open module and lead to compile errors.
