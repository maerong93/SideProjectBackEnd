const pool = require('../database/pool');
const orderQuery = require('../queries/order-query');
const userQuery = require('../queries/user-query');
const cartQuery = require('../queries/cart-query');


const addOrder = async (
                            mb_id, mb_name, od_addr1, od_addr2,
                            od_tel, od_hp, od_email, od_datetime, 
                            od_price, in_datetime
                        ) => {
                            try {
                                let result = await pool.queryParams(orderQuery.addOrder, [
                                                    mb_id, mb_name, od_addr1, od_addr2,
                                                    od_tel, od_hp, od_email, od_datetime, 
                                                    od_price, in_datetime
                                                ]);      
                                return result;      
                            } catch (error) {
                                console.log(error);
                                throw new Error(error);
                            }
                        };
const tranOrder = async (
                            ct_id_arr, od_addr1, od_addr2, od_tel,
                            od_hp, od_email, od_datetime, od_price,
                            in_datetime, mbinfo
                        ) => {
                    const conn = await pool.getConn();
                    try {
                        await conn.beginTransaction(); // 트랜잭션 적용 시작

                        let cartResult =  await conn.query(cartQuery.getCartList2, [ct_id_arr]); // 장바구니 데이터 구함
                        let cartNotOrdered = null;
                        console.log(pool.textRowDel(cartResult[0]));
                        cartResult = pool.textRowDel(cartResult[0]);
                        if(cartResult.length > 0){
                            cartNotOrdered = cartResult.map((cart) => {
                                console.log('hello', cart);
                                if(cart.od_id === 0){
                                    return cart;
                                }
                            });
                            console.log('cartNotOrdered', cartNotOrdered.includes(undefined));
                            if(cartNotOrdered === null || cartNotOrdered.includes(undefined)){ // null 또는 undefined 하나라도 있다면
                                throw new Error('주문한 장바구니 포함됨');
                            } 
                            let orderResult = null;
                            orderResult = await conn.query(orderQuery.addOrder, [ 
                                                                                    mbinfo.mb_id, mbinfo.mb_name, od_addr1, od_addr2,
                                                                                    od_tel, od_hp, od_email, od_datetime, 
                                                                                    od_price, in_datetime
                                                                                ]);
                                                                                                           
                            if(!orderResult[0].insertId){
                                throw new Error('주문 실패!');
                            }
                            let orderInsertId = orderResult[0].insertId;
                            let cartOrderResult = null;
                            let cartIds = ct_id_arr.map((cartId, idx) => { // 콤마 추가 (IN 문으로 인해)
                                if(ct_id_arr.length === idx+1){
                                    return cartId;    
                                }else{
                                    return cartId+",";
                                }
                            });
                            console.log('orderInsertId', orderInsertId);
                            console.log('cartIds', cartIds.join(","));
                            // 마지막엔 콤마를 없애야하는데 괜찮고 쌈박한 방법 없을까???
                            cartOrderResult = await conn.query(cartQuery.updateCartOder, [orderInsertId, cartIds]);
                            await conn.commit();
                            return orderResult;
                        }else{
                            throw new Error('존재하지 않는 장바구니 포함됨');    
                        }
                    } catch (error) {
                        console.log(error);
                        await conn.rollback(); // 롤백
                        throw new Error(error);
                    } finally {
                        //conn.release();
                    }
                };
module.exports = {
    addOrder : addOrder,
    tranOrder : tranOrder
}