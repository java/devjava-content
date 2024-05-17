---
id: javafx.animation
title: Introduction to JavaFX animations
slug: learn/javafx-animations
type: tutorial
group: rich-client-apps
category: javafx
category_order: 2
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
description: "Learn to create advanced JavaFX animations"
last_update: 2024-05-17
---

The [javafx.animation](javafxdoc:AnimationPackageSummary) package in JavaFX offers a simple framework for creating animations and transitions in a JavaFX application.
It operates on the principle of [WritableValue\<T\>](javafxdoc:WritableValue) which are used across JavaFX.
It additionally provides a variety of built-in transitions for common effects, support for parallel and sequential transitions, and the ability to handle events upon animation completion.
I will go through all types of animations, starting with `Animation` and its subclasses `Transition` and `Timeline`, before representing a lower level animation with `AnimationTimer`.
While `Transition` provides a simpler and more user-friendly way to create animations, `Timeline` offers greater flexibility and is suitable for more complex animations.
In contrast, `AnimationTimer` is designed for frame-by-frame updates and does not take use of `WritableValue<T>`.

## Animation

The [Animation](javafxdoc:Animation) abstract class provides the core functionality for `Transition` and `Timeline` animations.

An `Animation` consists of multiple properties:
- The `targetFramerate` is the maximum framerate (frames per s) at which this `Animation` will run.
- The `currentTime` is the current point in time as a `Duration` of the `Animation`.
- The `rate` defines the direction and speed at which the `Animation` is expected to be played. It supports both positive and negative numbers.
- The `cycleCount` defines the number of cycles of this `Animation`. It can't be changed while running and must be positive.
- The `cycleDuration` is the `Duration` of one cycle of this `Animation`. It is the time it takes to play from start to end of the `Animation` **at the default rate of 1.0**.
- The `totalDuration` indicates the total duration of this `Animation`, including repeats. It is the result of `cycleDuration * cycleCount` or possibly `Duration.INDEFINITE`.
- The `delay` is the `Duration` that delays the `Animation` when starting.
- The `autoReverse` property specifies whether the `Animation` will play in reverse direction on alternating cycles.
- The `onFinished` event handler is used to define additional behavior when the `Animation` finished.
- The `status` represents the current state of the `Animation`, possible states are `PAUSED`, `RUNNING` and `STOPPED`.

Additionally, it provides several useful methods, like `play()`, `playFrom(String cuePoint)`, `pause()`, `stop()` and more to control the animations flow.
A quick look into the JavaDocs provides a great overview of its functionalities.

## Transition
The [Transition](javafxdoc:Transition) abstract class serves as the foundational class for all transitions, presenting a common form of `Animation`.
JavaFX provides a variety of built-in transitions for common [Node](javafxdoc:Node) and [Shape](javafxdoc:Shape) properties.

**Note:** By default, all transitions, excluding `ParallelTransition` and `SequentialTransition`, utilize the `Interpolator#EASE_BOTH`.

### Fade Transition
The [FadeTransition](javafxdoc:FadeTransition) creates a fade effect over a `duration`. 
This is done by updating the `opacity` property of the `Node` at regular intervals.

![FadeTransition](/assets/images/javafx/animation/transition/fade-example.gif)
```java
Circle circle = new Circle(150, 150, 20, Color.GREEN);

FadeTransition transition = new FadeTransition(Duration.seconds(5), circle);
transition.setFromValue(1.0);
transition.setToValue(0);
transition.setInterpolator(Interpolator.LINEAR);

transition.play();
```

### Fill Transition
The [FillTransition](javafxdoc:FillTransition) creates an animation, that changes the filling of a shape over a `duration`. 
This is done by updating the `fill` property of the `Shape` at regular intervals.

![FillTransition](/assets/images/javafx/animation/transition/fill-example.gif)
```java
Circle circle = new Circle(150, 150, 20, Color.GREEN);

FillTransition transition = new FillTransition(Duration.seconds(5), circle);
transition.setFromValue(Color.GREEN);
transition.setToValue(Color.BLACK);
transition.setInterpolator(Interpolator.LINEAR);

transition.play();
```

