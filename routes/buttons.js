var express = require('express');
var router = express.Router();

// const object = { interface: 'wlan0',
//   scan_results:
//    [ { cell_id: 1,
//        address: '24:A4:3C:C4:D0:A0',
//        encrypted: 'on',
//        ssid: 'Plasmatic' },
//      { cell_id: 2,
//        address: '54:B8:0A:09:D3:72',
//        encrypted: 'on',
//        ssid: 'Mavi-Wifi' },
//      { cell_id: 3,
//        address: '24:A4:3C:1A:15:80',
//        encrypted: 'on',
//        ssid: 'TechBA' },
//      { cell_id: 4,
//        address: '24:A4:3C:1A:15:81',
//        encrypted: 'on',
//        ssid: 'Akimbo' },
//      { cell_id: 5,
//        address: '00:19:A9:42:3E:A2',
//        encrypted: 'on',
//        ssid: 'QLTCORP' },
//      { cell_id: 6,
//        address: '24:A4:3C:1A:15:83',
//        encrypted: 'on',
//        ssid: 'Mavi' } ],
//   status: 'SUCCESS' }

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');
  // And insert something like this instead:
  console.log('before file')
  res.sendFile(__dirname+'/category1.json');
  // res.json([{
  // 	cell_id: 1,
  // 	ssid: "Wifi1 Hi2222"
  // }, {
  // 	cell_id: 2,
  // 	ssid: "Better Wifi"
  // }]);
});

module.exports = router;
