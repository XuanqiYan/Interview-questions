import React from 'react'
import './style.css'
import List from '../List'

class JSXBaseDemo extends React.Component {
    constructor(props) {
		super()//调用父组件的构造函数
        this.state = {
            name: 'xuanqiYan',
            imgUrl: 'http://baidu.com',
            flag: true,
			list:[
				{id:1,content:'xxx'},
				{id:2,content:'ooo'},
			]
        }
    }
	//vue 中的render是模版编译后的render函数 react的render 是定义jsx（模板）的函数
    render() {
		// 循环
		return (
			<ul>	
				{
					this.state.list.map( item => {
						return (
								<li key={item.id}>{item.content}</li>
							)
					})
				}
			</ul>
		)	
			
        //  获取变量 插值
		//const elm =  <p>{this.state.name}</p>
        //return elm

        // 表达式
        //const exprElem = <p>{this.state.flag ? 'yes' : 'no'}</p>
        //return exprElem

        // 子元素 模板必须要又一个根节点
   //      const imgElem = (
			// 	<div>
			// 		<p>我的头像</p>
			// 		<img src="xxxx.png"/>
			// 		<img src={this.state.imgUrl}/>
			// 	</div>
			// )
   //      return imgElem

        // class
        // const classElem = <p className="title">设置 css class</p>
        // return classElem

        // // style
        //const styleData = { fontSize: '30px',  color: 'blue' }
        //const styleElem = <p style={styleData}>设置 style</p>
        // 内联写法，注意 {{ 和 }}
        // const styleElem = <p style={{ fontSize: '30px',  color: 'blue' }}>设置 style</p>
        //return styleElem

        //原生 html
        //const rawHtml = '<span>富文本内容<i>斜体</i><b>加粗</b></span><Script>console.log("XSS attack available!")</Script>'
        // const rawHtmlData = {
        //     __html: rawHtml // 注意，必须是这种格式
        // }
		//v-html v-text
  //       const rawHtmlElem = (
		// 		<div>
		// 			<p dangerouslySetInnerHTML={{__html:rawHtml}}></p>
		// 			<p>{rawHtml}</p>
		// 		</div>
		// )
  //       return rawHtmlElem

        // 加载组件
        // const componentElem = <div>
        //     <p>JSX 中加载一个组件</p>
        //     <hr/>
        //     <List/>
        // </div>
       // return componentElem
    }
}

export default JSXBaseDemo
