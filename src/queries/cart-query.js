

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
}