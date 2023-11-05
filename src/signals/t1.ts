import { signal } from 'signals';
 ​
 const counter = signal(0);
 
function increment() {
  counter(counter() + 1);
}

function decrement() {
  counter(counter() - 1);
}

console.log(counter()); // Output: 0

increment();
console.log(counter()); // Output: 1

decrement();
console.log(counter()); // Output: 0

// Oops! We decremented the counter too many times
decrement();
console.log(counter()); // Output: -1