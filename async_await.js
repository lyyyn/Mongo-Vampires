
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

// console.log('test1');
// const fetch = require('node-fetch');

// async function f() {
// 	console.log('test2');

//     //to use fetch need to install "npm i node-fetch --save"
//     let response = await fetch("https://swapi.dev/api/people/1");
//     let result = await response.json();

// 	console.log(result)
// 	console.log('test4');
// 	console.log('test5');
// };

// console.log('test6');
// f();
// console.log('test7');

// class Thenable {
//     constructor(num) {
//       this.num = num;
//     }
//     then(resolve, reject) {
//       alert(resolve);
//       // resolve with this.num*2 after 1000ms
//       setTimeout(() => resolve(this.num * 2), 1000); // (*)
//     }
//   };

//   async function f() {
//     // waits for 1 second, then result becomes 2
//     let result = await new Thenable(1);
//     alert(result);
//   }

//   f();

// Task 1
const fetch = require('node-fetch');

function loadJson(url) {
    return fetch(url)
        .then(response => {
            if (response.status == 200) {
                console.log(response);
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
};

const result = loadJson('https://swapi.dev/api/people/1')
    .catch(console.log); // Error: 404

console.log(result);

