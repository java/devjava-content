---
id: jvm.gc.gc_in_java
title: Garbage Collection in Java
slug: learn/jvm/tool/garbage-collection/java-specifics
slug_history:
- gc/gc-in-java
type: tutorial-group
group: gc-overview
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Garbage Collection in Java {garbage-collection-in-java}
- Heap Memory {heap-memory}
- Garbage Collection Process {garbage-collection-process}
---

<a id="garbage-collection-in-java">&nbsp;</a>
## Garbage Collection in Java

In the previous section, we learned that Java uses a garbage collector for memory management. But how does a garbage collector actually work? We will take a closer look at that in this section.

### Types of Garbage Collectors 

Within the HotSpot JVM, the Garbage Collector isn't a single unified concept, but has multiple implementations. Which garbage collector implementation to use will depend upon the hardware resources available and the performance requirements of your application.

* **Serial Garbage Collector** - Performs all garbage collection on a single thread. It has higher pause times but lower resource usage. Best used on systems with only a single processor.  
* **Parallel Garbage Collector** - Similar to the serial garbage collector, but can utilize multiple threads for performing garbage collector work.
* **Concurrent Mark Sweep (CMS) Garbage Collector** (Deprecated in JDK 9, Removed in JDK 14) - Reduces garbage collection pause times by performing some garbage collector work while the application runs. 
* **Garbage First (G1) Garbage Collector** (Default since JDK 9) - Improves upon and replaces the CMS GC. G1 is ideally suited for multi-processor machines with access to large amounts of memory.   
* **ZGC** (Experimental in JDK 11, Production in JDK 15) - Ultra-low latency GC that can be scaled for applications with multi-terabyte heaps. The internal implementation and behavior of ZGC are distinctly different from the other garbage collectors listed, and a description of its behavior will be handled in a separate article.

<a id="heap-memory">&nbsp;</a>
## Heap Memory

Heap memory is an allocation of system memory that the JVM controls. The size of heap memory available to the JVM is primarily controlled with the `-Xms<value>` and `-Xmx<value>` JVM args. `-Xms<value>` sets the initial heap size and minimum heap size. While `-Xmx<value>` will set the max heap size. 

If heap memory becomes full, it will cause the JVM to throw `java.lang.OutOfMemoryError` exceptions when the JVM attempts to allocate space for new objects. For most implementations of garbage collectors in Java, heap memory is divided into multiple regions based on the "age" of an object. The number and types of regions will vary depending on the specific implementation of the garbage collector. 

### Generational Garbage Collection

Most garbage collectors in Java are generational garbage collectors. Generational garbage collectors are designed to take advantage of the weak generational hypothesis, which posits that most objects are short-lived. Consequently, generational garbage collectors divide the heap into young and old generations. On allocation, objects start in a young generation, objects in young generations are frequently checked if they are no longer reachable. If an object survives enough garbage collection cycles, it'll be copied to an old generation, which is less frequently checked.

The advantage generational garbage collectors provide is a more efficient use of CPU time. The garbage collector will more productively spend CPU time scanning a subset of the heap where its more likely to encounter objects that are candidates for removal. This more efficient CPU time usage can then be used to reduce pause times, improve throughput, or reduce memory usage; the exact improvement in these areas would depend upon the garbage collector's heuristics and how it has been configured. 

#### Generations

As mentioned earlier, the memory heap in generational garbage collectors is divided into spaces. Let's look at these generations in more detail.

* **Young Space** - The Young Region, as the name suggests, is the heap region that contains newly allocated objects. The Young Region is itself further divided into more regions.

  * **Eden Space** - On allocation, an object is stored in the Eden region of the heap until its first garbage collection. 
  * **Survivor Spaces** - Objects that have survived a GC cycle are copied to a survivor region. Generational collectors typically have multiple "survivor" regions; the purpose is to improve garbage collector efficiency by copying surviving objects to a new survivor region and then deallocating the entire old survivor region. 

* **Old Region** - If an object gains enough "age" by surviving GC cycles, it will be copied to the old region. As covered earlier, the garbage collector rarely scans the old region for no longer reachable objects.

* **Permanent/Metaspace Region** - The final region is the permanent or metaspace region. Objects stored in here are typically JVM metadata, core system classes, and other data that typically exist for near the entire duration of the JVM life. 

<a id="garbage-collection-process">&nbsp;</a>
## Garbage Collection Process

At a high level, garbage collectors have three phases; mark, sweep, and compaction. Each of these steps have distinct responsibilities. Though note that dependening on the garbage collector implementation, there might be additional sub-phases within each phase that are not covered here.

### Mark

On object creation, every object is given, by the VM, a 1 bit marking value, initially set to false (`0`). The garbage collector uses this value to mark if an object is reachable. At the start of a garbage collection, the garbage collector traverses the object graph and marks any object it can reach as true (`1`).

The garbage collector doesn't scan each object individually, but insteads starts from "root" objects. Examples of root objects are; local variabes, static class fields, active Java threads, and JNI references. 

### Sweep
During the sweep phase all objects that are unreachable, those whose marking bit currently false (`0`), are removed. 

### Compaction
The final phase of a garbage collection is the compaction phase. Live objects in the eden region or an occupied survivor region are moved and/or copied to an empty survivor region. If an object in a survivor region has gained enough tenureship, it is moved or copied to an old region. 

### Garbage Collection Pause

During a garbage collection, there might be periods where some, or even all, processing within the JVM is paused, these are called Stop-the-World Events. As mentioned in the introduction of the Heap Memory section, objects stored in heap memory are not thread safe. This in turn means that during a garbage collection, part, or all, of the JVM must be paused for a period while the garbage collector works to prevent errors from occuring as objects are checked for usage, deleted, and moved or copied.

Tools like JDK Flight Recorder (JFR) and Visual VM can be used to monitor the frequency and duration of pauses occuring from garbage collection. How to tune a garbage collector is outside the scope of this tutorial, but monitoring garbage collector behavior, and subseqently tuning it through JVM arguments, can be key way to improve the performance of an application.

### Types of Garbage Collections

Just like there are different regions of heap memory, there are also different types of garbage collections. 

* **Minor** - Minor garbage collections only scan the Young Regions of heap memory. Minor garbage collections occur very frequently and often have very low pause times associated with them.  
* **Major** - Major garbage collections scan both the Young and Old regions of heap memory. Major garbage collections occur much less frequently than minor garbage collections, often being triggered by specific conditions within the VM, for example, when a threshold percentage of heap memory has been used. 
