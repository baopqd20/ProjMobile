import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Component, useState } from "react";

import DuBao from "../DuBao/dubao";
import { Home, Tree, Activity, Setting } from "../Icon/icon";
import TuoiTieu from "../TuoiTieu/tuoitieu";
import Info from "../Info/info";
import HomeScreen from "../ThongSo/HomeScreen";
import TTDD from "../DuBao/dubao";
import { NavigationContainer } from "@react-navigation/native";

export default function HomeTab({route}) {
  const Tab = createBottomTabNavigator();
  const infoUser = route.params
  return (
    <Tab.Navigator
        screenOptions={(router) => ({
          headerShown: false,
            tabBarActiveTintColor:'#2E86C1'
        })}
      >
        <Tab.Screen name="Trang chủ" component={DuBao}
            options={{
                tabBarIcon:({color, size}) => <Home color={color}/>
            }}
        />
        <Tab.Screen name="Thống kê" component={HomeScreen}
            options={{
                tabBarIcon:({color, size}) => <Activity color={color}/>
            }}
        />
        <Tab.Screen name="Tưới tiêu" component={TuoiTieu}
            options={{
                tabBarIcon:({color, size}) => <Tree color={color}/>
            }}
        />
        <Tab.Screen name="Khác" component={Info} 
            initialParams={infoUser} 
            options={{
                tabBarIcon:({color, size}) => <Setting color={color}/>
            }}
        />
      </Tab.Navigator>
  );
}
