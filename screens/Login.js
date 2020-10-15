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
    AsyncStorage,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import * as firebase from 'firebase';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import { Button } from 'native-base';
import firebaseConfig from '../firebase.config';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const backgroundimg = require('../assets/images/background/Register.jpg');

class Login extends React.Component {
    constructor(props) {
        super(props);
        alert("Please Input Your Email");
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
            bgColor: "#3368ac",
            bgColorN: "#183e6d",
            bgColorY: "#183e6d",
        };



    }

    async bgFlag(Color){
        this.setState({bgColor: Color, bgColorN: "#183e6d", bgColorY: "#183e6d"});       
    }
    async bgFlagN(Color, Login){
        this.setState({bgColorN: Color, islogin: Login});  
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
            
             
            firebase.database().ref('exhibitors/' + email.replace(/\./g, "").toLowerCase()).on('value', (snapshot) => {
                const data = snapshot.val();
                console.log("exhibitor: ", data);
                if (data === null) {
                    alert('Cannot Found Your Email');
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
                    });
                    
                    this.props.updatePersona({
                        Title: data.Title,
                        Name: data.Name,
                        Surname: data.Surname,
                        Company: data.Company,
                        Position: data.Position,
                        Email: data.Email,
                        ID: (email.replace(/\./g, "")).toLowerCase()
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
                    <View style={styles.VerifyBg}>
                        <Text style={styles.VerifyTxt}>Please Verify Your Email</Text>
                        <View style={styles.VerifyVw}>
                            <TextInput
                                style={styles.EmailTxt}
                                value={this.state.loginemail}
                                onChangeText={(loginemail) => { this.setState({ loginemail }) }}
                                placeholder='your@email.com'
                                keyboardType='web-search'
                                // onSubmitEditing={() => { this._fetchResults() }}
                                ref='searchBar'
                            />
                            <TouchableOpacity style={[styles.okNormal, { backgroundColor: this.state.bgColor }]}
                                onPress={() => { this.login(this.state.loginemail), this.bgFlag('rgb(232, 154, 62)') }} 
                                onPressOut={() => {this.bgFlag('#3368ac') }}
                                >
                                <Text style={{ color: "white", padding:4 }}> OK  </Text>
                            </TouchableOpacity>

                        </View>
                        {this.state.islogin &&
                            <View style={{paddingLeft:20}}>
                                <Text style={{ color: 'white', fontSize:18, fontWeight: 'bold',paddingBottom:10 }}>Is your personal Info?</Text>
                                <Text style={{ color: 'white', fontSize:15, paddingBottom:5}}>{this.state.userdata.Title} {this.state.userdata.Name} {this.state.userdata.Surname}</Text>
                                <Text style={{ color: 'white', fontSize:15, paddingBottom:5}}>Position:  {this.state.userdata.Position}</Text>
                                <Text style={{ color: 'white', fontSize:15, paddingBottom:30}}>Company:  {this.state.userdata.Company}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom:25 }}>
                                    <TouchableOpacity style={[styles.btnNormal, { backgroundColor: this.state.bgColorN }]} 
                                        onPress={()=>{ this.bgFlagN("rgb(232, 154, 62)", false) }} 
                                        >
                                        <Text style={{ color: 'white', fontSize:16 }}>NO</Text>
                                    </TouchableOpacity>

                                    <View style={{ width: SCREEN_WIDTH * 0.1 }}>{/* space between button */}</View>
                                    <TouchableOpacity style={[styles.btnNormal, { backgroundColor: this.state.bgColorY }]} 
                                        onPress={()=>{ this.setState({bgColorY: "rgb(232, 154, 62)"}),this.props.navigation.navigate("Home")   }} 
                                        >
                                        <Text style={{ color: 'white', fontSize:16  }}>YES</Text>
                                    </TouchableOpacity>
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

const styles = StyleSheet.create({
    VerifyBg:{
        marginTop: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.8, 
        backgroundColor: "#183e6d", borderRadius: 10
    },
    VerifyVw:{
        flexDirection: 'row', justifyContent: 'flex-start',
        paddingBottom:25, paddingLeft:20, paddingTop:10,
        alignItems: 'center', display: 'flex', borderRadius: 50
    },
    VerifyTxt:{
        color: 'white', marginLeft: (SCREEN_WIDTH * 0.05), 
        paddingTop: 25, paddingBottom:5, fontSize:18, fontWeight: 'bold'
    },
    EmailTxt:{
        borderTopLeftRadius: 50, borderBottomLeftRadius: 50, paddingLeft:30,
        width: SCREEN_WIDTH*0.6, height:28,  backgroundColor: 'white'
    },
    okNormal: {
        borderTopRightRadius: 50, borderBottomRightRadius: 50, 
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#3368ac'
    }, 
    btnNormal: {
        width: SCREEN_WIDTH * 0.2, borderRadius: 50, paddingBottom:5, paddingTop:4,
        alignItems: 'center', justifyContent: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0)', borderColor:'#ffffff', borderWidth:1
    },
  });
  
  
 

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
