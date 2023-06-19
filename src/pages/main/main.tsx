import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Post } from "./post";
import { auth, db } from "../../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

export interface Post { // we made an interface for our Post object 
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}

export const Main = () => {

    const [postsList, setPostsList] = useState<Post[] | null>();
    // reference to our posts db collection 
    const postRef = collection(db, "posts");

    const [user] = useAuthState(auth);

    const getPosts = async () => {
        const data = await getDocs(postRef); 
        setPostsList(
            data.docs.map((doc)=>({...doc.data(), id: doc.id })) as Post[]
        );
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        
        <div>
            <h1 style={{fontFamily:"Roboto", color:"white"}}>
                Welcome to postIt! 
            </h1>
            
            {!user && <p style={{color:"white"}}> Log in or Sign in to continue!</p>}
            

            {postsList?.map((post) => 
                <Post post={post}/>
            )}

        </div>
    )
}