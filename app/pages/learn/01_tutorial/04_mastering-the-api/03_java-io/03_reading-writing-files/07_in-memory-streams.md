---
id: api.javaio.files.in_memory_io_streams
title: In Memory IO Streams
slug: learn/java-io/reading-writing/in-memory
slug_history:
- java-io/reading-writing/in-memory
type: tutorial-group
group: java-io.file-operations
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Introducing I/O Streams on In-Memory Structures {intro}
- Reading and Writing Arrays of Characters {chars}
- Reading and Writing Strings of Characters {strings}
- Reading and Writing Arrays of Bytes {bytes}
description: "Setting up character or binary streams on in-memory structures."
last_update: 2023-01-25
---


<a id="intro">&nbsp;</a>
## Introducing I/O Streams on In-Memory Structures

The JAVA I/O API also gives classes to access the content of in-memory structures, namely arrays of characters or bytes, and strings of characters. There are several use cases where this feature is very handy.

Certain file formats (this is the case for the JPEG file format) require a special field at the beginning of the file, that gives the length of certain portions or fields of the file. There are cases where it is not possible to compute these portions in advance. Think of compressed data: computing the size of set of 100 integers is easy, but computing it once it has been gzipped is much harder. With the right class, you can create this gzipped stream in an array of bytes, and simply get the number of the written bytes. This example is covered at the end of this section.


<a id="chars">&nbsp;</a>
## Reading and Writing Arrays of Characters

The [`CharArrayReader`](javadoc:CharArrayReader) and [`CharArrayWriter`](javadoc:CharArrayWriter) are both wrapping an array of `char`, specified at the construction of these classes. They are both extensions of [`Reader`](javadoc:Reader) and `Writer` (respectively), and do not add any methods to these classes.


<a id="strings">&nbsp;</a>
## Reading and Writing Strings of Characters

The [`StringReader`](javadoc:StringReader) class is also an extension of the abstract class [`Reader`](javadoc:Reader). It is built on a [`String`](javadoc:String), passed as an argument to its constructor. It does not add any method to the [`Reader`](javadoc:Reader) class.

The [`StringWriter`](javadoc:StringWriter) is a little different. It wraps an internal [`StringBuffer`](javadoc:StringBuffer) and can append characters to it. You can then get this [`StringBuffer`](javadoc:StringBuffer) by calling one of the two following methods.

1. [`getBuffer()`](javadoc:StringWriter.getBuffer()): returns the internal [`StringBuffer`](javadoc:StringBuffer). No defensive copy is made here.
2. [`toString()`](javadoc:StringWriter.toString()): returns a string of characters built by calling the [`toString()`](javadoc:StringBuffer.toString()) method of the internal [`StringBuffer`](javadoc:StringBuffer).


<a id="bytes">&nbsp;</a>
## Reading and Writing Arrays of Bytes

Two classes are available to read and write bytes in arrays: [`ByteArrayInputStream`](javadoc:ByteArrayInputStream) and [`ByteArrayOutputStream`](javadoc:ByteArrayOutputStream).

The first one allows you to read the content of a byte array as an [`InputStream`](javadoc:InputStream), provided as an argument to the constructor of this class.

The second one allows you to write bytes to a byte array. You can fix the initial size of this array, and it will grow automatically if it becomes full. Once the bytes have been written, you can get the content of this array in different ways.

1. [`size()`](javadoc:ByteArrayOutputStream.size()) gives you the number of bytes contained in this array.
2. [`toString()`](javadoc:ByteArrayOutputStream.toString()) returns the content of the array as a string of characters. This method can take a `CharSet` as an argument to decode these bytes correctly.
3. [`toBytes()`](javadoc:ByteArrayOutputStream.toBytes()) returns a copy of the internal array of this [`ByteArrayOutputStream`](javadoc:ByteArrayOutputStream).
