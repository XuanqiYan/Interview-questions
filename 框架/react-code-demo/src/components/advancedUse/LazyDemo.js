import React,{ lazy, Suspense } from 'react'

const ContextDemo = lazy(() => { 
	
	return import('./ContextDemo')
})
/*

lazy 接受一个函数作为参数，函数内部使用 import() 方法异步加载组件，加载的结果返回。
lazy 会返回一个新的 React 组件，我们可以直接在 Suspense 标签内使用，这样组件就会在匹配的时候才加载。
Suspense 组件的 fallback 属性是必填属性，它接受一个组件，在内部的异步组件还未加载完成时显示，
所以我们通常传递一个 Loading 组件给它，如果没有传递的话，就会报错
*/

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <p>引入一个动态组件</p>
            <hr />
            <Suspense fallback={<div>Loading...</div>}>
                <ContextDemo/>
            </Suspense>
        </div>

        // 1. 强制刷新，可看到 loading （看不到就限制一下 chrome 网速）
        // 2. 看 network 的 js 加载
    }
}

export default App
