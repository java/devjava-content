---
id: api.modernio
title: "Common I/O Tasks in Modern Java"
type: tutorial
category: api
category_order: 2
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
toc:
  - Introduction {introduction}
  - Reading Text Files {reading-text-files}
  - Writing Text Files {writing-text-files}
  - The Files API {the-files-api}
  - Conclusion {conclusion}
last_update: 2024-04-24
last_review: 2024-08-05
description: "This article focuses on tasks that application programmers are likely to encounter, particularly in web applications, such as reading and writing text files, reading text, images, JSON from the web, and more."
author: ["CayHorstmann"]
---


<a id="introduction">&nbsp;</a>
## Introduction

This article focuses on tasks that application programmers are likely to encounter, particularly in web applications, such as: 

* Reading and writing text files
* Reading text, images, JSON from the web
* Visiting files in a directory
* Reading a ZIP file
* Creating a temporary file or directory

The Java API supports many other tasks, which are explained in detail in the [Java I/O API tutorial](id:api.javaio.overview).

This article focuses on API improvements since Java 8. In particular:

* UTF-8 is the default for I/O since Java 18 (since [UTF-8 by Default](jep:400))
* The [`java.nio.file.Files`](javadoc:Files) class, which first appeared in Java 7, added useful methods in Java 8, 11, and 12
* [`java.io.InputStream`](javadoc:InputStream) gained useful methods in Java 9, 11, and 12
* The [`java.io.File`](javadoc:File) and [`java.io.BufferedReader`](javadoc:BufferedReader) classes are now thoroughly obsolete, even though they appear frequently in web searches and AI chats.

<a id="reading-text-files">&nbsp;</a>
## Reading Text Files

You can read a text file into a string like this:

```java
String content = Files.readString(path);
```

Here, `path` is an instance of [`java.nio.Path`](javadoc:Path), obtained like this:

```java
var path = Path.of("/usr/share/dict/words");
```

Before Java 18, you were strongly encouraged to specify the character encoding with any file operations that read or write strings. Nowadays, by far the most common character encoding is UTF-8, but for backwards compatibility, Java used the "platform encoding", which can be a legacy encoding on Windows. To ensure portability, text I/O operations needed parameters [`StandardCharsets.UTF_8`](javadoc:StandardCharsets.UTF_8). This is no longer necessary.

If you want the file as a sequence of lines, call

```java
List<String> lines = Files.readAllLines(path);
```

If the file is large, process the lines lazily as a [`Stream<String>`](javadoc:Stream):

```java
try (Stream<String> lines = Files.lines(path)) {
    . . .
}
```

Also use [`Files.lines`](javadoc:Files.lines(Path)) if you can naturally process lines with stream operations (such as [`map`](javadoc:Stream.map(Function)), [`filter`](javadoc:Stream.filter(Predicate))). Note that the stream returned by [`Files.lines`](javadoc:Files.lines(Path)) needs to be closed. To ensure that this happens, use a _try-with-resources_ statement, as in the preceding code snippet.

There is no longer a good reason to use the [`readLine`](javadoc:BufferedReader.readLine()) method of [`java.io.BufferedReader`](javadoc:BufferedReader).

To split your input into something else than lines, use a [`java.util.Scanner`](javadoc:Scanner). For example, here is how you can read words, separated by non-letters:

```java
Stream<String> tokens = new Scanner(path).useDelimiter("\\PL+").tokens();
```

The [`Scanner`](javadoc:Scanner) class also has methods for reading numbers, but it is generally simpler to read the input as one string per line, or a single string, and then parse it. 

Be careful when parsing numbers from text files, since their format may be locale-dependent. For example, the input `100.000` is 100.0 in the US locale but 100000.0 in the German locale. Use [`java.text.NumberFormat`](javadoc:NumberFormat) for locale-specific parsing. Alternatively, you may be able to use [`Integer.parseInt`](javadoc:Integer.parseInt(String))/[`Double.parseDouble`](javadoc:Double.parseDouble(String)).

<a id="writing-text-files">&nbsp;</a>
## Writing Text Files

You can write a string to a text file with a single call:

```java
String content = . . .;
Files.writeString(path, content);
```

