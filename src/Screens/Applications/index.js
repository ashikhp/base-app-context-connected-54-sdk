import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const C = {
  pageBg: '#FBFAF7',
  cardBg: '#FFFFFF',
  tileBg: '#F8F7F4',
  track: '#ECEAE3',
  text: '#1A2233',
  muted: '#8A909C',
  border: '#EEF2F7',
  divider: '#F1F0EB',

  brand: '#7C6FE8', brandDeep: '#5B4FC4', brandSoft: '#A99CF2',
  heroBg: '#F3F1FD', heroBorder: '#E7E3FA',

  annual: '#7C6FE8', annualBg: '#ECEAFB',
  sick: '#27A35A', sickBg: '#E6F6EC',
  wfh: '#F0A020', wfhBg: '#FCF1DD',
  comp: '#D6336C', compBg: '#FCE4ED',

  approvedBg: '#E6F6EC', approvedText: '#1E8A4C',
  pendingBg: '#FCF1DD', pendingText: '#A6730F',
  rejectedBg: '#FCE7E8', rejectedText: '#C0343C',
};

const BALANCES = [
  { icon: 'ski', label: 'Annual leave', left: 12, used: 8, total: 20, color: C.annual, bg: C.annualBg },
  { icon: 'stethoscope', label: 'Sick leave', left: 4, used: 11, total: 15, color: C.sick, bg: C.sickBg },
  { icon: 'home-roof', label: 'WFH balance', left: 6, used: 4, total: 10, color: C.wfh, bg: C.wfhBg },
  { icon: 'clock-outline', label: 'Comp off', left: 2, used: 2, total: 2, color: C.comp, bg: C.compBg, footer: 'Earned 2 days' },
];

const REQUESTS = [
  { id: '1', icon: 'calendar-blank', color: C.annual, bg: C.annualBg, title: 'Annual leave', subtitle: 'Jun 20 – Jun 22 · 3 days', when: 'in 4 days', status: 'Approved' },
  { id: '2', icon: 'home-roof', color: C.wfh, bg: C.wfhBg, title: 'Work from home', subtitle: 'Jun 14 · 1 day', when: 'tomorrow', status: 'Pending' },
  { id: '3', icon: 'home-roof', color: C.wfh, bg: C.wfhBg, title: 'Sick leave', subtitle: 'Jun 14 · 1 day', when: 'tomorrow', status: 'Pending' },
  { id: '4', icon: 'home-roof', color: C.wfh, bg: C.wfhBg, title: '', subtitle: 'Jun 14 · 1 day', when: 'tomorrow', status: 'Pending' },
];

const PILL = {
  Approved: { bg: C.approvedBg, text: C.approvedText, icon: 'check-circle' },
  Pending: { bg: C.pendingBg, text: C.pendingText, icon: 'clock-outline' },
  Rejected: { bg: C.rejectedBg, text: C.rejectedText, icon: 'close-circle' },
};

const cardShadow = {
  shadowColor: '#1A2233',
  shadowOpacity: 0.05,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 6 },
  elevation: 2,
};

const SectionLabel = ({ children, right }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
    <Text style={{ fontSize: 13, fontWeight: '800', color: C.muted, letterSpacing: 1.2 }}>{children}</Text>
    {right}
  </View>
);

const BalanceTile = ({ icon, label, left, used, total, color, bg, footer }) => {
  const ratio = total ? Math.min(used / total, 1) : 0;
  const pctUsed = Math.round(ratio * 100);
  return (
    <View style={{ width: '48.5%', backgroundColor: C.tileBg, borderRadius: 16, padding: 14, marginBottom: 11 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ width: 30, height: 30, borderRadius: 9, backgroundColor: bg, justifyContent: 'center', alignItems: 'center' }}>
          <MaterialCommunityIcons name={icon} size={17} color={color} />
        </View>
        <View style={{ backgroundColor: bg, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3 }}>
          <Text style={{ fontSize: 11, fontWeight: '800', color }}>{pctUsed}%</Text>
        </View>
      </View>

      <Text style={{ fontSize: 13.5, fontWeight: '600', color: C.text, marginTop: 10 }}>{label}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 2 }}>
        <Text style={{ fontSize: 27, fontWeight: '800', color: C.text, letterSpacing: -0.5 }}>{left}</Text>
        <Text style={{ fontSize: 13.5, fontWeight: '600', color: C.muted, marginLeft: 5 }}>left</Text>
      </View>

      <View style={{ height: 7, borderRadius: 4, backgroundColor: C.track, marginTop: 8, overflow: 'hidden' }}>
        <View style={{ width: `${ratio * 100}%`, height: '100%', borderRadius: 4, backgroundColor: color }} />
      </View>

      <Text style={{ fontSize: 12, color: C.muted, marginTop: 7 }}>
        {footer || `${used} of ${total} used`}
      </Text>
    </View>
  );
};

