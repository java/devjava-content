---
id: api.javaio.file_sytem.creating_reading_directories
slug: learn/java-io/file-system/creating-reading-directories
slug_history:
- java-io/resources/creating-reading-directories
title: Creating and Reading Directories
type: tutorial-group
group: java-io.file-system
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Listing a File System Root Directories {listing-root}
- Creating a Directory {creating}
- Creating a Temporary Directory {creating-temp}
description: How to read, create and delete directory on a file system. This section covers the functionality specific to directories.
last_update: 2023-01-25
---

Some of the methods previously discussed, such as `delete()`, work on files, links and directories. But how do you list all the directories at the top of a file system? How do you list the contents of a directory or create a directory?


<a id="listing-root">&nbsp;</a>
## Listing a File System's Root Directories

You can list all the root directories for a file system by using the [`FileSystem.getRootDirectories()`](javadoc:FileSystem.getRootDirectories()) method. This method returns an [`Iterable`](javadoc:Iterable), which enables you to use the enhanced for statement to iterate over all the root directories.

The following code snippet prints the root directories for the default file system:

```java
Iterable<Path> dirs = FileSystems.getDefault().getRootDirectories();
for (Path name: dirs) {
    System.err.println(name);
}
```


<a id="creating">&nbsp;</a>
## Creating a Directory

You can create a new directory by using the [`Files.createDirectory(Path, FileAttribute)`](javadoc:Files.createDirectory(Path,FileAttribute)) method. If you don't specify any [`FileAttribute`](javadoc:FileAttribute), the new directory will have default attributes. For example:

```java
Path dir = ...;
Files.createDirectory(path);
```

The following code snippet creates a new directory on a POSIX file system that has specific permissions:

```java
Set<PosixFilePermission> perms =
    PosixFilePermissions.fromString("rwxr-x---");
FileAttribute<Set<PosixFilePermission>> attr =
    PosixFilePermissions.asFileAttribute(perms);
Files.createDirectory(file, attr);
```

To create a directory several levels deep when one or more of the parent directories might not yet exist, you can use the convenience method, [`Files.createDirectories(Path, FileAttribute)`](javadoc:Files.createDirectories(Path,FileAttribute)). As with the [`Files.createDirectory(Path, FileAttribute)`](javadoc:Files.createDirectory(Path,FileAttribute)) method, you can specify an optional set of initial file attributes. The following code snippet uses default attributes:

```java
Files.createDirectories(Paths.get("foo/bar/test"));
```

The directories are created, as needed, from the top down. In the `foo/bar/test` example, if the `foo` directory does not exist, it is created. Next, the `bar` directory is created, if needed, and, finally, the `test` directory is created.

It is possible for this method to fail after creating some, but not all, of the parent directories.


<a id="creating-temp">&nbsp;</a>
## Creating a Temporary Directory

You can create a temporary directory using one of createTempDirectory methods:

- [`createTempDirectory(Path, String, FileAttribute...)`](javadoc:Files.createTempDirectory(Path,String,FileAttribute...))
- [`createTempDirectory(String, FileAttribute...)`](javadoc:Files.createTempDirectory(Path,String,FileAttribute...))

The first method allows the code to specify a location for the temporary directory and the second method creates a new directory in the default temporary-file directory.
