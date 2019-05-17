import React, { Component } from "react";
import { AppRegistry, FlatList, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Constants from '../../constants/Constants';
import LoadingAnimation from '../../img/cart-loading.gif'; 
import * as ProductAction from '../../actions/ProductAction';
import * as CategoryActionTwo from '../../actions/CategoriesActionTwo';
import getCategoriesTwo from "../../actions/CategoriesActionTwo";

class SubCategories extends Component {

  constructor(props) {
    super(props);


    this.state = {
      subCategories: [],
      category: this.props.navigation.state.params.category
    }
  }

  componentDidMount() {
    this.getSubcats();
  }

  _keyExtractor = (item, index) => item.id;

  getSubcats = () => {
    getCategoriesTwo(this.state.category.id).then((response) => {
      this.setState({
        subCategories: response.data
      });
      console.log(response.data);
      if (this.state.subCategories.length === 0) {
        this.props.navigation.navigate("Products", {product: this.state.category});
      }
    })
  };
  render() {

    //const { navigate } = this.props.navigation;
    //const { category } = this.props;

    const Items = <FlatList contentContainerStyle={styles.list} numColumns={2}
      data={this.state.subCategories || []}
      keyExtractor={this._keyExtractor}
      renderItem={({ item }) =>
      <TouchableHighlight style={{width:'50%'}} onPress={() => {
        this.setState({category: item}, () => {
          this.getSubcats();
        });
      }} underlayColor="white">
        <View style={styles.view} >
          <Image style={styles.image} source={item.image !== null ? {uri: item.image.src} : require('../../../assets/img_placeholder.png')} />
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </TouchableHighlight>
      }
    />;
    return (
      <ScrollView>
        {this.state.subCategories.length ? Items :
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
		subCategories: state.subCategories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		ProductAction: bindActionCreators(ProductAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategories);
