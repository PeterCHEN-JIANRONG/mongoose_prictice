const http = require('http');
const mongoose = require('mongoose');
const Room = require('./models/room');

// 連線資料庫
mongoose.connect('mongodb://localhost:27017/hotel').then(()=>{
  console.log('連線成功'); // 連線成功
}).catch((err)=>{
  console.log(err.reason); // 連線失敗
})

// 新增方法二： create
Room.create({
  name:'簡約單人房7',
  price: 1600,
  rating: 4.5
}).then(()=>{
  console.log('新增成功');
}).catch((err)=>{
  console.log(err.errors);
})


// 新增方法一： 實例、實體 instance
// const testRoom = new Room({
//   name:'簡約單人房5',
//   price: 1600,
//   rating: 4.5
// })

// testRoom.save()
//   .then(()=>{
//     console.log('新增資料成功');
//   }).catch(err=>{
//     console.log(err.errors);
//   })

const requestListener = (req, res) => {
  console.log(req.url);
  res.end();
}

// server 監聽
const server = http.createServer(requestListener);
server.listen(3005);