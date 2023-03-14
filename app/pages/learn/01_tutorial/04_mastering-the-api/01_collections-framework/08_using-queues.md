---
id: api.collections.queues
title: Storing Elements in Stacks and Queues
slug: learn/api/collections-framework/stacks-queues
slug_history:
- learn/storing-elements-in-stacks-and-queues
type: tutorial-group
group: collections
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
toc:
- Finding Your Way in the Queue Hierarchy {hierarchy}
- Pushing, Popping and Peeking {pushing-poping-peeking}
- Modeling Queues and Stacks {modeling-queues-stacks}
- Modeling FIFO Queues with Queue {fifo-queues}
- Modeling LIFO Stacks and FIFO Queues with Deque {lifo-deque}
- Implementing Queue and Deque {implementing-queue-deque}
- Staying Away from the Stack Class {the-stack-class}
description: "Finding Your Way in the Queue Hierarchy."
---


<a id="hierarchy">&nbsp;</a>
## Finding Your Way in the Queue Hierarchy

Java SE 5 saw the addition of a new interface in the Collections Framework: the [`Queue`](javadoc:Queue) interface, further extended in Java SE 6 by the [`Deque`](javadoc:Deque) interface. The [`Queue`](javadoc:Queue) interface is an extension of the [`Collection`](javadoc:Collection) interface. 

<figure>
<p align="center">
    <img src="/assets/images/collections-framework/02_queue-hierarchy.png" 
        alt="The Queue Interface Hierarchy"
        width="25%"/>
</p>
<figcaption align="center">The Queue Interface Hierarchy</figcaption>
</figure>


<a id="pushing-poping-peeking">&nbsp;</a>
## Pushing, Popping and Peeking

The stack and queue structures are classic data structures in computing. Stacks are also called LIFO stacks, where LIFO stands for Last In, First Out. Queues are known as FIFO: First In First Out. 

These structures are very simple and gives you three main operations. 

- _push(element)_: adds an element to the queue, or the stack
- _pop()_: removes an element from the stack, that is, the youngest element added
- _poll()_: removes an element from the queue, that is, the oldest element added  
- _peek()_: allows you to see the element you will get with a _pop()_ or a _poll()_, but without removing it from the queue of the stack. 

There are two reasons to explain the success of these structures in computing. The first one is their simplicity. Even in the very early days of computing, implementing these was simple. The second one is their usefulness. Many algorithms use stacks for their implementations. 


<a id="modeling-queues-stacks">&nbsp;</a>
## Modeling Queues and Stacks

The Collections Framework gives you two interfaces to model queues and stacks: 

- the [`Queue`](javadoc:Queue) interface models a queue;
- the [`Deque`](javadoc:Deque) interface models a double ended queue (thus the name). You can push, pop, poll and peek elements on both the tail and the head of a [`Deque`](javadoc:Deque), making it both a queue and a stack.  

Stacks and queues are also widely used in concurrent programming. These interfaces are further extended by more interfaces, adding methods useful in this field. These interfaces, [`BlockingQueue`](javadoc:BlockingQueue), [`BlockingDeque`](javadoc:BlockingDeque) and [`TransferQueue`](javadoc:TransferQueue), are at the intersection of the Collections Framework and concurrent programming in Java, which is outside the scope of this tutorial. 

Both the [`Queue`](javadoc:Queue) and the [`Deque`](javadoc:Deque) interfaces add behavior to these three fundamental operations to deal with two corner cases.  

- A queue may be full and not able to accept more elements
- A queue may be empty and cannot return an element with a _pop_, _poll_, nor the _peek_ operation. 

In fact this question needs to be answered: how does an implementation should behave in these two cases? 


<a id="fifo-queues">&nbsp;</a>
## Modeling FIFO Queues with Queue

The [`Queue`](javadoc:Queue) interface gives you two ways of dealing with these corner cases. An exception can be thrown, or a special value can be returned. 

Here is the table of the methods [`Queue`](javadoc:Queue) gives you.

| Operation | Method           | Behavior when the queue is full or empty |
| --------- | ---------------- | -------------------------------------- |
| push      | [`add(element)`](javadoc:Queue.add(E))   | throws an [`IllegalStateException`](javadoc:IllegalStateException)      |
|           | [`offer(element)`](javadoc:Queue.offer(E)) | returns `false`                        |
| poll      | [`remove()`](javadoc:Queue.remove())       | throws a [`NoSuchElementException`](javadoc:NoSuchElementException)     |
|           | [`poll()`](javadoc:Queue.poll())         | returns `false`                        |
| peek      | [`element()`](javadoc:Queue.element())      | throws a [`NoSuchElementException`](javadoc:NoSuchElementException)     |
|           | [`peek()`](javadoc:Queue.peek())         | returns `null`                         |



<a id="lifo-deque">&nbsp;</a>
## Modeling LIFO Stacks and FIFO Queues with Deque

Java SE 6 added the [`Deque`](javadoc:Deque) interface as an extension of the [`Queue`](javadoc:Queue) interface. Of course, the methods defined in [`Queue`](javadoc:Queue) are still available in [`Deque`](javadoc:Deque), but [`Deque`](javadoc:Deque) brought a new naming convention. So these methods have been duplicated in [`Deque`](javadoc:Deque), following this new naming convention. 

