---
id: javafx.fundamentals.properties
title: JavaFX Properties
slug: learn/javafx/properties
type: tutorial-group
group: rich-client-apps
category: javafx
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Introduction {intro}
- Invalidation Listeners {invalidation-listeners}
- Change Listeners {change-listener}
- Binding {binding}
- Bidirectional Binding {unidir-binding}
- Unidirectional Binding {bidir-binding}
- Fluent API and Bindings API {fluent-api}
description: "Control nodes by manipulating their properties. "
last_update: 2023-09-12
author: ["GailC.Anderson", "PaulAnderson"]
byline: 'and is from <a href="https://link.springer.com/book/10.1007/978-1-4842-7268-8">The Definitive Guide to Modern Java Clients with JavaFX 17</a> graciously contributed by Apress.'
---

<a id="intro">&nbsp;</a>
## Introduction

JavaFX property listeners that apply to object properties (not collections) come in two flavors: invalidation listeners and change listeners. Invalidation listeners fire when a property’s value is no longer valid. 
For this example and the ones that follow, we’ll discuss the MyShapesProperties program, which is based on the previous `MyShapes` application. In this new program, we’ve added a second [`Text`](javafxdoc:Text) object placed in a [`VBox`](javafxdoc:VBox) layout control below the rotating [`StackPane`](javafxdoc:StackPane). 
Below you can see the updated scene graph with the top-level [`VBox`](javafxdoc:VBox).

[![MyShapesProperties scene graph](/assets/images/javafx/myshapes-properties.png)](/assets/images/javafx/myshapes-properties.png)
<a id="invalidation-listeners">&nbsp;</a>
## Invalidation Listeners

Invalidation listeners have a single method that you override with lambda expressions. Let’s show you the non-lambda expression first, so you can see the full method definition. 
When you click the [`StackPane`](javafxdoc:StackPane), the mouse click handler rotates the [`StackPane`](javafxdoc:StackPane) control as before. The second [`Text`](javafxdoc:Text) object displays the status of the [`RotationTransition`](javafxdoc:RotationTransition) animation, which is managed by the read-only status property. 
You’ll see either RUNNING, PAUSED, or STOPPED. The figure below shows the animation paused.

[![MyShapesProperties application with an invalidation listener](/assets/images/javafx/myshapes-properties-invalidation.png)](/assets/images/javafx/myshapes-properties-invalidation.png)

The invalidation listener includes an observable object that lets you access the property. Because the observable is nongeneric, you must apply an appropriate type cast to access the property value. 
Here’s one way to access the value of the animation’s status property in a listener attached to that property. Note that we attach the listener with the property getter method `statusProperty()`:

```java
rotate.statusProperty().addListener(new InvalidationListener() {
    @Override
    public  void invalidated(Observable observable) {
		text2.setText("Animation status: " +
        ((ObservableObjectValue<Animation.Status>)observable).getValue());
    }
});
```

Here we implement the same listener with a lambda expression:

```java
rotate.statusProperty().addListener(observable -> {
    text2.setText("Animation status: " +
    ((ObservableObjectValue<Animation.Status>)observable).getValue());
});
```

Since we access just the status property value, we can bypass the observable with method `getStatus()`, which returns an enum. This avoids the casting expression:

```java
rotate.statusProperty().addListener(observable -> {
	text2.setText("Animation status: " + rotate.getStatus());
});
```
<a id="change-listeners">&nbsp;</a>
## Change Listeners

When you need access to the previous value of an observable as well as its current value, use a change listener. Change listeners provide the observable and the new and old values. 
Change listeners can be more expensive, since they must keep track of more information. Here’s the non-lambda version of a change listener that displays both the old and new values. 
Note that you don’t have to cast these parameters, since change listeners are generic:

```java
rotate.statusProperty().addListener(
		new ChangeListener<Animation.Status>() {
			@Override 
            public void changed(ObservableValue<? extends Animation.Status> observableValue,
                Animation.Status oldValue, Animation.Status newValue) {
				text2.setText("Was " + oldValue + ", Now " + newValue);
            }
});
```
Here’s the version with a more compact lambda expression:

