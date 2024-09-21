const sentence = "Saya sangat senang mengerjakan soal algoritma";

const longestWord = sentence.split(' ').sort((a, b) => b.length - a.length)[0];

console.log(longestWord);