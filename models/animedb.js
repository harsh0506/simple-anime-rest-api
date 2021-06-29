const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb',{
     useNewUrlParser: true ,
     useUnifiedTopology: true ,
     useFindAndModify:false
})

const users = new mongoose.Schema(
    {
        Animename:String,
        Aninerating:Number,
        Maincharater:String
    }
);
const UserSchema = new mongoose.model('Animedb',users)
module.exports=UserSchema;