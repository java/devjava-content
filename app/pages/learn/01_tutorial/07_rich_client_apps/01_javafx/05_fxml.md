---
id: javafx.fundamentals.fxml
title: Using FXML
slug: learn/javafx/fxml
type: tutorial-group
group: rich-client-apps
category: javafx
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Declare Scene Graph Nodes with FXML {intro}
- Controller Class {controller-class}
- JavaFX Application Class {javafx-app-class}
- Adding CSS {add-css}
- Using Scene Builder {scene-builder}
description: "Control nodes by manipulating their properties. "
last_update: 2023-09-12
author: ["GailC.Anderson", "PaulAnderson"]
byline: 'and is from <a href="https://link.springer.com/book/10.1007/978-1-4842-7268-8">The Definitive Guide to Modern Java Clients with JavaFX 17</a> graciously contributed by Apress.'
---

<a id="intro">&nbsp;</a>
## Declare Scene Graph Nodes with FXML

You’ve seen how JavaFX APIs create scene graph nodes and configure them for you. The `MyShapes` and `MyShapesProperties` programs use only JavaFX code to build and configure these objects. An alternative approach is to declare scene graph nodes with FXML, a markup notation based on XML. FXML lets you describe and configure your scene graph in a declarative format. This approach has several advantages:
*	FXML markup structure is hierarchical, so it reflects the structure of your scene graph.
*	FXML describes your view and supports a Model-View-Controller (MVC) architecture, providing better structure for larger applications.
*	FXML reduces the JavaFX code you have to write to create and configure scene graph nodes.
*	You can design your UI with Scene Builder. This drag-and-drop tool is a stand-alone application that provides a visual rendering of your scene. And Scene Builder generates the FXML markup for you.
*	You can also edit your FXML markup with text and IDE editors.

FXML affects the structure of your program. The main application class now invokes an [`FXMLLoader`](javafxdoc:FXMLLoader). This loader parses your FXML markup, creates JavaFX objects, and inserts the scene graph into the scene at the root node. You can have multiple FXML files, and typically each one has a corresponding JavaFX controller class. This controller class may include event handlers or other statements that dynamically update the scene. 
The controller also includes business logic that manages a specific view.

Let’s return to our `MyShapes` example (now called `MyShapesFXML`) and use an FXML file for the view and CSS for styling. Below you can see the files in our program, arranged for use with build tools or IDEs.

[![MyShapesFXML with FXML and CSS](/assets/images/javafx/myshapes-fxml-css.png)](/assets/images/javafx/myshapes-fxml-css.png)

The JavaFX source code appears under the java subdirectory. The resources subdirectory contains the FXML and CSS files (here `Scene.fxml` and `Styles.css`).

This program includes a rotating [`StackPane`](javafxdoc:StackPane), [`VBox`](javafxdoc:VBox) control, and second [`Text`](javafxdoc:Text) object. `Scene.fxml` describes our scene graph: a top-level [`VBox`](javafxdoc:VBox) that includes a [`StackPane`](javafxdoc:StackPane) and [`Text`](javafxdoc:Text) element. The [`StackPane`](javafxdoc:StackPane) includes the [`Ellipse`](javafxdoc:Ellipse) and [`Text`](javafxdoc:Text) shapes.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?import javafx.scene.effect.DropShadow?>
<?import javafx.scene.effect.Reflection?>
<?import javafx.scene.layout.StackPane?>
<?import javafx.scene.layout.VBox?>
<?import javafx.scene.paint.LinearGradient?>
<?import javafx.scene.paint.Stop?>
<?import javafx.scene.shape.Ellipse?>
<?import javafx.scene.text.Font?>
<?import javafx.scene.text.Text?>
<VBox alignment="CENTER" prefHeight="350.0" prefWidth="350.0" spacing="50.0"
 xmlns="http://javafx.com/javafx/10.0.1" xmlns:fx=http://javafx.com/fxml/1
 fx:controller="org.modernclient.FXMLController">
    <children>
        <StackPane fx:id="stackPane" onMouseClicked="#handleMouseClick"
                               prefHeight="150.0" prefWidth="200.0">
            <children>
                <Ellipse radiusX="110.0" radiusY="70.0">
                    <fill>
                        <LinearGradient endX="0.5" endY="1.0" startX="0.5">
                            <stops>
                                <Stop color="DODGERBLUE" />
                                <Stop color="LIGHTBLUE" offset="0.5" />
                                <Stop color="LIGHTGREEN" offset="1.0" />
                            </stops>
                        </LinearGradient>
                    </fill>
                    <effect>
                        <DropShadow color="GREY" offsetX="5.0"
                                                 offsetY="5.0" />
                    </effect>
                </Ellipse>
                <Text text="My Shapes">
                    <font>
                        <Font name="Arial Bold" size="24.0" />
                    </font>
                    <effect>
                        <Reflection fraction="0.8" topOffset="1.0" />
                    </effect>
                </Text>
            </children>
        </StackPane>
        <Text fx:id="text2" text="Animation Status: ">
            <font>
                <Font name="Arial Bold" size="18.0" />
            </font>
        </Text>
    </children>
