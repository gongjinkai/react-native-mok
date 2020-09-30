import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, FlatList } from 'react-native'
import SearchHeader from '../../components/SearchHeader'
import NavigationUtil from '../../navigator/NavigationUtil'

class CategoryScreen extends React.Component {
  static navigationOptions({ navigation }) {
    return {
      header: <SearchHeader
        barStyle={'dark'}
        goBack={ () => NavigationUtil.goBack(navigation) }/>
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View>
        <Text>商品分类页面</Text>
      </View>
    )
  }
}

export default connect(({ loading }) => ({ loading }))(CategoryScreen)
