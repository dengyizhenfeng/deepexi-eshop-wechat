import { Dialog } from 'vant'

let token = sessionStorage.getItem('token') || localStorage.getItem('token') || ''
let tenantCode = sessionStorage.getItem('tenantCode') || localStorage.getItem('tenantCode') || ''
let shopId = sessionStorage.getItem('shopId') || localStorage.getItem('shopId') || ''
let userId = sessionStorage.getItem('userId') || localStorage.getItem('userId')

if (token === '' || tenantCode === '' || shopId === '' || userId === '999') {
  Dialog.confirm({
    title: '温馨提示',
    message: '您尚未登录，请前往登录...'
  }).then(() => {
    this.$router.push({
      name: 'login'
    })
  })
}
