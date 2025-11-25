---
title: Math - The Relationship Between Data Structures, Programming Statements, Basic Algorithms and Mathematics (Notes)
tags:
  - Daily
  - Math
slug: 97enyq3a3m
keywords: 'Artificial Intelligence,Computer Mathematics,Computer Fundamentals,Computer,Front-end Learning AI,Daily Practice'
date: 2020-09-15T00:00:00.000Z
---

Many people say that data structures and algorithms cannot be considered mathematics.

> Different data structures are products of applying mathematical thinking in programming.
> Each data structure has its own characteristics, which help us more conveniently implement specific mathematical models.

## Data Structures

> Don't underestimate these data structures. They are actually "models" for solving problems.

### Array

Characteristics: Can directly locate required data through subscripts, suitable for random access. Often combined with loop statements to implement iterative methods, such as binary search, Fibonacci sequence, etc.

Disadvantages: Arrays are only more effective for dense sequences. If the sequence is very sparse, many array elements are invalid values, wasting storage space. In addition, inserting and deleting elements in arrays is also troublesome, requiring batch data movement.

How to solve sparse sequence problems: `Linked List`

### Linked List

Nodes in a linked list store data, and the connection relationships between linked list nodes are implemented through object references in the `JavaScript` language.

Characteristics: Cannot directly access data through subscripts, but must read sequentially according to the storage structure.

Advantages: Don't need to specify the number of data in advance, and no longer need to save invalid values. When representing sparse sequences, storage space can be used more effectively, and it's also beneficial for dynamic insertion and deletion of data.

Disadvantages: Compared to arrays, linked lists cannot support fast random access, and read/write operations take more time.

### Hash Table

Hash tables can be constructed through arrays and linked lists. Previously, we implemented hash tables using `remainder`.

Advantages: If the key is known, access speed is extremely fast, insertion is fast.

Disadvantages: Deletion is slow, if the key is unknown then access is very slow, storage space usage is not sufficient, hash conflicts will occur.

### Tree

Advantages: Fast search, insertion, and deletion, trees are always balanced. Similar trees are useful for disk storage, no hash conflicts occur.

Disadvantages: Complex algorithms.

### Graph

Graphs are another type of nonlinear data structure. In graph structures, data nodes are generally called vertices, and edges are ordered pairs of vertices. If there is an edge between two vertices, it means these two vertices have an adjacent relationship.

### Stack

First in, last out. When we perform function recursion, the order of function calls and returns is also first in, last out. Therefore, stacks embody the idea of recursion and can implement recursive-based programming.

### Queue

A first-in-first-out data structure, where elements that enter the queue first are processed first.

In message queues, loose coupling between producers and consumers is achieved, providing protection for consumers so they are not easily overwhelmed by data floods.

## Programming Statements

### Boolean Expressions
Reflect the concepts of logic and sets in logical algebra.

```js
if(expression) {function body 1} else {function body 2} // If expression is true, execute function body 1, otherwise execute function body 2.
```

## Loop Statements

Loop statements are the embodiment of `iterative methods (Newton's method)`.

## Function Calls

Can call itself or call other different functions. If it continuously calls itself, this embodies the idea of `recursion`.

### Join Operations in SQL

Join has multiple types, each type actually corresponds to a `set operation`.

## Basic Algorithms

### Algorithm Complexity Analysis

`Four arithmetic operations`, `clear priorities`, `parallel processing`, `permutations and combinations`, `a picture is worth a thousand words`, and `time-space tradeoff`.

These principles reflect ideas in mathematics such as `operation precedence`, `order of magnitude`, `multivariate variables`, `graph theory`, etc.

## Summary

When learning programming, you can think more from a mathematical perspective and consider the mathematical models behind it.

This not only helps you integrate existing knowledge but also helps you optimize data structures and algorithms.
