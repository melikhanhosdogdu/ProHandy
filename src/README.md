# ProHandy - Project Structure

## Core-Features Architecture

This project follows a core-features folder structure for better scalability and organization:

```
src/
├── core/                  # Core functionality
│   ├── i18n/             # Internationalization
│   │   ├── config.ts     # i18n configuration
│   │   ├── utils.ts      # Language utilities
│   │   └── locales/      # Translation files
│   │       ├── en.json   # English translations
│   │       └── es.json   # Spanish translations
│   ├── hooks/            # Core hooks
│   ├── config/           # App configuration
│   └── utils/            # Core utilities
├── features/             # Feature modules
│   └── settings/         # Settings feature
│       └── components/   # Settings components
│           └── LanguageSwitcher.tsx
└── shared/               # Shared resources
    ├── components/       # Shared UI components
    └── constants/        # Shared constants
```

## Multi-Language Support

The app supports English and Spanish languages with automatic detection of device language.

### Features:
- Automatic language detection based on device settings
- Language switcher component in the Explore tab
- Real-time language switching without app restart
- Persistent language selection

### Adding New Languages:
1. Create a new translation file in `src/core/i18n/locales/`
2. Add the language to `getAvailableLanguages()` in `src/core/i18n/utils.ts`
3. Import and register in `src/core/i18n/config.ts`

### Usage:
```typescript
import { useTranslation } from '@/src/core/i18n';

function MyComponent() {
  const { t } = useTranslation();
  return <Text>{t('explore.title')}</Text>;
}
```

### Language Switcher:
The language switcher is available in the Explore tab, allowing users to change between English and Spanish.