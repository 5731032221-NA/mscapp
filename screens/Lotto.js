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
// import firebaseConfig from '../firebase.config'
import * as firebase from 'firebase';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import { Container, Content, Footer, FooterTab, Button } from 'native-base';

import homeicon1 from '../assets/icon/icon-Home-0.png';
import lottoicon2 from '../assets/icon/icon-Lotto-1.png';
import mapicon1 from '../assets/icon/icon-Map-0.png';
import qaicon1 from '../assets/icon/icon-QA-0.png';
import qricon1 from '../assets/icon/icon-QR-0.png';
import surveyicon1 from '../assets/icon/icon-Survey-0.png';
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;


class Lotto extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.persona)
        console.log("id",this.props.persona.ID)

        this.state = {
            lottos: [],
            // message: '',
        };
        // firebase.database().ref('lotto/' + 'a@gmailcom').set([
        //     { lotto: { number: 1000, status: 'Inactive', booth: 'Booth1' } }, { lotto: { number: 200, status: 'Inactive', booth: 'Booth2' } }, { lotto: { number: 30, status: 'Active', booth: 'Booth3' } }, { lotto: { number: 9, status: 'Active', booth: 'Booth4' } },
        //     { lotto: { number: 1001, status: 'Inactive', booth: 'Booth5' } }, { lotto: { number: 5001, status: 'Inactive', booth: 'Booth6' } }, { lotto: { number: 500, status: 'Inactive', booth: 'Booth7' } }, { lotto: { number: 1001, status: 'Active', booth: 'Booth8' } }]
        // );
        // this.fetch_firebase();
    }
    componentDidMount(){
    // fetch_firebase() {
        firebase.database().ref('lotto/' + (this.props.persona.ID)).on('value', (snapshot) => {
            const data = snapshot.val();
            // console.log("lotto: ", data);
            let lottos = []
            data.map((lottoData) => {
                console.log(lottoData.lotto.number, lottoData.lotto.status);
                if (lottoData.lotto.status == 'Active') {
                    lottos.push({ number: lottoData.lotto.number });
                }

            });
            this.setState({
                lottos: lottos,
            });
            // console.log("lottos", lottos)

        });
    }

    resetlotto() {
        firebase.database().ref('lotto/' + (this.props.persona.ID)).set([
            { lotto: { number: 1000, status: 'Inactive', booth: 'Booth1' } }, { lotto: { number: 200, status: 'inactive', booth: 'Booth2' } }, { lotto: { number: 30, status: 'Active', booth: 'Booth3' } }, { lotto: { number: 9, status: 'Active', booth: 'Booth4' } },
            { lotto: { number: 1001, status: 'Inactive', booth: 'Booth5' } }, { lotto: { number: 5001, status: 'Inactive', booth: 'Booth6' } }, { lotto: { number: 500, status: 'Inactive', booth: 'Booth7' } }, { lotto: { number: 1001, status: 'Active', booth: 'Booth8' } }]
        );

        firebase.database().ref('lotto/' + (this.props.persona.ID)).on('value', (snapshot) => {
            const data = snapshot.val();
            console.log("lotto: ", data);
            let lottos = []
            data.map((lottoData) => {
                console.log(lottoData.lotto.number, lottoData.lotto.status);
                if (lottoData.lotto.status == 'Active') {
                    lottos.push({ number: lottoData.lotto.number });
                }

            });
            this.setState({
                lottos: lottos
            });

        });
    }


    handleBackButton() {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    render() {

        return (

            <Container>

                <ScrollView>
                    <Button onPress={() => this.resetlotto()} style={{ marginTop: 0.1 * SCREEN_HEIGHT }}><Text>Reset</Text></Button>
                    <View style={{ flexWrap: 'wrap', height: SCREEN_HEIGHT * 0.8 }}>
                        {this.state.lottos.map((c) =>

                            <View style={{ width: SCREEN_WIDTH * 0.5, height: SCREEN_HEIGHT * 0.2, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center' }} key={c.number}>
                                <Button style={{ backgroundColor: 'red', width: SCREEN_WIDTH * 0.1, justifyContent: 'center' }}><Text style={{ color: 'black' }}>{c.number}</Text></Button></View>



                        )}
                    </View>

                </ScrollView>
                <Footer>
                    <FooterTab style={{ backgroundColor: "white" }}>
                        <Button onPress={() => this.props.navigation.navigate(
                            "Home"
                        )}>
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={homeicon1} />

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
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={lottoicon2} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate(
                            "Form"
                        )}>
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={surveyicon1} />
                        </Button>
                    </FooterTab>
                </Footer>
                {/* <NotificationPopup ref={ref => this.popup = ref} /> */}
            </Container>


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
)(Lotto);
