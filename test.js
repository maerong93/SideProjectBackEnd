const mysql = require('mysql2');
const bluebird = require('bluebird');
require('dotenv').config();
const date = require('date-and-time');
const { getMember } = require('./lib/common.lib');
const poolConnection = require('./lib/mysql2Pool');
const itemService = require('./src/service/item-service');
const url = require('url');

// ( async function()  {
//     let result = await itemService.addItem('2', '2','1', '1',
//                               '1', '1','1', '1',
//                               '0000-00-00 00:00:00'
//                               );
//   console.log('insert result : ', result);
//   /**
//    *  ResultSetHeader {
//       fieldCount: 0,
//       affectedRows: 1,
//       insertId: 7,
//       info: '',
//       serverStatus: 2,
//       warningStatus: 0
//     }
//    * 
//    */
// })();

// ( async function()  {
//   let result = await itemService.updateItem('2', '2','1', '1',
//                             '1', '1','1', '1',
//                             '0000-00-00 10:00:00', '1'
//                             );
// console.log('update result : ', result);
// /**
//  * update result :  ResultSetHeader {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 0,
//   info: '(Rows matched: 1  Changed: 1  Warnings: 0',
//   serverStatus: 2,
//   warningStatus: 0,
//   changedRows: 1
// }
//  * 
//  * 
//  */
// })();

( async function()  {
  let result = await itemService.deleteItem('1');
console.log('delete result : ', result);
/*
delete result :  ResultSetHeader {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}
*/
})();


console.log(url.host);

// const url = window.location.origin;
// console.log(url);
//console.log(req.url)

// (async function (){

// let rows = getMember('jack').then((item) => {
//     console.log(item[0].id);
// });

//console.log(getMember('jack'));
//console.log(process.env);
// console.log(date.format(new Date(), 'YYYY-MM-DD hh:mm:ss'));


// const mysqltest = async () => {
    

//     const concection = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'autoset', database: 'sideshop', Promise: bluebird });
//     let test = await concection.execute(" INSERT INTO test(name) VALUES('hello') ");
//     console.log(test);
// }

// // 트랜젝션 연습 해보장~~~

// mysqltest();


let sql = `
        INSERT INTO item
        ( it_name , it_cnt, it_info , it_price ,
          it_use  , it_main_img     , mb_id    , mb_name
        )
        VALUES
        ( ?, ?,
          ?, ?,
          ?, ?,
          ?, ?)
        `;

// let values = [
//     req.body.it_name, req.body.it_cnt,
//     req.body.it_info, req.body.it_price,
//     req.body.it_use, 'hello',
//     req.body.mb_id, req.body.mb_name,
//     nowDateTime
// ];

// let values = [
//     '1', '1',
//     '1', '1',
//     '1', '1',
//     '1', '1'
    
// ];
// let ttt = async function() {
//     await poolConnection.query(sql, values);
//     console.log('success!');
// }

// ttt();











