import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppStyles from '../../AppStyles';



const THEME = {
  bg: '#FBFAF7',
  surface: '#FFFFFF',
  text: '#1A2233',
  textMuted: '#94A3B8',
  border: '#EEF2F7',
  track: '#EDEAF9',
  // brand + status
  brand: '#7C6FE8',
  brandSoft: '#A99CF2',
  brandDeep: '#5B4FC4',
  ink: '#20233A', 
  heroLight: '#F3F1FD', 
  heroBorder: '#E7E3FA',
  present: '#27A35A', presentBg: '#E6F6EC',
  absent: '#E34850', absentBg: '#FCE7E8',
  leave: '#F0A020', leaveBg: '#FCF1DD',
  holiday: '#7C6FE8', holidayBg: '#ECEAFB',
};

const STATUS = {
  present: { bg: THEME.presentBg, text: THEME.present, label: 'Present', icon: 'check-circle' },
  absent: { bg: THEME.absentBg, text: THEME.absent, label: 'Absent', icon: 'close-circle' },
  leave: { bg: THEME.leaveBg, text: THEME.leave, label: 'On leave', icon: 'airplane' },
  holiday: { bg: THEME.holidayBg, text: THEME.holiday, label: 'Holiday', icon: 'party-popper' },
};

const STATUS_ALIASES = {
  present: 'present', p: 'present', pr: 'present', present_: 'present', '1': 'present',
  absent: 'absent', a: 'absent', ab: 'absent', '0': 'absent',
  leave: 'leave', leaves: 'leave', l: 'leave', onleave: 'leave', 'on leave': 'leave',
  holiday: 'holiday', holidays: 'holiday', h: 'holiday', hol: 'holiday',
};

