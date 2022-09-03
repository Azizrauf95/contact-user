import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,BackHandler } from 'react-native';
import {doc,setDoc,deleteDoc,collection,onSnapshot,updateDoc, getDoc} from 'firebase/firestore';
import DrawerNavigator from '../Navigation/draw';
import {auth,db} from '../database/firebase';
import { ListItem,Avatar,Icon,Button } from '@rneui/themed';
class UserDetailScreen extends Component {
 
  constructor() {

   
    super();
    this.state = {
      
      name: '',
      email: '',
      mobile: '',
      uuid:'',
      isLoading: true,
     
    };
  }
 backAction = () => {
     this.props.navigation.goBack(null);
    return true;
  };
 
  componentDidMount=async()=> {
   
   const dbRef = doc(db,'users',this.props.route.params.userkey) ;
    const  docsn = await getDoc(dbRef)
   // onSnapshot(dbRef,(snapshot) => {
      if (docsn.exists()) {
        const uu = docsn.data();
        this.setState({
          key: docsn.id,
          
          name: uu.name,
          email:uu.email,
          mobile:uu.mobile,
     //const uss = snapshot.data();
        
        
          
          isLoading: false
        })
      } else {
        console.log("Document does not exist!");
      }
    
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }
  componentWillUnmount(){
    
    this.backHandler.remove();
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateUser() {
    const updateDBRef = doc(db,'users',this.state.key) ;
    if(this.state.name !== ''){
      this.setState({
      
        isLoading:true,
      }) 
     /* this.setState({
        isLoading: true,
        name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      });*/
  
    updateDoc(updateDBRef,{
      
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      
    }).then((docRef)=>{
      this.setState({
       /* name: this.state.name,
        email: this.state.email,
        mobile: this.state.mobile,*/

        key: '',
        name: '',
        email: '',
        mobile: '',
        uuid:'',
        isLoading: false,
      });
      this.props.navigation.navigate('UserScreen')

    })
   
    .catch((error)=> {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
     
     } else {
      alert('Fill at least your name!')
  }}

  deleteUser  (){
    try{
     deleteDoc(doc(db,'users',this.props.route.params.userkey));
     
      this.setState({
       /* name: this.state.name,
        email: this.state.email,
        mobile: this.state.mobile,*/

        key: '',
        name: '',
        email: '',
        mobile: '',
        uuid:'',
        isLoading: false,
      });
      console.log('Item removed from database')
      this.props.navigation.navigate('UserScreen');
     
    }catch (err){
      Alert.alert('Error:',err.message)
    }
      
  }
/*(const docRef = doc(db, "users",props);

deleteDoc(docRef)
.then(() => {
    console.log("Entire Document has been deleted successfully.")
       
    this.props.navigation.navigate('UserScreen');
})
.catch(error => {
    console.log(error);
})
   
       
       
    }
*/  

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteUser()},
        {text: 'No', onPress: () => console.log('No item was removed')},
      ],
      { 
        cancelable: true ,
      }
    );
  }
  
  render() {
     
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
     
        return(
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(val) => this.setState({name:val})}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(val) => this.setState({email:val})}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Mobile'}
              value={this.state.mobile}
              onChangeText={(val) => this.setState({mobile:val})}
          />
        </View>
        <View style={styles.button}>
          <Button 
          icon={{ name:"pencil-outline" ,type:'ionicon', size:15, color:'white'}}
            title='Update'
            containerStyle={{width:200,alignSelf:'center'}}
           buttonStyle={[{backgroundColor:"green"}]}
            onPress={()=>{this.updateUser()}} 
            
          />
          </View>
         <View>
          <Button
          icon={{ name:"trash-outline" ,type:'ionicon', size:15, color:'white'}}
            title='Delete'
            containerStyle={{width:200,alignSelf:'center'}}
            buttonStyle={[{backgroundColor:"red" }]}
            onPress={this.openTwoButtonAlert}
            color="#E37399"
            
          />
        </View>
      </ScrollView>
    );
    }}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
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
  button: {
    marginBottom: 7, 
    
  }
})

export default UserDetailScreen;