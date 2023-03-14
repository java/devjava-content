---
id: lang.exception.catching_handling
title: Catching and Handling Exceptions
slug: learn/exceptions/catching-handling
slug_history:
- learn/catching-and-handling-exceptions
type: tutorial-group
group: exceptions
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Catching and Handling Exceptions {intro}
- The Try Block {try-block}
- The Catch Blocks {catch-block}
- Multi-Catching Exceptions {multi-catching}
- The Finally Block {finally}
- The Try-with-resources Statement {try-with-resources}
- Suppressed Exceptions {suppressed}
- Classes That Implement the AutoCloseable or Closeable Interface {autocloseable}
- Putting It All Together {wrapping-up}
description: "How to use try, catch and finally."
---


<a id="intro">&nbsp;</a>
## Catching and Handling Exceptions

This section describes how to use the three exception handler components — the `try`, `catch`, and `finally` blocks — to write an exception handler. Then, the try-with-resources statement, introduced in Java SE 7, is explained. The try-with-resources statement is particularly suited to situations that use [`Closeable`](javadoc:Closeable) resources, such as streams.

The last part of this section walks through an example and analyzes what occurs during various scenarios.

The following example defines and implements a class named `ListOfNumbers`. When constructed, `ListOfNumbers` creates an [`ArrayList`](javadoc:ArrayList) that contains 10 [`Integer`](javadoc:Integer) elements with sequential values 0 through 9. The `ListOfNumbers` class also defines a method named `writeList()`, which writes the list of numbers into a text file called `OutFile.txt`. This example uses output classes defined in [`java.io`](javadoc:java.io), which are covered in the Basic I/O section.

```java
// Note: This class will not compile yet.
import java.io.*;
import java.util.List;
import java.util.ArrayList;

public class ListOfNumbers {

    private List<Integer> list;
    private static final int SIZE = 10;

    public ListOfNumbers () {
        list = new ArrayList<>(SIZE);
        for (int i = 0; i < SIZE; i++) {
            list.add(i);
        }
    }

    public void writeList() {
	// The FileWriter constructor throws IOException, which must be caught.
        PrintWriter out = new PrintWriter(new FileWriter("OutFile.txt"));

        for (int i = 0; i < SIZE; i++) {
            // The get(int) method throws IndexOutOfBoundsException, which must be caught.
            out.println("Value at: " + i + " = " + list.get(i));
        }
        out.close();
    }
}
```

The first line in boldface is a call to a constructor. The constructor initializes an output stream on a file. If the file cannot be opened, the constructor throws an [`IOException`](javadoc:IOException). The second boldface line is a call to the [`ArrayList`](javadoc:ArrayList) class's get method, which throws an [`IndexOutOfBoundsException`](javadoc:IndexOutOfBoundsException) if the value of its argument is too small (less than 0) or too large (more than the number of elements currently contained by the [`ArrayList`](javadoc:ArrayList).

If you try to compile the `ListOfNumbers` class, the compiler prints an error message about the exception thrown by the [`FileWriter`](javadoc:FilterWriter) constructor. However, it does not display an error message about the exception thrown by `get()`. The reason is that the exception thrown by the constructor, [`IOException`](javadoc:IOException), is a checked exception, and the one thrown by the `get()` method, [`IndexOutOfBoundsException`](javadoc:IndexOutOfBoundsException), is an unchecked exception.

Now that you're familiar with the `ListOfNumbers` class and where the exceptions can be thrown within it, you're ready to write exception handlers to catch and handle those exceptions.


<a id="try-block">&nbsp;</a>
## The Try Block

The first step in constructing an exception handler is to enclose the code that might throw an exception within a `try` block. In general, a `try` block looks like the following:

```java
try {
    code
}
catch and finally blocks . . .
```

The segment in the example labeled code contains one or more legal lines of code that could throw an exception. (The `catch` and `finally` blocks are explained in the next two subsections.)

