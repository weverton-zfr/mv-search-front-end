import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { supabase } from "../lib/supabase";
import { api } from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser(session) {
    try {
      if (!session?.access_token) {
        setProfile(null);
        setSubscription(null);
        setLoading(false);
        return;
      }

      const { data } = await api.get("/me", {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      setProfile(data.profile);
      setSubscription(data.subscription);
    } catch (err) {
      console.log(err);
      setProfile(null);
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProfile() {
    const { data } = await api.get("/me");

    setProfile(data.profile);
    setSubscription(data.subscription);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      loadUser(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        loadUser(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        profile,
        subscription,
        loading,
        fetchProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}