Here is the table of the methods defined in [`Deque`](javadoc:Deque) for the FIFO operations. 

| FIFO Operation | Method                                                                                                                 | Behavior when the queue is full or empty                                                                                                |
|----------------|------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| push           | [`addLast(element)`](javadoc:Deque.addLast(E))     | throws an [`IllegalStateException`](javadoc:IllegalStateException)  |
|                | [`offerLast(element)`](javadoc:Deque.offerLast(E)) | returns `false`                                                                                                                         |
| poll           | [`removeFirst()`](javadoc:Deque.removeFirst())     | throws a [`NoSuchElementException`](javadoc:NoSuchElementException) |
|                | [`pollFirst()`](javadoc:Deque.pollFirst())         | returns `null`                                                                                                                          |
| peek           | [`getFirst()`](javadoc:Deque.getFirst())         | throws a [`NoSuchElementException`](javadoc:NoSuchElementException) |
|            | [`peekFirst()`](javadoc:Deque.peekFirst())           | returns `null`                                                                                                                          |

And here is the table of the methods defined in [`Deque`](javadoc:Deque) for the LIFO operations.

| LIFO Operation | Method                | Behavior when the queue is full or empty |
| -------------- | --------------------- | -------------------------------------- |
| push           | [`addFirst(element)`](javadoc:Deque.addFirst(E))   | throws an [`IllegalStateException`](javadoc:IllegalStateException)      |
|                | [`offerFirst(element)`](javadoc:Deque.offerFirst(E)) | returns `false`                        |
| pop           | [`removeFirst()`](javadoc:Deque.removeFirst())       | throws a [`NoSuchElementException`](javadoc:NoSuchElementException)      |
|                | [`pollFirst()`](javadoc:Deque.pollFirst())         | returns `null`                        |
| peek           | [`getFirst()`](javadoc:Deque.getFirst())          | throws a [`NoSuchElementException`](javadoc:NoSuchElementException)      |
|                | [`peekFirst()`](javadoc:Deque.peekFirst())         | returns `null`                         |

The [`Deque`](javadoc:Deque) naming convention is straightforward and is the same as the one followed in the [`Queue`](javadoc:Queue) interface. There is one difference though: the peek operations are named [`getFirst()`](javadoc:Deque.getFirst()) and [`getLast()`](javadoc:Deque.getLast()) in [`Deque`](javadoc:Deque), and [`element()`](javadoc:Deque.element()) in [`Queue`](javadoc:Queue). 

Moreover, [`Deque`](javadoc:Deque) also defines the methods you would expect in any queue or stack class: 

- [`push(element)`](javadoc:Deque.push(E)): adds the given `element` to the head of the double ended queue
- [`pop()`](javadoc:Deque.pop()): removes and return the element at the head of the double ended queue
- [`poll()`](javadoc:Deque.poll()): does the same at the tail of the double ended queue
- [`peek()`](javadoc:Deque.peek()): shows you the element at the tail of the double ended queue. 

In case there is no element to _pop_, _poll_, or _peek_, then a null value is returned by these methods. 

<a id="implementing-queue-deque">&nbsp;</a>
## Implementing Queue and Deque

The Collections Framework gives you three implementations of [`Queue`](javadoc:Queue) and [`Deque`](javadoc:Deque), outside the concurrent programming space: 

- [`ArrayDeque`](javadoc:ArrayDeque): which implements both. This implementation is backed by an array. The capacity of this class automatically grows as elements are added. So this implementation always accepts new elements.
- [`LinkedList`](javadoc:LinkedList): which also implements both. This implementation is backed by a linked list, making the access to its first and last element very efficient. A [`LinkedList`](javadoc:LinkedList) will always accept new elements. 
- [`PriorityQueue`](javadoc:PriorityQueue): that only implements [`Queue`](javadoc:Queue). This queue is backed by an array that keeps its elements sorted by their natural order or by an order specified by a [`Comparator`](javadoc:Comparator). The head of this queue is always the least element of the queue with respect to the specified ordering. The capacity of this class automatically grows as elements are added.


<a id="the-stack-class">&nbsp;</a>
## Staying Away from the Stack Class

It may seem tempting to use the [`Stack`](javadoc:Stack) class offered by the JDK. This class is simple to use and to understand. It has the three expected methods [`push(element)`](javadoc:Stack.push(E)), [`pop()`](javadoc:Stack.pop()), and [`peek()`](javadoc:Stack.peek()), and seeing this class referenced in your code makes it perfectly readable. 

It turns out that this class is an extension of the [`Vector`](javadoc:Vector) class. Back in the days before the Collections Framework was introduced, [`Vector`](javadoc:Vector) was your best choice to work with a list. Although [`Vector`](javadoc:Vector) is not deprecated, its usage is discouraged. So is the usage of the [`Stack`](javadoc:Stack) class. 

The [`Vector`](javadoc:Vector) class is thread safe, and so is [`Stack`](javadoc:Stack). If you do not need the thread safety, then you can safely replace its usage with [`Deque`](javadoc:Deque) and [`ArrayDeque`](javadoc:ArrayDeque). If what you need is a thread-safe stack, then you should explore the implementations of the [`BlockingQueue`](javadoc:BlockingQueue) interface. 