### Path Transition
The [PathTransition](javafxdoc:PathTransition) creates a path animation that spans its `duration`. 
The translation along the path is done by updating the `translateX` and `translateY` properties of the `Node`, and the `rotate` variable will get updated if `orientation` is set to `OrientationType.ORTHOGONAL_TO_TANGENT`, at regular interval.

![PathTransition](/assets/images/javafx/animation/transition/path-example.gif)
```java
Circle circle = new Circle(50, 50, 10, Color.GREEN);

Path path = new Path();
path.getElements().add(new MoveTo(50, 50)); // starting point
path.getElements().add(new LineTo(250, 250));

PathTransition transition = new PathTransition(Duration.seconds(5), path, circle);
transition.setInterpolator(Interpolator.LINEAR);

transition.play();
```

### Rotate Transition
The [RotateTransition](javafxdoc:RotateTransition) creates a rotation animation that spans its `duration`. 
This is done by updating the `rotate` property of the `Node` at regular interval. The angle value is specified in degrees.

![RotateTransition](/assets/images/javafx/animation/transition/rotate-example.gif)
```java
Rectangle rectangle = new Rectangle(125, 125, 50, 50);
rectangle.setFill(Color.GREEN);


RotateTransition transition = new RotateTransition(Duration.seconds(5), rectangle);
transition.setFromAngle(0);
transition.setToAngle(360);
transition.setInterpolator(Interpolator.LINEAR);

transition.play();
```

### Scale Transition
The [ScaleTransition](javafxdoc:ScaleTransition) creates a scale animation over a `duration`. 
This is done by updating the `scaleX`, `scaleY` and `scaleZ` properties of the `Node` at regular interval.

![ScaleTransition](/assets/images/javafx/animation/transition/scale-example.gif)
```java
Circle circle = new Circle(150, 150, 50, Color.GREEN);

ScaleTransition transition = new ScaleTransition(Duration.seconds(5), circle);
transition.setToX(0.1);
transition.setToY(0.1);
transition.setInterpolator(Interpolator.LINEAR);

transition.play();
```

### Stroke Transition
The [StrokeTransition](javafxdoc:StrokeTransition) creates an animation, that changes the stroke color of a shape over a `duration`. 
This is done by updating the `stroke` property of the `Shape` at regular intervals.

![StrokeTransition](/assets/images/javafx/animation/transition/stroke-example.gif)
```java
Circle circle = new Circle(150, 150, 50, Color.GREEN);
circle.setStrokeWidth(5);

StrokeTransition transition = new StrokeTransition(Duration.seconds(5), circle);
transition.setFromValue(Color.GREEN);
transition.setToValue(Color.BLACK);
transition.setInterpolator(Interpolator.LINEAR);

transition.play();
```

### Translate Transition
The [TranslateTransition](javafxdoc:TranslateTransition) creates a move/translate animation that spans its `duration`.
This is done by updating the `translateX`, `translateY` and `translateZ` properties of the `Node` at regular interval.

![TranslateTransition](/assets/images/javafx/animation/transition/translate-example.gif)
```java
Circle circle = new Circle(50, 50, 10, Color.GREEN);

TranslateTransition transition = new TranslateTransition(Duration.seconds(5), circle);
transition.setToX(200);
transition.setToY(200);
transition.setInterpolator(Interpolator.LINEAR);

transition.play();
```

### Pause Transition
The [PauseTransition](javafxdoc:PauseTransition) executes an `Animation.onFinished` at the end of its `duration`.

### Parallel Transition
The [ParallelTransition](javafxdoc:ParallelTransition) plays a list of animations in parallel.

### Sequential Transition
The [SequentialTransition](javafxdoc:SequentialTransition) plays a list of animations in sequential order. 
It is not recommended to contain an `Animation`, which is not the last one, with `Duration.INDEFINITE` as this will block all later animations in the sequence.

## Timeline
A [Timeline](javafxdoc:Timeline) is used to define a free form `Animation` of any `WritableValue<T>`. It is helpful if none of the built-in transitions operate on the required properties.

It consists of a sequential series of `KeyFrame`.
Each `KeyFrame` encapsulates a moment in time (**Cue Point**), and collectively specify how target properties evolve over the entire duration.

