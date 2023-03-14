---
id: api.regex.matchers
title: The Matcher Class
slug: learn/regex/matchers
type: tutorial-group
group: regex
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
last_update: 2022-01-10
toc:
- Index Methods {index}
- Study Methods {study}
- Replacement Methods {replacement}
- Using the Start and End Methods {start-end}
- Using the Matches and LookingAt Methods {matches-lookingat}
- Using ReplaceFirst and ReplaceAll {replacefirst-replaceall}
- Using AppendReplacement and AppendTail {appendreplacement-appendtail}
- Matcher Method Equivalents in String {string-equivalent}
description: "Describes the commonly-used methods of the Matcher class."
---


<a id="index">&nbsp;</a>
## Index Methods

Index methods provide useful index values that show precisely where the match was found in the input string:

- [`public int start()`](javadoc:Matcher.start()): Returns the start index of the previous match.
- [`public int start(int group)`](javadoc:Matcher.start(int)): Returns the start index of the subsequence captured by the given group during the previous match operation.
- [`public int end()`](javadoc:Matcher.end()): Returns the offset after the last character matched.
- [`public int end(int group)`](javadoc:Matcher.end(int)): Returns the offset after the last character of the subsequence captured by the given group during the previous match operation.


<a id="study">&nbsp;</a>
## Study Methods

Study methods review the input string and return a boolean indicating whether or not the pattern is found.

- [`public boolean lookingAt()`](javadoc:Matcher.lookingAt()): Attempts to match the input sequence, starting at the beginning of the region, against the pattern.
- [`public boolean find()`](javadoc:Matcher.find()): Attempts to find the next subsequence of the input sequence that matches the pattern.
- [`public boolean find(int start)`](javadoc:Matcher.find(int)): Resets this matcher and then attempts to find the next subsequence of the input sequence that matches the pattern, starting at the specified index.
- [`public boolean matches()`](javadoc:Matcher.matches()): Attempts to match the entire region against the pattern.


<a id="replacement">&nbsp;</a>
## Replacement Methods

Replacement methods are useful methods for replacing text in an input string.

