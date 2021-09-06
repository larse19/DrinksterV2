import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native'
import DrinksterTitle from '../../common/components/drinksterTitle';
import {common} from '../../common/styles/styles'
import Leaderboard from './leaderboard';

function PartyPage(props: any) {
    return (
        <SafeAreaView style={[common.background, {alignItems: 'center'}]}>
                <DrinksterTitle/>
                <View style={styles.container}>
                    <Leaderboard/>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
})

export default PartyPage;