---
id: api.collections.lambdas
title: Handling Map Values with Lambda Expressions
slug: learn/api/collections-framework/maps-and-lambdas
slug_history:
- learn/handling-map-values-with-lambda-expressions
type: tutorial-group
group: collections
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Consuming the Content of a Map {consuming}
- Replacing Values {replacing}
- Computing Values {computing-values}
- Merging Values {merging-values}
description: "Handling the Values Stored in a Map."
---


<a id="consuming">&nbsp;</a>
## Consuming the Content of a Map

The [`Map`](javadoc:Map) interface has a [`forEach()`](javadoc:Map.forEach(BiConsumer)) method that works in the same way as the [`forEach()`](javadoc:Iterable.forEach()) method on the [`Iterable`](javadoc:Iterable) interface. The difference is that this [`forEach()`](javadoc:Map.forEach(BiConsumer)) method takes a [`BiConsumer`](javadoc:BiConsumer) as an argument instead of a simple [`Consumer`](javadoc:Consumer). 

Let us create a simple map and print out its content. 

```java
Map<Integer, String> map = new HashMap<>();
map.put(1, "one");
map.put(2, "two");
map.put(3, "three");

map.forEach((key, value) -> System.out.println(key + " :: " + value));
```

This code produces the following result: 

```text
1 :: one
2 :: two
3 :: three
```


<a id="replacing">&nbsp;</a>
## Replacing Values

The [`Map`](javadoc:Map) interface gives you three methods to replace a value bound to a key with another value. 

The first one is [`replace(key, value)`](javadoc:Map.replace(K,V)), which replaces the existing value with the new one, blindly. This is the equivalent of a put-if-present operation. This method returns the value that was removed from your map. 

If you need finer control, then you can use an overload of this method, which takes the existing value as an argument: [`replace(key, existingValue, newValue)`](javadoc:Map.replace(K,V,V)). In this case, the existing value is replaced only if it matches the new value. This method returns `true` if the replacement occurred.

The [`Map`](javadoc:Map) interface has also a method to replace all the values of your map using a [`BiFunction`](javadoc:BiFunction). This [`BiFunction`](javadoc:BiFunction) is a remapping function, which takes the key and the value as arguments, and returns a new value, which will replace the existing value. A call to this method iterates internally on all the key/value pairs of your map. 

The following example shows how you can use this [`replaceAll()`](javadoc:Map.replaceAll(BiFunction)) method: 

```java
Map<Integer, String> map = new HashMap<>();

map.put(1, "one");
map.put(2, "two");
map.put(3, "three");

map.replaceAll((key, value) -> value.toUpperCase());
map.forEach((key, value) -> System.out.println(key + " :: " + value));
```

Running this code produces the following result: 

```text
1 :: ONE
2 :: TWO
3 :: THREE
```


<a id="computing-values">&nbsp;</a>
## Computing Values

The [`Map`](javadoc:Map) interface gives you a third pattern to add key-value pairs to a map or modify a map's existing values in the form of three methods: [`compute()`](javadoc:Map.compute(K,BiFunction)), [`computeIfPresent()`](javadoc:Map.computeIfPresent(K,BiFunction)), and [`computeIfAbsent()`](javadoc:Map.computeIfAbsent(K,Function)).  

These three methods take the following arguments: 

- the key on which the computation is made
- the value bound to that key, in the case of [`compute()`](javadoc:Map.compute(K,BiFunction)) and [`computeIfPresent()`](javadoc:Map.computeIfPresent(K,BiFunction))
- a [`BiFunction`](javadoc:BiFunction) that acts as a remapping function, or a mapping function in the case of [`computeIfAbsent()`](javadoc:Map.computeIfAbsent(K,Function)). 

In the case of [`compute()`](javadoc:Map.compute(K,BiFunction)), the remapping bi-function is called with two arguments. The first one is the key, and the second one is the existing value if there is one, or `null` if there is none. Your remapping bifunction can be called with a null value. 

For [`computeIfPresent()`](javadoc:Map.computeIfPresent(K,BiFunction)), the remapping function is called if there is a value bound to that key and if it is not null. If the key is bound to a null value, then the remapping function is not called. Your remapping function cannot be called with a null value.

For [`computeIfAbsent()`](javadoc:Map.computeIfAbsent(K,Function)), beacause there is no value bound to that key, the remapping function is in fact a simple [`Function`](javadoc:Function) that takes the key as an argument. This function is called if the key is not present in the map or if it is bound to a null value. 

In all cases, if your bifunction (or function) returns a null value, then the key is removed from the map: no mapping is created for that key. No key/value pair with a null value can be put in the map using one of these three methods. 

In all cases, the value returned is the new value bound to that key in the map or null if the remapping function returned null. It is worth pointing out that this semantic is different from the [`put()`](javadoc:Map.put(K,V)) methods. The [`put()`](javadoc:Map.put(K,V)) methods return the previous value, whereas the [`compute()`](javadoc:Map.compute(K,BiFunction)) methods return the new value. 

