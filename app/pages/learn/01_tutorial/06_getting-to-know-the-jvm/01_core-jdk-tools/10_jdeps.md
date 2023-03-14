---
id: jvm.core_tools.jdeps
title: Jdeps - Analyze your Java Classes Dependencies
slug: learn/jvm/tools/core/jdeps
slug_history:
- tools/jdeps
group_title: The Core JDK Tools
type: tutorial-group
group: core-jdk-tools
level: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
toc:
- Introducing jdeps {intro}
- Synopsis {synopsis}
- Description {description}
- Options {options}
- Module Dependency Analysis Options {module-dependency-analysis-options}
- Options to Filter Dependencies {options-to-filter-dependencies}
- Options to Filter Classes to be Analyzed {options-to-filter-classes}
- Example of Analyzing Dependencies {example}
description: "Analyzing your Java class dependency with the jdeps tool."
---


<a id="intro">&nbsp;</a>
## Introducing jdeps
[jdeps](doc:jdeps) - launch the Java class dependency analyzer

<a id="synopsis">&nbsp;</a>
## Synopsis

```shell
jdeps [options] path ...
```

`options`
Command-line options. For detailed descriptions of the options that can be used, see

    Possible Options
    Module Dependency Analysis Options
    Options to Filter Dependencies
    Options to Filter Classes to be Analyzed

`path`
A pathname to the `.class` file, directory, or JAR file to analyze.

<a id="description">&nbsp;</a>
## Description

The jdeps command shows the package-level or class-level dependencies of Java class files.
The input class can be a path name to a .class file, a directory, a JAR file, or it can be a fully qualified class name to analyze all class files.
The options determine the output. By default, the jdeps command writes the dependencies to the system output.
The command can generate the dependencies in DOT language (see the `-dotoutput` option).

<a id="options">&nbsp;</a>
## Options

`-dotoutput dir` or `--dot-output dir`
Specifies the destination directory for DOT file output. If this option is specified, then the jdeps command generates one .dot file for each analyzed archive named archive-file-name.dot that lists the dependencies, and also a summary file named summary.dot that lists the dependencies among the archive files.

`-s` or `-summary`
Prints a dependency summary only.

`-v` or `-verbose`
Prints all class-level dependencies. This is equivalent to
```shell
-verbose:class -filter:none
```

`-verbose:package`
Prints package-level dependencies excluding, by default, dependencies within the same package.

`-verbose:class`
Prints class-level dependencies excluding, by default, dependencies within the same archive.

`-apionly` or `--api-only`
Restricts the analysis to APIs, for example, dependencies from the signature of public and protected members of public classes including field type, method parameter types, returned type, and checked exception types.

`-jdkinternals` or -`-jdk-internals`
Finds class-level dependencies in the JDK internal APIs. By default, this option analyzes all classes specified in the --class-path or -classpathoption and input files unless you specified the -include option. You can’t use this option with the -p, -e, and -s options.

**_WARNING: The JDK internal APIs are inaccessible._**

`-cp path`, `-classpath path`, or `--class-path path`
Specifies where to find class files.

`--module-path module-path`
Specifies the module path.

`--upgrade-module-path module-path`
Specifies the upgrade module path.

`--system java-home`
Specifies an alternate system module path.

`--add-modules module-name [, module-name...]`
Adds modules to the root set for analysis.

`--multi-release version`
Specifies the version when processing multi-release JAR files. version should be an integer >=9 or base.

`—q` or -`quite`
Doesn’t show missing dependencies from –generate-module-info output.

`-version` or `--version`
Prints version information.


<a id="module-dependency-analysis-options">&nbsp;</a>
## Module Dependency Analysis Options

`–m module-name` or `--module module-name`
Specifies the root module for analysis.

`--generate-module-info dir`
Generates module-info.java under the specified directory. The specified JAR files will be analyzed.
This option cannot be used with `--dot-output` or `--class-path` options. Use the `--generate-open-module` option for open modules.

`--generate-open-module dir`
Generates module-info.java for the specified JAR files under the specified directory as open modules. This option cannot be used with the --dot-output or --class-path options.

`--check module-name [, module-name...]`
Analyzes the dependencies of the specified modules. It prints the module descriptor,
the resulting module dependencies after analysis, and the graph after transition reduction. It also identifies any unused qualified exports.

