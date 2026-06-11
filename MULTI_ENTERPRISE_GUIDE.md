# Vizehelp Multi-Enterprise Architecture Guide

## Overview

Vizehelp now supports a **phone-first, multi-tenant architecture** where customers can:
- Log in with just their phone number
- Manage multiple enterprise associations
- Switch between enterprises seamlessly
- See only services from their active enterprise

---

## Architecture

### 1. AuthContext (`src/context/AuthContext.js`)

Central state management for authentication and enterprise switching.

```javascript
useAuth() // Hook to access auth state and actions
```

**State:**
- `user` - Current user object
- `userEnterprises` - Array of enterprises user is associated with
- `activeEnterpriseId` - Currently active enterprise
- `authState` - Phase: 'splash', 'phone', 'otp', 'enterprise-select', 'authenticated'
- `loading` - Loading state for async operations

**Actions:**
- `verifyOTP(phone, otp)` - Verify phone + OTP, returns user and enterprises
- `selectEnterprise(enterpriseId)` - Set active enterprise (also for onboarding)
- `switchEnterprise(enterpriseId)` - Switch to different enterprise
- `logout()` - Clear auth state

### 2. User Flows

#### Flow A: New User (First Time)
```
Welcome (Phone Input)
    ↓
OTP (Verification)
    ↓
EnterpriseSelect (Pick provider, mode='new')
    ↓
ProfileSetup (Name, address, etc.)
    ↓
MainTabs (Home with filtered services)
```

#### Flow B: Returning User (Single Enterprise)
```
Welcome (Phone Input)
    ↓
OTP (Verification)
    ↓
AuthContext returns: isNewUser=false, enterprises=[{ent_001}]
    ↓
AUTO-NAVIGATE to MainTabs (Skip selection, set active)
    ↓
Home (with ent_001 services)
```

#### Flow C: Returning User (Multiple Enterprises)
```
Welcome (Phone Input)
    ↓
OTP (Verification)
    ↓
AuthContext returns: isNewUser=false, enterprises=[{ent_001}, {ent_002}]
    ↓
EnterpriseSelect (Pick one, mode='switch')
    ↓
MainTabs (with selected enterprise's services)
```

#### Flow D: Switching Enterprises (Logged In)
```
Profile Tab
    ↓
"Switch Enterprise" Menu Item
    ↓
EnterpriseSelect (Shows all available, mode='switch')
    ↓
Reset to MainTabs
    ↓
Home (refreshed with new enterprise)
```

---

## Screen Components

### WelcomeScreen
- **Input:** Phone number (10 digits, country code already set to +1)
- **Validation:** Enabled only when 10 digits entered
- **Action:** Navigates to OTP screen
- **Design:** Hero gradient section with features + form

### OTPScreen
- **Input:** 6 OTP digits (auto-focus, backspace support)
- **Validation:** OTP must be complete
- **Smart Routing:**
  - If new user → EnterpriseSelect (onboarding)
  - If existing + 1 enterprise → MainTabs (auto-login)
  - If existing + multiple → EnterpriseSelect (choose)
- **Demo Mode:** Any 6 digits work for testing

### EnterpriseSelectScreen
Two modes:

**Mode 'new' (Onboarding):**
- Shows all available enterprises
- Step indicator: "Step 1 of 2"
- Info box: "First time here?"
- Next: ProfileSetup

**Mode 'switch' (Existing User):**
- Shows all user's enterprises
- Current enterprise marked with "Current" badge
- Next: MainTabs (resets navigation stack)

**Card Design:**
- Logo emoji + name + description
- Visual selection feedback (border color, checkmark)
- "Current" badge for active enterprise

### ProfileScreen
**New Section: Multi-Tenant**
- "Switch Enterprise" menu item
- Badge showing number of available enterprises (if > 1)
- Action: Opens EnterpriseSelect screen

---

## API Integration Points

### Login Response (After OTP Verification)
```json
{
  "user_id": "u123",
  "phone": "+15551234567",
  "is_new_user": false,
  "associated_enterprises": [
    {
      "id": "ent_001",
      "name": "Global Spa",
      "logo": "💆"
    },
    {
      "id": "ent_002",
      "name": "City Cleaning",
      "logo": "🧹"
    }
  ],
  "last_used_enterprise_id": "ent_001"
}
```