To construct an exception handler for the `writeList()` method from the `ListOfNumbers` class, enclose the exception-throwing statements of the `writeList()` method within a `try` block. There is more than one way to do this. You can put each line of code that might throw an exception within its own try block and provide separate exception handlers for each. Or, you can put all the `writeList()` code within a single `try` block and associate multiple handlers with it. The following listing uses one `try` block for the entire method because the code in question is very short.

```java
private List<Integer> list;
private static final int SIZE = 10;

public void writeList() {
    PrintWriter out = null;
    try {
        System.out.println("Entered try statement");
        out = new PrintWriter(new FileWriter("OutFile.txt"));
        for (int i = 0; i < SIZE; i++) {
            out.println("Value at: " + i + " = " + list.get(i));
        }
    }
    catch and finally blocks  . . .
}
```

If an exception occurs within the `try` block, that exception is handled by an exception handler associated with it. To associate an exception handler with a `try` block, you must put a `catch` block after it; the next section, The catch Blocks, shows you how.


<a id="catch-block">&nbsp;</a>
## The Catch Blocks

You associate exception handlers with a `try` block by providing one or more catch blocks directly after the `try` block. No code can be between the end of the `try` block and the beginning of the first `catch` block.

```java
try {

} catch (ExceptionType name) {

} catch (ExceptionType name) {

}
```

Each `catch` block is an exception handler that handles the type of exception indicated by its argument. The argument type, `ExceptionType`, declares the type of exception that the handler can handle and must be the name of a class that inherits from the [`Throwable`](javadoc:Throwable) class. The handler can refer to the exception with name.

The `catch` block contains code that is executed if and when the exception handler is invoked. The runtime system invokes the exception handler when the handler is the first one in the call stack whose `ExceptionType` matches the type of the exception thrown. The system considers it a match if the thrown object can legally be assigned to the exception handler's argument.

The following are two exception handlers for the `writeList()` method:

```java
try {

} catch (IndexOutOfBoundsException e) {
    System.err.println("IndexOutOfBoundsException: " + e.getMessage());
} catch (IOException e) {
    System.err.println("Caught IOException: " + e.getMessage());
}
```

Exception handlers can do more than just print error messages or halt the program. They can do error recovery, prompt the user to make a decision, or propagate the error up to a higher-level handler using chained exceptions, as described in the Chained Exceptions section.


<a id="multi-catching">&nbsp;</a>
## Multi-Catching Exceptions

You can catch more than one type of exception with one exception handler, with the multi-catch pattern.

In Java SE 7 and later, a single `catch` block can handle more than one type of exception. This feature can reduce code duplication and lessen the temptation to catch an overly broad exception.

In the `catch` clause, specify the types of exceptions that block can handle, and separate each exception type with a vertical bar (`|`):

```java
catch (IOException|SQLException ex) {
    logger.log(ex);
    throw ex;
}
```

Note: If a catch block handles more than one exception type, then the `catch` parameter is implicitly `final`. In this example, the `catch` parameter `ex` is `final` and therefore you cannot assign any values to it within the `catch` block.


<a id="finally">&nbsp;</a>
## The Finally Block

The finally block always executes when the `try` block exits. This ensures that the `finally` block is executed even if an unexpected exception occurs. But `finally` is useful for more than just exception handling — it allows the programmer to avoid having cleanup code accidentally bypassed by a `return`, `continue`, or `break`. Putting cleanup code in a `finally` block is always a good practice, even when no exceptions are anticipated.

> Note: If the JVM exits while the `try` or `catch` code is being executed, then the `finally` block may not execute.

The `try` block of the `writeList()` method that you've been working with here opens a [`PrintWriter`](javadoc:PrintWriter). The program should close that stream before exiting the `writeList()` method. This poses a somewhat complicated problem because `writeList()`'s `try` block can exit in one of three ways.

1. The new [`FileWriter`](javadoc:FilterWriter) statement fails and throws an [`IOException`](javadoc:IOException).
2. The [`list.get(i)`](javadoc:List.get(int)) statement fails and throws an [`IndexOutOfBoundsException`](javadoc:IndexOutOfBoundsException).
3. Everything succeeds and the `try` block exits normally.

The runtime system always executes the statements within the `finally` block regardless of what happens within the `try` block. So it's the perfect place to perform cleanup.

