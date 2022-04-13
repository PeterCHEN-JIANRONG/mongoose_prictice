const http = require('http');
const { HEADERS, REQUEST_METHOD } = require('./methods/constant');
const { errorHandle, successHandle } = require('./methods/httpHandle');
const mongoose = require('mongoose');
const Room = require('./models/room');

// 連線資料庫
mongoose.connect('mongodb://localhost:27017/hotel').then(()=>{
  console.log('連線成功'); // 連線成功
}).catch((err)=>{
  console.log(err.reason); // 連線失敗
})

// 新增方法二： create
// Room.create({
//   name:'簡約單人房7',
//   price: 1600,
//   rating: 4.5
// }).then(()=>{
//   console.log('新增成功');
// }).catch((err)=>{
//   console.log(err.errors);
// })


const requestListener = async (req, res) => {
  
  let body = '';
  req.on('data', chunk => body+=chunk);
    
  if(req.url === '/rooms' && req.method === REQUEST_METHOD.GET){
    const rooms = await Room.find();
    successHandle(res, rooms);
  } else if ( req.url === '/rooms' && req.method === REQUEST_METHOD.POST){
    req.on('end', async () => {
      try{
        const data = JSON.parse(body);
        const room = await Room.create(data);
        successHandle(res, room);
      } catch(err) {
        errorHandle(res, err.errors)
      }
    })
  } else if ( req.url === '/rooms' && req.method === REQUEST_METHOD.POST){
    req.on('end', async () => {
      try{
        const data = JSON.parse(body);

        // 新增資料
        const room = await Room.create({
          name: data.name,
          price: data.price,
          rating: data.rating,
          paymeny: data.payment,
        });
        successHandle(res, room);
      } catch(err) {
        errorHandle(res, err.errors)
      }
    })
  }
}

// server 監聽
const server = http.createServer(requestListener);
server.listen(3005);