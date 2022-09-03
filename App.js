import React,{useState,useEffect} from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import UnNavigator from './Navigation/Stack';
import LoginProvider from './Navigation/context/contextlogin'; 
import DrawerNavigator from './Navigation/draw';
 import 'react-native-gesture-handler'
import UserScreen from './components/UserScreen';
 
export default function App() {
 
     
    return (
      <LoginProvider>
      <NavigationContainer>
  <UnNavigator/>
      </NavigationContainer>
      </LoginProvider>
      )}
  