If you have a list of lines rather than a single string, use:

```java
List<String> lines = . . .;
Files.write(path, lines);
```

For more general output, use a [`PrintWriter`](javadoc:PrintWriter) if you want to use the [`printf`](javadoc:PrintWriter.printf()) method:

```java
var writer = new PrintWriter(path.toFile());
writer.printf(locale, "Hello, %s, next year you'll be %d years old!%n", name, age + 1);
```

Note that [`printf`](javadoc:PrintWriter.printf()) is locale-specific. When writing numbers, be sure to write them in the appropriate format. Instead of using [`printf`](javadoc:PrintWriter.printf()), consider [`java.text.NumberFormat`](javadoc:NumberFormat) or [`Integer.toString`](javadoc:Integer.toString())/[`Double.toString`](javadoc:Double.toString(double)).

Weirdly enough, as of Java 21, there is no [`PrintWriter`](javadoc:PrintWriter) constructor with a [`Path`](javadoc:Path) parameter.

If you don't use [`printf`](javadoc:PrintWriter.printf()), you can use the [`BufferedWriter`](javadoc:BufferedWriter) class and write strings with the [`write`](javadoc:BufferedWriter.write(int)) method. 

```java
var writer = Files.newBufferedWriter(path);
writer.write(line); // Does not write a line separator
writer.newLine(); 
```

Remember to close the `writer` when you are done.

<a id="introduction">&nbsp;</a>
## Reading From an Input Stream

Perhaps the most common reason to use a stream is to read something from a web site.

If you need to set request headers or read response headers, use the [`HttpClient`](javadoc:HttpClient):

```java
HttpClient client = HttpClient.newBuilder().build();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://horstmann.com/index.html"))
    .GET()
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
String result = response.body();
```

That is overkill if all you want is the data. Instead, use:

```java
InputStream in = new URI("https://horstmann.com/index.html").toURL().openStream();
```

Then read the data into a byte array and optionally turn them into a string:

```java
byte[] bytes = in.readAllBytes();
String result = new String(bytes);
```

Or transfer the data to an output stream:

```java
try(OutputStream out = Files.newOutputStream(path)) {
    in.transferTo(out);
}
```

Note that no loop is required if you simply want to read all bytes of an input stream. 

But do you really need an input stream? Many APIs give you the option to read from a file or URL. 

