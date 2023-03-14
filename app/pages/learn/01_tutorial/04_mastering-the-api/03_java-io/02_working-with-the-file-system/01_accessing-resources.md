---
id: api.javaio.file_sytem.resource
title: Accessing Resources using Paths
slug: learn/java-io/file-system/file-path
slug_history:
- java-io/resources/file-path
type: tutorial-group
group: java-io.file-system
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Introducing the legacy File Class {file}
- Introducing the Path Interface {path}
- Refactoring your Code to Using Path {file-to-path}
description: "How to access resources using the Path interface, and how to refactor your old-style File code to using Path."
last_update: 2023-01-25
---


<a id="file">&nbsp;</a>
## Introducing the Legacy File Class

There two ways to model a file or a path on a file system in Java. The first, legacy one, is the [`File`](javadoc:File) class. This class is mentioned here, with a word of warning: you should not use it anymore in your code, unless you have very good reasons to do so. You should favor the use of the [`Path`](javadoc:Path) interface, also covered in this section. Along with the factory methods from the [`Files`](javadoc:Files), it gives you more features than the [`File`](javadoc:File) class, and better performances, especially to access larger files and directories.

That been said, because it is widely used in legacy code, understanding the [`File`](javadoc:File) may still be important to you. Without diving too deep in it, let us present the main concepts of this class.

An instance of the [`File`](javadoc:File) class can represent anything on a file system: a file, a directory, a symbolic link, a relative path, or an absolute path. This instance is an abstract notion. Creating such an instance does not create anything on your file system. You can query your file system using this class, but you need to do it explicitly.

An instance of a [`File`](javadoc:File) does not allow you to access the content of the file it represents. With this instance, you can check if this file exists or is readable (among other things).

A file is composed of several elements, separated by a separator, which depends on your file system. The first element may be a prefix, such as a disk-drive specifier, a slash for the UNIX root directory. The other elements are names.

### Creating an Instance of File

You can create an instance of the [`File`](javadoc:File) class using several constructors:

- [`File(String pathName)`](javadoc:File(String)): creates a file from the path you provide.
- [`File(String parent, String child)`](javadoc:File(String,String)): create the given file in the `parent` directory.
- [`File(File parent, String child)`](javadoc:File(File,String)): create the given file in the `parent` directory, specified as an instance of [`File`](javadoc:File).
- [`File(URI uri)`](javadoc:File(URI)): create a file from a `URI`.

### Getting the Elements of a File

The following methods give you information on the elements of this file:

- [`getName()`](javadoc:File.getName()): returns the name of the file or directory denoted by this file object. This is just the last name of the sequence.
- [`getParent()`](javadoc:File.getParent()): returns the pathname string of this abstract pathname's parent, or null if this pathname does not name a parent directory.
- [`getPath()`](javadoc:File.getPath()): returns this abstract pathname converted into a pathname string. This method is not related to the [`Path`](javadoc:Path) interface.
- [`getAbsolutePath()`](javadoc:File.getAbsolutePath()): returns the absolute pathname string of this abstract pathname. If this abstract pathname is already absolute, then the pathname string is simply returned. Otherwise this pathname is resolved in a system-dependent way.
- [`getCanonicalPath()`](javadoc:File.getCanonicalPath()): returns the canonical pathname string of this abstract pathname. The canonical pathname is absolute and unique and system-dependent. The construction of this canonical pathname typically involves removing redundant names such as `.` and `..` from the pathname, and resolving symbolic links.

### Getting Information on a File or a Directory

Some of these methods may require special rights on files or directories. As a legacy class, the [`File`](javadoc:File) does not expose all the security attributes offered by your file system.

