---
id: organizing.jlink
title: Creating Runtime and Application Images with JLink
slug: learn/jlink
slug_history:
- learn/creating-runtime-and-application-images-with-jlink
type: tutorial
category: organizing
category_order: 2
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
description: "Learn how to use the command line tool `jlink` to create custom-made runtime images or self-contained application images."
last_review: 2021-11-03
---

With the command line tool `jlink` you can select a number of [modules](id:organizing.modules.intro), platform modules as well as those making up your application, and link them into a runtime image.
Such a runtime image acts like the JDK [that you can download](/download) but contains just the modules you picked and the dependencies they need to function.
If those include your project, the result is a self-contained deliverable of your application, meaning it does not depend on a JDK being installed on the target system.
During the linking phase, `jlink` can further optimize image size and improve VM performance, particularly startup time.

While it doesn't matter much for `jlink` it is helpful to distinguish between creating _runtime images_, a subset of the JDK, and _application images_, which also contain project-specific modules, so we'll go in that order.

**Note:**
`jlink` "just" links bytecode - it does _not_ compile it to machine code, so this is no ahead-of-time compilation.


## Creating Runtime Images {#runtime}

To create an image, `jlink` needs two pieces of information, each specified with a command line option:

* which modules to start with / `--add-modules`
* in which folder to create the image / `--output`

Given these command line options, `jlink` [resolves modules](id:organizing.modules.intro), starting with the ones listed with `--add-modules`.
But it has a few peculiarities:

* [services](id:organizing.modules.services) are not bound by default - we'll see further below what to do about that
* [optional dependencies](id:organizing.modules.optdepedencies) are not resolved - they need to be added manually
* [automatic modules](id:organizing.modules.automatic) are not allowed - we'll discuss this when we get to application images

Unless any problems like missing or duplicate modules are encountered, the resolved modules (root modules plus transitive dependencies) end up in the new runtime image.

### The Smallest Runtime {#java-base}

Let's have a look at that.
The simplest possible runtime image contains only the base module:

```shell
# create the image
$ jlink
	--add-modules java.base
	--output jdk-base
# use the image's java launcher to list all contained modules
$ jdk-base/bin/java --list-modules
> java.base
```


## Creating Application Images {#application}

As mentioned before, `jlink` doesn't distinguish between modules from the JDK and others, so you can use a similar approach to create an image containing an entire application, meaning it contains application modules (the app itself plus its dependencies) and the platform modules needed to support them.
To create such an image, you need to:

* use `--module-path` to let `jlink` know where to find the app modules
* use `--add-modules` with the application's main module and others as needed, e.g. services (see below) or optional dependencies

Taken together, the platform and application modules that the image contains are known as _system modules_.
Note that `jlink` only operates on explicit modules, so an application depending on [automatic modules](id:organizing.modules.automatic) can't be linked into an image.

### The Optional Module Path {#app-module-path}

As an example, let's assume the application's modules can be found in a folder `mods` and it's main module is called `com.example.app`.
Then the following command creates an image in the folder `app-image`:

```shell
# create the image
$ jlink
	--module-path mods
	--add-modules com.example.main
	--output app-image

# list contained modules
$ app-image/bin/java --list-modules
> com.example.app
# other app modules
> java.base
# other java/jdk modules
```

Because the image contains the entire application, you don't need to use the module path when launching it:

```shell
$ app-image/bin/java --module com.example.app/com.example.app.Main
```

While you don't have to use the module path, you can, though.
In that case, system modules will always shadow modules of the same name on the module path - it will be as if those on the module path don't exist.
So you can't use the module path to replace system modules, but you can add additional modules to the application.
This will likely be service providers, which allows you to ship an image with your application while still allowing users to easily extend it locally.

### Generating a Native Launcher {#launcher}

Application modules can include a custom launcher, which is an executable script (shell on Unix-based operating systems, batch on Windows) in the image's `bin` folder that is preconfigured to start the JVM with a concrete module and main class.
To create a launcher, use the `--launcher $NAME=$MODULE/$MAIN-CLASS` option:

* `$NAME` is the file name you pick for the executable
* `$MODULE` is the name of the module to launch with
* `$MAIN-CLASS` is the name of the module's main class

