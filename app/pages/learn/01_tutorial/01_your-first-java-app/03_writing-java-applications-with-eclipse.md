---
id: first_app.eclipse
title: Developing Java applications using the Eclipse IDE
slug: learn/eclipse
type: tutorial
category: start
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
toc:
- Introduction and Installation {intro}
- Creating Java projects {creating}
- Content Assist {content_assist}
- Dealing with compilation errors and warnings {errors}
- Running a program {run}
- Debugging {debugging}
description: "Installing and getting started with the Eclipse IDE for developing Java applications"
last_update: 2024-04-02
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
## Creating Java projects

After installing Eclipse, you should have an empty workspace. In order to create a new Java project, click on the `File`-toolbar on the top left corner of the Eclipse window and select `New` > `Java Project`.  
[![File > New > Java Project](/assets/images/eclipse/file_create_project.png)](/assets/images/eclipse/file_create_project.png)

This will then open up a dialog that allows configuring information about the project. You will need to enter a name next to `Project name:` at the top. For example, you can choose the name `HelloWorld`. In the `Module` section at the bottom, disable the option `Create module-info.java file`. If necessary, it is possible to configure a custom Java installation in the `JRE` box.  
[![Java project creation dialog](/assets/images/eclipse/create_java_project.gif)](/assets/images/eclipse/create_java_project.gif)

This creates a Java project that is shown on the left side of the Eclipse window. When expanding this project, there should be a folder named `src`. Java classes can be created inside this directory by right-clicking on it and selecting `New` > `Class`.  
[![New > Class](/assets/images/eclipse/create_class.png)](/assets/images/eclipse/create_class.png)

This opens a dialog similar to the project creation dialog. It allows specifying various options about the class you want to create. For now, you will need to enter a class name like `HelloWorld`. If you want to, you can also configure a package which can be used to group multiple classes together.  
[![Java class creation dialog](/assets/images/eclipse/java_class_creation.png)](/assets/images/eclipse/java_class_creation.png)

<a id="content_assist">&nbsp;</a>
## Content Assist

Eclipse can help you write Java code by automatically completing parts of it. When pressing the key combination `Ctrl`+`Space` (or `⌘`+`Space` on MacOS or `Alt`+`/` on chinese systems) while editing Java code, Eclipse automatically suggests ways to complete the code. These suggestions can be confirmed by pressing `Enter` or double-clicking on the suggestions.

For example, typing `main` in a class followed by pressing `Ctrl`+`Space` suggests adding a main method.  
[![Content assist suggesting a main method](/assets/images/eclipse/content_assist_main.png)](/assets/images/eclipse/content_assist_main.png)

Inside methods, Eclipse can suggest changing `sysout` to a `System.out.println();` statement.  
[![Content assist suggesting a System.out statement](/assets/images/eclipse/content_assist_sysout.png)](/assets/images/eclipse/content_assist_sysout.png)

