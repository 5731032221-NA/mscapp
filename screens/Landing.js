import React from "react";
import {
    StatusBar,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    TouchableHighlight
} from "react-native";


import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import { Container, Content, Footer, FooterTab, Button } from 'native-base';
// import * as Application from 'expo-application';


const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const backgroundimg = require('../assets/images/background/LandingPage.png');
console.disableYellowBox = true;
class Home extends React.Component {
    constructor(props) {
        super(props);

    }





    render() {

        return (
            <TouchableHighlight onPress={() => this.props.navigation.navigate(
                "Login"
            )}>

                <Image style={{  height: SCREEN_HEIGHT,width: SCREEN_WIDTH }} source={backgroundimg} />

            </TouchableHighlight >



        );
    }
}

const mapStateToProps = state => {
    return {
        persona: state.reducer.persona
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Actions, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
