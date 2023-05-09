---
id: first_app.getting_started
title: Getting Started with Java
slug: learn/getting-started
type: tutorial
category: start
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
toc:
- Elements of a Java Application {first-app}
- Compiling and Executing Java Code {compiling-executing}
- Creating a First Java Class {first-class}
- Preparing the Compilation of your First Class {first-compilation}
- Setting up a Java Development Kit {setting-up-jdk}
- Compiling your First Class {compiling}
- Adding Code to Your Class to Run it {adding-code}
- Running the Hello World Program as a Single File Application {single-file-app}
- Common Problems and Their Solutions {common-problems}
- Going Further {going-further}
description: "Downloading and setting up the JDK, writing your first Java class, and creating your first Java application."
last_update: 2022-10-29
author: ["JoséPaumard"]
---

<a id="first-app">&nbsp;</a>
## Elements of a Java Application

I understand that you are eager to type some code in your editor and run it to see your first Java application in action! Do not worry, your expectation will be fulfilled by the end of this tutorial. But before we move on, I would like to do through several elements that you need to know to fully understand what you are doing.

Even if you are familiar with some other programming language, know about compilation, know what an executable file is you may be interested in the following because Java works in a way that differs from C or C++.

<a id="compiling-executing">&nbsp;</a>
## Compiling and Executing Java Code

There are several steps that you need to follow to create a Java application. This tutorial shows you how to create a very simple Java application. If you need to create an enterprise application, the creation process is more complex but at its core you will find these simple steps.

The first of these steps is to write some Java code in a text editor.

Then this code has to be transformed to another format, which can be executed by your computer. This transformation is conducted by a special piece of software called a _compiler_. Some languages do not have a compiler; Java does. Every compiler is specific to a language.

The file produced by a compiler is often called a binary file or an executable file. Whereas you can read a source code and understand it, binary or executable files are not meant to be read by a human person. Only your computer can make sense of it.

This code contains special binary codes called _byte code_. This is a technical term that you may come across. The precise description of what is this _byte code_ is beyond the scope of this tutorial.

Compiling some code may fail; your code has to be correct for the compiler to produce an executable version of it. Do not worry, this page gives you the code you are going to compile. All you need to do is copy it and paste it in your text editor.

Once the compiler produced the binary file that you need, you can execute this binary file, that will your program.

> These two steps: compilation and execution require two specific pieces of software that are part of the Java Development Kit, also known as the JDK. You will see how to download the JDK for free and how to install it later in this tutorial.

Note that starting with Java SE 11 you can also merge these two steps into one, by executing a `.java` file directly. You can use these feature only if you are executing a program that is written in a single file. This way of executing your java application does not work if your java code spans more than one file.

<a id="first-class">&nbsp;</a>
## Creating a First Java Class

The first step you need to know is that the Java code you are writing is saved in plain text files. In this tutorial, your application will be written in a single text file. Larger applications may require thousands of such files.

Java is an object-oriented language. If this technical term does not mean anything to you, do not worry, all you need to remember at this point is that all the code you write must be held in a Java class.

A Java class is created by a special declaration in a text file. Just copy the following code and paste it in your text editor. Congratulation! You have created your first Java class!

```java
public class MyFirstClass {
}
```

The name of this Java class is `MyFirstClass`. You need to save this text in a file named `MyFirstClass.java`. A Java class must be saved in a file that has the same name as your class with the extension `.java`. This is mandatory and is in fact very convenient because you do not need to open a file to know what class is written in it.

You can give this class any name as long as it does not start with a number. There is a convention though: the name of a Java class starts with a capital letter. This is not mandatory but all Java developers follow this convention. When you become a seasoned Java developer, seeing a class that does not follow this convention will look weird to you.

If you are following this example to the letter, you should save the `MyFirstClass` class in a text file called `MyFirstClass.java`.

Just a word of warning: you should be using a plain text editor to create and save this file. Using a word processor will not work.

<a id="first-compilation">&nbsp;</a>
## Preparing the Compilation of your First Class

