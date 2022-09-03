import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { auth } from '../database/firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-fontawesome';
 


export default class Signup extends Component {
  
  constructor() {
    super();
  // this.dbRef = firebase.firestore().collection('usersinfo');
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false,
      hidp:true,
      icon:"eye-slash",
      photoUrl:'',
      uuid:''
    }
  }
   
  showicon=()=>{
  this.setState(prevState =>({
    icon: prevState.icon === 'eye' ? 'eye-slash':'eye',hidp:!prevState.hidp
  }));}
  
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }


  registerUser = async () => {
    
    const validemm = new RegExp('^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$');
    const validpass =new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,12}$');
    if(this.state.email === '' || this.state.password === '') {
      Alert.alert('Enter details to signup!')
    }
    else if(!validemm.test(this.state.email) || (!validpass.test(this.state.password)))
    {
  Alert.alert('email or password pattern is invalid')}
  
  
 
  

   
  else {
      this.setState({
        isLoading: true,
      })
      
       try{
      
       await createUserWithEmailAndPassword(auth,this.state.email, this.state.password)
      updateProfile(auth.currentUser,
      
        {
          displayName: this.state.displayName,
          photoURL:'https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png'
        })
        console.log('User registered successfully!')
       /* fs.collection('usersinfo').doc(res.user.uid).set({
          name: this.state.displayName,
          email: this.state.email,
          uuid: res.user.uid
        })*/
      
         
        
            
              this.setState({

                
                uuid:'',
                displayName: '',
                email: '', 
                password: '',
                photoURL:'',
                isLoading: false,
              });
              this.props.navigation.navigate('Login')
        
        
         
          
      
       // Alert.alert('Error:',error.message);
     
         } catch(err){
          Alert.alert('Error:',err.message);
          
          this.setState({
            isLoading: false,
          })
          }
        
      
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
      <View style={styles.action} >
      <FontAwesome name="user-o"    color="#05375a"  size={20} style={{paddingHorizontal:8}}
      />
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />  
        </View>
        
        <View style={styles.action} >
        <FontAwesome name="envelope"    color="#05375a"  size={20} style={{paddingHorizontal:8}}
      />    
        <TextInput
          style={styles.inputStyle}
          keyboardType="email-address"
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        </View>
        
        <View style={styles.action}>
        <FontAwesome name="lock"    color="#05375a"  size={25} style={{paddingHorizontal:8,paddingTop:2}}
      /> 
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={this.state.hidp }
        /> 
        <FontAwesome name={this.state.icon } style={{paddingRight:5}} size={20} color="grey"  onPress={()=>this.showicon()}/>
</View>
        <Button
          color="#3740FE"
          title="Signup"
          onPress={() => this.registerUser()}
        />

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>                        
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
  SStyle:{
marginRight:40
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
})