### Service Fetching
All service endpoints must filter by enterprise:
```
GET /api/services?enterprise_id=ent_001
```

Response includes services only from `ent_001`.

### Booking API
When creating a booking, include enterprise_id:
```
POST /api/bookings
{
  "enterprise_id": "ent_001",
  "service_id": "svc_123",
  ...
}
```

---

## State Persistence

Active enterprise is persisted in localStorage:
```javascript
const ACTIVE_ENTERPRISE_KEY = 'vizehelp_active_enterprise_id'
```

This ensures:
- User stays on the same enterprise if app is closed/reopened
- No unexpected switching between sessions

---

## Clearing Draft Bookings

When switching enterprises, any in-progress bookings are lost (design intent):
```javascript
navigation.reset({
  index: 0,
  routes: [{ name: 'MainTabs' }]
})
```

The `reset()` call discards all stack history, preventing user from going "back" to another enterprise's booking flow.

---

## Error Handling

### OTPScreen
- Shows error box if verification fails
- "Resend OTP" available after 30 seconds
- "Change number" always available

### EnterpriseSelectScreen
- Alerts if user tries to continue without selection
- Loading state while processing selection
- Gracefully handles API failures

---

## Future Enhancements

1. **Remember Last Enterprise**
   - Pre-select `last_used_enterprise_id` in EnterpriseSelect

2. **Enterprise Invitations**
   - QR code or link to join new enterprise
   - Skip manual selection, auto-accept

3. **Cross-Enterprise Bookings**
   - Allow viewing/managing bookings from all enterprises
   - Show enterprise name in booking history

4. **Enterprise Details**
   - Logo/banner from backend
   - Location, contact info, hours
   - Service categories per enterprise

5. **Onboarding Completion**
   - Multi-step profile setup with enterprise-specific questions
   - Documents/verification per enterprise

---

## Testing

### Demo Credentials
- **Phone:** Any 10 digits
- **OTP:** Any 6 digits
- **Enterprise Selection:** Hardcoded options in `ENTERPRISE_OPTIONS`

### Test Scenarios
1. New user with single enterprise selection
2. Returning user auto-login (single enterprise)
3. Returning user selection (multiple enterprises)
4. Switch enterprise from Profile tab
5. Logout and re-login to different enterprise

---

## File Structure

```
src/
├── context/
│   └── AuthContext.js          # State management
├── screens/
│   ├── WelcomeScreen.js        # Phone input
│   ├── OTPScreen.js            # OTP verification
│   ├── EnterpriseSelectScreen.js  # Enterprise selection
│   ├── ProfileScreen.js        # User profile + switch option
│   └── ... other screens
├── constants/
│   ├── theme.js                # Colors, fonts, shadows
│   └── state.js                # Global state (legacy, kept for compatibility)
└── components/
    └── Button.js               # PrimaryButton component

App.js                           # Navigation setup with AuthProvider
```

---

## Design Tokens

All screens use the design system from `constants/theme.js`:

**Colors:**
- `COLORS.primary` - Action color (indigo)
- `COLORS.primaryLight` - Light background for primary
- `COLORS.text` - Dark text
- `COLORS.textLight` - Secondary text
- `COLORS.border` - Subtle borders
- `COLORS.background` - Light background

**Typography:**
- `FONTS.h1`, `FONTS.h2` - Headings
- `FONTS.body`, `FONTS.bodySm` - Body text
- `FONTS.caption` - Small text

**Spacing:**
- `SIZES.lg` (24px) - Large margins
- `SIZES.md` (16px) - Medium margins
- `SIZES.radius` - Border radius

---

## Troubleshooting

**Issue:** User logged out when switching enterprises
- **Solution:** Check that `navigation.reset()` is being called correctly in EnterpriseSelect

**Issue:** Services not updating after enterprise switch
- **Solution:** Verify `GET /api/services?enterprise_id=X` is being called with correct ID

**Issue:** Persisted enterprise doesn't load
- **Solution:** Check `localStorage` is available and enterprise ID is in `associated_enterprises`

