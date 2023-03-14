---
id: jvm.gc.app_cds
title: "Class-Data Sharing and Application Class-Data Sharing in Hotspot"
slug: learn/jvm/cps-appcds
slug_history:
- learn/class-data-sharing-and-application-class-data-sharing-in-hotspot
type: tutorial
category: jvm
category_order: 7
layout: learn/tutorial.html
main_css_id: learn
toc: 
- What is Class Data Sharing? {intro}
- Using CDS {using-cds}
- Application Class-Data Sharing {application-class-data-sharing}
- Debugging CDS {debugging-cds}
description: "Understanding how to use Class-Data Sharing in HotSpot to improve JVM performance."
---

Class-Data Sharing is HotSpot JVM Feature that help improve startup performance and reduce memory footprint when running multiple JVM processes.

<a id="intro">&nbsp;</a>
## What is Class-Data Sharing?

Class-Data Sharing (CDS) was a feature added to the HotSpot JVM as a part of the JDK 5 release and has been enhanced and expanded upon in subsequent releases of the JDK. The goal of CDS is to reduce the startup time and memory footprint of JVM processes by loading a pre-processed archive of Java classes and JVM metadata that is used during the initialization process. This article will cover the benefits of CDS, the different types of CDS, and how to use CDS in your Java applications.

### JVM Initialization

During the initialization, the HotSpot JVM loads and initializes a set of core classes, for example many classes located within the `java.lang` package, as well as some other System classes. Regardless of the Java application being run by the JVM, this initialization step would always be identical. This reptitive process represents an opportunity for optimization.  

Starting with JDK 5, the `-Xshare:dump` command could be used to create a generated shared archive of the core classes HotSpot loads at startup. This shared archive is then stored in: `$JAVA_HOME/lib/server/classes.jsa` (Windows: `$JAVA_HOME/bin/server/classes.jsa`). At initialization the HotSpot JVM, if directed, would search this directory for the shared archive, and if found, load the archive into a read-only memory-mapped location. This saves time as loading the pre-processed archive is faster than loading the classes. 

CDS can also reduce memory-footprint when multiple JVM processes are started on the same host. Additional JVM processes will read from the same memory-mapped shared archive location, allowing these loaded objects to be shared across multiple JVM instances, reducing overall memory consumption.  

### Default CDS Archive

With the JDK 12 release, an architecture specific default CDS archive is provided for 64-bit builds of JDK images. This circumvents the requirement to run the `-Xshare:dump` command to take advantage of CDS that previous versions of the JDK required. The default CDS archive is located in: `$JAVA_HOME/lib/server/classes.jsa` (Windows: `$JAVA_HOME/bin/server/classes.jsa`).

<a id="using-cds">&nbsp;</a>
## Using CDS

CDS is controlled by the `-Xshare:<value>` argument which accepts the following values; 

* `auto` : Enables class-data sharing to be used when a shared achieve is present. **Default**
  
  **Note:** `auto` was made the default value starting with JDK 12 for all 64-bit builds and assumes the shared archive is located at: `$JAVA_HOME/lib/server/classes.jsa` (Windows: `$JAVA_HOME/bin/server/classes.jsa`)
* `on` : Requires class-data sharing to be used. If the JVM encounters an issue while attempting to load the shared archive, the JVM will print an error message and exit.
 
  **Note:** This should only be used for testing purposes and not in a production setting, for more information, you can read the full documentation on [Class Data Sharing](doc:cds). 
* `off` : Disables class-data sharing. 
* `dump` : Generates a class-data sharing archive.

### Performance Benefits of CDS

The performance gains from CDS are about 33% when tested using a simple "Hello World" application, as seen in the below test results: 

```
$ time java -Xshare:off HelloWorld
Hello world!
java -Xshare:off HelloWorld  0.08s
$ time java -Xshare:on HelloWorld
Hello world!
java -Xshare:on HelloWorld  0.05s
```

With `-Xshare:off` the execution time of the application was 0.08 seconds, while with `-Xshare:on` it was 0.05 seconds.

The measurable performance benefits that from using CDS for only core JDK classes becomes smaller as the size and complexity of the Java process being launched increases. This was one of the motivations for the introduction of AppCDS.

<a id="application-class-data-sharing">&nbsp;</a>
## Application Class-Data Sharing 

Application Class-Data Sharing (AppCDS) was added to the HotSpot JVM as a part of the JDK 10 release. The goal of AppCDS is to extend the benefits of CDS to include application classes. AppCDS have seen further major enhancements in the Java 12 and Java 13 releases, that improve its performance and its ease of use. AppCDS allows for a more consistent benefit of using CDS as the size and complexity of a Java application grows. 

AppCDS supports Class-Data Sharing from the following locations:

   * Platform classes from the runtime image
   * Application classes from the runtime image
   * Application classes from the class path
   * Application classes from the module path

