---
id: jvm.troubleshooting_tool.jstack
title: Jstack - Printing Java Stack Traces
slug: learn/jvm/tool/troubleshooting/jstack
slug_history:
- troubleshooting/jstack
group_title: The Troubleshooting Tools
type: tutorial-group
group: troubleshooting-tools
level: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Introducing Jstack {intro}
- Synopsis {synopsis}
- Description {description}
- Options for the jstack Command {options}
description: "Printing Java stack traces of Java threads for a specified Java process."
---


<a id="intro">&nbsp;</a>
## Introducing jstack
[jstack](doc:jstack) - print Java stack traces of Java threads for a specified Java process

<a id="synopsis">&nbsp;</a>
## Synopsis

**Note:** This command is experimental and unsupported.

```shell
jstack [options] pid
```

_options_

This represents the `jstack` command-line options. See [Options for the jstack Command](#options-for-the-jstack-command).

_pid_

The process ID for which the stack trace is printed. The process must be a Java process.
To get a list of Java processes running on a machine, use either the `ps` command or, if the JVM processes are not running in a separate docker instance.

<a id="description">&nbsp;</a>
## Description

The `jstack` command prints Java stack traces of Java threads for a specified Java process. For each Java frame, the full class name, method name, byte code index (BCI),
and line number, when available, are printed. C++ mangled names aren't demangled.
To demangle C++ names, the output of this command can be piped to `c++filt`.
When the specified process is running on a 64-bit JVM, you might need to specify the `-J-d64` option, for example: `jstack -J-d64` _pid_.

**Note:**

This command is unsupported and might not be available in future releases of the JDK. In Windows Systems where the `dbgeng.dll` file isn't present, the Debugging Tools for Windows must be installed so that these tools work. The `PATH` environment variable needs to contain the location of the `jvm.dll` that is used by the target process, or the location from which the core dump file was produced.

<a id="options">&nbsp;</a>
## Options for the jstack Command

`-l`

The long listing option prints additional information about locks.

`-h` or `-help`

Prints a help message.
