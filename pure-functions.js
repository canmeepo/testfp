/*
    Pure functions are mathematical functions 
    and they're what functional programming is all about.
*/

//---------ex01----------//

const xs = [1, 2, 3, 4, 5];

// pure
xs.slice(0, 3); // [1,2,3]
xs.slice(0, 3); // [1,2,3]
xs.slice(0, 3); // [1,2,3]

// impure
xs.splice(0, 3); // [1,2,3]
xs.splice(0, 3); // [4,5]
xs.splice(0, 3); // []

//---------ex02----------//

// impure
let minimum = 21;
const checkAge = age => age >= minimum;

// pure
const checkAge = age => {
  const minimum = 21;
  return age >= minimum;
};

const immutableState = Object.freeze({ minimum: 21 });

//---------ex03----------//

/*
Pure functions can always be cached by input. 
This is typically done using a technique called memoization:
*/

const squareNumber = memoize(x => x * x);

squareNumber(4); // 16
squareNumber(4); // 16, returns cache for input 4
squareNumber(5); // 25
squareNumber(5); // 25, returns cache for input 5

const memoize = f => {
  const cache = {};

  return (...args) => {
    const argStr = JSON.stringify(args);
    cache[argStr] = cache[argStr] || f(...args);
    return cache[argStr];
  };
};

//Something to note is that you can transform some impure functions into pure ones by delaying evaluation:
const pureHttpCall = memoize((url, params) => () => $.getJSON(url, params));

//---------ex04----------//

// impure
const signUp = attrs => {
  const user = saveUser(attrs);
  welcomeUser(user);
};

// pure
const signUp = (Db, Email, attrs) => () => {
  const user = saveUser(Db, attrs);
  welcomeUser(Email, user);
};
