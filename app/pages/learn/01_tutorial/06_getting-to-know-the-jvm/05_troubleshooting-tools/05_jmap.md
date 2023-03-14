---
id: jvm.troubleshooting_tool.jmap
title: Jmap - Printing Detais of a Process
slug: learn/jvm/tool/troubleshooting/jmap
slug_history:
- troubleshooting/jmap
group_title: The Troubleshooting Tools
type: tutorial-group
group: troubleshooting-tools
level: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Introducing Jmap {intro}
- Synopsis {synopsis}
- Description {description}
- Options for the jmap Command {options}
description: "Printing details of a specified process."
---


<a id="intro">&nbsp;</a>
## Introducing jmap
[jmap](doc:jmap) - print details of a specified process

<a id="synopsis">&nbsp;</a>
## Synopsis


**Note:** This command is experimental and unsupported.

```shell
jmap [options] pid
```

_options_

This represents the `jmap` command-line options. See [Options for the jmap Command](#options-for-the-jmap-command).

_pid_

The process ID for which the information specified by the _options_ is to be printed. The process must be a Java process. To get a list of Java processes running on a machine, use either the `ps` command or, if the JVM processes are not running in a separate docker instance, the [jps](id:jvm.monitoring.jps) command.

<a id="description">&nbsp;</a>
## Description

The `jmap` command prints details of a specified running process.

**Note:**

This command is unsupported and might not be available in future releases of the JDK. On Windows Systems where the `dbgeng.dll` file isn't present, the Debugging Tools for Windows must be installed to make these tools work. The `PATH` environment variable should contain the location of the `jvm.dll` file that's used by the target process or the location from which the core dump file was produced.

<a id="options">&nbsp;</a>
## Options for the jmap Command

`-clstats` _pid_

Connects to a running process and prints class loader statistics of Java heap.

`-finalizerinfo` _pid_

Connects to a running process and prints information on objects awaiting finalization.

`-histo``:live` _pid_

Connects to a running process and prints a histogram of the Java object heap. If the `live` suboption is specified, it then counts only live objects.

`-dump:`_dump\_options_ _pid_

Connects to a running process and dumps the Java heap. The _dump\_options_ include:

*   `live` --- When specified, dumps only the live objects; if not specified, then dumps all objects in the heap.

*   `format=b` --- Dumps the Java heap in `hprof` binary format

*   `file=`_filename_ --- Dumps the heap to _filename_


Example:
```shell
jmap -dump:live,format=b,file=heap.bin pid
```
