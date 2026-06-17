
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppStyles from '../../AppStyles';
import { useNavigation } from '@react-navigation/native';
import App from '../HomeStack';


const { colorSet, iconSet } = AppStyles;

const FILTERS = [
  { key: 'ALL', label: 'All', icon: 'view-grid' },
  { key: 'COMPANY', label: 'Company', icon: 'office-building-outline' },
  { key: 'HR', label: 'HR', icon: 'account-group-outline' },
  { key: 'POLICIES', label: 'Policies', icon: 'shield-outline' },
  { key: 'EVENTS', label: 'Events', icon: 'calendar-outline' },
];

const ANNOUNCEMENTS = [
  {
    id: '1',
    category: 'COMPANY',
    icon: iconSet.announcements.company,
    title: 'Monthly Town Hall Meeting',
    desc: 'Join us for our monthly town hall meeting to discuss updates and upcoming plans.',
    date: 'Jun 15, 2026',
    time: '10:00 AM',
    iso: '2026-06-15',
    badge: 'New',
    badgeBg: colorSet.announcementNewBadgeBg,
    badgeText: colorSet.announcementNewBadgeText,
    fill: colorSet.announcementCompanyBg,
    iconColor: colorSet.announcementCompanyColor,
    catColor: colorSet.announcementCompanyColor,
    image: 'https://picsum.photos/seed/townhall/240/200',
  },
  {
    id: '2',
    category: 'HR',
    icon: iconSet.announcements.hr,
    title: 'Performance Appraisals 2026',
    desc: 'Performance appraisal cycle will begin from June 20. Please complete your self-assessment.',
    date: 'Jun 10, 2026',
    time: null,
    iso: '2026-06-10',
    badge: 'New',
    badgeBg: colorSet.announcementNewBadgeBg,
    badgeText: colorSet.announcementNewBadgeText,
    fill: colorSet.announcementHrBg,
    iconColor: colorSet.announcementHrColor,
    catColor: colorSet.announcementHrColor,
    image: 'https://picsum.photos/seed/appraisal/240/200',
  },
  {
    id: '3',
    category: 'POLICIES',
    icon: iconSet.announcements.policies,
    title: 'Updated Leave Policy',
    desc: "We've updated the leave policy to provide more flexibility and better support.",
    date: 'Jun 8, 2026',
    time: null,
    iso: '2026-06-08',
    badge: 'Important',
    badgeBg: colorSet.announcementImportantBadgeBg,
    badgeText: colorSet.announcementImportantBadgeText,
    fill: colorSet.announcementPolicyBg,
    iconColor: colorSet.announcementPolicyColor,
    catColor: colorSet.announcementPolicyColor,
    image: 'https://picsum.photos/seed/leave/240/200',
  },
  {
    id: '4',
    category: 'EVENTS',
    icon: iconSet.announcements.events,
    title: 'Family Day Celebration',
    desc: 'Join us for a fun-filled Family Day on June 28. Activities for all ages!',
    date: 'Jun 28, 2026',
    time: '09:00 AM',
    iso: '2026-06-28',
    badge: 'New',
    badgeBg: colorSet.announcementNewBadgeBg,
    badgeText: colorSet.announcementNewBadgeText,
    fill: colorSet.announcementEventBg,
    iconColor: colorSet.announcementEventColor,
    catColor: colorSet.announcementEventColor,
    image: 'https://picsum.photos/seed/familyday/240/200',
  },
  {
    id: '5',
    category: 'COMPANY',
    icon: iconSet.announcements.launch,
    title: 'New Project Launch',
    desc: "Excited to announce the launch of our new project! Let's work together.",
    date: 'Jun 5, 2026',
    time: null,
    iso: '2026-06-05',
    badge: 'New',
    badgeBg: colorSet.announcementNewBadgeBg,
    badgeText: colorSet.announcementNewBadgeText,
    fill: colorSet.announcementCompanyBg,
    iconColor: colorSet.announcementCompanyColor,
    catColor: colorSet.announcementCompanyColor,
    image: 'https://picsum.photos/seed/launch/240/200',
  },
];

function Chip({ item, active, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <MaterialCommunityIcons
        name={item.icon}
        size={16}
        color={active ? AppStyles.colorSet.primaryColor : '#5B5B62'}
      />

      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

export default function Announcements({ navigation, onSelect }) {
  const [filter, setFilter] = useState('ALL');
  const [newestFirst, setNewestFirst] = useState(true);

  const data = useMemo(() => {
    let rows = ANNOUNCEMENTS;
    if (filter !== 'ALL') rows = rows.filter((r) => r.category === filter);
    return [...rows].sort((a, b) =>
      newestFirst ? b.iso.localeCompare(a.iso) : a.iso.localeCompare(b.iso)
    );
  }, [filter, newestFirst]);

  return (
    <View style={styles.screen}>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {FILTERS.map((f) => (
          <Chip
            key={f.key}
            item={f}
            active={filter === f.key}
            onPress={() => setFilter(f.key)}
          />
        ))}
      </ScrollView>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('AnnouncementsDetails', {
                announcement: item,
              })
            }
          >
            <View style={styles.headerRow}>
              <View style={[styles.iconBox, { backgroundColor: item.fill }]}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={22}
                  color={item.iconColor}
                />
              </View>

              <Text
                style={[styles.category, { color: item.catColor }]}
                numberOfLines={1}
              >
                {item.category}
              </Text>

              <View
                style={[
                  styles.badge,
                  { backgroundColor: item.badgeBg },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: item.badgeText },
                  ]}
                >
                  {item.badge}
                </Text>
              </View>
            </View>

            <View style={styles.bodyRow}>
              <View style={styles.textCol}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>

                <Text style={styles.desc} numberOfLines={3}>
                  {item.desc}
                </Text>
              </View>

              {item.image && (
                <Image
                  source={
                    typeof item.image === 'string'
                      ? { uri: item.image }
                      : item.image
                  }
                  style={styles.thumb}
                />
              )}
            </View>

            <View style={styles.dateWrap}>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={15}
                color="#6B6A64"
              />
              <Text style={styles.dateText}>{item.date}</Text>

              {item.time && (
                <>
                  <Text style={styles.dot}>•</Text>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={15}
                    color="#6B6A64"
                  />
                  <Text style={styles.dateText}>
                    {item.time}
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F4F7",
  },

  chipRow: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.10)',
    marginRight: 8,
  },

  chipActive: {
    backgroundColor: AppStyles.colorSet.primaryColor,
    borderColor: AppStyles.colorSet.primaryColor,
  },

  chipText: {
    fontSize: 12,
    color: '#5B5B62',
    fontWeight: '600',
    marginLeft: 5,
  },

  chipTextActive: {
    color: '#fff',
  },

  content: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  category: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.7,
  },

  badge: {
    height: 28,
    paddingHorizontal: 12,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },

  menuBtn: {
    marginLeft: 8,
    padding: 4,
  },

  bodyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },

  textCol: {
    flex: 1,
    paddingRight: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A18',
    lineHeight: 22,
  },

  desc: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B6A64',
    marginTop: 6,
  },

  thumb: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#EEE',
  },

  dateWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    flexWrap: 'wrap',
  },

  dateText: {
    fontSize: 13,
    color: '#6B6A64',
    marginLeft: 4,
    marginRight: 8,
  },

  dot: {
    color: '#B9B8B0',
    marginHorizontal: 4,
  },
});