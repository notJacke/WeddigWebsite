import '@/theme/global.css';
import { Slot, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { useAppFonts } from '@/hooks/useAppFonts';
import { colors, css } from '@/theme';

export default function RootLayout() {
  const pathname = usePathname();
  const ready = useAppFonts();

  useEffect(() => {
    if (Platform.OS === 'web') window.scrollTo(0, 0);
  }, [pathname]);

  if (!ready) return null;

  return (
    <View style={styles.root}>
      <Nav />
      {/* Keyed by route so each new page plays the fade-in. */}
      <View key={pathname} role="main" {...css('page')} style={styles.main}>
        <Slot />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, width: '100%', backgroundColor: colors.ivory },
  main: { flexGrow: 1 },
});
