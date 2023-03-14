---
id: jvm.troubleshooting_tool.jinfo
title: Jinfo - Generating Java Configuration Information
slug: learn/jvm/tool/troubleshooting/jinfo
slug_history:
- troubleshooting/jinfo
group_title: The Troubleshooting Tools
type: tutorial-group
group: troubleshooting-tools
level: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Introducing Jinfo {intro}
- Synopsis {synopsis}
- Description {description}
- Options for the jinfo Command {options}
description: "Generating Java configuration information for a specified Java process."
---

<a id="intro">&nbsp;</a>
## Introducing jinfo
[jinfo](doc:jinfo) - generate Java configuration information for a specified Java process

<a id="synopsis">&nbsp;</a>
## Synopsis

**Note:** This command is experimental and unsupported.

```shell
jinfo [option] pid
```

_option_

This represents the `jinfo` command-line options. See [Options for the jinfo Command](#options-for-the-jinfo-command).

_pid_

The process ID for which the configuration information is to be printed. The process must be a Java process. To get a list of Java processes running on a machine, use either the `ps` command or, if the JVM processes are not running in a separate docker instance, the [jps](id:jvm.monitoring.jps) command.

<a id="description">&nbsp;</a>
## Description

The `jinfo` command prints Java configuration information for a specified Java process. The configuration information includes Java system properties and JVM command-line flags. If the specified process is running on a 64-bit JVM, then you might need to specify the `-J-d64` option, for example:
```she
jinfo -J-d64 -sysprops pid
```

This command is unsupported and might not be available in future releases of the JDK. In Windows Systems where `dbgeng.dll` is not present, the Debugging Tools for Windows must be installed to have these tools work. The `PATH` environment variable should contain the location of the `jvm.dll` that's used by the target process or the location from which the core dump file was produced.

<a id="options">&nbsp;</a>
## Options for the jinfo Command

**Note:**

If none of the following options are used, both the command-line flags and the system property name-value pairs are printed.

`-flag` _name_

Prints the name and value of the specified command-line flag.

`-flag` `+`|`-`_name_

Enables or disables the specified Boolean command-line flag.

`-flag` _name_`=`_value_

Sets the specified command-line flag to the specified value.

`-flags`

Prints command-line flags passed to the JVM.

`-sysprops`

Prints Java system properties as name-value pairs.

`-h` or `-help`

Prints a help message.
