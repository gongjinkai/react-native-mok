import React from 'react'
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import NavigationUtil from '../../navigator/NavigationUtil'

const { width, height } = Dimensions.get('window');

class RankScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  }
  componentDidMount() {
    this.query();
    //添加statusBar监听
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff')
    });
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }

  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          title: '新手榜'
        },
        {
          title: '狂人榜'
        }
      ],
      list: [],
      selectedTab: {
        title: '新手榜',
        current: 0,
      },
      selfData: {},
      number: 0,
    }
  }

  query() {
    this.props.dispatch({
      type: 'ranking/query',
      payload: {
        classify: this.state.selectedTab.current + 1,
      }
    }).then(dataSource => {
      this.setState({
        list: dataSource.ssoMemberList,
        selfData: dataSource.ssoMember,
        number: dataSource.number
      })
    })
  }

  selectTag(item, idx) {
    if(idx === this.state.selectedTab.current) {
      return
    }
    this.setState({
      selectedTab: {
        title: item.title,
        current: idx,
      }
    }, () => {
      this.query();
    })
  }

  /**
   * 根据排名渲染徽章
   * @param index
   */
  renderListBadge(index) {
    switch (index + 1) {
      case 1:
        return <Image source={ require('../../../assets/icons/icon-No1.png') } />;
      case 2:
        return <Image source={ require('../../../assets/icons/icon-No2.png') } />;
      case 3:
        return <Image source={ require('../../../assets/icons/icon-No3.png') } />;
      default:
        return <Text style={{ fontSize: 28, color: '#636D76' }}>{ index + 1 }</Text>
    }
  }

  renderMyBadge(index) {
    switch (index + 1) {
      case 1:
        return <Image source={ require('../../../assets/icons/icon-No1.png') } />;
      case 2:
        return <Image source={ require('../../../assets/icons/icon-No2.png') } />;
      case 3:
        return <Image source={ require('../../../assets/icons/icon-No3.png') } />;
      default:
        return <Text style={{ fontSize: 28, color: '#fff' }}>{ index + 1 }</Text>
    }
  }

  goPage(path, { id }) {
    NavigationUtil.goPage({ ...this.props, memberId: id }, path);
  }

  render() {
    const { tabs, selectedTab, list, selfData, number } = this.state;
    return (
      <View style={ styles.container }>
        <View style={ styles.header_bar }>
          <View style={ styles.arrow_left }>
            <Text style={ styles.sub_title }>天梯榜</Text>
          </View>
          <View style={ styles.arrow_right }>
            <Text style={ styles.arrow_right_desc }>唐山体验赛区</Text>
            <AntDesign size={10} name={'caretdown'} color={'#5BC8F7'}/>
            <AntDesign
              style={{ marginLeft: 6 }}
              size={20} name={'questioncircleo'} color={'#636D76'}/>
          </View>
        </View>
        <View style={ styles.tab_content }>
          <View style={ styles.head_tabs }>
            {
              tabs.map((item, index) => (
                <TouchableHighlight
                  underlayColor={ selectedTab.title === item.title ? '#5BC8F7' : '#FFF' }
                  activeOpacity={ selectedTab.title === item.title ? 1 : .2 }
                  onPress={ () => this.selectTag(item, index) }
                  style={
                    [styles.tabs_item,selectedTab.current === index ? styles.tabs_active : styles.tabs_normal, index === 0 ? styles.left_tag : styles.right_tag ]
                  }>
                  <Text style={selectedTab.current === index ? styles.tabs_active_text : styles.tabs_normal_text}>{ item.title }</Text>
                </TouchableHighlight>
              ))
            }
          </View>
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              getItemLayout={ (data, index) => (
                {length: 60, offset: 60 * index, index}
              )}
              ItemSeparatorComponent={
                () => (
                  <View style={styles.separator} />
                )
              }
              data={ list }
              renderItem={ ({ item, index, separators }) => (
                <TouchableOpacity style={ styles.list_item } onPress={ () => this.goPage('Dynamic', item) }>
                  <View style={{ alignItems: 'center', justifyContent: 'center', minWidth: 50 }}>
                    { this.renderListBadge(index, 'my') }
                  </View>
                  <View style={ styles.avatar_box }>
                    <Image source={ item.icon ? { uri: item.icon } : require('../../../assets/images/t_avatar.png') } style={ styles.avatar }/>
                    <View style={ styles.item_tag }>
                      <Text style={ styles.item_tag_text }>{ item.title }</Text>
                    </View>
                  </View>
                  <View style={{ marginLeft: 8 }}>
                    <Text style={{ color: '#636D76', fontSize: 13 }}>{ item.nickname }</Text>
                  </View>
                  <View style={ styles.step }>
                    <Text style={ styles.step_text }>{ item.integration }</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={[styles.list_item, {
          position: 'absolute',
          paddingLeft: 20,
          paddingRight: 16,
          paddingTop: 5,
          paddingBottom: 5,
          bottom: 0,
          backgroundColor: '#5BC8F7',
          width: width,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20
        }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', minWidth: 50 }}>
            { this.renderMyBadge(number - 1) }
          </View>
          <View style={ styles.avatar_box }>
            <Image source={{ uri: selfData.icon }} style={[styles.avatar, { borderColor: '#fff', borderWidth: 1 }]}/>
            <View style={[styles.item_tag, { backgroundColor: '#fff' }]}>
              <Text style={[styles.item_tag_text, { color: '#5BC8F7' }]}>{ selfData.title }</Text>
            </View>
          </View>
          <View style={ styles.bottom_text }>
            <Text style={{ color: '#fff' }}>{ selfData.nickname }</Text>
            <Text style={{ color: '#fff' }}>{ selfData.classify === 1 ? '新人榜': '狂人榜单' }</Text>
          </View>
          <View style={[styles.step, { right: 16 }]}>
            <Text style={[styles.step_text, { color: '#fff' }]}>{ selfData.integration }</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header_bar: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  arrow_left: {},
  sub_title: {
    fontSize: 18,
    color: '#636D76'
  },
  arrow_right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow_right_desc: {
    color: '#5BC8F7',
    fontSize: 13,
  },
  tab_content: {
    marginBottom: 100,
    paddingLeft: 20,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  head_tabs: {
    marginTop: 10,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabs_item: {
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
    alignItems: 'center',
  },
  left_tag: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  right_tag: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderLeftWidth: 0,
  },
  tabs_active: {
    backgroundColor: '#5bc8f7',
    borderWidth: 1,
    borderColor: '#5bc8f7'
  },
  tabs_normal: {
    borderWidth: 1,
    borderColor: '#5bc8f7'
  },
  tabs_active_text: {
    color: '#fff'
  },
  tabs_normal_text: {
    color: '#5BC8F7'
  },
  list_item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  /** step **/
  step: {
    position: 'absolute',
    right: 0,
  },
  step_text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00B2FF'
  },
  bottom_text: {
    marginLeft: 20
  }
})

export default connect(({ ranking }) => ({ ranking }))(RankScreen)
