import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import {colors} from '../styles/styles'

const DrinksterTitle = (props: any)  => {
    return (
        <View style={[styles.container, props.style]}>
            <Text style={styles.text}>DRINKSTER</Text>
        </View>
    );
}

export default DrinksterTitle;

const styles = StyleSheet.create({
    container: {
        height:75,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    text: {
        fontSize: 64,
        fontWeight: '900',
        color: colors.primary
    }
})