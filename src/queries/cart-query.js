

module.exports = {
    addCart : `
                INSERT cart
                   (
                        it_id, it_name, it_price, ct_cnt, 
                        mb_id, mb_name, ca_datetime, in_datetime
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