const RequestRow = ({ icon, color, bg, title, subtitle, when, status, isLast }) => {
  const pill = PILL[status] || PILL.Pending;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: C.divider,
      }}
    >
      {/* accent stripe */}
      <View style={{ width: 4, height: 38, borderRadius: 3, backgroundColor: color, marginRight: 12 }} />

      <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: bg, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
        <MaterialCommunityIcons name={icon} size={21} color={color} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 13.5, fontWeight: '700', color: C.text }}>{title}</Text>
        <Text style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{subtitle}</Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: pill.bg, borderRadius: 14, paddingHorizontal: 9, paddingVertical: 5 }}>
          <MaterialCommunityIcons name={pill.icon} size={12} color={pill.text} />
          <Text style={{ fontSize: 12, fontWeight: '600', color: pill.text, marginLeft: 4 }}>{status}</Text>
        </View>
      </View>
    </View>
  );
};

const LeaveScreen = () => {
  const navigation = useNavigation();

  const { totalUsed, totalEntitlement, totalLeft, pending, approved } = useMemo(() => {
    const te = BALANCES.reduce((s, b) => s + b.total, 0);
    const tu = BALANCES.reduce((s, b) => s + b.used, 0);
    return {
      totalEntitlement: te,
      totalUsed: tu,
      totalLeft: te - tu,
      pending: REQUESTS.filter((r) => r.status === 'Pending').length,
      approved: REQUESTS.filter((r) => r.status === 'Approved').length,
    };
  }, []);

  const year = new Date().getFullYear();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: C.pageBg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ===== HERO OVERVIEW ===== */}
      <View style={{ backgroundColor: C.heroBg, borderRadius: 22, padding: 18, borderWidth: 1, borderColor: C.heroBorder, overflow: 'hidden', marginBottom: 24 }}>
        <View style={{ position: 'absolute', right: -50, top: -60, width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(124,111,232,0.10)' }} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={{ fontSize: 11.5, fontWeight: '800', color: C.muted, letterSpacing: 1 }}>LEAVE OVERVIEW · {year}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 8 }}>
              <Text style={{ fontSize: 38, fontWeight: '900', color: C.brandDeep, letterSpacing: -1 }}>{totalLeft}</Text>
              <Text style={{ fontSize: 15, fontWeight: '700', color: C.text, marginLeft: 6 }}>days left</Text>
            </View>
            <Text style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>{totalUsed} of {totalEntitlement} days used this year</Text>
          </View>
          <View style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: '#FFF', borderWidth: 1, borderColor: C.heroBorder, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="beach" size={22} color={C.brand} />
          </View>
        </View>

        {/* stacked usage bar across all types */}
        <View style={{ flexDirection: 'row', height: 10, borderRadius: 6, backgroundColor: '#FFF', marginTop: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.heroBorder }}>
          {BALANCES.map((b, i) => (
            <View key={b.label} style={{ width: `${(b.used / totalEntitlement) * 100}%`, backgroundColor: b.color, marginLeft: i === 0 ? 0 : 1 }} />
          ))}
        </View>

        {/* inline mini stats */}
        <View style={{ flexDirection: 'row', marginTop: 14 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 30, height: 30, borderRadius: 9, backgroundColor: C.pendingBg, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="clock-outline" size={16} color={C.pendingText} />
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text style={{ fontSize: 15, fontWeight: '800', color: C.text }}>{pending}</Text>
              <Text style={{ fontSize: 11.5, color: C.muted, fontWeight: '600' }}>Pending</Text>
            </View>
          </View>
          <View style={{ width: 1, backgroundColor: C.heroBorder, marginVertical: 2 }} />
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 14 }}>
            <View style={{ width: 30, height: 30, borderRadius: 9, backgroundColor: C.approvedBg, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="check-circle" size={16} color={C.approvedText} />
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text style={{ fontSize: 15, fontWeight: '800', color: C.text }}>{approved}</Text>
              <Text style={{ fontSize: 11.5, color: C.muted, fontWeight: '600' }}>Approved</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ===== LEAVE BALANCE ===== */}
      <SectionLabel>LEAVE BALANCE</SectionLabel>
      <View style={[{ backgroundColor: C.cardBg, borderRadius: 20, padding: 13, borderWidth: 1, borderColor: C.border, marginBottom: 24 }, cardShadow]}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {BALANCES.map((b) => (
            <BalanceTile key={b.label} {...b} />
          ))}
        </View>
      </View>

      <SectionLabel>LEAVE REQUESTS</SectionLabel>
      <View style={[{ backgroundColor: C.cardBg, borderRadius: 20, paddingHorizontal: 16, paddingBottom: 16, borderWidth: 1, borderColor: C.border }, cardShadow]}>
        {REQUESTS.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: 34 }}>
            <MaterialCommunityIcons name="calendar-check-outline" size={30} color={C.muted} />
            <Text style={{ fontSize: 14, color: C.muted, marginTop: 8, fontWeight: '600' }}>No requests yet</Text>
          </View>
        ) : (
          REQUESTS.map((r, i) => <RequestRow key={r.id} {...r} isLast={i === REQUESTS.length - 1} />)
        )}
      </View>
    </ScrollView>
  );
};

export default LeaveScreen;