import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Animated, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerActions } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import home from '../../../assets/home.png';

const Tab = createBottomTabNavigator();

const ACTIVE = '#2E7D32';
const INACTIVE = '#9E9E9E';

// icon for each route, tinted by focus color
const icons = {
  Employee: (color) => <FontAwesome5 name="user-tie" size={22} color={color} />,
  Dashboard: (color) => (
    <Image source={home} style={{ width: 24, height: 24, tintColor: color }} />
  ),
  Attandance: (color) => <FontAwesome5 name="vote-yea" size={22} color={color} />,
};

function MyTabBar({ state, navigation }) {
  const [width, setWidth] = useState(0);
  const tabWidth = width / state.routes.length;
  const translateX = useRef(new Animated.Value(0)).current;

  // slide the pill to the active tab whenever the index changes
  useEffect(() => {
    if (!tabWidth) return;
    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      damping: 18,
      stiffness: 150,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [state.index, tabWidth]);

  return (
    <View
      style={styles.tabBar}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {/* sliding highlight */}
      {width > 0 && (
        <Animated.View
          style={[styles.pillSlot, { width: tabWidth, transform: [{ translateX }] }]}
        >
          <View style={[styles.pill, { width: tabWidth - 24 }]} />
        </Animated.View>
      )}

      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const color = focused ? ACTIVE : INACTIVE;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // scale the icon up as the pill arrives at it
        const scale =
          width > 0
            ? translateX.interpolate({
                inputRange: [(index - 1) * tabWidth, index * tabWidth, (index + 1) * tabWidth],
                outputRange: [1, 1.2, 1],
                extrapolate: 'clamp',
              })
            : 1;

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.8}
            style={styles.tabItem}
            onPress={onPress}
          >
            <Animated.View style={{ transform: [{ scale }] }}>
              {icons[route.name](color)}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={'green'} />

      <Tab.Navigator
        initialRouteName="Dashboard"
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: 'green' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => (
            <Text onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              {'  '}
              <Icon name="menu" size={25} color={'#fff'} />
            </Text>
          ),
        })}
      >
        <Tab.Screen name="Employee" component={EmployeeScreen} />
        <Tab.Screen name="Dashboard" component={Mainscreen} />
        <Tab.Screen name="Attandance" component={AttendanceScreen} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    height: 64,
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  pillSlot: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pill: {
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E8F5E9',
  },
  tabItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Mainscreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard</Text>
    </View>
  );
}

function AttendanceScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Attendamce</Text>
    </View>
  );
}

function EmployeeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>EmployeeScreen</Text>
    </View>
  );
}

export default App;