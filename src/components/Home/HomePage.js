import React from "react";
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Constants from "../../constants/Constants";
import axios from "axios";
import * as types from "../../constants/ActionTypes";
import * as CategoriesAction from "../../actions/CategoriesAction";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingAnimation from "../../img/cart-loading.gif";

class HomePage extends React.Component {


    componentDidMount() {
        this.props.CategoriesAction.getCategories();

    }

    _keyExtractor = (item, index) => item.id;

    render() {
        const { navigate } = this.props.navigation;
        const { categories } = this.props;
        console.log(this.props);

        const Items = <FlatList contentContainerStyle={styles.list} numColumns={1}
                                data={categories || []}
                                keyExtractor={this._keyExtractor}
                                renderItem={({ item }) =>
                                    <TouchableHighlight style={{width:'50%'}} onPress={() => navigate("Products", { product: item })} underlayColor="white">
                                        <View style={styles.view} >
                                            <Image
                                                resizeMode={'contain'}
                                                source={ item.image !== null ? {uri: item.image.src} : require('../../../assets/img_0.png')} style={styles.image}
                                            />
                                            <Text style={styles.text}>{item.name}</Text>
                                        </View>
                                    </TouchableHighlight>
                                }
        />;
        return (
            <View>
                <ScrollView
                    scrollEventThrottle={10}
                    pagingEnabled
                    style={{marginBottom: 10, marginTop: 25}}
                >
                    {this.props.categories.length ? Items :
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={styles.loader} source={LoadingAnimation}/>
                        </View>
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        padding: 10
    },
    sliderImage: {
        height: 350,
        width: 350
    },
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
        categories: state.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CategoriesAction: bindActionCreators(CategoriesAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
