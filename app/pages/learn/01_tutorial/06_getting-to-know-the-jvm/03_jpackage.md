---
id: jvm.jpackage
title: JPackage
slug: learn/jvm/tool/jpackage
slug_history:
- jpackage
type: tutorial
category: jvm
category_order: 3
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Introducing Jpackage {intro}
- Synopsis {synopsis}
- Description {description}
- Options {options}
- Examples {examples}
description: "Packaging your application to create a native installer."
---


<a id="intro">&nbsp;</a>
## Introducing Jpackage
[jpackage](doc:jpackage) - package a self-contained Java application

<a id="synopsis">&nbsp;</a>
## Synopsis

```shell
jpackage [options]
```

`options`
Command-line options separated by spaces. See `jpackage` Options.

<a id="description">&nbsp;</a>
## Description

The `jpackage` tool will take as input a Java application and a Java run-time image, and produce a Java application image that includes all the necessary dependencies.
It will be able to produce a native package in a platform-specific format, such as an exe on Windows or a dmg on macOS.
Each format must be built on the platform it runs on, there is no cross-platform support.
The tool will have options that allow packaged applications to be customized in various ways.

<a id="options">&nbsp;</a>
## Options

### Generic Options

`@filename`
Read options and/or mode from a file.

This option can be used multiple times.

`--type or -t <type string>`
The type of package to create

Valid values are: {`app-image`, `exe`, `msi`, `rpm`, `deb`, `pkg`, `dmg`}

If this option is not specified a platform dependent default type will be created.

`--app-version <version>`
Version of the application and/or package`

`--copyright <copyright string>`
Copyright for the application.

`--description <description string>`
Description of the application.

`--help` or `-h`
Print the usage text with a list and description of each valid option for the current platform to the output stream, and exit.

`--name` or `-n <name>`
Name of the application and/or package.

`--dest` or `-d <output path>`
Path where generated output file is placed

Defaults to the current working directory (absolute path or relative to the current directory).

`--temp <file path>`
Path of a new or empty directory used to create temporary files (absolute path or relative to the current directory).
If specified, the temp dir will not be removed upon the task completion and must be removed manually.
If not specified, a temporary directory will be created and removed upon the task completion.

`--vendor <vendor string>`
Vendor of the application.

`--verbose`
Enables verbose output.

`--version`
Print the product version to the output stream and exit.

### Options for creating the runtime image

`--add-modules <module name> [,<module name>...]`
A comma (`,`) separated list of modules to add.

This module list, along with the main module (if specified) will be passed to `jlink` as the `--add-module` argument.
If not specified, either just the main module (if `--module` is specified), or the default set of modules (if `--main-jar` is specified) are used.

This option can be used multiple times.

`--module-path` or `-p <module path>...`
A File.pathSeparator separated list of paths.
Each path is either a directory of modules or the path to a modular jar, and is absolute or relative to the current directory.
This option can be used multiple times.

`--jlink-options <jlink options>`
A space separated list of options to pass to `jlink`
If not specified, defaults to `--strip-native-commands --strip-debug --no-man-pages --no-header-files`
This option can be used multiple times.

`--runtime-image <file paths>`
Path of the predefined runtime image that will be copied into the application image (absolute path or relative to the current directory).

If --runtime-image is not specified, `jpackage` will run `jlink` to create the runtime image using options:` --strip-debug`, `--no-header-files`, `--no-man-pages`, and `--strip-native-commands`.

### Options for creating the application image

`--icon <icon file path>`
Path of the icon of the application bundle (absolute path or relative to the current directory).

`--input` or `-i <input path>`
Path of the input directory that contains the files to be packaged (absolute path or relative to the current directory).
All files in the input directory will be packaged into the application image.

### Options for creating the application launcher(s)

`--add-launcher <launcher name>=<file path>`
Name of launcher, and a path to a Properties file that contains a list of key, value pairs (absolute path or relative to the current directory).

The keys `module`, `add-modules`, `main-jar`, `main-class`, `arguments`, `java-options`, `app-version`, `icon`, and `win-console` can be used.

These options are added to, or used to overwrite, the original command line options to build an additional alternative launcher.
The main application launcher will be built from the command line options.
Additional alternative launchers can be built using this option, and this option can be used multiple times to build multiple additional launchers.

`--arguments <main class arguments>`
Command line arguments to pass to the main class if no command line arguments are given to the launcher.
This option can be used multiple times.

`--java-options <java options>`
Options to pass to the Java runtime.

This option can be used multiple times.

`--main-class <class name>`
Qualified name of the application main class to execute.

This option can only be used if `--main-jar` is specified.

`--main-jar <main jar file>`
The main JAR of the application; containing the main class (specified as a path relative to the input path).
Either `--module` or `--main-jar` option can be specified but not both.

`--module or -m <module name>/<main class>]`
The main module (and optionally main class) of the application This module must be located on the module path.
When this option is specified, the main module will be linked in the Java runtime image. Either `--module` or `--main-jar` option can be specified but not both.


### Platform dependent option for creating the application launcher

**Windows platform options (available only when running on Windows)**

`--win-console`
Creates a console launcher for the application, should be specified for application which requires console interactions.

**macOS platform options (available only when running on macOS)**

`--mac-package-identifier <ID string>`
An identifier that uniquely identifies the application for macOSX.

Defaults to the main class name.

May only use alphanumeric (`A-Z,a-z,0-9`), hyphen (`-`), and period (`.`) characters.

`--mac-package-name <name string>`
Name of the application as it appears in the Menu Bar.
This can be different from the application name.
This name must be less than 16 characters long and be suitable for displaying in the menu bar and the application Info window.
Defaults to the application name.

`--mac-bundle-signing-prefix <prefix string>`
When signing the application bundle, this value is prefixed to all components that need to be signed that don't have an existing bundle identifier.

`--mac-sign`
Request that the bundle be signed.

`--mac-signing-keychain <file path>`
Path of the keychain to search for the signing identity (absolute path or relative to the current directory).
If not specified, the standard keychains are used.

`--mac-signing-key-user-name <team name>`
Team name portion in Apple signing identities' names.
For example "Developer ID Application: <team name>"

### Options for creating the application package

`--app-image <file path>`
Location of the predefined application image that is used to build an installable package (absolute path or relative to the current directory).

See create-app-image mode options to create the application image.

`--file-associations <file path>`
Path to a Properties file that contains list of key, value pairs (absolute path or relative to the current directory).

The keys `extension`, `mime-type`, `icon`, and `description` can be used to describe the association.

This option can be used multiple times.

`--install-dir <file path>`
Absolute path of the installation directory of the application on OS X or Linux.
Relative sub-path of the installation location of the application such as "`Program Files"` or `AppData` on Windows.

