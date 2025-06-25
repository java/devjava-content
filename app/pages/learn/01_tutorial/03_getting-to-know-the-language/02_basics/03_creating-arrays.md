---
id: lang.basics.arrays
title: Creating Arrays in Your Programs
slug: learn/language-basics/arrays
slug_history:
- learn/creating-arrays-in-your-programs
type: tutorial-group
group: language-basics
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Arrays {intro}
- Declaring a Variable to Refer to an Array {declaring}
- Creating, Initializing, and Accessing an Array {creating-initializing-accessing}
- Copying Arrays {copying}
- Array Manipulations {manipulating}
- Wrapping-up Variables and Arrays {wrapping-up}
description: "Creating fixed-length containers of objects with arrays."
last_update: 2022-08-27
---


<a id="intro">&nbsp;</a>
## Arrays

An _array_ is a container object that holds a fixed number of values of a single type. The length of an array is established when the array is created. After creation, its length is fixed. You have seen an example of arrays already, in the main method of the "Hello World!" application. This section discusses arrays in greater detail.

<figure>
<p align="center">
    <img src="/assets/images/language-basics/01_array.png"
        alt="An array of 8 elements."
        width="60%"/>
</p>
<figcaption align="center">An array of 8 elements.</figcaption>
</figure>

Each item in an array is called an _element_, and each element is accessed by its numerical _index_. As shown in the preceding illustration, numbering begins with 0. The 6th element, for example, would therefore be accessed at index 5.

The following program, `ArrayDemo`, creates an array of integers, puts some values in the array, and prints each value to standard output.

```java
class ArrayDemo {
    public static void main(String[] args) {
        // declares an array of integers
        int[] anArray;

        // allocates memory for 10 integers
        anArray = new int[10];

        // initialize first element
        anArray[0] = 100;
        // initialize second element
        anArray[1] = 200;
        // and so forth
        anArray[2] = 300;
        anArray[3] = 400;
        anArray[4] = 500;
        anArray[5] = 600;
        anArray[6] = 700;
        anArray[7] = 800;
        anArray[8] = 900;
        anArray[9] = 1000;

        System.out.println("Element at index 0: "
                           + anArray[0]);
        System.out.println("Element at index 1: "
                           + anArray[1]);
        System.out.println("Element at index 2: "
                           + anArray[2]);
        System.out.println("Element at index 3: "
                           + anArray[3]);
        System.out.println("Element at index 4: "
                           + anArray[4]);
        System.out.println("Element at index 5: "
                           + anArray[5]);
        System.out.println("Element at index 6: "
                           + anArray[6]);
        System.out.println("Element at index 7: "
                           + anArray[7]);
        System.out.println("Element at index 8: "
                           + anArray[8]);
        System.out.println("Element at index 9: "
                           + anArray[9]);
    }
}
```

The output from this program is:

```shell
Element at index 0: 100
Element at index 1: 200
Element at index 2: 300
Element at index 3: 400
Element at index 4: 500
Element at index 5: 600
Element at index 6: 700
Element at index 7: 800
Element at index 8: 900
Element at index 9: 1000
```

In a real-world programming situation, you would probably use one of the supported looping constructs to iterate through each element of the array, rather than write each line individually as in the preceding example. However, the example clearly illustrates the array syntax. You will learn about the various looping constructs (for, while, and do-while) in the [Control Flow](id:lang.basics.flow) section.


<a id="declaring">&nbsp;</a>
## Declaring a Variable to Refer to an Array

The preceding program declares an array (named `anArray`) with the following line of code:

```java
// declares an array of integers
int[] anArray;
```

Like declarations for variables of other types, an array declaration has two components: the array's type and the array's name. An array's type is written as `type[]`, where `type` is the data type of the contained elements; the brackets are special symbols indicating that this variable holds an array. The size of the array is not part of its type (which is why the brackets are empty). An array's name can be anything you want, provided that it follows the rules and conventions as discussed in the [Classes](id:lang.classes.classes) section. As with variables of other types, the declaration does not actually create an array; it simply tells the compiler that this variable will hold an array of the specified type.

Similarly, you can declare arrays of other types:

```java
byte[] anArrayOfBytes;
short[] anArrayOfShorts;
long[] anArrayOfLongs;
float[] anArrayOfFloats;
double[] anArrayOfDoubles;
boolean[] anArrayOfBooleans;
char[] anArrayOfChars;
String[] anArrayOfStrings;
```

You can also place the brackets after the array's name:

```java
// this form is discouraged
float anArrayOfFloats[];
```

However, convention discourages this form; the brackets identify the array type and should appear with the type designation.


<a id="creating-initializing-accessing">&nbsp;</a>
## Creating, Initializing, and Accessing an Array

