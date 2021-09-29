

module.exports = {
    getUser : ' SELECT * FROM member WHERE mb_id = ? AND mb_password = ? ',
    getUser2 : ' SELECT * FROM member WHERE mb_id = ? ',
    register : ` 
                INSERT INTO member 
                (
                  mb_id,
                  mb_password,
                  mb_name,
                  mb_level,
                  mb_sex,
                  mb_email,
                  mb_tel,
                  mb_phone,
                  mb_addr1,
                  mb_addr2,
                  mb_ip,
                  in_datetime
                ) VALUES (?, ?, ?, ? , ?, ?, ?, ?, ? , ?, ?, ?)
                `,
}

