import React from 'react'
import { View, FlatList, Text, StatusBar, TouchableOpacity, StyleSheet, Image } from 'react-native'
import * as CacheManager from 'react-native-http-cache'
import Toast from 'react-native-easy-toast'
import CustomHeader from '../../components/CustomHeader'
import NavigationUtil from '../../navigator/NavigationUtil'

const MENUS = [
  {
    label: '账号与安全',
    path: 'Account',
    type: 'link'
  },
  {
    label: '打分支持',
    path: '',
    type: 'link'
  },
  {
    label: '隐私设置',
    path: 'Privacy',
    type: 'link'
  },
  {
    label: '清理缓存',
    type: 'click',
    eventName: 'clearCache',
  },
  {
    label: '协议与条款',
    path: '',
    type: 'link'
  },
  {
    label: '运动风险须知',
    path: '',
    type: 'link'
  },
  {
    label: '检查更新',
    path: '',
    type: 'click'
  }
]

class SettingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CustomHeader
          barStyle={'dark'}
          backgroundColor={'#fff'}
          title={ '设置' }
          goBack={ () => navigation.goBack() }/>
      )
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      cacheSize: '0M',
    }
  }

  componentDidMount() {
    this.getCacheSize();
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff')
    })
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }


  /**
   * 获取缓存数据大小
   */
  getCacheSize() {
    CacheManager.getCacheSize().then(data => {
      const size = data / (1024 * 1024);
      this.setState({
        cacheSize: size.toFixed(2) + 'M'
      })
    })
  }

  /**
   * 清除缓存
   */

  clearCache() {
    CacheManager.clearCache();
    this.getCacheSize();
    this.refs.toast.show('清除缓存成功');
  }

  goPage(path) {
    NavigationUtil.goPage(this.props, path);
  }

  render() {
    const { cacheSize } = this.state;
    return (
      <View style={ styles.container }>
        <FlatList
          data={ MENUS }
          ItemSeparatorComponent={ () => { return (<View style={ styles.line } />) } }
          renderItem={({ item, index, separators }) => {
            return item.type === 'link' ? (
              <TouchableOpacity style={ styles.list_item } key={index} onPress={ () => this.goPage(item.path) }>
                <View>
                  <Text>{ item.label }</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {
                    item.type === 'click' && item.eventName === 'clearCache' ? <Text>{ cacheSize }</Text> : null
                  }
                  <Image
                    style={ styles.icon_back }
                    source={ require('../../../assets/icons/icon-back_dark.png') } />
                </View>
              </TouchableOpacity>
            ) : (
              <View style={ styles.list_item }>
                <View>
                  <Text>{ item.label }</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {
                    item.eventName === 'clearCache' ? <Text onPress={ () => this.clearCache() }>{ cacheSize }</Text> : null
                  }
                  <Image
                    style={ styles.icon_back }
                    source={ require('../../../assets/icons/icon-back_dark.png') } />
                </View>
              </View>
            )
          }} />
        <Toast ref="toast" position="center"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA'
  },
  list_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 35,
    paddingRight: 25,
    backgroundColor: '#fff'
  },
  icon_back: {
    transform: [{rotate:'180deg'}]
  },
  line: {
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
})

export default SettingScreen
