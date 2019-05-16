import React from "react";
import {StyleSheet, Text, View, Dimensions, Image} from "react-native";


class LoadingPage extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Home');
        }, 2000);
    };

    render() {
        console.log(this.props);
        return (
            <View style={styles.contain}>
                    <Image
                      resizeMode={'contain'}
                      source={ require('../../../assets/mynetsale_logo.png') }
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'black'
    }
});

export default LoadingPage;