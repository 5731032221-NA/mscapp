import React from "react";
import {
    StatusBar,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    ToastAndroid
} from "react-native";
import moment from 'moment';
import * as firebase from 'firebase';
import firebaseConfig from '../firebase.config'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import { Container, Footer, FooterTab, Button } from 'native-base';

// import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-community/picker';
import homeicon1 from '../assets/icon/icon-Home-0.png';
import lottoicon1 from '../assets/icon/icon-Lotto-0.png';
import mapicon1 from '../assets/icon/icon-Map-0.png';
import qaicon2 from '../assets/icon/icon-QA-1.png';
import qricon1 from '../assets/icon/icon-QR-0.png';
import surveyicon1 from '../assets/icon/icon-Survey-0.png';
import { TextInput } from "react-native-gesture-handler";
import RNPickerSelect from 'react-native-picker-select';
const bgimg = require('../assets/Question/BG.png');
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight + 20;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;


class Question extends React.Component {
    constructor(props) {
        super(props);
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            console.log("not")
        }
        this.state = {
            questiontext: '',
            session: '',
            sessions: [],
            questionlist: [],
            // placeholder: {label:"Select session",value:null}
        };
        // firebase.database().ref('sessionmaster').set([{ sessionID: "session1", sessionName: "session1Name", sessionDescription: "session1Description", QRCOdeURL: 'https://www.kaspersky.com' },
        // { sessionID: "session2", sessionName: "session2Name", sessionDescription: "session2Description", QRCOdeURL: 'http://devbanban.com/' }]);
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // this.fetch_firebase();
    }
    componentDidMount() {
        // fetch_firebase() {
        firebase.database().ref('sessionmaster').on('value', (snapshot) => {
            const data = snapshot.val();
            console.log("sessionmaster: ", data);
            let sessions = []
            data.map((sessionData) => {
                console.log(sessionData.sessionName);
                sessions.push({ label: sessionData.sessionName, value: sessionData.sessionName });
            });
            this.setState({
                sessions: sessions
            });
        });
    }

    addQuestion() {
        var date = new Date()
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        var hours = ("0" + date.getHours()).slice(-2);
        var min = ("0" + date.getMinutes()).slice(-2);
        var sec = ("0" + date.getSeconds()).slice(-2);
        let time = year + '' + month + '' + day + '' + hours + '' + min + '' + sec;
        var date = new Date().getDate();
        var postData = {
            sessionName: this.state.session,
            User: (this.props.persona.ID),
            TimeStamp: time,
            Question: this.state.questiontext,
            questionlist: []
        };
        firebase.database().ref('Questionare/' + this.state.session + '/' + time).set(postData);
        this.setState({ questiontext: '' })
    }

    handleBackButton() {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    selectsession(session) {
        this.setState({ session: session });
        console.log("selectedsession", session);
        this.loadQuestion(session);
    }

    loadQuestion(session) {
        console.log("this.state.session", session);
        firebase.database().ref('Questionare/' + session).on('value', (snapshot) => {
            const data = snapshot.val();
            var sortquestionare = []

            if (data) {
                // console.log(data)

                snapshot.forEach(function (childSnapshot) {
                    // key will be the auth ID for each user
                    var key = childSnapshot.key;
                    var mechanicName = snapshot.child(key).val();
                    console.log('mechanicName', mechanicName)
                    sortquestionare.push(mechanicName);
                });


                console.log('sortquestionare', sortquestionare)
                sortquestionare.sort(function (a, b) { return b.TimeStamp - a.TimeStamp });
                let count = 0;
                var questionlist = []
                sortquestionare.map((questionare) => {
                    count++;
                    console.log(questionare.TimeStamp)
                    var datetime = moment(questionare.TimeStamp, 'YYYYMMDDhhmmss')
                    console.log(datetime)
                    var str = datetime.format('Do MMM YYYY - h:mm:ss a');
                    console.log(str)
                    questionlist.push({ number: count, question: questionare.Question, datetime: str })

                });

                this.setState({ questionlist: questionlist })
                console.log(this.state.questionlist)
            } else {
                this.setState({ questionlist: [] })
            }



        });
    }

    render() {

        return (

            <Container>

                <ScrollView>
                    <View style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ position: 'absolute', width: SCREEN_WIDTH, height: SCREEN_HEIGHT + (SCREEN_HEIGHT * 0.05), resizeMode: "stretch" }} source={bgimg} />
                        <Text style={{ position: 'absolute', top: SCREEN_HEIGHT * 0.05, fontSize: 19, fontWeight: 'bold', color: '#ffffdd' }}>Any Questions For The Speaker ?</Text>

                        <Text style={{ marginTop: (-(SCREEN_HEIGHT * 0.2) - (StatusBar.currentHeight) * 2), marginRight: SCREEN_WIDTH * 0.3, fontSize: 19, color: '#0e488f' }}>Please Select Session</Text>
                        <View
                            style={{
                                marginTop: SCREEN_HEIGHT * 0.01,
                                height: 50, width: (SCREEN_WIDTH * 0.8),
                                borderColor: '#0e488f', borderWidth: 1,
                                borderRadius: 5, justifyContent: 'center', alignItems: 'center'
                            }}>


                            <RNPickerSelect
                                onValueChange={(value) => this.selectsession(value)}
                                items={this.state.sessions}
                                placeholder={{ label: "Select session", value: null }}
                            />
                        </View>


                        <TextInput style={{ marginTop: SCREEN_HEIGHT * 0.02, textAlignVertical: "top", height: SCREEN_WIDTH * 0.4, width: SCREEN_WIDTH * 0.8, borderColor: 'black', borderWidth: 1 }}
                            onChangeText={text => this.setState({ questiontext: text })}
                            value={this.state.questiontext}
                        // editable={(this.state.session == '' ? false : true)}
                        ></TextInput>
                        <Button style={{ width: SCREEN_WIDTH * 0.3, justifyContent: 'center', borderRadius: 40, backgroundColor: '#f7941d', marginLeft: 50, marginTop: 20 }}
                            onPress={() => this.addQuestion()}><Text style={{ color: 'white', fontSize: 16 }}>Submit</Text></Button>
                        <View style={{  marginTop: SCREEN_HEIGHT * 0.02 }} >
                            {this.state.questionlist.map((c) =>

                                <Text style={{ color: '#0e488f' }} key={c.number}>{c.number}. {c.question} {c.datetime}</Text>

                            )}
                        </View>

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
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={qaicon2} />
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
)(Question);
