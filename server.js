const http = require('http');
const mongoose = require('mongoose');

// 連線資料庫
mongoose.connect('mongodb://localhost:27017/hotel').then(()=>{
  console.log('連線成功'); // 連線成功
}).catch((err)=>{
  console.log(err.reason); // 連線失敗
})

const requestListener = (req, res) => {
  console.log(req.url);
  res.end();
}

// server 監聽
const server = http.createServer(requestListener);
server.listen(3005);