Compiling is the second step you need to follow after the creation of your first class. It consists of transforming the Java code you wrote in your `MyFirstClass.java` file into another format that can be executed. The result of this transformation will be stored in another file created by the compiler. The name of this file will be `MyFirstClass.class`.

So far the only tool you have been using is a plain text editor. Compiling this class requires a compiler; something you may not have on your computer. Fortunately, you can download this compiler and use it for free. Let me guide you through this process.

As of now, downloading "Java" means downloading the Java Development Kit, also known as the JDK. The JDK contains many tools and among them are the ones you will be using to compile and run a Java application. It is officially distributed by the OpenJDK project and by Oracle.

You may have heard about some other elements, also called "Java".

The JRE stands for Java Runtime Environment. It is a subset of the JDK that is not distributed by the OpenJDK or Oracle anymore. It only contained the tools needed to run a Java application. You cannot compile your code with the tools provided in the JRE.

You may also have heard about J2EE, Java EE or Jakarta EE. All these acronyms refer to the Java Enterprise Edition. It is a set of tools and libraries to create enterprise-class applications. Java EE is different from the JDK and is outside the scope of this tutorial. You do not need Java EE to compile and run the simple application we are creating in this tutorial.

<a id="setting-up-jdk">&nbsp;</a>
## Setting up a Java Development Kit

You can download the JDK from different places. There is a one-stop page that always refers to the latest version of the JDK: https://jdk.java.net/. Selecting the latest "Ready for use" JDK version takes you to a page where you can download the version of the JDK you need.

From this page you can download four versions:

- Linux/AArch64
- Linux/x64
- macOS/x64
- Windows/x64

This page provides production-ready open-source builds of the Java Development Kit, an implementation of the Java SE Platform under the GNU General Public License, version 2, with the Classpath Exception.

### Setting up a JDK for Windows/x64

Let us download the Windows version. What you get is a ZIP file of about 200MB that you can open with any ZIP utility software. This ZIP file contains the JDK. You can unzip the content of this file anywhere on your computer.

