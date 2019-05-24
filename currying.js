/*
The concept is simple: 
You can call a function with fewer arguments than it expects. 
It returns a function that takes the remaining arguments.
*/

const add = x => y => x + y;
const increment = add(1);
const addTen = add(10);

increment(2); // 3
addTen(2); // 12

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

const match = curry((what, s) => s.match(what));
const replace = curry((what, replacement, s) => s.replace(what, replacement));
const filter = curry((f, xs) => xs.filter(f));
const map = curry((f, xs) => xs.map(f));

//---------------------------//

// words :: String -> [String]
const words = str => split(" ", str);
const words = split(" ");

// filterQs :: [String] -> [String]
const filterQs = xs => filter(x => x.match(/q/i), xs);
const filterQs = filter(match(/q/i));

// max :: [Number] -> Number
const max = xs => reduce((acc, x) => (x >= acc ? x : acc), -Infinity, xs);

const keepHighest = (x, y) => (x >= y ? x : y);
const max = reduce(keepHighest, -Infinity);