One way to create an array is with the `new` operator. The next statement in the `ArrayDemo` program allocates an array with enough memory for 10 integer elements and assigns the array to the `anArray` variable.

```java
// create an array of integers
anArray = new int[10];
```

If this statement is missing, then the compiler prints an error like the following, and compilation fails:

```shell
ArrayDemo.java:4: Variable anArray may not have been initialized.
```

The next few lines assign values to each element of the array:

```java
anArray[0] = 100; // initialize first element
anArray[1] = 200; // initialize second element
anArray[2] = 300; // and so forth
```

Each array element is accessed by its numerical index:

```java
System.out.println("Element 1 at index 0: " + anArray[0]);
System.out.println("Element 2 at index 1: " + anArray[1]);
System.out.println("Element 3 at index 2: " + anArray[2]);
```

Alternatively, you can use the shortcut syntax to create and initialize an array:

```java
int[] anArray = {
    100, 200, 300,
    400, 500, 600,
    700, 800, 900, 1000
};
```

Here the length of the array is determined by the number of values provided between braces and separated by commas.

You can also declare an array of arrays (also known as a multidimensional array) by using two or more sets of brackets, such as `String[][]` names. Each element, therefore, must be accessed by a corresponding number of index values.

In the Java programming language, a multidimensional array is an array whose components are themselves arrays. This is unlike arrays in C or Fortran. A consequence of this is that the rows are allowed to vary in length, as shown in the following `MultiDimArrayDemo` program:

```java
class MultiDimArrayDemo {
    public static void main(String[] args) {
        String[][] names = {
            {"Mr. ", "Mrs. ", "Ms. "},
            {"Smith", "Jones"}
        };
        // Mr. Smith
        System.out.println(names[0][0] + names[1][0]);
        // Ms. Jones
        System.out.println(names[0][2] + names[1][1]);
    }
}
```

The output from this program is:

```shell
Mr. Smith
Ms. Jones
```

<a id="jagged">&nbsp;</a>
## Working with Jagged Arrays

A **jagged array** (an array of arrays) in Java lets each row have a different length. For example, one row might have 3 elements while another has 2. To create a jagged array, first declare the outer array with a size but no specified inner lengths, then assign each sub-array its own size.

---

## Step 1 – Declare the jagged array
```java
int[][] jaggedArray = new int[3][];
```

## Step 2 – Initialize each row with different sizes or values
```java
jaggedArray[0] = new int[] {1, 2, 3};
jaggedArray[1] = new int[] {4, 5};
jaggedArray[2] = new int[] {6, 7, 8, 9};
```
Each assignment gives a different length (3, 2, and 4 elements respectively) for rows 0, 1, and 2.

## Step 3 – Use nested loops to print all elements

```java
System.out.println("Jagged array elements:");
for (int i = 0; i < jaggedArray.length; i++) {
    for (int j = 0; j < jaggedArray[i].length; j++) {
        System.out.print(jaggedArray[i][j] + " ");
    }
    System.out.println();
}
```
This will print every element in the jagged array in row-major order.

## Step 4 – Print array lengths
```java
System.out.println("Outer array length: " + jaggedArray.length);
for (int i = 0; i < jaggedArray.length; i++) {
    System.out.println("Length of row " + i + ": " + jaggedArray[i].length);
}
```
This outputs the size of the outer array and each inner row length, confirming the structure of the jagged array.

### Output:
```java
Jagged array elements:
1 2 3 
4 5 
6 7 8 9 
Outer array length: 3
Length of row 0: 3
Length of row 1: 2
Length of row 2: 4

```




Finally, you can use the built-in `length` property to determine the size of any array. The following code prints the array's size to standard output:

```java
System.out.println(anArray.length);
```


<a id="copying">&nbsp;</a>
## Copying Arrays

The [`System`](javadoc:System) class has an [`arraycopy()`](javadoc:System.arraycopy(java.lang.Object,int,java.lang.Object,int,int)) method that you can use to efficiently copy data from one array into another:

```java
public static void arraycopy(Object src, int srcPos,
                             Object dest, int destPos, int length)
```

The two `Object` arguments specify the array to copy from and the array to copy to. The three `int` arguments specify the starting position in the source array, the starting position in the destination array, and the number of array elements to copy.

The following program, `ArrayCopyDemo`, declares an array of `String` elements. It uses the [`System.arraycopy()`](javadoc:System.arraycopy(java.lang.Object,int,java.lang.Object,int,int)) method to copy a subsequence of array components into a second array:

```java
class ArrayCopyDemo {
    public static void main(String[] args) {
        String[] copyFrom = {
            "Affogato", "Americano", "Cappuccino", "Corretto", "Cortado",
            "Doppio", "Espresso", "Frappucino", "Freddo", "Lungo", "Macchiato",
            "Marocchino", "Ristretto" };

        String[] copyTo = new String[7];
        System.arraycopy(copyFrom, 2, copyTo, 0, 7);
        for (String coffee : copyTo) {
            System.out.print(coffee + " ");
        }
    }
}
```

