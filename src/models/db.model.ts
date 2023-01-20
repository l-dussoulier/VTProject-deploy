import { CollectionReference, Firestore, getFirestore } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin';
import config from "../config";

export interface DatabaseManagerProps {
    firestore: Firestore;
    user: CollectionReference;
    twitter: CollectionReference;
}

export class DatabaseManager {

    private static instance?: DatabaseManager;

    firestore: Firestore;
    user: CollectionReference;
    twitter: CollectionReference;

    public static async getInstance(): Promise<DatabaseManager> {
        if (DatabaseManager.instance === undefined) {
            DatabaseManager.instance = await DatabaseManager.initialize();
        }
        return DatabaseManager.instance;
    }

    /**
     * Initialize the Firestore Database
     * @returns Firestore object
     */
    private static async initialize(): Promise<DatabaseManager> {
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
        const db = getFirestore(app);
        const managerProps: DatabaseManagerProps = {
            firestore: db,
            user: db.collection('users'),
            twitter: db.collection('twitters'),

        }
        return new DatabaseManager(managerProps);
    }

    private constructor(props: DatabaseManagerProps) {
        this.firestore = props.firestore;
        this.user = props.user;
        this.twitter = props.twitter;
    }

}
