import React,{Component} from 'react'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'xuanqiyan',
            flag: true,
        }
        this.nameInputRef = React.createRef() // 创建 ref
        this.fileInputRef = React.createRef()
    }
    render() {
        //非受控组件 input 和 name属性 没有关系
   //      return <div>
   //          {/* 使用 defaultValue 而不是 value ，使用 ref */}
   //          <input defaultValue={this.state.name} ref={this.nameInputRef}/>
   //          {/* state 并不会随着改变 */}
   //          <span>state.name: {this.state.name}</span>
   //          <br/>
			// <div ref={(tag)=>{ this.refTag = tag }}></div>
   //          <button onClick={this.alertName}>alert name</button>
   //      </div>

        // checkbox defaultChecked
        // return <div>
        //     <input
        //         type="checkbox"
        //         defaultChecked={this.state.flag}
        //     />
        // </div>

        // file
        return <div>
            <input type="file" ref={this.fileInputRef}/>
            <button onClick={this.alertFile}>alert file</button>
        </div>

    }
    alertName = () => {
        //const elem = this.nameInputRef // 通过 ref 获取 DOM 节点
        //alert(elem.value) // 不是 this.state.name
		//console.log(this.refTag)
		//console.log(this.nameInputRef.current.value)
		this.setState({
			name:'lisi'
		})		
			
    }
    alertFile = () => {
        const elem = this.fileInputRef.current // 通过 ref 获取 DOM 节点
        alert(elem.files[0].name)
    }
	/*
		非受控组件： 在react中 需要获取dom元素，就在dom元素上起引用，通过引用获取dom元素 结合原生js来操作dom ，dom元素就是一个非受控组件 
		场景：手动操作dom节点 / 文件上传等  / 富文本编辑器等
	*/
}

export default App
