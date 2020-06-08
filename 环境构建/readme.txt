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
			/*
				webpack --config 手动指定打包运行的配置文件 
				如果没有有 config 选项 默认/webpack.config.js
			*/	
			
			
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
		
		
	6.	样式打包
		样式文件分类：
			css 
			预编译器 
				.less .sass .stylus，具备程序特性（变量 流程控制 函数调用），对不同内核浏览器对兼容性问题
		
		import './css/a.css' --> （css-loader）转化成webpack js有效模块  --> style-loader转化成dom元素前去嵌入到html文件中
		import './css/a.less' --> less-loader 转化成css --> （css-loader）转化成webpack js有效模块  --> style-loader转化成dom元素前去嵌入到html文件中

	7. 图片解析
		file-loader 解析图片资源
		
		开发阶段不需要将图片 做base64转化，只要使用http请求图片资源即可
		但是
		线上环境，对于较小的图片 做base64转化 ，不会发送http请求 
		
		rules: [
		    // 图片 - 考虑 base64 编码的情况
		    {
		        test: /\.(png|jpg|jpeg|gif)$/,
		        use: {
		            loader: 'url-loader',
		            options: {
		                // 小于 5kb 的图片用 base64 格式产出
		                // 否则，依然延用 file-loader 的形式，产出 url 格式
		                limit: 5 * 1024,
		                // 打包到 img 目录下
		                outputPath: '/img1/', 
		                // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
		                // publicPath: 'http://cdn.abc.com'
		            }
		        }
		    },
		]
		
	8. 多页面应用 （多入口多出口） vs 单页面应用 （单一入口 单一出口）
		区分页面应用和多页面应用
		/*
			单页面应用（SPA）
					通俗一点说就是指只有一个主页面的应用，浏览器一开始要加载所有必须的 html, js, css
					所有的页面内容都包含在这个所谓的主页面中。
					在交互的时候由路由程序动态载入，单页面的页面跳转，仅刷新局部资源
			
			多页面（MPA）
				就是指一个应用中有多个页面，页面跳转时是整页刷新
	
		*/	
		有两个入口js 
			/src/index.js  -->index.js
			/src/other.js  -->other.js
			
		1.配置多个入口
			entry: {
			    index: path.join(srcPath, 'index.js'),
			    other: path.join(srcPath, 'other.js')
			},
		2.配置多个出口	  设置针对每一个页面的plugin
		     // 多入口 - 生成 index.html
		     new HtmlWebpackPlugin({
		         template: path.join(srcPath, 'index.html'),
		         filename: 'index.html',
		         // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
		         chunks: ['index']  // 只引用 index.js 不写的话会把entry的两个入口都引入
		     }),
		     // 多入口 - 生成 other.html
		     new HtmlWebpackPlugin({
		         template: path.join(srcPath, 'other.html'),
		         filename: 'other.html',
		         chunks: ['other']  // 只引用 other.js
		     })
		3.	对于线上需要区分两个
			output: {
				//3.出口js文件名重写，两个出口文件不能重名 [name] 是依赖于entry 的 key生成 
			    filename: '[name].[contentHash:8].js',
			    path: distPath, 
			}
			
	9.如果在产出chunk文件名中 加hash，浏览器可能会命中缓存
	
	10.css的抽离和压缩
		为什么要css抽离？
			1.dev 不需要抽离，为了方便调试代码， prod 需要抽离
			2.不抽离在js中，js执行是有顺序的,只有在执行js的时候才会设置dom样式，可能造成抖屏等现象
		抽离：	
			1.下载mini-css-extract-plugin  并导入
				const MiniCssExtractPlugin = require('mini-css-extract-plugin')
			2.替换style-loader 为 MiniCssExtractPlugin.loader
				{
					test: /\.css$/,
					loader: [
						MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
						'css-loader',
						'postcss-loader'
					]
				}
			3.指定抽离的css位置和文件名
				
				new MiniCssExtractPlugin({
					filename: 'css/main.[contentHash:8].css' --》 /dist/css/mian.xxxxxxxx.css
				})
		压缩：
			1.下载插件并导入
				const TerserJSPlugin = require('terser-webpack-plugin')
				const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
			2.
				optimization: {
					// 压缩 css
					minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
				}
	11.html压缩
		minify: {
			removeComments: true,//清理html中的注释
			collapseWhitespace:true ,//清理html中的空格、换行符
			removeEmptyElements:true ,//清理内容为空的元素
			removeScriptTypeAttributes:true, // 去掉script标签的type属性
			removeAttributeQuotes:true ,//去除引号
		}
	12 js的压缩 webpack4.0 内置了 
			mode:development /none 不会自动压缩的
			mode:production  会自动压缩
		问题：如果在 	development /none 模式下手动开启压缩方式？
			
		 
				
			
面试题：
	1.前端项目为何进行打包和构建
	2.对于webpack而言 module chunk bundle 有何区别 ？
	3.loader 和 pulgin 有和区别？
	4.webpack 怎么实现懒加载？
	5.webpck 如何优化打包效率，如何优化项目运行效率？
	6.babel-polyfill 和 babel-runtime 模式有何区别？
	

	
	
	