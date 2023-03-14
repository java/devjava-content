---
id: new_features.evolution_since_8
title: Java Platform Evolution
slug: evolution
type: tutorial
category: awareness
category_order: 1
layout: learn/tutorial.html
main_css_id: learn
subheader_select: tutorials
last_update: 2022-03-08
toc:
- Thoughtful Evolution {thoughtful-evolution}
- Accelerating Innovation {accelerating-innovation}
- Snapshot Since 8 {since-8}
- Project Amber in Action {amber-in-action}
- Performance {performance}
- Laundry List {laundry-list}
description: "Java has come a long ways since Java 8. Let's go over some of this evolution."
---

Java has been around since 1995 and is used by over 10 million developers in almost every country in the world. It truly is one of the most successful technologies in history. But this doesn't mean the platform is standing still. Quite the opposite in fact.

Java 8, [released in 2014](/download/releases/), brought [Lambda expressions](id:lang.lambda) to the Java platform as well as the Stream API, Optional class, and a host of other great features. This is one of the reasons why Java 8 became the most popular version in Java's history. Even today, it remains one of the most widely used versions of Java.

But choosing Java 8 today prevents developers from gaining access to an immense amount of progress in the language, JVM, tooling, and more. This article will attempt to summarize much of this progress. But don't just take our word for it, go try the [latest version of Java](/download/) today!


<a id="thoughtful-evolution">&nbsp;</a>
## Thoughtful Evolution

Before we dive in, let's take a minute to view how the stewards of Java think about the evolution of the Java Platform. [Brian Goetz](https://inside.java/u/BrianGoetz/), Java Language Architect, talks quite a bit about this subject. One talk in particular, [Stewardship: The Sobering Parts](https://www.youtube.com/watch?v=2y5Pv4yN0b0), is a great starting point. Brian talks about the challenges, and joys, of being that unique type of person who is happy stewarding a language over many years, carefully balancing the forces of conservatism (move slower, stay compatible) with innovation (move faster, adapt to change), only to continually find out you've upset people on both sides.

{% set embed = { slug: '2y5Pv4yN0b0', image: '/assets/images/evolution/stewardship_youtube_thumb_2.jpg' } %}
{% include "../../templates/partials/_youtube_embed.html" %}

<br />

