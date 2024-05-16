import React, { Component, useState } from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Back } from "../../Icon/icon";
import { Note } from "../../Icon/icon";
const PhanBon ={
  NPK:require("./Fertilizer/NPK.png"),
  CAN:require("./Fertilizer/CAN.png"),
  AS:require("./Fertilizer/AS.png"),
  UREA:require("./Fertilizer/UR.png"),
  KCL:require("./Fertilizer/KCL.png"),
  DAP:require("./Fertilizer/DAP.png"),
  MKP:require("./Fertilizer/MPK.png"),
  SOP:require("./Fertilizer/SOP.png")
}
export default function Fertilizer({ navigation, route }) {
  const [detail, setDetail] = useState(false);
  const [id, setId] = useState(0);
  const data = route.params
  const goBack = () => {
    return navigation.push("Info");
  };
  const modal = (tree:any) => {
    if ((tree.id == id)) {
      return (
        <Modal
          key={tree.id} 
          animationType="slide"
          transparent={true}
          visible={detail}
          onRequestClose={() => {
            setDetail(!detail);
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              padding:10
            }}
          >
            <ImageBackground
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
               
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 10,
                
                maxHeight: "60%",
                overflow: "hidden",
                backgroundColor: "rgba(25, 255, 255, 0.5)",
              }}
              source={PhanBon[tree.img]}
              resizeMode="cover"
             
            >
              <ScrollView>
                <View  style={{ display: "flex", gap: 20,  backgroundColor: "rgba(255, 255, 255, 0.8)",padding:10, borderRadius:10 } }>
                  <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <Image
                    source={PhanBon[tree.img]}
                    style={{ width: 250, height: 260, borderRadius:10, borderColor:'black', borderWidth:1  }}
                  />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 25, fontWeight: "600",  textAlign:'center'}}>
                      {tree.name}
                    </Text>
                  </View>
                  <Text style={{textAlign:'justify',fontWeight: "500",}}>- Thành phần: {tree.thanhPhan}</Text>
                  <Text style={{textAlign:'justify',fontWeight: "500"}}>- Thích hợp: {tree.thichHop}</Text>
                  <Text style={{textAlign:'justify',fontWeight: "500"}}>- Loại đất: {tree.kieuDat}</Text>
                  <Text style={{textAlign:'justify',fontWeight: "500"}}>- Thời gian bón thích hợp: {tree.time}</Text>
                  
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "rgba(31, 174, 255, 1)",
                        backgroundColor: "rgba(31, 174, 255, 0.6)",
                        borderRadius: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                      }}
                      onPress={() => setDetail(!detail)}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "500",
                          color: "blue",
                        }}
                      >
                        Đã hiểu
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </ImageBackground>
          </View>
        </Modal>
      );
    }
  };
  return (
    <View style={{backgroundColor:' rgba(0, 236, 255, 1)', width:'100%', height:'100%'}}>
      <View style={{backgroundColor:'rgba(0, 0, 0, 0.2)', width:'100%', height:'100%'}}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 30,
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => goBack()}>
          <Back color={"black"} />
        </TouchableOpacity>
        <View style={{ paddingRight: 30 }}>
          <Text style={{ fontSize: 35 }}>Phân bón</Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: 'row',
            padding: 20,
            gap: 25,
            overflow: "hidden",
            flexWrap: 'wrap',
            height:'100%'
          }}
        >
          {data.map((tree:any) => (
            <View style={{ display: "flex",borderRadius:10,width:'45%'}}
            key={tree.id}>
           <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                gap: 15,
                borderColor: "black",
                padding: 15,
              }}
              
              onPress={() => {
                setDetail(true), setId(tree.id);
              }}
            >
              <Image source={PhanBon[tree.img]} style={{ width: 100, height: 110, borderRadius:10, borderColor:'white', borderWidth:1 }} />
              <Text style={{fontSize:20, color:'white', textAlign:'center'}}>{tree.name}</Text>
            </TouchableOpacity>
           </View>
          ))}
        </View>
        {data.map((tree:any) => modal(tree))}
      </ScrollView>
      </View>
    </View>
  );
}
