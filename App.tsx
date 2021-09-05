import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FindParty from './screens/findParty/findParty';
import './screens/homePage/homePage'
import HomePage from './screens/homePage/homePage';
import LoginPage from './screens/loginPage/loginPage';

export default function App() {
  return (
    <FindParty/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
