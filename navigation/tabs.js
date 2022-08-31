import React from 'react';
import { StyleSheet, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../src/screens/HomeScreen';
import DiscoverScreen from '../src/screens/DiscoverScreen';
import ProfileScreen from '../src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        // <Tab.Navigator
        //     screenOptions={{
        //         tabBarShowLabel:false,
        //         tabBarStyle: {
        //             position: 'absolute',
        //             bottom: 10,
        //             left: 20,
        //             right: 20,
        //             elevation: 0,
        //             backgroudColor: '#ffffff',
        //             borderRadius: 15,
        //             height: 70,
        //             ...styles.shadow
        //         }
        //     }}
        // >
        //     <Tab.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false, tabBarIcon: () => (<Image source={require('../assets/icons/bookmark.png')} style={{ width: 30, height: 30 }} />) }} />
        //     <Tab.Screen name='DiscoverScreen' component={DiscoverScreen} options={{ headerShown: false, tabBarIcon: () => (<Image source={require('../assets/icons/search.png')} style={{ width: 30, height: 30 }} />)  }} />
        //     <Tab.Screen name='ProfileScreen' component={ProfileScreen} options={{ headerShown: false, tabBarIcon: () => (<Image source={require('../assets/icons/user.png')} style={{ width: 30, height: 30 }} />)  }} />
        // </Tab.Navigator>

        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel:false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#333336',
                    height:50,
                    bottom: 10,
                    left: 50,
                    right: 50,
                    borderRadius: 30
                }
            }}
        >
            <Tab.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false, tabBarIcon: ({focused}) => (<Image source={require('../assets/icons/1.png')} style={{ width: 30, height: 30, tintColor : focused ? '#e32f45' : 'white' }} />) }} />
            <Tab.Screen name='DiscoverScreen' component={DiscoverScreen} options={{ headerShown: false, tabBarIcon: ({focused}) => (<Image source={require('../assets/icons/2.png')} style={{ width: 30, height: 30, tintColor : focused ? '#e32f45' : 'white' }} />) }} />
            <Tab.Screen name='ProfileScreen' component={ProfileScreen} options={{ headerShown: false, tabBarIcon: ({focused}) => (<Image source={require('../assets/icons/5.png')} style={{ width: 30, height: 30, tintColor : focused ? '#e32f45' : 'white' }} />)  }} />
        </Tab.Navigator>
    )
}

export default Tabs;