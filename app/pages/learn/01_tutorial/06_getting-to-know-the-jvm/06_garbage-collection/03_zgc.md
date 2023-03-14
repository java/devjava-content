---
id: jvm.gc.zgc
title: Overview of ZGC
slug: learn/jvm/tool/garbage-collection/zgc-overview
type: tutorial-group
group: gc-overview
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Introduction {introduction}
- Getting Started with ZGC {getting-started-with-zgc}
- Configuring ZGC {configuring-zgc}
- When to Use ZGC and When to Avoid ZGC {when-to-use-zgc-and-when-to-avoid-zgc}
---

<a id="introduction">&nbsp;</a>
## Introduction 
ZGC is an almost entirely concurrent, scalable, low-latency garbage collector. Capable of supporting heaps from as small as 8 MB, to as large as 16TB, while maintaining a consistent sub-millisecond pause time regardless of liveset size. 

ZGC was introduced as an experimental feature in JDK 11; and became a production feature with the JDK 15 release. This article will provide a high-level explanation of ZGC, how to get started with it, and how to configure ZGC. 

<a id="getting-started-with-zgc">&nbsp;</a>
## Getting Started with ZGC 
ZGC can be enabled with the following command:

```
-XX:+UseZGC
```

When first using ZGC it is recommended to enable GC logging, this can provide additional diagnostic information about what ZGC is doing, which can be useful for tuning purposes and comparing performance improvements or regressions when using ZGC to other GCs. Setting GC logging to info can be enabled with:

```
-Xlog:gc
```
For more detailed information on enabling and configuring GC logging check the [reference guide here.](https://docs.oracle.com/en/java/javase/19/docs/specs/man/java.html#enable-logging-with-the-jvm-unified-logging-framework) 


<a id="configuring-zgc">&nbsp;</a>
## Configuring ZGC
ZGC was designed to require minimal configuration. In most cases, the only configuration needed is to set max heap size `-Xmx`. When setting the max heap size, it's important to provide headroom beyond expected live set size. The more headroom provided, the less allocation pressure ZGC will be under, as a result the better the performance. This however needs to be weighed against the desire to not waste memory. The specific balance to the amount of headroom to provide will be on a case-by-case basis, so will require testing and tuning to find the ideal setup for your needs. 

### Additional ZGC Configuration
* `-XX:ConcGCThreads` - ZGC will automatically set the number of concurrent threads it will use through internal GC hueristics, however this setting can be manually configured to 
* `-XX:UseLargePages` - On Linux systems, ZGC can be configured to use large pages. This generally provides performance improvements with little downside but requires complicated setup including root access. For more information on this configuration option, read [here](https://wiki.openjdk.org/display/zgc/Main#Main-EnablingLargePagesOnLinux).
* `-XX:+UseTransparentHugePages` - Huge pages can be used as an alternative Large Pages on Linux-based systems. However there might be some performance regressions from using huge pages, be sure to read more [here](https://wiki.openjdk.org/display/zgc/Main#Main-EnablingTransparentHugePagesOnLinux) on how to configure huge pages and some of the downsides involved. 
* `-XX:+UseNUMA` -  ZGC provides [NUMA Support](https://www.kernel.org/doc/html/v5.0/vm/numa.html), which is enabled by default.  This can be explicitly enabled with `-XX:+UseNUMA`, and disabled with `-XX:-UseNUMA`.
* `-XX:ZAllocationSpikeTolerance=factor` - Sets the allocation spike tolerance for ZGC. By default, this option is set to 2.0. This factor describes the level of allocation spikes to expect. For example, using a factor of 3.0 means the current allocation rate can be expected to triple at any time. 
* `-XX:ZCollectionInterval=seconds` - 
    Sets the maximum interval (in seconds) between two GC cycles when using ZGC. By default, this option is set to 0 (disabled). 
* `-XX:ZFragmentationLimit=percent` - Sets the maximum acceptable heap fragmentation (in percent) for ZGC. By default, this option is set to 25. Using a lower value will cause the heap to be compacted more aggressively, to reclaim more memory at the cost of using more CPU time. 
* `-XX:+ZProactive` - Enables proactive GC cycles when using ZGC. By default, this option is enabled. ZGC will start a proactive GC cycle if doing so is expected to have minimal impact on the running application. This is useful if the application is mostly idle or allocates very few objects, but you still want to keep the heap size down and allow reference processing to happen even when there are a lot of free space on the heap. 
* `-XX:+ZUncommit` - Enables uncommitting of unused heap memory when using ZGC. By default, this option is enabled. Uncommitting unused heap memory will lower the memory footprint of the JVM, and make that memory available for other processes to use. 
* `-XX:ZUncommitDelay=seconds` - Sets the amount of time (in seconds) that heap memory must have been unused before being uncommitted. By default, this option is set to 300 (5 minutes). Committing and uncommitting memory are relatively expensive operations. Using a lower value will cause heap memory to be uncommitted earlier, at the risk of soon having to commit it again. 


<a id="when-to-use-zgc-and-when-to-avoid-zgc">&nbsp;</a>
## When to Use ZGC and When to Avoid ZGC

ZGC was not designed or intended to be a general upgrade over existing GCs like G1 GC, Parallel GC, or Serial GC, but to satisfy a specific niche of minimizing latency times and scaling to large live sets. Consequently, you might not see a performance improvement and possibly a performance regression in metrics when switching to ZGC from other garbage collectors.

ZGC's low latency and ability to scale to handle large live sets would make it a good candidate for web applications. Web applications frequently service many requests simultaneously, often resulting in maintaining larger live sets. Consistent responsiveness also helps with system stability. This pairs well with ZGC's strengths.

On the other hand, while ZGC can operate with heaps as small as 8 MB, it is strongly discouraged to use ZGC in such a scenario. ZGC is a concurrent GC and would see significant performance issues when used on a system with a single-core processor or limited CPU resources. 

The scalability benefit in ZGC is primarily designed around scaling *up* to handle very large workloads, not scaling *down* very small workloads. 
