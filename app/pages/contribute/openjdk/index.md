---
title: Contributing to OpenJDK
layout: contribute.html
main_css_id: contribute
subheader_select: contribute
---

## Start Here

We're excited that you are interested in contributing to OpenJDK. Before you begin, it's a good idea to try and understand the "pulse" of the project. Here are some resources to help you do just that.

### OpenJDK Website

OpenJDK is where a bulk of the effort on building Java happens. In simple terms, taken directly from the [OpenJDK site](https://openjdk.java.net), OpenJDK is: _The place to collaborate on an open-source implementation of the Java Platform, Standard Edition, and related projects._


Side Note: Many people associate the term OpenJDK with a *build* of Java (the installable artifact used to build and run Java applications), but this is not correct. OpenJDK refers to the *place* in which many people collaborate on Java. Downstream builds are then created from the OpenJDK Project source code found on [GitHub](http://github.com/openjdk).

Visit [https://openjdk.java.net](https://openjdk.java.net)


### Developers Guide

The [OpenJDK Developers' Guide](https://openjdk.java.net/guide/) is a great place to start! The goal of the guide is to answer questions that developers of the JDK might have around development process, tooling, standards, and so forth.

### Inside Java

Another resource to track the progress of the JDK and OpenJDK subprojects like Loom, Valhalla, etc., is [Inside.java](https://inside.java). There are also many shows that you can subscribe to as part of Inside.java, but one Podcast episode specifically on getting involved is the Inside Java Podcast [Episode 11 "How to Contribute to OpenJDK"](https://inside.java/2021/01/29/podcast-011/)


### Mailing Lists

Reading the mailing list is a great way to start contributing. You will get to know the OpenJDK community, how it works, what is the culture. You should not be afraid of asking a question on a mailing list. If there is a better mailing list to discuss the point you raised, you will be redirected to it, and that is OK. You can find the OpenJDK mailing lists [on this page](https://mail.openjdk.java.net/mailman/listinfo).



## Understanding OpenJDK Project Roles

The people working in the OpenJDK project have specific roles with a range of responsibilities. They are:

- Participants
- Author
- Committer
- Reviewer
- Project Lead

You can learn more about roles [here](https://openjdk.java.net/bylaws#_7).

When you are new to the OpenJDK Project and have not contributed anything yet, you are a _Participant_. This means that you are actively participating on the mailing lists.

Once you have contributed several changes (usually two) you can become an _Author_. An author has the right to create patches but cannot push them. To push a patch, you need a _Sponsor_. Gaining a sponsorship is usually achieved through the discussions you had on the mailing lists.

In order to become an _Author_, you also need to sign the Oracle Contribution Agreement (OCA). You will then get an account on the JDK Bugs System ([JBS](https://bugs.openjdk.java.net/)), which gives you the right to create issues and comment on existing issues. The JBS is opened to anyone for reading.

After having contributed about eight changes you become a _Committer_. As a Committer, you can push your patch without the need of a sponsor.

After having contributed 32 significant changes you become a _Reviewer_. As a Reviewer, you have the possibility to approve changes for inclusion in the OpenJDK.

Finally, you can also become a _Project Lead_. A Project Lead is a Committer to that Project who is responsible for directing and coordinating the Project's activities.


## Reviewing Code and Documentation

Reviewing is something that anybody can do, even if you consider yourself a beginner. If you are interested in the JDK code base, reviewing the new code before it gets to the code base is one of the best ways to find bugs and is very valuable. Reviewing also helps improve your coding skills. Reviewing the code of the tests, looking for edge cases and corner cases that may have been forgotten is also very valuable. It helps potentially prevent future bugs from occurring.

A lot of the documentation comes in the form of JavaDoc comments, which are part of the code. Reviewing JavaDoc comments to make sure they make sense and that they are understandable in written form is also valuable. Writing JavaDoc comments can be very challenging. If you feel like something is not easy to understand, it may mean that it should be written differently. Finding hard to understand JavaDoc comments is one of the goals of the review process.



## Suggesting an Idea

Starting in September 2020, the development of the OpenJDK Project moved to GitHub, making it easier to follow its development. To start your exploration, please visit the page https://github.com/openjdk and browse the repository you need.

Developing in the open does not mean that any innovative and interesting feature you may need is just one pull request away to be added to the JDK source code. Contributing to OpenJDK needs thoughtful and progressive experience before being able to contribute a patch. It also needs to follow the Project's development process, even if the move to GitHub made the processes and tooling a lot smoother, all due to the work of the [Skara project](https://openjdk.java.net/projects/skara/).

From a technical point of view, contributing a patch means that you commit to maintain this code for the foreseeable future. For your code to be accepted, it needs to be functionally performant, secure, and stable when tested.

Even before reaching that stage, discussing your idea is the first step. Are you solving the right problem? If it is, then is your solution the best solution for that problem? Have all the tradeoffs been properly analyzed? And so much more.

It is important to reach an agreement on these points, and to get a validation on what you are proposing, ensuring it makes sense for potential inclusion in OpenJDK.

The best way to begin this discussion is to start it on one of the OpenJDK mailing lists. Getting a consensus there allows you to implement your idea, create a pull request, and have your code reviewed. You should not start with producing the code, because becomes more challenging to have a discussion on the relevance of the problem and the solution.


## Submitting a JDK Enhancement Proposal (JEP)

As you may know, the development of new features and enhancements of the Java language, the APIs, or the Java Virtual Machine must go through the creation of a JEP.

What emerges from the discussions about the issue you want to tackle and the solution you propose is the scope of the problem. The scope may be very large, involving several components of the JDK, for instance, a core modification of the JVM and the core libraries. Implementing this solution may need to involve several OpenJDK Project teams, with the potential need to modify some parts of the Java specification. In that case, going through a JEP is necessary.

Whether you need to file a bug for your idea or file a JEP, this is what will emerge from the discussions on the mailing lists.

Note that some small features ideas may also lead to filing a JEP. Filing a JEP may be useful to create awareness around a small but important change, or to create a discussion around a feature that may be viewed as a bit controversial.





