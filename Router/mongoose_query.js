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
});

router.get('/books/list',(req,res)=>{
    const data = BookModel.find();
    Promise.all([data]).then((data)=>{
        console.log(data);
        res.json(data);
    })

})