`--list-deps`
Lists the module dependencies and also the package names of JDK internal APIs (if referenced).

`--list—reduced-deps`
Same as `--list-deps` without listing the implied reads edges from the module graph.
If module M1 reads M2, and M2 requires transitive on M3, then M1 reading M3 is implied and is not shown in the graph.

`--print-module-deps`
Same as `--list-reduced-deps` with printing a comma-separated list of module dependencies. The output can be used by jlink --add-modules to create a custom image that contains those modules and their transitive dependencies.


<a id="options-to-filter-dependencies">&nbsp;</a>
## Options to Filter Dependencies

`-p pkg name`, `-package pkg name`, or `--package pkg name`
Finds dependencies matching the specified package name. You can specify this option multiple times for different packages. The `-p` and `-e` options are mutually exclusive.

`-e regex`, `-regex regex`, or `--regex regex`
Finds dependencies matching the specified pattern. The `-p` and `-e` options are mutually exclusive.

`--require module-name`
Finds dependencies matching the given module name (may be specified multiple times). The `--package`, `--regex`, and `--require` options are mutually exclusive.

`-f regex` or -`filter regex`
Filters dependencies matching the given pattern. If given multiple times, the last one will be selected.

`-filter:package`
Filters dependencies within the same package. This is the default.

`-filter:archive`
Filters dependencies within the same archive.

`-filter:module`
Filters dependencies within the same module.

`-filter:none`
No -filter:package and -filter:archive filtering. Filtering specified via the -filter option still applies.


<a id="options-to-filter-classes">&nbsp;</a>
## Options to Filter Classes to be Analyzed

`-include regex`
Restricts analysis to the classes matching pattern. This option filters the list of classes to be analyzed. It can be used together with -p and -e, which apply the pattern to the dependencies.

`-P` or `-profile`
Shows the profile containing a package.

`-R` or `-recursive`
Recursively traverses all run-time dependencies. The -R option implies -filter:none. If -p, -e, or -f options are specified, only the matching dependencies are analyzed.

`-I` or -`inverse`
Analyzes the dependencies per other given options and then finds all artifacts that directly and indirectly depend on the matching nodes.
This is equivalent to the inverse of the compile-time view analysis and the print dependency summary. This option must be used with the `--require`, `--package`, or `--regex` options.

`--compile-time`
Analyzes the compile-time view of transitive dependencies, such as the compile-time view of the -R option.
Analyzes the dependencies per other specified options. If a dependency is found from a directory, a JAR file, or a module, all classes in that containing archive are analyzed.


<a id="example">&nbsp;</a>
## Example of Analyzing Dependencies

The following example demonstrates analyzing the dependencies of the `Notepad.jar` file.

**Linux and macOS:**
```shell
$ jdeps demo/jfc/Notepad/Notepad.jar
Notepad.jar -> java.base
Notepad.jar -> java.desktop
Notepad.jar -> java.logging
   <unnamed> (Notepad.jar)
      -> java.awt
      -> java.awt.event
      -> java.beans
      -> java.io
      -> java.lang
      -> java.net
      -> java.util
      -> java.util.logging
      -> javax.swing
      -> javax.swing.border
      -> javax.swing.event
      -> javax.swing.text
      -> javax.swing.tree
      -> javax.swing.undo
```

**Windows:**
```shell
C:\Java\jdk1.9.0>jdeps demo\jfc\Notepad\Notepad.jar
Notepad.jar -> java.base
Notepad.jar -> java.desktop
Notepad.jar -> java.logging
   <unnamed> (Notepad.jar)
      -> java.awt
      -> java.awt.event
      -> java.beans
      -> java.io
      -> java.lang
      -> java.net
      -> java.util
      -> java.util.logging
      -> javax.swing
      -> javax.swing.border
      -> javax.swing.event
      -> javax.swing.text
      -> javax.swing.tree
      -> javax.swing.undo
```

Using the --inverse Option
```shell
$ jdeps --inverse --require java.xml.bind  
Inverse transitive dependences on [java.xml.bind] 
java.xml.bind <- java.se.ee 
java.xml.bind <- jdk.xml.ws 
java.xml.bind <- java.xml.ws <- java.se.ee 
java.xml.bind <- java.xml.ws <- jdk.xml.ws 
java.xml.bind <- jdk.xml.bind <- jdk.xml.ws  
```
