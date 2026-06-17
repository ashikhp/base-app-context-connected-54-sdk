import { Dimensions, Platform } from "react-native";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const _colorSet = {
  primaryColor: "#3068CC",
  INACTIVE: "#9E9E9E",
  mainThemeBackgroundColor: "white",
  mainThemeForegroundColor: "#3068CC",
  mainTextColor: "#464646",
  mainSubtextColor: "#696b6e",
  hairlineColor: "#d6d6d6",
  whiteColor: "white",
  redColor: "red",

  analyticsColor: "#5f65fc",
  analyticsLightColor: "#5f65fc30",

  customersColor: "#ff8a02",
  customersLightColor: "#ff8a0230",

  ordersColor: "#e090d7",
  ordersLightColor: "#e090d730",

  tasksColor: "#6fb168",
  tasksLightColor: "#6fb16830",

  salesColor: "#f8d246",
  salesLightColor: "#f8d24630",

  productsColor: "#bc6e7e",
  productsLightColor: "#bc6e7e30",

  taskNotStartedColor: "#f8d246",
  taskDoneColor: "green",

  statusBar: "#F4FBF4",
  appBar: "#F4FBF4",
  headerContent: "#2E7D32",
  TaskIconColor: "#bababa",

  brandColor: "#6fb168",
  brandDarkColor: "#2E7D32",
  brandSoftColor: "#E8F5E9",

  screenBackgroundColor: "#F4F6F8",

  // Announcement Colors
  announcementCompanyBg: "#EEEDFE",
  announcementCompanyColor: "#534AB7",

  announcementHrBg: "#E1F5EE",
  announcementHrColor: "#0F6E56",

  announcementPolicyBg: "#FAEEDA",
  announcementPolicyColor: "#BA7517",

  announcementEventBg: "#FBEAF0",
  announcementEventColor: "#D4537E",

  announcementNewBadgeBg: "#EEEDFE",
  announcementNewBadgeText: "#3C3489",

  announcementImportantBadgeBg: "#FAEEDA",
  announcementImportantBadgeText: "#854F0B",


  // Attendance Status Colors
  successColor: '#27A35A',
  successBgColor: '#E6F6EC',

  dangerColor: '#E34850',
  dangerBgColor: '#FCE7E8',

  warningColor: '#F0A020',
  warningBgColor: '#FCF1DD',

  infoColor: '#7C6FE8',
  infoBgColor: '#ECEAFB',

  // Theme
  primaryColor: '#7C6FE8',
  primaryLightColor: '#A99CF2',
  primaryDarkColor: '#5B4FC4',

  textPrimaryColor: '#1A2233',
  textSecondaryColor: '#94A3B8',

  screenBgColor: '#FBFAF7',
  cardBgColor: '#FFFFFF',
  borderColor: '#EEF2F7',

  heroBgColor: '#F3F1FD',
  heroBorderColor: '#E7E3FA',
  heroTextColor: '#20233A',
};

const _gradientSet = {
  primary: ['#81C784', '#3068CC'],
};
const _iconSet = {
  announcements: {
    company: "bullhorn-outline",
    hr: "gift-outline",
    policies: "umbrella-outline",
    events: "calendar-month-outline",
    launch: "rocket-launch-outline",
  },
  status: {
    success: 'check-circle',
    danger: 'close-circle',
    warning: 'airplane',
    info: 'party-popper',
  },
};

const StyleDict = {
  colorSet: _colorSet,
  iconSet: _iconSet,
};

export default StyleDict;

