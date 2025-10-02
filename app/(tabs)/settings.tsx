import { StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "@/src/core/i18n";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { LanguageSwitcher } from "@/src/features/settings/components/LanguageSwitcher";

export default function SettingsScreen() {
  const { t } = useTranslation();

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