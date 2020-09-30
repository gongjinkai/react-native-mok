import { ToastAndroid } from 'react-native'


class ToastUtil {
  static show(message, duration) {
    ToastAndroid.show(message,duration === 'SHORT' ? ToastAndroid.SHORT : ToastAndroid.LONG)
  }
}


export default ToastUtil
