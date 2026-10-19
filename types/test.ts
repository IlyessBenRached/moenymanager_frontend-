/* 

Write a function last that returns the last item of an array, using a generic T, like the first example.

Hint: copy the shape of first. Only the line inside the function body changes. Remember that the last index is items.length - 1.

 */


function first<T>(items: T[]): T {
  return items[0];
}

const a = first([1, 2, 3]);      // a is number
const b = first(["x", "y"]); 


function last<T>(items : T[]) : T | undefined {
    return items[items.length -1 ];
}

