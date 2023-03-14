---
id: api.collections.sortedmap
title: Keeping Keys Sorted with SortedMap and NavigableMap
slug: learn/api/collections-framework/sorted-maps
slug_history:
- learn/keeping-keys-sorted-with-sortedmap-and-navigablemap
type: tutorial-group
group: collections
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Methods Added by SortedMap {sortedmap}
- Methods Added by NavigableMap {navigablemap}
description: "Using a Sortedmap to Sort Key-Value Pairs."
---


<a id="sortedmap">&nbsp;</a>
## Methods Added by SortedMap

The JDK provides two extensions of the [`Map`](javadoc:Map) interface: [`SortedMap`](javadoc:SortedMap) and [`NavigableMap`](javadoc:NavigableMap). [`NavigableMap`](javadoc:NavigableMap) is an extension of [`SortedMap`](javadoc:SortedMap). Both interfaces are implemented by the same class: [`TreeMap`](javadoc:TreeMap). The [`TreeMap`](javadoc:TreeMap) class is a red-black tree, a well-known data structure. 

[`SortedMap`](javadoc:SortedMap) and [`NavigableMap`](javadoc:NavigableMap) keep their key/value pairs sorted by key. Just as for [`SortedSet`](javadoc:SortedSet) and [`NavigableSet`](javadoc:NavigableSet), you need to provide a way to compare these keys. You have two solutions to do this: either the class of your keys implements [`Comparable`](javadoc:Comparable), or you provide a [`Comparator`](javadoc:Comparator) for your keys when creating your [`TreeMap`](javadoc:TreeMap). If you provide a [`Comparator`](javadoc:Comparator), it will be used even if your keys are comparable. 

If the implementation you chose for your [`SortedMap`](javadoc:SortedMap) or [`NavigableMap`](javadoc:NavigableMap) is [`TreeMap`](javadoc:TreeMap), then you can safely cast the set returned by a call to [`keySet()`](javadoc:Map.keySet()) or [`entrySet()`](javadoc:Map.entrySet()) to [`SortedSet`](javadoc:SortedSet) or [`NavigableSet`](javadoc:NavigableSet). [`NavigableMap`](javadoc:NavigableMap) has a method, [`navigableKeySet()`](javadoc:NavigableMap.navigableKeySet()) that returns an instance of [`NavigableSet`](javadoc:NavigableSet) that you can use instead of the plain [`keySet()`](javadoc:Map.keySet()) method. Both methods return the same object.

The [`SortedMap`](javadoc:SortedMap) interface adds the following methods to [`Map`](javadoc:Map): 

- [`firstKey()`](javadoc:SortedMap.firstKey()) and [`lastKey()`](javadoc:SortedMap.lastKey()): returns the lowest and the greatest key of your map;
- [`headMap(toKey)`](javadoc:SortedMap.headMap(K)) and [`tailMap(fromKey)`](javadoc:SortedMap.tailMap(K)): returns a [`SortedMap`](javadoc:SortedMap) whose keys are strictly less than `toKey`, or greater than or equal to `fromKey`;
- [`subMap(fromKey, toKey)`](javadoc:SortedMap.subMap(K,K)): returns a [`SortedMap`](javadoc:SortedMap) whose keys are strictly lesser than `toKey`, or greater than or equal to `fromKey`. 

These maps are instances of [`SortedMap`](javadoc:SortedMap) and are views backed by this map. Any change made to this map will be seen in these views. These views can be updated, with a restriction: you cannot insert a key outside the boundaries of the map you built. 

You can see this behavior on the following example: 

```java
SortedMap<Integer, String> map = new TreeMap<>();
map.put(1, "one");
map.put(2, "two");
map.put(3, "three");
map.put(5, "five");
map.put(6, "six");

SortedMap<Integer, String> headMap = map.headMap(3);
headMap.put(0, "zero"); // this line is ok
headMap.put(4, "four"); // this line throws an IllegalArgumentException
```


