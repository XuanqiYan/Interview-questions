import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
    }
    render() {
        return <div>
            <input value={this.state.title} onChange={this.onTitleChange}/>
            <button onClick={this.onSubmit}>提交</button>
        </div>
    }
    onTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    onSubmit = () => {
        const { submitTitle } = this.props
        submitTitle(this.state.title)

        this.setState({
            title: ''
        })
    }
}
// props 类型检查
Input.propTypes = {
    submitTitle: PropTypes.func.isRequired
}

class List extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { list } = this.props

        return <ul>{list.map((item, index) => {
            return <li key={item.id}>
                <span>{item.title}</span>
            </li>
        })}</ul>
    }
	componentDidUpdate() {
	    console.log(' did update')
	}
    // 注意： shouldComponentUpdate 一定要配合数据的不可变原则
    shouldComponentUpdate(nextProps, nextState) {
        // _.isEqual（不仅比较指针而且对内部的数据逐层比较） 做对象或者数组的深度比较（一次性递归到底，性能比较低）
        //if (nextProps.list===this.props.list) { //  比较指针
		if(_.isEqual(nextProps.list,this.props.list)){
            // 相等，则不重复渲染
            return false
        }
        return true // 不相等，则渲染
    }
}
// props 类型检查
List.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired
}

class TodoListDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
    }
    render() {
        return <div>
            <Input submitTitle={this.onSubmitTitle}/>
            <List list={this.state.list}/>
        </div>
    }
    onSubmitTitle = (title) => {
        // 正确的用法 符合不可变原则
        // this.setState({
        //     list: this.state.list.concat({
        //         id: `id-${Date.now()}`,
        //         title
        //     })
        // })

        // 为了演示 SCU ，故意写的错误用法   不符合不可变原则
        this.state.list.push({
            id: `id-${Date.now()}`,
            title
        })
        this.setState({
            list: this.state.list
        })
    }
}

export default TodoListDemo

/*
	scu优化
		1.react 其实并没有做scu 数据没改变也要重新渲染
		2.我们需要做scu优化 ，判断条件看state和props有没有改变 ，
			改变了return true 重新渲染
			没改变retuturn false 不需要重新渲染
		3.在判断比较的时候可以考虑对属性
			做深比较（_.isEqual）（需要第一次递归，性能不是太好）
			做浅比较 (React.PureComponent) 推荐(满足大部分业务)
		4. 一旦做了scu优化，那必须准守 属性的不可变值原则	
			immutable.js 插件帮你实现使用不可变原则设置数据
		
*/
