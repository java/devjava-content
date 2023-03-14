---
id: jvm.gc.intro
title: Introduction to Garbage Collection
slug: learn/jvm/tool/garbage-collection/intro
slug_history:
- gc/intro
type: tutorial-group
group: gc-overview
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Memory Management {memory-management}
- Memory Management in Java {memory-management-in-java}
---

<a id="memory-management">&nbsp;</a>
## Memory Managment

Memory management is a central aspect in software development. Applications regularly create new objects, and objects regularly go out of scope and are no longer capable of being referenced. Let's take a look at what this means with a code snippet: 

```java
class HelloWorld{
	String message;
	printHelloMessage(String name){
		message = "Hello " + name;//New String instance "message" created
		print(message);
	} //reference to message is lost once scope leaves method
}
```


In the above example, `message` is assigned a reference value, a "hello" message, at the start of `printHelloMessage()` . Once the scope leaves `printHelloMessage()`, the reference value assigned to `message` is no longer reachable but still exists in memory. Every time `printHelloMessage()` is executed, a new reference value is assigned to `message` and allocated memory. If a process does not exist to remove these references from memory, eventually, the application might run out of memory, as dead references consume all available memory. 

In languages like C and C++, removing a reference would be handled manually (e.x. by calling `free` or `delete`). This removes the reference from memory, allowing the memory to be reclaimed by the system for reuse.  

Manual memory management does have some advantages. Developers have precise control over when an object is removed. Manual memory management might also be more efficient as no background process is running, consuming system resources and monitoring memory usage. Though this advantage is less significant as modern automated memory systems have improved in performance.

However, manual memory management comes with some significant downsides. With manual memory management, developers must consciously know how an application uses memory. This can be time-consuming and difficult, requiring developers to add control code for the safe allocation and deallocation of objects from memory. This control code could be distracting as it obscures the business meaningful work the code is attempting to accomplish. A developer might also fail to properly handle error conditions, resulting in objects not being deleted, leading to a memory leak. 

The considerable effort involved in manual memory management and computers rapidly becoming more powerful saw a transition to automated memory management. Today most modern programming languages, including Java, handle memory management automatically with a garbage collector.

<a id="memory-management-in-java">&nbsp;</a>
## Memory Management in Java

Within Java, memory management is handled by a garbage collector, which is part of the Java Virtual Machine (JVM). Within the JVM a garbage collector is a background process that monitors objects in memory. Periodically the garbage collector will run a garbage collection that checks if objects in memory are still reachable, remove objects that are not reachable, and reorganize the objects that are still alive to make more efficient usage of memory and improve future garbage collections. 

Garbage collectors considerably reduce the amount of time and effort developers must spend managing memory. Often developers do not need to consciously consider memory management. Garbage collection also helps to vastly reduce, though not eliminate, issues like memory leaks.

In the next section, we will take a deeper look at how garbage collectors behave in Java.
