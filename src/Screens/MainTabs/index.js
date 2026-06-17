import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import AppStyles from '../../AppStyles';
import home from '../../../assets/home.png';
import Attandance from '../Attandance';
import DashBoard from '../DashBoard';
import Leaves from '../Leaves';
import Payslip from '../Payslip';
import Request from '../Request';

// import AppStyles from '../../AppStyles';

const Tab = createBottomTabNavigator();


const ACTIVE_SOFT = '#E8F5E9';
const INACTIVE = '#9E9E9E';

const META = {
  Leaves: {
    label: 'Leaves',
    icon: (c) => (
      <FontAwesome5 name="umbrella-beach" size={18} color={c} />
    ),
  },

  Dashboard: {
    label: 'Dashboard',
    icon: (c) => (
      <Image
        source={home}
        style={{ width: 20, height: 20, tintColor: c }}
      />
    ),
  },

  Attandance: {
    label: 'Attendance',
    icon: (c) => (
      <FontAwesome5 name="calendar-check" size={18} color={c} />
    ),
  },

  Request: {
    label: 'Request',
    icon: (c) => (
      <MaterialCommunityIcons
        name="clipboard-text-outline"
        size={20}
        color={c}
      />
    ),
  },

  Payslip: {
    label: 'Payslip',
    icon: (c) => (
      <MaterialCommunityIcons
        name="file-document-outline"
        size={20}
        color={c}
      />
    ),
  },
};
function AppHeader({ title, subtitle, navigation }) {
  const insets = useSafeAreaInsets();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, [anim]);

  const animStyle = {
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] }) }],
  };

  return (
    <View style={[hdr.wrap, { paddingTop: insets.top + 8 }]}>
      <View style={hdr.glow} />
      <Animated.View style={[hdr.row, animStyle]}>
        <TouchableOpacity style={hdr.iconBtn} hitSlop={10} activeOpacity={0.7} onPress={() => navigation?.openDrawer?.()}>
          <MaterialCommunityIcons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={hdr.titleWrap} />
        <TouchableOpacity style={hdr.iconBtn} hitSlop={10} activeOpacity={0.7}
          onPress={() => navigation?.navigate?.('Announcements')}>
          <MaterialCommunityIcons name="bell" size={22} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function MyTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[tb.bar, { bottom: 10 + insets.bottom }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const color = focused ? AppStyles.colorSet.primaryColor : AppStyles.colorSet.INACTIVE;
        const meta = META[route.name];

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.8}
            style={tb.item}
            onPress={onPress}
          >
            <View style={{ opacity: focused ? 1 : 0.5 }}>
              {meta.icon(color)}
            </View>
            <Text
              numberOfLines={1}
              style={[tb.label, { color }, focused && tb.labelActive]}
            >
              {meta.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const App = () => {
  return (
    <>
      <StatusBar style="light" />
      <Tab.Navigator
        initialRouteName="Dashboard"
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={({ navigation }) => ({
          header: () => (
            <AppHeader
              navigation={navigation}
            />
          ),
        })}
      >
        <Tab.Screen name="Attandance" component={Attandance} />
        <Tab.Screen name="Leaves" component={Leaves} />
        <Tab.Screen name="Dashboard" component={DashBoard} />
        <Tab.Screen name="Payslip" component={Payslip} />
        <Tab.Screen name="Request" component={Request} />


      </Tab.Navigator>
    </>
  );
};

const hdr = StyleSheet.create({
  wrap: {
    backgroundColor: AppStyles.colorSet.primaryColor,
    paddingHorizontal: 14,
    paddingBottom: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',

    shadowColor: '#1B5E20',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  glow: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
  },

  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },

  title: {
    fontSize: 19,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
    textAlign: 'center',
  },
});

const tb = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 12,
    right: 12,
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 10,
  },

  item: {
    flex: 1,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    marginTop: 4,
    fontSize: 9,
    fontWeight: '500',
    textAlign: 'center',
  },

  labelActive: {
    fontWeight: '600',
  },
});

export default App;