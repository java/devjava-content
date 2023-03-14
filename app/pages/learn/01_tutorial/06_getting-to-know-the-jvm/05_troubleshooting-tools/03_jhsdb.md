---
id: jvm.troubleshooting_tool.jhsdb
title: Jhsdb - Analyzing the Core Dump of a Crashed JVM
slug: learn/jvm/tool/troubleshooting/jhsdb
slug_history:
- troubleshooting/jhsdb
group_title: The Troubleshooting Tools
type: tutorial-group
group: troubleshooting-tools
level: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Introducing Jhsdb {intro}
- Synopsis {synopsis}
- Description {description}
- Options for the debugd Mode {debugd}
- Options for the jinfo Mode {jinfo}
- Options for the jmap Mode {jmap}
- Options for the jstack Mode {jstack}
- Options for the jsnap Mode {jsnap}
description: "Attach to a Java process or launch a postmortem debugger to analyze the content of a core dump from a crashed Java Virtual Machine (JVM)."
---

<a id="intro">&nbsp;</a>
## Introducing Jhsdb
[jhsdb](doc:jhsdb) - attach to a Java process or launch a postmortem debugger to analyze the content of a core dump from a crashed Java Virtual Machine (JVM)

<a id="synopsis">&nbsp;</a>
## Synopsis

```shell
jhsdb clhsdb [--pid pid | --exe executable --core coredump]

jhsdb hsdb [--pid pid | --exe executable --core coredump]

jhsdb debugd (--pid pid | --exe executable --core coredump) [options]

jhsdb jstack (--pid pid | --exe executable --core coredump | --connect [server-id@]debugd-host) [options]

jhsdb jmap (--pid pid | --exe executable --core coredump | --connect [server-id@]debugd-host) [options]

jhsdb jinfo (--pid pid | --exe executable --core coredump | --connect [server-id@]debugd-host) [options]

jhsdb jsnap (--pid pid | --exe executable --core coredump | --connect [server-id@]debugd-host) [options]
```

_pid_

The process ID to which the `jhsdb` tool should attach. The process must be a Java process. To get a list of Java processes running on a machine, use the `ps` command or, if the JVM processes are not running in a separate docker instance, the [jps](id:jvm.monitoring.jps) command.

_executable_

The Java executable file from which the core dump was produced.

_coredump_

The core file to which the `jhsdb` tool should attach.

`[server-id@]debugd-host`

An optional server ID and the address of the remote debug server (debugd).

_options_

The command-line options for a `jhsdb` mode.
See [Options for the debugd Mode](#options-for-the-debugd-mode),
[Options for the jstack Mode](#options-for-the-jstack-mode),
[Options for the jmap Mode](#options-for-the-jmap-mode),
[Options for the jinfo Mode](#options-for-the-jinfo-mode),
and [Options for the jsnap Mode](#options-for-the-jsnap-mode).

**Note:**

Either the _pid_ or the pair of _executable_ and _core_ files or the `[server-id@]debugd-host` must be provided for `debugd`, `jstack`, `jmap`, `jinfo` and `jsnap` modes.

<a id="description">&nbsp;</a>
## Description

You can use the `jhsdb` tool to attach to a Java process or to launch a postmortem debugger to analyze the content of a core-dump from a crashed Java Virtual Machine (JVM). This command is experimental and unsupported.

**Note:**

Attaching the `jhsdb` tool to a live process will cause the process to hang and the process will probably crash when the debugger detaches.

The `jhsdb` tool can be launched in any one of the following modes:

`jhsdb clhsdb`

Starts the interactive command-line debugger.

`jhsdb hsdb`

Starts the interactive GUI debugger.

`jhsdb debugd`

Starts the remote debug server.

`jhsdb jstack`

Prints stack and locks information.

`jhsdb jmap`

Prints heap information.

`jhsdb jinfo`

Prints basic JVM information.

`jhsdb jsnap`

Prints performance counter information.

`jhsdb` _command_ `--help`

Displays the options available for the _command_.

<a id="debugd">&nbsp;</a>
## Options for the debugd Mode

`--serverid` _server-id_

An optional unique ID for this debug server. This is required if multiple debug servers are run on the same machine.

`--rmiport` _port_

Sets the port number to which the RMI connector is bound. If not specified a random available port is used.

`--registryport` _port_

Sets the RMI registry port. This option overrides the system property 'sun.jvm.hotspot.rmi.port'. If not specified, the system property is used. If the system property is not set, the default port 1099 is used.

`--hostname` _hostname_

Sets the hostname the RMI connector is bound. The value could be a hostname or an IPv4/IPv6 address. This option overrides the system property 'java.rmi.server.hostname'. If not specified, the system property is used. If the system property is not set, a system hostname is used.

<a id="jinfo">&nbsp;</a>
## Options for the jinfo Mode

`--flags`

Prints the VM flags.

`--sysprops`

Prints the Java system properties.

no option

Prints the VM flags and the Java system properties.

<a id="jmap">&nbsp;</a>
## Options for the jmap Mode

no option

Prints the same information as `pmap`.

`--heap`

Prints the `java` heap summary.

`--binaryheap`

Dumps the `java` heap in `hprof` binary format.

`--dumpfile` _name_

The name of the dumpfile.

`--histo`

Prints the histogram of `java` object heap.

`--clstats`

Prints the class loader statistics.

`--finalizerinfo`

Prints the information on objects awaiting finalization.

<a id="jstack">&nbsp;</a>
## Options for the jstack Mode

`--locks`

Prints the `java.util.concurrent` locks information.

`--mixed`

Attempts to print both `java` and native frames if the platform allows it.

<a id="jsnap">&nbsp;</a>
## Options for the jsnap Mode

`--all`

Prints all performance counters.
