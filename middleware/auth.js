export default function (context) {
  if (process.server) {
    const idToken = context.$cookies.get('id_token')
    const isAdministrator = context.$cookies.get('isAdministrator')

    if (!idToken) {
      if (context.route.name === 'cart') {
        return context.redirect('/order')
      } else {
        return context.redirect('/')
      }
    }

    if (
      context.route.name === 'admin-search' ||
      context.route.name === 'admin-search-detail-orderId'
    ) {
      if (!isAdministrator) {
        return context.redirect('/')
      }
    }
  }
  if (!context.store.state.isUserLoggedIn) {
    if (context.route.name === 'cart') {
      return context.redirect('/order')
    } else {
      return context.redirect('/')
    }
  }
}
