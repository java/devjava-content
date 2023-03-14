---
id: api.javaio.file_sytem.listing_directory_content
title: Listing the Content of a Directory
slug: learn/java-io/file-system/listing
slug_history:
- java-io/resources/listing
type: tutorial-group
group: java-io.file-system
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Listing a the Content of a Directory {listing-content}
- Filtering a Directory Listing By Using Globbing {globbing}
- Writing Your Own Directory Filter {dir-filter}
- What is a Glob {glob}
description: How to efficiently list and filter the content of a directory on a file system.
last_update: 2023-01-25
---


<a id="listing-content">&nbsp;</a>
## Listing a the Content of a Directory

You can list all the contents of a directory by using the [`newDirectoryStream(Path)`](javadoc:Files.createTempDirectory(String,FileAttribute...)) method. This method returns an object that implements the [`DirectoryStream`](javadoc:DirectoryStream) interface. The class that implements the [`DirectoryStream`](javadoc:DirectoryStream) interface also implements [`Iterable`](javadoc:Iterable), so you can iterate through the directory stream, reading all of the objects. This approach scales well to very large directories.

> Remember: The returned [`DirectoryStream`](javadoc:DirectoryStream) is a stream. If you are not using a try-with-resources statement, do not forget to close the stream in the finally block. The try-with-resources statement takes care of this for you. You can learn more about stream in the [Stream section](id:api.stream).

The following code snippet shows how to print the contents of a directory:

```java
Path dir = ...;
try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
    for (Path file: stream) {
        System.out.println(file.getFileName());
    }
} catch (IOException | DirectoryIteratorException x) {
    // IOException can never be thrown by the iteration.
    // In this snippet, it can only be thrown by newDirectoryStream.
    System.err.println(x);
}
```

The [`Path`](javadoc:Path) objects returned by the iterator are the names of the entries resolved against the directory. So, if you are listing the contents of the `/tmp` directory, the entries are returned with the form `/tmp/a`, `/tmp/b`, and so on.

This method returns the entire contents of a directory: files, links, subdirectories, and hidden files. If you want to be more selective about the contents that are retrieved, you can use one of the other [`newDirectoryStream()`](javadoc:Files.newDirectoryStream(Path)) methods, as described later in this page.

Note that if there is an exception during directory iteration then [`DirectoryIteratorException`](javadoc:DirectoryIteratorException) is thrown with the [`IOException`](javadoc:IOException) as the cause. [`Iterator`](javadoc:Iterator) methods cannot throw exceptions.


<a id="globbing">&nbsp;</a>
## Filtering a Directory Listing By Using Globbing

If you want to fetch only files and subdirectories where each name matches a particular pattern, you can do so by using the [`newDirectoryStream(Path, String)`](javadoc:Files.newDirectoryStream(Path,String)) method, which provides a built-in glob filter. If you are not familiar with glob syntax, see the [What Is a Glob](id:api.javaio.file_sytem.listing_directory_content#glob) section, at the end of this page.

For example, the following code snippet lists files relating to Java: _.class_, _.java_, and _.jar_ files.:

```java
Path dir = ...;
try (DirectoryStream<Path> stream =
     Files.newDirectoryStream(dir, "*.{java,class,jar}")) {
    for (Path entry: stream) {
        System.out.println(entry.getFileName());
    }
} catch (IOException x) {
    // IOException can never be thrown by the iteration.
    // In this snippet, it can // only be thrown by newDirectoryStream.
    System.err.println(x);
}
```


<a id="dir-filter">&nbsp;</a>
## Writing Your Own Directory Filter

Perhaps you want to filter the contents of a directory based on some condition other than pattern matching. You can create your own filter by implementing the [`DirectoryStream.Filter`](javadoc:DirectoryStream.Filter) interface. This interface consists of one method, [`accept()`](javadoc:DirectoryStream.Filter.accept()), which determines whether a file fulfills the search requirement.

For example, the following code snippet implements a filter that retrieves only directories:

```java
DirectoryStream.Filter<Path> filter =
    newDirectoryStream.Filter<Path>() {
    public boolean accept(Path file) throws IOException {
        try {
            return (Files.isDirectory(path));
        } catch (IOException x) {
            // Failed to determine if it's a directory.
            System.err.println(x);
            return false;
        }
    }
};
```

Once the filter has been created, it can be invoked by using the [`newDirectoryStream(Path, DirectoryStream.Filter)`](javadoc:Files.newDirectoryStream(Path,DirectoryStream.Filter)) method. The following code snippet uses the `isDirectory()` filter to print only the directory's subdirectories to standard output:

```java
Path dir = ...;
try (DirectoryStream<Path>
                       stream = Files.newDirectoryStream(dir, filter)) {
    for (Path entry: stream) {
        System.out.println(entry.getFileName());
    }
} catch (IOException x) {
    System.err.println(x);
}
```

This method is used to filter a single directory only. However, if you want to find all the subdirectories in a file tree, you would use the mechanism for [Walking the File Tree]().



<a id="glob">&nbsp;</a>
## What is a Glob

You can use glob syntax to specify pattern-matching behavior.

A glob pattern is specified as a string and is matched against other strings, such as directory or file names. Glob syntax follows several simple rules:

- An asterisk, `*`, matches any number of characters (including none).
- Two asterisks, `**`, works like `*` but crosses directory boundaries. This syntax is generally used for matching complete paths.
- A question mark, `?`, matches exactly one character.
- Braces specify a collection of subpatterns. For example:
    - `{sun,moon,stars}` matches "sun", "moon", or "stars".
    - `{temp*,tmp*}` matches all strings beginning with "temp" or "tmp".
- Square brackets convey a set of single characters or, when the hyphen character (`-`) is used, a range of characters. For example:
    - `[aeiou]` matches any lowercase vowel.
    - `[0-9]` matches any digit.
    - `[A-Z]` matches any uppercase letter.
    - `[a-z,A-Z]` matches any uppercase or lowercase letter.
      Within the square brackets, `*`, `?`, and `\` match themselves.
- All other characters match themselves.
- To match *, ?, or the other special characters, you can escape them by using the backslash character, \. For example: \\ matches a single backslash, and \? matches the question mark.

Here are some examples of glob syntax:

- `*.html` – Matches all strings that end in .html
- `???` – Matches all strings with exactly three letters or digits
- `*[0-9]*` – Matches all strings containing a numeric value
- `*.{htm,html,pdf}` – Matches any string ending with .htm, .html or .pdf
- `a?*.java` – Matches any string beginning with a, followed by at least one letter or digit, and ending with .java
- `{foo*,*[0-9]*}` – Matches any string beginning with foo or any string containing a numeric value

> Note: If you are typing the glob pattern at the keyboard and it contains one of the special characters, you must put the pattern in quotes (`"*"`), use the backslash (`\*`), or use whatever escape mechanism is supported at the command line.

The glob syntax is powerful and easy to use. However, if it is not sufficient for your needs, you can also use a regular expression. For more information, see the section on Regular Expressions.

For more information about the glob syntax, see the API specification for the [`getPathMatcher(String)`](javadoc:FileSystem.getPathMatcher(String)) method in the [`FileSystem`](javadoc:FileSystem) class.
