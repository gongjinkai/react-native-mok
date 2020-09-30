import React from 'react'
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native'
import CustomHeader from '../../components/CustomHeader'
const { width, height } = Dimensions.get('window');

class DeliverScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader
                barStyle={'dark'}
                backgroundColor={'#fff'}
                title={'物流详情'}
                goBack={ () => navigation.goBack() } />
    }
  }
  render() {
    // let invoice = [{id: 111, content: '已签收,签收人：门卫', ctime: '2017-1-11 17:59'},
    //   {id: 222, content: '快递已达成都',ctime: '2017-1-10 17:59'},
    //   {id: 222, content: '快递已达四川',ctime: '2017-1-10 17:59'},
    //   {id: 222, content: '快递已达武汉',ctime: '2017-1-10 17:59'},
    //   {id: 222, content: '快递已达天津',ctime: '2017-1-10 17:59'},
    //   {id: 222, content: '快递已达北京',ctime: '2017-1-10 17:59'},
    //   {id: 222, content: '快递已打包',ctime: '2017-1-10 17:59'}];
    let invoice = [];
    let items = [];
    invoice.map((el, index) => {
      let colorValue = index === 0 ? '#0b74c4' : '#888';
      let backgroundColor = index === 0 ? '#0b74c4' : '#e0e0e0';
      items.push(
        <View style={styles.expressItem} key={index}>
          <View style={styles.expressRightFirst}>
            <View style={styles.process}>
              <Text style={{color:colorValue,fontSize:14}}>{el.content}</Text>
              <Text style={{color:colorValue,fontSize:12}}>{el.ctime}</Text>
            </View>
          </View>
          <View style={[styles.expressLeft,{backgroundColor:backgroundColor}]}/>
        </View>
      );
    });
    return (
      <View style={styles.content}>
        {
          invoice.length > 0 ? item :  <View style={ styles.empty_content }>
            <Image source={ require('../../../assets/images/list-empty.png') }/>
            <Text style={ styles.empty_text }>还没有物流信息哦~请您耐心等待</Text>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  process: {
    paddingVertical: 10,
    flexDirection: 'column',
    paddingRight: 20
  },
  expressRightFirst: {
    width: width,
    paddingLeft: 25,
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
    flexDirection: 'column'
  },
  content: {
    marginLeft: 10,
    flexDirection: 'column',
    width: width,
    height: height,
    marginTop: 10
  },
  expressItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    width: width
  },
  expressLeft: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    position: 'relative',
    right: width + 4,
    top: 20
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
  }
});

export default DeliverScreen
