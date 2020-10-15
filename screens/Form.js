
import React from "react";
import {
    Image,
    SafeAreaView,
    StatusBar
} from "react-native";
import { WebView } from 'react-native-webview';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import { Container, Footer, FooterTab, Button } from 'native-base';
import homeicon1 from '../assets/icon/icon-Home-0.png';
import lottoicon1 from '../assets/icon/icon-Lotto-0.png';
import mapicon1 from '../assets/icon/icon-Map-0.png';
import qaicon1 from '../assets/icon/icon-QA-0.png';
import qricon1 from '../assets/icon/icon-QR-0.png';
import surveyicon2 from '../assets/icon/icon-Survey-1.png';
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 30 : StatusBar.currentHeight+20;
class FormComponent extends React.Component {
    constructor(props) {
        super(props);
    }

   



    render() {

        return (

            <Container>
                 <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://forms.office.com/Pages/ResponsePage.aspx?id=nIQHzS3vvkWtKzBH1IP40MxTO3QVq4VFmNG14rK9FhZUMVBRWFBPMlRHMFNCSFdTNjQyMk40S0w2TC4u' }}
        style={{ flex: 1}}
      />
    </SafeAreaView>
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
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={lottoicon1} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate(
                            "Form"
                        )}>
                            <Image style={{ width: STATUS_BAR_HEIGHT, height: STATUS_BAR_HEIGHT }} source={surveyicon2} />
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
)(FormComponent);
