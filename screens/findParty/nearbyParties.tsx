import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors, common } from '../../common/styles/styles'

const nearbyParties = (props: any) => {

    const parties = [
        {
            id: '1234',
            name: 'Old Irish Halloween'
        },
        {
            id: '2345',
            name: 'Semesterstartsfest SDU'
        },
        {
            id: '6534',
            name: "Anders' vilde fest"
        },
        {
            id: '6452',
            name: 'Sausage party'
        },
    ]

    const partyItem = ({ item }: any) => (
        <View>
            <Text>{item.name}</Text>
        </View>
    )

    return(
        <View>
            <FlatList
                data={parties}
                renderItem={partyItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default nearbyParties