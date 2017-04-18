var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://nasr:admin@ds155150.mlab.com:55150/mytasklist_nasr',['tasks']);

router.get('/tasks',function(req,res,next){
    db.tasks.find(function(err,data){
        if(err){
            res.send(err);
        }
        res.json(data);
    });
});

router.get('/tasks/:id',function(req,res,next){
    db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,data){
        if(err){
            res.send(err);
        }
        res.json(data);
    });
});

router.post('/tasks',function(req,res,next){
    var task = req.body;
    if(!task.title || !(task.isDone+'')){
        res.status(400);
        res.json({
            "error":"Bad data"
        });
    }else{
        db.tasks.save(task,function(err,data){
            if(err){
                res.send(err);
            }
            res.json(data);
        });
    }

});

router.delete('/tasks/:id',function(req,res,next){
    db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},function(err,data){
        if(err){
            res.send(err);
        }
        res.json(data);
    });
});

router.put('/tasks/:id',function(req,res,next){
    var task = req.body;
    var updTask = {};

    if(task.isDone){
        updTask.isDone = task.isDone;
    }

    if(task.title){
        updTask.title = task.title;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        })
    }else {
        db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updTask,{},function(err,data){
            if(err){
                res.send(err);
            }
            res.json(data);
        });
    }


});


module.exports = router;
