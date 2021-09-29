import { createContext, useState } from 'react';
import route from 'next/router'
import firebase from '../../firebase/config'
import UserModel from '../../models/UserModel';

interface AuthContextProps {
    user?: UserModel
    loginGoogle?: () => Promise<void>
}

async function normalizedUser(userFirebase: firebase.User): Promise<UserModel> {
    const token = await userFirebase.getIdToken()
    return {
        uid: userFirebase.uid,
        name: userFirebase.displayName,
        email: userFirebase.email,
        token,
        provider: userFirebase.providerData[0].providerId,
        imageUrl: userFirebase.photoURL
    }
}


const AuthContext = createContext<AuthContextProps>({})

export function AuthProvider(props) {
    const [user, setUser] = useState<UserModel>(null)

    async function loginGoogle() {
        console.log('Login')
        route.push('/')
    }

    return (
        <AuthContext.Provider value={{
            user,
            loginGoogle
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext