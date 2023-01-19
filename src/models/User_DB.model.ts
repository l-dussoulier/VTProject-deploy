import { CollectionReference, Firestore, getFirestore } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin';
import config from "../config";

export interface UserDatabaseManagerProps {
    firestore: Firestore;
    player: CollectionReference;
}

export class UserDatabaseManager {

    private static instance?: UserDatabaseManager;

    firestore: Firestore;
    player: CollectionReference;

    public static async getInstance(): Promise<UserDatabaseManager> {
        if (UserDatabaseManager.instance === undefined) {
            UserDatabaseManager.instance = await UserDatabaseManager.initialize();
        }
        return UserDatabaseManager.instance;
    }

    /**
     * Initialize the Firestore Database
     * @returns Firestore object
     */
    private static async initialize(): Promise<UserDatabaseManager> {
        const serviceAccount : any = {
            "type": config.firebaseConfig.type,
            "project_id": config.firebaseConfig.project_id,
            "private_key_id": config.firebaseConfig.private_key_id,
            "private_key": config.firebaseConfig.private_key,
            "client_email": config.firebaseConfig.client_email,
            "client_id": config.firebaseConfig.client_id,
            "auth_uri": config.firebaseConfig.auth_uri,
            "token_uri": config.firebaseConfig.token_uri,
            "auth_provider_x509_cert_url": config.firebaseConfig.auth_provider_x509_cert_url,
            "client_x509_cert_url": config.firebaseConfig.client_x509_cert_url
        }
        const app = initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        const User_db = getFirestore(app);
        const managerProps: UserDatabaseManagerProps = {
            firestore: User_db,
            player: User_db.collection('users'),

        }
        return new UserDatabaseManager(managerProps);
    }

    private constructor(props: UserDatabaseManagerProps) {
        this.firestore = props.firestore;
        this.player = props.player;
    }

}
