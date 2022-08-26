import React from 'react';
import { StyleSheet, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../src/screens/HomeScreen';
import DiscoverScreen from '../src/screens/DiscoverScreen';
import ProfileScreen from '../src/screens/ProfileScreen';



const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel:false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 10,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroudColor: '#ffffff',
                    borderRadius: 15,
                    height: 70,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false/*, tabBarIcon: () => (<Image source={require("../assets/icons/map.png")} style={{ width: 30, height: 30 }} />)*/ }} />
            <Tab.Screen name='DiscoverScreen' component={DiscoverScreen} options={{ headerShown: false/*, tabBarIcon: () => (<Image source={require("../assets/icons/news.png")} style={{ width: 30, height: 30 }} />)*/ }} />
            <Tab.Screen name='ProfileScreen' component={ProfileScreen} options={{ headerShown: false/*,  tabBarIcon: () => (<Image source={require("../assets/icons/community.png")} style={{width: 30, height: 30}} />)*/ }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tabs;