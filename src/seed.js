import {  collection, addDoc } from 'firebase/firestore';

/* eslint-disable no-plusplus */
// NOTE: replace 'W5yb6EuDeogQ5ghNbKgumaFFjG83' with your Firebase auth user id (can be taken from Firebase)
export async function seedDatabase(db) {

for (let i = 1; i <= 5; ++i) {
  const docRef = await addDoc(collection(db, "photos"), {
        photoId: i,
        userId: 'W5yb6EuDeogQ5ghNbKgumaFFjG83',
        imageSrc: `/images/users/chadillacranch/${i}.jpg`,
        caption: 'We\'re not called the Lover\'s Lounge, but we might as well be in February.',
        likes: [],
        comments: [
          {
            displayName: 'rickross',
            comment: 'I\'ll be rollin up this weekend'
          },
          {
            displayName: 'monaartmuseum',
            comment: 'wish there was a chadillac ranch in australia'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  
  console.log("Document written with ID: ", docRef.id);
} 
}