Once this is done you need to create an environment variable called `JAVA_HOME` that points to the directory where you unzipped the JDK. First you need to open a DOS prompt. If you unzipped a JDK 19 ZIP file in the `D:\jdk\` directory then the command you need to type in this DOS prompt is the following:

```shell
> set JAVA_HOME=D:\jdk\jdk-19
```

Please note that in this example and all the others the leading `>` is there to show you that you need to type this command or paste it in a prompt. You should not type this character or paste it as it is not part of the `set` command.

You can check that the `JAVA_HOME` variable has been properly set by typing the following code:

```shell
> echo %JAVA_HOME%
```

This command should print the following:

```shell
D:\jdk\jdk-19
```

You then need to update your `PATH` environment variable to add the `bin` directory of your JDK directory to it. This can be done with the following command:

```shell
> set PATH=%JAVA_HOME%\bin;%PATH%
```

You need to be very cautious while setting up these two variables, because a single mistake like an added white space of a missing semicolon will result in failure.

Do not close this command prompt. If you close it and open it again then you will need to create these two variables again.

### Setting up a JDK for Linux/x64

Let us download the Linux version. What you get is an archive file with a `.tar.gz` extension that you need to expand.

To expand it, you need to copy it or move it to the right directory. You can then type the following command:

```shell
$ tar xzf *.tar.gz
```

Please note that in this example and all the others, the leading `$` is there to show you that you need to type this command or paste it in a prompt. You should not type this character or paste it, as it is not part of the `tar` command.

This command expands all the files with the extension `.tar.gz` that you have in the current directory. You can use the exact name of this file if you just need to expand it.

Executing this command may take several seconds or more, depending on your system. It creates a new directory in the current directory with the content of the JDK in it.

Once this is done you need to create an environment variable called `JAVA_HOME` that points to the directory where you expanded the JDK. If you expanded a JDK 19 archive file in the `/home/javauser/jdk` directory then the command you need to type in this shell prompt is the following:

```shell
$ export JAVA_HOME=/home/javauser/jdk/jdk-19
```

The exact directory depends on the distribution file you have expanded.

You can check that the `JAVA_HOME` variable has been properly set by typing the following code:

```shell
$ echo $JAVA_HOME
```

This command should print the following:

```shell
/home/javauser/jdk/jdk-19
```

Then you need to update your `PATH` variable to add the `bin` directory of your JDK directory to it. This can be done with the following command:

```shell
$ export PATH=$JAVA_HOME/bin:$PATH
```

You need to be very cautious while setting up these two variables because a single mistake like an added white space of a missing semicolon will result in failure.

Do not close this shell prompt. If you close it and open it again then you will need to create these two variables again.

You can check if everything is ok by typing the following command:

```shell
$ which java
```

Your shell should print the complete path to the `java` executable file in the `bin` directory of the distribution you just expanded. In this example it will print:

```shell
/home/javauser/jdk/jdk-19/bin/java
```

### Setting up a JDK for macOS

Let us download the macOS version. What you get is an archive file with a `.tar.gz` extension that you need to expand.

To expand it, you need to copy it or move it to the right directory. You can then type the following command:

```shell
$ tar xzf *.tar.gz
```

Please note that in this example, and all the others, the leading `$` is there to show you that you need to type this command or paste it in a prompt. You should not type this character or paste it as it is not part of the `tar` command.

This command expands all the files with the extension `.tar.gz` that you have in the current directory. You can use the exact name of this file if you just need to expand it.

Executing this command may take several seconds or more, depending on your system. It creates a new directory in the current directory with the content of the JDK in it. This directory has the extension `.jdk`.

Once this is done you need to create an environment variable called `JAVA_HOME` that points to the directory where you expanded the JDK. If you expanded a JDK 19 archive file in the `/Users/javauser/jdk` directory then the command you need to type in this shell prompt is the following:

```shell
$ export JAVA_HOME=/Users/javauser/jdk/jdk-19.jdk/Contents/Home
```

The exact directory depends on the distribution file you have expanded.

You can check that the `JAVA_HOME` variable has been properly set by typing the following code:

```shell
$ echo $JAVA_HOME
```

This command should print the following:

```shell
/Users/javauser/jdk/jdk-19.jdk/Contents/Home
```

You then need to update your `PATH` variable to add the `bin` directory of your JDK directory to it. This can be done with the following command:

```shell
$ export PATH=$JAVA_HOME/bin:$PATH
```

You need to be very cautious while setting up these two variables because a single mistake like an added white space of a missing semicolon will result in failure.

Do not close this shell prompt. If you close it and open it again then you will need to create these two variables again.

You can check if everything is ok by typing the following command:

```shell
$ which java
```

Your shell should print the complete path to the `java` executable file in the `bin` directory of the distribution you just expanded. In this example it will print:

```shell
/Users/javauser/jdk/jdk-19.jdk/Contents/Home/bin/java
```


<a id="compiling">&nbsp;</a>
## Compiling your First Class

Once you have properly set up your JDK; the `JAVA_HOME` variable and the `PATH` variable, you are ready to compile your first class.

All the commands you will be typing now should be typed in the same prompt as the one you used to set up these two variables.

### Compiling and Running Your First Java Program

Whether you followed the Windows, the Linux or the macOS path, the remaining is the same.

1. Change to the directory where you saved your first class `MyFirstClass.java`. You can check that you are in the right directory by typing `dir`. It will show you the files you have in this directory. You should see your `MyFirstClass.java` file.
2. Check that your compiler is accessible from this directory by typing the following. This command is the same whether you are on Windows or Linux.

```shell
> java -version
```

It should tell you which version of the `javac` you are currently using. If it gives you an error message then you need to check your `JAVA_HOME` and `PATH` variables as there is most probably something wrong with them.

3. Now you are all set to compile your first code. You can type the following.

```shell
> javac MyFirstClass.java
```

Two things may happen at this point. You may have error messages telling you that the compiler cannot compile your code because of errors in your Java code. You will need to fix them before being able to move on.

If the compiler remains silent and does not complain about anything: congratulations! It means that your Java code has been properly compiled. Checking the content of the directory again should show a new file in it: `MyFirstClass.class`

<a id="adding-code">&nbsp;</a>
## Adding Code to Your Class to Run it

So far your class is empty; there is no executable code in it. If you were able to compile it properly then you can advance to the next step and execute some code.

Just open your `MyFirstClass.java` file and copy the following code in it.

```java
public class MyFirstClass {

