---
id: jvm.monitoring.jconsole
title: Jconsole - the Graphical Monitor of Your Application
slug: learn/jvm/tools/monitoring/jconsole
slug_history:
- monitoring/jconsole
group_title: Monitoring Tools
type: tutorial-group
group: monitoring-tools
level: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Introducing Jconsole {intro}
- Synopsis {synopsis}
- Options {options}
- Description {description}
description: "Start a graphical console to monitor and manage Java applications."
---


<a id="intro">&nbsp;</a>
## Introducing Jconsole
[jconsole](doc:jconsole) - start a graphical console to monitor and manage Java applications

<a id="synopsis">&nbsp;</a>
## Synopsis

```shell
jconsole [-interval=n] [-notile] [-plugin path] [-version] [connection ... ] [-Jinput_arguments]

jconsole -help
```

<a id="options">&nbsp;</a>
## Options

`-interval`

Sets the update interval to `n` seconds (default is 4 seconds).

`-notile`

Doesn't tile the windows for two or more connections.

`-pluginpath` _path_

Specifies the path that `jconsole` uses to look up plug-ins. The plug-in _path_ should contain a provider-configuration file named `META-INF/services/com.sun.tools.jconsole.JConsolePlugin` that contains one line for each plug-in. The line specifies the fully qualified class name of the class implementing the `com.sun.tools.jconsole.JConsolePlugin` class.

`-version`

Prints the program version.

_connection_ = _pid_ | _host_`:`_port_ | _jmxURL_

A connection is described by either _pid_, _host_`:`_port_ or _jmxURL_.

*   The _pid_ value is the process ID of a target process. The JVM must be running with the same user ID as the user ID running the `jconsole` command.

*   The _host_`:`_port_ values are the name of the host system on which the JVM is running, and the port number specified by the system property `com.sun.management.jmxremote.port` when the JVM was started.

*   The _jmxUrl_ value is the address of the JMX agent to be connected to as described in JMXServiceURL.


`-J`_input\_arguments_

Passes _input\_arguments_ to the JVM on which the `jconsole` command is run.

`-help` or `--help`

Displays the help message for the command.

<a id="description">&nbsp;</a>
## Description

The `jconsole` command starts a graphical console tool that lets you monitor and manage Java applications and virtual machines on a local or remote machine.

On Windows, the `jconsole` command doesn't associate with a console window. It does, however, display a dialog box with error information when the `jconsole` command fails.
