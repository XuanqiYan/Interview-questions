import React from 'react'

class EventDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'zhangsan',
            list: [
                {
                    id: 'id-1',
                    title: '标题1'
                },
                {
                    id: 'id-2',
                    title: '标题2'
                },
                {
                    id: 'id-3',
                    title: '标题3'
                }
            ]
        }

        // 修改方法的 this 指向 
        this.clickHandler1 = this.clickHandler1.bind(this)
    }
    render() {
        // this - 使用 bind静态绑定this （不是点击的时候执行绑定）
        // return <p onClick={this.clickHandler1}>
        //     {this.state.name}
        // </p>

        // this - 使用静态方法
        // return <p onClick={this.clickHandler2}>
        //    {this.state.name}
        // </p>

        // event
  //       return (
		// 	<div onClick={this.clickHandler1}>
		// 		<a href="http://baidu.com" onClick={this.clickHandler3.bind(this)}>
		// 		    click me
		// 		</a>
		// 	</div>
		// )
        // // 传递参数 - 用 bind(this, a, b)
        return <ul>{this.state.list.map((item, index) => {
            return <li key={item.id} onClick={this.clickHandler4.bind(this, item.id, item.title)}>
                index {index}; title {item.title}
            </li>
        })}</ul>
    }
    clickHandler1() {
        console.log('this...',this) // this 默认是 undefined
        this.setState({
            name: 'lisi'
        })
    }
    // 静态方法，this 指向当前实例 不推荐
    clickHandler2 = () => {
        this.setState({
            name: 'lisi'
        })
    }
    // 获取 event
    clickHandler3 = (event) => {
        event.preventDefault()  // 阻止默认行为
        //event.stopPropagation() // 阻止冒泡
        //console.log('target', event.target) // 事件在哪个元素上监听的，即当前元素触发
        //console.log('current target', event.currentTarget) // 事件在哪个元素上触发的 ，假象！！！

        // 注意:event 其实是 React 封装的, 可以看 __proto__.constructor 是 SyntheticEvent 组合事件
        //console.log('event', event) // 不是原生的 Event ，原生的 MouseEvent
        //console.log('event.__proto__.constructor', event.__proto__.constructor)

        // 原生 event 如下: 其 __proto__.constructor 是 MouseEvent
		//console.log('nativeEvent', event.nativeEvent)// 原始的event对象
        //console.log('nativeEvent target', event.nativeEvent.target)  //绑定事件的元素
		//react中的事件都是由document（原生的文档对象代理的 性能优化 ）
        //console.log('nativeEvent current target', event.nativeEvent.currentTarget) //触发事件的元素 指向 document ！！！

        // 1. event 是 SyntheticEvent ，模拟原生event所有能力
        // 2. event.nativeEvent 是原生事件对象
        // 3. 所有的事件，都被挂载到 document 上 能提升性能
    }
    // 传递参数
    clickHandler4(id, title, event) {
        console.log(id, title)
        //console.log('event', event) // 最后追加一个参数，即可接收 event
    }
}

export default EventDemo
