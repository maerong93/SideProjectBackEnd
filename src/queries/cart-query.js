

module.exports = {
    getCartList : `
                    SELECT T1.id
                        , T1.it_id
                        , T2.it_name
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
    getCartList2 : `
                      SELECT id
                           , od_id
                           , it_id
                           , it_name
                           , it_price
                           , ct_cnt
                           , mb_id 
                        FROM cart 
                       WHERE id IN ( ? )
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
                         , up_datetime = now()
                     WHERE id = ? 
                       AND it_id = ? 
                `,
    delCart : ` 
                DELETE FROM cart WHERE id = ?
              `,
    updateCartOder : ` 
                        UPDATE cart
                           SET od_id = ?
                         WHERE od_id = 0
                           AND id IN ( ? )
                     `,
    getCartSum : ` 
                    SELECT SUM(it_price) AS sum
                      FROM cart
                     WHERE od_id = 0
                       AND id IN ( ? )
                 `
}