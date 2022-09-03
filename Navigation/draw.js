import React,{ useState, useEffect,useContext } from "react";
import { createDrawerNavigator,DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
drawerContent} from "@react-navigation/drawer";
import { StyleSheet, ScrollView, ActivityIndicator, View,Button,Text,Image, Dimensions, ImageBackground,Alert,SafeAreaView ,TouchableOpacity} from 'react-native';
import Profile from "../components/Profile";
import AddUserScreen from "../components/AddUserScreen";
 
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { MainStackNavigator } from "./Stack";
import {ref,child,getDownloadURL,put, uploadBytesResumable, uploadBytes, } from 'firebase/storage' 
import UserScreen from "../components/UserScreen";
import { auth,db,storage } from '../database/firebase';
import { ListItem,Icon,Avatar } from "@rneui/themed";
import * as ImagePicker from 'expo-image-picker';
//import storage from '@react-native-firebase/storage';
 
import * as Progress from 'react-native-progress';
import Login from "../components/Login";
import {useLogin} from "./context/contextlogin";
import UserDetailScreen from "../components/UserDetailScreen";
import { signOut, updateProfile } from "firebase/auth";
import { async } from "@firebase/util";

const Drawer = createDrawerNavigator();


 
 
 

const CustomDrawerContent= props => {
 
  const {setIsLoggedIn} = useLogin();
  const [imageUrl, setimageUrl] = useState();
  const [isload,setisload]=useState(false)
  const [time, settime] = useState(false);
  
 
  const signoout = async () => {
    setisload(true);
    await signOut(auth).then(() => setisload(false), setIsLoggedIn(false),console.log('loggedout'))
    .catch(error => console.log(error))}
   
 const handleOnPress =async () => { 

   let result = await ImagePicker.launchImageLibraryAsync({mediaTypes:"Images"}).then(async(result)=>{
      

      if (!result.cancelled) {
        settime(true)
       
       const st= ref(storage,'uploads/'+auth.currentUser.uid+'.jpg')
        const  img = await fetch(result.uri);
        const byt= await img.blob();
        await uploadBytes(st, byt)
        await getDownloadURL(st).then(async(url)=>{
          var user = auth.currentUser;
        await  updateProfile(user,{ photoURL:url})
               setimageUrl(url);
               settime(false);
               console.log(url);
               console.log(auth.currentUser.photoURL)
        })

        
     
      
        
          
         
         
        
        .catch((error)=>{
          console.log(error);
        });
      }})
   }
   /*  await ref(storage,'uploads/' + auth.currentUser.uid+".jpg").getDownloadURL()
        .then(async(url) => {
          //from url you can fetched the uploaded image easily
        await  auth.currentUser.updateProfile({ photoURL:url})
          setimageUrl(url);
          settime(false);
          console.log(url);*/
          
          
      
   
         
        
     
    
    
        
       
      

    
  
 
     
  
      
  useEffect(()=>{
    
    
  },[imageUrl])
        
        
     
  
  return (
    <>
    {isload ?
    
       (<View style={styles.preloader}>
      <ActivityIndicator size="large" color="#9E9E9E"/>
    </View>):(
  
    <SafeAreaView style={{flex:1, marginTop:26}}>
    
    <ImageBackground style={{width:198,flex:1,alignItems:'flex-start',marginTop:-28,height:130}} source={{uri:"https://cdn.shopify.com/s/files/1/1426/0052/products/SDlapislazuli8511.jpg?v=1489278805"}}>
    <View style={{height:90, alignItems:"center",justifyContent:"center"}}>
    <TouchableOpacity  onPress={handleOnPress} >
   {/* <Avatar  size={80} rounded source={{uri:imageUrl}}><Avatar.Accessory size={24}/></Avatar>*/}
   {time ? <ActivityIndicator size="large" color="#9E9E9E"/> :
   <Image source={{uri:auth.currentUser.photoURL}} style={{height:80,width:80,borderRadius:150,marginTop:5,marginLeft:5,borderColor:'white',borderWidth:2}}      />}
  
    
  </TouchableOpacity>
         </View>     
        <View >     
          
          <Text style={{marginTop:5,fontWeight:'bold',fontSize:20 ,color:"white",marginRight:6,marginLeft:10}}>Hi, {auth.currentUser.displayName}</Text></View>
          
    </ImageBackground>
    
    <View {...props} style={{marginLeft:5}}>
   
    <DrawerItemList    {...props}/>
    <SafeAreaView style={{marginTop:300,flexDirection:"row"}}>
     <TouchableOpacity  style ={{flexDirection:"row"}} onPress={()=>signoout()
    }>
    <Icon name="logout"   color="#05375a"  size={20} style={{paddingHorizontal:8,paddingTop:2,paddingLeft:18,paddingBottom:8}}
      /> 
<Text  style={{marginLeft:25,}}  >logout</Text>
</TouchableOpacity>
    </SafeAreaView>
   {/* <DrawerItem style={{marginTop:300}} labelStyle={{color:"black"}} icon={({})=>(
       <Icon  name='log-out-outline' type='ionicon' size={22} 
        />
  )}
   label=" Logout"  onPress={()=>signOut(props)}/>*/}
    </View>
    </SafeAreaView>
  )
    }
 </>
  )}
const DrawerNavigator = () => {
   
  return (
   
     
   
    <Drawer.Navigator    screenOptions={{
      drawerStyle:{
        width:200,
        marginTop:84,
        
        borderColor:'gray',
        borderWidth:1,
        
        backgroundColor:'white',
      
      },
      
      drawerInactiveTintColor:'black',
      drawerActiveBackgroundColor:'#e91e63',
     drawerActiveTintColor:'white',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: 'blue',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }} 
    
      initialRouteName="User List" 
      
   drawerContent={ (props) => <CustomDrawerContent {...props}   />
   
   }
  
   
 >
    
       
 <Drawer.Screen      name="User List"  component={UserScreen}  options={{drawerIcon:()=>(
  <Icon  name='list' type='ionicon' size={22} 
  />

      )} }/>
      <Drawer.Screen name="Add User" component={AddUserScreen} options={{drawerIcon:()=>(
        <Icon  name='person-add' type='ionicon' size={20} 
        />
      )}}    />
      <Drawer.Screen name="Profile" component={Profile} options={{drawerIcon:()=>(
        <Icon  name='person-circle-outline' type='ionicon' size={22} 
        />
      )}}    />
      
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
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
  button: { 
    
    padding: 2, 
    borderWidth: 1, 
    borderColor: "#333", 
    textAlign: "center", 
    maxWidth: 150 
  }
});
export default DrawerNavigator;