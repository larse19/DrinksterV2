import React from 'react';
import {View, Text, TouchableWithoutFeedback, SafeAreaView} from 'react-native'
import {buttons} from '../styles/styles'

function BackButton(props: any) {
    return (
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
            <SafeAreaView style={[buttons.backButton, props.style]}>
                    <Text style={{color: 'white',  fontSize: 20, fontWeight: '600'}}>Back</Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default BackButton;