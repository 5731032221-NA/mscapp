import React, { Fragment } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    StatusBar, Platform,
    TouchableHighlight
} from "react-native";
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';
import SafeAreaView from "react-native-safe-area-view";
import { Container, Footer, FooterTab, Button } from 'native-base';
import firebaseConfig from '../firebase.config'
import * as firebase from 'firebase';
import { AirbnbRating } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import homeicon1 from '../assets/icon/icon-Home-0.png';
import lottoicon1 from '../assets/icon/icon-Lotto-0.png';
import mapicon1 from '../assets/icon/icon-Map-0.png';
import qaicon1 from '../assets/icon/icon-QA-0.png';
import qricon2 from '../assets/icon/icon-QR-1.png';
import surveyicon1 from '../assets/icon/icon-Survey-0.png';
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 30 : StatusBar.currentHeight + 20;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import CheckInBG from '../assets/Checkin/CheckInBG.png';
import CheckIn from '../assets/Checkin/CheckIn.png';

class ReadQR extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scanned: false,
            qrurl: '',
            hasCameraPermission: null,
            pic: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Blank_button.svg/1124px-Blank_button.svg.png',
            showDialog: false,
            rating: 0,
            booth: '',
            isLoginqr: false
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

    }

    async UNSAFE_componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" }
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        console.log(data)

        if (data == 'checkin') {
            this.setState({ isLoginqr: true })
        } else {
            firebase.database().ref('boothmaster').on('value', (snapshot) => {
                const boothmaster = snapshot.val();
                console.log(boothmaster)
                boothmaster.map((boothData) => {
                    if (boothData.QRCodeURL == data) {
                        console.log("boothData.BoothName", boothData.BoothName)
                        this.setState({ scanned: true, qrurl: data, booth: boothData.BoothName, BoothID: boothData.BoothID });
                    }
                });


            });
        }
    };

    writeNewPost(rating, user, booth) {
        var date = new Date()
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hours = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        let time = year + '' + month + '' + day + '' + hours + '' + min + '' + sec;
        var date = new Date().getDate();
        var postData = {
            BoothID: booth,
            User: user,
            Scored: rating,
            TimeStamp: time
        };

        firebase.database().ref('boothrating/' + user + time).set(postData);
    }

    submitrating() {
        console.log("hoo")
        console.log('rating', this.state.rating);
        this.writeNewPost(this.state.rating, (this.props.persona.ID), this.state.booth)

        firebase.database().ref('lotto/' + (this.props.persona.ID)).on('value', (snapshot) => {
            const data = snapshot.val();
            console.log("lotto: ", data);
            var newlotto = []
            data.map((lottoData) => {
                console.log(lottoData.lotto.booth, this.state.BoothID);
                if (lottoData.lotto.booth == this.state.BoothID) {
                    console.log("to active", lottoData.lotto.booth)
                    newlotto.push({ lotto: { number: lottoData.lotto.number, status: 'Active', booth: lottoData.lotto.booth } })
                } else {
                    newlotto.push(lottoData)
                }

            });
            console.log("newlotto", newlotto)

            firebase.database().ref('lotto/' + (this.props.persona.ID)).set(newlotto);


        });

    }

    render() {



        if (this.state.hasCameraPermission === null) {
            return <Text style={{ display: "none" }} >Requesting for camera permission</Text>;
        }
        if (this.state.hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <Text style={{ display: "none" }}>Requesting for camera permission</Text>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <Container>
                    <Fragment>
                        <SafeAreaView style={{ flex: 1, backgroundColor: 'gray' }}>
                        {this.state.isLoginqr &&
                                <TouchableHighlight onPress={() => {
                                    this.props.navigation.navigate(
                                        "Home"
                                    );
                                    this.setState({ isLoginqr: false })
                                }}>

                                    <View style={{ width: SCREEN_WIDTH, height: (SCREEN_HEIGHT - STATUS_BAR_HEIGHT) }}>
                                        <Image style={{ width: SCREEN_WIDTH, height: (SCREEN_HEIGHT - STATUS_BAR_HEIGHT) }} source={CheckInBG} />
                                        <Image style={{ position: 'absolute', top: ((SCREEN_HEIGHT-STATUS_BAR_HEIGHT)/2) - SCREEN_WIDTH * 0.25,right: SCREEN_WIDTH * 0.25, width: SCREEN_WIDTH * 0.5, height: (SCREEN_WIDTH * 0.5) }} source={CheckIn} />
                                    </View>
                                </TouchableHighlight >
                            }

                            {(!this.state.isLoginqr && !this.state.scanned) &&
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                    }}>
                                    <BarCodeScanner
                                        onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                                        style={StyleSheet.absoluteFillObject}
                                    />
                                </View>
                            }
                            {(!this.state.isLoginqr && this.state.scanned) &&
                                <View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute' }}>
                                        <Text style={{ marginTop: SCREEN_HEIGHT * 0.3, color: 'white' ,fontSize: SCREEN_HEIGHT, fontWeight: 'bold'}}>{this.state.booth}</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: SCREEN_HEIGHT * 0.4 }}>

                                        <View style={{ height: SCREEN_HEIGHT * 0.1 }}>
                                            <AirbnbRating
                                                count={5}
                                                reviews={["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"]}
                                                defaultRating={0}
                                                size={20}
                                                onFinishRating={rating => this.setState({ rating: rating })}
                                            />
                                        </View>
                                        {Platform.OS != 'ios' &&
                                            <View style={{ top: (SCREEN_HEIGHT * -0.0015), position: 'absolute' }}>
                                                <AirbnbRating
                                                    disabled={true}
                                                    count={5}
                                                    defaultRating={0}
                                                    rating={0}
                                                    size={20}
                                                />
                                            </View>
                                        }
                                        <Button style={{ width: SCREEN_WIDTH * 0.2, marginLeft: SCREEN_WIDTH * 0.4, marginTop: SCREEN_HEIGHT * 0.1, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange', }} onPress={() => {
                                            this.submitrating();
                                            this.setState({ scanned: false });
                                        }} ><Text style={{ color: 'green' }}>Submit</Text></Button>
                                    </View>
                                </View>
                            }
                        </SafeAreaView>
                    </Fragment>
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
                                <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={qricon2} />
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
                </Container>
            );
        }

    }



}

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
    p_img: {
        height: 70, width: 70, resizeMode: "contain", marginLeft: 20,
    },
    container_top: {
        height: 60,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 4,
    },
    top_text: {
        textAlign: 'center', fontSize: 25, color: "#0054c6", fontFamily: "Prompt"
    },
    container: {
        flex: 1,
        flexDirection: "column"
    }, button: {
        height: 54,
        width: 280,
        backgroundColor: '#0054c6',
        borderColor: '#0054c6',
        borderRadius: 30,
        justifyContent: 'center'
    }, buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    layerTop: {
        flex: 1,
        backgroundColor: opacity
    }, buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    layerCenter: {
        flex: 1,
        flexDirection: "row"
    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    focused: {
        flex: 8,
        borderWidth: 1,
        borderColor: "#00b900"
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 1,
        backgroundColor: opacity
    },
    footers: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: "space-between",
    },
    foot_icon: {
        width: 30,
        height: 30,
        resizeMode: "contain"
    }
});

function handleErrors(response) {
    if (!response.ok) {
        count = 0;
    }
    return response;
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
)(ReadQR);
