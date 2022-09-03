import React, {  useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import {signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import { auth} from '../database/firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
 

import UserScreen from './UserScreen'; 
 
import {useLogin} from '../Navigation/context/contextlogin';

 
export default Login =(props)=>{
  const {setIsLoggedIn} = useLogin(); 
  const [email,setemail]=useState('');
    const [password,setpass]=useState('');
    const [isload,setisload]=useState(false)
      const [hidp,sethidp]=useState(true);
      const [icon,seticon]=useState('eye-slash')
 
    /*  GoogleSignin.configure({
        webClientId: '873180733075-42nkejqc9d1roh2l7a070huckdcj90n6.apps.googleusercontent.com',
      });

      async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
        setIsLoggedIn(true)
      }  
  /*const [userinfo,setuserinfo]=useState({
    email: '', 
      password: '',
      isLoading: false,
      hidp:true,
      icon:"eye-slash",
     
  })*/
 const showicon=()=>{
  if(icon === 'eye'){
    seticon('eye-slash')  }
    else{
      seticon('eye')
    }
   /* seticon(prevState =>({
     icon: 'eye' ? 'eye-slash':'eye',
      
    }));*/
  sethidp(!hidp)}
  
 const updateemail = (val) => {
     setemail(val)
  }
  const updatepass = (val) => {
    setpass(val)
 }
 const signInWithGoogleAsync = ()=> {
  const provider = new GoogleAuthProvider();
setisload(true);
signInWithPopup(auth,provider)
.then((re)=>{
  const cred = GoogleAuthProvider.credentialFromResult(re);
  const token = cred.accessToken;
  setIsLoggedIn(true)
  setisload(false)
        // props.navigation.navigate('UserScreen')

}).catch((err)=>{
  console.log(err)
})
   /* GoogleAuthentication.logInAsync({
      behavior:'web',
     androidStandaloneClientId:'873180733075-1h6tgbd12nqmikqk6cll3cg8ktu2s9gs.apps.googleusercontent.com' ,
     //  iosClientId: YOUR_CLIENT_ID_HERE,
       scopes: ['profile', 'email'],
    }).then((logInResult)=>{
      if(logInResult.type === 'success'){
       setisload(true)
        const {idToken, accessToken}= logInResult;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken,accessToken);
       return firebase.auth().signInWithCredential(credential)
        .then((res)=>{
          console.log(res)
          setisload(false)
         props.navigation.navigate('UserScreen')
        })
       
      }
      
      return Promise.reject();
    }).catch((error)=>{
          console.log('google login error')
    })*/
     
   }
 
  const userLogin = async () => {
  
     if(email !== '' && password !== '') {
      setisload(true);
      try{
      await signInWithEmailAndPassword(auth,email, password)
       .then((res) => {
        
         console.log(res)
         console.log('User logged-in successfully!')
         
         setisload(false);
         setemail('');
         setpass('');
         setIsLoggedIn(true)
         })
        
     }
      catch(error){setisload(false)
        Alert.alert('Error:',error.message)
       }
      }
     
       
     else {
      Alert.alert('Enter details to signin!')
     }}
 


  return(
    <>
    {isload ?
    
       (<View style={styles.preloader}>
      <ActivityIndicator size="large" color="#9E9E9E"/>
    </View>):(
  
    
  
  
 <View style={styles.container}>  
 <View style={styles.action} >
 
 <FontAwesome name="envelope"    color="#05375a"  size={20} style={{paddingHorizontal:8}}
 />
   <TextInput
   style={styles.inputStyle}
     keyboardType="email-address"
     placeholder="Email"
     value={email}
     onChangeText={(val) => updateemail(val)}
   />
   
   </View>

   <View style={styles.action} >
   <FontAwesome name="lock"    color="#05375a"  size={25} style={{paddingHorizontal:8,paddingTop:2}}
 />
   <TextInput
   style={styles.inputStyle}
     
     placeholder="Password"
     value={password}
     onChangeText={(val) => updatepass(val)}
     maxLength={15}
     secureTextEntry={hidp}
     
   />   
   <FontAwesome name={icon } style={{paddingRight:5}} size={20} color="grey"  onPress={()=>showicon()}/>
  
</View>
   <Button
     color="#3740FE"
     title="Signin"
     onPress={() => userLogin()
       
     }
   />   

   <Text 
     style={styles.loginText}
     onPress={() =>props.navigation.navigate('Signup')}>
     Don't have account? Click here to signup
   </Text>   
   <Text 
     style={styles.loginText}
     onPress={() => props.navigation.navigate('forgotScreen')}>
     forgot password?
   </Text>  
    <View style={{marginTop:15,width:200,alignSelf:'center'}}>
  {/* <Button containerStyle={{alignSelf:'center',marginTop:50}}

     color="red"
     title="Signin with Google"
     onPress={() => signInWithGoogleAsync()}
    />*/}    
     </View>           
</View>
  )
    }
    </>)
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
   marginTop:130,
    padding: 20,
    backgroundColor: '#0000'
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
  },
  text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20, },
  textInput: {  borderWidth:1,  marginVertical: 20, padding:10, height:40, alignSelf: "stretch", fontSize: 18,flexDirection:'row' },
});
