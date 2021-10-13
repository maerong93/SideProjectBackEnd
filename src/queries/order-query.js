


module.exports = {
    addOrder : `
                    INSERT INTO \`order\`
                       ( 
                            mb_id, mb_name, od_addr1, od_addr2,
                            od_tel, od_hp, od_email, od_datetime, 
                            od_price, in_datetime
                        )
                    VALUES
                        (
                            ?, ?, ?, ?,
                            ?, ?, ?, ?,
                            ?, ?
                        )
                `,
}