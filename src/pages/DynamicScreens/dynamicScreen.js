import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-easy-toast'
import CustomHeader from '../../components/CustomHeader'

const PAGE_SIZE = 10;

class DynamicScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader
        barStyle={'light'}
        backgroundColor={'#5BC8F7'}
        goBack={ () => navigation.goBack() }/>
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      dataSource: {},
    }
  }

  componentDidMount() {
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor('#5BC8F7');
      StatusBar.setBarStyle('light');
    });
    this.query();
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }

  query() {
    const { navigation } = this.props;
    this.props.dispatch({
      type: 'common/fetchSsoDynamic',
      payload: {
        pageNum: this.state.pageNum,
        pageSize: PAGE_SIZE,
        memberId: navigation.state.params.memberId,
      }
    }).then(res => {
      this.setState({
        dataSource: res.data,
      })
    })
  }
  handleMemberFocus(data) {
    this.props.dispatch({
      type: 'common/memberFocus',
      payload: {
        beMemberId: data.member.id,
        type: 1,
      }
    }).then(res => {
      this.toast.show(res.message);
      this.setState(prevState => ({
        dataSource: {
          ...prevState.dataSource,
          memberIsFocus: 1,
        }
      }))
    })
  }

  render() {
    const { loading } = this.props;
    const { dataSource } = this.state;
    return (
      <View style={ styles.container }>
        <View>
          <ImageBackground
            style={styles.image}
            source={ require('../../../assets/images/user-picture-bg.png') }>
            <View style={ styles.avatar_box }>
              <Image source={ dataSource.member && dataSource.member.icon ? { uri: dataSource.member.icon } : require('../../../assets/images/t_avatar.png') } style={ styles.avatar }/>
              <View style={ styles.item_tag }>
                <Text style={ styles.item_tag_text }>{ dataSource.memberTitle }</Text>
              </View>
            </View>
            <View style={ styles.center_line }>
              <Text style={ styles.name_text }>{ dataSource.member && dataSource.member.nickname }</Text>
            </View>
            <View style={ styles.cover_footer }>
              <Text style={{ fontSize: 14, color: '#FFF' }}>粉丝  { dataSource.member && dataSource.member.fansNumber }</Text>
              <Text style={{ marginLeft: 27, fontSize: 14, color: '#FFF' }}>关注  { dataSource.member && dataSource.member.focusNumber }</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={ styles.content }>
          <View style={ styles.left_line }/>
          <Text style={ styles.empty_text }>Ta已开启隐私保护</Text>
          <View style={ styles.right_line }/>
        </View>
        <View style={ styles.fixed_button }>
          {
            dataSource.memberIsFocus === -1 ? (
              <TouchableOpacity style={ styles.btn_primary } onPress={ () => this.handleMemberFocus(dataSource) }>
                <Text style={ styles.btn_primary_text }>关注</Text>
              </TouchableOpacity>
            ) : (
              <View style={ styles.btn_disable }>
                <Text style={ styles.btn_disable_text }>已关注</Text>
              </View>
            )
          }
        </View>
        <Toast ref={ (ref) => this.toast = ref } position={'center'}/>
        <Spinner visible={ loading.effects['common/fetchSsoDynamic'] }
                 textContent={'数据加载中...'}
                 textStyle={styles.spinnerTextStyle} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 172,
    resizeMode: 'cover',
  },
  spinnerTextStyle: {
    color: '#fff'
  },
  avatar_box: {
    marginTop: 15,
    marginLeft: 15,
    alignItems: 'center'
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  /** avatar tag style **/
  item_tag: {
    position: 'absolute',
    bottom: 0,
    width: 67,
    height: 18,
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
  item_tag_text: {
    color: '#5BC8F7',
    textAlign: 'center',
  },
  center_line: {
    marginTop: 6,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name_text: {
    fontSize: 20,
    color: '#FFF'
  },
  cover_footer: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingLeft: 70,
    paddingRight: 70,
    flexDirection: 'row',
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty_text: {
    fontSize: 13,
    color: '#636D76',
    fontWeight: 'bold'
  },
  left_line: {
    flex: 1,
    marginRight: 10,
    height: 1,
    backgroundColor: '#C1C1C1'
  },
  right_line: {
    flex: 1,
    marginLeft: 10,
    height: 1,
    backgroundColor: '#C1C1C1'
  },
  fixed_button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  btn_primary: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#5BC8F7'
  },
  btn_primary_text: {
    fontSize: 18,
    color: '#FFF'
  },
  btn_disable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#C1C1C1'
  },
  btn_disable_text: {
    fontSize: 18,
    color: '#FFF'
  }
});

export default connect(({ common, loading }) => ({ common, loading }))(DynamicScreen)