> **Warning:** A running Timeline is being referenced from the FX runtime. Infinite Timeline might result in a memory leak if not stopped properly. All the objects with animated properties would not be garbage collected.

### KeyFrame
A [KeyFrame](javafxdoc:KeyFrame) represents a specific moment in an animation sequence (**Cue Point**) and comprises a collection of `KeyValue` instances that change from start to the given `Duration`.

A KeyFrame can have a name which then can be used to identify this `KeyFrame` in an animation, for example for starting from this specific `KeyFrame` using `playFrom(String cuePoint)`.
It is also possible to provide an `onFinished` implementation, which will be invoked when hitting this cue point.

### KeyValue
A [KeyValue](javafxdoc:KeyValue) establishes a mapping between a `WritableValue<T>` and a target value of type `T`. This is used to define the change of a value.
An `Interpolator` can be additionally defined to set the rate of change for this value. The `KeyValue` class is immutable.

### Example
This example of `Timeline` creates a `Circle` which moves 200px in x direction over the duration of 5 seconds:

![TimelineExample](/assets/images/javafx/animation/timeline-example.gif)
```java
Circle circle = new Circle(50, 150, 10, Color.GREEN);

KeyValue x = new KeyValue(circle.translateXProperty(), 200);
KeyFrame frame = new KeyFrame(Duration.seconds(5), x);
Timeline timeline = new Timeline(frame);

timeline.play();
```

## Interpolator
The [Interpolator](javafxdoc:Interpolator) abstract class defines the rate of change at which values change over time, influencing the smoothness of animations.

It provides several built-in implementations:
- [Interpolator.DISCRETE](javafxdoc:Interpolator.DISCRETE): The `DISCRETE` interpolator creates a **sudden** transition between values without any intermediate steps.
- [Interpolator.LINEAR](javafxdoc:Interpolator.LINEAR): The `LINEAR` interpolator produces a **constant** rate of change between values over time.
- [Interpolator.EASE_IN](javafxdoc:Interpolator.EASE_IN): The `EASE_IN` interpolator starts the animation slowly and accelerates as it progresses.
- [Interpolator.EASE_OUT](javafxdoc:Interpolator.EASE_OUT): The `EASE_OUT` interpolator starts quickly and slows down as it progresses.
- [Interpolator.EASE_BOTH](javafxdoc:Interpolator.EASE_BOTH): The `EASE_BOTH` interpolator starts slowly, accelerates in the middle and slows down towards the end. It combines the characteristics of `EASE_IN` and `EASE_OUT`.

Additionally, there are two static factory methods for [SPLINE](javafxdoc:Interpolator.SPLINE) and [TANGENT](javafxdoc:Interpolator.TANGENT) interpolation.

[//]: # (ToDo: sync gifs)
Here is a visualization of the Interpolator using the example from [Timeline](#example):
### Discrete
![Discrete](/assets/images/javafx/animation/interpolator/discrete-example.gif)
### Linear
![Linear](/assets/images/javafx/animation/interpolator/linear-example.gif)
### Ease In
![EaseIn](/assets/images/javafx/animation/interpolator/ease-in-example.gif)
### Ease Out
![EaseOut](/assets/images/javafx/animation/interpolator/ease-out-example.gif)
### Ease Both
![EaseBoth](/assets/images/javafx/animation/interpolator/ease-both-example.gif)

## AnimationTimer

The [AnimationTimer](javafxdoc:AnimationTimer) abstract class provides the lowest level option to create an animation.
The `handle(long now)` method gets called in each frame while it is active. The timestamp `long now` is the nanoseconds time of the current frame and will be the same for all `AnimationTimer` called during that frame.
Additionally, the `AnimationTimer` adds the `start()` and `stop()` to handle the lifetime of the animation.

**Note:** The handle method will be called on the **JavaFX Application Thread** and thus shouldn't do heavy computations.


## Conclusion
The `javafx.animation` package offers a simple framework for creating dynamic animations within JavaFX applications.
From the foundational `AnimationTimer` and `Animation` classes to the more specialized `Transition` and `Timeline` classes,
each component provides unique capabilities for creating animations. Additionally, you are provided with various
common `Interpolator` implementations.
