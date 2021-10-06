

module.exports = {
    getCartList : `
                    SELECT T1.id
                        , T1.it_id
                        , T1.it_price
                        , T1.ct_cnt
                        , T1.ct_datetime
                        , T2.it_main_img
                      FROM cart AS T1
                      LEFT
                      JOIN item AS T2
                        ON T1.it_id = T2.id
                    WHERE T1.mb_id = ?       
                      AND T1.od_id = 0
                  `,
    addCart : `
                INSERT cart
                   (
                        it_id, it_name, it_price, ct_cnt, 
                        mb_id, mb_name, ct_datetime, in_datetime
                   )
                    VALUES
                    (
                        ? , ?, ?, ?,
                        ? , ?, ?, ?
                    )
              `,
    updateCart : `
                    UPDATE cart
                       SET ct_cnt = ? 
                         , up_datetime = ?
                     WHERE id = ? 
                       AND it_id = ? 
                `
}