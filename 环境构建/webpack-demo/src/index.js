// 引入 css
import './style/style1.css'
import './style/style2.less'

//使用日期插件 
import moment from 'moment'
//动态语言包加载
import 'moment/locale/zh-cn';
import 'moment/locale/en-au';
if(false){
	moment.locale('zh-cn')
}else{
	moment.locale('en');
}

console.log(moment(1316116057189).fromNow()); 

// setTimeout(()=>{
// 	//异步执行
// 	import('./test.js').then((res)=>{
// 		console.log(res.default.message)
// 	})
// },3000) 
// console.log('nice')

//import _ from 'lodash' // 100kb





































