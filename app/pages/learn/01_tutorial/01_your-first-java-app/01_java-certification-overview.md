---
id: certification.java-cert-overview
title: Getting Started with Java Certification
slug: learn/java-cert-overview
type: tutorial
category: start
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
toc:
- Why get Java certified? {motivation}
- What certification exams are available? {cert-list}
- Should I wait for Java 21? {java-21}
- What is covered {topics}
- How to study {study}
description: "Overview of the Java Certification and how to study"
last_update: 2023-07-30
author: ["JeanneBoyarsky"]
---

<a id="motiviation">&nbsp;</a>
## Why get Java certified?

Learning and jobs reasons tend to be the most common reasons to get a Java certification.

1. If you are new to Java, a Java certification can help you learn Java more deeply and thoroughly. If you are experienced in Java, a certification can do the same for learning what is new in the latest versions of the language. For example, have you mastered text blocks yet? Even the edge cases? 
2. If you are looking for a new job, putting Java certification gives you a talking point on your resume. It also gives you deeper knowledge for the interview. If you aren't looking for a job, it can show your employer that you are keeping your skills up to date or even help with a job transfer.

There's a third reason, related to learning - doing your job better. By studying for a Java certification, you learn more Java APIs and problems that can occur in your (or teammates) code. This helps you solve problems faster and become more productive.

<a id="cert-list">&nbsp;</a>
## What certification exams are available?

There are currently six active Java certification exams. This article doesn't cover one of them: the [1Z0-900: Java EE 7 Application Developer exam](https://education.oracle.com/java-ee-7-application-developer/pexam_1Z0-900) is from before the transfer to [Jakarta EE](https://jakarta.ee). Let's explore the remaining five!

1. [1Z0-808: Java SE 8 Programmer I exam](https://education.oracle.com/java-ee-7-application-developer/pexam_1Z0-808) - 56 questions, passing 65% - For Java 8, the exam was split into two parts. You earn a certification for each one. . Taking this first half gives you a more basic certification while you work towards the 809.
2. [1Z0-809: Java SE 8 Programmer II exam](https://education.oracle.com/java-ee-7-application-developer/pexam_1Z0-809) - 68 questions, passing 65% - This is the second half of the Java 8 exam.
3. [1Z0-811: Java Foundations exam](https://education.oracle.com/java-ee-7-application-developer/pexam_1Z0-811) - 60 questions, passing 65% - The foundations exam was introduced for those in Oracle Academy. It is far less common than the other exams. It uses Java 8 as well.
4. [1Z0-819: Java SE 11 Developer exam](https://education.oracle.com/java-ee-7-application-developer/pexam_1Z0-819) - 50 questions, passing 68% - For Java 11, the exam was launched in two parts like Java 8 (1Z0-815 and 1Z0-816). It was consolidated into a single exam, the 1Z0-819.  
5. [1Z0-829: Java SE 17 Developer exam](https://education.oracle.com/java-ee-7-application-developer/pexam_1Z0-829) - 50 questions, passing 68% - This Java 17 is the most recent certification exams available.

Most people start with the 1Z0-808 (if you want to get an easy certification faster and build on it) or 1Z0-829 (for the latest). It is very important to use study materials that match the exam you are studying for. As a result, those who hold Java 11 materials target the 1Z0-811 exam.

<a id="java-21">&nbsp;</a>
## Should I wait for Java 21?

You might have noticed that the exams target Java versions matching the LTS (long term support versions). I recommend taking an exam that is available when you want to start studying rather than waiting for the next version. It typically takes a number of months after the LTS release for the objectives/exam to come out. Then it takes time for updated certification study materials to come out. It's *a lot* harder to pass the test without study materials.

Additionally, one of the benefits of a faster LTS release cycle is that less has time to change between versions. As a result, the benefits of taking the later exam are lower and the Java 17 exam is likely to meet your goals.

<a id="topics">&nbsp;</a>
## What is covered?

Each exam (see links above) has the objectives posted under "review exam topics". There are a number of top level objectives. For example, the Java 17 ones are:
* Handling date, time, text, numeric and boolean values
* Controlling Program Flow
* Utilizing Java Object-Oriented Approach
* Handling Exceptions
* Working with Arrays and Collections
* Working with Streams and Lambda expressions
* Packaging and deploying Java code and use the Java Platform Module System
* Managing concurrent code execution
* Using Java I/O API
* Accessing databases using JDBC
* Implementing Localization

Then for each one there are more detailed sub-objectives. For example,  the first one has
* Use primitives and wrapper classes including Math API, parentheses, type promotion, and casting to evaluate arithmetic and boolean expressions
* Manipulate text, including text blocks, using String and StringBuilder classes
* Manipulate date, time, duration, period, instant and time-zone objects using Date-Time API

Your study materials will give your more details on what you specifically need to know. They will also teach you what you need to learn, point out tricks and practice questions. You should also write lots of code. It's like math; you learn better by doing as you learn!

<a id="study">&nbsp;</a>
## How to study?

If you subscribe to Oracle University, there is a [24 hour video class](https://mylearn.oracle.com/ou/learning-path/become-a-java-se-17-developer/99487y). If not, there are two books: [Wiley's Sybex imprint](https://www.amazon.com/Oracle-Certified-Professional-Developer-Certification/dp/111986464X) (disclosure: I wrote this) and [McGraw-Hill's Oracle imprint](https://www.amazon.com/Certified-Professional-Developer-1Z0-829-Programmers/dp/0137993641).

Regardless of which option you chose to study, I recommend the [Enthuware mock exams](https://enthuware.com/java-certification-mock-exams/oracle-certified-professional/ocp-java-17-exam-1z0-829). They are only $10 and you get 20 mock exams! Excellent practice after you study to get ready.  The OCP forum at [CodeRanch](https://coderanch.com/f/24/java-programmer-OCPJP) is also a great place to ask questions as you prepare for your certification.
