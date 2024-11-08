export const API = {
  member: {
    // 會員登入 with email / password
    login: {
      url: '/v1/accounts:signInWithPassword',
      method: 'post'
    },
    // 會員註冊 with email / password
    registered: {
      url: '/v1/accounts:signUp',
      method: 'post'
    },
    // 使用 refresh token 換取 ID token
    exchangeToken: {
      baseUrl: 'https://securetoken.googleapis.com',
      url: '/v1/token',
      method: 'post'
    }
  }
}
