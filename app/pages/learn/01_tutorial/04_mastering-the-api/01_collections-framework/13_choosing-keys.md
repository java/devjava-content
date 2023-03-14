---
id: api.collections.choosing_keys
title: Choosing Immutable Types for Your Key
slug: learn/api/collections-framework/choosing-keys
slug_history:
- collections/keys
type: tutorial-group
group: collections
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Avoiding the Use of Mutable Keys {no-mutable-keys}
- Diving in the Structure of HashSet {hashset-structure}
description: "Avoiding the Use of Mutable Keys."
---


<a id="no-mutable-keys">&nbsp;</a>
## Avoiding the Use of Mutable Keys

Using mutable key is an antipattern, and you should definitely avoid doing that. The side effects you may get if you do are terrible: you may end up making the content of your map unreachable.

It is quite easy to set up an example to show that. Here is a `Key` class, which is just a mutable wrapper on an [`String`](javadoc:String). Note that the [`equals()`](javadoc:Object.equals(Object)) and [`hashCode()`](javadoc:Object.hashCode()) methods have been overridden by a code that your IDE could generate.

```java
//
// !!!!! This an example of an antipattern !!!!!!
// !!! do not do this in your production code !!!
//
class Key {
    private String key;

    public Key(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @Override
    public String toString() {
        return key;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Key key = (Key) o;
        return Objects.equals(key, key.key);
    }

    @Override
    public int hashCode() {
        return key.hashCode();
    }
}
```

You can use this wrapper to create a map in which to put key-value pairs in. 

```java
Key one = new Key("1");
Key two = new Key("2");

Map<Key, String> map = new HashMap<>();
map.put(one, "one");
map.put(two, "two");

System.out.println("map.get(one) = " + map.get(one));
System.out.println("map.get(two) = " + map.get(two));
```

So far this code is OK and prints out the following:

```text
map.get(one) = one
map.get(two) = two
```

What will happen is someone mutates your key? Well, it really depends on the mutation. You can try the ones in the following example, and see what is happening when you try to get your values back.  

```java
one.setKey(5);
two.setKey(1);

System.out.println("map.get(one) = " + map.get(one));
System.out.println("map.get(two) = " + map.get(two));
```

The result is not what you want. 

```text
map.get(one) = null
map.get(two) = one
```

As you can see, even on a very simple example, things can go terribly wrong: the first key cannot be used to access the right value anymore, and the second one gives access to the wrong value.

In a nutshell: if you really cannot avoid using mutable keys, do not mutate them. 


<a id="hashset-structure">&nbsp;</a>
## Diving in the Structure of HashSet

You may be wondering why would it be interesting to talk about the [`HashSet`](javadoc:HashSet) class in this section? Well, it turns out that the [`HashSet`](javadoc:HashSet) class is in fact built on an internal [`HashMap`](javadoc:HashMap). So the two classes share some common features. 

Here is the code of the [`add(element)`](javadoc:HashSet.add()) of the [`HashSet`](javadoc:HashSet) class: 

```java
private transient HashMap<E,Object> map;
private static final Object PRESENT = new Object();

public boolean add(E e) {
    return map.put(e, PRESENT)==null;
}
```

What you can see is that in fact, a hashset stores your object in a hashmap (the `transient` keyword is not relevant). Your objects are the keys of this hashmap, and the value is just a placeholder, an object with no significance. 

The important point to remember here is that if you mutate your objects after you have added them to a set, you may come across weird bugs in your application, that will be hard to fix. 

Let us take the previous example again, with the mutable `Key` class. This time, you are going to add instances of this class to a set. 

```java
Key one = new Key("1");
Key two = new Key("2");

Set<Key> set = new HashSet<>();
set.add(one);
set.add(two);

System.out.println("set = " + set);

// You should never mutate an object once it has been added to a Set!
one.setKey("3");
System.out.println("set.contains(one) = " + set.contains(one));
boolean addedOne = set.add(one);
System.out.println("addedOne = " + addedOne);
System.out.println("set = " + set);
```

Running this code produces the following result: 

```text
set = [1, 2]
set.contains(one) = false
addedOne = true
set = [3, 2, 3]
```

You can see that in fact the first element and the last element of the set are the same: 

```java
List<Key> list = new ArrayList<>(set);
Key key0 = list.get(0);
Key key2 = list.get(2);

System.out.println("key0 = " + key0);
System.out.println("key2 = " + key2);
System.out.println("key0 == key2 ? " + (key0 == key2));
```

If you run this last piece of code, you will get the following result: 

```text
key0 = 3
key2 = 3
key0 == key2 ? true
```

In this example, you saw that mutating an object once it has been added to a set can lead to having the same object more than once in this set. Simply said, do not do that!  
