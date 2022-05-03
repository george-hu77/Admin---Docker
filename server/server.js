/*
应用的启动模块
1. 通过express启动服务器
2. 通过mongoose连接数据库
  说明: 只有当连接上数据库后才去启动服务器
3. 使用中间件
 */
const mongoose = require('mongoose')
const express = require('express')
const app = express() // 产生应用对象

// 声明使用静态中间件
app.use(express.static('public'))
// 声明使用解析post请求的中间件
app.use(express.urlencoded({extended: true})) // 请求体参数是: name=tom&pwd=123
app.use(express.json()) // 请求体参数是json结构: {name: tom, pwd: 123}
// 声明使用解析cookie数据的中间件
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// 声明使用路由器中间件
const indexRouter = require('./routers')
app.use('/api', indexRouter)  //

const { 
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  //REDIS_IP,
  //REDIS_PORT,
  SESSION_SECRET
} = require('./config/config')


const fs = require('fs')

// 必须在路由器中间之后声明使用
/*app.use((req, res) => {
  fs.readFile(__dirname + '../client/index.html', (err, data)=>{
    if(err){
      console.log(err)
      res.send('后台错误')
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      });
      res.end(data)
    }
  })
})
*/
// 通过mongoose连接数据库
//mongoose
let mongoUrl
if(process.env.MONGO_IP) {
  mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/react-app?authSource=admin`
} else {
  mongoUrl = 'mongodb://localhost:27017/react-app'
}

const connectWithRetry = () => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB is connected!')
  })
  .catch(error => {
    console.error(`Failed to connect mongoDB at ${mongoUrl}!`, error)
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry()
