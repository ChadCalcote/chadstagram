import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';


export async function doesUsernameExist(username) {

    const usernameMatch = query(collection(db, "users"), where('username', '==', username));

    const queryUsernames = await getDocs(usernameMatch);

    return queryUsernames.docs.length > 0;
    
}