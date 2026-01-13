
import { User } from '../types';

const USERS_KEY = 'flow_shop_users';

const DEFAULT_ADMIN: User = {
  id: 'admin-1',
  email: 'admin@flow.com',
  password: 'admin',
  isAdmin: true,
  isVerified: true,
  isActive: true,
  createdAt: new Date().toISOString()
};

export const userService = {
  getUsers: (): User[] => {
    const stored = localStorage.getItem(USERS_KEY);
    if (!stored) {
      const initial = [DEFAULT_ADMIN];
      localStorage.setItem(USERS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(stored);
  },

  saveUsers: (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  addUser: (email: string, password: string, isAdmin = false, isVerified = false): User => {
    const users = userService.getUsers();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      isAdmin,
      isVerified,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    userService.saveUsers(users);
    return newUser;
  },

  updateUser: (id: string, updates: Partial<User>) => {
    const users = userService.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      userService.saveUsers(users);
    }
  },

  deleteUser: (id: string) => {
    const users = userService.getUsers();
    const filtered = users.filter(u => u.id !== id);
    userService.saveUsers(filtered);
  },

  authenticate: (email: string, password: string): User | null => {
    const users = userService.getUsers();
    return users.find(u => u.email === email && u.password === password) || null;
  }
};