- [`public Matcher appendReplacement(StringBuffer sb, String replacement)`](javadoc:Matcher.appendReplacement()): Implements a non-terminal append-and-replace step.
- [`public StringBuilder appendTail(StringBuilder sb)`](javadoc:Matcher.appendTail()): Implements a terminal append-and-replace step.
- [`public String replaceAll(String replacement)`](javadoc:Matcher.replaceAll()): Replaces every subsequence of the input sequence that matches the pattern with the given replacement string.
- [`public String replaceFirst(String replacement)`](javadoc:Matcher.replaceFirst(String)): Replaces the first subsequence of the input sequence that matches the pattern with the given replacement string.
- [`public static String quoteReplacement(String s)`](javadoc:Matcher.quoteReplacement()): Returns a literal replacement String for the specified String. This method produces a String that will work as a literal replacement s in the appendReplacement method of the Matcher class. The String produced will match the sequence of characters in s treated as a literal sequence. Slashes ('\') and dollar signs ('$') will be given no special meaning.


<a id="start-end">&nbsp;</a>
## Using the Start and End Methods

Here's an example, that counts the number of times the word "dog" appears in the input string.

```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class MatcherDemo {

    private static final String REGEX =
        "\\bdog\\b";
    private static final String INPUT =
        "dog dog dog doggie dogg";

    public static void main(String[] args) {
       Pattern p = Pattern.compile(REGEX);
       //  get a matcher object
       Matcher m = p.matcher(INPUT);
       int count = 0;
       while(m.find()) {
           count++;
           System.out.println("Match number "
                              + count);
           System.out.println("start(): "
                              + m.start());
           System.out.println("end(): "
                              + m.end());
      }
   }
}
```

Running this code produces the following result. 

```shell
Match number 1
start(): 0
end(): 3
Match number 2
start(): 4
end(): 7
Match number 3
start(): 8
end(): 11
```

You can see that this example uses word boundaries to ensure that the letters "d" "o" "g" are not merely a substring in a longer word. It also gives some useful information about where in the input string the match has occurred. The [`start()`](javadoc:Matcher.start()) method returns the start index of the subsequence captured by the given group during the previous match operation, and [`end()`](javadoc:Matcher.end()) returns the index of the last character matched, plus one.


<a id="matches-lookingat">&nbsp;</a>
## Using the Matches and LookingAt Methods

The [`matches()`](javadoc:Matcher.matches()) and [`lookingAt()`](javadoc:Matcher.lookingAt()) methods both attempt to match an input sequence against a pattern. The difference, however, is that [`matches()`](javadoc:Matcher.matches()) requires the entire input sequence to be matched, while [`lookingAt()`](javadoc:Matcher.lookingAt()) does not. Both methods always start at the beginning of the input string. Here is the full code:

```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class MatchesLooking {

    private static final String REGEX = "foo";
    private static final String INPUT =
        "fooooooooooooooooo";
    private static Pattern pattern;
    private static Matcher matcher;

    public static void main(String[] args) {
   
        // Initialize
        pattern = Pattern.compile(REGEX);
        matcher = pattern.matcher(INPUT);

        System.out.println("Current REGEX is: "
                           + REGEX);
        System.out.println("Current INPUT is: "
                           + INPUT);

        System.out.println("lookingAt(): "
            + matcher.lookingAt());
        System.out.println("matches(): "
            + matcher.matches());
    }
}
```

Running this code produces the following result.

```shell
Current REGEX is: foo
Current INPUT is: fooooooooooooooooo
lookingAt(): true
matches(): false
```


<a id="replacefirst-replaceall">&nbsp;</a>
## Using ReplaceFirst and ReplaceAll

The [`replaceFirst()`](javadoc:Matcher.replaceFirst(String)) and [`replaceAll()`](javadoc:Matcher.replaceAll()) methods replace text that matches a given regular expression. As their names indicate, [`replaceFirst()`](javadoc:Matcher.replaceFirst(String)) replaces the first occurrence, and [`replaceAll()`](javadoc:Matcher.replaceAll()) replaces all occurrences. Here is the code:

```java
import java.util.regex.Pattern; 
import java.util.regex.Matcher;

public class ReplaceDemo {
 
    private static String REGEX = "dog";
    private static String INPUT =
        "The dog says meow. All dogs say meow.";
    private static String REPLACE = "cat";
 
    public static void main(String[] args) {
        Pattern p = Pattern.compile(REGEX);
        // get a matcher object
        Matcher m = p.matcher(INPUT);
        INPUT = m.replaceAll(REPLACE);
        System.out.println(INPUT);
    }
}
```

Running this code produces the following result.

```shell
The cat says meow. All cats say meow.
```

In this first version, all occurrences of dog are replaced with cat. But why stop here? Rather than replace a simple literal like dog, you can replace text that matches any regular expression. The API for this method states that "given the regular expression `a*b`, the input `aabfooaabfooabfoob`, and the replacement string `-`, an invocation of this method on a matcher for that expression would yield the string `-foo-foo-foo-`.".

Let us write the following example. 

```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;
 
public class ReplaceDemo2 {
 
    private static String REGEX = "a*b";
    private static String INPUT =
        "aabfooaabfooabfoob";
    private static String REPLACE = "-";
 
    public static void main(String[] args) {
        Pattern p = Pattern.compile(REGEX);
        // get a matcher object
        Matcher m = p.matcher(INPUT);
        INPUT = m.replaceAll(REPLACE);
        System.out.println(INPUT);
    }
}
```

Running this code produces the following result.

```shell
-foo-foo-foo-
```

To replace only the first occurrence of the pattern, simply call [`replaceFirst()`](javadoc:Matcher.replaceFirst(String)) instead of [`replaceAll()`](javadoc:Matcher.replaceAll()). It accepts the same parameter.


<a id="appendreplacement-appendtail">&nbsp;</a>
## Using AppendReplacement and AppendTail

The [`Matcher`](javadoc:Matcher) class also provides [`appendReplacement()`](javadoc:Matcher.appendReplacement()) and [`appendTail()`](javadoc:Matcher.appendTail()) methods for text replacement. The following example uses these two methods to achieve the same effect as [`replaceAll()`](javadoc:Matcher.replaceAll()).

```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RegexDemo {
 
    private static String REGEX = "a*b";
    private static String INPUT = "aabfooaabfooabfoob";
    private static String REPLACE = "-";
 
    public static void main(String[] args) {
        Pattern p = Pattern.compile(REGEX);
        Matcher m = p.matcher(INPUT); // get a matcher object
        StringBuffer sb = new StringBuffer();
        while(m.find()){
            m.appendReplacement(sb,REPLACE);
        }
        m.appendTail(sb);
        System.out.println(sb.toString());
    }
}
```

Running this code produces the same result as previously.

```shell
-foo-foo-foo-
```


<a id="string-equivalent">&nbsp;</a>
## Matcher Method Equivalents in String

For convenience, the [`String`](javadoc:String) class mimics a couple of [`Matcher`](javadoc:Matcher) methods as well:

- [`public String replaceFirst(String regex, String replacement)`](javadoc:String.replaceFirst(String,String)): Replaces the first substring of this string that matches the given regular expression with the given replacement. An invocation of this method of the form `string.replaceFirst(regex, repl)` yields exactly the same result as the expression `Pattern.compile(regex).matcher(str).replaceFirst(repl)`
- [`public String replaceAll(String regex, String replacement)`](javadoc:String.replaceAll(String,String)): Replaces each substring of this string that matches the given regular expression with the given replacement. An invocation of this method of the form `string.replaceAll(regex, repl)` yields exactly the same result as the expression `Pattern.compile(regex).matcher(str).replaceAll(repl)`
