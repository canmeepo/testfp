const compose = (f, g) => x => f(g(x));

const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const shout = compose(
  exclaim,
  toUpperCase
);

shout("send in the clowns"); // "SEND IN THE CLOWNS!"


// (associativity)
compose(f, compose(g, h)) === compose(compose(f, g), h);

compose(toUpperCase, compose(head, reverse));
compose(compose(toUpperCase, head), reverse);

// -----pointfree examples-------


// not pointfree because we mention the data: word
const snakeCase = word => word.toLowerCase().replace(/\s+/ig, '_');
// pointfree
const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);

// not pointfree because we mention the data: name
const initials = name => name.split(' ').map(compose(toUpperCase, head)).join('. ');
// pointfree
// NOTE: we use 'intercalate' from the appendix instead of 'join' introduced in Chapter 09!
const initials = compose(intercalate('. '), map(compose(toUpperCase, head)), split(' '));

initials('hunter stockton thompson'); // 'H. S. T'
