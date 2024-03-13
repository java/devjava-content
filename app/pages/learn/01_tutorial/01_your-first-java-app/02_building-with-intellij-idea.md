---
id: first_app.intellij-idea
title: Building a Java application in IntelliJ IDEA
slug: learn/intellij-idea
type: tutorial
category: start
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
more_learning:
  youtube:
    - H_XxH66lm3U
    - 70_B2DyM8mU
toc:
- Installing IntelliJ IDEA
- Creating a new project
- Writing and editing code
- Running your application
- Testing
- Debugging
- Refactoring code
- Documenting code
- Searching and navigating
- Evolving the project
- More information
description: "IntelliJ IDEA is the most used Java IDE and helps you develop your Maven and Gradle Java projects faster."
last_update: 2024-03-12
---

An IDE (Integrated Development Environment) allows you to quickly build applications, by integrating a source-code editor with the ability to compile and run your code, as well as integration with  tools you’ll need for software development, including build tools, testing and debugging tools, version control, and so on. And finally, an IDE will let you search and navigate your codebase in ways your file system won’t.

IntelliJ IDEA is the [most widely used IDE for Java developers](https://www.jetbrains.com/lp/devecosystem-2023/java/#java_ide). It has out-of-the-box integrations with the tools a Java developer will need for software development, with no need to install any additional plugins to get started.
IntelliJ IDEA is available in two editions:
- **_IntelliJ IDEA Community Edition_** - free and open-source. It provides all the basic features for Java development.
- **_IntelliJ IDEA Ultimate_** - commercial, distributed with a 30-day trial period. It provides additional tools and features for web and enterprise development.

## Installing IntelliJ IDEA
To install IntelliJ IDEA, download the version you want to use from the [IntelliJ IDEA website](https://www.jetbrains.com/idea/) and follow the instructions. For more information on installing IntelliJ IDEA on your OS, see [the documentation](https://www.jetbrains.com/help/idea/installation-guide.html#standalone).

When you launch IntelliJ IDEA for the first time, you’ll see the **Welcome** screen. From here, you create a new project, open an existing project, or get a project from a version control system (like GitHub).

[![Welcome screen](/assets/images/intellij-idea/welcome-screen.png)](/assets/images/intellij-idea/welcome-screen.png)

There is no need to install any additional plugins to get started; the most common integrations are already available as part of the IDE or as bundled plugins. Of course, you can [customize the IDE](https://www.jetbrains.com/help/idea/run-for-the-first-time.html#select-ui-theme) further, or [install additional plugins](https://www.jetbrains.com/help/idea/run-for-the-first-time.html#additional_plugins) if you really want to.

You will need to install a JDK, if you don’t already have one installed. You can do this yourself, as described in [Getting Started with Java](https://dev.java/learn/getting-started/#setting-up-jdk), or you can do so in IntelliJ IDEA when creating a new project, without having to switch from your IDE and other tools (such as your browser, file system, etc.) to download and configure a JDK.

## Creating a new project
As mentioned above, we can create a new project from the **Welcome** screen. Alternatively, we can go to **File | New | Project** in the main menu.

[![New Project menu](/assets/images/intellij-idea/new-project-menu.png)](/assets/images/intellij-idea/new-project-menu.png)

In the **New Project** wizard, make sure that **New Project** is selected on the left hand side.

Give your project a name (for example `java-demo`), make sure the selected **Language** is `Java`, and select the **Build system** you prefer. For example, let’s create a Maven project. A build tool, like Maven or Gradle, helps you build your project, and manage any dependencies, like additional libraries you want to use in your Java code.

[![New Project](/assets/images/intellij-idea/new-project.png)](/assets/images/intellij-idea/new-project.png)

To develop a Java application, we’ll need a JDK. If the necessary JDK is already defined in IntelliJ IDEA, select it from the **JDK** list.

[![Download JDK](/assets/images/intellij-idea/download-jdk.png)](/assets/images/intellij-idea/download-jdk.png)

If the JDK is installed on your computer, but not defined in the IDE, select **Add JDK** and specify the path to the JDK home directory (for example, /Library/Java/JavaVirtualMachines/jdk-21.0.2.jdk).

If you don't have the necessary JDK on your computer, select **Download JDK**. In the **Download JDK** popup, specify the JDK vendor (for example, Oracle OpenJDK), version, change the installation path if required, and click **Download**.

[![Download JDK popup](/assets/images/intellij-idea/download-jdk-popup.png)](/assets/images/intellij-idea/download-jdk-popup.png)

If you select **Add sample code**, a `Main` class which prints out “Hello World” will be added to your project. Leave it unchecked, so we can add our own later.

Once you’re satisfied with your input in the **New Project** popup, click **Create**.

IntelliJ IDEA will create a project for you, with a basic `pom.xml` and a default directory structure for a Maven project with the source folder defined. The `pom.xml` is a file that contains information about the project and configuration details used by Maven to build the project. For more information, see [the Maven documentation](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html).

[![Project](/assets/images/intellij-idea/project.png)](/assets/images/intellij-idea/project.png)

We can see the project structure in the [Project tool window](https://www.jetbrains.com/help/idea/project-tool-window.html) on the left. The `.idea` folder contains your project configuration. The `src` folder contains your code. When you expand that folder, you'll see that IntelliJ IDEA has created a `main` folder for your Java code and a `test` folder for your tests.

To simplify the view on your project, for example to focus on the package structure, click the title bar to select the desired view from the list.

[![Project view](/assets/images/intellij-idea/project-view.png)](/assets/images/intellij-idea/project-view.png)

Let’s add some code. We’ll start by creating a new class. In the **Project** tool window on the left, select the directory `src/main/java`. Add a new Java file using the shortcut **⌘N** (on macOS) or **Alt+Insert** (on Windows/Linux). Alternatively, right-click the **Project** tool window to open the context menu and select **New | Java class**. Name this class `HelloWorld`.

[![New Java class](/assets/images/intellij-idea/new-java-class.png)](/assets/images/intellij-idea/new-java-class.png)

## Writing and editing code
Inside the class `HelloWorld`, we will write the main method, which is where execution of our Java program will start.
The classic way to write a main method in Java is:
```shell
public static void main(String[] args) {
  
}
```
As you start typing, you’ll notice that IntelliJ IDEA gives you [code completion](https://www.jetbrains.com/help/idea/auto-completing-code.html). It will help you complete the names of classes, methods, fields, and keywords, and other types of completion.

[![Code completion](/assets/images/intellij-idea/code-completion1.png)](/assets/images/intellij-idea/code-completion1.png)

[![Code completion](/assets/images/intellij-idea/code-completion2.png)](/assets/images/intellij-idea/code-completion2.png)

IntelliJ IDEA will show you if you’ve typed or selected something that doesn’t compile, or if it sees any other problems. If you press **Alt+Enter** it will offer options to fix the problem. You can use **F2** to move to the next problem, and **Shift+F2** to go to the previous problem. IntelliJ IDEA will help you keep your code green, by offering suggestions that are context-sensitive.

[![Suggestions](/assets/images/intellij-idea/alt-enter.png)](/assets/images/intellij-idea/alt-enter.png)

To speed up development, we can also [generate code](https://www.jetbrains.com/help/idea/generating-code.html). IntelliJ IDEA can generate constructors, getters and setters, toString(), equals() and hashCode() methods, and more.

[![Generate code](/assets/images/intellij-idea/generate-code.png)](/assets/images/intellij-idea/generate-code.png)

Instead of writing the main method ourselves, we can use [live templates](https://www.jetbrains.com/help/idea/using-live-templates.html) to write it for us. When we write `main`, IntelliJ IDEA will suggest the main live template. Press **Enter** to select the suggestion, and the main method will appear.

[![Main live template](/assets/images/intellij-idea/main-live-template.png)](/assets/images/intellij-idea/main-live-template.png)

Now we can write the desired code inside the main method. We can use another live template, `sout`, to generate `System.out.println();` and add the String `“Hello World!”`

[![Hello World](/assets/images/intellij-idea/hello-world.png)](/assets/images/intellij-idea/hello-world.png)

IntelliJ IDEA will manage the formatting of your code as you write it. If needed, you can explicitly reformat the code, using the shortcut **⌘⌥L** (on macOS) or **Ctrl+Alt+L** (on Windows/Linux).

## Running your application
A major benefit of using an IDE is that you can directly run your code without having to first manually compile it on the command line.

You can run our application directly from the editor, by clicking the green run button in the gutter near the class declaration, or using the shortcut **⌃⇧R** (on macOS) or **Ctrl+Shift+F10** (on Windows/Linux).

Alternatively, we can run our application using the green Run button in the top right corner, or using the shortcut **⌃R** (on macOS) or **Ctrl+F10** (on Windows/Linux) to run the latest file.

[![Run](/assets/images/intellij-idea/run.png)](/assets/images/intellij-idea/run.png)

If we want to pass arguments to our application, we can do so in our [Run Configurations](https://www.jetbrains.com/help/idea/run-debug-configuration.html).

To edit your run configurations, select the configuration in the run/debug configuration switcher, by clicking the down arrow next to the current configuration or the three dots to the right of the run configuration, and select **Edit Configurations**.

[![Edit Configurations](/assets/images/intellij-idea/edit-configurations.png)](/assets/images/intellij-idea/edit-configurations.png)

Edit the **Run/Debug Configurations** in the popup.

[![Run / Debug Configuration](/assets/images/intellij-idea/run-config.png)](/assets/images/intellij-idea/run-config.png)

## Testing
IntelliJ IDEA makes it easy to add tests to your code. You can navigate to the test for a particular class using the shortcut **⇧⌘T** on macOS or **Ctrl+Shift+T** on Windows/Linux. If no test class exists yet, IntelliJ IDEA will create one for you. This class will be created in the right location.
We can select a **Testing library** in the **Create test** popup.

[![Create test](/assets/images/intellij-idea/create-test.png)](/assets/images/intellij-idea/create-test.png)

IntelliJ IDEA supports multiple testing libraries, including [JUnit5](https://junit.org/junit5/), which is the [most used testing library for Java developers](https://www.jetbrains.com/lp/devecosystem-2023/java/#java_unittesting).

If JUnit5 is not part of your project yet, IntelliJ IDEA will note “JUnit5 library not found in the module”. Click **Fix** to have IntelliJ IDEA fix this for you.

[![Create test - Fix](/assets/images/intellij-idea/create-test-fix.png)](/assets/images/intellij-idea/create-test-fix.png)

Note that the JUnit5 dependency is added to the pom.xml.

[![JUnit5 dependencies](/assets/images/intellij-idea/junit5-dependencies.png)](/assets/images/intellij-idea/junit5-dependencies.png)

Go back to the test file to add tests. We can let IntelliJ IDEA help us generate our test for us. In the test class, we can use **Generate** (**⌘N** on macOS or **Alt+Insert** on Windows/Linux) and select **Test Method** to add a test. Give the test a name that explains the intended behavior, and add the relevant test code.

In our test class, we can select **Run All Tests** (**⌃⇧R** on macOS or **Ctrl+Shift+F10** on Windows/Linux).
While it’s nice to see our tests pass, we also want to make sure that they fail when something is wrong. Make some changes to your code that will make your tests fail, and run them again to see them fail. Revert those changes to see them pass again.

We can view the code and tests side by side. To do so, click on the tab with the test file, and select **Move and Split right**. This can be especially helpful if you're doing [test-driven development (TDD)](https://martinfowler.com/bliki/TestDrivenDevelopment.html).

## Debugging
We might want to see how our code runs, either to help us understand how it works and/or when we need to fix a bug. We can run our code through the [debugger](https://www.jetbrains.com/help/idea/debugging-code.html) to see the state of our variables at different times, and the call stack - or the order in which methods are called when the program executes. To do so, we must first add a [breakpoint](https://www.jetbrains.com/help/idea/using-breakpoints.html) to the code.

To add a breakpoint, click the gutter at the line of code where you want execution to stop. Alternatively, place the caret at the line and press **⌃F8** (on macOS) or **Ctrl+F8** (on Windows/Linux). We can run our test or application using the **Debug** option.

Execution will stop at the breakpoint, so we can investigate the state of our application. We can see current values of variables and objects. We can evaluate an expression, to see its current value and look at more details. We can even change the expressions to evaluate different results. We can continue execution by either stepping into a method to see what happens inside a called method (using the shortcut **F7**) or stepping over a line to go to the next line even if a method is called (using the shortcut **F8**), depending on what we’re interested in. Finally, we can resume the program to finish the execution of the test.

For more information on debugging, see [Debugging in Java](https://dev.java/learn/debugging/)

## Refactoring code

While working with the code, we may want to make small improvements without changing the functionality. We can use [refactoring](https://www.jetbrains.com/help/idea/refactoring-source-code.html) to reshape the code. We can rename classes, variables and methods using **Refactor | Rename** (**⇧F6** on macOS, or **Shift+F6** on Windows/Linux).

We can extract variables (**⌘⌥V** on macOS, or **Ctrl+Alt+V** on Windows/Linux), or inline them (**⌘⌥N** on macOS, or **Ctrl+Alt+N** on Windows/Linux) as needed.

We can break long methods into smaller parts by extracting a method and giving it a meaningful name. We can refactor the code to a style you are more familiar with, or to use new idioms and language features.

Pull up the refactoring menu to see what is possible, using the shortcut **⌃T** (on macOS) or **Ctrl+Alt+Shift+T** (on Windows/Linux).


## Documenting code
We can add documentation to our code. IntelliJ IDEA provides completion for documentation comments, which is enabled by default. Type `/**` before a declaration and press **Enter**. IntelliJ IDEA auto-completes the documentation comment for you.

We can make the Javadoc comments easier to read by selecting Reader Mode. We can toggle to reader mode in the editor using **^⌥Q** (on macOS) or **Ctrl+Alt+Q** (on Windows/Linux). Right-click the icon in the gutter to select **Render All Doc Comments** if you want all comments to show in reader mode.

## Searching and navigating
IntelliJ IDEA also helps us by providing ways to navigate around our codebase, for example by going backwards and forwards between files, finding usages and declarations, finding interfaces and their implementations, viewing recently opened files and location, or even opening a window by name.

One popular way to search is [search everywhere](https://www.jetbrains.com/help/idea/searching-everywhere.html) (using **Shift** twice). Search everywhere allows you to search your project files and directories, as well as your project settings and IntelliJ IDEA settings.

[![Search everywhere](/assets/images/intellij-idea/search-everywhere.png)](/assets/images/intellij-idea/search-everywhere.png)

Open Find in Files from the main menu using **Edit | Find | Find in Files**, or by using the shortcut **⌘⇧F** (on macOS) or **Ctrl+Shift+F** (on Windows/Linux). You can narrow down the results from **In Project** to **Module**, **Directory**, or **Scope**.

[![Find in Files](/assets/images/intellij-idea/search-everywhere.png)](/assets/images/intellij-idea/find-in-files.png)

## Evolving the project
In the future, you might want to add functionality to your project. We’ve seen how intelliJ IDEA can help you with code suggestions and completion while writing code, running your application, adding tests and using the debugger to help figure out how code is run, refactoring code, and more.

You may want to upgrade the version of Java your project uses, or any dependencies used in your project.

IntelliJ IDEA continues to improve and evolve, adding new features and offering new integration. This includes inspections for new Java language features. [Feedback is welcome](https://youtrack.jetbrains.com/issues/IDEA).

[IntelliJ IDEA Community Edition](https://github.com/JetBrains/intellij-community) is an open-source project, and community contributions are welcome. Check the [contribution guide](https://github.com/JetBrains/intellij-community/blob/master/CONTRIBUTING.md) to contribute to IntelliJ IDEA, or the [IntelliJ Platform](https://plugins.jetbrains.com/docs/intellij/intellij-platform.html).

## More information
For more information on IntelliJ IDEA, have a look at the [documentation](https://www.jetbrains.com/help/idea/getting-started.html), the [blog](https://blog.jetbrains.com/idea/), the [YouTube channel](https://www.youtube.com/intellijidea), or the [guide](https://www.jetbrains.com/guide/java/).
