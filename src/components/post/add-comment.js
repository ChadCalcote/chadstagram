import { useState, useContext } from "react";
import UserContext from "../../context/user";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from '../../lib/firebase';


export default function AddComment({ docId, comments, setComments, commentInput }) {
    const [comment, setComment] = useState('')
    const {
        user: { displayName }
    } = useContext(UserContext);
    const handleSubmitComment = async (event) => {
        event.preventDefault();

        setComments([...comments, { displayName, comment }]);
        setComment('');
        const photoDoc = doc(db, "photos", docId)
        return await updateDoc(photoDoc, {
            comments: arrayUnion({ displayName, comment })
        });
    }

    return (
        <div className="border-t border-gray-primary">
            <form className="flex justify-between pl-0 pr-5" method="POST" onSubmit={e => comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()}>
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment ..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <button 
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >Post</button>
            </form>
        </div>
    ) 
}