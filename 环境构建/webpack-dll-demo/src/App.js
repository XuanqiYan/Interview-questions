import React from 'react'
import _ from 'lodash'
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
		let arr =[1,2,3,4]
		let newarr = _.drop(arr,2)
		console.log(newarr)
			
        return (
			<div>	
				<p>This is App Component.</p>
				<ul>	
					{
						newarr.map((item,index) => {
							return <li key={index}> {item}</li> 
						})	
					}
				</ul>
			</div>	
		)
    }
}

export default App
