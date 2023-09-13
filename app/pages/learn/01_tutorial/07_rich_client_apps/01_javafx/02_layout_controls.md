---
id: javafx.fundamentals.layout
title: JavaFX Layout Controls
slug: learn/javafx/layout
type: tutorial-group
group: rich-client-apps
category: javafx
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Introduction {intro}
- StackPane {stackpane}
- AnchorPane {anchorpane}
- GridPane {gridpane}
- FlowPane and TilePane {flow-tile-pane}
- BorderPane {borderpane}
- SplitPane {splitpane}
- HBox, VBox, and ButtonBar {box-button}
- Make a Scene {make-scene}
description: "Let's take a tour of some common JavaFX layout controls."
last_update: 2023-09-12
author: ["GailC.Anderson", "PaulAnderson"]
byline: 'and is from <a href="https://link.springer.com/book/10.1007/978-1-4842-7268-8">The Definitive Guide to Modern Java Clients with JavaFX 17</a> graciously contributed by Apress.'
---

<a id="intro">&nbsp;</a>
## Introduction
To manage the nodes of a scene, you use one or more of these controls. Each control is designed for a particular layout configuration. Furthermore, you can nest layout controls to manage groups of nodes and specify how the layout should react to events, such as resizing or changes to the managed nodes. 
You can specify alignment settings as well as margin controls and padding.

There are several ways to add nodes to layout containers. You can add child nodes with the layout container’s constructor. You can also use method `getChildren().add()` for a single node and method `getChildren().addAll()` for multiple nodes. In addition, some layout controls have specialized methods for adding nodes. 
Let’s look at a few commonly used layout controls now to show you how JavaFX can compose a scene for you.
<a id="stackpane">&nbsp;</a>
## StackPane

A convenient and easy layout container is `StackPane`. This layout control stacks its children from back to front in the order that you add nodes. Note that we add the ellipse first so that it appears behind the text node. In the opposite order, the ellipse would obscure the text element.

By default, `StackPane` centers all of its children. You can provide a different alignment for the children or apply an alignment to a specific node in the `StackPane`. For example,

```java
// align the text only
stackPane.setAlignment(text, Pos.BOTTOM_CENTER);
```

centers the text node along the bottom edge of the StackPane. Now when you resize the window, the ellipse remains centered, and the text remains anchored to the bottom edge of the window. To specify the alignment of all managed nodes to the bottom edge, use

```java
// align all managed nodes
stackPane.setAlignment(Pos.BOTTOM_CENTER);
```

Although both the ellipse and the text appear at the bottom of the window, they won’t be centered relative to each other. Why not?
<a id="anchorpane">&nbsp;</a>
## AnchorPane

`AnchorPane` manages its children according to configured anchor points, even when a container resizes. You specify an offset from the pane’s edge for a component. Here, we add a Label to an AnchorPane and anchor it to the lower-left side of the pane with a 10-pixel offset:
```java
AnchorPane anchorPane = new AnchorPane();
Label label = new Label("My Label");
anchorPane.getChildren().add(label);
AnchorPane.setLeftAnchor(label, 10.0);
AnchorPane.setBottomAnchor(label, 10.0);
```

`AnchorPane` is typically used as a top-level layout manager for controlling margins, even when the window is resized.
<a id="gridpane">&nbsp;</a>
## GridPane

`GridPane` lets you place child nodes in a flexibly sized two-dimensional grid. Components can span rows and/or columns, but the row size is consistent for all components in a given row. Similarly, the column’s width is consistent for a given column. 
`GridPane` has specialized methods that add nodes to a particular cell designated by a column and row number. Optional arguments let you specify column and row span values. 
For example, the first label here is placed in the cell corresponding to column 0 and row 0. The second label goes into the cell corresponding to column 1 and row 0, and it spans two columns (the second and third columns). We must also provide a row span value (here it is set to 1):

