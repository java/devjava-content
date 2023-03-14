---
title: Test Things Out
layout: contribute.html
main_css_id: contribute
subheader_select: test
---

## Testing Early Access Versions and Impermanent Features

Perhaps the most valuable method of contributing to the OpenJDK project is to compile and test your own application on an upcoming Early Access version of the JDK, as well as offering input on impermanent features such as experimental features, incubator modules, and preview features.

- Experimental features: A test-bed mechanism used to gather feedback on nontrivial HotSpot enhancements.
- Incubator Modules: Enable the inclusion of JDK APIs and JDK tools, that might one day, after improvements and stabilizations, be included and supported in the Java SE Platform or the JDK.
- Preview Features: A feature that is delivered to be fully specified and implemented, but may still change before it is included in the Java platform on a final and permanent basis. The gathered feedback will be evaluated and used to make eventual adjustments before a preview feature becomes permanent.

Providing feedback through the mailing lists is very valuable. For many applications, this is just a matter of adding a branch in your continuous integration system and setting the version you need to test.

Any early integrations of the JDK with various frameworks and tools is also a critical contribution. Testing the impermanent features on cases as close as possible to real-life cases, and then providing feedback is extremely valuable.

Trying out a new language feature by rewriting an old piece of code with this new feature, comparing the readability of the code and its performance will lead to very valuable feedback.

You may be thinking that once a feature became a preview feature, things are done and cannot be redesigned. Most of the time a feature may evolve from one preview to the other with small changes as a response to feedback, until it reaches a state where it becomes a final and permanent feature. But this is not always the case. There is still a possibility for a feature to be completely withdrawn but is considered rare. This happened with Raw String Literals ([JEP 326](https://openjdk.java.net/jeps/326)).

After the public review of Raw String Literals, while it was a preview feature, leds to its withdrawal. A lot of work had already been put in the design of the feature; the writing of the specifications and the implementation. But it turned out that it still missed the mark with regards to its original design intentions. So the conclusion of the discussions was to design it differently.

It does not happen with every preview feature, but withdrawal is still a possibility. As you can see: your feedback matters!


### Contributing a Bug Report

The first value of a bug report is that, if you are having issues with a particular feature, filing a bug report records this issue. Everyone can know about it and start discussing it in the comments about what to do with it.

The elements you need to provide to make a good bug report are the following.

1. The description of the issue you came across, with as many details as possible.
2. The environment you are running on when you saw the bug; your operating system; the version of Java you are running; any additional relevant details.
3. Any software that you were using that could have had an affect of the issue you have experienced.
4. If possible, a reproducer. This is key to fixing a bug

If you need to file a bug, you can visit the [JDK Bug System](https://bugs.openjdk.java.net/) if you are an OpenJDK Author. If not, you can submit an issue at https://bugreport.java.com/.


## Testing 3rd-Party Libraries

One of the great things about Java is that most problems developers face have already been solved and can be incorporated into your programs using 3rd-party libraries. That said, this also requires some attention from the library maintainers to ensure the code continues to run on later releases.

A great way to contribute to Java is to test your favorite libraries on the latest release, and early-access builds of the next version, and report any issues back to the maintainers of those libraries. I'm sure they appreciate code contributions as well, but that's up to them!



## Quality Outreach Program

The [Quality Outreach Program](https://wiki.openjdk.java.net/display/quality/Quality+Outreach) promotes the testing of open-source projects with new OpenJDK builds. It helps to detect bugs in the OpenJDK other open-source projects to support the current versions of Java. If you are involved in an open-source project, you should seriously consider joining this free program.


## Using and Testing Long Term Projects

Checking projects like Loom, Valhalla, Panama with the early-access builds they provide is also very valuable. You can find them on the [OpendJDK GitHub page](https://github.com/openjdk).