A very interesting use case for the [`computeIfAbsent()`](javadoc:Map.computeIfAbsent(K,Function)) method is the creation of maps with lists as values. Suppose you have the following list of strings: `[one two three four five six seven]`. You need to create a map, where the keys are the length of the words of that list, and the values are the lists of these words. What you need to create is the following map: 

```text
3 :: [one, two, six]
4 :: [four, five]
5 :: [three, seven]
```

Without the [`compute()`](javadoc:Map.compute(K,BiFunction)) methods, you would probably write this: 

```java
List<String> strings = List.of("one", "two", "three", "four", "five", "six", "seven");
Map<Integer, List<String>> map = new HashMap<>();
for (String word: strings) {
    int length = word.length();
    if (!map.containsKey(length)) {
        map.put(length, new ArrayList<>());
    }
    map.get(length).add(word);
}

map.forEach((key, value) -> System.out.println(key + " :: " + value));
```

Running this code produces the expected result: 

```text
3 :: [one, two, six]
4 :: [four, five]
5 :: [three, seven]
```

By the way, you could use a [`putIfAbsent()`](javadoc:Map.putIfAbsent(K,V)) to simplify this for loop: 

```java
for (String word: strings) {
    int length = word.length();
    map.putIfAbsent(length, new ArrayList<>());
    map.get(length).add(word);
}
```

But using [`computeIfAbsent()`](javadoc:Map.computeIfAbsent(K,Function)) can make this code even better: 

```java
for (String word: strings) {
    int length = word.length();
    map.computeIfAbsent(length, key -> new ArrayList<>())
       .add(word);
}
```

How does this code work? 

- If the key is not in the map, then the mapping function is called, which creates an empty list. This list is returned by the [`computeIfAbsent()`](javadoc:Map.computeIfAbsent(K,Function)) method. This is the empty list in which the code adds `word`. 
- If the key is in the map, the mapping function is not called, and the current value bound to that key is returned. This is the partially filled list in which you need to add `word`.

This code is much more efficient than the [`putIfAbsent()`](javadoc:Map.putIfAbsent(K,V)) one, mostly because in that case, the empty list is created only if needed. The [`putIfAbsent()`](javadoc:Map.putIfAbsent(K,V)) call requires an existing empty list, which is used only if the key is not in the map. In cases where the object you add to the map has to be created on demand, then using [`computeIfAbsent()`](javadoc:Map.computeIfAbsent(K,Function)) should be preferred over [`putIfAbsent()`](javadoc:Map.putIfAbsent(K,V)). 


<a id="merging-values">&nbsp;</a>
## Merging Values

The [`computeIfAbsent()`](javadoc:Map.computeIfAbsent(K,Function)) pattern works well if your map has values that are aggregations of other values. But there is a restriction on the structure that is supporting this aggregation: it has to be mutable. This is the case for [`ArrayList`](javadoc:ArrayList), and this is what the code you wrote does: it adds your values to an [`ArrayList`](javadoc:ArrayList). 

Instead of creating lists of words, suppose you need to create a concatenation of words. The [`String`](javadoc:String) class is seen here as an aggregation of other strings, but it is not a mutable container: you cannot use the [`computeIfAbsent()`](javadoc:Map.computeIfAbsent(K,Function)) pattern to do that. 

This is where the [`merge()`](javadoc:Map.merge(K,V,BiFunction)) pattern comes to the rescue. The [`merge()`](javadoc:Map.merge(K,V,BiFunction)) method takes three arguments: 

- a key
- a value, that you need to bind to that key
- a remapping [`BiFunction`](javadoc:BiFunction). 

If the key is not in the map or bound to a null value, then the value is bound to that key. The remapping function is not called in this case. 

On the contrary, if the key is already bound to a non-null value, then the remapping function is called with the existing value, and the new value passed as an argument. If this remapping function returns null, then the key is removed from the map. The value it produces is bound to that key otherwise. 

You can see this [`merge()`](javadoc:Map.merge(K,V,BiFunction)) pattern in action on the following example: 

```java
List<String> strings = List.of("one", "two", "three", "four", "five", "six", "seven");
Map<Integer, String> map = new HashMap<>();
for (String word: strings) {
    int length = word.length();
    map.merge(length, word, 
              (existingValue, newWord) -> existingValue + ", " + newWord);
}

map.forEach((key, value) -> System.out.println(key + " :: " + value));
```

In this case, if the `length` key is not in the map, then the [`merge()`](javadoc:Map.merge(K,V,BiFunction)) call just adds it and binds it to `word`. On the other hand, if the `length` key is already in the map, then the bifunction is called with the existing value and `word`. The result of the bifunction then replaces the current value. 

Running this code produces the following result: 

```text
3 :: one, two, six
4 :: four, five
5 :: three, seven
```

In both patterns, [`computeIfAbsent()`](javadoc:Map.computeIfAbsent(K,Function)) and [`merge()`](javadoc:Map.merge(K,V,BiFunction)), you may be wondering why the lambda created takes an argument that is always available in the context of this lambda, and that could be captured from that context. The answer is: you should favor non-capturing lambdas over capturing ones, for performance reasons. 
