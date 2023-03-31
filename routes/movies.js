const { uuid } = require('uuidv4');
const router=require("express").Router();
const auth=require("../authontication/author");
const conn=require("../db/connection");
/////////////post request
router.post('/create-movies',(req, res)=>{
    const data=req.body;
    conn.query("insert into movies set ?", {name:data.name,faculty:data.faculty},(err,result,fields)=>{
        if(err){
            res.send({
                message:"there is error in post values in db"
            })   
        }else{
            res.send({
                message:"movie is created",
              });
        }
    })
  
   
    });
    //////////get request
router.get('/movies',(req, res)=>{
    conn.query("select * from movies",(err,result,fields)=>{
        if(err){
            res.send({
                message:"there is error in get values from db"
            })   
        }else{
            res.send(result);
        }
    })
   
  });
    ///////////////////get movie
router.get('/get-movie/:id',(req,res)=>{
     const { id }=req.params;
     conn.query("select * from movies where ?",{id:id},(err,result,fields)=>{
        if (err){
            res.statusCode=404;
            res.send({
                message:"there is error in get"
            });
        }else{
            res.send(result);
        }
     })
        });
    //////////////////put request////////////
router.put('/update-movie/:id',auth,(req,res)=>{
      const { id }=req.params;
      const data=req.body;
     conn.query("update movies set? where ?",[{name:data.name,faculty:data.faculty},{id:id}],(err,result)=>{
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
     //////////////delete specific movie
router.delete('/delete-movie/:id',auth,(req,res)=>{
      const { id }=req.params;
      conn.query("delete from movies where ?",{id:id},(err,result,fields)=>{
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
module.exports=router;