const mongoose=require('mongoose');
mongoose.set("strictQuery", false);




//const connectDatabase=()=>{
    //mongoose.connect(process.env.DB_URI,{
      //useNewUrlpaser:true,
      //useUnifiedTopology:true,
      //useCreateIndex:true
   


const connectDatabase = () => {
  // function code goes here
  mongoose.connect('mongodb://localhost/GemixStore', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, err => {
  if(err) throw err;
  console.log('Connected to MongoDB!!!')
  }
)
}
module.exports=connectDatabase;


