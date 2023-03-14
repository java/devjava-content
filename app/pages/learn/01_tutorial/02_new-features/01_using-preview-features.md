---
id: new_features.using_preview
title: Using the Preview Features Available in the JDK
slug: learn/new-features/using-preview
slug_history:
- learn/using-the-preview-features-available-in-the-jdk
type: tutorial
category: awareness
category_order: 2
layout: learn/tutorial.html
main_css_id: learn
subheader_select: tutorials
toc:
- Previewing Features to Improve their Quality {improving-quality}
- Managing New Features with JDK Enhancement Proposals (JEPs) {managing}
- Preview Features {defining}
- Experimental Features {experimental}
- Incubator Modules {incubator}
- Using Preview Features {using-preview}
- Using Experimental Features {using-experimental}
- Using Incubator Modules {using-incubator}
- Evaluating Project with the Early Access Builds {evaluating-early-access-builds}
description: "How to compile and execute the preview features available in the JDK."
---


<a id="improving-quality">&nbsp;</a>
## Previewing Features to Improve their Quality

With millions of people relying on Java in production for critical workloads, the reach of Java is global. Given its depth and breadth, new features have to not only be designed in a clear and complete manner but also implemented in a reliable and maintainable manner. All the new features given to Java developers to use in production have to attain the highest possible quality. It is therefore critical to provide developers with preliminary access to new features to encourage feedback -- feedback that will help refine those features and reach the expected quality level for their final and permanent form.

There are several categories of new, nonfinal features:

1. Preview, for new Java platform features fully specified and implemented but yet subject to adjustments
2. Experimental, mainly for new features in the HotSpot JVM
3. Incubating (also known as incubator modules), for potentially new APIs and JDK tools

In addition, there are other nonfinal features that don't fit in any of those three categories, that you will see later.

Several current features followed this process. 

1. Switch expressions is a language feature. It was first previewed in Java SE 12. A second version of it was previewed in Java SE 13. It then became a permanent feature in Java SE 14. 
2. The Z garbage collector is a HotSpot feature. It was previewed from Java SE 11 to Java SE 14 and became a production feature in Java SE 15. 
3. The HTTP/2 Client API is an API added as an incubating feature in Java SE 9 and Java SE 10, and was then made a standard feature in Java SE 11. 


<a id="managing">&nbsp;</a>
## Managing New Features with JDK Enhancement Proposals (JEPs)

New features almost always start out as a JDK Enhancement Proposal (JEP), a well-defined mechanism to manage nontrivial JDK enhancements such as the following:

1. A *Java language feature* for the _Java Language Specification_, such as text blocks or records.
   
2. A *Java SE API feature* in the core Java platform, such as `java.lang.Object`, `java.lang.String`, or `java.io.File`. Such an API feature will reside in a module whose name starts with java.
   
3. A *JDK API feature* with additional JDK-specific features, such as the JDK Flight Recorder. Such an API feature will reside in a module whose name starts with `jdk`.

4. A *JDK tool feature* such as `jshell` or `jlink`.

5. A *feature specific to HotSpot JVM*, the OpenJDK implementation of the Java Virtual Machine. Two such features are Application Class-Data Sharing and the Z Garbage Collector (ZGC).

By the way, in the context of the JDK, the term Java APIs is often used to describe both Java SE APIs and JDK APIs.

What about importance? If there is a high demand for an enhancement, if it impacts the JDK or the processes and infrastructure by which the JDK itself is developed (such as moving the JDK source code repository to GitHub), or simply because it requires quite a bit of engineering investment, then it is nontrivial. 

Deprecating features and improving existing features also goes through the JEP process. 

The introduction of most larger features uses a two-phased approach that uses JEPs, starting with a preliminary access phase followed by an activation phase. There might be one or multiple iterations of the preliminary access phase during which you have access to nonfinal features. During the preliminary access phase (or phases), you are encouraged to actively use and gain experience with nonfinal features in order to provide feedback.

If the feedback you provide highlights some room for improvements, then the next iteration can address them. This feedback might also lead to documentation improvements such as a programmer's guide that often accompanies new language features, the Javadoc examples for a new API, or a FAQ page.

Finally, when a new feature is deemed ready, a final phase will transition that new feature into a permanent one in the Java platform.

