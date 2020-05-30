// let promise = new Promise((resolve, reject) => {
//     resolve(1);
// });

// promise.then(res => {
//     console.log(res)
// });

// async function f() { //async always return a promise
//     return 1;
// }

// console.log(f());

// const promise = f();
// promise.then(res => {
//     console.log(res);
// });

console.log('test1');
const fetch = require('node-fetch');

async function f() {
	console.log('test2');
    
    //to use fetch need to install "npm i node-fetch --save"
    let response = await fetch("https://swapi.dev/api/people/1");
    let result = await response.json();
    
	console.log(result)
	console.log('test4');
	console.log('test5');
};

console.log('test6');
f();
console.log('test7');
