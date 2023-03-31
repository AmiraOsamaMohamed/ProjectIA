const { uuid } = require('uuidv4');
const admin=require("express").Router();
const conn=require("../db/connection");
/////////////create job///////////////
admin.post('/create-job',(req, res)=>{
    const data=req.body;
    conn.query("insert into job set ?", {position:data.position,description:data.description,max_candidate_number:data.max_candidate_number,qualification:data.qualification},(err,result,fields)=>{
        if(err){
            res.send({
                message:"there is error in post values in db"
            })   
        }else{
            res.send({
                message:"job is created",
              });
        }
    })
  
   
    });
    //////////list job///////////////////
admin.get('/get-job',(req, res)=>{
    conn.query("select * from job",(err,result,fields)=>{
        if(err){
            res.send({
                message:"there is error in get values from db"
            })   
        }else{
            res.send(result);
        }
    })
   
  });
    //////////////////update in job////////////
admin.put('/update-job/:id',(req,res)=>{
      const { id }=req.params;
      const data=req.body;
     conn.query("update job set? where ?",[{position:data.position,description:data.description,max_candidate_number:data.max_candidate_number,qualification:data.qualification},{id:id}],(err,result)=>{
    if (err){
        res.statusCode=500;
        res.send({
            message:"there is error in update"
        });
    }else{
        res.send({
            message:"updated sucessfully"
           });
    }
     }) 
     });
     //////////////delete specific job
admin.delete('/delete-job/:id',(req,res)=>{
      const { id }=req.params;
      conn.query("delete from job where ?",{id:id},(err,result,fields)=>{
        if (err){
            res.statusCode=500;
            res.send({
                message:"there is error in delete"
            });
        } else{
       res.send({
        message:"deleted sucessfully"
       });
      }
     });
    });
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////////update data of user user////////////
admin.put('/update-user/:id',(req,res)=>{
    const { id }=req.params;
    const data=req.body;
   conn.query("update user set? where ?",[{email:data.email,password:data.password,phone:data.phone,status:data.status,type:data.type,skill:data.skill},{id:id}],(err,result)=>{
  if (err){
      res.statusCode=500;
      res.send({
          message:"there is error in update"
      });
  }else{
      res.send({
          message:"updated sucessfully"
         });
  }
   }) 
   });
   //////////////delete specific user
admin.delete('/delete-user/:id',(req,res)=>{
    const { id }=req.params;
    conn.query("delete from user where ?",{id:id},(err,result,fields)=>{
      if (err){
          res.statusCode=500;
          res.send({
              message:"there is error in delete"
          });
      } else{
     res.send({
      message:"deleted sucessfully"
     });
    }
   });
  });
  /////////////assignment user///////////////
admin.post('/assign-user',(req, res)=>{
    const data=req.body;
    conn.query("insert into user set ?", {email:data.email,password:data.password,phone:data.phone,status:data.status,type:data.type,skill:data.skill},(err,result,fields)=>{
        if(err){
            res.send({
                message:"there is error in post values in db"
            })   
        }else{
            res.send({
                message:"user is assigned",
              });
        }
    })
  
   
    });  
    //////////list user///////////////////
    admin.get('/get-user',(req, res)=>{
        conn.query("select * from user",(err,result,fields)=>{
            if(err){
                res.send({
                    message:"there is error in get values from db"
                })   
            }else{
                res.send(result);
            }
        })
       
      });




















module.exports=admin;