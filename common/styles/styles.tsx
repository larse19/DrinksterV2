import { StyleSheet } from 'react-native';

export const colors = {
    primary:'#FF8100',
    secondary:'#FFAD00',
    tertiary:'#FF3900',
    light_grey: '#847E7E',
    grey: '#524B4B'
}

export const common = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#383535',
  },
  title:{
    position: 'absolute',
    top: '10%'
  }
})

export const buttons = StyleSheet.create({
    backButton: {
        marginLeft: 15,
  }
})