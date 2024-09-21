const input = ['xc', 'dz', 'bbb', 'dz'];
const query = ['bbb', 'ac', 'dz'];

const result = query.map(q => input.filter(i => i === q).length);

console.log(result);