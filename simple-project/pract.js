let x = 3;
let y = 4;
console.log(`x = ${x} and y = ${y}`);
function swap(k, l) {
  x = l;
  y = k;
  return;
}

swap(x, y);
console.log(`x = ${x} and y = ${y}`);
