---
id: api.javaio.file_sytem.directory
title: Manipulating Files and Directories
slug: learn/java-io/file-system/move-copy-delete
slug_history:
- java-io/resources/move-copy-delete
type: tutorial-group
group: java-io.file-system
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Checking a File or Directory {checking}
- Deleting a File or Directory {deleting}
- Copying a File or Directory {copying}
- Moving a File or Directory {moving}
- Atomic Operations {atomic}
- Link Awareness {links}
description: This section shows you how to check for the existence and different elements of files and directories, and how to copy, move and delete files and directories.
last_update: 2023-01-25
---


<a id="checking">&nbsp;</a>
## Checking a File or Directory

You have a [`Path`](javadoc:Path) instance representing a file or directory, but does that file exist on the file system? Is it readable? Writable? Executable?

### Verifying the Existence of a File or Directory

The methods in the [`Path`](javadoc:Path) class are syntactic, meaning that they operate on the [`Path`](javadoc:Path) instance. But eventually you must access the file system to verify that a particular [`Path`](javadoc:Path) exists, or does not exist. You can do so with the [`exists(Path, LinkOption...)`](javadoc:Files.exists()) and the [`notExists(Path, LinkOption...)`](javadoc:Files.notExists()) methods. Note that [`!Files.exists(path)`](javadoc:Files.exists()) is not equivalent to [`Files.notExists(path)`](javadoc:Files.notExists()). When you are testing a file's existence, three results are possible:

- The file is verified to exist.
- The file is verified to not exist.
- The file's status is unknown. This result can occur when the program does not have access to the file.

If both [`exists()`](javadoc:Files.exists()) and [`notExists()`](javadoc:Files.notExists()) return `false`, the existence of the file cannot be verified.

### Checking File Accessibility

To verify that the program can access a file as needed, you can use the [`isReadable(Path)`](javadoc:Files.isReadable()), [`isWritable(Path)`](javadoc:Files.isWritable()), and [`isExecutable(Path)`](javadoc:Files.isExecutable()) methods.

The following code snippet verifies that a particular file exists and that the program has the ability to execute the file.

```java
Path file = ...;
boolean isRegularExecutableFile = Files.isRegularFile(file) &
Files.isReadable(file) & Files.isExecutable(file);
```

> Note: Once any of these methods completes, there is no guarantee that the file can be accessed. A common security flaw in many applications is to perform a check and then access the file. For more information, use your favorite search engine to look up TOCTTOU (pronounced TOCK-too).

### Checking Whether Two Paths Locate the Same File

When you have a file system that uses symbolic links, it is possible to have two different paths that locate the same file. The [`isSameFile(Path, Path)`](javadoc:Files.isSameFile()) method compares two paths to determine if they locate the same file on the file system. For example:

```java
Path p1 = ...;
Path p2 = ...;

if (Files.isSameFile(p1, p2)) {
    // Logic when the paths locate the same file
}
```


<a id="deleting">&nbsp;</a>
## Deleting a File or Directory

You can delete files, directories or links. With symbolic links, the link is deleted and not the target of the link. With directories, the directory must be empty, or the deletion fails.

The [`Files`](javadoc:Files) class provides two deletion methods.

The [`delete(Path)`](javadoc:Files.delete()) method deletes the file or throws an exception if the deletion fails. For example, if the file does not exist a [NoSuchFileException](javadoc:NoSuchFileException) is thrown. You can catch the exception to determine why the delete failed as follows:

```java
try {
    Files.delete(path);
} catch (NoSuchFileException x) {
    System.err.format("%s: no such" + " file or directory%n", path);
} catch (DirectoryNotEmptyException x) {
    System.err.format("%s not empty%n", path);
} catch (IOException x) {
    // File permission problems are caught here.
    System.err.println(x);
}
```

The [`deleteIfExists(Path)`](javadoc:Files.delete()) method also deletes the file, but if the file does not exist, no exception is thrown. Failing silently is useful when you have multiple threads deleting files and you do not want to throw an exception just because one thread did so first.


<a id="copying">&nbsp;</a>
## Copying a File or Directory

You can copy a file or directory by using the [`copy(Path, Path, CopyOption...)`](javadoc:Files.copy(Path,Path,CopyOption)) method. The copy fails if the target file exists, unless the [`REPLACE_EXISTING`](javadoc:StandardCopyOption.REPLACE_EXISTING) option is specified.

Directories can be copied. However, files inside the directory are not copied, so the new directory is empty even when the original directory contains files.

When copying a symbolic link, the target of the link is copied. If you want to copy the link itself, and not the contents of the link, specify either the [`NOFOLLOW_LINKS`](javadoc:LinkOption.NOFOLLOW_LINKS) or [`REPLACE_EXISTING`](javadoc:StandardCopyOption.REPLACE_EXISTING) option.

