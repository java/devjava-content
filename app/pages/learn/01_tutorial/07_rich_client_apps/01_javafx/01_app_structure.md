---
id: javafx.fundamentals.structure
title: JavaFX Application Basic Structure By Example
slug: learn/javafx/structure
type: tutorial-group
group: rich-client-apps
category: javafx
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- JavaFX Stage and Scene Graph {stage-scene}
- JavaFX Is Single-Threaded {single-threaded}
- Hierarchical Node Structure {hierarchical-node-structure}
- A Simple Shape Example {shape}
- Color {color}
- Text Is a Shape {text}
- The JavaFX Coordinate System {coordinate-system}
description: "Explore JavaFX application components and build a simple application."
last_update: 2023-09-11
author: ["GailC.Anderson", "PaulAnderson"]
---

<a id="stage-scene">&nbsp;</a>
## JavaFX Stage and Scene Graph

A JavaFX application is controlled by the JavaFX platform, a runtime system that builds your application object and constructs the `JavaFX Application Thread`. To build a JavaFX application, you must extend the `JavaFX Application` class.
The JavaFX runtime system controls the Application lifecycle and invokes the Application `start()` method.

JavaFX uses a theater metaphor: the top-level container is the `Stage` and is constructed by the platform for you. In desktop applications, the `Stage` is the window. Its appearance depends on the host system and varies among Mac OS X, Windows, and Linux platforms. 
Normally, the window is decorated with controls that resize, minimize, and quit your application. It’s also possible to construct undecorated windows. You can specialize the Application class for other environments, too. For example, with the `Gluon Mobile Application` framework, your program extends Mobile Application, an application class specifically written for mobile devices.
<a id="single-threaded">&nbsp;</a>
## JavaFX Is Single-Threaded

You must always construct and modify the `Stage` and its scene objects on the `JavaFX Application Thread`. Note that JavaFX (like `Swing`) is a single-threaded UI model. For the JavaFX developer, this is mostly a straightforward restriction. 
As you create UI elements, respond to event handlers, manage dynamic content with animation, or make changes in the scene graph, work continues to execute on the JavaFX Application Thread.

To keep the UI responsive, however, you should assign long-running work to background tasks in separate threads. In this case, work that modifies the UI must be separate from work being executed on a background thread. 
Fortunately, JavaFX has a well-developed concurrency API that helps developers assign long-running tasks to one or more separate threads. This keeps the UI thread responsive to user events.
<a id="hierarchical-node-structure">&nbsp;</a>
## Hierarchical Node Structure

Continuing with the theater metaphor, the `Stage` holds a scene. The scene consists of JavaFX elements such as the root, which is the top scene element and contains what is called the scene graph.

The scene graph is a strictly hierarchical structure of elements that visualize your application. These elements are called Nodes. A Node has exactly one parent (except the root node) and may contain other Nodes. Or, a Node can be a leaf node with no children. Nodes must be added to the scene graph in order to participate in the rendering of that scene. 
Furthermore, a Node may be added only once to a scene, unless it is first removed and then added somewhere else.

Parent nodes in general manage their children by arranging them within the scene according to layout rules and any constraints you configure. JavaFX uses a two-dimensional coordinate system for 2D graphics with the origin at the upper-left corner of the scene, 
as shown in the figure below. Coordinate values on the x-axis increase to the right, and y-axis values increase as you move down the scene.

[![JavaFX 2D coordinate system](/assets/images/javafx/javafx-coordinates.png)](/assets/images/javafx/javafx-coordinates.png)

JavaFX also supports 3D graphics and represents the third dimension with z-axis values, providing depth. 
JavaFX has an absolute coordinate system, in addition to local coordinate systems that are relative to the parent. In each case, the coordinate system’s origin is the upper-left corner of the parent. 
In general, layout controls hide the complexities of component placement within the scene and manage the placement of its children for you. Component placement is based on the specific layout control and how you configure it.
It’s also possible to nest layout controls. For example, you can place multiple VBox controls in an `HBox` or put an `AnchorPane` into one pane of a `SplitPane` control. Other parent nodes are more complex visual nodes, such as `TextField`, `TextArea`, and `Button`. 
These nodes have managed subparts. For example, `Button` includes a labeled text part and optional graphic. This graphic can be any node type but is typically an image or icon.

Recall that leaf nodes have no child nodes. Examples include `Shape` (such as `Rectangle`, `Ellipse`, `Line`, `Path`, and `Text`) and `ImageView`, a node for rendering an image.

Just a word of warning: you should be using a plain text editor to create and save this file. Using a word processor will not work.
<a id="shape">&nbsp;</a>
## A Simple Shape Example

The picture below shows a simple JavaFX application called `MyShapes` that displays an ellipse and a text element centered in an application window. The appearance of this window varies depending on the underlying platform. 
When you resize the window, the visible elements will remain centered in the resized space. Even though this is a simple program, there’s much to learn here about JavaFX rendering, layout features, and nodes.

[![MyShapes application](/assets/images/javafx/myshapes-application.png)](/assets/images/javafx/myshapes-application.png)

The source code for this application is in the `MyShapes` program. Class `MyShapes` is the main class and extends `Application`. The JavaFX runtime system instantiates `MyShapes` as well as the primary Stage, which it passes to the overridden `start()` method. The runtime system invokes the `start()` method for you.

