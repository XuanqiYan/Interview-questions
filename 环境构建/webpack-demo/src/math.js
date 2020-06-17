// Es6的模块导出 静态导出
export  sum  = (a,b)=>{
	return a+b+1000
}
export  mult =  (a,b)=>{
	return a*b
}

export default {
	sum,
	mult
}
//导入
// import xxx,{sum}from 'math.js' //静态导入 ok

// if(flag){
// 	//import xxx,{sum,mult }from 'math.js' // 运行时导入 错误
// 	import('math.js')
// }









// -------------------------------------



//commonJS的模块导出 运行时导出
// module.exports = {
// 	name:'zhangsan',
// 	func:function(){
		
// 	}
// }
	
// if(flag){
	
// 	const xxx  = require('other.js')	 //运行时导入
// }	
	

	




