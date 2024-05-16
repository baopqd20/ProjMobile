import React, { Component, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { User, Logout } from "../Icon/icon";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeRouter from "../Welcome/welcome";
import { StatusBar } from "expo-status-bar";
import Tree from "./Tree/tree";
import Fertilizer from "./Fertilizer/fertilizer";
import axios from "axios";
const IP =  'https://8bad-113-160-14-17.ngrok-free.app'
const Stack = createNativeStackNavigator();
function Info({ navigation, route }) {
  const InfoUser = route.params
  const logout = () => {
    return navigation.push("Welcome");
  };
  const callTree = async() => {
    try{
      const res = await axios.get(`${IP}/getAllPlant`)
      return navigation.navigate('Tree',res.data);
    }
    catch(erorr){
      console.log(erorr)
    }
    
  };
  const callFertilizer = async()=>{
    try{
      const res = await axios.get(`${IP}/getAllPhanBon`)
      return navigation.navigate('Fertilizer', res.data)
    }
    catch(erorr){
      console.log(erorr)
    }
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [modalChange, setModalChange] = useState(false)
  const [modalCheckChange, setModalCheckChange] = useState(false)
  const [dataUsers, setDataUsers] = useState([])
  const [userData, setUserData] = useState({})
  const [username, setUsername] = useState(InfoUser.username)
  const [password, setPassword] = useState(InfoUser.password)
  const [email, setEmail] = useState("")
  const[id, setID] = useState(0)
  const apiUser = async()=>{
    try{
      const res = await axios.get(`${IP}/getallusers`)
      setDataUsers(res.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const checkUser =()=>{
    apiUser(),
    dataUsers?.map((user:any)=>{
      if(user.username === InfoUser.username){
        setUsername(user.username),
        setPassword(user.password),
        setEmail(user.email)
        setID(user.id)
      }
    })
    setModalChange(true)
  }
  useEffect(()=>{
    setUserData({
      username:username,
      password:password,
      email:email,
      id:id
    })
  }, [username, password, email, id])
  const apiChange = async()=>{
    try{
      const res = await axios.post(`${IP}/saveUser`, userData)
      console.log(res.data)
      if(res.data.message){
        alert('Thực hiện đổi tài khoản thành công')
        setModalChange(false)
      }
    }
    catch(erorr){
      console.log(erorr)
    }
  }
  const checkChange = () =>{
    if(username==""|| password==""|| email==""){
      alert('Nhập đầy đủ thông tin để thay đổi')
    }
    else{
      apiChange()
    }
  }
  return (
    <View style={{ width: "100%", display: "flex" , backgroundColor:'rgba(96, 255, 138, 0.5)', height:'100%'}}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          padding: 40,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={styles.khungInfo} onPress={()=>checkUser() }>
          <View style={{ display: "flex", gap: 20 }}>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <User height={100} width={100} color={"rgba(41, 138, 222, 1)"} />
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.textUserName}>{username}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 30,
            gap: 20,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 20,
              padding: 30,
              gap: 15,
            }}
            onPress={() => {callTree()}}
          >
            <Image
              source={require("./tree.png")}
              style={{ width: 100, height: 110 }}
            />
            <Text>Cây trồng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 20,
              padding: 30,
              gap: 15,
            }}
            onPress={()=>{callFertilizer()}}
          >
            <Image
              source={require("./fertilizer.png")}
              style={{ width: 100, height: 110 }}
            />
            <Text>Phân bón</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.khungLogout}>
          <TouchableOpacity style={styles.logout} onPress={() => setModalVisible(true)}>
            <Logout color={"rgba(41, 138, 222, 1)"} />
            <Text
              style={{
                fontSize: 20,
                width: "100%",
                color: "rgba(41, 138, 222, 1)",
              }}
            >
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 30,
              borderWidth: 1,
              borderColor: "white",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 25, fontWeight:"700", textAlign:'center'}}>
              Bạn có chắc chắn muốn đăng xuất ?
            </Text>
            <View style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'row', gap:25}}>
              <TouchableOpacity
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom:12,
                  paddingTop:12,
                  paddingLeft:25,
                  paddingRight:25,
                  borderWidth:1,
                  borderColor:"rgba(241, 0, 43, 1)",
                  backgroundColor:"rgba(241, 0, 43, 0.2)",
                  borderRadius:10
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{fontSize:20, color:"rgba(241, 0, 43, 1)"}}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom:12,
                  paddingTop:12,
                  paddingLeft:25,
                  paddingRight:25,
                  borderWidth:1,
                  borderColor:" rgba(0, 215, 43, 1)",
                  backgroundColor:" rgba(0, 215, 43, 0.2)",
                  borderRadius:10
                }}
                onPress={() => {setModalVisible(!modalVisible), logout()}}
              >
                <Text style={{fontSize:20, color:"rgba(0, 215, 43, 1)"}}>Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalChange}
        onRequestClose={() => {
          setModalChange(!modalChange);
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 30,
              borderWidth: 1,
              borderColor: "white",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            
            <View style={{display:'flex', justifyContent:'center', alignItems:'center', gap:25}}>
              <Text style={{ fontSize:25, fontWeight:'600', textAlign:'center'}}>Chỉnh sửa thông tin người dùng</Text>
              <View style={{display:'flex', gap:20, width:'100%', paddingBottom:20}}>
                <View style={{display:'flex', flexDirection:'row', gap:15}}>
                  <Text style={{fontSize:18, fontWeight:'500'}}>UserName</Text>
                  <TextInput
                  style={{
                    borderColor: "rgba(4, 157, 255, 1)",
                    borderBottomWidth: 1,
                    fontSize: 20,
                    maxWidth: "100%",
                  }}
                  placeholder="Username...."
                  value={username}
                  onChangeText={(text) => setUsername(text)}/>
                </View>
                <View style={{display:'flex', flexDirection:'row', gap:15}}>
                  <Text style={{fontSize:18, fontWeight:'500'}}>PassWord</Text>
                  <TextInput
                  style={{
                    borderColor: "rgba(4, 157, 255, 1)",
                    borderBottomWidth: 1,
                    fontSize: 20,
                    maxWidth: "80%",
                  }}
                  placeholder="Password...."
                  value={password}
                  onChangeText={(text) => setPassword(text)}/>
                </View>
                <View style={{display:'flex', flexDirection:'row', gap:15}}>
                  <Text style={{fontSize:18, fontWeight:'500'}}>Email</Text>
                  <TextInput
                  style={{
                    borderColor: "rgba(4, 157, 255, 1)",
                    borderBottomWidth: 1,
                    fontSize: 20,
                    maxWidth: "80%",
                  }}
                  placeholder="Email...."
                  value={email}
                  onChangeText={(text) => setEmail(text)}/>
                </View>
              </View>
              <View style={{display: 'flex', flexDirection:'row', gap:25}}>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom:12,
                    paddingTop:12,
                    paddingLeft:40,
                    paddingRight:40,
                    borderWidth:1,
                    borderColor:"rgba(241, 0, 43, 1)",
                    backgroundColor:"rgba(241, 0, 43, 0.2)",
                    borderRadius:10
                  }}
                  onPress={() => setModalChange(!modalChange)}
                >
                  <Text style={{fontSize:20, color:"rgba(241, 0, 43, 1)"}}>Huỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom:12,
                    paddingTop:12,
                    paddingLeft:25,
                    paddingRight:25,
                    borderWidth:1,
                    borderColor:" rgba(0, 215, 43, 1)",
                    backgroundColor:" rgba(0, 215, 43, 0.2)",
                    borderRadius:10
                  }}
                  onPress={() => {checkChange()}}
                >
                  <Text style={{fontSize:20, color:"rgba(0, 215, 43, 1)"}}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCheckChange}
        onRequestClose={() => {
          setModalCheckChange(!modalCheckChange);
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 30,
              borderWidth: 1,
              borderColor: "white",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            
            <View style={{display:'flex', justifyContent:'center', alignItems:'center', gap:25}}>
              <View style={{display: 'flex', flexDirection:'row', gap:25}}>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom:12,
                    paddingTop:12,
                    paddingLeft:40,
                    paddingRight:40,
                    borderWidth:1,
                    borderColor:"rgba(241, 0, 43, 1)",
                    backgroundColor:"rgba(241, 0, 43, 0.2)",
                    borderRadius:10
                  }}
                  onPress={() => setModalCheckChange(!modalChange)}
                >
                  <Text style={{fontSize:20, color:"rgba(241, 0, 43, 1)"}}>Huỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom:12,
                    paddingTop:12,
                    paddingLeft:25,
                    paddingRight:25,
                    borderWidth:1,
                    borderColor:" rgba(0, 215, 43, 1)",
                    backgroundColor:" rgba(0, 215, 43, 0.2)",
                    borderRadius:10
                  }}
                >
                  <Text style={{fontSize:20, color:"rgba(0, 215, 43, 1)"}}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function Infor({route}){
 
  const infoUser = route.params;
  return(
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name = 'Info' component={Info} initialParams={infoUser}/>
        <Stack.Screen name ='Tree' component={Tree}/>
        <Stack.Screen name ='Fertilizer' component={Fertilizer}/>
      </Stack.Navigator>

  )
}
const styles = StyleSheet.create({
  khungInfo: {
    backgroundColor: "rgba(10, 16, 13, 0.3)",
    paddingBottom: 10,
    paddingTop: 30,
    paddingLeft: 100,
    paddingRight: 100,
    borderRadius: 40,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 60,
  },
  textUserName: {
    fontSize: 20,
  },
  khungLogout: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
  },
  logout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 25,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 150,
  },
});
