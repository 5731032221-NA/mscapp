import React from "react";
import {
    StatusBar,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    ToastAndroid,
    FlatList,
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
const rewardimg = require('../assets/Lotto/iphone.png');
const rewardtxt = require('../assets/Lotto/BIG-REWARD.png');
const rewardbg = require('../assets/Lotto/BG-Lucky.png');
const backgroundimg = require('../assets/images/background/Register.jpg');


const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight+20;
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
    UNSAFE_componentWillMount(){
    // fetch_firebase() {
        firebase.database().ref('lotto/' + (this.props.persona.ID)).on('value', (snapshot) => {
            const data = snapshot.val();
            // console.log("lotto: ", data);
            firebase.database().ref('lotto/' + (this.props.persona.ID)).set([
                { lotto: { number: 1000, status: 'Active', booth: 'Booth1' } }, { lotto: { number: 200, status: 'Active', booth: 'Booth2' } }, { lotto: { number: 30, status: 'Active', booth: 'Booth3' } }, { lotto: { number: 9, status: 'Active', booth: 'Booth4' } },
                { lotto: { number: 1001, status: 'Active', booth: 'Booth5' } }, { lotto: { number: 5001, status: 'Active', booth: 'Booth6' } }, { lotto: { number: 500, status: 'Active', booth: 'Booth7' } }, { lotto: { number: 1008, status: 'Active', booth: 'Booth8' } }
                , { lotto: { number: 1002, status: 'Active', booth: 'Booth9' } }, { lotto: { number: 1004, status: 'Active', booth: 'Booth10' } }, { lotto: { number: 1006, status: 'Active', booth: 'Booth11' } }, { lotto: { number: 1007, status: 'Active', booth: 'Booth12' } }
                , { lotto: { number: 1003, status: 'Active', booth: 'Booth13' } }, { lotto: { number: 1005, status: 'Active', booth: 'Booth14' } }]
            );
            let lottos = []
            let a=0
            data.map((lottoData) => {
                console.log(lottoData.lotto.number, lottoData.lotto.status);
                if (lottoData.lotto.status == 'Active') {
                    a = a+1;
                    lottos.push({ number: lottoData.lotto.number, booth: lottoData.lotto.booth, ct:a });
                }

            });
            this.setState({
                lottos: lottos,
            });
            // console.log("lottos", lottos)

        });
        
    }

    resetlotto() {
        

        firebase.database().ref('lotto/' + (this.props.persona.ID)).on('value', (snapshot) => {
            const data = snapshot.val();
            console.log("lotto: ", data);
            let lottos = []
            let a = 0
            data.map((lottoData) => {
                console.log(lottoData.lotto.number, lottoData.lotto.status);
                if (lottoData.lotto.status == 'Active') {
                    a = a+1;
                    lottos.push({ number: lottoData.lotto.number, booth: lottoData.lotto.booth, ct:a });
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
                <Image style={{ position: 'absolute', width: SCREEN_WIDTH, height: SCREEN_HEIGHT, resizeMode: "stretch"  }} source={backgroundimg} />

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
                        
                        <Image style={{
                                resizeMode: "contain",
                                height: STATUS_BAR_HEIGHT*1.5,
                            }}  source={rewardtxt} ></Image>
                        <Image style={{
                                resizeMode: "contain",
                                height: STATUS_BAR_HEIGHT*4, marginTop:-25,  
                            }}  source={rewardimg} ></Image>    
                    </View>    
                    {/*<Button onPress={() => this.resetlotto()} style={{ marginTop: 0.1 * SCREEN_HEIGHT }}><Text>Reset</Text></Button>
                    */}
                    <View style={{height: SCREEN_HEIGHT,
                                width:SCREEN_WIDTH ,
                                flex: 1,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between', paddingBottom:15}}>
                      
                        
                        {this.state.lottos.map((c) =>
                        <View style={{ width: SCREEN_WIDTH*0.5, height:10,
                            justifyContent:'space-between',
                            alignItems:'center', paddingBottom:SCREEN_HEIGHT*0.085, 
                        }}  key={c.number}>          
                            <View style={{paddingTop:SCREEN_WIDTH*0.005}}>
                                            
                                <Button style={{ backgroundColor: '#f7941d', width: SCREEN_WIDTH * 0.3, 
                                                borderColor: '#ffffff', borderWidth:1, borderRadius:40,
                                                justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#ffffff', fontWeight:'bold', alignItems:'center', fontSize:18}}>{c.number}</Text>
                                </Button>
                                
                            </View>
                        </View>   
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
