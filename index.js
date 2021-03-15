//import User from './';

const express = require('express')
const app = express()
const port = 3000

const {User}=require("./models/User");//User.js모델을 가져온다.

const bodyParser = require('body-parser');

//url형식파싱 옵션
app.use(bodyParser.urlencoded({extended:true}));

//json형식 파싱옵션
app.use(bodyParser.json());

//key.js에서 가져온다.
const config = require('./config/key');



const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected..!@#.'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! !!현뎡이짱')
})


//라우터의 엔드포인트가 register이고 req,res는 콜백 함수
app.post('/register',(req,res) => {

  const user = new User(req.body)

  user.save((err,userInfo)=>{
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  })
})
//회원 가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


