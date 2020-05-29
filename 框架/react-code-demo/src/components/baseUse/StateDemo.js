import React from 'react'

// 函数组件（后面会讲），默认没有 state
class StateDemo extends React.Component {
    constructor(props) {
        super(props)

        // 第一 state 要在构造函数中定义
        this.state = {
            count: 0
        }
    }
    render() {
        return <div>
            <p>{this.state.count}</p>
            <button onClick={this.increase}>累加</button>
        </div>
    }
    increase = () => {
        //第二 不要直接修改 state ，使用不可变值 操作数据的时候不能直接在原始数据上做修改，不管对象还是数据操作都应该操作副本 ----------------------------
		
		// 错误 违背了react 对 state属性使用不可变值的原则
        // this.state.count++ 
        // this.setState({
        //     count: this.state.count 
        // })
		
		// 正确 准守了react 对state 属性使用不可变值的原则
		// this.setState({
		// 	count:this.state.count+1
		// })
		
        // 操作数组、对象的的常用形式

        // 第三 setState 可能是异步更新（有可能是同步更新） ----------------------------
        
  //       this.setState({
  //           count: this.state.count + 1
  //       },()=>{//只要数据设置完毕就会调用方法  $nextTick
		// 	 console.log('count@@@', this.state.count) 
		// })
  //       console.log('count###', this.state.count) // 异步的 拿不到最新值

        // setTimeout 中 setState 是同步的
        // setTimeout(() => {
        //     this.setState({
        //         count: this.state.count + 1
        //     })
        //     console.log('count in setTimeout', this.state.count)
        // }, 0)

        // 自己定义的 DOM 事件，setState 是同步的

        // 第四 state 异步更新的话，更新前会被合并 ----------------------------
        
        // 异步设置 传入对象，对象会被合并。执行结果只一次 +1
		//Object.assing({},{count:1},{count:1}) //{count:1}
		// this.setState({
		//     count: this.state.count + 1
		// })
		// this.setState({
		//     count: this.state.count + 1
		// })
		// this.setState({
		//     count: this.state.count + 1
		// })
		
       
        //异步设置  传入函数，函数不会被合并。执行结果是 +3
        this.setState((prevState, props) => {
            return {
                count: prevState.count + 1
            }
        })
        this.setState((prevState, props) => {
            return {
                count: prevState.count + 1
            }
        })
        this.setState((prevState, props) => {
            return {
                count: prevState.count + 1
            }
        })
    }
    // bodyClickHandler = () => {
    //     this.setState({
    //         count: this.state.count + 1
    //     })
    //     console.log('count in body event', this.state.count)
    // }
    componentDidMount() {
        // 自己定义的 DOM 事件，setState 是同步的
        document.body.addEventListener('click', this.bodyClickHandler)
    }
    componentWillUnmount() {
        // 及时销毁自定义 DOM 事件  // 自定义事件手动销毁 内存泄漏
        document.body.removeEventListener('click', this.bodyClickHandler)
        // clearTimeout
    }
}

export default StateDemo

// -------------------------- 我是分割线 -----------------------------

// // 不可变值（函数式编程，纯函数） - 数组
// const list5Copy = [....this.state.list5]
// list5Copy.splice(2, 0, 'a') // 中间插入/删除
// this.setState({
//     list1: this.state.list1.concat(100), // 追加
//     list2: [...this.state.list2, 100], // 追加
//     list3: this.state.list3.slice(0, 3), // 截取
//     list4: this.state.list4.filter(item => item > 100), // 筛选
//     list5: list5Copy ,// 其他操作
	
// })

// //  注意不能直接对 this.state.list 进行 push pop splice 等，这样违反不可变值

// // // 不可变值 - 对象
// this.setState({
//     obj1: Object.assign({}, this.state.obj1, {a: 100}),
//     obj2: {...this.state.obj2, a: 100}
// })
// // 注意，不能直接对 this.state.obj 进行属性设置，这样违反不可变值