This method takes a varargs argument. The following [`StandardCopyOption`](javadoc:StandardCopyOption) and [`LinkOption`](javadoc:LinkOption) enums are supported:

- [`REPLACE_EXISTING`](javadoc:StandardCopyOption.REPLACE_EXISTING) – Performs the copy even when the target file already exists. If the target is a symbolic link, the link itself is copied (and not the target of the link). If the target is a non-empty directory, the copy fails with the [`DirectoryNotEmptyException`](javadoc:DirectoryNotEmptyException) exception.
- [`COPY_ATTRIBUTES`](javadoc:StandardCopyOption.COPY_ATTRIBUTES) – Copies the file attributes associated with the file to the target file. The exact file attributes supported are file system and platform dependent, but last-modified-time is supported across platforms and is copied to the target file.
- [`NOFOLLOW_LINKS`](javadoc:LinkOption.NOFOLLOW_LINKS) – Indicates that symbolic links should not be followed. If the file to be copied is a symbolic link, the link is copied (and not the target of the link).

If you are not familiar with enums, see the section Enum Types.

The following shows how to use the copy method:

```java
import static java.nio.file.StandardCopyOption.*;

Files.copy(source, target, REPLACE_EXISTING);
```

In addition to file copy, the [`Files`](javadoc:Files) class also defines methods that may be used to copy between a file and a stream. The [`copy(InputStream, Path, CopyOptions...)`](javadoc:Files.copy(Path,OutputStream)) method may be used to copy all bytes from an input stream to a file. The [`copy(Path, OutputStream)`](javadoc:Files.copy(Path,OutputStream)) method may be used to copy all bytes from a file to an output stream.


<a id="moving">&nbsp;</a>
## Moving a File or Directory

You can move a file or directory by using the [`move(Path, Path, CopyOption...)`](javadoc:Files.move(Path,Path,CopyOption)) method. The move fails if the target file exists, unless the [`REPLACE_EXISTING`](javadoc:StandardCopyOption.REPLACE_EXISTING) option is specified.

### Using Varargs

Several Files methods accept an arbitrary number of arguments when flags are specified. For example, in the following method signature, the ellipses notation after the [`CopyOption`](javadoc:CopyOption) argument indicates that the method accepts a variable number of arguments, or _varargs_, as they are typically called:

```java
Path Files.move(Path, Path, CopyOption...)
```

When a method accepts a varargs argument, you can pass it a comma-separated list of values or an array (`CopyOption[]`) of values.

In the following example, the method can be invoked as follows:

```java
Path source = ...;
Path target = ...;
Files.move(source,
           target,
           REPLACE_EXISTING,
           ATOMIC_MOVE);
```

### Moving Directories

Empty directories can be moved. If the directory is not empty, the move is allowed when the directory can be moved without moving the contents of that directory. On UNIX systems, moving a directory within the same partition generally consists of renaming the directory. In that situation, this method works even when the directory contains files.

This method takes a varargs argument – the following [`StandardCopyOption`](javadoc:StandardCopyOption) enums are supported:

- [`REPLACE_EXISTING`](javadoc:StandardCopyOption.REPLACE_EXISTING) – Performs the move even when the target file already exists. If the target is a symbolic link, the symbolic link is replaced but what it points to is not affected.
- [`ATOMIC_MOVE`](javadoc:StandardCopyOption.ATOMIC_MOVE) – Performs the move as an atomic file operation. If the file system does not support an atomic move, an exception is thrown. With an [`ATOMIC_MOVE`](javadoc:StandardCopyOption.ATOMIC_MOVE) you can move a file into a directory and be guaranteed that any process watching the directory accesses a complete file.

The following shows how to use the move method:

```java
import static java.nio.file.StandardCopyOption.*;

Files.move(source, target, REPLACE_EXISTING);
```

Though you can implement the [`move()`](javadoc:Files.move(Path,Path,CopyOption)) method on a single directory as shown, the method is most often used with the file tree recursion mechanism. For more information, see the section Walking the File Tree.



<a id="atomic">&nbsp;</a>
## Atomic Operations

Several [`Files`](javadoc:Files) methods, such as [`move()`](javadoc:Files.move(Path,Path,CopyOption)), can perform certain operations atomically in some file systems.

An atomic file operation is an operation that cannot be interrupted or "partially" performed. Either the entire operation is performed or the operation fails. This is important when you have multiple processes operating on the same area of the file system, and you need to guarantee that each process accesses a complete file.


<a id="links">&nbsp;</a>
## Link Awareness

The [`Files`](javadoc:Files) class is "link aware." Every [`Files`](javadoc:Files) method either detects what to do when a symbolic link is encountered, or it provides an option enabling you to configure the behavior when a symbolic link is encountered. For more information on the way you can handle links on a file system, you can check the [Links, Symbolics and Otherwise](id:api.javaio.file_sytem.directory.links) section.
