import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";
import { useTranslation } from "@/src/core/i18n";

import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export default function TabTwoScreen() {
  const { t } = useTranslation();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
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
          {t('explore.title')}
        </ThemedText>
      </ThemedView>
      <ThemedText>
        {t('explore.subtitle')}
      </ThemedText>
      <Collapsible title={t('explore.sections.fileBasedRouting.title')}>
        <ThemedText>
          {t('explore.sections.fileBasedRouting.description')}{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          and{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          {t('explore.sections.fileBasedRouting.layoutInfo')}{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{" "}
          {t('explore.sections.fileBasedRouting.layoutLocation')}
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">{t('explore.sections.fileBasedRouting.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.sections.platformSupport.title')}>
        <ThemedText>
          {t('explore.sections.platformSupport.description')}{" "}
          <ThemedText type="defaultSemiBold">w</ThemedText>{" "}
          {t('explore.sections.platformSupport.inTerminal')}
        </ThemedText>
      </Collapsible>
      <Collapsible title={t('explore.sections.images.title')}>
        <ThemedText>
          {t('explore.sections.images.description')}{" "}
          <ThemedText type="defaultSemiBold">@2x</ThemedText>{" "}
          {t('explore.sections.images.and')}{" "}
          <ThemedText type="defaultSemiBold">@3x</ThemedText>{" "}
          {t('explore.sections.images.suffixes')}
        </ThemedText>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">{t('explore.sections.images.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.sections.colorModes.title')}>
        <ThemedText>
          {t('explore.sections.colorModes.description')}{" "}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText>{" "}
          {t('explore.sections.colorModes.hook')}
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">{t('explore.sections.colorModes.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.sections.animations.title')}>
        <ThemedText>
          {t('explore.sections.animations.description')}{" "}
          <ThemedText type="defaultSemiBold">
            components/HelloWave.tsx
          </ThemedText>{" "}
          {t('explore.sections.animations.component')}{" "}
          <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
            react-native-reanimated
          </ThemedText>{" "}
          {t('explore.sections.animations.library')}
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The{" "}
              <ThemedText type="defaultSemiBold">
                components/ParallaxScrollView.tsx
              </ThemedText>{" "}
              {t('explore.sections.animations.parallaxDescription')}
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