### Using AppCDS

As CDS only covered core Java classes included in the JDK, it was possible to include a pre-processed shared archive as a part of the JDK. This allowed CDS to be used out of the box by developers without any further interaction. However to use AppCDS some active intervention is required from the developer. 

#### Generating a Dynamic Shared Archive

Added in JDK 13, the dynamic shared archive feature was designed to make the usage of AppCDS easier for the majority of use cases and provide better support for applications that use user-defined class loaders. To generate a dynamic shared archive you will need to use the `-XX:ArchiveClassesAtExit=<name of archive file>` command which will generate a shared archive on application exit. A concrete example of using this command would look like this:

```
java -XX:ArchiveClassesAtExit=petclinic-dynamic-archive.jsa -jar target/spring-petclinic-2.5.1.jar
```

  **Note:** The generation of a shared archive will have a significant performance impact on during the JVM initialization process.

To use the generated archive on subsequent launches the `-XX:SharedArchiveFile=<name of archive file>` will need to be used. Using the generated archive from the previous example would look like this:

```
java -XX:SharedArchiveFile=petclinic-dynamic-archive.jsa  -jar target/spring-petclinic-2.5.1.jar
```

##### Dynamic Archive without Default Archive 

When a dynamic archive is generated, it will not include core classes that are included in the default archive. Instead the dynamic archive will reference the default location for where the default archive is located. If the archive file is missing or corrupted, then the JDK core classes and metadata will be loaded normally, negatively impacting startup impacting performance (or, if `-Xshare:on` is used, then the system will exit).

#### Static Archives

In most use cases a dynamic archive will be sufficent. However there might be cases where a static archive may be advantageous. Some such situations could be:

* Multiple JVM processes are run on the same host, that have a similar code base
* Storing additional symbol and string data

To create a static archive, first a classlist must be generated using the `-XX:DumpLoadedClassList=<classlist name>` command. CDS must also be turned off (`-Xshare:off`) during this process. Continuing the above example of using the Spring Boot Petclinic app, to create classlist, run the following command:

```
java -Xshare:off -XX:DumpLoadedClassList=petclinic.classlist -jar target/spring-petclinic-2.5.1.jar
```

Next the shared archive must be generated, using the `-XX:SharedArchiveFile=<name of archive file>` command with `-Xshare:dump` and the generated classlist from the previous step `-XX:SharedClassListFile=<classlist name>`, like in this example:

```
java -Xshare:dump -XX:SharedArchiveFile=petclinic-static-archive.jsa -XX:SharedClassListFile=petclinic.classlist -jar target/spring-petclinic-2.5.1.jar
```

To use the generated archive on subsequent launches the `-XX:SharedArchiveFile=<name of archive file>` will need to be used. Using the generated archive from the previous example would look like the is:

```
java -XX:SharedArchiveFile=petclinic-static-archive.jsa -jar target/spring-petclinic-2.5.1.jar
```

##### Static Archive of Shared Classes

Below is an example of using the static archive feature to create an archive of shared classes/libraries that are used across multiple Java application:

> To include classes from hello.jar and hi.jar, the .jar files must be added to the classpath specified by the -cp parameter.

> Create a list of all classes used by the Hello application and another list for the Hi application:

>        java -XX:DumpLoadedClassList=hello.classlist -cp common.jar:hello.jar Hello

> &nbsp;

>        java -XX:DumpLoadedClassList=hi.classlist -cp common.jar:hi.jar Hi

> Create a single list of classes used by all the applications that will share the shared archive file.

> Linux and macOS The following commands combine the files hello.classlist and hi.classlist into one file, common.classlist:

>        cat hello.classlist hi.classlist > common.classlist

> Windows The following commands combine the files hello.classlist and hi.classlist into one file, common.classlist:

>        type hello.classlist hi.classlist > common.classlist

> Create a shared archive named common.jsa that contains all the classes in common.classlist:

>        java -Xshare:dump -XX:SharedArchiveFile=common.jsa -XX:SharedClassListFile=common.classlist -cp common.jar:hello.jar:hi.jar

> The classpath parameter used is the common class path prefix shared by the Hello and Hi applications.

> Run the Hello and Hi applications with the same shared archive:

>        java -XX:SharedArchiveFile=common.jsa -cp common.jar:hello.jar:hi.jar Hello

>        java -XX:SharedArchiveFile=common.jsa -cp common.jar:hello.jar:hi.jar Hi


[Source](doc:sharing-shared-archive)

##### Static Archive with Default CDS Archive 

Unlike with a dynamic archive, a static archive *does* include core JDK classes. So if the default CDS archive has been deleted or corrupted on the system, this would not impact a JVM process at startup that is referencing a static archive. 

<a id="debugging-cds">&nbsp;</a>
## Debugging CDS

