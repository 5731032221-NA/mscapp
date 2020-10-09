import React from "react";
import {
    StatusBar,
    TextInput,
    Text,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
    Dimensions,
    AsyncStorage
} from "react-native";
import * as firebase from 'firebase';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import { Button } from 'native-base';
import firebaseConfig from '../firebase.config'
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const backgroundimg = require('../assets/images/background/Register.jpg');

class Login extends React.Component {
    constructor(props) {
        super(props);

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.state = {
            loginemail: "",
            userdata: {
                Title: "",
                Name: "",
                Surname: "",
                Company: "",
                Position: "",
                Email: ""
            },
            islogin: false
        };


    }


    async login(email) {

        if (email == "") {

            this.setState({
                islogin: true,
                userdata: {
                    Title: "นาย",
                    Name: "ณพล",
                    Surname: "อยรังสฤษฎ์กูล",
                    Company: "Metro Systems Co.",
                    Position: "Developer",
                    Email: "naphoaya@metrosystems.co.th",
                    ID: "a@gmailcom"
                }
            })
            this.props.updatePersona({
                Title: "นาย",
                Name: "ณพล",
                Surname: "อยรังสฤษฎ์กูล",
                Company: "Metro Systems Co.",
                Position: "Developer",
                Email: "naphoaya@metrosystems.co.th",
                ID: "a@gmailcom"
            });

        } else {
            firebase.database().ref('exhibitors/' + email.replace(".", "").toLowerCase()).on('value', (snapshot) => {
                const data = snapshot.val();
                console.log("exhibitor: ", data);
                if (data === null) {
                    alert('Not found email');
                } else {
                    this.setState({
                        islogin: true,
                        userdata: {
                            Title: data.Title,
                            Name: data.Name,
                            Surname: data.Surname,
                            Company: data.Company,
                            Position: data.Position,
                            Email: data.Email
                        }
                    })

                    this.props.updatePersona({
                        Title: data.Title,
                        Name: data.Name,
                        Surname: data.Surname,
                        Company: data.Company,
                        Position: data.Position,
                        Email: data.Email,
                        ID: email.replace(".", "").toLowerCase()
                    });
                }

            });


        }

    }

    render() {

        return (
            <ScrollView keyboardShouldPersistTaps='handled' >
                <View style={{ alignItems: 'center', height: SCREEN_HEIGHT, width: SCREEN_WIDTH }} >
                    <Image style={{ position: 'absolute', width: SCREEN_WIDTH, height: SCREEN_HEIGHT }} source={backgroundimg} />
                    <View style={{ marginTop: SCREEN_HEIGHT * 0.4, width: SCREEN_WIDTH * 0.8, backgroundColor: "blue", borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginLeft: (SCREEN_WIDTH * 0.05) }}>Please verify your email</Text>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'center',
                            alignItems: 'center', display: 'flex', borderRadius: 50
                        }}>

                            <View >
                                <TextInput
                                    style={{ borderTopLeftRadius: 50, borderBottomLeftRadius: 50, width: SCREEN_WIDTH * 0.7, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
                                    value={this.state.loginemail}
                                    onChangeText={(loginemail) => { this.setState({ loginemail }) }}
                                    placeholder='   your@gmail.com'
                                    keyboardType='web-search'
                                    // onSubmitEditing={() => { this._fetchResults() }}
                                    ref='searchBar'
                                />

                            </View>
                            <TouchableHighlight style={{ borderTopRightRadius: 50, borderBottomRightRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }} onPress={() => { this.login(this.state.loginemail) }} underlayColor='transparent'>
                                <Text style={{ color: "white" }}>Ok</Text>
                            </TouchableHighlight>


                        </View>
                        {this.state.islogin &&
                            <View>
                                <Text style={{ color: 'white' }}>Is your personal Info?</Text>
                                <Text style={{ color: 'white' }}>{this.state.userdata.Title} {this.state.userdata.Name} {this.state.userdata.Surname}</Text>
                                <Text style={{ color: 'white' }}>{this.state.userdata.Position}</Text>
                                <Text style={{ color: 'white' }}>{this.state.userdata.Company}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button style={{ width: SCREEN_WIDTH * 0.2, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ islogin: false })} >
                                        <Text style={{ color: 'white' }}>No</Text>
                                    </Button>

                                    <View style={{ width: SCREEN_WIDTH * 0.1 }}>{/* space between button */}</View>
                                    <Button style={{ width: SCREEN_WIDTH * 0.2, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }} onPress={() => this.props.navigation.navigate(
                                        "Home"
                                    )} ><Text style={{ color: 'white' }}>Yes</Text></Button>
                                </View>
                            </View>
                        }

                        <View>
                        </View>
                    </View>
                </View >
            </ScrollView>

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
)(Login);
