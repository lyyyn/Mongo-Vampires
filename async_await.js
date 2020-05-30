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
async function f() {
    console.log('test2');
    let promise = new Promise((resolve, reject) => {
        console.log('test3');
        setTimeout(() => resolve("done!"), 1000)
    });

    console.log('test4');
    promise.then(res => {
        console.log(res);
    });

    console.log('test5');

    // let result = await promise; // wait until the promise resolves (*)

    // alert(result); // "done!"
};
console.log('test6');
f();
console.log('test7');
