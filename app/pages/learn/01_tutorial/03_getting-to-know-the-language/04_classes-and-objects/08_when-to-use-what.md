---
id: lang.classes.patterns
title: When to Use Nested Classes, Local Classes, Anonymous Classes, and Lambda Expressions
slug: learn/classes-objects/design-best-practices
slug_history:
- learn/when-to-use-nested-classes-local-classes-anonymous-classes-and-lambda-expressions
type: tutorial-group
group: classes-and-objects
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Choosing Between Nested Classes, Local Classes, Anonymous Classes, and Lambda Expressions {choosing}
description: "When to Use Nested Classes, Local Classes, Anonymous Classes, and Lambda Expressions
."
---


<a id="choosing">&nbsp;</a>
## Choosing Between Nested Classes, Local Classes, Anonymous Classes, and Lambda Expressions

As mentioned in the section Nested Classes, nested classes enable you to logically group classes that are only used in one place, increase the use of encapsulation, and create more readable and maintainable code. Local classes, anonymous classes, and lambda expressions also impart these advantages; however, they are intended to be used for more specific situations:

1. Local class: Use it if you need to create more than one instance of a class, access its constructor, or introduce a new, named type (because, for example, you need to invoke additional methods later).
2. Anonymous class: Use it if you need to declare fields or additional methods.
3. Lambda expression:
- Use it if you are encapsulating a single unit of behavior that you want to pass to other code. For example, you would use a lambda expression if you want a certain action performed on each element of a collection, when a process is completed, or when a process encounters an error.
- Use it if you need a simple instance of a functional interface and none of the preceding criteria apply (for example, you do not need a constructor, a named type, fields, or additional methods).
4. Nested class: Use it if your requirements are similar to those of a local class, you want to make the type more widely available, and you don't require access to local variables or method parameters.
5. Use a non-static nested class (or inner class) if you require access to an enclosing instance's non-public fields and methods. Use a static nested class if you don't require this access.

