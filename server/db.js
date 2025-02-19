const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://asad9284:Asad9284@cluster0.yepgfhq.mongodb.net/resumebuilder");

mongoose.connection.on("connected",()=>{
    console.log("mongodb connected Successfully")
})

mongoose.connection.on("error",(err)=>{
    console.log(`mongodb connection error,${err}`)
});

module.exports=mongoose