```java
package org.modernclient;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Ellipse;
import javafx.scene.text.Font;
import javafx.scene.text.Text;
import javafx.stage.Stage;
public class MyShapes extends Application {
    @Override
    public void start(Stage stage) throws Exception {
        // Create an Ellipse and set fill color
        Ellipse ellipse = new Ellipse(110, 70);
        ellipse.setFill(Color.LIGHTBLUE);
        // Create a Text shape with font and size
        Text text = new Text("My Shapes");
        text.setFont(new Font("Arial Bold", 24));
        StackPane stackPane = new StackPane();
        stackPane.getChildren().addAll(ellipse, text);
        Scene scene = new Scene(stackPane, 350, 230,
                       Color.LIGHTYELLOW);
        stage.setTitle("MyShapes with JavaFX");
        stage.setScene(scene);
        stage.show();
    }
    public static void main(String[] args) {
        launch(args);
    }
}
```

Note the import statements that reference packages in `javafx.application`, `javafx.scene`, and `javafx.stage`.

---
**NOTE**: Be sure to specify the correct package for any import statements. Some JavaFX classes, such as Rectangle, have the same class name as their AWT or Swing counterparts. All JavaFX classes are part of package `javafx`.

---

This program creates several nodes and adds them to a `StackPane` layout container. The program also creates the scene, configures the stage, and shows the stage. Let’s look at these steps in detail.

First, we create an `Ellipse` shape, providing a width and height in pixels. Since `Ellipse` extends `Shape`, we can also configure any `Shape` property. This includes fill, which lets you specify an interior paint value.
<a id="color">&nbsp;</a>
## Color

A `Shape`’s fill property can be a JavaFX color, a linear gradient, a radial gradient, or an image. Let’s briefly discuss color. You can specify colors in JavaFX several ways. 
Here, we set the `Ellipse` fill property to `Color.LIGHTBLUE`. 

```java
// Create an Ellipse and set fill color
Ellipse ellipse = new Ellipse(110, 70);
ellipse.setFill(Color.LIGHTBLUE);
```

There are currently 147 predefined colors in the JavaFX Color class, named alphabetically from `ALICEBLUE` to `YELLOWGREEN`. However, you can also specify `Color` using web RGB values with either hexadecimal notation or decimal numbers. 
You can optionally provide an alpha value for transparency. Fully opaque is 1 and fully transparent is 0. A transparency of .5, for example, shows the color but lets the background color show through as well.
Here are a few examples that set a shape’s fill with `Color`:

```java
ellipse.setFill(Color.LIGHTBLUE);              // Light blue, fully opaque
ellipse.setFill(Color.web("#ADD8E6"));         // Light blue, fully opaque
ellipse.setFill(Color.web("#ADD8E680"));       // Light blue, .5 opaque
ellipse.setFill(Color.web("0xADD8E6"));        // Light blue, fully opaque
ellipse.setFill(Color.web("0xADD8E680"));      // Light blue, .5 opaque
ellipse.setFill(Color.rgb(173, 216, 230));     // Light blue, fully opaque
ellipse.setFill(Color.rgb(173, 216, 230, .5)); // Light blue, .5 opaque
```

Notably, you can interpolate a color’s values, and that is how JavaFX constructs gradients. We’ll show you how to create a linear gradient shortly.
<a id="text">&nbsp;</a>
## Text

We next create a Text object. Text is also a `Shape` with additional properties, such as font, text alignment, text, and wrapping width. The constructor provides the text and the `setFont()` method sets its font.

```java
// Create a Text shape with font and size
Text text = new Text("My Shapes");
text.setFont(new Font("Arial Bold", 24));
```
<a id="coordinate-system">&nbsp;</a>
## The JavaFX Coordinate System

Note that we created the ellipse and text nodes, but they are not yet in our scene graph. Before we add them to the scene, we must put these nodes in some kind of layout container. Layout controls are extremely important in managing your scene graph. 
These controls not only arrange components for you but also respond to events such as resizing, the addition or removal of elements, and any changes to the sizes of one or more nodes in the scene graph.

To show you just how important layout controls are, let’s replace the `StackPane` from the original example with a `Group` and specify the placement manually. 
`Group` is a parent node that  manages its children but does not provide any layout capability. Here we create a group and add the ellipse and text elements with the constructor. We then specify group as the scene’s root node:

```java
Group group = new Group(ellipse, text);
. . .
Scene scene = new Scene(group, 350, 230, Color.LIGHTYELLOW);
```

Group uses default alignment settings for its children and places everything at the origin (0,0), the upper-left corner of the scene. For Text, the default placement is the bottom-left edge of the text element. 
In this case, the only visible portions will be the letters that extend below the bottom edge (the lower case `y` and `p` letters of `MyShapes`). The ellipse will be centered at the group origin (0,0), and therefore only the lower-right quadrant will be visible.
This arrangement is clearly not what we want. To fix this, let’s manually center the shapes in the 350 × 230 scene, as follows:

```java
Group group = new Group(ellipse, text);
// Manually placing components is tedious and error-prone
ellipse.setCenterX(175);
ellipse.setCenterY(115);
text.setX(175-(text.getLayoutBounds().getWidth()/2));
text.setY(115+(text.getLayoutBounds().getHeight()/2));
. . .
Scene scene = new Scene(group, 350, 230, Color.LIGHTYELLOW);
```

Now the shapes will be nicely centered in the scene. But this is still not ideal. The shapes will remain stuck in the scene at these coordinates when the window resizes (unless you write code that detects and reacts to window resizing). 
And you don’t want to do that. Instead, use JavaFX layout controls!
