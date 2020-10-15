import React from "react";
import {
    StatusBar,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    ToastAndroid,
    BackHandler
} from "react-native";


import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import { Container, Content, Footer, FooterTab, Button } from 'native-base';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight+20;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
// import Backgroundsvg from "../assets/images/background/AgendaBig.svg";
const backgroundimg = require('../assets/Agenda/AgendaBG.png');
const agendaimg = require('../assets/Agenda/Agenda.png');
//import Logo from '../assets/icon/icon-Home-3.svg';
//import { Svg } from 'react-native-svg';
import homeicon2 from '../assets/icon/icon-Home-1.png';
import lottoicon1 from '../assets/icon/icon-Lotto-0.png';
import mapicon1 from '../assets/icon/icon-Map-0.png';
import qaicon1 from '../assets/icon/icon-QA-0.png';
import qricon1 from '../assets/icon/icon-QR-0.png';
import surveyicon1 from '../assets/icon/icon-Survey-0.png';
class Home extends React.Component {
    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }



    handleBackButton() {
        // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    render() {

        return (
            <Container>
                <ScrollView >
                    <View >
                        <Image style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT+80   }} resizeMode='cover' source={backgroundimg} />
                    </View>
                    <View style={{flex: 1, paddingLeft:5,
                                    alignItems: 'center',
                                    height: SCREEN_HEIGHT+30, marginLeft:0,
                                    justifyContent: 'center', marginTop:-(SCREEN_HEIGHT+100)}} >
                        <Image style={{flex: 1, width: SCREEN_WIDTH+20}} resizeMode='contain' source={agendaimg} />
                    </View>
                    
                </ScrollView>
                <Footer>
                    <FooterTab style={{ backgroundColor: "white" }}>
                        <Button>
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={homeicon2} />

                        </Button>
                        <Button onPress={() => this.props.navigation.navigate(
                            "Map"
                        )}>
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={mapicon1} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate(
                            "ReadQR"
                        )}>
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={qricon1} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate(
                            "Question"
                        )}>
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={qaicon1} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate(
                            "Lotto"
                        )}>
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={lottoicon1} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate(
                            "Form"
                        )}>
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={surveyicon1} />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container >

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
