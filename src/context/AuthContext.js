import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userEnterprises, setUserEnterprises] = useState([]);
  const [activeEnterpriseId, setActiveEnterpriseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authState, setAuthState] = useState('splash'); // splash, phone, otp, enterprise-select, onboarding, authenticated

  // Mock login API call
  const verifyOTP = async (phone, otp) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1200));

      // Mock response based on phone number
      const isNewUser = phone.includes('5');
      const enterprises = isNewUser
        ? []
        : [
            { id: 'ent_001', name: 'Global Spa', logo: '💆' },
            { id: 'ent_002', name: 'City Cleaning', logo: '🧹' }
          ];

      const mockUser = {
        id: `user_${phone}`,
        phone: `+1${phone}`,
        name: null,
        isNewUser
      };

      setUser(mockUser);
      setUserEnterprises(enterprises);

      // Determine next screen
      if (isNewUser) {
        setAuthState('enterprise-select');
      } else if (enterprises.length === 1) {
        setActiveEnterpriseId(enterprises[0].id);
        setAuthState('authenticated');
      } else {
        setAuthState('enterprise-select');
      }

      return { success: true, isNewUser, enterprises };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const selectEnterprise = async (enterpriseId, name) => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 800));

      const updatedUser = { ...user, name: name || user.name };
      setUser(updatedUser);
      setActiveEnterpriseId(enterpriseId);

      // Add to enterprises if new
      if (!userEnterprises.find(e => e.id === enterpriseId)) {
        setUserEnterprises([...userEnterprises, {
          id: enterpriseId,
          name: name || 'My Enterprise',
          logo: '🏢'
        }]);
      }

      setAuthState('authenticated');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const switchEnterprise = (enterpriseId) => {
    setActiveEnterpriseId(enterpriseId);
    // Clear any draft bookings from previous enterprise
    // This would be handled by the main app state
  };

  const logout = () => {
    setUser(null);
    setUserEnterprises([]);
    setActiveEnterpriseId(null);
    setAuthState('phone');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userEnterprises,
        activeEnterpriseId,
        loading,
        authState,
        setAuthState,
        verifyOTP,
        selectEnterprise,
        switchEnterprise,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
