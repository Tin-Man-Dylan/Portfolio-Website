var express = require('express');
var router = express.Router();


/* GET users listing. */
router.post('/', function(req, res, next) {

          console.log(req.category);
          //res.send(200);
           switch(req.body.category){
           	case '1':
                    res.sendFile(__dirname+'/category1.json');
          		console.log("a");
           		break;
           	case '2':
                    res.sendFile(__dirname+'/category2.json');
           		console.log("b");
           		break;
           	case '3':
                    res.sendFile(__dirname+'/category3.json');
           		console.log("c");
           		break;
               case '4':
                    res.sendFile(__dirname+'/category4.json');
                    console.log("d");
                    break;
               case '5':
                    res.sendFile(__dirname+'/category5.json');
                    console.log("e");
                    break;
           	default:
           		console.log("This button has not yet been defined");
               }

});

module.exports = router;
