import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../../store';

const GREEN = '#2E7D32';

export function DrawerContent(props) {
  const [state, dispatch] = useContext(Context);
  const [user, setUser] = useState({});
  const current = props.state?.routeNames?.[props.state.index];

  useEffect(() => {
    if (state.sessionData) setUser(state.sessionData);
  }, [state]);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        {/* profile row */}
        <View style={styles.profile}>
          <View>
            <Avatar.Image
              source={{ uri: user.session_client_user_image || undefined }}
              size={50}
            />
            <View style={styles.statusDot} />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.greeting}>Welcome back 👋</Text>
            <Text style={styles.name} numberOfLines={1}>
              {user.session_client_user_name || 'User'}
            </Text>
            <View style={styles.rolePill}>
              <Text style={styles.roleText}>
                {user.session_client_user_status === '1' ? 'Facility Engineer' : 'Manager'}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>MENU</Text>

        {/* Dashboard */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.item, current === 'Dashboard' && { backgroundColor: '#E8F5E9' }]}
          onPress={() => {
            props.navigation.navigate('HomeDrawer', {
              screen: 'CEZCON HRM',
              params: {
                screen: 'Dashboard',
              },
            });
          }}
        >
          <View style={[styles.iconChip, { backgroundColor: '#E8F5E9' }]}>
            <FontAwesome5 name="home" size={15} color="#2E7D32" />
          </View>
          <Text style={[styles.label, current === 'Dashboard' && { color: '#2E7D32', fontWeight: '700' }]}>
            Dashboard
          </Text>
        </TouchableOpacity>

        {/* Employee */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.item, current === 'Employee' && { backgroundColor: '#E3F2FD' }]}
          onPress={() => {
            props.navigation.navigate('HomeDrawer', {
              screen: 'CEZCON HRM',
              params: {
                screen: 'Employee',
              },
            });
          }}
        >
          <View style={[styles.iconChip, { backgroundColor: '#E3F2FD' }]}>
            <FontAwesome5 name="user-tie" size={15} color="#1565C0" />
          </View>
          <Text style={[styles.label, current === 'Employee' && { color: '#1565C0', fontWeight: '700' }]}>
            Employee
          </Text>
        </TouchableOpacity>

        {/* Attendance */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.item, current === 'Attandance' && { backgroundColor: '#FFF3E0' }]}
          onPress={() => {
            props.navigation.navigate('HomeDrawer', {
              screen: 'CEZCON HRM',
              params: {
                screen: 'Attandance',
              },
            });
          }}
        >
          <View style={[styles.iconChip, { backgroundColor: '#FFF3E0' }]}>
            <FontAwesome5 name="vote-yea" size={15} color="#E65100" />
          </View>
          <Text style={[styles.label, current === 'Attandance' && { color: '#E65100', fontWeight: '700' }]}>
            Attendance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.item, current === 'Applications' && { backgroundColor: '#FFF3E0' }]}
          onPress={() => {
            props.navigation.navigate('HomeDrawer', { screen: 'Applications' })

          }}
        >
          <View style={[styles.iconChip, { backgroundColor: '#eaeaea' }]}>
            <FontAwesome5 name="file-alt" size={15} color="#5f65fc" />
          </View>
          <Text style={[styles.label, current === 'Applications' && { color: '#E65100', fontWeight: '700' }]}>
            Applications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.item, current === 'Doccuments' && { backgroundColor: '#FFF3E0' }]}
          onPress={() => {
            props.navigation.navigate('HomeDrawer', { screen: 'Doccuments' })

          }}
        >
          <View style={[styles.iconChip, { backgroundColor: '#fff3f5' }]}>
            <FontAwesome5 name="file" size={15} color="#bc6e7e" />
          </View>
          <Text style={[styles.label, current === 'Doccuments' && { color: '#E65100', fontWeight: '700' }]}>
            Doccuments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.item, current === 'Announcements' && { backgroundColor: '#FFF3E0' }]}
          onPress={() => {
            props.navigation.navigate('HomeDrawer', { screen: 'Announcements' })

          }}
        >
          <View style={[styles.iconChip, { backgroundColor: '#fff3f5' }]}>
            <FontAwesome5 name="bullhorn" size={15} color="#bc6e7e" />
          </View>
          <Text style={[styles.label, current === 'Announcements' && { color: '#E65100', fontWeight: '700' }]}>
            Announcements
          </Text>
        </TouchableOpacity>
      </DrawerContentScrollView>

      <TouchableOpacity
        style={styles.signOut}
        onPress={() => {
          dispatch({ type: 'SET_SESSION', payload: null });
          AsyncStorage.removeItem('sessionData');
        }}
      >
        <View style={[styles.iconChip, { backgroundColor: '#FDECEA' }]}>
          <Icon name="exit-to-app" color="#D32F2F" size={18} />
        </View>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 20,
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileText: { marginLeft: 12, flex: 1 },
  greeting: { fontSize: 11, color: '#999' },
  name: { fontSize: 16, fontWeight: '700', color: '#222', marginTop: 2 },
  rolePill: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 3,
    marginTop: 6,
  },
  roleText: { fontSize: 11, color: GREEN, fontWeight: '600' },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#aaa',
    letterSpacing: 1,
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  iconChip: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  label: { fontSize: 14, color: '#666' },
  signOut: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    paddingLeft: 18,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  signOutText: { fontSize: 14, color: '#D32F2F', fontWeight: '600' },
});