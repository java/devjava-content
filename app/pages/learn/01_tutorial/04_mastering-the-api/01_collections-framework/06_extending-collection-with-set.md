---
id: api.collections.set
title: Extending Collection with Set, SortedSet and NavigableSet
slug: learn/api/collections-framework/sets
slug_history:
- collections/sets
type: tutorial-group
group: collections
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Exploring the Set Interface {exploring}
- Extending Set with SortedSet {sortedset}
- Extending SortedSet with NavigableSet {navigableset}
description: "Exploring the Set Interface."
---


<a id="exploring">&nbsp;</a>
## Exploring the Set Interface

The [`Set`](javadoc:Set) interface does not bring any new method to the [`Collection`](javadoc:Collection) interface. The Collections Framework gives you one plain implementation of the [`Set`](javadoc:Set) interface: [`HashSet`](javadoc:HashSet). Internally, a [`HashSet`](javadoc:HashSet) wraps an instance of [`HashMap`](javadoc:HashMap), a class that will be covered later, that acts as a delegate for [`HashSet`](javadoc:HashSet). 

As you already saw, what a [`Set`](javadoc:Set) brings to a [`Collection`](javadoc:Collection) is that it forbids duplicates. What you lose over the [`List`](javadoc:List) interface is that your elements are stored in no particular order. There is very little chance that you will iterate over them in the same order as you added them to your set. 

You can see this in the following example: 

```java
List<String> strings = List.of("one", "two", "three", "four", "five", "six");
Set<String> set = new HashSet<>();
set.addAll(strings);
set.forEach(System.out::println);
```

Running this code will produce the following: 

```text
six
four
one
two
three
five
```

Some implementations of [`Set`](javadoc:Set) give you the same order when you iterate over their elements, but since this is not guaranteed, your code should not rely on that.  


<a id="sortedset">&nbsp;</a>
## Extending Set with SortedSet

The first extension of [`Set`](javadoc:Set) is the [`SortedSet`](javadoc:SortedSet) interface. The [`SortedSet`](javadoc:SortedSet) interface keeps its elements sorted according to a certain comparison logic. The Collections Framework gives you one implementation of [`SortedSet`](javadoc:SortedSet), called [`TreeSet`](javadoc:TreeSet). 

As you already saw, either you provide a comparator when you build a [`TreeSet`](javadoc:TreeSet), or you implement the [`Comparable`](javadoc:Comparable) interface for the elements you put in the TreeSet. If you do both, then the comparator takes precedence. 

The [`SortedSet`](javadoc:SortedSet) interface adds new methods to [`Set`](javadoc:Set).

- [`first()`](javadoc:TreeSet.first()) and [`last()`](javadoc:TreeSet.last()) returns the lowest and the largest elements of the set
- [`headSet(toElement)`](javadoc:TreeSet.headSet(E)) and [`tailSet(fromElement)`](javadoc:TreeSet.tailSet(E)) returns you subsets containing the elements lower than `toElement` or greater than `fromElement`
- [`subSet(fromElement, toElement)`](javadoc:TreeSet.subSet(E,E)) gives you a subset of the element between `fromElement` and `toElement`. 

The `toElement` and `fromElement` do not have to be elements of the main set. If they are, then `toElement` is not included in the result and `fromElement` is, following the usual convention. 

Consider the following example: 

```java
SortedSet<String> strings = new TreeSet<>(Set.of("a", "b", "c", "d", "e", "f"));
SortedSet<String> subSet = strings.subSet("aa", "d");
System.out.println("sub set = " + subSet);
```

Running this code will give you the following: 

```text
sub set = [b, c]
```

The three subsets that these methods return are _views_ on the main set. No copy is made, meaning that any change you make to these subsets will be reflected in the set, and the other way round. 

You can remove or add elements to the main set through these subsets. There is one point you need to keep in mind though. These three subsets remember the limits on which they have been built. For consistency reasons, it is not legal to add an element through a subset outside its limits. For instance, if you take a [`headSet`](javadoc:SortedSet.headSet(E)) and try to add an element greater than `toElement`, then you will get an [`IllegalArgumentException`](javadoc:IllegalArgumentException).


<a id="navigableset">&nbsp;</a>
## Extending SortedSet with NavigableSet

Java SE 6 saw the introduction of an extension of [`SortedSet`](javadoc:SortedSet) with the addition of more methods. It turns out that the [`TreeSet`](javadoc:TreeSet) class was retrofitted to implement [`NavigableSet`](javadoc:NavigableSet). So you can use the same class for both interfaces.  

Some methods are overloaded by [`NavigableSet`](javadoc:NavigableSet). 
- [`headSet()`](javadoc:NavigableSet.headSet(E)), [`headSet()`](javadoc:NavigableSet.tailSet(E)), and [`headSet()`](javadoc:NavigableSet.subSet(E)) may take a further `boolean` arguments to specify whether the limits (`toElement` or `fromElement`) are to be included in the resulting subset. 

Other methods have been added.
- [`ceiling(element)`](javadoc:NavigableSet.ceiling(E)), and [`floor(element)`](javadoc:NavigableSet.floor(E)) return the greatest element lesser or equal than, or the lowest element greater or equal than the provided `element`. If there is no such element then `null` is returned
- [`floor(element)`](javadoc:NavigableSet.lower(E)), and [`higher(element)`](javadoc:NavigableSet.higher(E)) return the greater element lesser than, or the lowest element greater than the provided `element`. If there is no such element then `null` is returned.
- [`pollFirst()`](javadoc:NavigableSet.pollFirst()), and [`pollLast()`](javadoc:NavigableSet.pollLast()) return and removes the lowest or the greatest element of the set. 

Furthermore, [`NavigableSet`](javadoc:NavigableSet) also allows you to iterate over its elements in descending order. There are two ways to do this.
- You can call [`descendingIterator()`](javadoc:NavigableSet.descendingIterator()): it gives you a regular [`Iterator`](javadoc:Iterator) that traverses the set in the descending order.
- You can also call [`descendingSet()`](javadoc:NavigableSet.descendingSet()). What you get in return is another [`NavigableSet`](javadoc:NavigableSet) that is a view on this set and that makes you think you have the same set, sorted in the reversed order.  

The following example demonstrates this. 

```java
NavigableSet<String> sortedStrings = new TreeSet<>(Set.of("a", "b", "c", "d", "e", "f"));
System.out.println("sorted strings = " + sortedStrings);
NavigableSet<String> reversedStrings = sortedStrings.descendingSet();
System.out.println("reversed strings = " + reversedStrings);
```

Running this code will give you the following:

```text
sorted strings = [a, b, c, d, e, f]
reversed strings = [f, e, d, c, b, a]
```
