const statusList = [
    {
        code: 400,
        error: 'EMAIL_NOT_FOUND',
        errorCH: 'Email 不存在'
    },
    {
        code: 400,
        error: 'EMAIL_EXISTS',
        errorCH: 'Email 已存在'
    },
    {
        code: 400,
        error: 'INVALID_EMAIL',
        errorCH: 'Email 格式錯誤'
    },
    {
        code: 400,
        error: 'INVALID_PASSWORD',
        errorCH: '密碼錯誤'
    },
    {
        code: 400,
        error: 'WEAK_PASSWORD : Password should be at least 6 characters',
        errorCH: '設定的密碼至少要6位數'
    },
    {
        code: 400,
        error: 'TOO_MANY_ATTEMPTS_TRY_LATER',
        errorCH: '已發送太多次請求，請稍後再提出請求'
    },
    {
        code: 400,
        error: 'Invalid JSON body',
        errorCH: '傳送至伺服器的body資料無效'
    },
    {
        code: 400,
        error: 'INVALID_ID_TOKEN',
        errorCH: '無效的 ID_TOKEN'
    },
    {
        code: 400,
        error: 'Bad Request',
        errorCH: '請再檢查您填寫的資料是否正確'
    },
    {
        code: 400,
        error: 'INVALID_LOGIN_CREDENTIALS',
        errorCH: '帳號密碼輸入錯誤，請再次確認'
    },
    {
        code: 401,
        error: 'Permission denied',
        errorCH: '權限不足'
    },
    {
        code: 401,
        error: 'Unauthorized',
        errorCH: '未經授權,請重新登入'
    },
    {
        code: 404,
        error: 'Not Found',
        errorCH: '查無資料'
    },
    {
        code: 404,
        error: 'Stock Not Found',
        errorCH: '查無庫存資料'
    },
    {
        code: 404,
        error: 'Firebase not find',
        errorCH: '外部伺服器連接失敗'
    },
    {
        code: 500,
        error: 'Internal Server Error',
        errorCH: '內部伺服器錯誤'
    }
]

export const mapErrorMessage = (statusError, statusCode) => {
    const statusMatched = statusList.filter((status) => {
        return status.code === statusCode && status.error === statusError
    })

    if (statusMatched.length > 0) {
        return statusMatched[0].errorCH
    } else {
        return '未知錯誤'
    }
}
