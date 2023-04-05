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

export async function getPhotos(userId, following) {
    const photoRef = query(collection(db, "photos"), where('userId', 'in', following));
    const result = await getDocs(photoRef);
    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));

    const photoWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if(photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            const user = await getUserByUserId(photo.userId);
            const { username } = user[0];
            return { username, ...photo, userLikedPhoto };
        })
    );

    return photoWithUserDetails;
}

export async function getUserByUserName(username) {
    const usernameMatch = query(collection(db, "users"), where('username', '==', username));

    const queryUsernames = await getDocs(usernameMatch);

    return queryUsernames.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
}


export async function getUserPhotosByUsername(username) {
    const [user] = await getUserByUserName(username);
    const photoRef = query(collection(db, "photos"), where('userId', '==', user.userId));
    const result = await getDocs(photoRef);
    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const followingRef = query(collection(db, "users"), where('username', '==', loggedInUserUsername), where('following', 'array-contains', profileUserId));
    const result = await getDocs(followingRef);

    const [response = {}] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return response.userId;

}

export async function toggleFollow(isFollowingProfile, activeUserDocId, profileDocId, profileUserId, followingUserId) {
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}