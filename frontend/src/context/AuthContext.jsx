import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/profile");
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("[Auth Context] Load Profile Error:", err.message);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.success) {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        setUser(res.data.user);
        toast.success(res.data.message || "Logged in successfully!");
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid credentials";
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const register = async (email, password, firstName, lastName) => {
    try {
      const res = await api.post("/auth/register", { email, password, firstName, lastName });
      if (res.data.success) {
        toast.success(res.data.message || "Account registered! Please check email.");
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await api.post("/auth/logout", { refreshToken });
    } catch (e) {
      // Ignored
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      toast.success("Logged out successfully");
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await api.post("/auth/forgot-password", { email });
      toast.success(res.data.message || "Password reset link sent!");
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Request failed";
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const res = await api.post("/auth/reset-password", { token, newPassword });
      toast.success(res.data.message || "Password reset successful!");
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Reset failed";
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const updateProfile = async (firstName, lastName) => {
    try {
      const res = await api.put("/auth/profile", { firstName, lastName });
      if (res.data.success) {
        setUser((prev) => ({ ...prev, ...res.data.user }));
        toast.success("Profile updated!");
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Update failed";
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await api.post("/auth/change-password", { currentPassword, newPassword });
      toast.success(res.data.message || "Password changed!");
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Password update failed";
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
