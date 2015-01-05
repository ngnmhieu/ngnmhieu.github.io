# Bridge - Object Structural 

## Motivation
> Decouple an abstraction from its implementation so that the two can *vary independently*.

## Problem
Example (from GoF): There are different kinds of window (IconWindow, TransientWindow, FloatingWindow,...) and they should be used in different platforms (IBM, X System, Apple,...). What solution would help us achieve this?
The solution should be:
  - As simple as possible (as few classes as possible ?).
  - The client should know little/nothing about the mechanism (ideally only 1 class)
  - The client code should be reuseable across different platforms.

## Clarification

### What does it mean to "vary independently"?
In class inheritance, an implementation always adheres to an interface. Which means one specific implementation is coupled with an interface. "Vary independently" means an abstraction can have 2 or more implementations and vice versa (this flexibility might be achieved through *composition* instead of *inheritance*).

### Inheritance or Composition
With class inheritance if we want to use IconWindow in different platforms (say *P* platforms), there should be *(P + 1)* classes (1 for the IconWindow abstract class). And in order to use *T* types of Windows in *P* platforms, there should be at least *T* x *(P + 1)*  classes.

[Image !!]

Now consider the case for composition: Each type of window (IconWindow, FloatingWindow,...) possesses an implementation object, which is an instance of subclass of WindowImplementation abstract class. This object is the implementation of a corresponding platform. In this situation, IconWindow or FloatingWindow don't have to know about platform-specific implementation, only WindowImplementation. Thereby we can combines different abstractions (IconWindow, TransientWindow,...) with platform-specific implementations (IBM, X System, Apple) without having to create extra classes. Finally the number of classes should be created is *T* + *P*, much less than the one of Inheritance.

[Image !!]

## Bridge pattern
Bridge pattern leverages the philosophy "Composition over Inheritance" to enable a clean solution to this problem.

[Image !!]

Here are some key points to this design pattern:
  - The abstraction and implementation are put in separate class hierarchies. (see diagram)
  - What connects them is the relationship between the "root" abstract classes of the 2 hierarchies together with object composition. (the *Bridge*)
  - Operations of the "Abstractions" (classes on the left) are implemented in terms of the abstract operations of the Implementation ("root" class of the implementations).

