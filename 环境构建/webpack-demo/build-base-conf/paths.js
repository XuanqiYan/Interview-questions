//node js提供的一个模块 ，读取本地文件路径资源
const path = require('path')

const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
//  /Users/xuanqiyan/Desktop/面试阶段/面试题/环境构建/webpack-demo/src
console.log('######',srcPath)
module.exports = {
    srcPath,
    distPath
}
