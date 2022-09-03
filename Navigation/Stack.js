import React,{useState,useContext,useEffect} from 'react';
import {  createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Signup from '../components/Signup';
import forgotScreen from '../components/forgotScreen';
import UserScreen from '../components/UserScreen';
import UserDetailScreen from '../components/UserDetailScreen';
import AddUserScreen from '../components/AddUserScreen';
import { StyleSheet, ScrollView, ActivityIndicator, View,Button } from 'react-native';
import  { useLogin } from './context/contextlogin';
import { DrawerView } from '@react-navigation/drawer';
import DrawerNavigator from './draw';
import { TouchableOpacity } from 'react-native-gesture-handler';
 
import Profile from '../components/Profile';
 
import * as Updates from "expo-updates"
 


const Stack =  createStackNavigator();

 
const MainStackNavigator = () => {
 
   
  return (

 
    <Stack.Navigator  initialRouteName="Login" 
    screenOptions={{ 
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: 'blue',
      },
 
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
       
    }
    }> 
    <Stack.Screen name="Login" component={Login} options={{ title: 'Login'} }/>
    <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
  <Stack.Screen name="forgotScreen" component={forgotScreen} options={{ title: 'Reset' }} /> 
  
  <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ title:'User Detail'}} /> 
    </Stack.Navigator>
  )
  }
  const UnmStackNavigator = () => {
 
   
    return (
  
   
      <Stack.Navigator  initialRouteName="UserSreen" 
      screenOptions={{ 
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'blue',
        },
   
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
         
      }
      }> 
      <Stack.Screen name="UserScreen" component={DrawerNavigator} options={{ headerShown:false} }/>
       
      <Stack.Screen name="AddUserScreen" component={AddUserScreen} options={{ title:'Add User'} }/>
    <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ title:'User Detail'}} /> 
      </Stack.Navigator>
    )
    }
const UnNavigator =()=>{
 

  
const {isLoggedIn}= useLogin();
return isLoggedIn ? <UnmStackNavigator/>:<MainStackNavigator/>;

}

 
       
    
export default UnNavigator;