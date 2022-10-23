import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(true);
        router.push("/login");
      }

      setInitialLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const signUp = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
          router.push("/");
        })
        .catch((error: Error) => alert(error.message))
        .finally(() => setLoading(false));
    },
    [router]
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
          router.push("/");
        })
        .catch((error: Error) => {
          alert(error.message);
        })
        .finally(() => setLoading(false));
    },
    [router]
  );

  const logout = useCallback(async () => {
    setLoading(true);

    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error: Error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, loading, logout, error }}
    >
      {!initialLoading && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
