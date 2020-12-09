var magicSquares = [
  [[8, 1, 6], [3, 5, 7], [4, 9, 2]],
  [[6, 1, 8], [7, 5, 3], [2, 9, 4]],
  [[4, 9, 2], [3, 5, 7], [8, 1, 6]],
  [[2, 9, 4], [7, 5, 3], [6, 1, 8]], 
  [[8, 3, 4], [1, 5, 9], [6, 7, 2]], 
  [[4, 3, 8], [9, 5, 1], [2, 7, 6]], 
  [[6, 7, 2], [1, 5, 9], [8, 3, 4]], 
  [[2, 7, 6], [9, 5, 1], [4, 3, 8]]
]

function formingMagicSquare(s) {
return magicSquares.reduce((cost, list) => {
    var tempCost = list.reduce((sum, innerList, index) => {
      return innerList.reduce((sum2, num, index2) => {
          return sum2 + Math.abs(num - s[index][index2]);
      }, sum);
    }, 0);
  
    return tempCost < cost ? tempCost : cost;
}, Number.MAX_SAFE_INTEGER);
}

var s = [ [ 4, 9, 2 ], [ 3, 5, 7 ], [ 8, 1, 5 ] ];
console.log(formingMagicSquare(s));