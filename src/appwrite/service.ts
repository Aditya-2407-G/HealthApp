import { ID, Account, Client, Databases, Storage, Query } from 'appwrite';
import Config from 'react-native-config'
import Snackbar from 'react-native-snackbar'


const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;
const APPWRITE_DATABASEID: string= Config.APPWRITE_DATABASEID!;
const APPWRITE_COLLECTIONID:string = Config.APPWRITE_COLLECTIONID!;
const APPWRITE_BUCKETID: string = Config.APPWRITE_BUCKETID!;

type createUserAccount = {
    email: string;
    password: string;
    name: string;
}

type loginUserAccount = {
    email: string;
    password: string;
}


class AppwriteService {
    
    account;
    databases;
    storage;
    
    constructor() {

        const appwriteClient = new Client()       // try moving up 
        appwriteClient.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID)
        this.account = new Account(appwriteClient);
        this.databases = new  Databases(appwriteClient);
        this.storage = new Storage(appwriteClient);        
    } 
    
    // create new record of user inside 

    async createAccount({email, password, name} : createUserAccount) {

        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email, 
                password,
                name
            )

            if(userAccount) {
                return this.login({email, password})
            }
            else {
                return userAccount
            }

        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite service :: createAccount() ::" + error)
        }
    } 


    async login({email, password} : loginUserAccount) {

        try {

            return await this.account.createEmailPasswordSession(email, password)
            
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite service :: loginAccount() ::" + error)
        }
    }

    async getCurrentUser() {

        try {

            return await this.account.get()
            
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() ::" + error)
        }
    }

    async logOut() {

        try {

            return await this.account.deleteSession('current')
            
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() ::" + error)
        }
    }

    async createRecords(data: any) {
        try {

            return await this.databases. createDocument(APPWRITE_DATABASEID, APPWRITE_COLLECTIONID, ID.unique(), data)
            
        } catch (error) {
            console.log("create record error", error);
            return false;
        }
    }


    async uploadFile(file: any) {
        try {

            return await this.storage.createFile(APPWRITE_BUCKETID, ID.unique(), file)
            
        } catch (error) {
            console.log("file", error);
            return false;
        }
    }

    async deleteFile(fileId: any) {

        try {

            await this.storage.deleteFile(APPWRITE_BUCKETID, fileId)
            return true;
            
        } catch (error) {
            console.log("error deletion", error)
            return false;
        }

    }

    getFilePreview(fileId: any) {

        this.storage.getFilePreview(APPWRITE_BUCKETID, fileId)

    }



}


export default AppwriteService



// createEmailSession