export function handleResponseErrorMessage(err) {
  if (err.response) {
    // if (err.response.data.message === "You don't have any domain") {
    //   return 'Không có thống kê gửi nhận do quý khách chưa xác thực DNS cho tên miền'
    // }
    if (err.response.data.status === 403) {
      if (err.response.data.message === 'Debited account.') {
        return 'Quý khách không thể thực hiện thao tác này do số dư trong tài khoản của quý khách đang bị âm!'
      } else if (err.response.data.message === 'Invoice expires.') {
        return 'Quý khách có hóa đơn chưa thanh toán, vui lòng thanh toán để tiếp tục sử dụng dịch vụ!'
      } else if (err.response.data.message === 'Trial expires.') {
        return 'Tài khoản của quý khách đã hết hạn dùng thử, vui lòng nâng cấp lên tài khoản trả phí để tiếp tục sử dụng!'
      }
    }
    return
  } else return
}
