import { StyleSheet, ScrollView, TouchableOpacity, Alert, View } from "react-native";
import { useTranslation } from "@/src/core/i18n";
import { useAuth } from "@/src/core/contexts/AuthContext";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { LanguageSwitcher } from "@/src/features/settings/components/LanguageSwitcher";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const colorScheme = useColorScheme();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#F2F2F7", dark: "#1C1C1E" }}
      headerImage={
        <IconSymbol
          size={250}
          color="#8E8E93"
          name="gearshape.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          {t('settings.title')}
        </ThemedText>
      </ThemedView>

      {/* User Account Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Account
        </ThemedText>

        {/* User Info */}
        <ThemedView style={styles.userCard}>
          <View style={styles.userIconContainer}>
            <IconSymbol
              name="person.circle.fill"
              size={60}
              color={Colors[colorScheme ?? 'light'].tint}
            />
          </View>
          <View style={styles.userInfo}>
            <ThemedText style={styles.userName}>
              {user?.displayName || 'User'}
            </ThemedText>
            <ThemedText style={styles.userEmail}>
              {user?.email}
            </ThemedText>
          </View>
        </ThemedView>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <IconSymbol name="arrow.right.square.fill" size={20} color="#FF3B30" />
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          {t('settings.language')}
        </ThemedText>
        <LanguageSwitcher />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          {t('settings.appInfo')}
        </ThemedText>
        <ThemedView style={styles.infoItem}>
          <ThemedText style={styles.infoLabel}>{t('settings.version')}</ThemedText>
          <ThemedText style={styles.infoValue}>1.0.0</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoItem}>
          <ThemedText style={styles.infoLabel}>{t('settings.build')}</ThemedText>
          <ThemedText style={styles.infoValue}>100</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          {t('settings.preferences')}
        </ThemedText>
        <ThemedText style={styles.comingSoon}>
          {t('settings.comingSoon')}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#8E8E93",
    bottom: -60,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  section: {
    marginVertical: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    marginBottom: 12,
    paddingHorizontal: 16,
    fontWeight: "600",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  userIconContainer: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.7,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5EA",
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    opacity: 0.6,
  },
  comingSoon: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    opacity: 0.6,
    fontStyle: "italic",
  },
});