Ideally Class-Data Sharing should work seamlessly in the background, but there might be occassions were CDS encounters an error, or deeper inspection of CDS's behavior is needed for performance tuning reasons, or to investigate unexpected behavior.  In this section we will look at several ways to debug CDS. 

### Error messsages

The most ready form of debugging, would be when CDS encounters an issue at startup that causes the JVM to exit. This will only happen when `-Xshare:on` is used. If the JVM encounters an error when trying to load a shared archive when `-Xshare:auto` is set (default), then the JVM will silently ignore the error and load classes normally. For this reason `-Xshare:on` is discouraged in production settings. 

#### Invalid or Missing Shared Archive 

If the shared archive defined by `-XX:SharedArchiveFile` cannot not be found the HotSpot JVM will print this message to the console: 

```
An error has occurred while processing the shared archive file.
Specified shared archive not found (<name of the archive>).
Error occurred during initialization of VM
```
If the shared archive defined by `-XX:SharedArchiveFile` is corrupted or invalid HotSpot JVM will print this message to the console:

```
An error has occurred while processing the shared archive file.
The shared archive file has a bad magic number.
Error occurred during initialization of VM
Unable to use shared archive.
```

If the default CDS archive file is missing or corrupted HotSpot JVM will print this message to the console: 

```
An error has occurred while processing the shared archive file.
Specified shared archive not found (<JAVA_HOME>/Contents/Home/lib/server/classes.jsa).
Error occurred during initialization of VM
Unable to use shared archive.
```

#### Invalid or Missing Classlist 

When generating a static shared archive and the classlist defined by `-XX: SharedClassListFile` is not found the found the following error will be printed: 

```
Error occurred during initialization of VM
Loading classlist failed: No such file or directory
```

When generating a static shared archive and the classlist defined by `-XX: SharedClassListFile` is corrupted the following error will be printed:

```
An error has occurred while processing class list file HelloMessage-test.classlist 1:9.
Unknown input:
Invalid format
        ^
Error occurred during initialization of VM
class list format error.
```

### Archive Generation Report

When generating a shared archive the JVM process will by default print out a lot of diagnostic information to the console. This information can be used to see which classes and libraries are or are not being added to the shared archive.

Classes/libraries being added to shared archive: 

```
[0.007s][info][class,load] java.lang.Object source: jrt:/java.base
[0.007s][info][class,load] java.io.Serializable source: jrt:/java.base
[0.007s][info][class,load] java.lang.Comparable source: jrt:/java.base
```

Classes/libraries that were not able to be added to the shared archive:

```
[14.078s][warning][cds] Pre JDK 6 class not supported by CDS: 49.0 jdk/internal/reflect/GeneratedMethodAccessor55
[14.078s][warning][cds] Skipping org/springframework/beans/NotReadablePropertyException: Not linked
```

### Generated Classlist

When generating a static archive the classlist file can be inspected to see which classes, and other JVM metadata, will be added to the shared archive. As noted in the comments at the top of the generated file, this file should not be modified by hand. Below is a sample of a what a classlist file would look like:

```
# NOTE: Do not modify this file.
#
# This file is generated via the -XX:DumpLoadedClassList=<class_list_file> option
# and is used at CDS archive dump time (see -Xshare:dump).
#
java/lang/Object
java/io/Serializable
java/lang/Comparable
java/lang/CharSequence
java/lang/constant/Constable
java/lang/constant/ConstantDesc
java/lang/String
java/lang/reflect/AnnotatedElement
java/lang/reflect/GenericDeclaration
java/lang/reflect/Type
java/lang/invoke/TypeDescriptor
java/lang/invoke/TypeDescriptor$OfField
```

### Debug Logging

There are a couple of options for configuring HotSpot to output additional logging to console to better detail CDS's internal behavior. 

#### Debug CDS Logging

* `-Xlog:cds=debug`: Can be used during both the generation and loading of a shared archive to give detailed stats on classes and additional metadata being added to the shared archive, or during 

* `-Xlog:cds+lambda=debug`: Like `-Xlog:cds=debug` can be used at both archive generation and loading time. This option provides additional information specifically concerning CDS' handling of lambdas. 


#### Debug Class Loading Logging

When loading an shared archive, the JVM argument `-verbose:class` can be used to see which classes are being loaded from the shared archive, or through HotSpot's normal class loading process. If a class is being loaded the from a shared archive it will report it's source as `shared objects file`. Like in this example output below:

```
[0.008s][info][class,load] java.lang.Object source: shared objects file
[0.009s][info][class,load] java.io.Serializable source: shared objects file

```

If the class is not being loaded from a shared archive, it will report its source location like here with `java.lang.Object` and `java.io.Serializable` being loaded from the module `jrt:/java.base`:

```
[0.007s][info][class,load] java.lang.Object source: jrt:/java.base
[0.007s][info][class,load] java.io.Serializable source: jrt:/java.base
```