---
id: debugging
title: Debugging in Java
slug: learn/debugging
type: tutorial
category: resources
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
toc:
- What is debugging? {intro}
- Why not println? {println}
- Why not unit testing? {unit}
- What is a breakpoint? {breakpoint}
- How can debuggers be used? {usage}
- Debugger basics {basic}
- Advanced techniques {advanced}
- Documentation {docs}
description: "Learning how to use a debugger"
last_update: 2023-11-05
author: ["JeanneBoyarsky"]
---

<a id="intro">&nbsp;</a>
## What is debugging?

We all write perfect code that works on the first attempt, right? Ha! Just kidding. We often have to find and fix errors in our code. This process is called debugging. 

You might be wondering why it is called "debugging". The term became popular in the 1940s after Admiral Grace Hopper found a moth inside a computer (remember computers were giant back then so an actual insect could get in.) While you won't have to deal with animals in your code, we will have to deal with errors and problems that we refer to as bugs. You may also hear them called defects although that's usually after you've committed the code. Regardless of the name of the issue, you still have to find that problem and that's debugging!

A debugger is a tool in your IDE (integrated development environment) that lets you see the values of different variables at different points in the program. It's like a really powerful magnifying glass. While a few details vary between Eclipse/IntelliJ/NetBeans/VS Code, the concepts are the same.

<a id="println">&nbsp;</a>
## Why not Println?

When first learning how to code, we often write code like this to see what is going on:

```java
System.out.println(numCats);
```

There's nothing wrong with using `println` (as long as you don't commit it). However, it can quickly get unmanagable in a more complicated program especally if you have multiple things to keep track of or a lot of loops. It can also be hard to find when there is a lot of logging in the application. (I used the stars and my initials to mitigate that, but still can get past the point where println is useful.)

```java
System.out.println("*** JB i=%s numCats=%s numDogs=%s".formatted(i, numCats, numDogs));
```

Even if `println()` does meet your needs at the moment, it won't forever. Learning how to use a debugger helps avoid the problem that you use println just because it is all you know.

<a id="unit">&nbsp;</a>
## Why not unit testing?

Nothing is wrong with unit testing. Unit tests are great. They document expected behavior. They tell you if an unexpected value is returned. They help you understand the behavior of the code. And sometimes they can even give you big clues about what is wrong with the code. However, they don't tell you what is happening inside the broken code when it isn't returning the right value. For that, you use a debugger with the unit test to see what is going on inside the method. And once you fix your code, unit tests can help catch new bugs from being introduced!

```java
@Test
void magic() {
     assertEquals(42, target.magic(), "magic number incorrect");
}
```

<a id="breakpoint">&nbsp;</a>
## What is a breakpoint?

I've (improperly) implemented the magic method. It's supposed to multiply six times seven and get 42. However, that's not what happens. After (not) much investigation, I am baffled and realize I want to know what the values of `part1` and `part2` are on line 5.

That's what a breakpoint is for. It lets me tell the debugger to pause the program there and let me poke around.

```java
public class Answer {
    public  int magic() {
        int part1 = 3 + 2;  // BUG!
        int part2 = 7;
        return part1 * part2;
    }
}
```

When the debugger stops on line 5, I see that part2 is the seven that I expected. However part1 is five,, not six. I found the bug! Thanks to the debugger allowing me to set a breakpoint.

<a id="usage">&nbsp;</a>
## How can debuggers be used?

There are a number of reasons why you might want to use a debugger. Three of the most common are:

1. Fixing broken code - The debugger allows you to see the values of variables as the code runs. This allows you to see where it stops behaving as expected. 
2. Understanding unfamiliar code - Seeing the values as the code runs can help you understand it better
3. Tracing the path of the code - When stopping at a breakpoint, the debugger shows what classes/methods were called in order to get there. You can even click on them to see what the variables in scope at those points are.

<a id="basic">&nbsp;</a>
## Debugger Basics

There are four basic debugger commands to control the flow of execution once the debugger stops at your first breakpoint. For each of these commands, we will use the `Flow` class as an example.

```java
public class Flow {
    public static void main(String args[]) {
      System.out.println(debugging());
    }
    
    public static int debugging() {
        int num = investigate();
        num++;
        return num;
    }
    
    public static int investigate() {
        int found = 5;
        return found;
    }
}
```

1. Step into - Tells the program to execute, but only to the first line of the method call. Suppose I have a breakpoint on line 7. When I tell the debugger to "step into", it goes to line 13.
2. Step over - Tells the program to execute but not stop in any methods. If I have a breakpoint on line 7 and tell the debugger to "step over", the debugger will then be on line 8. Choosing "step over" again will bring the debugger to line 9.
3. Step out/return - Tells the program to run to the end of the method and go back to the caller. If I have a breakpoint on line 13 and choose "step out" or "step return", the debugger will be on line 7 with the result from the method call. (Step out and step return are the same thing. Different IDEs use different names.)
4. Resume - Tells the program to keep going until it hits another breakpoint or completes.

<a id="advanced">&nbsp;</a>
## Advanced Techniques

Debuggers have many advanced techniques. Three common ones are:

1. Conditional breakpoint - Normally, the debugger stops where you asked for a breakpoint. If you are in a loop or have a clue what values trigger the problem, you don't want that. A conditional breakpoint allows you to add a bit of Java code to your breakpoint so it will only stop when that condition is true. This approach avoids having to hit resume a lot of times until you get to the value you care about.
2. Evaluation - Once you get to your breakpoint, you can write Java code to determine the state of affairs. For example, you can call methods on the available variables.
3. Hot replacement - You can manually change the value of a variable in the debugger and let the code continue to run. It will use your new, updated value instead of the original one. This lets you explore the impact of a potential fix.

<a id="docs">&nbsp;</a>
## Documentation

Now that you know the concepts of using a debugger, it is time to look at the documentation for your IDE! Pay attention to the keyboard shortcuts and where each button is located.

1. [Eclipse](https://www.eclipse.org/community/eclipse_newsletter/2017/june/article1.php)
2. [IntelliJ](https://www.jetbrains.com/help/idea/debugging-your-first-java-application.html)
3. [NetBeans](https://netbeans.apache.org/tutorial/main/kb/docs/java/debug-visual/)
4. [VS Code](https://code.visualstudio.com/docs/java/java-debugging)