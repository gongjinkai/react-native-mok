import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Toast from 'react-native-easy-toast'
import CustomHeader from '../../components/CustomHeader'
import NavigationUtil from '../../navigator/NavigationUtil'

const PAGE_SIZE = 10;

class FollowScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader
        barStyle={'dark'}
        backgroundColor={'#fff'}
        title={'我的关注'}
        goBack={ () => navigation.goBack() }
        right={<TouchableOpacity onPress={ () => NavigationUtil.goPage({ navigation }, 'Contact') }>
          <AntDesign name={'contacts'} size={24} />
        </TouchableOpacity> } />,
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
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff')
    });
    this.query();
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }

  query() {
    this.props.dispatch({
      type: 'common/fetchFocus',
      payload: {
        pageNum: this.state.pageNum,
        pageSize: PAGE_SIZE,
      }
    }).then(res => {
      if(res.code ===  1) {
        this.setState({
          dataSource: res.data,
        })
      } else {
        this.toast.show(res.message);
      }
    })
  }

  _renderEmptyContent() {
    return (
      <View style={ styles.empty_content }>
        <Image source={ require('../../../assets/images/icon-follow.png') }/>
        <Text style={ styles.empty_text }>您还没有关注任何人</Text>
      </View>
    )
  }

  render() {
    const { loading } = this.props;
    const { dataSource } = this.state;
    console.log(dataSource);
    return (
      <View style={ styles.container }>
        <View style={{ marginTop: 12, backgroundColor: '#FFF' }}>
          <FlatList
            style={{ marginLeft: 16, marginRight: 16 }}
            data={ dataSource.memberFocusList }
            showsVerticalScrollIndicator = {false}
            onEndReachedThreshold={0.1}
            ItemSeparatorComponent={ () => { return (<View style={ styles.line } />) } }
            List
            renderItem={({ item, index, separators }) => (
              <View style={ styles.list_item } onPress={ () => this.goToDetail(item)} key={index}>
                <View style={ styles.list_item_left }>
                  <View style={ styles.avatar_box }>
                    <Image source={{ uri: item.icon }} style={[styles.avatar, { borderColor: '#fff', borderWidth: 1 }]}/>
                    <View style={[styles.item_tag]}>
                      <Text style={[styles.item_tag_text]}>{ item.integrationTitle }</Text>
                    </View>
                  </View>
                  <View style={ styles.list_item_right }>
                    <Text style={ styles.list_item_right_text }>{ item.nickname }</Text>
                  </View>
                </View>
                <View style={ styles.flex_right }>
                  <View style={ styles.flex_right_btn }>
                    <Text style={ styles.flex_end_text }>已关注</Text>
                  </View>
                </View>
              </View>
            )} />
        </View>
        <Toast ref={ (ref) => this.toast = ref }/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  empty_content: {
    marginTop: 140,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_text: {
    color: '#636D76',
    fontSize: 18,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2'
  },
  list_item: {
    paddingTop: 7,
    paddingBottom: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF'
  },
  list_item_left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list_item_right: {
    marginLeft: 16,
  },
  list_item_right_text: {
    color: '#636D76',
    fontSize: 13,
  },
  /** Avatar **/
  avatar_box: {
    marginLeft: 15,
    alignItems: 'center'
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 50,
  },
  separator: {
    height: 12
  },
  /** avatar tag style **/
  item_tag: {
    position: 'absolute',
    bottom: 0,
    width: 67,
    height: 18,
    backgroundColor: '#5BC8F7',
    borderRadius: 4,
  },
  item_tag_text: {
    color: '#fff',
    textAlign: 'center',
  },
  /** flex_end **/
  flex_right: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  flex_right_btn: {
    paddingTop: 5,
    paddingBottom: 4,
    paddingLeft: 17,
    paddingRight: 17,
    borderRadius: 14,
    backgroundColor: '#BABFC2'
  },
  flex_end_text: {
    fontSize: 13,
    color: '#FFF'
  }
});

export default connect(({ common, loading }) => ({ common, loading }))(FollowScreen)
