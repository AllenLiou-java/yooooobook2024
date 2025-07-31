import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'
const { firebaseProjectId, firebaseClientEmail, firebasePrivateKey, firebaseStorageBucket } =
    useRuntimeConfig()

// 建議將金鑰放在 .env 或環境變數中管理
const serviceAccount = {
    projectId: firebaseProjectId,
    clientEmail: firebaseClientEmail,
    privateKey: firebasePrivateKey?.replace(/\\n/g, '\n')
}

if (!getApps().length) {
    initializeApp({
        credential: cert(serviceAccount),
        storageBucket: firebaseStorageBucket
    })
}

export const adminStorage = getStorage()
