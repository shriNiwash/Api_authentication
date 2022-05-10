const express = require('express');
const bodyparser = require('body-parser');
require('../model/db');
const {BookModel,userModel} = require('../model/schema');
const async = require('hbs/lib/async');
const { default: mongoose } = require('mongoose');
const swaggerUI  = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerjsDocs = YAML.load('./api.yaml');
const router = express.Router();


mongoose.Promise = global.Promise;

router.use(bodyparser.json());
router.use(express.urlencoded({extended:false}));

router.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerjsDocs));


//Creating the Post Request API(CREATE OPERATION)
router.post('/books',async(req,res)=>{
    const InsertData = new BookModel({
        id : req.body.id,
        name : req.body.name,
        sold : req.body.sold,
   });
   try{
      const data = await InsertData.save();
      res.json(data);
      console.log(data);
      res.status(200);

   }
   catch(err){
       res.json({message:"The field is existed"});
   }
});
router.post('/user',(req,res)=>{
    insertUser = new userModel({
        username:req.body.username,
        password:req.body.password
    });
    insertUser.save().then((data)=>{
        console.log(data);
        res.json(data);
    }).catch((err)=>console.log(err))
});

router.post("/books",(req,res)=>{
    const InsertData = new BookModel({
        id : req.body.id,
        name : req.body.name,
        sold : req.body.sold,
   });
   InsertData.save().then((data)=>{
       console.log(data);
       res.json(data);
   }).catch((err)=>{
       console.log(err);
       res.send('error occured');
   })


})
//Creating GET request API(READ OPERATION)
// router.get('/books/list',async(req,res)=>{
//     try{
//         const ListData = await BookModel.find();
//         res.json(ListData);
//     }
//     catch(err){
//         res.send('error', +err);
//     }

// });

//questions.
router.get('/books/list',(req,res)=>{
    const data = BookModel.find();
    Promise.all([data]).then((data)=>{
        console.log(data);
        res.json(data);
    })

})

//API Fetching By ID (READ OPERATION)
// router.get('/books/list/:id',async(req,res)=>{
//     try{
//         const Datas = await BookModel.findById(req.params.id);
//         res.json(Datas);
//         res.status(200);
//         console.log(Datas);
//     }
//     catch(err){
//         res.send(err);
//     }
// });
router.get('/books/list/:id',(req,res)=>{
    BookModel.findById(req.params.id).then((data)=>{
        console.log(data);
        res.json(data);
    }).catch((err)=>{
        console.log(err);
        res.send('error occured');
    })
})

// router.get('/books/total-sales',async(req,res)=>{

//     try{
//         const datas = await BookModel.find();
//         var sum=0;
//         for (let item of datas){
//              sum = sum + item.sold[0];
//         }

//         var karn = {
//             total : `${sum}`
//         }
//         console.log(karn);
//         res.json(karn);
//     }
//     catch(err){
//         res.send(err);
//     }

// });

router.get('/books/total-sales',(req,res)=>{
    // var pipeline = [{
    //     $group:{_id:$sold ,Total:{$sum:1}}
    // }]
    BookModel.aggregate([
        {$group:{_id:"",Total:{$sum:'$sold'}}},
        {$project:{_id:"",Total:1,_id:0}}
    ],(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.json(result);
        }
    })
    
})

//Update Opertaion
// router.patch('/books/list/:id',async(req,res)=>{
//     try{
//         const result = await BookModel.findByIdAndUpdate(req.params.id,req.body);
//         res.json(result);
//         console.log(result);
//     }
//     catch(err){
//         res.json({message:"The id may be incorrect or similar data intered"})
//     }
// });

router.patch('/books/list/:id',(req,res)=>{
    BookModel.findByIdAndUpdate(req.params.id,req.body).then((data)=>{
        console.log(data);
        res.json(data);
    }).catch((err)=>{
        console.log(err);
        res.send('error occured');
    })
})

//Delete Operation

// router.delete('/books/list/:id',async(req,res)=>{
//     try{
//         const deleted = await BookModel.findByIdAndDelete(req.params.id);
//         res.json(deleted);
//         console.log(deleted);
//     }
//     catch(err){
//         res.json({message:"Id is not correct"});
//     }
// });

router.delete('/books/list/:id',(req,res)=>{
    BookModel.findByIdAndDelete(req.params.id).then((data)=>{
        console.log('data deleted',data);
        res.json(data);
    }).catch((err)=>{
        console.log(err);
        res.send('error occured');
    })
});

router.get('/lookup',(req,res)=>{
    BookModel.aggregate([{
        $lookup:{
            from:"usermodels",
            localField:"name",
            foreignField:"username",
            as:"anything"
        }
    }],(err,result)=>{
        if(err){
            res.send('error occured');
        }
        else{
            res.json(result);
            console.log(result);
        }
    }
    )
})

module.exports = router;