const normStatus = (raw) => {
  if (raw == null) return null;
  const key = String(raw).trim().toLowerCase();
  return STATUS_ALIASES[key] || (STATUS[key] ? key : null);
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SCREEN_W = Dimensions.get('window').width;
const GAP = 3;
const CELL = Math.floor((SCREEN_W - 30 - 32 - GAP * 2 * 7) / 7); // full week

const toKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// records: { '2026-06-01': 'present', '2026-06-09': 'absent', ... }
const AttendanceCalendar = ({ records = {}, summary, totalHours = '', selectedDate, onDayPress }) => {
  const today = new Date();
  const todayKey = toKey(today);

  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selected, setSelected] = useState(selectedDate || todayKey);

  // ---- Build month grid (Mon-first, full week) --------------------------
  const days = useMemo(() => {
    const result = [];
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const firstDow = new Date(view.year, view.month, 1).getDay(); // 0=Sun..6=Sat
    const lead = (firstDow + 6) % 7; // Mon=0 .. Sun=6
    for (let i = 0; i < lead; i++) result.push({ empty: true, key: `empty-${i}` });
    for (let d = 1; d <= daysInMonth; d++) {
      const dow = new Date(view.year, view.month, d).getDay();
      const key = `${view.year}-${String(view.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      result.push({ date: d, key, status: normStatus(records[key]), weekend: dow === 0 || dow === 6 });
    }
    return result;
  }, [view, records]);

  // ---- Live stats for the visible month ---------------------------------
  const stats = useMemo(() => {
    let present = 0, absent = 0, leave = 0, holiday = 0;
    Object.entries(records).forEach(([key, raw]) => {
      const [y, m] = key.split('-').map(Number);
      if (y === view.year && m === view.month + 1) {
        const status = normStatus(raw);
        if (status === 'present') present++;
        else if (status === 'absent') absent++;
        else if (status === 'leave') leave++;
        else if (status === 'holiday') holiday++;
      }
    });
    const working = present + absent + leave;
    const pct = working ? Math.round((present / working) * 100) : 0;
    return { present, absent, leave, holiday, working, pct };
  }, [records, view]);

  // Prefer live computed counts; fall back to the summary prop if passed.
  const card = {
    present: summary?.present ?? stats.present,
    absent: summary?.absent ?? stats.absent,
    leaves: summary?.leaves ?? stats.leave,
    holidays: summary?.holidays ?? stats.holiday,
  };

  // ---- Current present streak (counts back from today) ------------------
  const streak = useMemo(() => {
    let s = 0;
    const d = new Date();
    for (let i = 0; i < 200; i++) {
      const st = normStatus(records[toKey(d)]);
      if (st === 'present') s++;
      else if (st === 'holiday') { /* don't break on holidays */ }
      else break;
      d.setDate(d.getDate() - 1);
    }
    return s;
  }, [records]);

  // ---- Selected day detail ----------------------------------------------
  const selInfo = useMemo(() => {
    const [y, m, d] = selected.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dateObj.getDay()];
    return {
      pretty: `${weekday}, ${MONTHS_SHORT[m - 1]} ${d}`,
      isToday: selected === todayKey,
      status: normStatus(records[selected]),
    };
  }, [selected, records, todayKey]);

  const prevMonth = () =>
    setView((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 }));
  const nextMonth = () =>
    setView((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 }));

  return (
    <ScrollView
      style={{ backgroundColor: THEME.bg }}
      contentContainerStyle={{ padding: 15, paddingBottom: 110 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={{ fontSize: 13, fontWeight: '800', color: THEME.textMuted, letterSpacing: 1.2, marginBottom: 12 }}>
        ATTENDANCE
      </Text>

      {/* ============ HERO ============ */}
      <View
        style={{
          backgroundColor: THEME.heroLight,
          borderRadius: 24,
          padding: 20,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: THEME.heroBorder,
        }}
      >
        {/* faint purple wash, very soft */}
        <View style={{ position: 'absolute', right: -50, top: -60, width: 170, height: 170, borderRadius: 85, backgroundColor: 'rgba(124,111,232,0.10)' }} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={{ color: THEME.textMuted, fontSize: 12, fontWeight: '700', letterSpacing: 0.6 }}>
              {MONTHS[view.month]} {view.year}
            </Text>
            <Text style={{ color: THEME.text, fontSize: 15, fontWeight: '600', marginTop: 3 }}>
              Attendance rate
            </Text>
          </View>

          {/* streak badge */}
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 11, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: THEME.heroBorder }}>
            <MaterialCommunityIcons name="fire" size={15} color="#F5A623" />
            <Text style={{ color: THEME.brandDeep, fontSize: 12.5, fontWeight: '800', marginLeft: 4 }}>{streak} day streak</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 16 }}>
          <Text style={{ color: THEME.brandDeep, fontSize: 50, fontWeight: '900', lineHeight: 54 }}>{stats.pct}</Text>
          <Text style={{ color: THEME.brand, fontSize: 22, fontWeight: '800', marginBottom: 8, marginLeft: 2 }}>%</Text>
          <Text style={{ color: THEME.textMuted, fontSize: 13, fontWeight: '600', marginBottom: 10, marginLeft: 12 }}>
            {stats.present}/{stats.working} working days
          </Text>
        </View>

        {/* progress track */}
        <View style={{ height: 8, borderRadius: 5, backgroundColor: '#FFFFFF', marginTop: 14, overflow: 'hidden', borderWidth: 1, borderColor: THEME.heroBorder }}>
          <View style={{ width: `${stats.pct}%`, height: '100%', borderRadius: 5, backgroundColor: THEME.brand }} />
        </View>
      </View>

      {/* ============ CALENDAR ============ */}
      <View style={{ backgroundColor: THEME.surface, borderRadius: 22, padding: 16, borderWidth: 1, borderColor: THEME.border, marginTop: 14 }}>
        {/* Month nav */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <NavBtn icon="chevron-left" onPress={prevMonth} />
          <Text style={{ fontSize: 17, fontWeight: '800', color: THEME.text }}>
            {MONTHS[view.month]} {view.year}
          </Text>
          <NavBtn icon="chevron-right" onPress={nextMonth} />
        </View>

        {/* Legend */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 14 }}>
          {[['Present', THEME.present], ['Absent', THEME.absent], ['Leave', THEME.leave], ['Holiday', THEME.holiday]].map(([label, color]) => (
            <View key={label} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 14, marginBottom: 4 }}>
              <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: color, marginRight: 6 }} />
              <Text style={{ fontSize: 12.5, color: THEME.textMuted, fontWeight: '600' }}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Weekday headers */}
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          {WEEKDAYS.map((d, i) => (
            <Text
              key={d}
              style={{ width: CELL, marginHorizontal: GAP, textAlign: 'center', fontSize: 11.5, fontWeight: '700', color: i > 4 ? THEME.brand : THEME.textMuted }}
            >
              {d}
            </Text>
          ))}
        </View>

        {/* Day grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: GAP * 2 }}>
          {days.map((day) => {
            if (day.empty) return <View key={day.key} style={{ width: CELL, height: CELL + 10, marginHorizontal: GAP }} />;

            const status = STATUS[day.status];
            const isSelected = day.key === selected;
            const isToday = day.key === todayKey;
            const baseBg = status ? status.bg : day.weekend ? '#F4F3EF' : '#FAFAF7';

            return (
              <TouchableOpacity
                key={day.key}
                activeOpacity={0.7}
                onPress={() => {
                  setSelected(day.key);
                  onDayPress?.(day);
                }}
                style={{
                  width: CELL,
                  height: CELL + 10,
                  borderRadius: 13,
                  marginHorizontal: GAP,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: baseBg,
                  borderWidth: isSelected ? 2 : isToday ? 1.5 : 0,
                  borderColor: isSelected ? THEME.brand : isToday ? THEME.brandSoft : 'transparent',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: status ? status.text : day.weekend ? '#B6BDC8' : '#C7CFDA',
                  }}
                >
                  {day.date}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected day detail strip */}
        <View
          style={{
            flexDirection: 'row', alignItems: 'center',
            backgroundColor: selInfo.status ? STATUS[selInfo.status].bg : '#F5F4F0',
            borderRadius: 16, padding: 14, marginTop: 14,
          }}
        >
          <View
            style={{
              width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center',
              backgroundColor: selInfo.status ? STATUS[selInfo.status].text : THEME.textMuted,
            }}
          >
            <MaterialCommunityIcons
              name={selInfo.status ? STATUS[selInfo.status].icon : 'calendar-blank'}
              size={22}
              color="#FFF"
            />
          </View>
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ fontSize: 14.5, fontWeight: '800', color: THEME.text }}>
              {selInfo.pretty}{selInfo.isToday ? '  ·  Today' : ''}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '600', color: selInfo.status ? STATUS[selInfo.status].text : THEME.textMuted, marginTop: 2 }}>
              {selInfo.status ? STATUS[selInfo.status].label : 'No record for this day'}
            </Text>
          </View>
        </View>
      </View>

      {/* ============ SUMMARY ============ */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 14 }}>
        <SummaryCard label="Present" value={card.present} color={THEME.present} bg={THEME.presentBg} icon="check-circle" />
        <SummaryCard label="Absent" value={card.absent} color={THEME.absent} bg={THEME.absentBg} icon="close-circle" />
        <SummaryCard label="Leaves" value={card.leaves} color={THEME.leave} bg={THEME.leaveBg} icon="airplane" />
        <SummaryCard label="Holidays" value={card.holidays} color={THEME.holiday} bg={THEME.holidayBg} icon="party-popper" />
      </View>

      {/* ============ TOTAL HOURS ============ */}
      <View
        style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: THEME.surface, borderRadius: 18, paddingVertical: 16, paddingHorizontal: 18, marginTop: 4,
          borderWidth: 1, borderColor: THEME.border,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: THEME.holidayBg, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="clock-outline" size={21} color={THEME.brand} />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: THEME.textMuted, letterSpacing: 0.3 }}>This month</Text>
            <Text style={{ fontSize: 15, fontWeight: '700', color: THEME.text, marginTop: 1 }}>Total hours</Text>
          </View>
        </View>
        <Text style={{ fontSize: 22, fontWeight: '900', color: THEME.brandDeep }}>{totalHours || '—'}</Text>
      </View>
    </ScrollView>
  );
};

const NavBtn = ({ icon, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: THEME.track, justifyContent: 'center', alignItems: 'center' }}
  >
    <MaterialCommunityIcons name={icon} size={22} color={THEME.brandDeep} />
  </TouchableOpacity>
);

const SummaryCard = ({ label, value, color, bg, icon }) => (
  <View style={{ width: '48%', backgroundColor: THEME.surface, borderRadius: 16, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: THEME.border }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: bg, justifyContent: 'center', alignItems: 'center' }}>
        <MaterialCommunityIcons name={icon} size={18} color={color} />
      </View>
      <Text style={{ fontSize: 26, fontWeight: '900', color: THEME.text }}>{value ?? 0}</Text>
    </View>
    <Text style={{ fontSize: 13, color: THEME.textMuted, fontWeight: '700', marginTop: 10 }}>{label}</Text>
  </View>
);

export default AttendanceCalendar;