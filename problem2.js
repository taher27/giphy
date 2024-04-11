let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
let temp = [];

for (let i = 0; i < arr.length - 1; i++) {
  const item = arr[i];
  temp[0].push(item + arr[i + 1]);
}

let result;

console.log(arr);
