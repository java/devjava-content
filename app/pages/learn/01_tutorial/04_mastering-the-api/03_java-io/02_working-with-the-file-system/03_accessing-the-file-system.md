---
id: api.javaio.file_sytem.file_system
title: Accessing the File System
slug: learn/java-io/file-system/file-system
slug_history:
- java-io/resources/file-system
type: tutorial-group
group: java-io.file-system
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Default File System {default}
- File Stores {file-stores}
description: How to access file systems and file stores.
last_update: 2023-01-25
---




<a id="default">&nbsp;</a>
## Default File System

To retrieve the default file system, use the [`getDefault()`](javadoc:FileSystems.getDefault()) method of the [`FileSystems`](javadoc:FileSystems) factory class. Typically, this [`FileSystems`](javadoc:FileSystems) method (note the plural) is chained to one of the [`FileSystem`](javadoc:FileSystem) methods (note the singular), as follows:

```java
PathMatcher matcher =
    FileSystems.getDefault().getPathMatcher("glob:*.*");
```

A [`Path`](javadoc:Path) instance is always bound to a file system. If no file system is provided when a path is created, then the default file system is used.

### Path String Separator

The path separator for POSIX file systems is the forward slash, `/`, and for Microsoft Windows is the backslash, `\`. Other file systems might use other delimiters. To retrieve the [`Path`](javadoc:Path) separator for the default file system, you can use one of the following approaches:

```java
String separator = File.separator;
String separator = FileSystems.getDefault().getSeparator();
```

The [`getSeparator()`](javadoc:FileSystem.getSeparator()) method is also used to retrieve the path separator for any available file system.


<a id="file-stores">&nbsp;</a>
## File Stores

A file system has one or more file stores to hold its files and directories. The file store represents the underlying storage device. In UNIX operating systems, each mounted file system is represented by a file store. In Microsoft Windows, each volume is represented by a file store.

To retrieve a list of all the file stores for the file system, you can use the [`getFileStores()`](javadoc:FileSystem.getFileStores()) method. This method returns an [`Iterable`](javadoc:Iterable), which allows you to use the enhanced for statement to iterate over all the root directories.

```java
FileSystem fileSystem = FileSystems.getDefault();
for (FileStore store: fileSystem.getFileStores()) {
    System.out.println(store.name() + " - " + store.type());
}
```

On a Windows machine, you will get this kind of result.

```shell
Windows - NTFS
Data - NTFS
Video - NTFS
Transfer - Fat32
```

If you need to access the drive letters, you can use the following code. Remember that some drive letters may be used without the drive been mounted. The following code checks if every drive letters is readable.

```java
for (Path directory : fileSystem.getRootDirectories()) {
    boolean readable = Files.isReadable(directory);
    System.out.println("directory = " + directory + " - " + readable);
}
```

Running the previous code on Windows will give a result similar to this one.

```shell
directory = C:\ - true
directory = D:\ - true
directory = E:\ - true
directory = F:\ - false
directory = G:\ - false
```
