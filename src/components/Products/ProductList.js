import React, { Component } from "react";
import { AppRegistry, FlatList, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Constants from '../../constants/Constants';
import LoadingAnimation from '../../img/cart-loading.gif'; 
import * as ProductAction from '../../actions/ProductAction';
class ProductsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      category: this.props.navigation.state.params.product
    }
  }

  componentDidMount() {
    this.props.ProductAction.getProducts(this.state.category.id);
  }

  _keyExtractor = (item, index) => item.id;

  render() {

    const { navigate } = this.props.navigation;
    const { products } = this.props;
    console.log(products);

    const Items = <FlatList contentContainerStyle={styles.list} numColumns={2}
      data={products || []}
      keyExtractor={this._keyExtractor}
      renderItem={({ item }) =>
      <TouchableHighlight style={{width:'50%'}} onPress={() => navigate("Product", { product: item })} underlayColor="white">
        <View style={styles.view} >
          <Image style={styles.image} source={item.images.length > 0 ? {uri: item.images[0].src} : require('../../../assets/img_placeholder.png')} />
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </TouchableHighlight>
      }
    />;
    return (
      <ScrollView>
        {this.props.products.length ? Items :
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image style={styles.loader} source={LoadingAnimation}/>
          </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column'
  },
  view: {
    padding: 10
  },
  loader: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150, 
    height: 150
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    padding: 5
  }
});

function mapStateToProps(state) {
	return {
		products: state.products
	};
}

function mapDispatchToProps(dispatch) {
	return {
		ProductAction: bindActionCreators(ProductAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