</VBox>
```
The top-level container includes the name of the JavaFX controller class with attribute fx:controller. The [`VBox`](javafxdoc:VBox) specifies its alignment, preferred sizes, and spacing followed by its children: the [`StackPane`](javafxdoc:StackPane) and [`Text`](javafxdoc:StackPane). 
Here, we configure the [`StackPane`](javafxdoc:StackPane) with preferred sizing. A special attribute `fx:id` specifies a variable name corresponding to this node. 
In the JavaFX controller class, you’ll now see this variable name annotated with `@FXML` for the [`StackPane`](javafxdoc:StackPane). This is how you access objects in the controller class that are declared in FXML files.

In addition, [`StackPane`](javafxdoc:StackPane) specifies an `onMouseClicked` event handler called `#handleMouseClick`. This event handler is also annotated with `@FXML` in the JavaFX controller class.

Here, the [`StackPane`](javafxdoc:StackPane) children, [`Ellipse`](javafxdoc:Ellipse) and [`Text`](javafxdoc:Text), are declared inside the Children FXML node. Neither has associated `fx:id` attributes, since the controller class does not need to access these objects. You also see the linear gradient, drop shadow, and reflection effect configurations.

Note that the [`Text`](javafxdoc:Text) object with `fx:id text2` appears after the [`StackPane`](javafxdoc:StackPane) definition. This makes the second [`Text`](javafxdoc:Text) object appear under the [`StackPane`](javafxdoc:StackPane) in the [`VBox`](javafxdoc:VBox). We also specify an `fx:id` attribute to access this node from the JavaFX controller.
<a id="controller-class">&nbsp;</a>
## Controller Class

Let’s show you the controller class now. You’ll notice the code is more compact, since object instantiations and configuration code are no longer done with Java statements. All that is now specified in the FXML markup. 

```java
package org.modernclient;
import javafx.animation.Animation;
import javafx.animation.Interpolator;
import javafx.animation.RotateTransition;
import javafx.beans.binding.When;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import javafx.util.Duration;
import java.net.URL;
import java.util.ResourceBundle;
public class FXMLController implements Initializable {
    @FXML
    private StackPane stackPane;
    @FXML
    private Text text2;
    private RotateTransition rotate;
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        rotate = new RotateTransition(Duration.millis(2500), stackPane);
        rotate.setToAngle(360);
        rotate.setFromAngle(0);
        rotate.setInterpolator(Interpolator.LINEAR);
        rotate.statusProperty().addListener(
                           (observableValue, oldValue, newValue) -> {
            text2.setText("Was " + oldValue + ", Now " + newValue);
        });
        text2.strokeProperty().bind(new When(rotate.statusProperty()
                 .isEqualTo(Animation.Status.RUNNING))
                 .then(Color.GREEN).otherwise(Color.RED));
    }
    @FXML
    private void handleMouseClick(MouseEvent mouseEvent) {
        if (rotate.getStatus().equals(Animation.Status.RUNNING)) {
            rotate.pause();
        } else {
            rotate.play();
        }
    }
}
```

The controller class implements [`Initializable`](javafxdoc:Initializable) and overrides method `initialize()`, which is invoked for you at runtime. Importantly, the private class fields `stackPane` and `text2` are annotated with `@FXML`. 
The `@FXML` annotation associates variable names in the controller class to the objects described in the FXML file. There is no code in the controller class that creates these objects because the [`FXMLLoader`](javafxdoc:FXMLLoader) does that for you.

The `initialize()` method does three things here. First, it creates and configures the [`RotateTransition`](javafxdoc:RotateTransition) and applies it to the `stackPane` node. Second, it adds a change listener to the transition’s status property. 
And third, a bind expression for the `text2` stroke property specifies its color based on the rotate transition’s status.

