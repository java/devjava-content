---
id: organizing.modules.implreadability
title: Implied Readability with `requires transitive`
slug: learn/modules/implied-readability
slug_history:
- learn/optional-dependencies-with-requires-static
group: modules
type: tutorial-group
layout: learn/tutorial-group.html
main_css_id: learn
description: "Use `requires transitive` to imply readability, where a module passes its dependency on another module on, allowing a other modules to read it without explicitly depending on it."
---

The module system has strict rules for accessing code in other modules and one of them is that the accessing module must _read_ the accessed one.
The most common way to establish readability is for one module to require another, but it's not the only one.
If a module uses types from another module in its own API, every outsider using the first module would be forced to also require the second.
Unless the first module uses `requires transitive` for the second one, which implies readability of the second module for any module that reads the first.
That's a bit confusing, but you'll get it in a few minutes.

**Note**:
You need to know [the module system basics](id:organizing.modules.intro) to get the most out of this article.


## Implied Readability

In the common case, a module uses a dependency internally without the outside world having any knowledge of it.
Take, for example, [`java.prefs`](javadoc:java.prefs), which `requires` [`java.xml`](javadoc:java.xml):
It needs the XML parsing capabilities, but its own API neither accepts nor returns types from _java.xml_'s packages.

But there is another use case where the dependency is not entirely internal, but lives on the boundary between modules.
In that scenario, one module depends on another, and exposes types from the depended-upon module in its own public API.
A good example is [`java.sql`](javadoc:java.sql).
It also uses _java.xml_ but unlike _java.prefs_ not just internally - the public class `java.sql.SQLXML` maps the SQL XML type and as such uses types from _java.xml_ its own API.
Similarly, _java.sql_'s [`Driver`](javadoc:Driver) has a method [`getParentLogger()`](javadoc:Driver.getParentLogger()) that returns a `Logger`, which is a type from the _java.logging_ module.

In such situations, code that wants to call the module (e.g. _java.sql_) might have to use types from the depended-upon module (e.g. _java.xml_, _java.logging_).
But it can't do that if it does not also read the depended-upon module.
Hence for the module to be at all usable, clients would all have to explicitly depend on that second module as well.
Identifying and manually resolving such hidden dependencies would be a tedious and error-prone task.

This is where _implied readability_ comes in.
It extends module declarations so that one module can grant readability of modules upon which it depends to any module that depends upon it.
Such implied readability is expressed by including the `transitive` modifier in a requires clause.

That's why _java.sql_'s module declaration looks as follows:

```java
module java.sql {
    requires transitive java.logging;
    requires transitive java.transaction.xa;
    requires transitive java.xml;

    exports java.sql;
    exports javax.sql;

    uses java.sql.Driver;
}
```

That means any module that reads _java.sql_ (usually by requiring it) will automatically also read _java.logging_, _java.transaction.xa_, and _java.xml_.


## When to Rely on Implied Readability

Original explainers of the module system include a clear recommendation when to use implied readability:

> In general, if one module exports a package containing a type whose signature refers to a package in a second module then the declaration of the first module should include a `requires transitive` dependence upon the second.
> This will ensure that other modules that depend upon the first module will automatically be able to read the second module and, hence, access all the types in that module's exported packages.

But how far should you take this?
Looking back on the example of _java.sql_, should a module using it require _java.logging_ as well?
Technically such a declaration is not needed and might seem redundant.

To answer this question we have to look at how exactly the fictitious module uses _java.logging_.
It might only need to read it so you are able to call `Driver.getParentLogger()`, for example to change the logger's log level, and nothing more.
In this case your code's interaction with _java.logging_ happens in the immediate vicinity of its interaction with `Driver` from _java.sql_.
Above we called this the boundary between two modules.

Alternatively your module might actually use logging throughout its own code.
Then, types from _java.logging_ appear in many places independent of `Driver` and can no longer be considered to be limited to the boundary of your module and _java.sql_.

It is recommended to only rely on implied readability of a module (e.g. _java.logging_) if its types are only used on the boundary to the module that `requires transitive` it (e.g. _java.sql_).
Otherwise, even while not strictly needed, it should be explicitly required.
This approach clarifies the system's structure and also future-proofs the module declaration for various refactorings.
