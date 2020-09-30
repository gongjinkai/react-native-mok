import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet,ScrollView, PermissionsAndroid } from 'react-native'
import Contacts from 'react-native-contacts';
import CustomHeader from '../../components/CustomHeader'
import NavigationUtil from "../../navigator/NavigationUtil";

class ContactScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader
        barStyle={'dark'}
        backgroundColor={'#fff'}
        title={ '通讯录' }
        goBack={ () => NavigationUtil.goBack(navigation) }/>
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
    }
  }

  componentDidMount() {
    this.requestContactsPermission()
  }
  //请求权限的方法
  async requestContactsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: '申请通讯录权限',
          message:
            '请求使用通讯录数据，' +
            '然后你就可以拍出酷炫的皂片啦。',
          buttonNeutral: '等会再问我',
          buttonNegative: '不行',
          buttonPositive: '好吧',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // 获取权限成功获取联系人信息
        this.loadContacts();
      } else {
        console.log('用户并不d你');
        this.props.navigation.goBack()
      }
    } catch (err) {
      console.warn(err);
    }
  }

  loadContacts() {
    Contacts.getAll((err, contacts) => {
      if (err === "denied") {
        console.warn("Permission to access contacts was denied");
      } else {
        this.props.dispatch({
          type: 'common/fetchMemberAddressBook',
          payload: {
            list: JSON.stringify(contacts.map(item => ({ name: item.displayName, tel: item.phoneNumbers[0].number })))
          }
        }).then(res => {
          if(res.code === 1) {
            this.setState({
              dataSource: res.data,
            })
          }
        })
      }
    });

    Contacts.getCount(count => {
      //console.log(`联系人数量${count}`)
    });
  }


  render() {
    const { dataSource } = this.state;
    console.log(dataSource);
    return (
      <View style={ styles.container }>
        <ScrollView>
          <Text style={ styles.title }>已加入Mok</Text>
          <View style={ styles.list_content }>

          </View>
          <Text style={ styles.title }>邀请加入Mok</Text>
          <View style={ styles.list_content }>

          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    fontSize: 13,
    color: '#9C9C9C'
  },
  list_content: {

  }
});

export default connect(({ common, loading }) => ({ common, loading }))(ContactScreen)
