---
id: api.javaio.intro
title: Understanding the Main Java I/O Concepts
slug: learn/java-io/intro
slug_history:
- java-io/introduction
type: tutorial-group
group: java-io
category: beginner
category_order: 1
layout: learn/tutorial.html
main_css_id: learn
subheader_select: tutorials
toc:
- Introducing the Java I/O API {intro}
- Understanding Java I/O, Java NIO and Java NIO2 {io-nio-nio2}
- Accessing a File {file}
- Understanding I/O Streams {io-streams}
description: "Introducing the Java I/O API: files, paths, streams of characters and streams of bytes."
last_update: 2023-01-25
---


<a id="intro">&nbsp;</a>
## Introducing the Java I/O API

The I/O in "Java I/O" stands for Input / Output. The Java I/O API gives all the tools your application needs to access information from the outside. For your application, "outside" means two elements: your disks, or more generally, your file systems (file systems do not always model disks, for instance, they may reside in memory), and your network. It turns out that you can access a third element using Java I/O and its extensions: the _off-heap_ memory.

With the Java I/O API, you can read and write files, as well as get and send data over a network using different protocols. The APIs that give you access to a database (the Java Database Connectivity API) use the Java I/O API to access databases through TCP/IP. There are many well-known APIs that are built on top of the Java I/O API.


<a id="io-nio-nio2">&nbsp;</a>
## Understanding Java I/O, Java NIO and Java NIO2

The Java I/O API was created in the mid-90s along with the first versions of the JDK.

In 2002, with Java SE 1.4, Java NIO was released, with new classes, concepts and features. NIO stands for Non-blocking Input/Output, which summarizes the main features brought by this extension. The release of Java NIO did not really change the way your application can use Java I/O. You may feel like rewriting some of your I/O code to leverage the improvements brought by Java NIO, but the Java I/O patterns remain the same.

In 2011, with Java SE 7, Java NIO2 was released, with more classes and concepts. It also brought new patterns for Java I/O. Some classes of Java NIO2 have been updated in Java SE 8, bringing even more patterns to Java I/O.

This Java I/O tutorial covers the three parts of the API: Java I/O, Java NIO, and Java NIO2.


<a id="file">&nbsp;</a>
## Accessing a File

There are two main concepts in Java I/O: locating the resource you need to access (it can be a file or a network resource), and opening a stream to this resource. In the following sections, you will see how to access files from a file system, and how the Java I/O API is organized with respect to streams.

There are two ways to access files in the Java I/O API: the first one uses the [`File`](javadoc:File) class and the second one uses the [`Path`](javadoc:Path) interface.

The [`File`](javadoc:File) class was introduced in Java SE 1.0: it represents the legacy way to access files. You can see this class as a wrapper on a string of characters representing a path on your default file system. The path can be absolute or relative and it can represent a regular file or a directory. You can check if this file exists, if you can read it  or modify it. You can also act on this file: create it, copy it, or check for its content.

Starting with Java SE 7, the [`Path`](javadoc:Path) interface was introduced, as part of the Java NIO2 API. The role of this interface is to fix several drawbacks that the [`File`](javadoc:File) class has:

- Many methods of the [`File`](javadoc:File) class do not throw exceptions when they fail, making it impossible to obtain a useful error message. For example, if you call [`file.delete()`](javadoc:File.delete()) and the deletion does not work, your program gets a `false` value. But you cannot know if it is because the file doesn't exist, the user doesn't have permissions, or there was some other problem.
- The rename method doesn't work consistently across platforms.
- There is no real support for symbolic links.
- More support for metadata is desired, such as file permissions, file owner, and other security attributes.
- Accessing file metadata is inefficient.
- Many of the [`File`](javadoc:File) methods do not scale. Requesting a large directory listing over a server can result in a hang. Large directories can also cause memory resource problems, resulting in a denial of service.
- It is not possible to write reliable code that can recursively walk a file tree and respond appropriately if there are circular symbolic links.

All these issues are fixed by the [`Path`](javadoc:Path) interface. So using the [`File`](javadoc:File) class is not recommended anymore.

This tutorial [has a section](id:api.javaio.file_sytem.resource#file-to-path) on how you can refactor your old-style [`File`](javadoc:File) code to using the [`Path`](javadoc:Path) interface.


<a id="io-streams">&nbsp;</a>
## Understanding I/O Streams

An _I/O Stream_ represents an input source or an output destination. A stream can represent many different kinds of sources and destinations, including disk files, devices, other programs, and memory arrays.

Streams support many different kinds of data, including simple bytes, primitive data types, localized characters, and objects. Some streams simply pass on data; others manipulate and transform the data in useful ways.

No matter how they work internally, all streams present the same simple model to programs that use them: a stream is a sequence of data. A program uses an input stream to read data from a source, one item at a time and an output stream to write data to a destination, one item at time.

The data source and data destination can be anything that holds, generates, or consumes data. Obviously this includes disk files, but a source or destination can also be another program, a peripheral device, a network socket, or an array.

I/O streams are a different concept than the streams from the [Stream API](id:api.stream) introduced in Java SE 8. Even if the name is the same, which may lead to confusion, the concepts are different.

The Java I/O API defines two kinds of content for a resource:

- character content, think of a text file, a XML or JSON document,
- and byte content, think of an image or a video.

It also defines two operations on this content: reading and writing.

Following this, the Java I/O API defines four base classes, that are abstract, each modeling a type of I/O stream and a specific operation.

|                      | Reading                              | Writing                                |
|----------------------|--------------------------------------|----------------------------------------|
| Streams of character | [`Reader`](javadoc:Reader)           | [`Writer`](javadoc:Writer)             |
| Streams of bytes     | [`InputStream`](javadoc:InputStream) | [`OutputStream`](javadoc:OutputStream) |

All byte streams are descended from [`InputStream`](javadoc:InputStream) and [`OutputStream`](javadoc:OutputStream), there are many of them. Some of them are covered in this tutorial.

All character stream classes are descended from [`Reader`](javadoc:Reader) and [`Writer`](javadoc:Writer).
