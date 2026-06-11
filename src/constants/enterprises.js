import { SERVICE_CATEGORIES } from './services';

// Enterprises available on the platform. Each enterprise offers a subset of
// the global service catalog — the app must only ever surface services
// belonging to the user's currently active enterprise.
export const ENTERPRISES = [
  {
    id: 'ent_001',
    name: 'Vizehelp NY Corp',
    logo: '🏙️',
    color: '#2563EB',
    tagline: 'Full-service provider for Manhattan & Brooklyn',
    location: 'New York, NY',
    serviceIds: ['1', '2', '3', '5', '6'],
  },
  {
    id: 'ent_002',
    name: 'Sunrise Residences',
    logo: '🏘️',
    color: '#F97316',
    tagline: 'Resident services for apartment communities',
    location: 'Jersey City, NJ',
    serviceIds: ['2', '4', '6', '8'],
  },
  {
    id: 'ent_003',
    name: 'Metro Business Park',
    logo: '🏢',
    color: '#8B5CF6',
    tagline: 'On-demand support for office campuses',
    location: 'Newark, NJ',
    serviceIds: ['1', '3', '5', '7'],
  },
];

// Mock registry of returning users, keyed by phone number. Simulates the
// login API response: { is_new_user, associated_enterprises, last_used_enterprise_id }.
// Any phone not listed here is treated as a brand-new user.
const REGISTERED_USERS = {
  '5550001111': {
    name: 'Alex Carter',
    email: 'alex.carter@email.com',
    language: 'English',
    enterpriseIds: ['ent_001'],
    lastUsedEnterpriseId: 'ent_001',
  },
  '5550002222': {
    name: 'Maya Patel',
    email: 'maya.patel@email.com',
    language: 'English',
    enterpriseIds: ['ent_001', 'ent_002', 'ent_003'],
    lastUsedEnterpriseId: 'ent_002',
  },
};

export function findUserByPhone(phone) {
  const digits = (phone || '').replace(/\D/g, '');
  return REGISTERED_USERS[digits] || null;
}

export function getEnterpriseById(id) {
  return ENTERPRISES.find(e => e.id === id) || null;
}

export function getEnterpriseServices(enterpriseId) {
  const ent = getEnterpriseById(enterpriseId);
  if (!ent) return SERVICE_CATEGORIES;
  return SERVICE_CATEGORIES.filter(s => ent.serviceIds.includes(s.id));
}
