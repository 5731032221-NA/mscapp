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
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
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
            booth: '',
            booths: [],
            questionlist: []
        };
        // firebase.database().ref('boothmaster').set([{ BoothID: "Booth1", BoothName: "Booth1Name", BoothDescription: "Booth1Description", QRCOdeURL: 'https://www.kaspersky.com' },
        // { BoothID: "Booth2", BoothName: "Booth2Name", BoothDescription: "Booth2Description", QRCOdeURL: 'http://devbanban.com/' }]);
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        // this.fetch_firebase();
    }
    componentDidMount() {
    // fetch_firebase() {
        firebase.database().ref('boothmaster').on('value', (snapshot) => {
            const data = snapshot.val();
            console.log("boothmaster: ", data);
            let booths = []
            data.map((boothData) => {
                console.log(boothData.BoothName);
                booths.push({ label: boothData.BoothName, value: boothData.BoothName });
            });
            this.setState({
                booths: booths
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
            BoothName: this.state.booth,
            User: (this.props.persona.ID),
            TimeStamp: time,
            Question: this.state.questiontext,
            questionlist: []
        };
        firebase.database().ref('Questionare/' + this.state.booth+'/'+time).set(postData);
        this.setState({ questiontext: '' })
    }

    handleBackButton() {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    selectBooth(booth) {
        this.setState({ booth: booth,questionlist: [] });
        console.log("selectedbooth", booth);
        this.loadQuestion(booth);
    }

    loadQuestion(booth) {
        console.log("this.state.booth",booth);
        firebase.database().ref('Questionare/' + booth).on('value', (snapshot) => {
            const data = snapshot.val();
            var sortquestionare = []
            
            if (data) {
                // console.log(data)

                snapshot.forEach(function (childSnapshot) {
                    // key will be the auth ID for each user
                    var key = childSnapshot.key;
                    var mechanicName = snapshot.child(key).val();
                    console.log('mechanicName',mechanicName)
                    sortquestionare.push(mechanicName);
                });


                // data.map((questionare) => {
                //     sortquestionare.push(questionare)

                // });
                console.log('sortquestionare',sortquestionare)
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
            }



        });
    }

    render() {

        return (

            <Container>

                <ScrollView>
                    <View style={{ marginTop: (SCREEN_HEIGHT * 0.1), alignItems: 'center', justifyContent: 'center' }}>



                        <Picker
                            style={{
                                height: 50, width: (SCREEN_WIDTH * 0.9),
                                flex: 2
                            }}
                            selectedValue={this.state.booth}
                            onValueChange={(value) => this.selectBooth(value)}
                        >


                            <Picker.Item key={'unselectable'} label={'Please select booth'} value={0} />

                            {this.state.booths.map((c) => <Picker.Item key={c.label} label={c.label} value={c.label} />)}
                        </Picker>



                        <TextInput style={{ textAlignVertical: "top", height: SCREEN_WIDTH * 0.4, width: SCREEN_WIDTH * 0.8, borderColor: 'black', borderWidth: 1 }}
                            onChangeText={text => this.setState({ questiontext: text })}
                            value={this.state.questiontext}
                            editable={(this.state.booth == '' ? false : true)}
                        ></TextInput>
                        <Button style={{ width: SCREEN_WIDTH * 0.2, justifyContent: 'center' }} onPress={() => this.addQuestion()}><Text style={{ color: 'white' }}>Submit</Text></Button>
                        {this.state.questionlist.map((c) =>
                            <Text style={{ color: 'black' }}>{c.number} {c.question} {c.datetime}</Text>
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
