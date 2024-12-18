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
  getUserData: {
    url: '/v1/accounts:lookup',
    serverPath: '/api/auth/getUserData',
    method: 'post'
  },
  passwordReset: {
    url: '/v1/accounts:sendOobCode',
    serverPath: '/api/auth/resetPassword',
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
  getStock: {
    url: '/stock/:id.json',
    serverPath: '/api/stock/:productId',
    method: 'get'
  }
}

const product = {
  getListInfo: {
    url: '/products.json',
    serverPath: '/api/products',
    method: 'get'
  },
  getItemInfo: {
    url: '/products/:id.json',
    serverPath: '/api/products/:productId',
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
  order
}
