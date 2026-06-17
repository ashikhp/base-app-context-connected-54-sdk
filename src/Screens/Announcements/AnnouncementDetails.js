import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const ACCENT = '#7B7BE0';        // softer purple for text/icons
const ACCENT_SOFT = '#F1F1FC';   // light lavender fills
const ACCENT_TINT = '#F7F7FE';   // even lighter banner tint
const TEXT = '#2B2D3A';
const SUBTEXT = '#8A8F9C';
const BG = '#FBFBFE';

export default function AnnouncementDetails({ navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, backgroundColor: BG }}>
            <ScrollView
                contentContainerStyle={{ padding: 16, paddingTop: insets.top + 16, paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={s.card}>
                    {/* ---- Hero banner (light) ---- */}
                    <View style={s.banner}>
                        <View style={s.bannerGlow} />
                        <View style={s.bannerRow}>
                            <View style={s.iconCircle}>
                                <MaterialCommunityIcons name="bullhorn-variant" size={24} color={ACCENT} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 14 }}>
                                <Text style={s.overline}>COMPANY ANNOUNCEMENT</Text>
                                <Text style={s.title}>Monthly Town Hall Meeting</Text>
                            </View>
                            <View style={s.newBadge}>
                                <Text style={s.newText}>NEW</Text>
                            </View>
                        </View>
                    </View>

                    {/* ---- Body ---- */}
                    <View style={s.body}>
                        <Text style={s.summary}>
                            Join us for our monthly town hall meeting to discuss updates, celebrate our
                            achievements, and align on our next steps.
                        </Text>

                        {/* Meta chips */}
                        <View style={s.chipsRow}>
                            <View style={s.chip}>
                                <MaterialCommunityIcons name="calendar-blank" size={14} color={ACCENT} />
                                <Text style={s.chipText}>Jun 15, 2026</Text>
                            </View>
                            <View style={s.chip}>
                                <MaterialCommunityIcons name="clock-outline" size={14} color={ACCENT} />
                                <Text style={s.chipText}>10:00 AM</Text>
                            </View>
                            <View style={s.chip}>
                                <MaterialCommunityIcons name="map-marker" size={14} color={ACCENT} />
                                <Text style={s.chipText}>Main Conference Hall</Text>
                            </View>
                        </View>

                        <View style={s.divider} />

                        <Text style={s.greeting}>Hi Team,</Text>
                        <Text style={s.paragraph}>
                            We're excited to invite you to our monthly Town Hall Meeting. This is a great
                            opportunity to stay informed about company updates, upcoming initiatives, and
                            share your feedback.
                        </Text>

                        {/* Agenda */}
                        <Text style={s.sectionTitle}>Agenda Highlights</Text>
                        <View style={{ marginBottom: 18 }}>
                            {[
                                'Company performance update',
                                'Upcoming projects and goals',
                                'Q&A session with leadership',
                                'Team recognition',
                            ].map((item, i) => (
                                <View key={i} style={s.agendaRow}>
                                    <View style={s.check}>
                                        <Feather name="check" size={12} color={ACCENT} />
                                    </View>
                                    <Text style={s.agendaText}>{item}</Text>
                                </View>
                            ))}
                        </View>

                        <Text style={s.paragraph}>
                            Your participation and input help shape our success. We look forward to seeing
                            you there!
                        </Text>

                        {/* Signature */}
                        <View style={s.signature}>
                            <Text style={s.signOff}>Best regards,</Text>
                            <Text style={s.signName}>The Leadership Team</Text>
                        </View>

                        {/* Image */}
                        <View style={s.image}>
                            <View style={s.imageIcon}>
                                <MaterialCommunityIcons name="image-outline" size={26} color={ACCENT} />
                            </View>
                            <Text style={s.imageHint}>Event banner</Text>
                        </View>

                        {/* Attachment */}
                        <View style={s.attachment}>
                            <View style={s.pdfIcon}>
                                <MaterialCommunityIcons name="file-pdf-box" size={24} color="#EC7A7D" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={s.fileName}>Town_Hall_Agenda.pdf</Text>
                                <Text style={s.fileSize}>PDF · 2.4 MB</Text>
                            </View>
                            <View style={s.downloadBtn}>
                                <Feather name="download" size={18} color={ACCENT} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const s = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: ACCENT,
        shadowOpacity: 0.08,
        shadowRadius: 22,
        shadowOffset: { width: 0, height: 10 },
        elevation: 4,
    },

    /* Hero banner */
    banner: {
        backgroundColor: ACCENT_TINT,
        paddingHorizontal: 20,
        paddingVertical: 22,
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F8',
    },
    bannerGlow: {
        position: 'absolute',
        top: -50,
        right: -30,
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(123,123,224,0.07)',
    },
    bannerRow: { flexDirection: 'row', alignItems: 'center' },
    iconCircle: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: ACCENT,
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    overline: {
        fontSize: 11,
        fontWeight: '700',
        color: ACCENT,
        letterSpacing: 1,
    },
    title: { fontSize: 20, fontWeight: '800', color: TEXT, marginTop: 4 },
    newBadge: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginLeft: 8,
    },
    newText: { fontSize: 11, fontWeight: '800', color: ACCENT, letterSpacing: 0.5 },

    /* Body */
    body: { padding: 20 },
    summary: { fontSize: 15, lineHeight: 23, color: '#5B6070' },

    chipsRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, marginBottom: 2 },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ACCENT_SOFT,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 7,
        marginRight: 8,
        marginBottom: 8,
    },
    chipText: { fontSize: 12.5, fontWeight: '600', color: ACCENT, marginLeft: 6 },

    divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#EFEFF4', marginVertical: 18 },

    greeting: { fontSize: 16, fontWeight: '700', color: TEXT, marginBottom: 10 },
    paragraph: { fontSize: 15, lineHeight: 24, color: '#5B6070', marginBottom: 18 },

    sectionTitle: { fontSize: 16, fontWeight: '700', color: TEXT, marginBottom: 12 },
    agendaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    check: {
        width: 24,
        height: 24,
        borderRadius: 8,
        backgroundColor: ACCENT_SOFT,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    agendaText: { flex: 1, fontSize: 15, color: '#454956', fontWeight: '500' },

    signature: {
        borderLeftWidth: 3,
        borderLeftColor: ACCENT,
        paddingLeft: 12,
        marginBottom: 20,
    },
    signOff: { fontSize: 14, color: SUBTEXT },
    signName: { fontSize: 15, fontWeight: '700', color: TEXT, marginTop: 2 },

    image: {
        width: '100%',
        height: 170,
        borderRadius: 16,
        backgroundColor: ACCENT_SOFT,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    imageIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    imageHint: { fontSize: 13, color: ACCENT, fontWeight: '600' },

    attachment: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FCFCFE',
        borderWidth: 1,
        borderColor: '#EFEFF4',
        borderRadius: 16,
        padding: 12,
    },
    pdfIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#FDF0F0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    fileName: { fontSize: 14.5, fontWeight: '700', color: TEXT },
    fileSize: { fontSize: 12.5, color: SUBTEXT, marginTop: 2 },
    downloadBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: ACCENT_SOFT,
        alignItems: 'center',
        justifyContent: 'center',
    },
});