Furthermore, it can complete class and method names.  
[![Content assist completing the class name String](/assets/images/eclipse/content_assist_suggest_class.png)](/assets/images/eclipse/content_assist_suggest_class.png)
[![Content assist completing the method String#length](/assets/images/eclipse/content_assist_suggest_method.png)](/assets/images/eclipse/content_assist_suggest_method.png)

<a id="errors">&nbsp;</a>
## Dealing with compilation errors and warnings

When Eclipse detects a compilation error, the relevant lines are underlined in red. When hovering over the line with the error or the error icon to the left of the said line, Eclipse provides information about what went wrong and also suggests how to fix the error. However, in many cases there are multiple ways to get rid of the error. You need to carefully check whether the suggestions are actually matching what you want to do. After all, IDEs cannot predict your intent.  
[![Compilation error due to calling a non-existing method](/assets/images/eclipse/compilation_error.png)](/assets/images/eclipse/compilation_error.png)

Furthermore, Eclipse shows a list of errors in the `Problems` view. If this view is not displayed, it can be shown using the menu `Window` > `Show View` > `Problems`.  
[![opening Problems view](/assets/images/eclipse/open_problems_view.png)](/assets/images/eclipse/open_problems_view.png)
[![Problems view showing an error](/assets/images/eclipse/problems_view.png)](/assets/images/eclipse/problems_view.png)

As with Errors, Eclipse can also detect code that compiles but likely contains some issues or is pointless. In this case, Eclipse will display a warning.  
[![Warning due to unused variable](/assets/images/eclipse/warning.png)](/assets/images/eclipse/warning.png)
[![Problems view showing a warning](/assets/images/eclipse/problems_view_warning.png)](/assets/images/eclipse/problems_view_warning.png)

<a id="run">&nbsp;</a>
## Running a program

In order to run a Java application, you first need to have a class with a `main` method. You can right-click the class in the package explorer or right-click in the editor where you are writing the code for the class and select `Run as` > `Java application`.  
[![Run As > Java application in the editor](/assets/images/eclipse/run_as_editor.png)](/assets/images/eclipse/run_as_editor.png)  
[![Run As > Java application in the editor](/assets/images/eclipse/run_as_package_explorer.png)](/assets/images/eclipse/run_as_package_explorer.png)

Alternatively, you can run the application using the Run [![Run button](/assets/images/eclipse/run_button.png)](/assets/images/eclipse/run_button.png) button in the toolbar. [![Run button in toolbar](/assets/images/eclipse/run_buttons_toolbar.png)](/assets/images/eclipse/run_buttons_toolbar.png)

When running the program, Eclipse should show the output of the program in the `Console` view.  
[![Program with output in console](/assets/images/eclipse/console_output.png)](/assets/images/eclipse/console_output.png)

<a id="debugging">&nbsp;</a>
## Debugging in Eclipse

When a program doesn't do what you expect it to do, you might want to debug it. The process of debugging is explained in [this article](/learn/debugging). Eclipse provides a lot of functionality making it easy to debug Java applications.

In order to debug an application, you need to set a breakpoint. When the execution hits that breakpoint, the program will temporarily stop ("suspend"), allow you to inspect its current state and step through the program. To set a breakpoint, you need to double-click on the area to the left of the line you want to stop execution at. After doing that, a blue dot should appear there.  
[![A breakpoint next to source code](/assets/images/eclipse/breakpoint.png)](/assets/images/eclipse/breakpoint.png)

When running a program normally, it will ignore all breakpoints. For debugging, you need to run the program in debug mode. This can be done by clicking on the green button with the bug icon [![The debug button](/assets/images/eclipse/debug_button.png)](/assets/images/eclipse/debug_button.png) next to the run button or using `Debug As` > `Java Application`.  
[![The debug button next to run buttons](/assets/images/eclipse/debug_button_in_toolbar.png)](/assets/images/eclipse/debug_button_in_toolbar.png)

When the execution hits a breakpoint in debug mode, Eclipse will ask you to switch to the Debug perspective. This perspective gives you more information about the program you are currently debugging so you likely want to do this and click on the `Switch` button.  
[![Eclipse asking to switch to the Debug perspective](/assets/images/eclipse/debug_perspective_switch.png)](/assets/images/eclipse/debug_perspective_switch.png)

Upon opening the debug perspective, you should still see your code in the middle. However, there should be one line with a green background next to the breakpoint. This indicates the next line the program would execute. On the right side, you should see a `Variables` view containing a list of variables and their current values.
[![The debug perspective](/assets/images/eclipse/debug_perspective.png)](/assets/images/eclipse/debug_perspective.png)

While the program is suspended, you can tell it how to continue executing using buttons in the toolbar at the top.
[![Buttons for controlling execution flows in the toolbar](/assets/images/eclipse/debug_toolbar_buttons.png)](/assets/images/eclipse/debug_toolbar_buttons.png)
You can execute one line using `Step Over` [![Step Over button](/assets/images/eclipse/debug_step_over.png)](/assets/images/eclipse/debug_step_over.png) (`F6`), go into a method using `Step Into` [![Step Into button](/assets/images/eclipse/debug_step_into.png)](/assets/images/eclipse/debug_step_into.png) (F5) or continue execution until the next breakpoint with `Resume` [![Resume button](/assets/images/eclipse/debug_resume.png)](/assets/images/eclipse/debug_resume.png) (`F8`).
