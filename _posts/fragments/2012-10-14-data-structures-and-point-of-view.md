---
title: Data structures and point of view
category: fragments
layout: default
---

There's a quote I've seen online a few times from [Alan Kay][1], "Point of view 
is worth 80 IQ points". It struck a chord with me immediately as it seems to 
describe so well the process of learning concepts in general - it's rarely some 
specific piece of knowledge that enables new understanding, but the ability to 
look at a problem or some information in a new way. 

It's only recently occurred to me that this exactly why data structure choice 
matters so much, the right choice can do more than simply label or organise 
the data in your program - it provides a point of view.

A recent example of this is from a project I've been doing at work that 
involves a lot of computational geometry type stuff. There was one class of 
problems that kept coming up and I had no idea how to solve (without resorting 
to some horible and rather verbose brute-force algorithms anyway) until I took 
10 minutes to read an article explaining the [doubly connected edge list][2] 
(or "half-edge") data structure. If I'd thought of this myself or read about it 
sooner it would have saved me many a headache!

[1]: http://en.wikipedia.org/wiki/Alan_kay
[2]: http://en.wikipedia.org/wiki/Doubly_connected_edge_list