The latter two are what you would normally put behind `java --module`.
And like there, if the module defines a main class, you can leave `/$MAIN-CLASS` out.

Expanding on the example above, this is how to create a launcher named `app`:

```shell
# create the image
$ jlink
	--module-path mods
	--add-modules com.example.main
	--launcher app=com.example.app/com.example.app.Main
	--output app-image

# launch
$ app-image/bin/app
```

Using a launcher does have a downside, though:
All options you try to apply to the launching JVM will be interpreted as if you had put them behind the `--module` option, making them program arguments instead.
That means, when using a launcher, you can't ad-hoc configure the `java` command, for example to add additional services as we discussed earlier.
One way around that is to edit the script and put such options in the `JLINK_VM_OPTIONS` environment variable.
Another is to fall back to the `java` command itself, which is still available in the image.


## Including Services {#services}

To enable the creation of small and deliberately assembled runtime images, `jlink`, by default, performs no [service binding](id:organizing.modules.services) when creating an image.
Instead, service provider modules have to be included manually by listing them in `--add-modules`.
To find out which modules provide a specific service, use the option `--suggest-providers $SERVICE`, which lists all modules in the runtime or on the module path that provide an implementation of `$SERVICE`.
As an alternative to adding individual services, the option `--bind-services` can be used to include all modules that provide a service that is used by another resolved module.

Let's pick charsets like ISO-8859-1, UTF-8, or UTF-16 as an example.
The base module knows the ones you need on a daily basis, but there's a specific platform module that contains a few others: _jdk.charsets_.
The base module and _jdk.charsets_ are decoupled via services - here are the relevant parts of their module declarations:

```java
module java.base {
	uses java.nio.charset.spi.CharsetProvider;
}

module jdk.charsets {
	provides java.nio.charset.spi.CharsetProvider
		with sun.nio.cs.ext.ExtendedCharsets
}
```

When the module system resolves modules during a regular launch, service binding will pull in _jdk.charsets_ and so its charsets are always available when launching from a standard JDK.
But when creating a runtime image with `jlink`, that does not happen by default, so such images will not contain the charsets module.
If you've determined that you need them, you can simply include the module in the image with `--add-modules`:

```shell
$ jlink
	--add-modules java.base,jdk.charsets
	--output jdk-charsets
$ jdk-charsets/bin/java --list-modules
> java.base
> jdk.charsets
```


## Generating Images Across Operating Systems {#cross-os}

While the bytecode your application and library JARs contain is independent of any operating system (OS), it needs an OS-specific Java Virtual Machine to execute them - that's why you download JDKs specifically for Linux, macOS, or Windows (for example).
And because that is where `jlink` pulls platform modules from, the runtime and application images it creates are always bound to a concrete operating system.
Fortunately, it doesn't have to be the operating system on which you're running `jlink`.

If you download and unpack a JDK for a different operating system, you can place its `jmods` folder on the module path when running the `jlink` version from your system's JDK.
The linker will then determine that the image is to be created for that other OS and will hence create one that works on it (but of course not on another).
So given JDKs for all operating systems your application supports, you can generate runtime or application images for each of them on the same machine.
For that to work without problems, it is recommended to only reference modules from the exact same JDK version as the `jlink` binary, so, for example, if `jlink` has version 16.0.2, make sure it loads platform modules from JDK 16.0.2.

Let's go back to the application image we created earlier and assume, it is built on a Linux build server.
Then this is how to create an application image for Windows:

```shell
# download JDK for Windows and unpack into `jdk-win`

# create the image with the jlink binary from the system's JDK
# (in this example, Linux)
$ jlink
	--module-path jdk-win/jmods:mods
	--add-modules com.example.main
	--output app-image
```

To verify that this image is specific for Windows, check `app-image/bin`, which contains a `java.exe`.


## Optimizing the Image {#optimization}

After learning how to generate an image for or with your application, you can optimize it.
Most optimizations reduce image size and some improve launch times a bit.
Check out [the `jlink` reference](id:jvm.core_tools.jlink) for a full list of options that you can play with.
Whatever options you apply, don't forget to thoroughly test the resulting image and measure actual improvements.
