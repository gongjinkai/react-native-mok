import React from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import px from "../utils/px";
import NavigationUtil from '../navigator/NavigationUtil'

class PlatformScreen extends React.Component {

  componentDidMount() {
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#5BC8F7');
      StatusBar.setHidden(false);
    });
    this.query();
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }

  static navigationOptions = ({ }) => {
    return {
      headerShown: false,
    }
  };

  query() {
    this.props.dispatch({
      type: 'platform/fetchMyData'
    }).then(data => {
      this.setState({
        resource: data,
      })
    })
  }


  goPage(path) {
    NavigationUtil.goPage(this.props, path)
  }

  constructor(props) {
    super(props);
    this.state = {
      resource: {}
    }
  }
  render() {
    const { resource } = this.state;
    return (
      <ScrollView style={ styles.container }>
        <View style={ styles.header_bar }>
          <TouchableOpacity onPress={ () => this.goPage('Notice') }>
            <Image source={ require('../../assets/icons/icon-message.png') }/>
          </TouchableOpacity>
        </View>
        <View style={ styles.info_card }>
          <Image source={{ uri: resource.member && resource.member.icon }} style={ styles.avatar }/>
          <Text style={ styles.nickname }>{ resource.member && resource.member.nickname }</Text>
          <View style={ styles.info_line }>
            <TouchableOpacity onPress={ () => this.goPage('Fans') }>
              <Text style={ styles.info_line_star }>粉丝&nbsp;{ resource.member && resource.member.fansNumber }</Text>
            </TouchableOpacity>
            <Text style={ styles.info_line_line } />
            <TouchableOpacity onPress={ () => this.goPage('Follow') }>
              <Text style={ styles.info_line_look }>关注&nbsp;{ resource.member && resource.member.focusNumber }</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={ styles.btn_light } onPress={ () => this.goPage('Information') }>
            <Text style={ styles.btn_light_text }>编辑资料</Text>
          </TouchableOpacity>
          <View style={ styles.column_menu }>
            <TouchableOpacity style={ styles.menu_child } onPress={ () => this.goPage('Order')  }>
              <Image source={ require('../../assets/icons/icon-order.png') } />
              <Text style={ styles.menu_child_text }>订单</Text>
            </TouchableOpacity>
            <View style={ styles.menu_child }>
              <Image source={ require('../../assets/icons/icon-customer_service.png') } />
              <Text style={ styles.menu_child_text }>联系客服</Text>
            </View>
            <View style={ styles.menu_child }>
              <Image source={ require('../../assets/icons/icon-report.png') } />
              <Text style={ styles.menu_child_text }>体检报告</Text>
            </View>
          </View>
        </View>
        <View style={ styles.a_list }>
          <View style={ styles.a_list_item }>
            <View>
              <Text>健康档案</Text>
            </View>
            <View>
              <Text>更多</Text>
            </View>
          </View>
          <View style={ styles.a_list_item }>
            <View>
              <Text>体重</Text>
            </View>
            <View>
              <Text>{ resource.busArchive && resource.busArchive.idealWeight }公斤</Text>
            </View>
          </View>
          <View style={ styles.a_list_item }>
            <View>
              <Text>体脂率</Text>
            </View>
            <View>
              <Text>{ resource.busArchive && resource.busArchive.bodyFat }%</Text>
            </View>
          </View>
        </View>
        <View style={[styles.a_list, { marginTop: 20, marginBottom: 10 }]}>
          <TouchableOpacity style={ styles.a_list_item } onPress={ () => this.goPage('ScanQR') }>
            <View>
              <Text>我的拉新</Text>
            </View>
            <View>
              <Image source={ require('../../assets/icons/icon-right_dark.png') }/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.a_list_item } onPress={ () => this.goPage('Address') }>
            <View>
              <Text>地址管理</Text>
            </View>
            <View>
              <Image source={ require('../../assets/icons/icon-right_dark.png') }/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.a_list_item } onPress={ () => this.goPage('Feedback') }>
            <View>
              <Text>意见反馈</Text>
            </View>
            <View>
              <Image source={ require('../../assets/icons/icon-right_dark.png') }/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.a_list_item } onPress={ () => this.goPage('Setting') }>
            <View>
              <Text>设置</Text>
            </View>
            <View>
              <Image source={ require('../../assets/icons/icon-right_dark.png') }/>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header_bar: {
    paddingLeft: px(44),
    paddingRight: px(32),
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: px(88),
    flexDirection: 'row',
    backgroundColor: '#5bc8f7'
  },
  info_card: {
    alignItems: 'center',
    backgroundColor: '#5bc8f7'
  },
  avatar: {
    marginTop: 10,
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff'
  },
  nickname: {
    marginTop: 5,
    fontSize: 20,
    color: '#fff'
  },
  info_line: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  info_line_star: {
    marginRight: 10,
    color: '#fff',
    fontSize: 14
  },
  info_line_line: {
    width: 1,
    height: 16,
    backgroundColor: '#fff'
  },
  info_line_look: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 14,
  },
  btn_light: {
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#fff',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 19,
    paddingRight: 19,
    borderRadius: 50,
  },
  btn_light_text: {
    color: '#fff'
  },
  column_menu: {
    marginBottom: 47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center'
  },
  menu_child: {
    flex: 1,
    alignItems: 'center',
    borderRightColor:'#fff',
    borderRightWidth: 1,
  },
  menu_child_text: {
    marginTop: 9,
    color: '#C8ECFC'
  },
  a_list: {
    marginTop: -20,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation:3,
  },
  a_list_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2'
  }
});

export default connect(({ platform }) => ({ platform }))(PlatformScreen)
