//Array
const arr = [1, 2, 3, 4, 5, 6];

const arr2 = ["tito", "tosca", "tola", "Diego"];

console.log(arr[0]);

const evenArr = arr.map((num) => num % 2 === 0);
console.log(arr);

const newArr = [...arr, ...arr2];

console.log(newArr);

console.log(evenArr);