Your favorite JSON library is likely to have methods for reading from a file or URL. For example, with [Jackson jr](https://github.com/FasterXML/jackson-jr):

```java
URL url = new URI("https://dog.ceo/api/breeds/image/random").toURL();
Map<String, Object> result = JSON.std.mapFrom(url);
```

Here is how to read the dog image from the preceding call:

```java
URL url = new URI(result.get("message").toString()).toURL();
BufferedImage img = javax.imageio.ImageIO.read(url);
```

This is better than passing an input stream to the [`read`](javadoc:ImageIO.read(URL)) method, because the library can use additional information from the URL to determine the image type.

<a id="the-files-api">&nbsp;</a>
## The Files API

The [`java.nio.file.Files`](javadoc:Files) class provides a comprehensive set of file operations, such as creating, copying, moving, and deleting files and directories. The [File System Basics](id:api.javaio.file_sytem.intro) tutorial provides a thorough description. In this section, I highlight a few common tasks.

### Traversing Entries in Directories and Subdirectories

For most situations you can use one of two methods. The [`Files.list`](javadoc:Files.list(Path)) method visits all entries (files, subdirectories, symbolic links) of a directory.

```java
try (Stream<Path> entries = Files.list(pathToDirectory)) {
    . . .
}
```

Use a _try-with-resources_ statement to ensure that the stream object, which keeps track of the iteration, will be closed.

If you also want to visit the entries of descendant directories, instead use the method [`Files.walk`](javadoc:Files.walk(Path))

```java
Stream<Path> entries = Files.walk(pathToDirectory);
```

Then simply use stream methods to home in on the entries that you are interested in, and to collect the results:

```java
try (Stream<Path> entries = Files.walk(pathToDirectory)) {
    List<Path> htmlFiles = entries.filter(p -> p.toString().endsWith("html")).toList();
    . . .
}
```

Here are the other methods for traversing directory entries:

* An overloaded version of [`Files.walk`](javadoc:Files.walk(Path,depth)) lets you limit the depth of the traversed tree.
* Two [`Files.walkFileTree`](javadoc:Files.walkFileTree(Path)) methods provide more control over the iteration process, by notifying a [`FileVisitor`](javadoc:FileVisitor) when a directory is visited for the first and last time. This can be occasionally useful, in particularly for emptying and deleting a tree of directories. See the tutorial [Walking the File Tree](id:api.javaio.file_sytem.walking_tree) for details. Unless you need this control, use the simpler [`Files.walk`](javadoc:Files.walk(Path)) method.
* The [`Files.find`](javadoc:Files.find(Path)) method is just like [`Files.walk`](javadoc:Files.walk(Path)), but you provide a filter that inspects each path and its [`BasicFileAttributes`](javadoc:BasicFileAttributes). This is slightly more efficient than reading the attributes separately for each file.
* Two [`Files.newDirectoryStream(Path)`](javadoc:Files.newDirectoryStream(Path)) methods yield [`DirectoryStream`](javadoc:DirectoryStream) instances, which can be used in enhanced `for` loops. There is no advantage over using [`Files.list`](javadoc:Files.list(Path)).
* The legacy [`File.list`](javadoc:File.list()) or [`File.listFiles`](javadoc:File.listFiles()) methods return file names or [`File`](javadoc:File) objects. These are now obsolete.

### Working with ZIP Files

Ever since Java 1.1, the [`ZipInputStream`](javadoc:ZipInputStream) and [`ZipOutputStream`](javadoc:ZipOutputStream) classes provide an API for processing ZIP files. But the API is a bit clunky. Java 8 introduced a much nicer *ZIP file system*:

```java
try (FileSystem fs = FileSystems.newFileSystem(pathToZipFile)) {
    . . .
}
```

The _try-with-resources_ statement ensures that the [`close`](javadoc:AutoCloseable.close()) method is called after the ZIP file operations. That method updates the ZIP file to reflect any changes in the file system.

You can then use the methods of the [`Files`](javadoc:Files) class. Here we get a list of all files in the ZIP file:

```java
try (Stream<Path> entries = Files.walk(fs.getPath("/"))) {
    List<Path> filesInZip = entries.filter(Files::isRegularFile).toList();
}
```

To read the file contents, just use [`Files.readString`](javadoc:Files.readString(Path)) or [`Files.readAllBytes`](javadoc:Files.readAllBytes(Path)):

```java
String contents = Files.readString(fs.getPath("/LICENSE"));
```

You can remove files with [`Files.delete`](javadoc:Files.delete()). To add or replace files, simply use [`Files.writeString`](javadoc:Files.writeString()) or [`Files.write`](javadoc:Files.write()).

### Creating Temporary Files and Directories

Fairly often, I need to collect user input, produce files, and run an external process. Then I use temporary files, which are gone after the next reboot, or a temporary directory that I erase after the process has completed.

I use the two methods [`Files.createTempFile`](javadoc:Files.createTempFile(String,String,FileAttribute)) and [`Files.createTempDirectory`](javadoc:Files.createTempDirectory(Path,String,FileAttribute...)) for that. 

```java
Path filePath = Files.createTempFile("myapp", ".txt");
Path dirPath = Files.createTempDirectory("myapp");
```

This creates a temporary file or directory in a suitable location (`/tmp` in Linux) with the given prefix and, for a file, suffix.

<a id="conclusion">&nbsp;</a>
## Conclusion

Web searches and AI chats can suggest needlessly complex code for common I/O operations. There are often better alternatives:

1. You don't need a loop to read or write strings or byte arrays.
2. You may not even need a stream, reader or writer.
3. Become familiar with the [`Files`](javadoc:Files) methods for creating, copying, moving, and deleting files and directories.
4. Use [`Files.list`](javadoc:Files.list(Path)) or [`Files.walk`](javadoc:Files.walk(Path)) to traverse directory entries.
5. Use a ZIP file system for processing ZIP files.
6. Stay away from the legacy [`File`](javadoc:File) class.

