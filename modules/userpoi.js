var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var DButilsAzure = require('../DButils');
var Token = require('./Token');

router.post('/saveuserpoi',function(req, res){
    var token = Token.checkValidToken(req)
    .then(function(response){
        DButilsAzure.execQuery('insert into USERPOI (username,poid,timestamp,favorite) values(\''+req.body.username+'\',\'' + req.body.poid+'\',\'' + req.body.timestamp+'\',\'' + req.body.favorite+'\')') 
        .then(function(response){
                res.status(200).send("user poi has been save")   
        })
        .catch(function(error){
            console.log(error)
            res.status(500).send({ERROR: error})
        })
    })
    .catch(function(error){
        console.log(error)
        res.status(500).send("Token is invalid")
    })   
})

router.post('/delete',function(req, res){
    var token = Token.checkValidToken(req)
    .then(function(response){
        DButilsAzure.execQuery('delete from USERPOI where (username = \''+req.body.username+'\'and poid = \'' + req.body.poid+'\')' ) 
        .then(function(response){
                res.status(200).send("poid has been deleted")   
        })
        .catch(function(error){
            console.log(error)
            res.status(500).send({ERROR: error})
        })
    })
    .catch(function(error){
        console.log(error)
        res.status(500).send("Token is invalid")
    })  
})

router.get('/favorite',function(req, res){  
    var token = Token.checkValidToken(req)
    .then(function(response){
        DButilsAzure.execQuery('select poi.poid,description,city,country,category,picture from userpoi inner join poi on poi.poid = userpoi.poid where (FAVORITE = 1)') 
        .then(function(response){
            res.status(200).send(response)   
        })
        .catch(function(error){
            console.log(error)
            res.status(500).send({ERROR: error})
        })
    })
    .catch(function(error){
        console.log(error)
        res.status(500).send("Token is invalid")
    })    
})

/*
 * we return a two of favorite poi of user
 */
router.get('/save/:username',function(req, res){  
    DButilsAzure.execQuery('select top 2 poi.poid,description,city,country,category,picture from userpoi inner join poi on poi.poid = userpoi.poid where username = \'' + req.params.username + '\' order by NEWID()') 
    .then(function(response){
            res.status(200).send(response)   
    })
    .catch(function(error){
        console.log(error)
        res.status(500).send({ERROR: error})
    }) 
})

router.get('/recent/:username',function(req, res){  
    DButilsAzure.execQuery('select top 2 poi.poid,poi.name,description,city,country,category,picture from userpoi inner join poi on poi.poid = userpoi.poid where username = \'' + req.params.username + '\' order by timestamp DESC') 
    .then(function(response){
            res.status(200).send(response)   
    })
    .catch(function(error){
        console.log(error)
        res.status(500).send({ERROR: error})
    })
})

router.get('/popular/:username',function(req, res){ 
    DButilsAzure.execQuery('select poi.poid,poi.name,tableAvg.average,description,city,country,category,picture from poi inner join(select avg(rate) as average, poirate.poid from poirate group by poirate.poid) tableAvg on poi.poid=tableAvg.poid and category IN(select category from usercategory where username = \'' + req.params.username + '\') order by average DESC' ) 
    .then(function(response){
            res.status(200).send(response)   
    }) 
    .catch(function(error){
        console.log(error)
        res.status(500).send({ERROR: error})
    })
})

router.get('/all/:username',function(req, res){    
        DButilsAzure.execQuery('select poi.poid,poi.name,tableAvg.average,description,city,country,category,picture from poi inner join(select avg(rate) as average, poirate.poid from poirate group by poirate.poid) tableAvg on poi.poid=tableAvg.poid and poi.poid IN(select userpoi.poid from userpoi where username = \'' + req.params.username + '\') order by average DESC') 
        //DButilsAzure.execQuery('select poi.poid,poi.name,description,city,country,category,picture from userpoi inner join poi on poi.poid = userpoi.poid where username = \'' + req.params.username + '\'') 
        .then(function(response){
                res.status(200).send(response)   
        })
        .catch(function(error){
            console.log(error)
            res.status(500).send({ERROR: error})
        })
})

router.get('/:username',function(req, res){ 
    DButilsAzure.execQuery('select poid from USERPOI where username = \'' + req.params.username + '\'') 
        .then(function(response){
                res.status(200).send(response)   
        })
        .catch(function(error){
            console.log(error)
            res.status(500).send({ERROR: error})
        })
})


module.exports = router;