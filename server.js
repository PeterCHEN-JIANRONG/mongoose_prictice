const http = require('http');
const mongoose = require('mongoose');

// 連線資料庫
mongoose.connect('mongodb://localhost:27017/hotel').then(()=>{
  console.log('連線成功'); // 連線成功
}).catch((err)=>{
  console.log(err.reason); // 連線失敗
})

// Schema 定義
const roomSchema = new mongoose.Schema(
  {
    name: String,
    price: {
      type: Number,
      required: [true, "價格必填"]
    },
    rating: Number
  },
  {
    versionKey: false  // 移除 versionKey、__v欄位
  }
)

const Room = mongoose.model('Room', roomSchema);
// mongoose 會自動修正 collection 的名稱
// 開頭小寫、自動加 s
// Room > rooms
// 若不要這樣，可以透過 Schema 修改規則

// 實例、實體 instance
const testRoom = new Room({
  name:'簡約單人房4',
  price: 1600,
  rating: 4.5
})

testRoom.save()
  .then(()=>{
    console.log('新增資料成功');
  }).catch(err=>{
    console.log(err.errors);
  })

const requestListener = (req, res) => {
  console.log(req.url);
  res.end();
}

// server 監聽
const server = http.createServer(requestListener);
server.listen(3005);