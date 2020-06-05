// 引入 css
import './style/style1.css'
import './style/style2.less'

import { sum } from './math'

const sumRes = sum(10, 20)
console.log('sumRes', sumRes)

function insertDom(imgfile){
	const img =  new Image()
	img.src=imgfile
	document.body.appendChild(img)
}

import imgfile1 from  './img/1.png'
import imgfile2 from  './img/2.jpeg'
insertDom(imgfile1)


insertDom(imgfile2)





// // 增加，开启热更新之后的代码逻辑
// if (module.hot) {
//     module.hot.accept(['./math'], () => {
//         const sumRes = sum(10, 30)
//         console.log('sumRes in hot', sumRes)
//     })
// }
