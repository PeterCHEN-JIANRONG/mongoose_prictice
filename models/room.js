const mongoose = require('mongoose');

// Schema 定義
const roomSchema = new mongoose.Schema(
  {
    name: String,
    price: {
      type: Number,
      required: [true, "價格必填"]
    },
    rating: Number,
    createdAt: {
      type: Date,         // Date 型別
      default: Date.now,  // 現在時間
      select: false       // 預設前台不顯示
    }
  },
  {
    versionKey: false,  // 移除 versionKey、__v欄位
  }
)

const Room = mongoose.model('Room', roomSchema);
// 連接至 rooms collection
// mongoose 會自動修正 collection 的名稱
// 強制全小寫、最後自動加 s，ex: Room > collection 為 rooms
// 若不要這樣，可以透過 Schema 修改規則

module.exports = Room;