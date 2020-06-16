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
	12.js的压缩 webpack4.0 内置了 
			mode:development /none 不会自动压缩的
			mode:production  会自动压缩
		问题：如果在 	development 模式下手动开启压缩方式？
			//1.导入webpack内置的插件	
			const uglifyjs = require('uglifyjs-webpack-plugin');
			
			//2.使用
			plugins: [
				....
				new uglifyjs()
			]
			
	13. 抽离公共代码（build-splitChunks）
		场景1:
			如果	SPA应用，在index.js打包入口会引入大量第三方插件，每次更改业务代码，
			这些第三方插件随着重新打包 ，往往插件体积较大，重复打包的效率不是很高，造成打包速度的性能浪费
		场景2:
			对于MPA应用，每个都引入的三方插件 ，每次在构建的时候第三方包会被构建多次，性能浪费
		场景3:
			如果工具类函数库，被多个业务模块所引用，那么这个公共的函数库要单独打包,
			而且只打包一次，浏览器能命中缓存
				
		合理的做法：
			把第三方或者是公共的代码快包抽离出去，单独打包，第三方包只会被构建一次
			optimization:{
				splitChunks: {
					chunks: 'all',
					/**
					 *  initial 入口 chunk，对于异步导入的文件不处理
						async 异步 chunk，只对异步导入的文件处理
						all 不管同步还是异步导入的模块都会被集成进来 （一般情况下）
					 */
					// 缓存分组
					cacheGroups: {
						// 第三方模块
						vendor: {
							name: 'vendor', // chunk 名称
							priority: 1, //权重，如果一个第三方模块被引用多次，那么这个第三方模块到底是集成到哪个chunk,由于权重1>0,第三方模块被集成到vendor这个chunk中
							test: /node_modules/,//一般第三方模块都放到node_modules，如果第三方模块不是处于node_modules文件夹，就不会被集成进来
							minSize: 0,  //包的体积大小，3-5kb,超过了标准会被集成进来，如果chunk进来放问层次复杂，反而不利于代码优化
							minChunks: 1 //包被引用的次数，第三方只要被引用一次就会被chunk进来，对于公共模块使用2次以上才被chunk进来
						},
						// 公共的模块
						common: {
							name: 'common', // chunk 名称
							priority: 0, // 优先级
							minSize: 0,  // 公共模块的大小限制
							minChunks: 2  // 公共模块最少复用过几次
						}
						....
					}
				}	
			}	
	14. 懒加载
		setTimeout(()=>{
			//异步执行
			import('./test.js').then((res)=>{
				console.log(res.default.message)
			})
		},3000) 
			
	15. 优化babel-loader
		{
		    test: /\.js$/,
		    loader: ['babel-loader?cacheDirectory'],// 开启缓存，只要ES6的内容没有改变，就不会重新转译会使用缓存
		    include: srcPath,
		    exclude: /node_modules/ //明确范围
		}
				
	16. IgnorePlugin（忽略插件）
		案例：moment.js 日期处理类库的使用
			
		方式：不忽略插件
			index.js 中
					import moment from 'moment' //加载所有语言包 
					moment.locale('zh-cn');
					console.log(moment(1316116057189).fromNow()); 
					
			npm run build  --> index 280kb 体积较大
			
		方式：忽略插件中的文件

			index.js中手动引用语言包
				//动态语言包加载
					import 'moment/locale/zh-cn';
					import 'moment/locale/en';
					moment.locale('zh-cn');	//这是语言包
					
			prod.js中
				// 忽略 moment 下的 /locale 目录
				
				new webpack.IgnorePlugin(/\.\/locale/, /moment/), // moment 插件不会自动引入所有的语言包
			
			npm run build --> 60kb
			
	17.多进程打包	（进程/线程）	
		程序（任务/软件）--》进程
			创建：计算机分配内存和cpu来运行程序
			运行：利用cup 和内存 计算
				开启多个线程（子进程） 线程之间是可以共享数据的		
			回收：进程结束和回收cup 和内存
			
		特点：由于进程数据不共享，如果开启多进程导打包，
			优点：
				对于大的项目来说（100M）开启10个进程打包理论上来说会提升10倍的打包速率。
				但是实际上，多进程打包会有其他消耗，如下：
			缺点：
				1.会有进程间通信消耗打包速率
				2.进程创建和销毁也都会消耗打包速率
				3.如果同时创建的进程越多，以上两点的消耗越大
				
			总结：
				项目体积较大，建议开启多进程打包。
				项目体积较小，不建议，因为多进程打包的缺点要比优点影响大	
			
		webpack 多进程打包配置
			1.下载并引入happypack
				const HappyPack = require('happypack')
			2.处理 js loader
			{
			    test: /\.js$/,
			    // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
				use: ['happypack/loader?id=babel'],
			    include: srcPath, 
			},
			
			3.配置plugin
				// happyPack 开启多进程打包
				new HappyPack({
				    // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
				    id: 'babel',
				     // 如何处理 .js 文件，用法和 Loader 配置中一样
				   
					loaders: ['babel-loader?cacheDirectory']
				})
			
			4.针对多进程打包js压缩
				a.下载引入 webpack-parallel-uglify-plugin
					const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
					
				b.设置线上模式 
					mode:production
					
				c.配置.babelrc	
					在根目录下新建.babelrc文件（babel的配置文件 ）
							{
							    "presets": ["@babel/preset-env"],
							    "plugins": []
							}
				d.配置
					new ParallelUglifyPlugin({
					    // 传递给 UglifyJS 的参数
					    // 还是使用 UglifyJS （webpack内置）压缩，只不过帮助开启了多进程）
					    uglifyJS: {
					        output: {
					            beautify: false, // 最紧凑的输出
					            comments: false, // 删除所有的注释
					        },
					        compress: {
					            // 删除所有的 `console` 语句，可以兼容ie浏览器
					            drop_console: true,
					            // 内嵌定义了但是只用到一次的变量
					            collapse_vars: true,
					            // 提取出出现多次但是没有定义成变量去引用的静态值
					            reduce_vars: true,
					        }
					    }
					})
					
			测试：
				npm  run build
				/*
					
					console.log('this is a test')  

					let str = 'zhangsan'
					document.write(`my name is ${str}`)


					import math from './math.js'

					document.write('age:'+ math.age)
					document.write('age1:'+ math.age)
					document.write('age2:'+ math.age)

					/*
						document.write("my name is ".concat("zhangsan")),
						document.write("age:21"),
						document.write("age1:21"),
						document.write("age2:21")
					*/


				*/	
			   
	18 热刷新 VS 热更新
		热刷新
			特点：
				只要代码改变，整个网页会重新刷新,带来好多负作用
				加载dom,渲染页面,网页内部的请求重新发起
				变量和定义的状态值丢失(input输入的值),路由信息全部丢失
		热更新
			特点：改变代码，布局刷新而不是整个页面刷新，状态不丢失，
				 但是热跟新是需要成本的,手动监听js的跟新模块
				
				
			配置：
				1.下载并倒入
					const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
				2.修改打包的入口文件
					index: [
					    'webpack-dev-server/client?http://localhost:8080/',
					    'webpack/hot/dev-server',
					    path.join(srcPath, 'index.js')
					]
				3.使用plugin
					 new HotModuleReplacementPlugin()	
				4.devServer 开启 hot:true	 
				
				
	
面试题：
	1.前端项目为何进行打包和构建
	2.对于webpack而言 module chunk bundle 有何区别 ？
	
		module：在webpack 中任何文件皆为模块，
			比如：导入的css 图片，字体文件 ，自定义的模块，第三方插件，自定义组件 都是模块
			
		chunk: 根据模块的依赖，按照一定的逻辑，将依赖的每个模块组织起来的产物 就是chunk,
			一般而言chunk 都在内存中（缓存）
			chunk产生的方式：
				1. entry
				2. import() //异步加载的模块也会生成chunk
				3. splitChunk	//按照人为的方式把多个模块按照一定的规则抽离的出来的
				
		dundle : 把内存中的chunk 以文件的方式输出，这个文件就是bundle 
			（内存-》形成文件写入磁盘）		
			
	3.loader 和 pulgin 有和区别？
	4.webpack 怎么实现懒加载？
	5.webpck 如何优化打包效率，如何优化项目运行效率？
	6.babel-polyfill 和 babel-runtime 模式有何区别？
	

	
	
	
	