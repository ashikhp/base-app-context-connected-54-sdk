import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Alert,LogBox } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

import MainTabs from '../MainTabs';
import LoginScreen from '../Login';
import { Context } from '../../store';

const Stack = createNativeStackNavigator();

function App(props) {
  
LogBox.ignoreAllLogs();

  const { navigation } = props;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    AsyncStorage.getItem('sessionData', (err, result) => {
      const data = JSON.parse(result);
      if(data === "in"){
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
                backgroundColor: "green",
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

        </>
       )}
    </Stack.Navigator>
  );
}

export default App;
