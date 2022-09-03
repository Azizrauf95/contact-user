import React, {Component,useEffect,useState} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View,TextInput,Alert,BackHandler,Animated,TouchableOpacity,Image,SafeAreaView} from 'react-native';
 
import { ListItem,Button,Icon,SearchBar,Avatar } from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { auth,db } from '../database/firebase';
import {collection,query,where,orderBy,deleteDoc,onSnapshot, doc,querySnapshot, getDoc} from 'firebase/firestore';
 
import { async } from '@firebase/util';
 
export default  UserScreen = (props)=>{
  const [isLoading,setload] =useState(true);
  const [userArr,setuserArr] =useState([]);
  const [filterarr,setfilterar] =useState([]);
  const [search,setseach] =useState('');

 const  fetch=()=>{
    const userref=  collection(db,'users');
    const q =  query(userref,where('uuid','==',auth.currentUser.uid),orderBy('name','asc'));
  const p =  onSnapshot(q,(snapshot)=>{
  setuserArr(snapshot.docs.map((doc)=>({
    id:doc.id,
    ...doc.data(),
    
  })
  
  ))

  setload(false),
  
  console.log(userArr);
  });
    }   

useEffect(()=>{
   
  fetch();

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };
  
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );
  
  return () =>
     backHandler.remove();
  
 /* const gett = async()=>{
  
    const userArr = [];   
  const userref= collection(db,'users');
  const q = query(userref,where('uuid','==',auth.currentUser.uid),orderBy('name','asc'));
    const d = await getDoc(q);
    d.forEach((res)=> {
      const { name, email, mobile } = res.data();
      userArr.push({
        key: res.id,
        res,
        name,
        email,
        mobile,
      });
    })
    setload(false);
setfilterar(userArr);
  
   
}
gett();*/


  
},[])
 

 
  const deleteUser = async(props) =>{
    try{
      await deleteDoc(doc(db,'users',props));
      console.log('Item removed from database')
     
    }catch (err){
      Alert.alert('Error:',err.message)
    }
      
  }
 
const searchuser=(texttosearch)=>{
  {!texttosearch?fetch():
  setuserArr(userArr.filter(id=>id.name.toLowerCase().includes(texttosearch.toLowerCase())))
  setseach(texttosearch)}
  
 /* this.setState({
    filterarr:this.state.userArr.filter(i=>i.name.toLowerCase().includes(texttosearch.toLowerCase()),),
    searchh:texttosearch,
  })*/
  }
 
 
 
/*class UserScreen extends Component {
   
  constructor() {
    super();
    
    
    
    this.state = {
      isLoading: true,
      userArr: [],
       filterarr:[], 
       searchh:'',
    };
  }
  backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };
  /*signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
  .catch(error => this.setState({ errorMessage: error.message }))}
  componentDidMount() {
    this.firestoreRef =  collection(db,'users');
    this.unsubscribe = query(this.firestoreRef,where('uuid','==',auth.currentUser.uid),orderBy('name','asc').onSnapshot(snapshot =>{
      const uss = snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }))
      this.setState({
        userArr:uss,
        filterarr:userArr,
        isLoading: false,
     });
       
        }) 
    )
   onSnapshot(this.unsubscribe,(snapshot)=>{
      const uss = snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }))
      this.setState({
        userArr:uss,
        filterarr:userArr,
        isLoading: false,
     });
       
        });
         
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }
  getCollection ()  {
    const userArr = [];
    onSnapshot(this.unsubscribe,(snapshot)=>{
      const uss = snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }))
      
    this.setState({
      userArr,
      filterarr:uss,
      isLoading: false,
   });
  })}

  componentWillUnmount(){
    this.unsubscribe();
    this.backHandler.remove();
  }
 
 searchuser=(texttosearch)=>{
  this.setState({
    filterarr:this.state.userArr.filter(i=>i.name.toLowerCase().includes(texttosearch.toLowerCase()),),
    searchh:texttosearch,
  })
  }
  deleteUser(props) {
    const dbRef = collection(db,'users').deleteDoc(props)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
         
      })
  }*/

