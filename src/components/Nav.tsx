import { Link, usePathname, type Href } from 'expo-router';
import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { copyText, wedding } from '@/content/wedding';
import { colors, css, fonts, NAV_HEIGHT } from '@/theme';
import { CloseIcon, MenuIcon } from './Art';
import { Btn } from './Btn';

export const navItems: { label: string; href: Href }[] = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'The Venues', href: '/venues' },
  { label: 'Wedding Details', href: '/details' },
];

const fixed = (Platform.OS === 'web' ? { position: 'fixed' } : { position: 'absolute' }) as unknown as ViewStyle;
const monogram = `${copyText(wedding.couple.partnerOne)[0]} & ${copyText(wedding.couple.partnerTwo)[0]}`;

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<ComponentRef<typeof View>>(null);
  const toggleRef = useRef<ComponentRef<typeof Pressable>>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web' || !open) return;
    const menu = menuRef.current as unknown as HTMLElement;
    const toggle = toggleRef.current as unknown as HTMLElement | null;
    const focusable = () => Array.from(menu.querySelectorAll<HTMLElement>('a, button'));
    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key !== 'Tab') return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      toggle?.focus();
    };
  }, [open]);

  const overHero = pathname === '/' && !scrolled;
  const ink = overHero ? colors.ivory : colors.charcoal;

  return (
    <>
      <View
        role="navigation"
        aria-label="Main"
        {...css('nav', 'gutter')}
        style={[fixed, styles.bar, { backgroundColor: overHero ? 'transparent' : colors.ivory, borderBottomColor: overHero ? 'transparent' : colors.hairline }]}
      >
        <Link href="/" aria-label="Home" style={[styles.monogram, { color: overHero ? colors.ivory : colors.gold }]}>
          {monogram}
        </Link>

        <View {...css('show-md')} style={styles.links}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                {...css('nav-link', active && 'nav-link-active')}
                style={[styles.link, { color: ink }]}
              >
                {item.label}
              </Link>
            );
          })}
          <Btn label="RSVP" href="/rsvp" compact variant={overHero ? 'light' : 'solid'} />
        </View>

        <View {...css('hide-lg')} style={styles.mobileRow}>
          <Btn label="RSVP" href="/rsvp" compact variant={overHero ? 'light' : 'solid'} />
          <Pressable
            ref={toggleRef}
            role="button"
            aria-label="Open menu"
            aria-expanded={open}
            hitSlop={12}
            onPress={() => setOpen(true)}
            style={styles.iconBtn}
          >
            <MenuIcon color={ink} />
          </Pressable>
        </View>
      </View>

      {open ? (
        <View ref={menuRef} role="dialog" aria-modal aria-label="Menu" {...css('menu', 'gutter')} style={[fixed, styles.menu]}>
          <View style={styles.menuTop}>
            <Text style={[styles.monogram, { color: colors.gold }]}>{monogram}</Text>
            <Pressable role="button" aria-label="Close menu" hitSlop={12} onPress={() => setOpen(false)} style={styles.iconBtn}>
              <CloseIcon color={colors.charcoal} />
            </Pressable>
          </View>
          <View style={styles.menuLinks}>
            {[...navItems, { label: 'RSVP', href: '/rsvp' as Href }].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                onPress={() => setOpen(false)}
                style={[styles.menuLink, pathname === item.href && { color: colors.gold }]}
              >
                {item.label}
              </Link>
            ))}
          </View>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    top: 0,
    left: 0,
    right: 0,
    height: NAV_HEIGHT,
    zIndex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
  },
  monogram: { fontFamily: fonts.script, fontSize: 32, lineHeight: 40 },
  links: { flexDirection: 'row', alignItems: 'center', gap: 40 },
  link: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, letterSpacing: 0.6 },
  mobileRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  iconBtn: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  menu: { top: 0, left: 0, right: 0, bottom: 0, zIndex: 30, backgroundColor: colors.ivory, paddingHorizontal: 24 },
  menuTop: { height: NAV_HEIGHT, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menuLinks: { flex: 1, justifyContent: 'center', gap: 22, paddingBottom: NAV_HEIGHT },
  menuLink: { fontFamily: fonts.serifLight, fontSize: 44, lineHeight: 52, color: colors.charcoal },
});
