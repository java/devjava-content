---
title: Java Innovation Projects
layout: future.html
main_css_id: future
subheader_select: innovation
---

## Amber

The goal of Project Amber is to explore and incubate smaller, productivity-oriented Java language features that have been accepted as candidate JEPs under [JDK Enhancement-Proposal & Roadmap Process](jep:1). This Project is sponsored by the [Compiler Group](https://openjdk.org/groups/compiler/).

Most Project Amber features go through at least one round of Preview before becoming an official part of Java SE. See [Preview Features](jep:12) for an explanation of the Preview process, and [our tutorial](id:new_features.using_preview) on how to use preview features. For a given feature, there are separate JEPs for each round of preview and for final standardization.

Learn more at Project Amber's [Wiki](https://openjdk.org/projects/amber/), as well as Inside.java's [Amber page](https://inside.java/tag/amber).

## Loom

Project Loom is to intended to explore, incubate and deliver Java VM features and APIs built on top of them for the purpose of supporting easy-to-use, high-throughput lightweight concurrency and new programming models on the Java platform. This is accomplished by the addition of the following constructs:

* Virtual threads
* Delimited continuations
* Tail-call elimination

This OpenJDK project is sponsored by the HotSpot Group.

Learn more at Project Loom's [Wiki](https://wiki.openjdk.org/display/loom/Main), as well as Inside.java's [Loom page](https://inside.java/tag/loom).

## Panama

We are improving and enriching the connections between the Java virtual machine and well-defined but “foreign” (non-Java) APIs, including many interfaces commonly used by C programmers.

To this end, Project Panama will include most or all of these components:

* native function calling from JVM
* native data access from JVM or inside JVM heap
* new data layouts in JVM heap
* native metadata definition for JVM
* header file API extraction tools (jextract)
* native library management APIs
* native-oriented interpreter and runtime “hooks”
* class and method resolution “hooks”
* native-oriented JIT optimizations
* tooling or wrapper interposition for safety
* exploratory work with difficult-to-integrate native libraries

Learn more at Project Panama's [Wiki](https://openjdk.org/projects/panama/), as well as Inside.java's [Panama page](https://inside.java/tag/panama).


## Valhalla

The Valhalla Project is a venue to explore and incubate advanced Java VM and Language feature candidates such as "Inline types", generic specialization, enhanced volatiles, and possibly other related topics such as reified generics.

The three main goals are:

1. Align JVM memory layout behavior with the cost model of modern hardware;
2. Extend generics to allow abstraction over all types, including primitives, values, and even void;
3. Enable existing libraries -- especially the JDK -- to compatibly evolve to fully take advantage of these features.

A number of people describe Valhalla recently as being "primarily about performance".  While it is understandable why people might come to that conclusion -- many of the motivations for Valhalla are, in fact, rooted in performance considerations -- this characterization misses something very important.  Yes, performance is an important part of the story -- but so are safety, abstraction, encapsulation, expressiveness, maintainability, and compatible library evolution.

Learn more at the Valhalla Project [Wiki](https://wiki.openjdk.org/display/valhalla/Main), as well as Inside.java's [Valhalla page](https://inside.java/tag/valhalla).


## ZGC

The Z Garbage Collector, also known as ZGC, is a scalable low latency garbage collector designed to meet the following goals:

* Sub-millisecond max pause times
* Pause times do not increase with the heap, live-set or root-set size
* Handle heaps ranging from a 8MB to 16TB in size

At a glance, ZGC is:

* Concurrent
* Region-based
* Compacting
* NUMA-aware
* Using colored pointers
* Using load barriers

At its core, ZGC is a concurrent garbage collector, meaning all heavy lifting work is done while Java threads continue to execute. This greatly limits the impact garbage collection will have on your application's response time.


Learn more at the ZGC [Wiki](https://wiki.openjdk.org/display/zgc/Main), as well as Inside.java's [GC page](https://inside.java/tag/gc).