The following `finally` block for the `writeList()` method cleans up and then closes the [`PrintWriter`](javadoc:PrintWriter).

```java
finally {
    if (out != null) {
        System.out.println("Closing PrintWriter");
        out.close();
    } else {
        System.out.println("PrintWriter not open");
    }
}
```

> Important: The `finally` block is a key tool for preventing resource leaks. When closing a file or otherwise recovering resources, place the code in a `finally` block to ensure that resource is always recovered.
>
> Consider using the try-with-resources statement in these situations, which automatically releases system resources when no longer needed. The try-with-resources Statement section has more information.


<a id="try-with-resources">&nbsp;</a>
## The Try-with-resources Statement

The try-with-resources statement is a `try` statement that declares one or more resources. A resource is an object that must be closed after the program is finished with it. The try-with-resources statement ensures that each resource is closed at the end of the statement. Any object that implements [`java.lang.AutoCloseable`](javadoc:AutoCloseable), which includes all objects which implement [`java.io.Closeable`](javadoc:Closeable), can be used as a resource.

The following example reads the first line from a file. It uses an instance of [`BufferedReader`](javadoc:BufferedReader) to read data from the file. [`BufferedReader`](javadoc:BufferedReader) is a resource that must be closed after the program is finished with it:

```java
static String readFirstLineFromFile(String path) throws IOException {
    try (BufferedReader br =
                   new BufferedReader(new FileReader(path))) {
        return br.readLine();
    }
}
```

