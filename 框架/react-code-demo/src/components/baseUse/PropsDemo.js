import React from 'react'
import PropTypes from 'prop-types'

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'xxxxxxxxxx'
        }
    }
    render() {
		// vue双向绑定 v-model react 双向绑定  (受控组件)
        return <div>
            <input value={this.state.title} onChange={this.onTitleChange.bind(this)}/>
            <button onClick={this.onSubmit.bind(this)}>提交</button>
        </div>
    }
    onTitleChange (e) {
        this.setState({
            title: e.target.value
        })
    }
    onSubmit() {
		//react 父子组件传值
        const { submitTitle } = this.props
        submitTitle(this.state.title) // 'abc'

        this.setState({
            title: ''//清空title
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
        return <ul>
			{
				
				list.map((item, index) => {
					return <li key={item.id}>
						<span>{item.title}</span>
					</li>
				})
			}	
		</ul>
    }
}
// props 类型检查
List.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object,PropTypes.array).isRequired
}

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <p>
            {this.props.text}
			
        </p>
    }
	//完成更新
    componentDidUpdate() {
        console.log('footer did update')
    }
	// 生命周期钩子 是否需要更新 false 不跟新 true（默认） 跟新 
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.text !== this.props.text
    //         || nextProps.length !== this.props.length) {
    //         return true // 可以渲染
    //     }
    //     return false // 不重复渲染
    // }

    // React 默认：父组件有更新，子组件则无条件更新！！！
    // 性能优化对于 React 更加重要！
    // SCU 一定要每次都用吗？—— 需要的时候才优化
}

class TodoListDemo extends React.Component {
    constructor(props) {
        super(props)
        // 状态（数据）提升
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
            ],
            footerInfo: '底部文字'
        }
    }
    render() {
        return <div>
            <Input  submitTitle={this.onSubmitTitle}/>
            <List list={this.state.list}/>
            <Footer text={this.state.footerInfo} />
        </div>
    }
    onSubmitTitle = (title) => {
        this.setState({
            list: this.state.list.concat({
                id: `id-${Date.now()}`,
                title
            })
        })
    }
}

export default TodoListDemo
