---
id: first_app.single_source_file_app
title: Launching Single-File Source-Code Programs
slug: learn/single-file-program
slug_history:
- learn/launching-single-file-source-code-programs
type: tutorial
category: start
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
toc: 
- Single-File Source-Code Program Execution {launching}
- Executing Your First Single-File Source-Code Program {example}
- Multiple Classes in Same File {with-multiple-classes}
- Reference JDK Classes and Non-JDK Classes {importing-classes}
- Executing as a Shebang File {shebang}
description: "Launching Single-File Source-Code Java programs with the Java launcher."
---

<a id="launching">&nbsp;</a>
## Single-File Source-Code Program Execution
In JDK 11, Java introduced the ability to launch a single-file source-code program with the `java` launcher, without first needing to explicitly compile the source code. This works by the `java` launcher automatically invoking the compiler and storing the compiled code in-memory. This can be a great way to learn how to use Java or explore new features within the Java API, without having to go through the cruft of compiling and then executing code. There are several ways to use this feature, as well as some limitations and things to keep in mind. 

<a id="example">&nbsp;</a>
## Executing Your First Single-File Source-Code Program
To execute a single-file source-code program, the first class defined in the source file must contain `public static void main(String[])` like in `HelloWorld` below:
```java
public class HelloWorld {

    public static void main(String[] args) {
        System.out.println("Hello World!");
    }

}
```
From the command line, `HelloWorld` can be launched with (accepting the name of the file is also `HelloWorld.java`):

```shell
$ java HelloWorld.java
```

### Passing in Arguments

Arguments can also be passed in like with a normally compiled class, so in the below: 

```java
public class HelloJava {

    public static void main(String[] args) {
        System.out.println("Hello " + args[0]);
    }

}
```
Passing in an argument can be done like this:

```shell
$ java HelloJava.java World!
```

<a id="with-multiple-classes">with-multiple-classes</a>
## Multiple Classes in Same File

Multiple classes can be defined within the same source file if needed for encapsulation purposes, like in this example:

```java
public class MultipleClassesInSameFile {
    public static void main(String[] args) {
 
        System.out.println(GenerateMessage.generateMessage());
        System.out.println(AnotherMessage.generateAnotherMessage());
    }
}
 
class GenerateMessage {
    static String generateMessage() {
        return "Here is one message";
    }
}
 
class AnotherMessage {
    static String generateAnotherMessage() {
        return "Here is another message";
    }
}
```
When executed:
```shell
$ java MultipleClassesInSameFile.java
```

Will output:
```shell
Here is one message
Here is another message
```

<a id="importing-classes">&nbsp;</a>
## Reference JDK Classes and Non-JDK Classes
A class that is part of the core JDK does not need to be added to the classpath to be executed. So this example, referencing the `Scanner` and `MatchResult` classes, can be executed simply with the `java` launcher:

```java
import java.util.Scanner;
import java.util.regex.MatchResult;

public class ScannerExample {

	public static void main(String... args) {
		String wordsAndNumbers = """
				Longing rusted furnace
				daybreak 17 benign 
				9 homecoming 1 
				freight car
				""";

		try (Scanner scanner = new Scanner(wordsAndNumbers)) {
			scanner.findAll("benign").map(MatchResult::group).forEach(System.out::println);
		}
	}
}
```
To launch:

```shell
$ java ScannerExample.java
```

However the below example referencing `RandomUtils`, part of the [Apache Commons Lang](https://commons.apache.org/proper/commons-lang/), will need to have the `commons-lang.jar` added to the classpath at launch:

```java
import org.apache.commons.lang3.RandomUtils;

public class ReferenceNonJDKClass {

	public static void main(String[] args) {
		System.out.println(RandomUtils.nextInt());
	}

}
```
To launch:
```shell
java -cp /path/to/commons-lang3-3.12.0.jar ReferenceNonJDKClass.java
```

<a id="shebang">&nbsp;</a>
## Executing as a Shebang File
On a Unix-like operating system, a single-file source-code application, can also be launched as a shebang file like a script. 
Within the a java source file, as the first line in the file add `path/to/java/home --source <version>` like in the below example:

```jshelllanguage
#!/path/to/your/bin/java --source 16
 
public class HelloJava {
 
    public static void main(String[] args) {
        System.out.println("Hello " + args[0]);
    }
}
```
The file cannot have `.java` as its file extension, and must also be executable `chmod +x`. With that, it can be launched with:

```shell
./HelloJava
```