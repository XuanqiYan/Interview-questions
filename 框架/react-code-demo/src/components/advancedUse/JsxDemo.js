import React ,{Component} from 'react'

	
class JsxDemo extends Component{
	constructor(props) {
	    super(props)
		this.state = {
			message:'nice'
		}
	}
	render(){
		return 	React.createElement('div',null,
			[
				React.createElement('i',null,this.state.message),
				React.createElement('i',null,this.state.message),
				React.createElement('p',null,this.state.message),
			]
		)
		// return (
		// 	<div>
		// 		<p>{this.state.message}</p>
		// 		<i>{this.state.message}</i>
		// 	</div>
		// )
	}
}

export default JsxDemo