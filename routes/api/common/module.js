/*
    로그인 체크 
*/
// express 에서 import 하여 함수를 쓰려면 이렇게 사용해야함. express 뿐만 아님
// export 변수 명은 파일명과 같게 처해야한다. 해당 변수 값이 충돌한느 경우가 발생한다.
let commonExports = module.exports = {}; 

// Json 데이터 처리 함수 
commonExports.toJsonData = (status = 'success', msg = '', data = []) => {
    return (
        {
            status: status,
            msg: msg,
            data: data
        }
    )
}

// 로그인 체크 함수
commonExports.loginCechk = (req, res, nex) => {
    //     // ... 로그인 체크 
    //     // 미로그인 로그아웃 처리 
}


