import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import DuBao from './components/DuBao/dubao';
import ThongSo from './components/ThongSo/thongso';
import Home from './components/Welcome/welcome';
import WelcomeRouter from './components/Welcome/welcome';
import Infor from './components/Info/info';

export default function App({navigator}) {
  return (
    <WelcomeRouter/>
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