"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: "ecowarrior" | "organization" | "admin";
}

// Update your AuthContext to use this type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

// Register data type
interface RegisterData {
  name: string
  email: string
  password: string
  role: "ecowarrior" | "organization" | "admin"
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider props
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // For development purposes, use a mock user instead of making an API call
        // In a production environment, you would uncomment the API call below
        /*
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        }
        */

        // Mock user for development
        const mockUser: User = {
          id: "user-123",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "ecowarrior",
        }

        // Set the mock user for development
        setUser(mockUser)
      } catch (error) {
        console.error("Auth check failed:", error)
        // Don't set user to null on error in development
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Login failed")
      }

      const data = await response.json()
      setUser(data.user)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Registration failed")
      }

      const data = await response.json()
      setUser(data.user)
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setIsLoading(true)
    try {
      // For development purposes, just set user to null
      // In production, you would use the API call below
      /*
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Logout failed")
      }
      */

      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Remove the development mock user effect since we're already setting it in checkAuth
  // Delete or comment out this useEffect:
  /*
  useEffect(() => {
    if (!isLoading && !user) {
      // This is just for demo purposes - in a real app, you'd redirect to login
      const mockUser: User = {
        id: "user-123",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "ecowarrior",
      }

      // Uncomment this line to simulate a logged-in user for development
      // setUser(mockUser);
    }
  }, [isLoading, user])
  */

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