- [`isFile()`](javadoc:File.isFile()), [`isDirectory()`](javadoc:File.isDirectory()): checks if this abstract pathname denotes an existing file or directory.
- [`exists()`](javadoc:File.exists()), [`canRead()`](javadoc:File.canRead()), [`canWrite()`](javadoc:File.canWrite()), [`canExecute()`](javadoc:File.canExecute()): checks if this file exists, is readable, if you can modify it, or if you can execute it.
- [`setReadable(boolean)`](javadoc:File.setReadable()), [`setWritable(boolean)`](javadoc:File.setReadable()), [`setExecutable(boolean)`](javadoc:File.setExecutable()): allows you to change the corresponding security attribute of the file. These methods return `true` if the operation succeeded.
- [`lastModified()`](javadoc:File.lastModified()) et [`setLastModified()`](javadoc:File.setLastModified(long)): return or set the time that this file was last modified.
- [`length()`](javadoc:File.length()): returns the length of the file denoted by this abstract pathname.
- [`isHidden()`](javadoc:File.isHidden()): tests whether the file named by this abstract pathname is a hidden file.

### Manipulating Files and Directories

Several methods allow you to create files and directories on a file system. Most of them are file system dependent. Remember that these methods are legacy methods. You can check the section [Refactoring your Code to Using Path](id:api.javaio.file_sytem.resource#file-to-path) to refactor your code to use the equivalent methods from the [`Path`](javadoc:Path) interface and the [`Files`](javadoc:Files) class.

- [`createNewFile()`](javadoc:File.createNewFile()): tries to create a new file from this pathname. This creation will fail if this file already exists. This method returns `true` if the file was successfully created, and `false` otherwise.
- [`delete()`](javadoc:File.delete()): deletes the file or directory denoted by this abstract pathname. If this pathname denotes a directory, then the directory must be empty in order to be deleted. This method returns `true` if the file was successfully deleted and `false` otherwise. You should favor the use of the [`Files.delete()`](javadoc:Files.delete()) method over this one, since it gives you more information in case the deletion fails.
- [`mkdirs()`](javadoc:File.mkdirs()) and [`mkdir()`](javadoc:File.mkdir()): create a directory named by this abstract pathname. [`mkdirs()`](javadoc:File.mkdirs()) creates all the intermediate directories if needed.
- [`renameTo(file)`](javadoc:File.renameTo()): renames the file denoted by this abstract pathname.



<a id="path">&nbsp;</a>
## Introducing the Path Interface

The [`Path`](javadoc:Path) class, introduced in the Java SE 7 release, is one of the primary entrypoint of the [`java.nio.file`](javadoc:java.nio.file) package. If your application uses file I/O, you will want to learn about the powerful features of this interface.

> Version Note: If you have pre-JDK7 code that uses [`java.io.File`](javadoc:File), you can still take advantage of the [`Path`](javadoc:Path) interface functionality by using the [`File.toPath()`](javadoc:File.toPath()) method. See the next section for more information.
> As its name implies, the [`Path`](javadoc:Path) interface is a programmatic representation of a path in the file system. A [`Path`](javadoc:Path) object contains the file name and directory list used to construct the path, and is used to examine, locate, and manipulate files.

A [`Path`](javadoc:Path) instance reflects the underlying platform. In the Solaris OS, a [`Path`](javadoc:Path) uses the Solaris syntax (`/home/joe/foo`) and in Microsoft Windows, a [`Path`](javadoc:Path) uses the Windows syntax (`C:\home\joe\foo`). A [`Path`](javadoc:Path) is not system independent. You cannot compare a [`Path`](javadoc:Path) from a Solaris file system and expect it to match a [`Path`](javadoc:Path) from a Windows file system, even if the directory structure is identical and both instances locate the same relative file.

The file or directory corresponding to the [`Path`](javadoc:Path) might not exist. You can create a [`Path`](javadoc:Path) instance and manipulate it in various ways: you can append to it, extract pieces of it, compare it to another path. At the appropriate time, you can use the methods in the [`Files`](javadoc:Files) class to check the existence of the file corresponding to the [`Path`](javadoc:Path), create the file, open it, delete it, change its permissions, and so on.


<a id="file-to-path">&nbsp;</a>
## Refactoring your Code to Using Path

Perhaps you have legacy code that uses [`java.io.File`](javadoc:File) and would like to take advantage of the [`java.nio.file.Path`](javadoc:Path) functionality with minimal impact to your code.

The [`java.io.File`](javadoc:File) class provides the [`toPath()`](javadoc:File.toPath()) method, which converts an old style [`java.io.File`](javadoc:File) instance to a [`java.nio.file.Path`](javadoc:Path) instance, as follows:

```java
Path input = file.toPath();
```

You can then take advantage of the rich feature set available to the [`Path`](javadoc:Path) interface.

For example, assume you had some code that deleted a file:

```java
file.delete();
```

You could modify this code to use the [`Files.delete()`](javadoc:Files.delete()) factory method, as follows:

```java
Path fp = file.toPath();
Files.delete(fp);
```

Conversely, the [`Path.toFile()`](javadoc:Path.toFile()) method constructs a [`java.io.File`](javadoc:File) object for a [`Path`](javadoc:Path) object.

Because the Java implementation of file I/O has been completely re-architected in the Java SE 7 release, you cannot swap one method for another method. If you want to use the rich functionality offered by the [`java.nio.file`](javadoc:java.nio.file) package, your easiest solution is to use the [`File.toPath()`](javadoc:File.toPath()) method. However, if you do not want to use that approach or it is not sufficient for your needs, you must rewrite your file I/O code.

There is no one-to-one correspondence between the two APIs, but the following table gives you a general idea of what functionality in the [`java.io.File`](javadoc:File) API maps to in the [`java.nio.file`](javadoc:java.nio.file) API and tells you where you can obtain more information.

| java.io.File Functionality | java.nio.file Functionality                                                                                                                                                                                                                                                                    | Tutorial coverage  |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| [java.io.File](javadoc:File) | [java.nio.file.Path](javadoc:Path)                                                                                                                                                                                                                                                             | The Path Interface |
| [java.io.RandomAccessFile](javadoc:RandomAccessFile)   | The [SeekableByteChannel](javadoc:SeekableByteChannel) functionality.                                                                                                                                                                                                                          | Random Access Files |
| [File.canRead()](javadoc:File.canRead()), [File.canWrite()](javadoc:File.canWrite()), [File.canExecute()](javadoc:File.canExecute()) | [Files.isReadable()](javadoc:Files.isReadable()), [Files.isWritable()](javadoc:Files.isWritable()), and [Files.isExecutable()](javadoc:Files.isExecutable()). On UNIX file systems, the Managing Metadata (File and File Store Attributes) package is used to check the nine file permissions. | Checking a File or Directory Managing Metadata |
| [File.isDirectory()](javadoc:File.isDirectory()), [File.isFile()](javadoc:File.isFile()), and [File.length()](javadoc:File.length()) | [Files.isDirectory(Path, LinkOption...)](javadoc:Files.isDirectory()), [Files.isRegularFile(Path, LinkOption...)](javadoc:Files.isRegularFile()), and [Files.size(Path)](javadoc:Files.size())                                                                                                 | Managing Metadata |
| [File.lastModified()](javadoc:File.lastModified()) and [File.setLastModified(long)](javadoc:File.setLastModified(long)) | [Files.getLastModifiedTime(Path, LinkOption...)](javadoc:Files.getLastModifiedTime()) and [Files.setLastModifiedTime(Path, FileTime)](javadoc:Files.setLastModifiedTime())                                                                                                                     | Managing Metadata |
| The [File](javadoc:File) methods that set various attributes: [setExecutable()](javadoc:File.setExecutable()), [setReadable()](javadoc:File.setReadable()), [setReadOnly()](javadoc:File.setReadOnly()), [setWritable()](javadoc:File.setWritable()) | These methods are replaced by the [Files](javadoc:Files) method [setAttribute(Path, String, Object, LinkOption...)](javadoc:Files.setAttribute(Path,String,Object,LinkOption)).                                                                                                                | Managing Metadata |
| [new File(parent, "newfile")](javadoc:File(String,String)) | [parent.resolve("newfile")](javadoc:Path.resolve())                                                                                                                                                                                                                                            | Path Operations |
| [File.renameTo()](javadoc:File.renameTo()) | [Files.move()](javadoc:Files.move(Path,Path,CopyOption))                                                                                                                                                                                                                                       | Moving a File or Directory |
| [File.delete()](javadoc:File.delete()) | [Files.delete()](javadoc:Files.delete())                                                                                                                                                                                                                                                       | Deleting a File or Directory |
| [File.createNewFile()](javadoc:File.createNewFile()) | [Files.createFile()](javadoc:Files.createFile())                                                                                                                                                                                                                                               | Creating Files |
| [File.deleteOnExit()](javadoc:File.deleteOnExit()) | Replaced by the [DELETE_ON_CLOSE](javadoc:StandardOpenOption.DELETE_ON_CLOSE) option specified in the [Files.createFile()](javadoc:Files.createFile()) method.                                                                                                                                 | Creating Files |
| [File.createTempFile()](javadoc:File.createTempFile()) | [Files.createTempFile(String, String, FileAttributes<?>)](javadoc:Files.createTempFile(String,String,FileAttribute)), [Files.createTempFile(Path, String, FileAttributes<?>)](javadoc:Files.createTempFile(Path,String,String,FileAttribute))                                                  | Creating Files, Creating and Writing a File by Using Stream I/O, Reading and Writing Files by Using Channel I/O |
| [File.exists()](javadoc:File.exists()) | [Files.exists()](javadoc:Files.exists()) and [Files.notExists()](javadoc:Files.notExists())                                                                                                                                                                                                    | Verifying the Existence of a File or Directory |
| [File.compareTo()](javadoc:File.compareTo()) and [File.equals()](javadoc:File.equals()) | [Path.compareTo()](javadoc:Path.compareTo()) and [Path.equals()](javadoc:Path.equals())                                                                                                                                                                                                        | Comparing Two Paths |
| [File.getAbsolutePath()](javadoc:File.getAbsolutePath()) and [File.getAbsoluteFile()](javadoc:File.getAbsoluteFile()) | [Path.toAbsolutePath()](javadoc:Path.toAbsolutePath())                                                                                                                                                                                                                                         | Converting a Path, Removing Redundancies From a Path (normalize) |
| [File.getCanonicalPath()](javadoc:File.getCanonicalPath()) and [File.getCanonicalFile()](javadoc:File.getCanonicalFile()) | [Path.toRealPath()](javadoc:Path.toRealPath()) or [Path.normalize()](javadoc:Path.normalize())                                                                                                                                                                                                 | Converting a Path (toRealPath)
| [File.toURI()](javadoc:File.toURI()) | [Path.toUri()](javadoc:Path.toUri())                                                                                                                                                                                                                                                           | Converting a Path |
| [File.isHidden()](javadoc:File.isHidden()) | [Files.isHidden()](javadoc:Files.isHidden())                                                                                                                                                                                                                                                   | Retrieving Information About the Path |
| [File.list()](javadoc:File.list()) and listFiles | [Files.newDirectoryStream()](javadoc:Files.newDirectoryStream(Path))                                                                                                                                                                                                                           | Listing a Directory's Contents |
| [File.mkdir()](javadoc:File.mkdir()) and mkdirs | [Files.createDirectory(Path,FileAttribute)](javadoc:Files.createDirectory(Path,FileAttribute))                                                                                                                                                                                                 | Creating a Directory |
| [File.listRoots()](javadoc:File.listRoots()) | [FileSystem.getRootDirectories()](javadoc:FileSystem.getRootDirectories())                                                                                                                                                                                                                     | Listing a File System's Root Directories |
| [File.getTotalSpace()](javadoc:File.getTotalSpace()), [File.getFreeSpace()](javadoc:File.getFreeSpace()), [File.getUsableSpace()](javadoc:File.getUsableSpace()) | [FileStore.getTotalSpace()](javadoc:FileStore.getTotalSpace()), [FileStore.getUnallocatedSpace()](javadoc:FileStore.getUnallocatedSpace()), [FileStore.getUsableSpace()](javadoc:FileStore.getUsableSpace()), [FileStore.getTotalSpace()](javadoc:FileStore.getTotalSpace())                   | File Store Attributes |
