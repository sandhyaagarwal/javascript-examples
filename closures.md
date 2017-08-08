
# closures-examples
Understanding closures in Javascript

## What is a Closure ?

A **Closure** is an inner function that has access to the outer / enclosing function's scope chain, which means that the inner functions have access to all the variables and functions declared inside the outer function's scope and also has access to the variables and functions that the outer function has access to. To understand how closures work, it becomes imperative to understand the [**scoping**](#scope) rules in Javascript.

Consider the following example :

```javascript
function a() {
  var x = 10;

  function b() {
    var y = 20;
    console.log(x + y); // can access x

    function c() {
      var z = 30;
      console.log(x + y + z); // can access both x and y
    }

    c();
  }

  b();
}
```

<div id="scope">

## Understanding Javascript Scope

The **scope** or a **namespace** of a variable / function is used to decide which parts of a program has access to the variable / function and which others don't.

Consider the following example :

```javascript 
function printMessage() {
    var message = "Hello World !";
    console.log(message); // prints message, it is in scope
}

console.log(message); // undefined, message is not in scope
```

We understand from this example that the function creates a new scope and variables declared inside the function are not seen outside the function.

What is **global** scope ? 

Variables declared outside a function constitute the global scope.

Consider the following example :

```javascript

var a = 10;

function addTen(b) {
    return a + b; // returns 10 + b
}

function multiplyTen(b) {
    return a * b; // returns 10 * b
}

console.log(addTen(2));
console.log(multiplyTen(2));
```

As can be seen from this example, the variable a has **global** scope and is visible in both the functions.

Javascript has **function** based scope. A function consists of parameters, other variables and code around those variables. A function hides the variables and code inside the function from other functions. In other words, the variables and code are hidden from the outside world. Why is it important to hide the details from the outside world ? The [Principle of Least Privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) explains the reason why this is important for a well designed program.

Consider the following example :

```javascript
function convertMeToAnotherNumber(a) {
      var result = addHundred(a);
      result = multiplyTwenty(result);
      return subtractTen(result);
}

function addHundred(num) {
    return num + 100;
}

function multiplyTwenty(num) {
    return num * 20;
}

function subtractTen(num) {
    return num - 10;
}
```

The functions ```addHundred(), multiplyTwenty() and subtractTen()``` are visible outside the scope of ```convertMeToAnotherNumber()```, but they are not required to be accessed outside the scope of the main function. How can this design be improved ? 

Consider the example below :

```javascript
function convertMeToAnotherNumber(a) {
      return subtractTen(multiplyTwenty(addHundred(a)));
      
      function addHundred(num) {
          return num + 100;
      }

      function multiplyTwenty(num) {
          return num * 20;
      }

      function subtractTen(num) {
          return num - 10;
      }
}
```

Here, the functions are defined inside the main function and are **private** or **hidden** from access outside. 

Does Javascript support **block** scope ?

Until ES5, Javascript did not support **block** scope. So, loops, if-block etc; do not create a new scope and the variables defined inside the for-each block or if-block are scoped to the nearest parent function.

Consider the following example :

```javascript
function printNumbers() {
    console.log("i :" + i); \\ declaration is **hoisted** to the function scope, but not the assignment
    for (var i = 1; i <= 5; i++) {
      console.log("i : " + i);
    }
    console.log("i : " + i); \\ variable is accessible outside the for loop scope
}
```
As can be seen from this example, the first log statement says ```i``` is undefined but does not give a reference error.

```javascript
function blockScopeExample() {
    if(true) {
      var x = 10;
      console.log(x); \\ prints 10
    }
    console.log(x); \\ prints 10 as x is hoisted to the nearest function scope
}

blockScopeExample();
console.log(x); \\ reference error, x is not defined
```

ES6 introduces the [**let**](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let) keyword, which declares a block scope variable.

Consider the same example above, using the **let** keyword

```javascript
function blockScopeExample() {
    if(true) {
      let x = 10;
      console.log(x); \\ prints 10
    }
    console.log(x); \\ reference error, x is not defined
}
```

Having understood how **scope** works in Javascript, let us now go back to understanding **[closures](#closures)**

</div>

<div id="closures">

## Closures

**Functions** are first class objects in Javascript, which means that 

* functions can be assigned to variables just like other values
* functions can be returned from other functions
* functions can be passed as parameters to other functions
* functions can be created inside other functions
* functions can be created without a name (anonymous functions)

Having said that, let us first see an example to understand the usage of closures : (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

```javascript

function printHello() {
    var message = "Hello !";
    var sayHello = function() { // an inner function, a closure that has access to ```message``` declared above
        console.log(message); 
    }
    sayHello();
}
```

Consider the modified example below :

```javascript

function printHello() {
    var message = "Hello !";
    var sayHello = function() { // an inner function, a closure that has access to ```message``` declared above
        console.log(message); 
    }
    return sayHello; // returning the inner function as a result
}

var printer = printHello(); // contains the inner function reference
printer(); // prints "Hello !"
```

The variable ```printer``` still holds a reference to the variable ```message```, wven after the outer function has returned.

## Closures in **Callbacks**

A function that takes another function as an argument / returns another function as its result is known as a **higher-order** function. The function that is passed as an argument is known as a **callback** function.

Consider the example below :

```javascript
var message = "I am clicked !";

$("#clickMe").click(function() {
	console.log(message);
});
```
The argument to the click handler is a function, which is known as the callback-function and is a closure. It can access the variables in the parent scope.

## Closures for event handling

```javascript
var list = document.getElementById('list');

for (var i = 1; i <= 5; i++) {
  var item = document.createElement("li");
  item.appendChild(document.createTextNode("Item :" + i));

  item.onclick = function(event) {
    console.log("Item : " + i + " is clicked."); \\ prints "Item : 6 is clicked" for all list items
  }

  list.appendChild(item);
}
```

What is the issue with the code above ?
Regardless of which list item is clicked, the message printed is "Item : 6 is clicked". However, the intention is to print the message based on which list item is clicked. 

Consider the code below to fix the problem above :

```javascript

var list = document.getElementById('list');

for (var i = 1; i <= 5; i++) {
  var item = document.createElement("li");
  item.appendChild(document.createTextNode("Item :" + i));

  (function(i) {
    item.onclick = function() {
      console.log("Item : " + i + " is clicked.");
    };
  })(i);


  list.appendChild(item);
}
```

The inner function above is an [**I**mmediately **I**nvoked **F**unction **E**xpression](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression), an anonymous function executed immediately after it is created.

## Closures as **Function Factories**

Using closures, the outer function can be used to create factories of functions that are somehow related. 
An example can be found below :

```javascript
function staffRole(title) {
  return function(prefix) {
    return prefix + " " + title;
  }
}

var technicalStaff = staffRole("Technical Staff");
var director = staffRole("Director");
var architect = staffRole("Architect");
var designer = staffRole("Designer");
var productManager = staffRole("Product Manager");

console.log(technicalStaff("Associate member of"));
console.log(technicalStaff("Member of"));
console.log(technicalStaff("Senior member of"));
console.log(technicalStaff("Principal member of"));

console.log(director("Associate"));
console.log(director(""));

```

## Closures to implement the Module Pattern

Consider the following example :

```javascript
var person = (function() {
  var age;

  function isTeenager() {
    return age >= 13 && age <= 19;
  }

  function isAdult() {
    return age >= 21;
  }

  function isToddler() {
    return age <= 5;
  }

  function isKindergartner() {
    return age > 5 && age < 8;
  }

  function calculateAge(yearOfBirth) {
    age = new Date().getFullYear() - yearOfBirth;
  }

  return {
    getAge: function(yearOfBirth) {
      calculateAge(yearOfBirth);
      return age;
    },
    getName: function() {
      return firstName + " " + lastName;
    },
    getAgeGroup: function(yearOfBirth) {
    	calculateAge(yearOfBirth);
      if (isTeenager()) {
        return "Teenager";
      } else if (isAdult()) {
        return "Adult"
      } else if (isToddler()) {
        return "Toddler";
      } else if (isKindergartner()) {
        return "Kindergartner";
      }
    }

  };
})();

console.log(person.getAge(1984));
console.log(person.getAgeGroup(2011));

```

This kind of pattern is known as the **module** pattern and combines the advantages of **IIFE**s with **closures**. This pattern is used to emulate the concept of classes in [OOP](https://en.wikipedia.org/wiki/Object-oriented_programming), by combining the private variables and functions wiith the public variables and functions, exposing only what is required to the outside world and not polluting the global space.

</div>

