// localStorage is only available on web; native falls back to in-memory state.
const storage = {
  get(key) {
    try { return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null; } catch (e) { return null; }
  },
  set(key, value) {
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(key, value); } catch (e) {}
  },
  remove(key) {
    try { if (typeof localStorage !== 'undefined') localStorage.removeItem(key); } catch (e) {}
  },
};

const ACTIVE_ENTERPRISE_KEY = 'vizehelp_active_enterprise_id';

export const globalStore = {
  user: null,
  // Multi-tenant context: which enterprise's catalog the app is showing.
  activeEnterpriseId: storage.get(ACTIVE_ENTERPRISE_KEY),
  userEnterpriseIds: [],
  // One-shot flag: set on auto-login so Home shows the "Logged into X — switch?" prompt once.
  pendingSwitchPrompt: false,
  currentLocation: '123 Main St, New York, NY',
  savedAddresses: [
    { id: '1', label: 'Home', address: '123 Main St, Apt 4B, New York, NY 10001' },
    { id: '2', label: 'Office', address: '456 Park Ave, Floor 12, New York, NY 10022' },
  ],
  bookings: [
    { 
      id: '982731', 
      service: 'Cleaning', 
      icon: '🧹', 
      date: '25 Jun 2026', 
      time: '12:00 PM – 01:00 PM', 
      status: 'Closed', 
      amount: '$45.00', 
      buddy: 'Sarah L.', 
      paymentStatus: 'Paid', 
      address: '456 Park Ave, New York',
      timeline: [
        { title: 'Booking Created', desc: 'Booking successfully placed', time: '25 Jun 2026, 12:00 PM', done: true },
        { title: 'Buddy Arrived', desc: 'Buddy Sarah L. arrived on site', time: '25 Jun 2026, 12:05 PM', done: true },
        { title: 'Job Closed', desc: 'Service completed successfully', time: '25 Jun 2026, 1:30 PM', done: true }
      ]
    },
    { 
      id: '891028', 
      service: 'Pickup and Drop', 
      icon: '📦', 
      date: '22 Jun 2026', 
      time: '05:00 PM – 06:00 PM', 
      status: 'Cancelled', 
      amount: '$0.00', 
      buddy: 'None', 
      paymentStatus: 'Refunded', 
      address: '12 First Ave, New York',
      timeline: [
        { title: 'Booking Created', desc: 'Booking placed', time: '22 Jun 2026, 4:00 PM', done: true },
        { title: 'Cancelled', desc: 'Cancelled by customer', time: '22 Jun 2026, 4:10 PM', done: true }
      ]
    },
  ],
  activeBookingId: null,
  listeners: [],

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },

  notify() {
    this.listeners.forEach(l => {
      try {
        l();
      } catch (err) {
        // ignore dead listeners
      }
    });
  },

  setUser(userData) {
    this.user = userData;
    if (!userData) {
      // Logout: clear enterprise session context.
      this.activeEnterpriseId = null;
      this.userEnterpriseIds = [];
      this.pendingSwitchPrompt = false;
      storage.remove(ACTIVE_ENTERPRISE_KEY);
    }
    this.notify();
  },

  setActiveEnterprise(enterpriseId) {
    this.activeEnterpriseId = enterpriseId;
    storage.set(ACTIVE_ENTERPRISE_KEY, enterpriseId);
    this.notify();
  },

  setUserEnterprises(ids) {
    this.userEnterpriseIds = ids || [];
    this.notify();
  },

  addUserEnterprise(enterpriseId) {
    if (!this.userEnterpriseIds.includes(enterpriseId)) {
      this.userEnterpriseIds = [...this.userEnterpriseIds, enterpriseId];
    }
    this.notify();
  },

  setLocation(loc) {
    this.currentLocation = loc;
    this.notify();
  },

  addBooking(booking) {
    this.bookings = [booking, ...this.bookings];
    if (booking.status !== 'Closed' && booking.status !== 'Cancelled') {
      this.activeBookingId = booking.id;
    }
    this.notify();
  },

  updateBookingStatus(id, status, extraTimelineEvent = null) {
    this.bookings = this.bookings.map(b => {
      if (b.id === id) {
        const updatedTimeline = [...b.timeline];
        if (extraTimelineEvent) {
          updatedTimeline.push(extraTimelineEvent);
        } else {
          updatedTimeline.push({
            title: status,
            desc: `Status updated to ${status}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            done: true
          });
        }
        return { ...b, status, timeline: updatedTimeline };
      }
      return b;
    });

    if (status === 'Closed' || status === 'Cancelled' || status === 'Refund Completed') {
      if (this.activeBookingId === id) {
        this.activeBookingId = null;
      }
    }
    this.notify();
  },

  addBookingIssue(id, issueType, desc) {
    this.bookings = this.bookings.map(b => {
      if (b.id === id) {
        return { 
          ...b, 
          status: 'Issue Raised', 
          issueDetails: { type: issueType, description: desc },
          timeline: [...b.timeline, {
            title: 'Issue Raised',
            desc: `Customer reported: ${issueType}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            done: true
          }]
        };
      }
      return b;
    });
    if (this.activeBookingId === id) {
      this.activeBookingId = null;
    }
    this.notify();
  }
};
