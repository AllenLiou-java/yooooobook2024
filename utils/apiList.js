const member = {
    // 會員登入 with email / password
    signIn: {
        url: '/v1/accounts:signInWithPassword',
        serverPath: '/api/auth/signIn',
        method: 'post'
    },
    // 會員註冊 with email / password
    registered: {
        url: '/v1/accounts:signUp',
        serverPath: '/api/auth/signUp',
        method: 'post'
    },
    // 使用 refresh token 換取 ID token
    exchangeToken: {
        baseUrl: 'https://securetoken.googleapis.com',
        url: '/v1/token',
        method: 'post'
    },
    // request參數 {"requestType": "VERIFY_EMAIL", "idToken": ""}
    sendEmailVerify: {
        url: '/v1/accounts:sendOobCode',
        serverPath: '/api/auth/sendEmailVerify',
        method: 'post'
    },
    confirmEmailVerification: {
        url: '/v1/accounts:update',
        serverPath: '/api/auth/confirmEmailVerification',
        method: 'post'
    },
    getUserData: {
        url: '/v1/accounts:lookup',
        serverPath: '/api/auth/getUserData',
        method: 'post'
    },
    sendPasswordResetEmail: {
        url: '/v1/accounts:sendOobCode',
        serverPath: '/api/auth/sendPasswordResetEmail',
        method: 'post'
    },
    verifyPasswordResetCode: {
        url: '/v1/accounts:resetPassword',
        serverPath: '/api/auth/verifyPasswordResetCode',
        method: 'post'
    },
    confirmPasswordReset: {
        url: '/v1/accounts:resetPassword',
        serverPath: '/api/auth/confirmPasswordReset',
        method: 'post'
    },
    // 取得會員資料
    getMemberInfo: {
        url: '/users/:member_id.json',
        serverPath: '/api/member/:memberId',
        method: 'get'
    },
    // 新增/編輯會員資料
    patchMemberInfo: {
        url: '/users/:member_id.json',
        serverPath: '/api/member/:memberId',
        method: 'patch'
    }
}

const stock = {
    getAllStock: {
        url: '/stock.json',
        serverPath: '/api/stock',
        method: 'get'
    },
    patchAllStock: {
        url: '/stock.json',
        serverPath: '/api/stock',
        method: 'patch'
    },
    getStockById: {
        url: '/stock/:id.json',
        serverPath: '/api/stock/:productId',
        method: 'get'
    },
    patchStockById: {
        url: '/stock/:id.json',
        serverPath: '/api/stock/:productId',
        method: 'patch'
    }
}

const product = {
    getSimpleListInfo: {
        url: '/products.json',
        serverPath: '/api/products/simple',
        method: 'get'
    },
    getDetailListInfo: {
        url: '/products_simple.json',
        serverPath: '/api/products/detail',
        method: 'get'
    },
    getDetailItemInfo: {
        url: '/products/:id.json',
        serverPath: '/api/products/detail/:productId',
        method: 'get'
    }
}

const groupBuying = {
    getGroupBuyingPlan: {
        serverPath: '/api/groupBuying/:planId',
        method: 'get'
    }
}

const groupOrder = {
    // 新增會員的訂單資訊
    patchOrderInfo: {
        url: '/groupOrder/:planId/:orderId.json',
        serverPath: '/api/groupOrder/:planId/:orderId',
        method: 'patch'
    },
    // 取得會員的特定訂單內容
    getOrderInfo: {
        url: '/groupOrder/:planId/:orderId.json',
        serverPath: '/api/groupOrder/:planId/:orderId',
        method: 'get'
    },
    // 取得特定團購群的所有訂單內容
    getOrderInfoByPlanId: {
        url: '/groupOrder/:planId.json',
        serverPath: '/api/groupOrder/:planId',
        method: 'get'
    }
}

const order = {
    getAllOrders: {
        url: '/order.json',
        method: 'get'
    },
    // 取得會員的訂單列表
    getOrderList: {
        url: '/order/:user_id.json',
        serverPath: '/api/order/:userId',
        method: 'get'
    },
    // 取得會員的特定訂單內容
    getOrderInfo: {
        url: '/order/:user_id/:order_id.json',
        serverPath: '/api/order/:userId/:orderId',
        method: 'get'
    },
    // 新增會員的訂單資訊
    patchOrderInfo: {
        url: '/order/:user_id/:order_id.json',
        serverPath: '/api/order/:userId/:orderId',
        method: 'patch'
    }
}

export const apiList = {
    member,
    stock,
    product,
    groupBuying,
    groupOrder,
    order
}
