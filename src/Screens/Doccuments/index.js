import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const DOCS = [
  {
    name: 'National ID',
    icon: 'card-account-details-outline',
    exp: 'Jun 19, 2026',
    badge: 'Expires in 8d',
    pct: 6,
    fill: '#FBEAF0',
    iconColor: '#D4537E',
    badgeBg: '#FCEBEB',
    badgeText: '#A32D2D',
    bar: '#E24B4A',
  },
  {
    name: 'Driving license',
    icon: 'car',
    exp: 'Jul 3, 2026',
    badge: 'Expires in 22d',
    pct: 22,
    fill: '#FAEEDA',
    iconColor: '#BA7517',
    badgeBg: '#FAEEDA',
    badgeText: '#854F0B',
    bar: '#EF9F27',
  },
  {
    name: 'Passport',
    icon: 'earth',
    exp: 'Aug 15, 2027',
    badge: 'Expires in 14mo',
    pct: 68,
    fill: '#EEEDFE',
    iconColor: '#534AB7',
    badgeBg: '#F1EFE8',
    badgeText: '#5F5E5A',
    bar: '#7F77DD',
  },
  {
    name: 'Work permit',
    icon: 'certificate-outline',
    exp: 'May 30, 2028',
    badge: 'Valid · 2yr',
    pct: 94,
    fill: '#E1F5EE',
    iconColor: '#0F6E56',
    badgeBg: '#EAF3DE',
    badgeText: '#3B6D11',
    bar: '#1D9E75',
  },
  {
    name: 'Health insurance',
    icon: 'medical-bag',
    exp: 'Jan 31, 2027',
    badge: 'Valid · 7mo',
    pct: 80,
    fill: '#E1F5EE',
    iconColor: '#0F6E56',
    badgeBg: '#EAF3DE',
    badgeText: '#3B6D11',
    bar: '#1D9E75',
  },
];

function DocRow({ doc, isLast }) {
  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <View style={styles.rowInner}>
        <View style={[styles.iconBox, { backgroundColor: doc.fill }]}>
          <MaterialCommunityIcons name={doc.icon} size={23} color={doc.iconColor} />
        </View>
        <View style={styles.body}>
          <View style={styles.topLine}>
            <Text style={styles.name}>{doc.name}</Text>
            <View style={[styles.badge, { backgroundColor: doc.badgeBg }]}>
              <Text style={[styles.badgeText, { color: doc.badgeText }]}>{doc.badge}</Text>
            </View>
          </View>
          <Text style={styles.exp}>Exp: {doc.exp}</Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${doc.pct}%`, backgroundColor: doc.bar }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default function DocumentExpiry({ onUpload }) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.wrap}>
        <Text style={styles.sectionLabel}>DOCUMENT EXPIRY</Text>

        <View style={styles.card}>
          <View style={styles.alert}>
            <MaterialCommunityIcons name="alert-outline" size={20} color="#C0392B" />
            <Text style={styles.alertText}>
              2 documents expiring within 30 days. Please renew soon.
            </Text>
          </View>

          {DOCS.map((doc, i) => (
            <DocRow key={doc.name} doc={doc} isLast={i === DOCS.length - 1} />
          ))}

          <TouchableOpacity
            style={styles.uploadBtn}
            activeOpacity={0.7}
            onPress={onUpload}
          >
            <MaterialCommunityIcons name="upload" size={18} color="#1A1A18" />
            <Text style={styles.uploadText}>Upload / renew document</Text>
            <MaterialCommunityIcons name="arrow-top-right" size={16} color="#1A1A18" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: '#F5F4EF',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  wrap: { width: '100%', maxWidth: 420 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.7,
    color: '#6B6A64',
    marginBottom: 14,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.08)',
    borderRadius: 16,
    padding: 18,
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FCEBEB',
    borderRadius: 10,
    padding: 13,
    marginBottom: 8,
  },
  alertText: { flex: 1, fontSize: 14, lineHeight: 20, color: '#8E2A1E' },
  row: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  rowLast: { borderBottomWidth: 0 },
  rowInner: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1 },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  name: { flex: 1, fontSize: 17, fontWeight: '600', color: '#1A1A18' },
  badge: { paddingVertical: 4, paddingHorizontal: 11, borderRadius: 999 },
  badgeText: { fontSize: 13, fontWeight: '500' },
  exp: { fontSize: 15, color: '#6B6A64', marginTop: 2 },
  track: {
    marginTop: 13,
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.07)',
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 999 },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginTop: 16,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.15)',
    borderRadius: 10,
  },
  uploadText: { fontSize: 15, fontWeight: '500', color: '#1A1A18' },
});