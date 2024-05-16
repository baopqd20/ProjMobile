import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
  SafeAreaView,
  Modal,
  Pressable,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeTab from "../HomeTab/homeTab";
import LinearGradient from "react-native-linear-gradient";
import { UserOI, Password, Phone } from "../Icon/icon";
import axios from "axios";
const Stack = createNativeStackNavigator();
const IP = 'https://8bad-113-160-14-17.ngrok-free.app'
function Welcome({ navigation }) {
  const [login, setLogin] = useState(true);
  const [dn, setDn] = useState(false);
  const [dk, setDk] = useState(false);
  const huy = () => {
    return setLogin(true), setDk(false), setDn(false);
  };
  const DangNhap = () => {
    return setLogin(false), setDk(false), setDn(true);
  };
  const DangKi = () => {
    return setLogin(false), setDk(true), setDn(false);
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameS, setUsernameS] = useState("");
  const [passwordS, setPasswordS] = useState("");
  const [email, setEmail]= useState("")
  const [apiSaveUser, setApiSaveUser] = useState({})
  const [apiLogin, setApiLogin] = useState({});
  const [modalErr, setModalErr] = useState(false);
  const [modalDK, setModalDK] = useState(false)
  const [modalDKF, setModalDKF] = useState(false)
  const [modalDKT, setModalDKT] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)
  useEffect(()=>{
    setApiSaveUser({
      username:usernameS,
      password:passwordS,
      email:email
    })
  },[username,password, email])
  useEffect(() => {
    setApiLogin({
      username: username,
      password: password,
    });
  }, [username, password]);
  const check = ()=>{
    navigation.navigate("HomeTab", apiLogin);
  }
  const ApiLogin = async () => {
    try {
      const res = await axios.post(
        `${IP}/login`,
        apiLogin
      );
      if (res.data.message) {
        navigation.navigate("HomeTab", apiLogin);
      } else {
        setModalErr(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ApiSignUp = async () =>{
    try{
      const res = await axios.post(`${IP}/insertuser`, apiSaveUser)
      console.log(res.data.message)
      if(res.data.message){
        setModalDK(true)
      }
      if(res.data.trunglap){
        setModalDKT(true)
      }
    }
    catch(error){
      console.log(error)
    }
  }
  const checkSignUp = ()=>{
    if(usernameS =="" || passwordS=="" || email==""){
      setModalDKF(true)
    }
    else{
      ApiSignUp()
    }
  }
  return (
    <SafeAreaView
      style={{ backgroundColor: "rgba(96, 211, 138, 0.6)", height: "100%" }}
    >
      <View style={styles.khungtitle}>
        <Text style={styles.title}>
          Chào mừng đến với ứng dụng nông nghiệp thông minh
        </Text>
      </View>
      {login && (
        <View style={{ width: "100%", marginTop: 100 }}>
          <View style={styles.info}>
            <TouchableOpacity style={styles.btnDn} onPress={() => DangNhap()}>
              <Text style={styles.btn}>Đăng Nhập</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.info}>
            <TouchableOpacity style={styles.btnDk} onPress={() => DangKi()}>
              <Text style={styles.btn}>Đăng kí</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {dn && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <View style={styles.bodyDn}>
            <View style={styles.user}>
              <UserOI color={"rgba(4, 157, 255, 1)"} />
              <TextInput
                style={{
                  borderColor: "rgba(4, 157, 255, 1)",
                  borderBottomWidth: 1,
                  fontSize: 20,
                  maxWidth: "80%",
                }}
                placeholder="Username...."
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View style={styles.pass}>
              <Password color={"rgba(4, 157, 255, 1)"} />
              <TextInput
                style={{
                  borderColor: "rgba(4, 157, 255, 1)",
                  borderBottomWidth: 1,
                  fontSize: 20,
                  maxWidth: "80%",
                }}
                placeholder="Password...."
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
              paddingTop: 50,
            }}
          >
            <TouchableOpacity>
              <Image
                source={require("./facebook.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("./google.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalErr}
            onRequestClose={() => {
              setModalErr(!modalErr);
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
            <Text style={{ fontSize: 20, fontWeight:"500", textAlign:'center'}}>
              Bạn đã nhập sai username hoặc password
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
                  borderColor:" rgba(246, 18, 0, 1)",
                  backgroundColor:" rgba(246, 18, 0, 0.3)",
                  borderRadius:10
                }}
                onPress={() => {setModalErr(!modalErr)}}
              >
                <Text style={{fontSize:20, color:"rgba(246, 18, 0, 1)"}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
          </Modal>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
              padding: 15,
              marginTop: 60,
              width: "100%",
            }}
          >
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 108, 163, 0.9)",
                  borderColor: "white",
                  borderWidth: 1,
                  paddingLeft: 20,
                  paddingBottom: 15,
                  paddingRight: 20,
                  paddingTop: 15,
                  borderRadius: 25,
                }}
                onPress={() => {check()}}
              >
                <Text style={{ color: "white" }}>Xong</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderColor: "#0099FF",
                  borderWidth: 1,
                  paddingLeft: 105,
                  paddingBottom: 15,
                  paddingRight: 105,
                  paddingTop: 15,
                  borderRadius: 25,
                }}
                onPress={() => {
                  huy();
                }}
              >
                <Text>Huỷ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {dk && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <View style={styles.bodyDn}>
            <View style={styles.user}>
              <UserOI color={"rgba(4, 157, 255, 1)"} />
              <TextInput
                placeholder="UserName"
                style={{
                  borderColor: "rgba(4, 157, 255, 1)",
                  borderBottomWidth: 1,
                  maxWidth: "80%",
                  fontSize: 20,
                }}
                value={usernameS}
                onChangeText={(text) => setUsernameS(text)}
              />
            </View>
            <View style={styles.pass}>
              <Password color={"rgba(4, 157, 255, 1)"} />
              <TextInput
                placeholder="Password"
                style={{
                  borderColor: "rgba(4, 157, 255, 1)",
                  borderBottomWidth: 1,
                  maxWidth: "80%",
                  fontSize: 20,
                }}
                value={passwordS}
                onChangeText={(text)=>setPasswordS(text)}
              />
            </View>
            <View style={styles.sdt}>
              <Phone color={"rgba(4, 157, 255, 1)"} />
              <TextInput
                placeholder="Email"
                style={{
                  borderColor: "rgba(4, 157, 255, 1)",
                  borderBottomWidth: 1,
                  maxWidth: "80%",
                  fontSize: 20,
                }}
                value={email}
                onChangeText={(text)=> setEmail(text)}
              />
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalDK}
            onRequestClose={() => {
              setModalDK(!modalDK);
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
              width:'80%'
            }}
          >
            <Text style={{ fontSize: 20, fontWeight:"500", textAlign:'center'}}>
              Bạn đã đăng kí thành công tài khoản
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
                  borderColor:"  rgba(9, 162, 246, 1)",
                  backgroundColor:"  rgba(9, 162, 246, 0.3)",
                  borderRadius:10
                }}
                onPress={() => {setModalDK(!modalDK)}}
              >
                <Text style={{fontSize:20, color:" rgba(9, 162, 246, 1)"}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalDKF}
            onRequestClose={() => {
              setModalDKF(!modalDKF);
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
              width:'80%'
            }}
          >
            <Text style={{ fontSize: 20, fontWeight:"500", textAlign:'center', color:'red'}}>
              Bạn cần nhập đầy đủ thông tin để hoàn thành đăng kí tài khoản
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
                  borderColor:"  rgba(0, 0, 0, 1)",
                  backgroundColor:"  rgba(0, 0, 0, 0.3)",
                  borderRadius:10
                }}
                onPress={() => {setModalDKF(!modalDKF)}}
              >
                <Text style={{fontSize:20, color:" rgba(0, 0, 0, 1)"}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalDKT}
            onRequestClose={() => {
              setModalDKT(!modalDKT);
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
              width:'80%'
            }}
          >
            <Text style={{ fontSize: 20, fontWeight:"500", textAlign:'center', color:'red'}}>
              Tên người dùng này đã tồn tại
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
                  borderColor:"  rgba(0, 0, 0, 1)",
                  backgroundColor:"  rgba(0, 0, 0, 0.3)",
                  borderRadius:10
                }}
                onPress={() => {setModalDKT(!modalDKT)}}
              >
                <Text style={{fontSize:20, color:" rgba(0, 0, 0, 1)"}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalLogin}
            onRequestClose={() => {
              setModalLogin(!modalLogin);
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
              width:'80%'
            }}
          >
            <Text style={{ fontSize: 20, fontWeight:"500", textAlign:'center', color:'red'}}>
              Vui lòng điền đầy đủ thông tin để đăng nhập
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
                  borderColor:"  rgba(0, 0, 0, 1)",
                  backgroundColor:"  rgba(0, 0, 0, 0.3)",
                  borderRadius:10
                }}
                onPress={() => {setModalLogin(!modalLogin)}}
              >
                <Text style={{fontSize:20, color:" rgba(0, 0, 0, 1)"}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
          </Modal>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
              padding: 15,
              marginTop: 60,
              width: "100%",
            }}
          >
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 108, 163, 0.7)",
                  borderColor: "white",
                  borderWidth: 1,
                  paddingLeft: 100,
                  paddingBottom: 15,
                  paddingRight: 100,
                  paddingTop: 15,
                  borderRadius: 25,
                }}
                onPress={()=> checkSignUp()}
              >
                <Text style={{ color: "white" }}>Xong</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderColor: "#0099FF",
                  borderWidth: 1,
                  paddingLeft: 105,
                  paddingBottom: 15,
                  paddingRight: 105,
                  paddingTop: 15,
                  borderRadius: 25,
                }}
                onPress={() => huy()}
              >
                <Text>Huỷ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
    //       <View>
    //       <Text>check</Text>
    //   </View>
  );
}
export default function WelcomeRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="HomeTab" component={HomeTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  khungtitle: {
    display: "flex",
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    // fontFamily: "Garamond",
  },
  info: {
    alignItems: "center",
  },
  btnDn: {
    backgroundColor: "#33FFFF",
    width: "50%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 10,
  },
  btn: {
    fontSize: 18,
    // fontFamily: "Garamond",
  },
  btnDk: {
    backgroundColor: "#33FFFF",
    width: "50%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderRadius: 25,
    marginTop: 30,
  },
  bodyDn: {
    backgroundColor: "rgba(111, 149, 208, 0.3)",
    width: "95%",
    borderColor: "rgba(111, 149, 208, 1)",
    borderWidth: 2,
    borderRadius: 10,
    paddingTop: 25,
    paddingBottom: 30,
    display: "flex",
    gap: 20,
  },
  user: {
    width: "100%",
    height: 30,
    paddingLeft: 40,
    paddingRight: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  pass: {
    width: "100%",
    height: 30,
    paddingLeft: 40,
    paddingRight: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginTop: 10,
  },
  sdt: {
    width: "100%",
    height: 30,
    paddingLeft: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginTop: 10,
  },
});
