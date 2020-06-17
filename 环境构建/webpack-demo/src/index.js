// import './style/style1.css'
// import './style/style2.less'


// import { mult } from './math.js'

// const sumRes =  mult(10,100)

// console.log(sumRes)

if(true){
	import('./mult.then(res =>{
		const sum =res.default.sum(10,20)
		console.log(sum)
	})
}

//开启热跟新后
// if(module.hot){
// 	//热跟新设置监听模块
// 	module.hot.accept(['./math.js'],()=>{
// 		//只要 math.js模块改变执行这个回调 
// 		const sumRes1 = sum(10,20)
// 		console.log('sumRes1:',sumRes1)
// 	})
// }









// console.log('this is a test')

// let str = 'zhangsan'
// document.write(`my name is ${str}`)


// import math from './math.js'

// document.write('age:'+ math.age)
// document.write('age1:'+ math.age)
// document.write('age2:'+ math.age)

/*
	document.write("my name is ".concat("zhangsan")),
    document.write("age:21"),
    document.write("age1:21"),
    document.write("age2:21")
*/







































