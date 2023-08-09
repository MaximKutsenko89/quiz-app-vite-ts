import { initializeApp } from "firebase/app";
interface IFirebaseConfig {
    apiKey:string,
    authDomain:string,
    projectId:string,
    storageBucket:string,
    messagingSenderId:string,
    appId:string,
}

export const firebaseConfig:IFirebaseConfig = {
    apiKey:import.meta.env.VITE_REACT_APP_API_KEY as string,
    authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN as string,
    projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID as string,
    storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET as string,
    messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID as string,
    appId: import.meta.env.VITE_REACT_APP_APP_ID as string,
};

export const app = initializeApp(firebaseConfig)
