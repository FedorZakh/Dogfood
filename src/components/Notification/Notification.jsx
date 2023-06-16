import { notification } from 'antd';


// @params
// type  = ['success', 'error', 'warning', 'info' ]
export const openNotification = (type = 'success', message = "Success", description = '') => {
    return notification[type]({ message: message, description: description, })
}