```java 
rotate.statusProperty().addListener(
		(observableValue, oldValue, newValue) -> {
			text2.setText("Was " + oldValue + ", Now " + newValue);
});
```

Below you can see the `MyShapesProperties` running with a change listener attached to the animation’s status property. Now we can display both the previous and current values.

[![MyShapesProperties application with a change listener](/assets/images/javafx/myshapes-properties-change.png)](/assets/images/javafx/myshapes-properties-change.png)
<a id="binding">&nbsp;</a>
## Binding

JavaFX binding is a flexible, API-rich mechanism that lets you avoid writing listeners in many situations. You use binding to link the value of a JavaFX property to one or more other JavaFX properties. 
Property bindings can be unidirectional or bidirectional. When properties are the same type, the unidirectional `bind()` method may be all you need. 
However, when properties have different types or you want to compute a value based on more than one property, then you’ll need the fluent and bindings APIs. 
You can also create your own binding methods with custom binding.
<a id="unidir-binding">&nbsp;</a>
## Unidirectional Binding

The simplest form of binding links the value of one property to the value of another. Here, we bind text2’s rotate property to `stackPane`’s rotate property:

```java
text2.rotateProperty().bind(stackPane.rotateProperty());
```

This means any changes to `stackPane`’s rotation will immediately update text2’s rotate property. When this binding is set in the `MyShapesProperties` program, any clicks inside the [`StackPane`](javafxdoc:StackPane) initiate a rotate transition. 
This makes both the [`StackPane`](javafxdoc:StackPane) and text2 components rotate together. The [`StackPane`](javafxdoc:StackPane) rotates because we start the `RotateTransition` defined for that node. The text2 node rotates because of the bind expression.

Note that when you bind a property, you cannot explicitly set its value unless you unbind the property first.
<a id="bidir-binding">&nbsp;</a>
## Bidirectional Binding

Bidirectional binding provides a two-way relationship between two properties. When one property updates, the other also updates. Here’s an example with two text properties:

```java
text2.textProperty().bindBidirectional(text.textProperty());
```
Both text controls initially display "My Shapes". When the user clicks inside the `stackPane` and the `stackPane` rotates, both text properties will now contain the animation status because of the change listener.

Bidirectional binding is not completely symmetrical; the initial value of both properties takes on the value of the property passed in the call to `bindBidirectional()`. Unlike `bind()`, you can explicitly set either property when using bidirectional binding.
<a id="fluent-api">&nbsp;</a>
## Fluent API and Bindings API

The fluent and bindings APIs help you construct bind expressions when more than one property needs to participate in a binding or when it’s necessary to perform some sort of calculation or conversion. 
For example, the following bind expression displays the rotation angle of the [`StackPane`](javafxdoc:StackPane) as it rotates from 0 to 360 degrees. The text property is a `String`, and the rotate property is a double. 
The binding method `asString()` converts the double to [`String`](javadoc:String), formatting the number with a single digit to the right of the decimal point:

```java
text2.textProperty().bind(stackPane.rotateProperty().asString("%.1f"));
```

For a more complex example, let’s update `text2`’s stroke property (its color) depending on whether the animation is running or not. Here we construct a binding with [`When`](javafxdoc:When) based on a ternary expression. 
This sets the stroke color to green when the animation is running and to red when the animation is stopped or paused:

```java
text2.strokeProperty().bind(new When(rotate.statusProperty()
        .isEqualTo(Animation.Status.RUNNING))
        .then(Color.GREEN).otherwise(Color.RED));
```

The `text2` text property is set in the change listener that is attached to the animation status property we showed earlier.
You can see below the application `MyShapesProperties` with the complex bind expression attached to the `text2 strokeProperty`. Since the animation is running, the stroke property is set to `Color.GREEN`.

[![MyShapesProperties application with the fluent and bindings APIs](/assets/images/javafx/myshapes-properties-fluent.png)](/assets/images/javafx/myshapes-properties-fluent.png)
