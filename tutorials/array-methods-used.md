# Array Methods 
This section discuses the array methods we used in the previous tutorials. These array methods include
## find()
The find() method of Array instances returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.

If you need the index of the found element in the array, use `findIndex()`.
If you need to find the index of a value, use `indexOf()`. (It's similar to `findIndex()`, but checks each element for equality with the value instead of using a testing function.)
If you need to find if a value exists in an array, use `includes()`. Again, it checks each element for equality with the value instead of using a testing function.
If you need to find if any element satisfies the provided testing function, use `some()`.
If you need to find all elements that satisfy the provided testing function, use `filter()`.

```javascript
const array1 = [5, 12, 8, 130, 44];
const found = array1.find((element) => element > 10);
console.log(found);
// Expected output: 12
```


## Description
The find() method is an iterative method. It calls a provided callbackFn function once for each element in an array in ascending-index order, until callbackFn returns a truthy value. find() then returns that element and stops iterating through the array. If callbackFn never returns a truthy value, find() returns undefined. Read the iterative methods section for more information about how these methods work in general.

callbackFn is invoked for every index of the array, not just those with assigned values. Empty slots in sparse arrays behave the same as undefined.

Examples
Find an object in an array by one of its properties
```javascript
const inventory = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 },
];

function isCherries(fruit) {
  return fruit.name === "cherries";
}

console.log(inventory.find(isCherries));
// { name: 'cherries', quantity: 5 }
```

Using arrow function and destructuring
```javascript
const inventory = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 },
];

const result = inventory.find(({ name }) => name === "cherries");

console.log(result); // { name: 'cherries', quantity: 5 }
```

## filter()
The filter() method of Array instances creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.
#### Return value
A shallow copy of the given array containing just the elements that pass the test. If no elements pass the test, an empty array is returned.

The filter() method is an iterative method. It calls a provided callbackFn function once for each element in an array, and constructs a new array of all the values for which callbackFn returns a truthy value. Array elements which do not pass the callbackFn test are not included in the new array. Read the iterative methods section for more information about how these methods work in general.

callbackFn is invoked only for array indexes which have assigned values. It is not invoked for empty slots in sparse arrays.

```javascript
const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]
```
### Examples
Filtering out all small values
The following example uses filter() to create a filtered array that has all elements with values less than 10 removed.
```javascript
function isBigEnough(value) {
  return value >= 10;
}

const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
```

Find all prime numbers in an array
The following example returns all prime numbers in the array:

```javascript
const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function isPrime(num) {
  for (let i = 2; num > i; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
}

console.log(array.filter(isPrime)); // [2, 3, 5, 7, 11, 13]
```

Searching in array
Following example uses filter() to filter array content based on search criteria.
```javascript
const fruits = ["apple", "banana", "grapes", "mango", "orange"];

/**
 * Filter array items based on search criteria (query)
 */
function filterItems(arr, query) {
  return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
}

console.log(filterItems(fruits, "ap")); // ['apple', 'grapes']
console.log(filterItems(fruits, "an")); // ['banana', 'mango', 'orange']
```


## findIndex()

findIndex()
The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned. This method is useful when you need to know the position of an element in the array rather than the element itself.
### Description
findIndex(): Returns the index of the first element that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.

### Example
```javascript
const array = [5, 12, 8, 130, 44];
const index = array.findIndex(element => element > 10);
console.log(index); // Expected output: 1
```
## forEach()
forEach()
The forEach() method executes a provided function once for each array element. It is used for executing side effects for each element in the array.
### Description
forEach(): Executes a provided function once for each array element. It is used for executing side effects for each element in the array.
Example
```javascript
const array = [5, 12, 8, 130, 44];
array.forEach(element => {
 console.log(element);
});
// Expected output: 5, 12, 8, 130, 44
```
## map()
The map() method creates a new array populated with the results of calling a provided function on every element in the calling array. It does not mutate the original array.

Example
```javascript
const array = [5, 12, 8, 130, 44];
const newArray = array.map(element => element * 2);
console.log(newArray); // Expected output: [10, 24, 16, 260, 88]
```
### Description
map(): Creates a new array populated with the results of calling a provided function on every element in the calling array. It does not mutate the original array.
