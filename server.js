const http = require('http');
const mongoose = require('mongoose');

// 連線資料庫
mongoose.connect('mongodb://localhost:27017/hotel').then(()=>{
  console.log('連線成功'); // 連線成功
}).catch((err)=>{
  console.log(err.reason); // 連線失敗
})

const roomSchema = {
  name: String,
  price: {
    type: Number,
    required: [true, "價格必填"]
  },
  rating: Number
}

const Room = mongoose.model('Room', roomSchema);
// mongoose 會自動修正 collection 的名稱
// 開頭小寫、自動加 s
// Room > rooms
// 若不要這樣，可以透過 Schema 修改規則

const requestListener = (req, res) => {
  console.log(req.url);
  res.end();
}

// server 監聽
const server = http.createServer(requestListener);
server.listen(3005);