import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

interface AuthProps {
    authState?: {
        id?: number | null;
        token: string | null;
        authenticated: boolean | null;
        email?: string;
        firstName?: string;
        lastName?: string;
        image?: string;
    };
    onRegister?: (email: string, password: string, firstName: string, lastName: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'token';
const PROFILE_KEY = 'profile'; // Kulcs a profil tárolásához
export const API_URL = 'http://192.168.1.25:8080/api/v1';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        id?: number | null;
        token: string | null;
        authenticated: boolean | null;
        email?: string;
        firstName?: string;
        lastName?: string;
        image?: string;
    }>({
        token: null,
        authenticated: null,
    });

    const isTokenExpired = (token: string) => {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Unix idő másodpercben
        return decoded.exp < currentTime;
    };

    const saveProfileToStorage = async (profile: any) => {
        const profileString = JSON.stringify(profile);
        if (Platform.OS === 'web') {
            await AsyncStorage.setItem(PROFILE_KEY, profileString);
        } else {
            await SecureStore.setItemAsync(PROFILE_KEY, profileString);
        }
    };

    const loadProfileFromStorage = async () => {
        let profileString: string | null = null;
        if (Platform.OS === 'web') {
            profileString = await AsyncStorage.getItem(PROFILE_KEY);
        } else {
            profileString = await SecureStore.getItemAsync(PROFILE_KEY);
        }
        return profileString ? JSON.parse(profileString) : null;
    };

    useEffect(() => {
        const loadAuthState = async () => {
            let token: string | null = null;
            if (Platform.OS === 'web') {
                token = await AsyncStorage.getItem(TOKEN_KEY);
            } else {
                token = await SecureStore.getItemAsync(TOKEN_KEY);
            }
            if (token) {
                if (isTokenExpired(token)) {
                    await logout();
                    return;
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const storedProfile = await loadProfileFromStorage();
                setAuthState({
                    token,
                    authenticated: true,
                    ...storedProfile,
                });
                if (!storedProfile) {
                    await getUserProfile();
                }
            }
        };
        loadAuthState();
    }, []);

    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, { 
                email, 
                password, 
                firstName, 
                lastName 
            });
            return response.data;
        } catch (e) {
            console.log(e)
            return { error: true, msg: (e as any).response.data };
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/signin`, { email, password });
            setAuthState({
                token: result.data.token,
                authenticated: true,
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            if (Platform.OS === 'web') {
                await AsyncStorage.setItem(TOKEN_KEY, result.data.token);
            } else {
                await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            }
            await getUserProfile();
            return result;
        } catch (e) {
            return { error: true, msg: (e as any).response.data };
        }
    };

    const logout = async () => {
        if (Platform.OS === 'web') {
            await AsyncStorage.removeItem(TOKEN_KEY);
            await AsyncStorage.removeItem(PROFILE_KEY);
        } else {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(PROFILE_KEY);
        }
        axios.defaults.headers.common['Authorization'] = '';
        setAuthState({
            token: null,
            authenticated: false,
        });
    };

    const getUserProfile = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile`);
            const profile = {
                id: response.data.id,
                email: response.data.email,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                image: response.data.imageUrl,
            };
            setAuthState(prevState => ({
                ...prevState,
                ...profile,
            }));
            await saveProfileToStorage(profile);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
