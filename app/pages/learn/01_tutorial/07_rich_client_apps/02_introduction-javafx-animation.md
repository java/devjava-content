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
last_update: 2024-05-31
author: ["ConnorSchweighöfer"]
---
<br>

The [javafx.animation](javafxdoc:AnimationPackageSummary) package offers a simple framework for creating animations and transitions in a JavaFX application.
It operates on the principle of [`WritableValue<T>`](javafxdoc:WritableValue), which is used across JavaFX. `WritableValue<T>` is an interface that wraps a value that can be read and set.
It is commonly used for storing properties in JavaFX UI elements, like `width` or `height` in the [`Rectangle`](javafxdoc:Rectangle) shape.
It additionally provides a variety of built-in transitions for common effects, support for parallel and sequential transitions, and the ability to handle events upon animation completion.

This article goes through all types of animations, starting with `Animation` and its subclasses `Transition` and `Timeline`, before representing a lower level animation with `AnimationTimer`.
While `Transition` provides a simpler and more user-friendly way to create animations, `Timeline` offers greater flexibility and is suitable for more complex animations.
In contrast, `AnimationTimer` is designed for frame-by-frame updates and does not make use of `WritableValue<T>`.

## Animation

The abstract class [`Animation`](javafxdoc:Animation) provides the core functionality for `Transition` and `Timeline` animations and can't be extended directly.

An `Animation` consists of multiple properties:
- The `targetFramerate` is the maximum framerate (frames per second) at which this `Animation` will run.
- The `currentTime` is the current point in time in the `Animation` as a [`Duration`](javafx:Duration).
- The `rate` defines the direction and speed at which the `Animation` is expected to be played. It supports both positive and negative numbers.
- The `cycleCount` defines the number of cycles of this `Animation`. It can't be changed while running and must be positive.
- The `cycleDuration` is the `Duration` of one cycle of this `Animation`. It is the time it takes to play from start to end of the `Animation` **at the default rate of 1.0**.
- The `totalDuration` indicates the total duration of this `Animation`, including repeats. It is the result of `cycleDuration * cycleCount` or possibly `Duration.INDEFINITE`.
- The `delay` is the `Duration` that delays the `Animation` when starting.
- The `autoReverse` property specifies whether the `Animation` will play in reverse direction on alternating cycles.
- The `onFinished` event handler is used to define additional behavior when the `Animation` finished.
- The `status` represents the current state of the `Animation`, possible states are `PAUSED`, `RUNNING` and `STOPPED`.

Additionally, it provides several useful methods, like `play()`, `playFrom(String cuePoint)`, `pause()`, `stop()` and more to control the animations flow.
A quick look into [its documentation](javafxdoc:Animation) provides a great overview of its functionalities.

## Transition
The [`Transition`](javafxdoc:Transition) abstract class serves as the foundational class for all transitions, presenting a common form of `Animation`.
JavaFX provides a variety of built-in transitions for common [`Node`](javafxdoc:Node) and [`Shape`](javafxdoc:Shape) properties.

### Fade Transition
The [`FadeTransition`](javafxdoc:FadeTransition) creates a fade effect. 
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
(For a complete guide on setting up a JavaFX application, refer to this article: [JavaFX Application Basic Structure By Example](id:javafx.fundamentals.structure))

### Fill Transition
The [`FillTransition`](javafxdoc:FillTransition) creates an animation, that changes the filling of a shape. 
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

### Translate Transition
The [`TranslateTransition`](javafxdoc:TranslateTransition) creates a move/translate animation from one position to another in a straight line.
This is done by updating the `translateX`, `translateY` and `translateZ` properties of the `Node` at regular intervals.

![TranslateTransition](/assets/images/javafx/animation/transition/translate-example.gif)
```java
Circle circle = new Circle(50, 50, 10, Color.GREEN);

TranslateTransition transition = new TranslateTransition(Duration.seconds(5), circle);
transition.setToX(200);
transition.setToY(200);
transition.setInterpolator(Interpolator.LINEAR);

transition.play();
```