const  openTwoButtonAlert=(props)=>{
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => deleteUser(props)},
        {text: 'No', onPress: () => console.log('No item was removed')},
      ],
      { 
        cancelable: true ,
      }
    );
  }

   
    return (
      <>
      {isLoading ?
        (<View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>)
      :
     ( 
     <SafeAreaView style={styles.cont}>
    
    <View style={styles.action} >
    <FontAwesome name="search"    color="#05375a"  size={20} style={{paddingHorizontal:8}}/>
    <TextInput style={styles.inputStyle} 
           placeholder="Search User"
           value={search} 
           onChangeText={(val) => {searchuser(val),setseach(val)}}
           
    /> 
    <Button titleStyle={{color:'black',fontSize:20}} buttonStyle={{backgroundColor:''}} title="x" onPress={() =>{fetch(), setseach('')}} />

    </View>  
      <ScrollView >
  
     {/* <Button title="logout"
    onPress={() => this.signOut()}/>*/}
               
             
    {userArr && userArr.map(filarr=>{
      
    
      return (
        
        <ListItem.Swipeable
                containerStyle={{height:50}}
                style={{height:6,marginBottom:50}}
                rightWidth={70}
                rightStyle={{width:70}}
                rightContent={(reset) =>(  <Button title='Delete'    onPress={()=>{openTwoButtonAlert(filarr.id,reset())}}
                icon={{ name:"trash-outline" ,type:'ionicon', size:15, color:'white'}}
                titleStyle={{fontSize:14,fontStyle:'italic'}}
                buttonStyle={{backgroundColor:"red" ,marginBottom:60,height:50,alignSelf:'center'}}/>)} 
          key={filarr.id}
          bottomDivider
          title={filarr.name}
          subtitle={filarr.email}
           
          onPress={() => {
            props.navigation.navigate('UserDetailScreen', {
              userkey: filarr.id,
              namm: filarr.name,
              emm:filarr.email,
              mmo:filarr.mobile,
            });
          }}>
          <ListItem.Chevron />
          <Avatar
      source={{
        uri:"https://www.w3schools.com/howto/img_avatar.png"
          ,
      }}
      rounded
    />
    <ListItem.Content >
      <ListItem.Title style={{fontSize:12,fontWeight:'bold'}}>{filarr.name}</ListItem.Title>
      <ListItem.Subtitle style={{fontSize:12}}>{filarr.email}</ListItem.Subtitle>
      
    </ListItem.Content>
  </ListItem.Swipeable>
  
  
      );
    })
  }
 
</ScrollView>
<TouchableOpacity
activeOpacity={0.7}
onPress={()=>{props.navigation.navigate('AddUserScreen')}}
style={styles.touchableOpacityStyle}>
<Icon
style={{backgroundColor:'blue',borderRadius:50,alignSelf:'center'}}
name="add"
color="white"
size={50}
/>

</TouchableOpacity>

</SafeAreaView>
)
}

</>
  )}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    
     
  },
  container: {
   flex: 1,
   paddingBottom: 20
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    
  },
  action:{
    flexDirection:'row',
      alignItems:'center',
      display:'flex',
         
      borderWidth:1,
      borderColor:'#000',
margin:7,   
 
    backgroundColor:'white',

        borderRadius:5
    
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
  inputStyle: {
    flex:1,
  padding:2,
  fontSize:18,
  fontStyle:'italic',
  fontWeight:'bold',
  color:'gray'

  },
  text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 18, },
  textInput: { borderWidth:2, backgroundColor:'white',borderRadius:5, marginVertical: 10,marginHorizontal:10, padding:10, height:35, alignSelf: "stretch", fontSize:12 },
})

 
 
