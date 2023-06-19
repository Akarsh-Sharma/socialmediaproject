import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Post as IPost } from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: IPost;
}

// interface for the likes on each post
interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {

    const { post } = props; 

    // reference to our posts db collection 
    const likesRef = collection(db, "likes");
    const [user] = useAuthState(auth);

    // useState for likes for a post
    const [likes, setLikes] = useState<Like[] | null>(null);

    // function to add a like from a user to a post and send it to db
    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
              userId: user?.uid,
              postId: post.id,
            });
            if (user) {
              setLikes((prev) =>
                prev
                  ? [...prev, { userId: user.uid, likeId: newDoc.id }]
                  : [{ userId: user.uid, likeId: newDoc.id }]
              );
            }
          } catch (err) {
            console.log(err);
          }
    }

    // getting the number of likes for each post 
    const likesDoc = query(likesRef, where("postId",  "==", post.id));
    
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(
            data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
          );
    }

    // a boolean that checks if user has liked a post or not
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    // removes a like if user has already liked a post and clicks dislike.
    const removeLike = async () => {
        try {
          const likeToDeleteQuery = query(
            likesRef,
            where("postId", "==", post.id),
            where("userId", "==", user?.uid)
          );
    
          const likeToDeleteData = await getDocs(likeToDeleteQuery);
          const likeId = likeToDeleteData.docs[0].id;
          const likeToDelete = doc(db, "likes", likeId);
          await deleteDoc(likeToDelete);
          if (user) {
            setLikes(
              (prev) => prev && prev.filter((like) => like.likeId !== likeId)
            );
          }
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(()=>{
        getLikes();
    }, [])

    return (
      <div style={{display:"flex", justifyContent:"center", paddingTop:"10px", paddingBottom:"10px"}}>
        <div className="glass-effect">
          <div className="title">
            <h1> {post.title}</h1>
          </div>
          <div className="body">
            <p> {post.description} </p>
          </div>

          <div className="footer">
            <p> @{post.username} </p>
            <button onClick={hasUserLiked ? removeLike : addLike}>
              {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}{" "}
            </button>
            {likes && <p> Likes: {likes?.length} </p>}
          </div>
        </div>
    </div>
    )
}