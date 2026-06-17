import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Alert, LogBox, Platform, AppState } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import AppStyles from '../../AppStyles'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MainTabs from '../MainTabs';
import LoginScreen from '../Login';
import { Context } from '../../store';
import Applications from '../Applications';
import Doccuments from '../Doccuments';
import Announcements from '../Announcements';
import AnnouncementDetails from '../Announcements/AnnouncementDetails';



const Stack = createNativeStackNavigator();

function App(props) {

  const { navigation } = props;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    AsyncStorage.getItem('sessionData', (err, result) => {
      const data = JSON.parse(result);
      if (data === "in") {
        setIsLoggedin(true)
      } else {
        setIsLoggedin(false)
      }
    })
  }, []);

  useEffect(() => {
    if (!state.sessionData) {
      props.navigation.dispatch(DrawerActions.closeDrawer());
      setIsLoggedin(false);
    } else {
      setIsLoggedin(true);
    }
  }, [state.sessionData]);


  function BackButtonAndDrawer() {
    const navigation = useNavigation();
    return (
      <View style={{ flexDirection: 'row' }}>
        <Icon
          name="menu"
          size={30}
          style={{ marginLeft: -10, top: Platform.OS === 'ios' ? 0 : 6 }}
          // color={AppStyles.colorSet.headerContent}
          color={"#fff"}
          onPress={() => navigation.openDrawer()}
        />
        {navigation.canGoBack() &&
          (Platform.OS === 'ios' ? (
            <Icon
              name="chevron-left"
              size={35}
              style={{ marginLeft: 10, marginTop: -3 }}
              // color={AppStyles.colorSet.headerContent}
              color={"#fff"}
              onPress={() => navigation.goBack()}
            />
          ) : (
            <Ionicons
              name="arrow-back"
              size={25}
              style={{ marginLeft: 0, marginTop: 3, padding: 5 }}
              // color={AppStyles.colorSet.headerContent}
              color={"#fff"}
              onPress={() => navigation.goBack()}
            />
          ))}
      </View>
    );
  }


  const HeaderGradient = () => (
    <LinearGradient
      colors={['#3068CC', '#6fb168']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    />
  );
  return (

    <Stack.Navigator>
      {!isLoggedin && (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
      {isLoggedin && (
        <>
          <Stack.Screen
            name="CEZCON HRM"
            component={MainTabs}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#6fb168",
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTitle: () => <Text style={{ color: "#fff", fontSize: 16, fontWeight: 'bold' }}>Cezcon HRM</Text>,
              headerLeft: () => (
                <Text
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                >
                  {' '}
                  <Icon name="menu" size={25} color={"#fff"} />
                </Text>
              ),
            }}
          />
          <Stack.Screen
            name="Applications"
            component={Applications}
            options={{
              headerStyle: {
                backgroundColor: AppStyles.colorSet.primaryColor
              },
              headerTintColor: '#fff',
              headerTitle: 'Applications',
              headerLeft: () => <BackButtonAndDrawer />,
            }}
          />
          <Stack.Screen
            name="Doccuments"
            component={Doccuments}
            options={{
              headerStyle: {
                backgroundColor: AppStyles.colorSet.primaryColor
              },
              headerTintColor: '#fff',
              headerTitle: 'Documents',
              headerLeft: () => <BackButtonAndDrawer />,
            }}
          />
          <Stack.Screen
            name="Announcements"
            component={Announcements}
            options={{
              headerStyle: {
                backgroundColor: AppStyles.colorSet.primaryColor
                ,
              },
              headerTintColor: '#fff',
              headerTitle: 'Announcements',
              headerLeft: () => <BackButtonAndDrawer />,
            }}
          />
          <Stack.Screen
            name="AnnouncementsDetails"
            component={AnnouncementDetails}
            options={{
              headerTintColor: '#fff',
              headerTitle: 'Announcements Details',
              headerLeft: () => <BackButtonAndDrawer />,
              headerBackground: () => <HeaderGradient />,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default App;
