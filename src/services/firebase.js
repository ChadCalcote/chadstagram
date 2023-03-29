import { collection, query, where, getDocs, limit, doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';


export async function doesUsernameExist(username) {

    const usernameMatch = query(collection(db, "users"), where('username', '==', username));

    const queryUsernames = await getDocs(usernameMatch);

    return queryUsernames.docs.length > 0;
    
}

export async function getUserByUserId(userId) {
    const userIdMatch = query(collection(db, "users"), where('userId', '==', userId));
    const result = await getDocs(userIdMatch);
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    return user;
}

export async function getSuggestedProfiles(userId, following) {
    const suggestionsLimit = query(collection(db, "users"), limit(10));
    const result = await getDocs(suggestionsLimit);
    return result.docs.map((user) => ({ ...user.data(), docId: user.id })).filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile) {
    const userDoc = doc(db, "users", loggedInUserDocId);
    await updateDoc(userDoc, {
        following: isFollowingProfile ? arrayRemove(profileId) : arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId, isFollowingProfile) {
    const userDoc = doc(db, "users", profileDocId);
    await updateDoc(userDoc, {
        followers: isFollowingProfile ? arrayRemove(loggedInUserDocId) : arrayUnion(loggedInUserDocId)
    });
}