### Path Transition
The [`PathTransition`](javafxdoc:PathTransition) creates a move animation using a complex predefined path specified by a sequence of shapes.
The translation along the path is done by updating the `translateX` and `translateY` properties of the `Node`, and the `rotate` variable will get updated if `orientation` is set to `OrientationType.ORTHOGONAL_TO_TANGENT`, at regular intervals.

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
The [`RotateTransition`](javafxdoc:RotateTransition) creates a rotation animation. 
This is done by updating the `rotate` property of the `Node` at regular intervals. 
The angle value is specified in degrees.

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
The [`ScaleTransition`](javafxdoc:ScaleTransition) creates a scale animation, that changes the size of a node. 
This is done by updating the `scaleX`, `scaleY` and `scaleZ` properties of the `Node` at regular intervals.

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
The [`StrokeTransition`](javafxdoc:StrokeTransition) creates an animation, that changes the stroke color of a shape. 
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

### Sequential Transition
The [`SequentialTransition`](javafxdoc:SequentialTransition) plays a series of animations in sequential order.
It is not recommended to contain an `Animation` that is not the last one with `Duration.INDEFINITE` as this will block all later animations in the sequence.

### Pause Transition
The [`PauseTransition`](javafxdoc:PauseTransition) creates a pause for a specified `duration`.
This behavior is useful to create a delay in a `SequentialTransition` in which no properties change.

![PauseTransition](/assets/images/javafx/animation/transition/pause-example.gif)
```java
Circle circle = new Circle(150, 150, 20, Color.GREEN);
circle.setStrokeWidth(5);

ScaleTransition smaller = new ScaleTransition(Duration.seconds(1.5));
smaller.setToX(0.25);
smaller.setToY(0.25);
smaller.setInterpolator(Interpolator.LINEAR);

ScaleTransition larger = new ScaleTransition(Duration.seconds(1.5));
larger.setToX(1);
larger.setToY(1);
larger.setInterpolator(Interpolator.LINEAR);

SequentialTransition transition = new SequentialTransition(
        circle,
        smaller,
        new PauseTransition(Duration.seconds(2)),
        larger
);
transition.play();
```
Note that this code only sets a `Node` on the `SequentialTransition`, which is the parent transition here, and not on the individual child transitions.
They will implicitly use their parent transition's `Node`.

### Parallel Transition
The [`ParallelTransition`](javafxdoc:ParallelTransition) plays a group of animations in parallel.

![ParallelTransition](/assets/images/javafx/animation/transition/parallel-example.gif)
```java
Rectangle rectangle = new Rectangle(50, 50, 10, 10);
rectangle.setFill(Color.GREEN);

TranslateTransition translate = new TranslateTransition(Duration.seconds(5));
translate.setToX(200);
translate.setToY(200);
translate.setInterpolator(Interpolator.LINEAR);

RotateTransition rotate = new RotateTransition(Duration.seconds(5));
rotate.setFromAngle(0);
rotate.setToAngle(360);
rotate.setInterpolator(Interpolator.LINEAR);

ParallelTransition transition = new ParallelTransition(rectangle, translate, rotate);
transition.play();
```

## Timeline
A [`Timeline`](javafxdoc:Timeline) is used to define a free form `Animation` on any `WritableValue<T>`. It is helpful if none of the built-in transitions operate on the required properties.
It consists of a sequential series of `KeyFrame`s, each of which encapsulates a moment in time. Collectively they specify how target properties evolve over the entire duration.

> **Warning:** A running `Timeline` is being referenced from the FX runtime. In an infinite timeline, 
> the objects with animated properties would not be garbage collected, which might result in a memory leak.
> Therefore, ensure you stop the timeline instance when it is no longer needed.

