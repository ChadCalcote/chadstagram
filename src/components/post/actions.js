import { useState, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function Actions({ docId, totalLikes, likedPhoto, handleFocus }) {
    const {
        user: { uid: userId = '' }
    } = useContext(UserContext);
    const [toggleLiked, setToggledLike] = useState(likedPhoto);
    const [likes, setLikes] = useState(totalLikes);
    const { firebaseApp  } = useContext(FirebaseContext);

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);

    };
}