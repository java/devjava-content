---
id: api.collections.iterating
title: Iterating over the Elements of a Collection
slug: learn/api/collections-framework/iterating
slug_history:
- learn/iterating
type: tutorial-group
group: collections
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Using the For-each Pattern {for-each-pattern}
- Using an Iterator on a Collection {iterator}
- Updating a Collection While Iterating over It {iterate-and-update}
- Implementing the Iterable Interface {implementing-iterable}
description: "Iterating over the Content of a Collection."
---


<a id="for-each-pattern">&nbsp;</a>
## Using the for-each Pattern

Your simplest choice to iterate over the elements of a collection is to use the for-each pattern.

```java
Collection<String> strings = List.of("one", "two", "three");

for (String element: strings) {
    System.out.println(string);
}
```

Running this code produces the following result: 

```text
one
two
three
```

This pattern is very efficient, as long as you only need to read the elements of your collection. The [`Iterator`](javadoc:Iterator) pattern allows to remove some of the elements of your collection while you are iterating over them. If you need to do that, then you want to use the [`Iterator`](javadoc:Iterator) pattern. 


<a id="iterator">&nbsp;</a>
## Using an Iterator on a Collection

Iterating over the elements of a collection uses a special object, an instance of the [`Iterator`](javadoc:Iterator) interface. You can get an [`Iterator`](javadoc:Iterator) object from any extension of the [`Collection`](javadoc:Collection) interface. The [`iterator()`](javadoc:Collection.iterator()) method is defined on the [`Iterable`](javadoc:Iterable) interface, extended by the [`Collection`](javadoc:Collection) interface, and further extended by all the interfaces of the collection hierarchy. 

Iterating over the elements of a collection using this object is a two-steps process.

1. First you need to check if there are more elements to be visited with the [`hasNext()`](javadoc:Iterator.hasNext()) method
2. Then you can advance to the next element with the [`next()`](javadoc:Iterator.next()) method. 

If you call the [`next()`](javadoc:Iterator.next()) method but there are no more elements in the collection, you will get a [`NoSuchElementException`](javadoc:NoSuchElementException). Calling [`hasNext()`](javadoc:Iterator.hasNext()) is not mandatory, it is there to help you to make sure that there is indeed a next element. 

Here is the pattern: 

```java
Collection<String> strings = List.of("one", "two", "three", "four");
for (Iterator<String> iterator = strings.iterator(); iterator.hasNext();) {
    String element = iterator.next();
    if (element.length() == 3) {
        System.out.println(element);
    }
}
```

This code produces the following result: 

```text
one
two
```

The [`Iterator`](javadoc:Iterator) interface has a third method: [`remove()`](javadoc:Iterator.remove()). Calling this method removes the current element from the collection. There are cases though where this method is not supported, it will throw an [`UnsupportedOperationException`](javadoc:UnsupportedOperationException). Quite obviously, calling [`remove()`](javadoc:Iterator.remove()) on an immutable collection cannot work, so this is one of the cases. The implementation of [`Iterator`](javadoc:Iterator) you get from [`ArrayList`](javadoc:ArrayList), [`LinkedList`](javadoc:LinkedList) and [`HashSet`](javadoc:HashSet) all support this remove operation.  


<a id="iterate-and-update">&nbsp;</a>
## Updating a Collection While Iterating over It

If you happen to modify the content of a collection while iterating over it, you may get a [`ConcurrentModificationException`](javadoc:ConcurrentModificationException). Getting this exception may be a little confusing, because this exception is also used in concurrent programming. In the context of the Collections Framework, you may get it without touching multithreaded programming. 

The following code throws a [`ConcurrentModificationException`](javadoc:ConcurrentModificationException).

```java
Collection<String> strings = new ArrayList<>();
strings.add("one");
strings.add("two");

Iterator<String> iterator = strings.iterator();
while (iterator.hasNext()) {

    String element = iterator.next();
    strings.remove(element);
}
```

If what you need is to remove the elements of a collection that satisfy a given criteria, you may use the [`removeIf()`](javadoc:Collection.removeIf(Predicate)) method. 


<a id="implementing-iterable">&nbsp;</a>
## Implementing the Iterable Interface

Now that you saw what an iterator is in the Collection Framework, you can create a simple implementation of the [`Iterable`](javadoc:Iterable) interface. 

Suppose you need to create a `Range` class that models a range of integers between two limits. All you need to do is iterate from the first integer to the last one. 

You can implement the [`Iterable`](javadoc:Iterable) interface with a record, a feature introduced in Java SE 16: 

```java
record Range(int start, int end) implements Iterable<Integer> {

    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<>() {
            private int index = start;
            
            @Override
            public boolean hasNext() {
                return index < end;
            }

            @Override
            public Integer next() {
                if (index > end) {
                    throw new NoSuchElementException("" + index);
                }
                int currentIndex = index;
                index++;
                return currentIndex;
            }
        };
    }
}
```

You can do the same with a plain class, in case your application does not support Java SE 16 yet. Note that the code of the implementation of [`Iterator`](javadoc:Iterator) is exactly the same. 

```java
class Range implements Iterable<Integer> {

    private final int start;
    private final int end;
    
    public Range(int start, int end) {
        this.start = start;
        this.end = end;
    }
    
    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<>() {
            private int index = start;
            
            @Override
            public boolean hasNext() {
                return index < end;
            }

            @Override
            public Integer next() {
                if (index > end) {
                    throw new NoSuchElementException("" + index);
                }
                int currentIndex = index;
                index++;
                return currentIndex;
            }
        };
    }
}
```

In both cases, you can use an instance of `Range` in a for-each statement, since it implements [`Iterable`](javadoc:Iterable): 

```java
for (int i : new Range1(0, 5)) {
    System.out.println("i = " + i);
}
```

Running this code gives you the following result: 

```text
i = 0
i = 1
i = 2
i = 3
i = 4
```
