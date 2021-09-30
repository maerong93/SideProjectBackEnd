

module.exports = {
    getItemList : " SELECT id, it_name, it_cnt, it_price, it_use, it_main_img, it_hit FROM item ",
    getItem : " SELECT id, it_name, it_cnt, it_price, it_use, it_main_img, it_hit FROM item WHERE id = ? ",
    addItem :    ` INSERT INTO item 
                    ( it_name , it_cnt, it_info , it_price ,
                      it_use  , it_main_img     , mb_id    , mb_name,
                      in_datetime
                    )
                    VALUES
                    ( 
                        ?, ?, ?, ?,
                        ?, ?, ?, ?,
                        ?
                    )
                  `,
    updateItem :    ` UPDATE item 
                         SET it_name = ? , it_cnt = ? , it_info = ? , it_price = ?
                           , it_use = ? , it_main_img = ? , mb_id = ? , mb_name = ? 
                           , up_datetime = ?
                        WHERE id = ? 
                  `,                  
    deleteItem : " DELETE item FROM item WHERE id = ?  ",
}