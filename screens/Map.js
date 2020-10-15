import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    StatusBar,
    Linking,
    TouchableHighlight,
} from "react-native";

import MapView from 'react-native-maps';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import { Container, Content, Footer, FooterTab, Button } from 'native-base';
import homeicon1 from '../assets/icon/icon-Home-0.png';
import lottoicon1 from '../assets/icon/icon-Lotto-0.png';
import mapicon2 from '../assets/icon/icon-Map-1.png';
import qaicon1 from '../assets/icon/icon-QA-0.png';
import qricon1 from '../assets/icon/icon-QR-0.png';
import surveyicon1 from '../assets/icon/icon-Survey-0.png';
import { NavigationEvents } from "react-navigation";
const backgroundimg = require('../assets/Map/AgendaBG.png');
import boothmap from '../assets/Map/Booth.png';
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight+20;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
const latLng = '13.695955,100.673748';
const label = 'Custom Label';
const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
});

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapstate: 0,
            loading: true,
            region: {
                latitude: 13.695955,
                longitude: 100.673748,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }
        };
        
    }


    markerClick() {
        console.log("B")
        Linking.openURL(url)
    }

    render() {




        const styles = StyleSheet.create({
            container: {
                flex: 1,
                marginTop: (STATUS_BAR_HEIGHT -20)*6,
                height: SCREEN_HEIGHT - ((STATUS_BAR_HEIGHT-20)),
                width: SCREEN_WIDTH,
                justifyContent: 'flex-end',
                alignItems: 'center',
            },
            mapStyle: {

                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
            },
            footer: {
                position: "absolute",
                right: 0,
                bottom: 0,

                
            },
            buttonstyleactive: {
                marginTop:50,
                backgroundColor: 'orange',
                paddingLeft:30,
                paddingRight:30,
                borderRadius:50,
                borderWidth:1,
                borderColor:'#ffffff'
            },
            buttonstyleinactive: {
                marginTop:50,
                backgroundColor:'rgba(0, 0, 0, 0 )',
                paddingLeft:30,
                paddingRight:30,
                borderRadius:50,
                borderWidth:1,
                borderColor:'#ffffff'
            }
        });
        return (


            <Container>
                <ScrollView >
                    <View style={{ height: (STATUS_BAR_HEIGHT -20), flexDirection: 'row', width: SCREEN_WIDTH, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <Image
                            style={{
                                resizeMode: "cover",
                                width: SCREEN_WIDTH , 
                                height: (STATUS_BAR_HEIGHT -20)*10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            source={backgroundimg}
                            ></Image>
                            <View style={{flexDirection: 'row', marginTop:-((STATUS_BAR_HEIGHT -20)),  justifyContent: 'center'}}>
                                <Button style={this.state.mapstate == 0 ? styles.buttonstyleactive : styles.buttonstyleinactive} onPress={() => this.setState({ mapstate: 0 })} ><Text style={{ color: 'white' }}>MSC Map</Text></Button>
                                <View style={{ width: SCREEN_WIDTH * 0.1 }}></View>
                                <Button style={this.state.mapstate == 0 ? styles.buttonstyleinactive : styles.buttonstyleactive} onPress={() => this.setState({ mapstate: 1 })} ><Text style={{ color: 'white' }}>Event Map</Text></Button></View>
                            </View>
                        </View>
                    {(this.state.mapstate == 0) &&
                        <View style={styles.container}>

                            <MapView initialRegion={this.state.region} onPress={() => Linking.openURL(url)} onPress={() => Linking.openURL(url)} style={styles.mapStyle} >
                                <MapView.Marker

                                    coordinate={{
                                        "latitude": this.state.region.latitude,
                                        "longitude": this.state.region.longitude
                                    }}
                                    title={"Open in Google Maps"}
                                    onPress={() => Linking.openURL(url)}
                                    draggable >
                                </MapView.Marker>
                            </MapView>
                        </View>
                    }
                    {!(this.state.mapstate==0) &&
                        <Image
                            style={{ width: SCREEN_WIDTH, height: (SCREEN_HEIGHT- STATUS_BAR_HEIGHT*4) }}
                            source={boothmap}
                        />
                    }
                  
                </ScrollView>
                <Footer>
                    <FooterTab style={{ backgroundColor: "white" }}>
                        <Button onPress={() => this.props.navigation.navigate(
                            "Home"
                        )}>
                            {/* <Text>Home</Text> */}
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={homeicon1} />

                        </Button>
                        <Button onPress={() => this.props.navigation.navigate(
                            "Map"
                        )}>
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={mapicon2} />
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
)(Map);