The output from this program is:

```shell
Cappuccino Corretto Cortado Doppio Espresso Frappucino Freddo
```


<a id="manipulating">&nbsp;</a>
## Array Manipulations

Arrays are a powerful and useful concept used in programming. Java SE provides methods to perform some of the most common manipulations related to arrays. For instance, the `ArrayCopyDemo` example uses the [`arraycopy()`](javadoc:System.arraycopy(java.lang.Object,int,java.lang.Object,int,int)) method of the [`System`](javadoc:System) class instead of manually iterating through the elements of the source array and placing each one into the destination array. This is performed behind the scenes, enabling the developer to use just one line of code to call the method.

For your convenience, Java SE provides several methods for performing array manipulations (common tasks, such as copying, sorting and searching arrays) in the [`java.util.Arrays`](javadoc:Arrays) class. For instance, the previous example can be modified to use the [`java.util.Arrays`](javadoc:Arrays) method of the [`java.util.Arrays`](javadoc:Arrays) class, as you can see in the `ArrayCopyOfDemo` example. The difference is that using the [`java.util.Arrays`](javadoc:Arrays) method does not require you to create the destination array before calling the method, because the destination array is returned by the method:

```java
class ArrayCopyOfDemo {
    public static void main(String[] args) {
        String[] copyFrom = {
            "Affogato", "Americano", "Cappuccino", "Corretto", "Cortado",
            "Doppio", "Espresso", "Frappucino", "Freddo", "Lungo", "Macchiato",
            "Marocchino", "Ristretto" };

        String[] copyTo = java.util.Arrays.copyOfRange(copyFrom, 2, 9);
        for (String coffee : copyTo) {
            System.out.print(coffee + " ");
        }
    }
}
```

As you can see, the output from this program is the same, although it requires fewer lines of code. Note that the second parameter of the [`java.util.Arrays`](javadoc:Arrays) method is the initial index of the range to be copied, inclusively, while the third parameter is the final index of the range to be copied, exclusively. In this example, the range to be copied does not include the array element at index 9 (which contains the string `Lungo`).

Some other useful operations provided by methods in the [`java.util.Arrays`](javadoc:Arrays) class are:

- Searching an array for a specific value to get the index at which it is placed (the [`binarySearch()`](javadoc:Arrays.binarySearch()) method).
- Comparing two arrays to determine if they are equal or not (the [`equals()`](javadoc:Arrays.equals()) method).
- Filling an array to place a specific value at each index (the [`fill()`](javadoc:Arrays.fill()) method).
- Sorting an array into ascending order. This can be done either sequentially, using the [`sort()`](javadoc:Arrays.sort()) method, or concurrently, using the [`parallelSort()`](javadoc:Arrays.parallelSort()) method introduced in Java SE 8. Parallel sorting of large arrays on multiprocessor systems is faster than sequential array sorting.
- Creating a stream that uses an array as its source (the [`stream()`](javadoc:Arrays.stream()) method). For example, the following statement prints the contents of the `copyTo` array in the same way as in the previous example:

```java
java.util.Arrays.stream(copyTo).map(coffee -> coffee + " ").forEach(System.out::print);
```

See Aggregate Operations for more information about streams.

- Converting an array to a string. The [`toString()`](javadoc:Arrays.toString()) method converts each element of the array to a string, separates them with commas, then surrounds them with brackets. For example, the following statement converts the `copyTo` array to a string and prints it:

```java
System.out.println(java.util.Arrays.toString(copyTo));
```

This statement prints the following:

```shell
[Cappuccino, Corretto, Cortado, Doppio, Espresso, Frappucino, Freddo]
```


<a id="wrapping-up">&nbsp;</a>
## Wrapping-up Variables and Arrays

The Java programming language uses both "fields" and "variables" as part of its terminology. Instance variables (non-static fields) are unique to each instance of a class. Class variables (static fields) are fields declared with the static modifier; there is exactly one copy of a class variable, regardless of how many times the class has been instantiated. Local variables store temporary state inside a method. Parameters are variables that provide extra information to a method; both local variables and parameters are always classified as "variables" (not "fields"). When naming your fields or variables, there are rules and conventions that you should (or must) follow.

The eight primitive data types are: `byte`, `short`, `int`, `long`, `float`, `double`, `boolean`, and `char`. The `java.lang.String` class represents character strings. The compiler will assign a reasonable default value for fields of the above types; for local variables, a default value is never assigned.

A literal is the source code representation of a fixed value. An array is a container object that holds a fixed number of values of a single type. The length of an array is established when the array is created. After creation, its length is fixed.
