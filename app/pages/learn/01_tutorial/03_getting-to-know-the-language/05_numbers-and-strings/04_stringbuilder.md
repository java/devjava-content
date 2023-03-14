---
id: lang.numbers_strings.stringbuilders
title: String Builders
slug: learn/numbers-strings/string-builders
slug_history:
- learn/string-builders
type: tutorial-group
group: numbers-strings
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- The StringBuilder Class {class}
- Length and Capacity {length-capacity}
- StringBuilder Operations {operations}
- StringBuilder in Action {example}
description: "Using string builders to create strings of characters."
---


<a id="class">&nbsp;</a>
## The StringBuilder Class

[`String`](javadoc:String) objects are like [`StringBuilder`](javadoc:StringBuilder) objects, except that they can be modified. Internally, these objects are treated like variable-length arrays that contain a sequence of characters. At any point, the length and content of the sequence can be changed through method invocations.

Strings should always be used unless string builders offer an advantage in terms of simpler code (see the sample program at the end of this section) or better performance. Prior to Java SE 9, if you need to concatenate a large number of strings, appending to a StringBuilder object may be more efficient. String concatenation has been optimized in Java SE 9, making concatenation more efficient than [`StringBuilder`](javadoc:StringBuilder) appending.


<a id="length-capacity">&nbsp;</a>
## Length and Capacity

The [`StringBuilder`](javadoc:StringBuilder) class, like the [`String`](javadoc:String) class, has a [`length()`](javadoc:StringBuilder.length()) method that returns the length of the character sequence in the builder.

Unlike strings, every string builder also has a capacity, the number of character spaces that have been allocated. The capacity, which is returned by the [`capacity()`](javadoc:StringBuilder.capacity()) method, is always greater than or equal to the length (usually greater than) and will automatically expand as necessary to accommodate additions to the string builder.

You can use the following constructors of the [`StringBuilder`](javadoc:StringBuilder) class:

- [`StringBuilder()`](javadoc:StringBuilder()): Creates an empty string builder with a capacity of 16 (16 empty elements).
- [`StringBuilder(CharSequence cs)`](javadoc:StringBuilder(CharSequence)): Constructs a string builder containing the same characters as the specified [`CharSequence`](javadoc:CharSequence), plus an extra 16 empty elements trailing the [`CharSequence`](javadoc:CharSequence).
- [`StringBuilder(int initCapacity)`](javadoc:StringBuilder(int)): Creates an empty string builder with the specified initial capacity.
- [`StringBuilder(String s)`](javadoc:StringBuilder(String)): Creates a string builder whose value is initialized by the specified string, plus an extra 16 empty elements trailing the string.

For example, the following code

```java
// creates empty builder, capacity 16
StringBuilder sb = new StringBuilder();
// adds 9 character string at beginning
sb.append("Greetings");
```

will produce a string builder with a length of 9 and a capacity of 16:

<figure>
<p align="center">
    <img src="/assets/images/numbers-strings/04_stringbuilder.png" 
        alt="Length and capacity of a `StringBuilder`"
        width="60%"/>
</p>
<figcaption align="center">Length and capacity of a `StringBuilder`</figcaption>
</figure>

The [`StringBuilder`](javadoc:StringBuilder) class has some methods related to length and capacity that the [`String`](javadoc:String) class does not have:

- [`void setLength(int newLength)`](javadoc:StringBuilder.setLength(int)): Sets the length of the character sequence. If `newLength` is less than [`length()`](javadoc:StringBuilder.length()), the last characters in the character sequence are truncated. If `newLength` is greater than [`length()`](javadoc:StringBuilder.length()), `null` characters are added at the end of the character sequence.
- [`void ensureCapacity(int minCapacity)`](javadoc:StringBuilder.ensureCapacity(int)): Ensures that the capacity is at least equal to the specified minimum.

