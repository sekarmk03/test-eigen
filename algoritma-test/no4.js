const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];

let sumLeftToRight = 0;
for (let i = 0; i < matrix.length; i++) {
    sumLeftToRight += matrix[i][i];
}

let sumRightToLeft = 0;
for (let i = 0; i < matrix.length; i++) {
    sumRightToLeft += matrix[i][matrix.length - 1 - i];
}

const result = Math.abs(sumLeftToRight - sumRightToLeft)

console.log(result);