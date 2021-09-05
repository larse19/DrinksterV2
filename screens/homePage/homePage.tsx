import React from 'react';
import { StyleSheet, View } from 'react-native';
import DrinksterTitle from '../../common/components/drinksterTitle';
import WideButton from '../../common/components/wideButton';
import {colors, common} from '../../common/styles/styles'

const test = () => {
  console.log("test")
}

export default function HomePage() {
  return (
    <View style={common.background}>
      <DrinksterTitle style={common.title}/>
      <View style={styles.container}>
        <WideButton title="find party" color={colors.secondary} onPress={test}/>
        <WideButton title="create party" color={colors.primary} onPress={test}/>
        <WideButton title="previous parties" color={colors.tertiary}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    position: 'absolute',
    top: 470,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  }
});
