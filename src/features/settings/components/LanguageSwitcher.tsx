import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTranslation } from '@/src/core/i18n';
import { changeLanguage, getAvailableLanguages } from '@/src/core/i18n/utils';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(i18n.language);
  const languages = getAvailableLanguages();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    const handleLanguageChanged = () => {
      setCurrentLanguage(i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  React.useEffect(() => {
    if (isModalVisible) {
      // Fade in overlay and slide up content
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 20,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animations
      fadeAnim.setValue(0);
      slideAnim.setValue(300);
    }
  }, [isModalVisible, fadeAnim, slideAnim]);

  const closeModal = () => {
    // Fade out and slide down
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsModalVisible(false);
    });
  };

  const handleLanguageChange = async (languageCode: string) => {
    await changeLanguage(languageCode);
    setCurrentLanguage(languageCode);
    closeModal();
  };

  const currentLanguageName = languages.find(
    (lang) => lang.code === currentLanguage
  )?.nativeName || 'English';

  return (
    <>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setIsModalVisible(true)}
      >
        <ThemedView style={styles.buttonContent}>
          <IconSymbol name="globe" size={20} color="#007AFF" />
          <ThemedText style={styles.buttonText}>
            {t('settings.language')}: {currentLanguageName}
          </ThemedText>
          <IconSymbol name="chevron.right" size={16} color="#C7C7CC" />
        </ThemedView>
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <Animated.View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <Animated.View
              style={[
                styles.backdrop,
                {
                  opacity: fadeAnim,
                }
              ]}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.modalContentWrapper,
              {
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <ThemedView style={styles.modalContent}>
              <ThemedText type="subtitle" style={styles.modalTitle}>
                {t('settings.selectLanguage')}
              </ThemedText>

              <FlatList
                data={languages}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.languageItem,
                      item.code === currentLanguage && styles.selectedLanguage,
                    ]}
                    onPress={() => handleLanguageChange(item.code)}
                  >
                    <ThemedText style={styles.languageName}>
                      {item.nativeName}
                    </ThemedText>
                    {item.code === currentLanguage && (
                      <IconSymbol
                        name="checkmark.circle.fill"
                        size={24}
                        color="#007AFF"
                      />
                    )}
                  </TouchableOpacity>
                )}
              />

              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModal}
              >
                <ThemedText style={styles.closeButtonText}>
                  {t('common.close')}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </Animated.View>
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    flex: 1,
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentWrapper: {
    width: '100%',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 34,
    backgroundColor: '#FFFFFF',
    maxHeight: 400,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  selectedLanguage: {
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  languageName: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});