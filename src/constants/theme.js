export const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#DBEAFE',
  primarySoft: '#EFF5FF',
  secondary: '#16A34A',
  secondaryLight: '#DCFCE7',
  accent: '#F97316',
  accentLight: '#FFF7ED',
  purple: '#7C3AED',
  purpleLight: '#EDE9FE',
  amber: '#F59E0B',
  amberLight: '#FEF3C7',
  background: '#F4F7FB',
  white: '#FFFFFF',
  black: '#111827',
  gray: '#6B7280',
  lightGray: '#E5E7EB',
  border: '#E8ECF2',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  success: '#16A34A',
  successLight: '#DCFCE7',
  warning: '#F97316',
  warningLight: '#FFF7ED',
  card: '#FFFFFF',
  text: '#0F172A',
  textLight: '#64748B',
  textDisabled: '#9CA3AF',
  star: '#F59E0B',
  overlay: 'rgba(15,23,42,0.55)',
};

// Gradient presets used with expo-linear-gradient
export const GRADIENTS = {
  primary: ['#3B82F6', '#2563EB'],
  primaryDeep: ['#2563EB', '#1D4ED8'],
  hero: ['#1E40AF', '#2563EB', '#3B82F6'],
  splash: ['#3B82F6', '#2563EB', '#1E3A8A'],
  success: ['#22C55E', '#16A34A'],
  accent: ['#FB923C', '#F97316'],
  purple: ['#8B5CF6', '#6D28D9'],
  sky: ['#60A5FA', '#3B82F6'],
  dark: ['#1E293B', '#0F172A'],
  banner: ['#2563EB', '#7C3AED'],
};

export const SIZES = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
  radius: 14, radiusSm: 10, radiusLg: 18, radiusXl: 24,
  buttonHeight: 54,
};

export const FONTS = {
  h1: { fontSize: 26, fontWeight: '800', color: '#0F172A', letterSpacing: -0.5 },
  h2: { fontSize: 21, fontWeight: '700', color: '#0F172A', letterSpacing: -0.3 },
  h3: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  body: { fontSize: 16, fontWeight: '400', color: '#0F172A' },
  bodySm: { fontSize: 14, fontWeight: '400', color: '#0F172A' },
  caption: { fontSize: 12, fontWeight: '400', color: '#64748B' },
  button: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
};

export const SHADOWS = {
  small: { shadowColor: '#1E293B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  medium: { shadowColor: '#1E293B', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.1, shadowRadius: 14, elevation: 5 },
  large: { shadowColor: '#1E293B', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.16, shadowRadius: 24, elevation: 10 },
  primary: { shadowColor: '#2563EB', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.32, shadowRadius: 16, elevation: 8 },
};