### KeyFrame
A [`KeyFrame`](javafxdoc:KeyFrame) represents a specific moment in an animation sequence (**Cue Point**) and comprises a collection of `KeyValue` instances that change over the given `Duration`.
A KeyFrame can have a name which then can be used to identify this `KeyFrame` in an animation, for example for starting from this specific `KeyFrame` using `playFrom(String cuePoint)`.
It is also possible to provide an `onFinished` implementation, which will be invoked when hitting this cue point.

### KeyValue
A [`KeyValue`](javafxdoc:KeyValue) establishes a mapping between a `WritableValue<T>` and a target value of type `T`. This is used to define the change of a value.
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
The [`Interpolator`](javafxdoc:Interpolator) abstract class defines the rate of change at which values change over time, influencing the smoothness of animations.
There are several built-in implementations for common interpolation techniques.

**Note:** By default, all transitions, excluding `ParallelTransition` and `SequentialTransition`, utilize the `Interpolator#EASE_BOTH`.

Here is a visualization of the `Interpolator` using the example from [`Timeline`](#example):

### Discrete
The [`Interpolator.DISCRETE`](javafxdoc:Interpolator.DISCRETE) interpolator creates a **sudden** transition between values without any intermediate steps.

![Discrete](/assets/images/javafx/animation/interpolator/discrete-example.gif)

```java
Circle circle = new Circle(50, 150, 10, Color.GREEN);

KeyValue x = new KeyValue(circle.translateXProperty(), 200, Interpolator.DISCRETE);
KeyFrame frame = new KeyFrame(Duration.seconds(5), x);
Timeline timeline = new Timeline(frame);

timeline.play();
```
### Linear
The [`Interpolator.LINEAR`](javafxdoc:Interpolator.LINEAR) interpolator produces a **constant** rate of change between values over time.

![Linear](/assets/images/javafx/animation/interpolator/linear-example.gif)

### Ease In
The [`Interpolator.EASE_IN`](javafxdoc:Interpolator.EASE_IN) interpolator starts the animation slowly and accelerates as it progresses.

![EaseIn](/assets/images/javafx/animation/interpolator/ease-in-example.gif)

### Ease Out
The [`Interpolator.EASE_OUT`](javafxdoc:Interpolator.EASE_OUT) interpolator starts quickly and slows down as it progresses.

![EaseOut](/assets/images/javafx/animation/interpolator/ease-out-example.gif)

### Ease Both
The [`Interpolator.EASE_BOTH`](javafxdoc:Interpolator.EASE_BOTH) interpolator starts slowly, accelerates in the middle and slows down towards the end. 
It combines the characteristics of `EASE_IN` and `EASE_OUT`.

![EaseBoth](/assets/images/javafx/animation/interpolator/ease-both-example.gif)

Additionally, there are two static factory methods for [`Interpolator.SPLINE`](javafxdoc:Interpolator.SPLINE) and [`Interpolator.TANGENT`](javafxdoc:Interpolator.TANGENT) interpolation.

## Animation Timer

The [`AnimationTimer`](javafxdoc:AnimationTimer) abstract class provides the lowest level option to create an animation.
The `handle(long now)` method gets called in each frame while it is active. The timestamp `now` is the time of the current frame in nanoseconds and will be the same for all `AnimationTimer`s called during that frame.
Additionally, the `AnimationTimer` adds `start()` and `stop()` methods to handle the lifetime of the animation.

**Note:** The `handle` method will be called in the **JavaFX Application Thread**, so it should avoid long-running and blocking operations.
To maintain a smooth frame rate of 30 frames per second, the whole JavaFX application ideally allocates no more than 33 milliseconds per frame.


## Conclusion
In this tutorial, you've explored the `javafx.animation` package and learned how to create dynamic animations within JavaFX applications.
We started by understanding the base `Animation` class, and then moved on to `Transition` and `Timeline` classes, which provide different ways
to create and control animations. Additionally, you have learnt how to control the progression of an animation via several `Interpolator` examples.
Finally, we covered the `AnimationTimer` class, which allows for animations with precise frame-by-frame updates. With these tools, you are now
equipped to create rich animations in your JavaFX applications.
