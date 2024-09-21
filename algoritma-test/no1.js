let str = "NEGIE1";

let lastChar = str.slice(-1);

let reverseStr = str.slice(0, -1).split("").reverse().join("");

console.log(reverseStr + lastChar);