A number of operations (for example, [`append()`](javadoc:StringBuilder.append(Object)), [`insert()`](javadoc:StringBuilder.insert(int,Object)), or [`setLength()`](javadoc:StringBuilder.setLength(int)) can increase the length of the character sequence in the string builder so that the resultant [`length()`](javadoc:StringBuilder.length()) would be greater than the current [`capacity()`](javadoc:StringBuilder.capacity()). When this happens, the capacity is automatically increased.


<a id="operations">&nbsp;</a>
## StringBuilder Operations

The principal operations on a [`StringBuilder`](javadoc:StringBuilder) that are not available in [`String`](javadoc:String) are the [`append()`](javadoc:StringBuilder.append(Object)) and [`insert()`](javadoc:StringBuilder.insert(int,Object)) methods, which are overloaded so as to accept data of any type. Each converts its argument to a string and then appends or inserts the characters of that string to the character sequence in the string builder. The append method always adds these characters at the end of the existing character sequence, while the insert method adds the characters at a specified point.

Here are a number of the methods of the [`StringBuilder`](javadoc:StringBuilder) class.

- You can append any primitive type or object to a string builder with an [`append()`](javadoc:StringBuilder.append(Object)) method. The data is converted to a string before the append operation takes place.
- The [`delete(int start, int end)`](javadoc:StringBuilder.delete(int,int)) method deletes the subsequence from `start` to `end - 1` (inclusive) in the [`StringBuilder`](javadoc:StringBuilder)'s char sequence.
- You can delete the `char` at index `index` with the method [`deleteCharAt(int index)`](javadoc:StringBuilder.deleteCharAt(int)).
- You can insert any primitive type or object at the given `offset` with one of the [`insert(int offset)`](javadoc:StringBuilder.insert(int,Object)) methods. These methods take the element to be inserted as a second argument. The data is converted to a string before the insert operation takes place.
- You can replace characters with the methods [`replace(int start, int end, String s)`](javadoc:StringBuilder.replace(int,int,String)) and [`setCharAt(int index, char c)`](javadoc:StringBuilder.setCharAt(int,char)).
- You can reverse the sequence of characters in this string builder with the [`reverse()`](javadoc:StringBuilder.reverse()) method.
- You can return a string that contains the character sequence in the builder with the [`toString()`](javadoc:StringBuilder.toString()) method.

> Note: You can use any [`String`](javadoc:String) method on a [`StringBuilder`](javadoc:StringBuilder) object by first converting the string builder to a string with the [`toString()`](javadoc:StringBuilder.toString()) method of the [`StringBuilder`](javadoc:StringBuilder) class. Then convert the string back into a string builder using the [`StringBuilder(String string)`](javadoc:StringBuilder(String)) constructor.


<a id="example">&nbsp;</a>
## StringBuilder in Action

The `StringDemo` program that was listed in the section titled "Strings" is an example of a program that would be more efficient if a [`StringBuilder`](javadoc:StringBuilder) were used instead of a [`String`](javadoc:String).

`StringDemo` reversed a palindrome. Here, once again, is its listing:

```java
public class StringDemo {
    public static void main(String[] args) {
        String palindrome = "Dot saw I was Tod";
        int len = palindrome.length();
        char[] tempCharArray = new char[len];
        char[] charArray = new char[len];
        
        // put original string in an 
        // array of chars
        for (int i = 0; i < len; i++) {
            tempCharArray[i] = 
                palindrome.charAt(i);
        } 
        
        // reverse array of chars
        for (int j = 0; j < len; j++) {
            charArray[j] =
                tempCharArray[len - 1 - j];
        }
        
        String reversePalindrome =
            new String(charArray);
        System.out.println(reversePalindrome);
    }
}
```

Running the program produces this output:

```shell
doT saw I was toD
```

To accomplish the string reversal, the program converts the string to an array of characters (first `for` loop), reverses the array into a second array (second `for` loop), and then converts back to a string.

If you convert the palindrome string to a string builder, you can use the [`reverse()`](javadoc:StringBuilder.reverse()) method in the [`StringBuilder`](javadoc:StringBuilder) class. It makes the code simpler and easier to read:

```java
public class StringBuilderDemo {
    public static void main(String[] args) {
        String palindrome = "Dot saw I was Tod";
         
        StringBuilder sb = new StringBuilder(palindrome);
        
        sb.reverse();  // reverse it
        
        System.out.println(sb);
    }
}
```

Running this program produces the same output:

```shell
doT saw I was toD
```

Note that [`println()`](javadoc:PrintStream.println(Object)) prints a string builder, as in:

```java
System.out.println(sb);
```

because `sb.toString()` is called implicitly, as it is with any other object in a [`println`](javadoc:PrintStream.println(Object)) invocation.

> Note: There is also a [`StringBuffer`](javadoc:StringBuffer) class that is exactly the same as the [`StringBuilder`](javadoc:StringBuilder) class, except that it is thread-safe by virtue of having its methods synchronized. Unless you absolutely need a thread-safe class, you do not need to use [`StringBuffer`](javadoc:StringBuffer). 

