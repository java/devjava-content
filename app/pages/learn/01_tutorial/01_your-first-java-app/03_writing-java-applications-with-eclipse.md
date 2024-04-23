---
id: first_app.eclipse
title: Building a Java Application in the Eclipse IDE
slug: learn/eclipse
type: tutorial
category: start
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
toc:
- Introduction and Installation {intro}
- Creating a Java Project {creating}
- Content Assist {content_assist}
- Running Your Program {run}
- Dealing With Compilation Errors and Warnings {errors}
- Debugging {debugging}
- Generating Code {generating}
- Refactoring {refactoring}
- Summary {summary}
description: "Installing and getting started with the Eclipse IDE for developing Java applications"
last_update: 2024-04-15
author: ["DanielSchmid"]
---
<a id="intro">&nbsp;</a>
## Introduction and Installation

The Eclipse IDE (or Eclipse for short) is a commonly used application that provides tooling that helps developers write, run and debug Java code. This article describes how to get started with Eclipse for developing Java applications.

The easiest way to install Eclipse is to download and run the Eclipse installer from [this site](https://www.eclipse.org/downloads/packages/installer). This provides multiple options for packages to install. In most cases, `Eclipse IDE for Java Developers` is a good installation for Java development.  

[![Eclipse Installer](/assets/images/eclipse/install.png)](/assets/images/eclipse/install.png)

After installing Eclipse, you can select a workspace. The workspace is the directory where most projects are located.  

[![Workspace selection](/assets/images/eclipse/workspace_selection.png)](/assets/images/eclipse/workspace_selection.png)

Upon selecting a workspace, it will show a Welcome screen presenting you with mutliple options. For example, there is an option giving you an interactive tutorial showing you how to create a simple Hello-World application.  

[![Workspace selection](/assets/images/eclipse/welcome.png)](/assets/images/eclipse/welcome.png)

This article will show you how to create Java projects manually so you can close the welcome-screen by clicking on the `Hide` button on the top right of the Welcome tab.

<a id="creating">&nbsp;</a>
## Creating a Java Project

After installing Eclipse you should have an empty workspace. In order to create a new Java project, click on the `File` toolbar in the top left corner of the Eclipse window and select `New` > `Java Project`. 

[![File > New > Java Project](/assets/images/eclipse/file_create_project.png)](/assets/images/eclipse/file_create_project.png)

This will then open up a dialog window that allows you to configure your project. You will need to enter a name next to `Project name:` at the top. For example, you can choose the name `HelloWorld`. In the `Module` section at the bottom, disable the option `Create module-info.java file`. You can configure a custom Java installation (commonly referred to as the *JDK* or Java Development Kit) in the `JRE` box.

[![Java project creation dialog](/assets/images/eclipse/create_java_project.gif)](/assets/images/eclipse/create_java_project.gif)

This creates a Java project that is shown on the left side of the Eclipse window. When expanding this project, there should be a folder named `src`. Java classes can be created inside this directory by right-clicking on it and selecting `New` > `Class`.  

[![New > Class](/assets/images/eclipse/create_class.png)](/assets/images/eclipse/create_class.png)

This opens a dialog similar to the project creation dialog. It allows specifying various options about the class you want to create. For now, you will need to enter a class name like `HelloWorld`. If you want to, you can also configure a package which can be used to group multiple classes together.  
[![Java class creation dialog](/assets/images/eclipse/java_class_creation.png)](/assets/images/eclipse/java_class_creation.png)

<a id="content_assist">&nbsp;</a>
## Content Assist

Eclipse can help you write Java code by automatically completing parts of it. When pressing the key combination `Ctrl`+`Space` (or `⌘`+`Space` on macOS or `Alt`+`/` on chinese systems) while editing Java code, Eclipse automatically suggests ways to complete the code. These suggestions can be confirmed by pressing `Enter` or double-clicking on the suggestions.

For example, typing `main` in a class followed by pressing `Ctrl`+`Space` suggests adding a main method.

[![Content assist suggesting a main method](/assets/images/eclipse/content_assist_main.png)](/assets/images/eclipse/content_assist_main.png)

Inside methods, Eclipse can suggest changing `sysout` to a `System.out.println();` statement.  

[![Content assist suggesting a System.out statement](/assets/images/eclipse/content_assist_sysout.png)](/assets/images/eclipse/content_assist_sysout.png)

Furthermore, it can complete class and method names.  

[![Content assist completing the class name String](/assets/images/eclipse/content_assist_suggest_class.png)](/assets/images/eclipse/content_assist_suggest_class.png)

[![Content assist completing the method String#length](/assets/images/eclipse/content_assist_suggest_method.png)](/assets/images/eclipse/content_assist_suggest_method.png)


<a id="run">&nbsp;</a>
## Running Your Program

In order to run a Java application, you first need to have a class with a `main` method. You can right-click the class in the package explorer or right-click in the editor where you are writing the code for the class and select `Run as` > `Java application`.  

[![Run As > Java application in the editor](/assets/images/eclipse/run_as_editor.png)](/assets/images/eclipse/run_as_editor.png)  

[![Run As > Java application in the editor](/assets/images/eclipse/run_as_package_explorer.png)](/assets/images/eclipse/run_as_package_explorer.png)

Alternatively, you can run the application using the Run [![Run button](/assets/images/eclipse/run_button.png)](/assets/images/eclipse/run_button.png) button in the toolbar. [![Run button in toolbar](/assets/images/eclipse/run_buttons_toolbar.png)](/assets/images/eclipse/run_buttons_toolbar.png)

When running the program, Eclipse should show the output of the program in the `Console` view.  

[![Program with output in console](/assets/images/eclipse/console_output.png)](/assets/images/eclipse/console_output.png)

<a id="errors">&nbsp;</a>
## Dealing with Compilation Errors and Warnings

When Eclipse detects a compilation error, the relevant lines are underlined in red. When hovering over the line with the error or the error icon to the left of the said line, Eclipse provides information about what went wrong and also suggests how to fix the error. However, in many cases there are multiple ways to get rid of the error. You need to carefully check whether the suggestions are actually matching what you want to do. After all, IDEs cannot predict your intent.  

[![Compilation error due to calling a non-existing method](/assets/images/eclipse/compilation_error.png)](/assets/images/eclipse/compilation_error.png)

Furthermore, Eclipse shows a list of errors in the `Problems` view. If this view is not displayed, it can be shown using the menu `Window` > `Show View` > `Problems`.  

[![opening Problems view](/assets/images/eclipse/open_problems_view.png)](/assets/images/eclipse/open_problems_view.png)

[![Problems view showing an error](/assets/images/eclipse/problems_view.png)](/assets/images/eclipse/problems_view.png)

As with Errors, Eclipse can also detect code that compiles but likely contains some issues or is pointless. In this case, Eclipse will display a warning.  

[![Warning due to unused variable](/assets/images/eclipse/warning.png)](/assets/images/eclipse/warning.png)

[![Problems view showing a warning](/assets/images/eclipse/problems_view_warning.png)](/assets/images/eclipse/problems_view_warning.png)

<a id="debugging">&nbsp;</a>
## Debugging

When a program doesn't do what you expect it to do, you might want to debug it. The process of debugging is explained in [this article](id:debugging). Eclipse provides a lot of functionality making it easy to debug Java applications.

In order to debug an application, you need to set a breakpoint. When the program gets to executing the line with the breakpoint, it will temporarily stop ("suspend"), allow you to inspect its current state and step through the program. To set a breakpoint, you need to double-click on the area to the left of the line you want to suspend the program at. After doing that, a blue dot should appear there.  

[![A breakpoint next to source code](/assets/images/eclipse/breakpoint.png)](/assets/images/eclipse/breakpoint.png)

When running a program normally, it will ignore all breakpoints. For debugging, you need to run the program in debug mode. This can be done by clicking on the green button with the bug icon [![The debug button](/assets/images/eclipse/debug_button.png)](/assets/images/eclipse/debug_button.png) next to the run button or using `Debug As` > `Java Application`.  

[![The debug button next to run buttons](/assets/images/eclipse/debug_button_in_toolbar.png)](/assets/images/eclipse/debug_button_in_toolbar.png)

When the program execution gets to a breakpoint in debug mode, Eclipse will ask you to switch to the Debug perspective. This perspective gives you more information about the program you are currently debugging so you likely want to do this and click on the `Switch` button.  

[![Eclipse asking to switch to the Debug perspective](/assets/images/eclipse/debug_perspective_switch.png)](/assets/images/eclipse/debug_perspective_switch.png)

Upon opening the debug perspective, you should still see your code in the middle. However, there should be one line with a green background next to the breakpoint. This indicates the next line the program would execute. On the right side, you should see a `Variables` view containing a list of variables and their current values.

[![The debug perspective](/assets/images/eclipse/debug_perspective.png)](/assets/images/eclipse/debug_perspective.png)

While the program is suspended, you can tell it how to continue executing using buttons in the toolbar at the top.
[![Buttons for controlling execution flows in the toolbar](/assets/images/eclipse/debug_toolbar_buttons.png)](/assets/images/eclipse/debug_toolbar_buttons.png)
You can execute one line using `Step Over` [![Step Over button](/assets/images/eclipse/debug_step_over.png)](/assets/images/eclipse/debug_step_over.png) (`F6`), go into a method using `Step Into` [![Step Into button](/assets/images/eclipse/debug_step_into.png)](/assets/images/eclipse/debug_step_into.png) (F5) or continue executing the program until the next breakpoint with `Resume` [![Resume button](/assets/images/eclipse/debug_resume.png)](/assets/images/eclipse/debug_resume.png) (`F8`).

<a id="generating">&nbsp;</a>
## Generating Code

Sometimes you might need to write repetitive code that doesn't contain much business logic and can be generated using information from existing code. An example of this is getters/setters or `equals`/`hashCode`/`toString` methods which typically just need to access some fields. While it is often preferable to use [records](/learn/records), Eclipse allows comes with functionality to generate these pieces of repetitive code.

In order to do this, you first need to create a class with some fields you want to generate these methods for. In this example, we will create a `Person` class that stores the first name, last name and age of a person.
```java
public class Person {
	private String firstName;
	private String lastName;
	private int age;
	//we want to generate code here
	
}
```

When right-clicking in that class, there is an option called `Source` providing various ways to generate code. Here, we can select `Generate Getters and Setters...` in order to generate accessor methods for the fields in the `Person` class.  

[![Generate Getters and Setters](/assets/images/eclipse/context_generate_getters_setters.png)](/assets/images/eclipse/context_generate_getters_setters.png)

This option should open up a new window allowing us to configure which fields we want to generate accessors for. In order to create accessors for all fields, use the `Select All` button. and click `Generate` on the bottom right. 

[![Generate Getters and Setters](/assets/images/eclipse/getter_setter_modal.png)](/assets/images/eclipse/getter_setter_modal.png)

After doing this, the class should look as follows:
```java
public class Person {
	private String firstName;
	private String lastName;
	private int age;
	//we want to generate code here
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	
}
```

Similarly, it is possible to generate the `hashCode` and `equals` methods using the menu `Source` > `Generate hashCode() and equals()...`.  
[![Generate hashCode and equals](/assets/images/eclipse/context_generate_hashcode_equals.png)](/assets/images/eclipse/generate_hashcode_equals.png)

This also opens a window which allows to select the fields to include in the `hashCode` and `equals` methods.  
[![Selecting fields to use in hashCode and equals](/assets/images/eclipse/hashcode_equals_modal.png)](/assets/images/eclipse/hashcode_equals_modal.png)

After clicking `Generate`, Eclipse automatically adds these methods to the class.
```java
import java.util.Objects;

public class Person {
	private String firstName;
	private String lastName;
	private int age;
	//we want to generate code here
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	@Override
	public int hashCode() {
		return Objects.hash(age, firstName, lastName);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Person other = (Person) obj;
		return age == other.age && Objects.equals(firstName, other.firstName)
				&& Objects.equals(lastName, other.lastName);
	}
	
}
```

Another method that is often generated is `toString()` which returns a `String` representation of the object.
To generate that method, select `Generate toString()...` in the `Source` menu.  

[![Generate toString](/assets/images/eclipse/context_tostring.png)](/assets/images/eclipse/context_tostring.png)

As before, this opens a window allowing to specify options on how exactly the code should be generated.

[![Options for toString](/assets/images/eclipse/tostring_options.png)](/assets/images/eclipse/tostring_options.png)

Using the `Generate` button, Eclipse generates the `toString` method as it did with the other methods before.
```java
import java.util.Objects;

public class Person {
	private String firstName;
	private String lastName;
	private int age;
	//we want to generate code here
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	@Override
	public int hashCode() {
		return Objects.hash(age, firstName, lastName);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Person other = (Person) obj;
		return age == other.age && Objects.equals(firstName, other.firstName)
				&& Objects.equals(lastName, other.lastName);
	}
	@Override
	public String toString() {
		return "Person [firstName=" + firstName + ", lastName=" + lastName + ", age=" + age + "]";
	}
	
}
```


<a id="refactoring">&nbsp;</a>
## Refactoring

When working on Java applications, it is often necessary to change existing code in various ways while preserving functionality. Eclipse supports developers doing that by providing various refactoring options. An example of that is renaming class, methods or fields. This can be done by clicking on a class, method or variable name, right-clicking and selecting `Refactor` > `Rename`.  

[![Rename context menu](/assets/images/eclipse/context_rename.png)](/assets/images/eclipse/context_rename.png)

It is then possible to change to name to something different and confirming it using the `Enter` key. This also updates all references to the renamed element.  

[![Renaming a class name](/assets/images/eclipse/rename_box.png)](/assets/images/eclipse/rename_box.png)

[![Renaming a class name](/assets/images/eclipse/rename_different_text.png)](/assets/images/eclipse/rename_different_text.png)


<a id="summary">&nbsp;</a>
## Summary

As you can see, the Eclipse IDE provides a lot of tools that help developers writing Java applications. While this article shows some, Eclipse comes with many more features which can be especially useful when working on bigger applications. If you are interested in reading more, check out the [Java Development user guide](https://help.eclipse.org/latest/index.jsp?nav=%2F1).