`--license-file <file path>`
Path to the license file (absolute path or relative to the current directory).

`--resource-dir <path>`
Path to override `jpackage` resources (absolute path or relative to the current directory).

Icons, template files, and other resources of `jpackage` can be over-ridden by adding replacement resources to this directory.

`--runtime-image <file-path>`
Path of the predefined runtime image to install (absolute path or relative to the current directory).
Option is required when creating a runtime installer.

### Platform dependent options for creating the application package

**Windows platform options (available only when running on Windows)**

`--win-dir-chooser`
Adds a dialog to enable the user to choose a directory in which the product is installed.

`--win-menu`
Adds the application to the system menu.

`--win-menu-group <menu group name>`
Start Menu group this application is placed in.

`--win-per-user-install`
Request to perform an install on a per-user basis.

`--win-shortcut`
Creates a desktop shortcut for the application.

`--win-upgrade-uuid <id string>`
UUID associated with upgrades for this package.

**Linux platform options (available only when running on Linux)**

`--linux-package-name <package name>`
Name for Linux package, defaults to the application name.

`--linux-deb-maintainer <email address>`
Maintainer for .deb bundle.

`--linux-menu-group <menu-group-name>`
Menu group this application is placed in.

`--linux-package-deps`
Required packages or capabilities for the application

`--linux-rpm-license-type <type string>`
Type of the license ("License: <value>" of the RPM .spec).

`--linux-app-release <release string>`
Release value of the RPM <name>.spec file or Debian revision value of the DEB control file.

`--linux-app-category <category string>`
Group value of the RPM <name>.spec file or Section value of DEB control file.

`--linux-shortcut`
Creates a shortcut for the application

<a id="examples">&nbsp;</a>
## Examples

**Generate an application package suitable for the host system.**
For a modular application:
```shell
jpackage -n name -p modulePath -m moduleName/className
```

For a non-modular application:
```shell
jpackage -i inputDir -n name --main-class className --main-jar myJar.jar
```

From a pre-built application image:
```shell
jpackage -n name --app-image appImageDir
```

**Generate an application image**
For a modular application:
```shell
jpackage --type app-image -n name -p modulePath -m moduleName/className
```

For a non-modular application:
```shell
jpackage --type app-image -i inputDir -n name --main-class className --main-jar myJar.jar
```

To provide your own options to jlink, run jlink separately:
```shell
jlink --output appRuntimeImage -p modulePath -m moduleName --no-header-files [<additional jlink options>...]

jpackage --type app-image -n name -m moduleName/className --runtime-image appRuntimeImage

jpackage -n name --runtime-image <runtime-image>
```

Generate a Java runtime package:
```shell
jpackage -n name --runtime-image <runtime-image>
```