Learn more on our [stewardship](/future/stewardship/) page with talks from [Mark Reinhold](https://inside.java/u/MarkReinhold/) and [John Rose](https://inside.java/u/JohnRose/).


<a id="accelerating-innovation">&nbsp;</a>
## Accelerating Innovation

Now with this thoughtful evolution in mind and the careful balance of conservatism and innovation, the Java team set out to increase innovation. The foundation of this effort was in changes to Java's long-standing release cadence that was feature driven over many year cycles. First proposed by [Mark Reinhold](https://inside.java/u/MarkReinhold/) in his [Moving Java Forward Faster](https://mreinhold.org/blog/forward-faster) post, Java moved to a 6-month, time-based release cadence in 2017 with a new feature release of Java becoming available like clockwork every March and September. This shift has had a dramatic impact on the ecosystem for many reasons, some obvious, and some not.

[![Release Cadence](/assets/images/evolution/release_cadence.png)](/assets/images/evolution/release_cadence.png)

The obvious benefit to the community has been the ability for developers to get their hands on new Java features every 6 months as opposed to every 2-3 years. Multiple years is a long time to wait, providing many opportunities for developers to search elsewhere for a different tool to solve their problem. This cycle contributed to the perception that Java was "standing still" even though it wasn't. Consider this: after Java 9 in 2017, the next release under the old cadence would likely have happened in 2020. A lot can happen in three years -- and in Java, it did! For example, under the new cadence, we delivered *var* in Java 10 in 2018, and made significant improvements to the G1 garbage collector in Java 12 in 2019. With a wide variety of new features in each six-month release, there's no reason to miss out by only looking at Java every three years.

In addition, with 6-month cycles, the team has been able to effectively introduce (or improve upon) models to introduce features such as the [preview system](id:new_features.using_preview), and time-based [early access builds](https://jdk.java.net/), generating feedback from the community before features become standard, at which point they will be around for a very long time.

What's more, the release cadence has allowed teams to break up large features (Project Loom, Panama, etc.) and introduce them, over time, as incremental changes resulting in better project planning and better end-user experiences. New versions of Java can be tested and introduced automatically using CI/CD pipelines, rather than big scary stop-the-world events, and users will have plenty of lead time to get used to new features. For an example of this, see the section on project Amber below.

Finally, a not-so-obvious benefit is a story of productivity and happiness for the teams working on the Java platform itself. Releases are mostly "non-events" now as they've been solidified, ready, and in many cases tested in the wild through our preview and early-access models for weeks and months in advance. If this has piqued your interest in working on Java, [here are some job postings](https://inside.java/jobs).


<a id="since-8">&nbsp;</a>
## Snapshot Since 8

For more maintainable programs, check out [Records](id:lang.records) and [Sealed Classes](doc:sealed-classes).

For more concise programs, check out [Local Interfaces](https://openjdk.java.net/jeps/395#Local-enum-classes-and-local-interfaces).

For pain-free multi-line strings, check out [Text Blocks](doc:text-blocks).

For better documentation, check out [javadoc search](https://openjdk.java.net/jeps/225) and [Code Snippets](https://openjdk.java.net/jeps/413).

For experimenting and learning, check out [jshell](id:first_app.jshell) and the [Simple Web Server](https://openjdk.java.net/jeps/408).

For easier debugging, check out [Helpful NullPointerExceptions](https://openjdk.java.net/jeps/358) and [JFR Event Streaming](https://openjdk.java.net/jeps/349).

And for the whole laundry list of new stuff since 8, keep scrolling to the [laundry list](#laundry-list-since-8) section.

<a id="amber-in-action">&nbsp;</a>
## Project Amber in Action

A picture is worth a thousand words. Here is a picture that represents [Project Amber](http://openjdk.java.net/projects/amber/), the release cadence, and the preview system in action over the last few years. As you can see, many of Amber's language features started off as preview features to collect broader feedback, and sometimes made slight changes before becoming standard.

[![Amber in Action](/assets/images/evolution/amber_in_action.png)](/assets/images/evolution/amber_in_action.png)

Learn more about Project Amber at its [wiki](http://openjdk.java.net/projects/amber/) and [Inside.java](https://inside.java/tag/amber).

Learn more about the Preview system [here](id:new_features.using_preview).

<!--
<style>
table#amber-in-action td, table#amber-in-action th {
    border: 1px solid #DDD;
}
</style>
<table id="amber-in-action">
<tr>
    <th></th>
    <th>Java 10</th>
    <th>Java 11</th>
    <th>Java 12</th>
    <th>Java 13</th>
    <th>Java 14</th>
    <th>Java 15</th>
    <th>Java 16</th>
    <th>Java 17</th>
    <th>Java 18</th>
</tr>
<tr>
    <td>Local-Variable Type Inference (Var)</td>
    <td>Standard</td>
    <td colspan="8"></td>
</tr>
<tr>
    <td>Local-Variable Syntax for Lambda Params</td>
    <td></td>
    <td>Standard</td>
    <td colspan="7"></td>
</tr>
<tr>
    <td>Switch Expressions</td>
    <td colspan="2"></td>
    <td>Preview</td>
    <td>Second Preview</td>
    <td>Standard</td>
    <td colspan="4"></td>
</tr>
<tr>
    <td>Text Blocks</td>
    <td colspan="3"></td>
    <td>Preview</td>
    <td>Second Preview</td>
    <td>Standard</td>
    <td colspan="3"></td>
</tr>
<tr>
    <td>Records</td>
    <td colspan="4"></td>
    <td>Preview</td>
    <td>Second Preview</td>
    <td>Standard</td>
    <td colspan="2"></td>
</tr>
<tr>
    <td>Pattern Matching for instanceof</td>
    <td colspan="4"></td>
    <td>Preview</td>
    <td>Second Preview</td>
    <td>Standard</td>
    <td colspan="2"></td>
</tr>
<tr>
    <td>Pattern Matching for switch</td>
    <td colspan="7"></td>
    <td>Preview</td>
    <td>Second Preview</td>
</tr>
<tr>
    <td>Sealed Classes</td>
    <td colspan="5"></td>
    <td>Preview</td>
    <td>Second Preview</td>
    <td>Standard</td>
    <td colspan="1"></td>
</tr>
</table>
-->


<a id="performance">&nbsp;</a>
## Performance

One of the most important evolutions of the Java platform over the years has been in performance. Everything from "out of the box" performance by just upgrading, to taking advantage of modern hardware, to consistent pause times with very large heaps, the Java Platform is getting better and better with each release.

With the help of the Java GC team, here are a few snapshots of the performance evolution over time, pulled from a [blog post](https://kstefanj.github.io/2021/11/24/gc-progress-8-17.html) by Stefan Johansson. To find more great information on performance directly from the Java team, check out [Inside.java](https://inside.java/tag/performance).

All results are from running the SPECjbb 2015 benchmarks with a fixed heap size of 16GB, and no tuning of GC parameters. First, you can see that the throughput achieved by each collector is higher in Java 17 than in previous releases. ZGC reached production status with Java 15.

[![Throughput](/assets/images/evolution/throughput.png)](/assets/images/evolution/throughput.png)

These are average pause times, normalized for each collector in turn. The average pause time for Parallel in 17 is approximately 60% of its average pause time in 8. Similarly for G1. 

That's a pretty good reason to try your application on 17. But of course, your eye is drawn to the ZGC area. ZGC in 17 has way lower pause times than it had in 15. 


[![Pause Times](/assets/images/evolution/pause_times.png)](/assets/images/evolution/pause_times.png)

This is a LOG graph of the ACTUAL average pause times, but with an additional column for 128GB heap. Because ZGC is fully concurrent, it achieves sub-millisecond pause times on the same workload as other collectors. 

Notice that Parallel and G1 have improved so much between 8 and 17 that you may be able to octuple the size of your data and still run with lower pauses in 17 than in 8. Let that sink in. You may be able to **octuple** the size of your data and still run with **lower** pause times in 17, with no changes to your code, no special tuning, no third-party tools. Just the Java you know and love.

You'll also notice that ZGC's pause times are constant. You can tune G1 and Parallel to have shorter pauses, but it will be hard to reach ZGC. When your product faces a 10x increase in the amount of data it has to process, the best response is to move to Java 17 and utilize G1 and ZGC.

[![Actual Pause Times](/assets/images/evolution/actual_pause_w128.png)](/assets/images/evolution/actual_pause_w128.png)

Finally let's consider footprint. Footprint means the overhead of GC data structures in native memory, so the Java heap can't use the memory. A GC using less native memory lets you co-locate more JVMs on the same machine. 

Back in Java 8, before G1 became the default, it usually had an overhead of around 20%, and that's down to around 10% in Java 17. This benchmark is relatively kind: it shows G1's overhead around 10% on Java 8, down to around 5% on Java 17.

That's roughly the same as the overhead of the Parallel collector, so moving from 8 to 17 and getting G1 by default shouldn't be significant memory-wise.

We see that ZGC's low latency does come with some cost of a higher footprint, but that'll improve over releases.


[![Footprint](/assets/images/evolution/footprint.png)](/assets/images/evolution/footprint.png)


<a id="laundry-list">&nbsp;</a>
## Laundry List Since 8

For those that want a larger laundry list of improvements to the Java platform since Java 8, categorized for easier scanning. 

### Language Features

- [Local-Variable Type Inference](https://openjdk.java.net/jeps/286)
- [Switch Expressions](id:lang.basics.switch_expressions)
- [Records](id:lang.records)
- [Sealed Classes](doc:sealed-classes)
- [Text Blocks](doc:text-blocks)
- [Pattern Matching for instanceof](id:lang.pattern_matching)
- [Pattern Matching for Switch](id:lang.pattern_matching)

### Library and Tooling

- [Simple Web Server](https://openjdk.java.net/jeps/408)
- [Code Snippets in Java API Documentation](https://openjdk.java.net/jeps/413)
- [The Java Shell Tool](id:first_app.jshell)
- [Foreign Function & Memory API](javadoc:ForeignMemoryFunctionAPI)

### Security

- [Strongly Encapsulate JDK Internals](id:organizing.modules.strongencaps)
- [Enhanced Pseudo-Random Number Generators](https://bugs.openjdk.java.net/browse/JDK-8193209)
- [Context-Specific Deserialization Filters](https://openjdk.java.net/jeps/415)


### Observability and Debugging

- [JFR Event Streaming](https://openjdk.java.net/jeps/349)
- [Helpful NullPointerExceptions](https://openjdk.java.net/jeps/358)

### Garbage Collection

- [ZGC: A Scalable Low-Latency Garbage Collector](doc:z-garbage-collector)
- [ZGC: Uncommit Unused Memory](https://malloc.se/blog/zgc-jdk15)
- [ZGC: Concurent Thread-Stack Processing](https://openjdk.java.net/jeps/376)
- [Promptly Return Unused Committed Memory from G1](https://openjdk.java.net/jeps/346)
- [NUMA-Aware Memory Allocation for G1](https://openjdk.java.net/jeps/345)
- [Elastic Metaspace](https://openjdk.java.net/jeps/387)

### Modernizing Infrastructure

- [Migrate from Mercurial to Git](https://openjdk.java.net/jeps/357)
- [Migrate to GitHub](https://openjdk.java.net/jeps/369)
- [macOS/AArch64 Port](https://openjdk.java.net/jeps/391)

### Removals and Deprecations

- [Remove the Concurrent Mark Sweep (CMS) Garbage Collector](https://openjdk.java.net/jeps/363)
- [Remove the Nashorn JavaScript Engine](https://openjdk.java.net/jeps/372)
- [Disable and Deprecate Biased Locking](https://openjdk.java.net/jeps/374)
- [Remove RMI Activation](https://openjdk.java.net/jeps/407)
- [Deprecate the Applet for Removal](https://openjdk.java.net/jeps/398)
- [Deprecate the Security Manager for Removal](https://openjdk.java.net/jeps/411)
- [Deprecate Finalization for Removal](https://openjdk.java.net/jeps/421)

### Misc

- [UTF-8 by Default](http://openjdk.java.net/jeps/400)
- [Reimplement Core Reflection with Method Handle](https://openjdk.java.net/jeps/416)
- [Internet-Address Resolution API](https://openjdk.java.net/jeps/418)


### Bonus Section: Preview/Incubator Features

- [Vector API Third Incubator](https://openjdk.java.net/jeps/417)