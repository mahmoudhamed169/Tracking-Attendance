const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    
    user :{type :mongoose.Schema.Types.ObjectID , ref : "users"}  ,
    attendance:[{

        date:{
             type:Date,             
         },
         entry:{type:Date},
         exit:{
             time:{
                 type:Date
             },
             // 1 - General
             // 2 - Vacation
             // 3 - Doctor
             reason:Number
         }
        
 
    }]
 }, {
   usePushEach: true
})



module.exports = attendanceSchema ; 