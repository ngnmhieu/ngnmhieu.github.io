---
layout: post
title:  "Javascript: Variable, Scope and Closure"
date:   2014-02-08 00:00:00
categories: programming
---
When I first look into javascript, it confused me a little: you can initialize variable either with or without the *var* keyword, the way variable assignment work in different scopes, pitfall when creating clousure ... So I will try clarifying them here.

First, let's talk about scope and variable. There are basically 2 kinds of scope in javascript: *Global scope* and *function scope* (there is no *block scope* - we'll talk about that later). It's best to show an example:

{% highlight javascript %}
var b = "I'm global"; // global scope
function foo () {
  console.log(b) // => "I'm global"
} 
{% endhighlight %}

{% highlight javascript %}
// function scope
function bar(a) { // to create local variables, declare them with `var` keyword
  var c = "Local variable"; 
  var b = "I'm local now, not global anymore";
}
bar(1234);
console.log(b); // => "I'm global";
// console.log(a); => error: variable not defined
// console.log(c); => error: variable not defined
{% endhighlight %}

{% highlight javascript %}
function quax() {
  var crimson = "Local to quax";

  // inner function can access the scope of outer function
  return function () { 
    console.log(crimson); // => "Local to quax"                             
  }
}
{% endhighlight %}

How about this?

{% highlight javascript %}
function baz() { // assume `a` haven't been declared outside baz
  a = "Global or Local?" // It's actually a global variable
}
console.log(a); // => "Global or Local?"
{% endhighlight %}

The first 3 examples are clear:
- variable declared outside a function is global
- inside a function is local (declaration is statement with `var` keyword) + function parameters.
- inner function always has access to the scope of it's outer function. 

In the fourth example, `a` is assigned to a value, without `var` keyword, this will not create a local variable inside barz. Instead, it will look up the scope chain from the current scope, to the outer scope ... until it reach the global scope, if not found, the variable is created as global variable, not local.

*The question is, when to use `var` keyword, when not? Answer:*
1. At global scope: no difference, will always create global variable.
2. At function scope: statement with `var` keyword will create local variable. Statement without `var`  will create a global variable (if it hasn't been declared yet).

Bonus: every statement with `var` keyword is declaration statement, which will be "hoisted" to the top of it's scope. That said, you can use the variable *anywhere* in that scope. But it has a value only when the assingment statement is reached. Let me give you an example:

If you write something like this:

{% highlight javascript %}
function fun() {
  console.log(str); // => 'undefined'
  var str = "Hello world!"
  console.log(str); // => 'Hello world!'
}
{% endhighlight %}

It turns out to be like this, do you see the difference?

{% highlight javascript %}
function fun() {
  var str;
  console.log(str); // => 'undefined'
  str = "Hello world!"
  console.log(str); // => 'Hello world!'
}
{% endhighlight %}

Finally, remember I said there is no block scope? It's not entirely true, as Javascript 1.7 introduce [let][let_keyword] keyword, which enable block scoping (it is familiar if you have programmed in functional languages like ML or Racket before). It might be useful in some situation where you need to create closures inside a loop, but I'm not going into details here. Right now, this feature is only supported by Mozilla browser.

Now, it's time for closure. In case you don't know, closure is just function, but carry with it the "environment" where it was defined, that is, when called, it's variables are looked up in that environment. It actually was presented in the third example above:

{% highlight javascript %}
function quax() {
  var crimson = "Local to quax";

  // inner function can access the scope of outer function
  return function () { 
    console.log(crimson); // => "Local to quax"                             
  }
}
var func = quax();
func(); // => "Local to quax"
{% endhighlight %}

The local variable `crimson` should evaporate immediately after quax() is executed. But thanks to closure, like I said, the inner function carry with it the environment (in which `crimson` was defined), so it can look it up and prints out "Local to quax". Closure is used a lot in Javascript, especially for implementing callbacks. But there is a pitfall that programmers are very likely to fall into: creating closure inside a loop. Let see an example:

{% highlight javascript %}
var call_dogs = []; // array contains functions, when called will alert the name of a dog
function () {
  var dogs = [{'name' => 'Cooper', 'type': '1'},
              {'name' => 'Toby', 'type': '4'},
              {'name' => 'Ricky', 'type':'2'}] 
  for (var i=0; i < dogs.length; i++) {
    var dog = dogs[i].name;
    call_dogs.push(function () { alert(dog) });                             
  };  
}
{% endhighlight %}

It will be much shorter if we could use `let` keyword that I mentioned ealier in this case. But `let` keyword is still not standard at the moment, so we should stick with the above workaround.

In summary, I want to finish with a paragraph taken from [wikipedia][wikipedia]:

> JavaScript has simple scoping rules, but variable initialization and name resolution rules can cause problems, and the widespread use of closures for callbacks means the lexical environment of a function when defined (which is used for name resolution) can be very different from the lexical environment when it is called (which is irrelevant for name resolution). JavaScript objects have name resolution for properties, but this is a separate topic.

[let_keyword]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let 
[wikipedia]: http://en.wikipedia.org/wiki/Scope_(computer_science)#JavaScript
