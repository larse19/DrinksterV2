import { StyleSheet } from 'react-native';

export const colors = {
    primary:'#FF8100',
    secondary:'#FFAD00',
    tertiary:'#FF3900'
}

export const common = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#383535',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    position: 'absolute',
    top: '10%'
  }
})