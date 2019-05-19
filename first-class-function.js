//before
const hi = name => `Hi ${name}`;
const greeting = name => hi(name);

//after
const greeting = hi;
greeting("times"); // "Hi times"