<a id="navigablemap">&nbsp;</a>
## Methods Added by NavigableMap

### Accessing to Specific Keys or Entries

The [`NavigableMap`](javadoc:NavigableMap) adds more methods to [`SortedMap`](javadoc:SortedMap). The first set of methods gives you access to specific keys and entries in your map. 

- [`firstKey()`](javadoc:NavigableMap.firstKey()), [`firstEntry()`](javadoc:NavigableMap.firstEntry()), [`lastEntry()`](javadoc:NavigableMap.lastEntry()), and [[`lastKey()`](javadoc:SortedMap.lastKey())](javadoc:SortedMap.lastKey()): return the lowest or greatest key or entry from this map.
- [`ceilingKey(key)`](javadoc:NavigableMap.ceilingKey(K)), [`ceilingEntry(key)`](javadoc:NavigableMap.ceilingEntry(K)), [`higherKey(key)`](javadoc:NavigableMap.higherKey(K)), [`higherEntry(key)`](javadoc:NavigableMap.higherEntry(K)): return the lowest key or entry greater than the provided key. The `ceiling` methods may return a key that is equal to the provided key, whereas the key returned by the `higher` methods is strictly greater. 
- [`floorKey(key)`](javadoc:NavigableMap.floorKey(K)), [`floorEntry(key)`](javadoc:NavigableMap.floorEntry(K)), [`lowerKey(key)`](javadoc:NavigableMap.lowerKey(K)), [`lowerEntry(key)`](javadoc:NavigableMap.lowerEntry(K)): return the greatest key or entry lesser than the provided key. The `floor` methods may return a key that is equal to the provided key, whereas the key returned by the `higher` methods is strictly lower.

### Accessing your Map with Queue-Like Features

The second set gives you queue-like features: 

- [`pollFirstEntry()`](javadoc:NavigableMap.pollFirstEntry()): returns and removes the lowest entry
- [`pollLastEntry()`](javadoc:NavigableMap.pollLastEntry()): returns and removes the greatest entry.

### Traversing your Map in the Reverse Order

The third set reverses your map, as if it had been built on the reversed comparison logic.

- [`navigableKeySet()`](javadoc:NavigableMap.navigableKeySet()) is a convenience method that returns a [`NavigableSet`](javadoc:NavigableSet) so that you do not have to cast the result of [`keySet()`](javadoc:Map.keySet())
- [`descendingKeySet()`](javadoc:NavigableMap.descendingKeySet()): returns a [`NavigableSet`](javadoc:NavigableSet) backed by the map, on which you can iterate in the descending order
- [`descendingMap()`](javadoc:NavigableMap.descendingMap()): returns a [`NavigableMap`](javadoc:NavigableMap) with the same semantic. 

Both views support element removal, but you cannot add anything through them.

Here is an example to demonstrate how you can use them.

```java
NavigableMap<Integer, String> map = new TreeMap<>();
map.put(1, "one");
map.put(2, "two");
map.put(3, "three");
map.put(4, "four");
map.put(5, "five");

map.keySet().forEach(key -> System.out.print(key + " "));
System.out.println();

NavigableSet<Integer> descendingKeys = map.descendingKeySet();
descendingKeys.forEach(key -> System.out.print(key + " "));
```

Running this code prints out the following result. 

```text
1 2 3 4 5 
5 4 3 2 1 
```

### Getting Submap Views

The last set of methods give you access to views on portions of your map. 

- [`subMap(fromKey, fromInclusive, toKey, toInclusive)`](javadoc:NavigableMap.subMap(K,boolean,K,boolean)): returns a submap where you can decide to include or not the boundaries
- [`headMap(toKey, inclusive)`](javadoc:NavigableMap.headMap(K)): same for the head map
- [`tailMap(fromKey, inclusive)`](javadoc:NavigableMap.tailMap(K)): same for the tail map. 

These maps are views on this map, which you can update by removing or adding key/value pairs. There is one restriction on adding elements though: you cannot add keys outside the boundaries on which the view has been created. 