Who should offer feedback? Well, the engineers welcome feedback from you, the Java developers (such as about a new API), from tool vendors (such as about a new JDK tool), etc. In the end, all constructive and actionable feedback is welcome.

If you plan to provide feedback, please do so on the official channels. Comments posted on social networks may be interesting but may also vanish too quickly to be seen by the right people. That's why each JEP clearly designates a mailing list to collect feedback. For example, [JEP 384](https://openjdk.java.net/jeps/384) about Records (second preview) asked for feedback using the [amber-dev mailing list](https://mail.openjdk.java.net/mailman/listinfo/amber-dev).

In essence, the Java engineers are looking for real-world experience and actionable feedback on new features by making them accessible early in a nonfinal form and doing any necessary adjustments before those features are made final and permanent parts of the Java platform.


<a id="defining">&nbsp;</a>
## Preview Features

Java language features and Java SE API features have a lot of exposure, and any mistake in their design can have negative consequences. To avoid such a risk, a specific JEP ([JEP 12](https://openjdk.java.net/jeps/12)) offers the ability to preview new Java language and Java SE API features. 

A preview feature is one that is believed to be fully specified and implemented but may still change before it is included in the Java platform on a final and permanent basis. Your feedback will be evaluated and used to make eventual adjustments before a feature becomes permanent.

For example, [Project Amber](https://openjdk.java.net/projects/amber/) is an OpenJDK project whose goal is to improve developer productivity through evolutions of the Java language. Amber is leveraging the preview feature mechanism to gradually deliver standard permanent features into the Java platform. We can observe that two preview rounds seem adequate to collect actionable feedback on new Amber features before making them permanent.

Here are seven features that the project Amber has released so far. 

1. Local-Variable Type Inference ([JEP 286](https://openjdk.java.net/jeps/286)) was released in [Java SE 10](https://openjdk.java.net/projects/jdk/10/).
2. Local-Variable Syntax for Lambda Parameters ([JEP 323](https://openjdk.java.net/jeps/323)) was released in [Java SE 11](https://openjdk.java.net/projects/jdk/11/).
3. Switch Expression ([JEP 361](https://openjdk.java.net/jeps/361)) was previewed in [Java SE 12](https://openjdk.java.net/projects/jdk/12/) and [Java SE 13](https://openjdk.java.net/projects/jdk/13/). It was made final and permanent in [Java SE 14](https://openjdk.java.net/projects/jdk/14/). 
4. Text Blocks ([JEP 378](https://openjdk.java.net/jeps/378)) was previewed in [Java SE 13](https://openjdk.java.net/projects/jdk/13/) and [Java SE 14](https://openjdk.java.net/projects/jdk/14/). It was made final and permanent in [Java SE 15](https://openjdk.java.net/projects/jdk/15/). 
5. Records ([JEP 395](https://openjdk.java.net/jeps/395)) was previewed in [Java SE 14](https://openjdk.java.net/projects/jdk/14/) and [Java SE 15](https://openjdk.java.net/projects/jdk/15/). It was made final and permanent in [Java SE 16](https://openjdk.java.net/projects/jdk/16/). 
6. Pattern Matching for Instanceof ([JEP 394](https://openjdk.java.net/jeps/394)) was previewed in [Java SE 14](https://openjdk.java.net/projects/jdk/14/) and [Java SE 15](https://openjdk.java.net/projects/jdk/15/). It was made final and permanent in [Java SE 16](https://openjdk.java.net/projects/jdk/16/).
7. Sealed Classes ([JEP 409](https://openjdk.java.net/jeps/409)) were previewed in [Java SE 15](https://openjdk.java.net/projects/jdk/15/) and [Java SE 16](https://openjdk.java.net/projects/jdk/16/). This feature was made final and permanent in [Java SE 17](https://openjdk.java.net/projects/jdk/17/).

Many more features will be released by the Amber project, you can check them on the [Project Amber page](https://openjdk.java.net/projects/amber/). There could be smaller Amber features or changes that wouldn't use JEPs as JEPs are for features that require significant engineering effort only. 

To dig deeper, consider the switch expression, which developed under the umbrella of Project Amber which was previewed in [Java SE 12](https://openjdk.java.net/projects/jdk/12/) ([JEP 325](https://openjdk.java.net/jeps/325)) and [Java SE 13](https://openjdk.java.net/projects/jdk/13/) ([JEP 354](https://openjdk.java.net/jeps/354)) before being turned into a standard language feature in [Java SE 14](https://openjdk.java.net/projects/jdk/14/) ([JEP 361](https://openjdk.java.net/jeps/361)).

In [Java SE 12](https://openjdk.java.net/projects/jdk/12/), the `break` keyword was used to produce a value for a switch expression. Your feedback suggested that this use of `break` was confusing. In response, it was replaced by the `yield` keyword, for example, `yield 42;`.

The final switch expression in [Java SE 14](https://openjdk.java.net/projects/jdk/14/) kept the `yield` approach previewed in [Java SE 13](https://openjdk.java.net/projects/jdk/13/). While a preview feature is intended to be very close to final, changes are still possible. Only the final version of the switch expression in [Java SE 14](https://openjdk.java.net/projects/jdk/14/) is subject to long-term compatibility rules.


<a id="experimental">&nbsp;</a>
## Experimental features

An experimental feature is a test-bed mechanism used to gather feedback on nontrivial HotSpot enhancements. Unlike [JEP 12](https://openjdk.java.net/jeps/12) for preview features, there is no JEP governing experimental features; the process for experimental features is more an established HotSpot convention than a formal process.

Let's take the Z Garbage Collector as an example. ZGC offers a low-latency garbage collection pause time, below 10 ms but typically more around 2 ms, regardless of the heap size, even if the heap is as small as a few megabytes, or as large as multiple terabytes.

The ZGC team leveraged the experimental feature mechanism several times, with ZGC initially introduced in the JDK 11 as an experimental feature limited to Linux x64 ([JEP 333](https://openjdk.java.net/jeps/333)). Since then, additional improvements were added to ZGC (for example, concurrent class unloading, memory uncommit, and additional platforms) while other ZGC capabilities were ironed out.

The overall feedback and experience collected during those iterations enabled ZGC to be gradually solidified to a point where it now has the high quality expected for a HotSpot feature. Consequently, [JEP 377](https://openjdk.java.net/jeps/377) formally turned ZGC into a regular HotSpot production feature in [Java SE 15](https://openjdk.java.net/projects/jdk/15/).


<a id="incubator">&nbsp;</a>
## Incubator Modules

[JEP 11](https://openjdk.java.net/jeps/11) introduces the notion of incubation to enable the inclusion of JDK APIs and JDK tools that might one day, after improvements and stabilizations, be included and supported in the Java SE platform or in the JDK. 

For example, the HTTP/2 Client API has been incubating, as a JDK-specific API in the JDK 9 and the JDK 10 via [JEP 110](https://openjdk.java.net/jeps/110), to finally leave that incubating phase and be included as a standard Java SE API in [Java SE 11](https://openjdk.java.net/projects/jdk/11/) ([JEP 321](https://openjdk.java.net/jeps/321)).


<a id="using-preview">&nbsp;</a>
## Using Preview Features

Important safeguards prevent developers from using nonfinal features accidentally. This is necessary because a nonfinal feature may well be different when it becomes final and permanent in a later Java feature release. Moreover, only final, permanent features are subject to Java's stringent backward-compatibility rules.

Therefore, to avoid unintentional use, preview and experimental features are disabled by default, and the JDK documentation unequivocally warns you about the nonfinal nature of these features and any of their associated APIs.

Preview features are specific to a given Java SE feature release and require the use of special flags at compile time as well as at runtime. 

Suppose you need to evaluate [Sealed Classes described in JEP 397](https://openjdk.java.net/jeps/397) in [Java SE 16](https://openjdk.java.net/projects/jdk/16/). This is a preview feature. 

Let us create the following `Shape` sealed interface. 

```java
public sealed interface Shape
        permits Square, Circle {

    double surface();
}
```

You need a first mandatory `Square` class, which you need to store in the same package or module as the `Shape` interface.

```java
public final class Square implements Shape {

    private double width;

    public Square(double width) {
        this.width = width;
    }

    public double surface() {
        return width*width;
    }
}
```

And a second mandatory `Circle` class. 

```java
public final class Circle implements Shape {

    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double surface() {
        return Math.PI*radius*radius;
    }
}
```


If you compile these classes with the classic following command: 

```shell
> javac *.java
```

You will get the following error message: 

```shell
Shape.java:1: error: '{' expected
public interface Shape
                      ^
1 error
```

You get this message because the `permits` keyword does not exist in Java SE 16. To compile this class, you need to declare that you want to activate the preview features to make this work. The right command is the following, assuming you are using a JDK 16. 

```shell
> javac --enable-preview --release 16 *.java
```

The compilation will then succeed, with the following message that warns you about the use of the preview features. 

```shell
Note: Shape.java uses preview language features.
Note: Recompile with -Xlint:preview for details.
```

Let us create the following class that uses these classes. 

```java
public class Main {
	
	public static void main(String... args) {
		Circle circle = new Circle(1.0d);
		Square square = new Square(1.0d);
		System.out.println("Circle: " + circle.surface());
		System.out.println("Square: " + square.surface());
	}
}
```

Once you have compiled it using Java SE 16 with preview features enabled, you can type the following to run this class:

```shell
java --enable-preview Main
```

The following lines will be printed on the console. 

```shell
Circle: 3.141592653589793
Square: 1.0
```


Most IDEs support the use of preview features, which not only allows you to use preview features in your favorite IDE but also help those IDEs to support those features shortly after they become permanent and final. 

By the way, artifacts that require nonfinal features shouldn't be distributed. For example, do not distribute an artifact that leverages a preview feature on Maven Central because the artifact will run only on a specific Java feature release. 


<a id="using-experimental">&nbsp;</a>
## Using Experimental Features

Experimental features are JVM features and are disabled by default; the `-XX:+UnlockExperimentalVMOptions` flag instructs HotSpot to allow experimental features. The actual experimental feature can then be enabled via specific flags. For example, prior to Java SE 15 when ZGC was still an experimental feature, you could use -`XX:+UseZGC` to activate it. 


<a id="using-incubator">&nbsp;</a>
## Using Incubator Modules

Finally, incubator modules are also shielded from accidental use because incubating can be done only in the `jdk.incubator` namespace. Therefore, an application on the classpath must use the `--add-modules` command-line option to explicitly request resolution for an incubating feature. Alternatively, a modular application must specify requires or requires transitive dependencies upon an incubating feature directly.


<a id="evaluating-early-access-builds">&nbsp;</a>
## Evaluating Project with the Early Access Builds

[Loom](https://openjdk.java.net/projects/loom/), [Panama](https://openjdk.java.net/projects/panama/), and [Valhalla](https://wiki.openjdk.java.net/display/valhalla/) are examples of OpenJDK long-term projects. The goal of those projects is to conduct fundamental investigations in particular areas to drastically improve (or completely revamp) certain aspects of the Java platform. For example, Loom's goal is to bring greater concurrency to the Java platform by making threads more lightweight and easier to use.

Given their ambitious scope, those projects will iteratively deliver, over the course of several Java feature releases, multiple features that together address the tackled area. To achieve this, various investigations will be conducted, different prototypes will be developed to experiment with potential solutions, and some approaches might be abandoned or reimagined.

As you would expect, this work takes time and requires considerable engineering efforts. Novel features developed under the auspices of those projects are unable to leverage the regular feedback mechanisms; because they are simply unfinished, they don't have the expected stability. That does not mean that usage feedback would not be valuable. On the contrary, early feedback can potentially inform some of the design discussions and validate early prototypes.

To gather such feedback early on, sometimes there are specific early access builds for novel features while they are being designed and developed. The unique goal of such occasional feature-specific early access (EA) JDK builds is solely to allow expert users to test specific novel features early.

Given the highly skilled but limited target audience of EA builds, project leads have the ability to relax some rules (for example, in terms of compatibility) or impose constraints (for example, to allow some aspects of a novel feature to be partly missing). For instance, the first Loom EA build appeared in July 2019; the second EA build came six months later. This second build was, in the words of the project lead, "a drastic departure from the API in the first EA build", demonstrating that early access features are not subject to any compatibility rule. This also reaffirms that an EA build should be used only by expert users for testing a novel feature within the scope of that particular EA build.

JDK Early Access builds are available from `jdk.java.net`. In addition to scoping an EA build, and documenting limitations and known issues, the download page also designates the appropriate mailing list for providing feedback. Over time, the feedback and experience gathered for novel features contribute to reshaping and refining them. Once a given feature has reached the expected stability and quality level, it is then able to leverage the regular mechanisms, such as JEPs with or without feedback mechanisms, with the ultimate goal of being made a permanent feature of the Java platform.
