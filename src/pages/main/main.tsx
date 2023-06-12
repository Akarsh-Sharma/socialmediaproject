import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

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

    const getPosts = async () => {
        const data = await getDocs(postRef); 
        setPostsList(
            data.docs.map((doc)=>({...doc.data(), id: doc.id })) as Post[]
        );
    };

    useEffect(() => {
        getPosts();
    }, []);

    return <div>
        {postsList?.map((post) => 
            <Post post={post}/>
        )}
    </div>
}