    public static void main(String... args) {
        System.out.println("Hello, World!");
    }
}
```

As you may know, there is a long-standing tradition in computer science, which is to write a program that prints "Hello, World!" on the console of your application. So let us do that!

There is technical code in this class that may not be very clear to you. Do not worry; all you need to do is to compile it following the steps described in the previous section.

Make sure that the compiler created the `MyFirstClass.class` for you. To run it, all you need to type is the following command:

```shell
> java MyFirstClass
```

This should print _Hello, World!_ on the console. If this is the case: congratulations! You have been able to run your first Java program!

<a id="single-file-app">&nbsp;</a>
## Running the Hello World Program as a Single File Application

Starting with Java SE 11, you can run a Java application without going through the compilation step, as long as the program is written in a single file. This is the case of this simple _Hello, World!_ application.

You can just type the following:

```shell
> java MyFirstClass.java
```

And it will print the _Hello, World!_ message on the console.

<a id="common-problems">&nbsp;</a>
## Common Problems and Their Solutions

### Compiler Problems

#### Common Error Messages on Microsoft Windows Systems

```shell
javac is not recognized as an internal or external command, operable program or batch file
```

If you receive this error, Windows cannot find the compiler [`javac`](doc:javac).

Here's one way to tell Windows where to find `javac`. Suppose you installed the JDK in `C:\jdk19`. At the prompt you would type the following command and press Enter:

```shell
C:\jdk19\bin\javac HelloWorldApp.java
```

If you choose this option, you'll have to precede your `javac` and `java` commands with `C:\jdk19\bin\` each time you compile or run a program. To avoid this extra typing, consult the section Updating the `PATH` variable in the JDK 19 installation instructions.

```shell
Class names, HelloWorldApp, are only accepted if annotation processing is explicitly requested
```

If you receive this error, you forgot to include the `.java` suffix when compiling the program. Remember, the command is `javac HelloWorldApp.java` not `javac HelloWorldApp`.

#### Common Error Messages on UNIX Systems

```shell
javac: Command not found
```

If you receive this error, UNIX cannot find the compiler, [`javac`](doc:javac).

Here's one way to tell UNIX where to find javac. Suppose you installed the JDK in `/usr/local/jdk19`. At the prompt you would type the following command and press Return:

```shell
/usr/local/jdk19/javac HelloWorldApp.java
```

Note: If you choose this option, each time you compile or run a program, you'll have to precede your `javac` and `java` commands with `/usr/local/jdk19/`. To avoid this extra typing, you could add this information to your `PATH` variable. The steps for doing so will vary depending on which shell you are currently running.

```shell
Class names, 'HelloWorldApp', are only accepted if annotation processing is explicitly requested
```

If you receive this error, you forgot to include the `.java` suffix when compiling the program. Remember, the command is `javac HelloWorldApp.java` not `javac HelloWorldApp`.

#### Syntax Errors (All Platforms)

If you mistype part of a program, the compiler may issue a syntax error. The message usually displays the type of the error, the line number where the error was detected, the code on that line, and the position of the error within the code. Here's an error caused by omitting a semicolon (`;`) at the end of a statement:

```shell
Testing.java:8: error: ';' expected
count++
^
1 error
```

If you see any compiler errors, then your program did not successfully compile, and the compiler did not create a `.class` file. Carefully verify the program, fix any errors that you detect, and try again.

#### Semantic Errors

In addition to verifying that your program is syntactically correct, the compiler checks for other basic correctness. For example, the compiler warns you each time you use a variable that has not been initialized:

```shell
Testing.java:8: error: variable count might not have been initialized
count++;
^
Testing.java:9: error: variable count might not have been initialized
System.out.println("Input has " + count + " chars.");
^
2 errors
```

Again, your program did not successfully compile, and the compiler did not create a `.class` file. Fix the error and try again.

### Runtime Problems

#### Error Messages on Microsoft Windows Systems

If you receive this error, `java` cannot find your bytecode file, `HelloWorldApp.class`.

One of the places `java` tries to find your `.class` file is your current directory. So if your `.class` file is in `C:\java`, you should change your current directory to that. To change your directory, type the following command at the prompt and press Enter:

```shell
cd c:\java
```

The prompt should change to `C:\java>`. If you enter `dir` at the prompt, you should see your `.java` and `.class` files. Now enter `java HelloWorldApp` again.

If you still have problems, you might have to change your `CLASSPATH` variable. To see if this is necessary, try clobbering the classpath with the following command.

```shell
set CLASSPATH=
```

Now enter `java HelloWorldApp` again. If the program works now, you'll have to change your `CLASSPATH` variable. To set this variable, consult the _Updating the PATH variable_ section in the JDK installation instructions. The `CLASSPATH` variable is set in the same manner.

```shell
Could not find or load main class HelloWorldApp.class
```

A common mistake made by beginner programmers is to try and run the `java` launcher on the `.class` file that was created by the compiler. For example, you'll get this error if you try to run your program with `java HelloWorldApp.class` instead of `java HelloWorldApp`. Remember, the argument is the name of the class that you want to use, not the filename.

```shell
Exception in thread "main" java.lang.NoSuchMethodError: main
```

The Java VM requires that the class you execute with it have a `main` method at which to begin execution of your application. A Closer Look at the [Adding Code to Your Class to Run it](id:first_app.getting_started#anchor_7) section discusses the main method in detail.

#### Error Messages on UNIX Systems

```shell
Exception in thread "main" java.lang.NoClassDefFoundError: HelloWorldApp
```

If you receive this error, `java` cannot find your bytecode file, `HelloWorldApp.class`.

One of the places java tries to find your bytecode file is your current directory. So, for example, if your bytecode file is in `/home/jdoe/java`, you should change your current directory to that. To change your directory, type the following command at the prompt and press Return:

```shell
cd /home/jdoe/java
```

If you enter `pwd` at the prompt, you should see `/home/jdoe/java`. If you enter `ls` at the prompt, you should see your `.java` and `.class` files. Now enter `java HelloWorldApp` again.

If you still have problems, you might have to change your `CLASSPATH` environment variable. To see if this is necessary, try clobbering the classpath with the following command.

```shell
unset CLASSPATH
```

Now enter `java HelloWorldApp` again. If the program works now, you'll have to change your `CLASSPATH` variable in the same manner as the `PATH` variable above.

```shell
Exception in thread "main" java.lang.NoClassDefFoundError: HelloWorldApp/class
```

A common mistake made by beginner programmers is to try and run the java launcher on the `.class` file that was created by the compiler. For example, you'll get this error if you try to run your program with `java HelloWorldApp.class` instead of `java HelloWorldApp`. Remember, the argument is the name of the class that you want to use, not the filename.

```shell
Exception in thread "main" java.lang.NoSuchMethodError: main
```

The Java VM requires that the class you execute with it have a main method at which to begin execution of your application. A Closer Look at the [Adding Code to Your Class to Run it](id:first_app.getting_started#anchor_7) section discusses the main method in detail.


<a id="going-further">&nbsp;</a>
## Going Further

This first Java program showed you the basic steps every Java developer follows to run an application.

1. Create a source in a set of `.java` text files
2. Compile these files to produce a set of corresponding `.class` binary files
3. Run them together as an application.

Developers that work on large applications do not use plain text editors to manage their source code; they use Integrated Development Environments. IDEs are complex software applications, specialized in software development. These applications handle the compilation of your source code automatically, they can help you to track errors in the syntax of your Java code and nail down bugs in its execution, among other things.

Some of these tools are open source and free to use.

- [`the Eclipse foundation maintains Eclipse`](doc:ide-eclipse),
- [`the Apache foundation maintains NetBeans`](doc:ide-netbeans),
- JetBrains publishes [`IntelliJ IDEA Community Edition`](doc:ide-intellij) that is free to use for personal and commercial development.
