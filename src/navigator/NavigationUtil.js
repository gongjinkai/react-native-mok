export default class NavigationUtil {
  /**
   *
   *  跳转到指定页面
   * @static
   * @param {*} params  传递的参数
   * @memberof page
   */
  static goPage(params, pageName) {
    const { navigation } = params;
    if(!navigation) {
      console.log('NavigationUtil.navigation是空');
      return;
    }
    navigation.navigate(pageName, {
      ...params,
    })
  }

  /**
   *
   *  返回上一页
   * @static
   * @param {*} navigation
   * @memberof NavigationUtil
   */
  static goBack(navigation) {
    navigation.goBack();
  }
  /**
   *
   *   返回首页
   * @static
   * @param {*} params
   * @memberof NavigationUtil
   */
  static resetToHomePage(params) {
    const {navigation} = params;
    navigation.navigate('Main');
  }

  static resetToAuthPage() {
    const navigation = NavigationUtil.navigation;
    navigation.navigate('Auth');
  }
}