In this example, the resource declared in the try-with-resources statement is a [`BufferedReader`](javadoc:BufferedReader). The declaration statement appears within parentheses immediately after the `try` keyword. The class [`BufferedReader`](javadoc:BufferedReader), in Java SE 7 and later, implements the interface [`java.lang.AutoCloseable`](javadoc:AutoCloseable). Because the [`BufferedReader`](javadoc:BufferedReader) instance is declared in a try-with-resource statement, it will be closed regardless of whether the `try` statement completes normally or abruptly (as a result of the method [`BufferedReader.readLine()`](javadoc:BufferedReader.readLine()) throwing an [`IOException`](javadoc:IOException).

Prior to Java SE 7, you can use a `finally` block to ensure that a resource is closed regardless of whether the `try` statement completes normally or abruptly. The following example uses a `finally` block instead of a try-with-resources statement:

```java
static String readFirstLineFromFileWithFinallyBlock(String path)
                                                     throws IOException {
    BufferedReader br = new BufferedReader(new FileReader(path));
    try {
        return br.readLine();
    } finally {
        br.close();
    }
}
```

However, in this example, if the methods [`readLine()`](javadoc:BufferedReader.readLine()) and close both throw exceptions, then the method `readFirstLineFromFileWithFinallyBlock()` throws the exception thrown from the `finally` block; the exception thrown from the `try` block is suppressed. In contrast, in the example `readFirstLineFromFile()`, if exceptions are thrown from both the `try` block and the try-with-resources statement, then the method `readFirstLineFromFile()` throws the exception thrown from the `try` block; the exception thrown from the try-with-resources block is suppressed. In Java SE 7 and later, you can retrieve suppressed exceptions; see the section Suppressed Exceptions for more information.

You may declare one or more resources in a try-with-resources statement. The following example retrieves the names of the files packaged in the zip file `zipFileName` and creates a text file that contains the names of these files:

```java
public static void writeToFileZipFileContents(String zipFileName,
                                           String outputFileName)
                                           throws java.io.IOException {

    java.nio.charset.Charset charset =
         java.nio.charset.StandardCharsets.US_ASCII;
    java.nio.file.Path outputFilePath =
         java.nio.file.Paths.get(outputFileName);

    // Open zip file and create output file with
    // try-with-resources statement

    try (
        java.util.zip.ZipFile zf =
             new java.util.zip.ZipFile(zipFileName);
        java.io.BufferedWriter writer =
            java.nio.file.Files.newBufferedWriter(outputFilePath, charset)
    ) {
        // Enumerate each entry
        for (java.util.Enumeration entries =
                                zf.entries(); entries.hasMoreElements();) {
            // Get the entry name and write it to the output file
            String newLine = System.getProperty("line.separator");
            String zipEntryName =
                 ((java.util.zip.ZipEntry)entries.nextElement()).getName() +
                 newLine;
            writer.write(zipEntryName, 0, zipEntryName.length());
        }
    }
}
```

In this example, the try-with-resources statement contains two declarations that are separated by a semicolon: [`ZipFile`](javadoc:ZipFile) and [`BufferedWriter`](javadoc:BufferedWriter). When the block of code that directly follows it terminates, either normally or because of an exception, the [`close()`](javadoc:BufferedWriter.close()) methods of the [`BufferedWriter`](javadoc:BufferedWriter) and [`ZipFile`](javadoc:ZipFile) objects are automatically called in this order. Note that the close methods of resources are called in the opposite order of their creation.

The following example uses a try-with-resources statement to automatically close a [`java.sql.Statement`](javadoc:Statement) object:

```java
public static void viewTable(Connection con) throws SQLException {

    String query = "select COF_NAME, SUP_ID, PRICE, SALES, TOTAL from COFFEES";

    try (Statement stmt = con.createStatement()) {
        ResultSet rs = stmt.executeQuery(query);

        while (rs.next()) {
            String coffeeName = rs.getString("COF_NAME");
            int supplierID = rs.getInt("SUP_ID");
            float price = rs.getFloat("PRICE");
            int sales = rs.getInt("SALES");
            int total = rs.getInt("TOTAL");

            System.out.println(coffeeName + ", " + supplierID + ", " +
                               price + ", " + sales + ", " + total);
        }
    } catch (SQLException e) {
        JDBCTutorialUtilities.printSQLException(e);
    }
}
```

The resource [`java.sql.Statement`](javadoc:Statement) used in this example is part of the JDBC 4.1 and later API.

Note: A try-with-resources statement can have `catch` and `finally` blocks just like an ordinary `try` statement. In a try-with-resources statement, any `catch` or `finally` block is run after the resources declared have been closed.


<a id="suppressed">&nbsp;</a>
## Suppressed Exceptions

An exception can be thrown from the block of code associated with the try-with-resources statement. In the example `writeToFileZipFileContents()`, an exception can be thrown from the `try` block, and up to two exceptions can be thrown from the try-with-resources statement when it tries to close the [`ZipFile`](javadoc:ZipFile) and [`BufferedWriter`](javadoc:BufferedWriter) objects. If an exception is thrown from the `try` block and one or more exceptions are thrown from the try-with-resources statement, then those exceptions thrown from the try-with-resources statement are suppressed, and the exception thrown by the block is the one that is thrown by the `writeToFileZipFileContents()` method. You can retrieve these suppressed exceptions by calling the [`Throwable.getSuppressed()`](javadoc:Throwable.getSuppressed()) method from the exception thrown by the `try` block.


<a id="autocloseable">&nbsp;</a>
## Classes That Implement the AutoCloseable or Closeable Interface

See the Javadoc of the [`AutoCloseable`](javadoc:AutoCloseable) and [`Closeable`](javadoc:Closeable) interfaces for a list of classes that implement either of these interfaces. The [`Closeable`](javadoc:Closeable) interface extends the [`AutoCloseable`](javadoc:AutoCloseable) interface. The [`close()`](javadoc:Closeable.close()) method of the [`Closeable`](javadoc:Closeable) interface throws exceptions of type [`IOException`](javadoc:IOException) while the [`close()`](javadoc:AutoCloseable.close()) method of the [`AutoCloseable`](javadoc:AutoCloseable) interface throws exceptions of type [`Exception`](javadoc:Exception). Consequently, subclasses of the [`AutoCloseable`](javadoc:AutoCloseable) interface can override this behavior of the [`close()`](javadoc:AutoCloseable.close()) method to throw specialized exceptions, such as [`IOException`](javadoc:IOException), or no exception at all.


<a id="wrapping-up">&nbsp;</a>
## Putting It All Together

The previous sections described how to construct the `try`, `catch`, and `finally` code blocks for the `writeList()` method in the `ListOfNumbers` class. Now, let's walk through the code and investigate what can happen.

When all the components are put together, the `writeList()` method looks like the following.

```java
public void writeList() {
    PrintWriter out = null;

    try {
        System.out.println("Entering" + " try statement");

        out = new PrintWriter(new FileWriter("OutFile.txt"));
        for (int i = 0; i < SIZE; i++) {
            out.println("Value at: " + i + " = " + list.get(i));
        }
    } catch (IndexOutOfBoundsException e) {
        System.err.println("Caught IndexOutOfBoundsException: "
                           +  e.getMessage());

    } catch (IOException e) {
        System.err.println("Caught IOException: " +  e.getMessage());

    } finally {
        if (out != null) {
            System.out.println("Closing PrintWriter");
            out.close();
        }
        else {
            System.out.println("PrintWriter not open");
        }
    }
}
```

As mentioned previously, this method's `try` block has three different exit possibilities; here are two of them.

1. Code in the `try` statement fails and throws an exception. This could be an [`IOException`](javadoc:IOException) caused by the new [`FileWriter`](javadoc:FilterWriter) statement or an [`IndexOutOfBoundsException`](javadoc:IndexOutOfBoundsException) caused by a wrong index value in the `for` loop.
2. Everything succeeds and the `try` statement exits normally.

Let's look at what happens in the `writeList()` method during these two exit possibilities.

### Scenario 1: An Exception Occurs

The statement that creates a [`FileWriter`](javadoc:FilterWriter) can fail for a number of reasons. For example, the constructor for the [`FileWriter`](javadoc:FilterWriter) throws an [`IOException`](javadoc:IOException) if the program cannot create or write to the file indicated.

When [`FileWriter`](javadoc:FilterWriter) throws an [`IOException`](javadoc:IOException), the runtime system immediately stops executing the `try` block; method calls being executed are not completed. The runtime system then starts searching at the top of the method call stack for an appropriate exception handler. In this example, when the [`IOException`](javadoc:IOException) occurs, the [`FileWriter`](javadoc:FilterWriter) constructor is at the top of the call stack. However, the [`FileWriter`](javadoc:FilterWriter) constructor doesn't have an appropriate exception handler, so the runtime system checks the next method — the `writeList()` method — in the method call stack. The `writeList()` method has two exception handlers: one for [`IOException`](javadoc:IOException) and one for [`IndexOutOfBoundsException`](javadoc:IndexOutOfBoundsException).

The runtime system checks `writeList()`'s handlers in the order in which they appear after the `try` statement. The argument to the first exception handler is [`IndexOutOfBoundsException`](javadoc:IndexOutOfBoundsException). This does not match the type of exception thrown, so the runtime system checks the next exception handler — [`IOException`](javadoc:IOException). This matches the type of exception that was thrown, so the runtime system ends its search for an appropriate exception handler. Now that the runtime has found an appropriate handler, the code in that `catch` block is executed.

After the exception handler executes, the runtime system passes control to the `finally` block. Code in the `finally` block executes regardless of the exception caught above it. In this scenario, the [`FileWriter`](javadoc:FilterWriter) was never opened and doesn't need to be closed. After the `finally` block finishes executing, the program continues with the first statement after the `finally` block.

Here's the complete output from the `ListOfNumbers` program that appears when an [`IOException`](javadoc:IOException) is thrown.

```shell
Entering try statement
Caught IOException: OutFile.txt
PrintWriter not open
```

### Scenario 2: The try Block Exits Normally

In this scenario, all the statements within the scope of the `try` block execute successfully and throw no exceptions. Execution falls off the end of the `try` block, and the runtime system passes control to the `finally` block. Because everything was successful, the [`PrintWriter`](javadoc:PrintWriter) is open when control reaches the `finally` block, which closes the [`PrintWriter`](javadoc:PrintWriter). Again, after the `finally` block finishes executing, the program continues with the first statement after the `finally` block.

Here is the output from the `ListOfNumbers` program when no exceptions are thrown.

```shell
Entering try statement
Closing PrintWriter
```
