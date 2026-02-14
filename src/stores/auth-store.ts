import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: AuthUser | null;
  apiKey: string | null;
  isAuthenticated: boolean;
  login: (payload: { apiKey: string; user: AuthUser }) => void;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist((set, get) => ({
    user: null,
    apiKey: null,
    isAuthenticated: false,
    login: ({ apiKey, user }) => {
      set({
        apiKey,
        user,
        isAuthenticated: !!apiKey,
      });
    },
    logout: () => {
      set({
        apiKey: null,
        user: null,
        isAuthenticated: false,
      });
    },
    setUser: (user: AuthUser | null) => {
      set({
        user,
        isAuthenticated: !!get().apiKey,
      });
    },
  }),
  {
    name: "taskly-auth",
    partialize: (state) => ({
      user: state.user,
      apiKey: state.apiKey,
      isAuthenticated: state.isAuthenticated,
    })
  },
),
);