The `@FXML` annotation with `handleMouseClick()` indicates that the FXML file configures the event handler. This mouse click event handler starts and stops the rotate transition’s animation.
<a id="javafx-app-class">&nbsp;</a>
## JavaFX Application Class

The main application class, `MyShapesFXML`, now becomes very simple. Its job is to invoke the [`FXMLLoader`](javafxdoc:FXMLLoader), which parses the FXML (`Scene.fxml`), builds the scene graph, and returns the scene graph root. All you have to do is build the scene object and configure the stage as before, as shown below.

```java
package org.modernclient;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.paint.Color;
import javafx.stage.Stage;
public class MyShapesFXML extends Application {
    @Override
    public void start(Stage stage) throws Exception {
        Parent root = FXMLLoader.load(getClass()
                           .getResource("/fxml/Scene.fxml"));
        Scene scene = new Scene(root, Color.LIGHTYELLOW);
        scene.getStylesheets().add(getClass()
            .getResource("/styles/Styles.css").toExternalForm());
        stage.setTitle("MyShapesApp with JavaFX");
        stage.setScene(scene);
        stage.show();
    }
    public static void main(String[] args) {
        launch(args);
    }
}
```
<a id="add-css">&nbsp;</a>
## Adding CSS

Now let’s show you how to incorporate your own styles with CSS. One advantage of JavaFX is its ability to style nodes with CSS. 
JavaFX comes bundled with a default stylesheet, `Modena.css`. You can augment these default styles or replace them with new ones. Our example CSS file found in file Styles.css is a single style class (`mytext`) that sets its font style to italic:

```css
.mytext {
    -fx-font-style: italic;
}
```

To use this stylesheet, you must first load the file, either in the application’s `start()` method or in the FXML file. Once the file is added to the available stylesheets, you can apply the style classes to a node. To apply individually defined style classes to a specific node, for instance, use:

```java
text2.getStyleClass().add("mytext");
```

Here, `mytext` is the style class and `text2` is the second [`Text`](javafxdoc:Text) object in our program.
Alternatively, you can specify the stylesheet in the FXML file. The advantage of this approach is that styles are now available inside Scene Builder. Here is the modified `Scene.fxml` file that loads this customized CSS file and applies the customized CSS style class to the `text2 Text` node:

```xml 
. . .
<VBox alignment="CENTER" prefHeight="350.0" prefWidth="350.0" spacing="50.0"
stylesheets="@../styles/Styles.css"
xmlns="http://javafx.com/javafx/10.0.1"
xmlns:fx="http://javafx.com/fxml/1"
fx:controller="org.modernclient.FXMLController">
<children>

<StackPane fx:id="stackPane" onMouseClicked="#handleMouseClick" prefHeight="150.0" prefWidth="200.0">
           . . . code removed . . .
        </StackPane>
        <Text fx:id="text2" styleClass="mytext" text="Animation Status: ">
            <font>
                <Font name="Arial Bold" size="18.0" />
            </font>
        </Text>
    </children>
</VBox>
```
<a id="scene-builder">&nbsp;</a>
## Using Scene Builder

Scene Builder was originally developed at Oracle and is now open sourced. It is available for download from Gluon here: https://gluonhq.com/products/scene-builder/. 
Scene Builder is a stand-alone drag-and-drop tool for creating JavaFX UIs. You can see below the main Scene Builder window with file `Scene.fxml` from the `MyShapesFXML` program.

[![FXML file with Scene Builder for MyShapesFXML](/assets/images/javafx/scene-builder.png)](/assets/images/javafx/scene-builder.png)

The upper-left window shows the JavaFX component library. This library includes containers, controls, shapes, 3D, and more. From this window, you select components and drop them onto your scene in the middle visual view or onto the `Document` window shown in the lower-left area.

The `Document` window shows the scene graph hierarchy. You can select components and move them within the tree. The right window is an `Inspector` window that lets you configure each component, including its properties, layout settings, and code. In this figure, the [`StackPane`](javafxdoc:StackPane) is selected in the `Document` hierarchy window and appears in the center visual view. 
In the `Inspector` window, the `OnMouseClicked` property is set to `#handleMouseClick`, which is the name of the corresponding method in the JavaFX controller class.

Scene Builder is particularly helpful when building real-world form-based UIs. You can visualize your scene hierarchy and easily configure layout and alignment settings.

