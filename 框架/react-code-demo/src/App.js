import React from 'react'
import BaseUse from './components/baseUse'
import AdvancedUse from './components/advancedUse'
// import ReduxUse from './components/reduxUse'
// import TodoList from './components/TodoLIst'
/*
	class组件
		有生命周期钩子 包含业务逻辑代码
		使用this指向组件实例化对象
		渲染一个class组件性能较低
	函数组件 
		没有生命周期钩子 只能返回一个模板
		this 指向于undefiuned
		渲染一个class组件性能较高
	选择：
		组件只是渲染一个模板 采用函数组件 ，如果组件包含业务逻辑代码 选用class组件 
*/
function App() {
  return (
    <div>
      {/*<BaseUse/> */}
      <AdvancedUse/>
      {/* <ReduxUse/> */}
      {/* <TodoList/> */}
    </div>
  );
}

export default App;
