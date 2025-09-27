// ===========================================
// AUTH SERVICE - API STUBS
// ===========================================

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUsers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'password123',
    createdAt: new Date().toISOString(),
  }
];

// Mock JWT token
const generateMockToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  };
  
  // Simple base64 encoding (not secure, just for demo)
  return btoa(JSON.stringify(payload));
};

// Check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('authToken');
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token));
    const now = Math.floor(Date.now() / 1000);
    
    // Check if token is expired
    if (payload.exp < now) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return false;
    }
    
    return true;
  } catch (error) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return false;
  }
};

// Get current user
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    return null;
  }
};

// Login user
export const login = async (credentials) => {
  try {
    // Simulate API delay
    await delay(1000);
    
    const { email, password } = credentials;
    
    // Find user in mock data
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return {
        success: false,
        message: 'Неверный email или пароль'
      };
    }
    
    // Generate token
    const token = generateMockToken(user);
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }));
    }
    
    return {
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      token
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Произошла ошибка при входе'
    };
  }
};

// Register user
export const register = async (userData) => {
  try {
    // Simulate API delay
    await delay(1500);
    
    const { firstName, lastName, email, password } = userData;
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return {
        success: false,
        message: 'Пользователь с таким email уже существует'
      };
    }
    
    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase(),
      password, // In real app, this should be hashed
      createdAt: new Date().toISOString(),
    };
    
    // Add to mock data
    mockUsers.push(newUser);
    
    // Generate token
    const token = generateMockToken(newUser);
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }));
    }
    
    return {
      success: true,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      },
      token
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Произошла ошибка при регистрации'
    };
  }
};

// Logout user
export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
  
  return {
    success: true,
    message: 'Вы успешно вышли из системы'
  };
};

// Forgot password
export const forgotPassword = async (email) => {
  try {
    // Simulate API delay
    await delay(1000);
    
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return {
        success: false,
        message: 'Пользователь с таким email не найден'
      };
    }
    
    // In real app, send reset email here
    console.log(`Password reset email would be sent to: ${email}`);
    
    return {
      success: true,
      message: 'Инструкции по восстановлению пароля отправлены на ваш email'
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    return {
      success: false,
      message: 'Произошла ошибка при восстановлении пароля'
    };
  }
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  try {
    // Simulate API delay
    await delay(1000);
    
    // In real app, verify token and update password
    console.log(`Password reset for token: ${token}`);
    
    return {
      success: true,
      message: 'Пароль успешно изменен'
    };
  } catch (error) {
    console.error('Reset password error:', error);
    return {
      success: false,
      message: 'Произошла ошибка при изменении пароля'
    };
  }
};

// Update profile
export const updateProfile = async (userData) => {
  try {
    // Simulate API delay
    await delay(1000);
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        message: 'Пользователь не авторизован'
      };
    }
    
    // Update user in mock data
    const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...userData,
        id: currentUser.id, // Prevent ID change
        email: currentUser.email // Prevent email change for now
      };
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify({
          ...currentUser,
          ...userData
        }));
      }
    }
    
    return {
      success: true,
      user: {
        ...currentUser,
        ...userData
      },
      message: 'Профиль успешно обновлен'
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      message: 'Произошла ошибка при обновлении профиля'
    };
  }
};

// Export all functions as default object
const authService = {
  isAuthenticated,
  getCurrentUser,
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  updateProfile
};

export default authService;
