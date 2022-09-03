import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput,  Linking, Alert, } from 'react-native';
import { ListItem,Avatar,Icon,Button } from '@rneui/themed'
import {auth} from '../database/firebase';
import { signInWithCredential, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';

export default class Profile extends React.Component {
  
 
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newEmail: "",
    };
  }

  // Occurs when signout is pressed...
   

  // Reauthenticates the current user and returns a promise...
  reauthenticate = async(currentPassword) => {
    var user = auth.currentUser;
    var cred = await signInWithEmailAndPassword(auth,user.email, currentPassword);
     
 
  }

  // Changes user's password...
  onChangePasswordPress = () => {
    
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = auth.currentUser;
      updatePassword(user,this.state.newPassword ).then(() => {
        Alert.alert("Password was changed");
      }).catch((error) => { Alert.alert(error.message); });
    }).catch((error) => { Alert.alert(error.message) });
  }
  
  // Changes user's email...
  onChangeEmailPress = () => {
   
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = auth.currentUser;
      updateEmail(user,this.state.newEmail).then(() => {
        Alert.alert("Email was changed");
      }).catch((error) => { Alert.alert(error.message); });
    }).catch((error) => { Alert.alert(error.message) });
  }

  render() {
    return (
      <ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: 10, paddingHorizontal: 10}}>
         

        <TextInput style={styles.textInput} value={this.state.currentPassword}
          placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
          onChangeText={(text) => { this.setState({currentPassword: text}) }}
        />
        <Text style={{color:'red',marginTop:-20}}>Required *</Text>

        <TextInput style={styles.textInput} value={this.state.newPassword}
          placeholder="New Password" maxLength={15} autoCapitalize="none" secureTextEntry={true}
          onChangeText={(text) => { this.setState({newPassword: text}) }}
        />

        <Button 
        icon={{ name:"create" ,type:'ionicon', size:15, color:'white'}}
        title="Change Password" onPress={this.onChangePasswordPress} />

        <TextInput style={styles.textInput} value={this.state.newEmail}
          placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
          onChangeText={(text) => { this.setState({newEmail: text}) }}
        />

        <Button  icon={{ name:"create" ,type:'ionicon', size:15, color:'white'}} 
        title="Change Email" onPress={this.onChangeEmailPress} />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20, },
  textInput: { borderWidth:1, borderColor:"gray", marginVertical: 20, padding:10, height:40, alignSelf: "stretch", fontSize: 18, },
});
