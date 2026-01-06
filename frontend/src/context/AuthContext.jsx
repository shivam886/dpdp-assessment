import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored user
        const storedUser = localStorage.getItem('dpdp_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock login logic
        if (email && password) {
            const mockUser = { id: '1', name: 'Client User', email, role: 'client' };
            setUser(mockUser);
            localStorage.setItem('dpdp_user', JSON.stringify(mockUser));
            return { success: true };
        }
        return { success: false, error: 'Invalid credentials' };
    };

    const register = async (name, email, password) => {
        // Mock register logic
        const mockUser = { id: '2', name, email, role: 'client' };
        setUser(mockUser);
        localStorage.setItem('dpdp_user', JSON.stringify(mockUser));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('dpdp_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