```java
GridPane gridPane = new GridPane();
gridPane.add(new Label("Label1"), 0, 0);
gridPane.add(new Label("Label2 is very long"), 1, 0, 2, 1);
```

`GridPane` is useful for laying out components in forms that accommodate columns or rows of various sizes. `GridPane` also allows nodes to span either multiple columns or rows.
We use `GridPane` in our master-detail UI example (see _Putting It All Together_ section of this series).
<a id="flow-tile-pane">&nbsp;</a>
## FlowPane and TilePane

`FlowPane` manages its children in either a horizontal or vertical flow. The default orientation is horizontal. You can specify the flow direction with the constructor or use method `setOrientation()`. Here, we specify a vertical orientation with the constructor:

```java
FlowPane flowpane = new FlowPane(Orientation.VERTICAL);
```
`FlowPane` wraps child nodes according to a configurable boundary. If you resize a pane that contains a `FlowPane`, the layout will adjust the flow as needed. The size of the cells depends on the size of the nodes, and it will not be a uniform grid unless all the nodes are the same size. This layout is convenient for nodes whose sizes can vary, such as `ImageView` nodes or shapes. `TilePane` is similar to `FlowPane`, except `TilePane` uses equal-sized cells.
<a id="borderpane">&nbsp;</a>
## BorderPane

`BorderPane` is convenient for desktop applications with discreet sections, including a top toolbar (Top), a bottom status bar (Bottom), a center work area (Center), and two side areas (Right and Left). 
Any of the five sections can be empty. Here is an example of a `BorderPane` with a rectangle in the center and a label at the top:

```java
BorderPane borderPane = new BorderPane();
Label colorLabel = new Label("Color: Lightblue");
colorLabel.setFont(new Font("Verdana", 18));
borderPane.setTop(colorLabel);
Rectangle rectangle = new Rectangle(100, 50, Color.LIGHTBLUE);
borderPane.setCenter(rectangle);
BorderPane.setAlignment(colorLabel, Pos.CENTER);
BorderPane.setMargin(colorLabel, new Insets(20,10,5,10));
```
Note that `BorderPane` uses a center alignment by default for the center area and a left alignment for the top. To keep the top area label centered, we configure its alignment with `Pos.CENTER`. We also set margins around the label with BorderPane static method `setMargin()`. The `Insets` constructor takes four values corresponding to the top, right, bottom, and left edges. Similar alignment and margin configurations apply to other layout components, too.
<a id="splitpane">&nbsp;</a>
## SplitPane

`SplitPane` divides the layout space into multiple horizontally or vertically configured areas. The divider is movable, and you typically use other layout controls in each of `SplitPane`’s areas. 
We use `SplitPane` in our master-detail UI example (checkout _Putting It All Together_ part of these series).
<a id="box-button">&nbsp;</a>
## HBox, VBox, and ButtonBar

The `HBox` and `VBox` layout controls provide single horizontal or vertical placements for child nodes. You can nest `HBox` nodes inside a `VBox` for a grid-like effect or nest VBox nodes inside an HBox component. 
`ButtonBar` is convenient for placing a row of buttons of equal size in a horizontal container.
<a id="make-scene">&nbsp;</a>
## Make a Scene

Returning to `MyShapes`, the Scene holds the scene graph, defined by its root node. 

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
First, we construct the `Scene` and provide `stackPane` as the root node. We then specify its width and height in pixels and supply an optional fill argument for the background (`Color.LIGHTYELLOW`).
What’s left is to configure the Stage. We provide a title, set the scene, and show the stage. The JavaFX runtime renders our scene.
Below is a hierarchical view of the scene graph for our `MyShapes` application. The root node is the `StackPane`, which contains its two child nodes, `Ellipse` and `Text`.

[![MyShapes scene graph](/assets/images/javafx/myshapes-scene-graph.png)](/assets/images/javafx/myshapes-scene-graph.png)
