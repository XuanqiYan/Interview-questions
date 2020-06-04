webpack 基础 （webpack-demo）
	1.webpack核心概念：
		打包入口 项目入口文件 （src/index.js）
		打包出口 打包以后的产出文件(main.js/ node 环境的缓存中)
		loader ： 
			webpack只能对js进行打包 ，loader能将css图片等其他静态资源转化成js模块，
			在利用webpack对js的打包能力进行打包
		puligin：
			webpack 扩展打包能力，需要安装一些插件 
			html-webpack-plugin插件：能指定webpack的静态html文件 
			
	2.实际webpack构建项目时候需要分环境
		开发环境 （development）
		线上环境	 (production)
			
	3. 如何设置webpack配置文件 来满足开发和线上的配置
		配置文件拆分
			webpack.common.js 公共配置 （不管是开发还是线上都要使用的）
			webpack.dev.js    开发环境配置	
			webpack.prod.js   线上环境配置	
		
		整合	webpack.dev.js 整合 公共配置
			// 1.导入公共配置
			const webpackCommonConf = require('./webpack.common.js')
			// 2.导入整合配置的函数 
			const { smart } = require('webpack-merge')
			/*
				webpack-merge 需要单独安装，这个插件中的smart 函数就能整合webpack配置
				在整个的时候 后者会覆盖前面的配置
			*/
			module.exports  = smart(webpackCommonConf,{
				
			})
	4.	package.json 文件
			"scripts": { //定义一些命令
			  "dev": "webpack-dev-server --config build-base-conf/webpack.dev.js",
			  "build": "webpack --config build-base-conf/webpack.prod.js"
			},
			
		执行 :
			npm run dev 或 yarn dev，
			//实际在执行 时候
			webpack-dev-server --config build-base-conf/webpack.dev.js
			/*
				--config 写配置
				build-base-conf/webpack.dev.js 指的是打包webpack 需要使用那个配置文件 
			*/	
		
	5. babel 转移es6 --> es5 	
		{
		    test: /\.js$/,  //处理js
		    loader: ['babel-loader'], //单独下载
		    include: srcPath,// 这个路径下的所有js文件都需要转译
		    exclude: /node_modules/ //除了那些文件
		},	
		
		
		

面试题：
	1.前端项目为何进行打包和构建
	2.对于webpack而言 module chunk bundle 有何区别 ？
	3.loader 和 pulgin 有和区别？
	4.webpack 怎么实现懒加载？
	5.webpck 如何优化打包效率，如何优化项目运行效率？
	6.babel-polyfill 和 babel-runtime 模式有何区别？
	
	
	
	
	