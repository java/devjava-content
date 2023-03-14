---
id: api.regex.intro
title: Introducing Regular Expressions
slug: learn/regex/intro
type: tutorial-group
group: regex
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
last_update: 2022-01-10
toc:
- Introducing Regular Expressions {intro}
- Unicode Support {unicode-support}
- Test Harness {test-harness}
description: "Introducing regular expressions: what are they and what you can do with them. Includes the code used to test regular expressions, used throughout this section. "
---

<a id="intro">&nbsp;</a>
## Introducing Regular Expressions

Regular expressions are a way to describe a set of strings based on common characteristics shared by each string in the set. They can be used to search, edit, or manipulate text and data. You must learn a specific syntax to create regular expressions — one that goes beyond the normal syntax of the Java programming language. Regular expressions vary in complexity, but once you understand the basics of how they are constructed, you will be able to decipher (or create) any regular expression.

In the world of regular expressions, there are many different flavors to choose from, such as grep, Perl, Tcl, Python, PHP, and awk. The regular expression syntax in the [`java.util.regex`](javadoc:java.util.regex) API is most similar to that found in Perl.

The java.util.regex package primarily consists of three classes: Pattern, Matcher, and PatternSyntaxException.

A [`Pattern`](javadoc:Pattern) object is a compiled representation of a regular expression. The [`Pattern`](javadoc:Pattern) class provides no public constructors. To create a pattern, you must first invoke one of its public static [`compile()`](javadoc:Pattern.compile()) methods, which will then return a [`Pattern`](javadoc:Pattern) object. These methods accept a regular expression as the first argument; the following sections are covering the required syntax.

A [`Matcher`](javadoc:Matcher) object is the engine that interprets the pattern and performs match operations against an input string. Like the [`Pattern`](javadoc:Pattern) class, [`Matcher`](javadoc:Matcher) defines no public constructors. You obtain a [`Matcher`](javadoc:Matcher) object by invoking the [`matcher()`](javadoc:Pattern.matcher()) method on a [`Pattern`](javadoc:Pattern) object.

A [`PatternSyntaxException`](javadoc:PatternSyntaxException) object is an unchecked exception that indicates a syntax error in a regular expression pattern.

Before deep diving each class, you must understand how regular expressions are actually constructed. Let us introduce a simple test harness that will be used repeatedly to explore their syntax.


<a id="unicode-support">&nbsp;</a>
## Unicode Support

As of the JDK 7 release, Regular Expression pattern matching has expanded functionality to support Unicode 6.0.

### Matching a Specific Code Point

You can match a specific Unicode code point using an escape sequence of the form \uFFFF, where FFFF is the hexadecimal value of the code point you want to match. For example, \u6771 matches the Han character for east.

Alternatively, you can specify a code point using Perl-style hex notation, `\x{...}`. For example:

```java
String hexPattern = "\x{" + Integer.toHexString(codePoint) + "}";
```

### Unicode Character Properties

Each Unicode character, in addition to its value, has certain attributes, or properties. You can match a single character belonging to a particular category with the expression `\p{prop}`. You can match a single character not belonging to a particular category with the expression `\P{prop}`.

The three supported property types are scripts, blocks, and a "general" category.

#### Scripts

To determine if a code point belongs to a specific script, you can either use the `script` keyword, or the `sc` short form, for example, `\p{script=Hiragana}`. Alternatively, you can prefix the script name with the string `Is`, such as `\p{IsHiragana}`.

Valid script names supported by [`Pattern`](javadoc:Pattern) are those accepted by [`UnicodeScript.forName()`](javadoc:UnicodeScript.forName()).

#### Blocks

A block can be specified using the `block` keyword, or the `blk` short form, for example, `\p{block=Mongolian}`. Alternatively, you can prefix the block name with the string `In`, such as `\p{InMongolian}`.

Valid block names supported by [`Pattern`](javadoc:Pattern) are those accepted by [`UnicodeScript.forName()`](javadoc:UnicodeScript.forName()).

#### General Category

Categories can be specified with optional prefix `Is`. For example, `IsL` matches the category of Unicode letters. Categories can also be specified by using the `general_category` keyword, or the short form `gc`. For example, an uppercase letter can be matched using `general_category=Lu` or `gc=Lu`.

Supported categories are those of The [`Unicode Standard`](http://www.unicode.org/unicode/standard/standard.html) in the version specified by the [`Character`](javadoc:Character) class.


<a id="test-harness">&nbsp;</a>
## Test Harness

This section defines a reusable test harness, `RegexTestHarness.java` , for exploring the regular expression constructs supported by this API. The command to run this code is `java RegexTestHarness`; no command-line arguments are accepted. The application loops repeatedly, prompting the user for a regular expression and input string. Using this test harness is optional, but you may find it convenient for exploring the test cases discussed in the following pages.

<a id="RegexTestHarness">&nbsp;</a>

```java
import java.io.Console;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RegexTestHarness {

    public static void main(String[] args){
        Console console = System.console();
        if (console == null) {
            System.err.println("No console.");
            System.exit(1);
        }
        while (true) {

            Pattern pattern = 
            Pattern.compile(console.readLine("%nEnter your regex: "));

            Matcher matcher = 
            pattern.matcher(console.readLine("Enter input string to search: "));

            boolean found = false;
            while (matcher.find()) {
                console.format("I found the text" +
                    " \"%s\" starting at " +
                    "index %d and ending at index %d.%n",
                    matcher.group(),
                    matcher.start(),
                    matcher.end());
                found = true;
            }
            if(!found){
                console.format("No match found.%n");
            }
        }
    }
}
```

Before continuing to the next section, you may save and compile this code to ensure that your development environment supports the required packages.

