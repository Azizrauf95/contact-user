import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { auth} from '../database/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

 class ForgotScreen extends Component {
  
  constructor() {
    super();
    this.state = { 
      isLoading: false,
      email: '', 
       
    }
  }
   
 
    
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  resetUser = () => {
    
    if(this.state.email === '' ) {
      Alert.alert('Enter details to reset password!')
    }
     
     
   
  else {
      this.setState({
        isLoading: true,
      })
      sendPasswordResetEmail(auth,this.state.email)
      .then((res) => {
        Alert.alert('Please check your email!')
        })
      
        console.log('password reset email sent!')
        this.setState({
          isLoading: false,
          
          email: '', 
        
        })
        
        this.props.navigation.navigate('Login')
        
      }
           
    }
 

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  
      
        
        <View style={styles.action}>
        <FontAwesome name="envelope"    color="#05375a"  size={20} style={{paddingHorizontal:8}}
      />    
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        </View>
        
        
        <Button
          color="#3740FE"
          title="Reset Password"
          onPress={() => this.resetUser()}
        />

                                
      </View>
    );
  }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
    justifyContent: "center",
    padding: 30,
    backgroundColor: '#fff'
  },
  inputStyle: {
    flex:1,
  },
  action:{
    flexDirection:'row',
      alignItems:'center',
      display:'flex',
        borderWidth:1,
        borderColor:'#000',
      paddingBottom:5,
        marginBottom:20,
        borderRadius:5
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});

export default ForgotScreen;