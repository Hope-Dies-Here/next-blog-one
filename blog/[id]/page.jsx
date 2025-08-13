"use client"
import { useParams } from 'next/navigation';
import DetailBlog from '../../components/DetailBlog';
import { useEffect, useState } from 'react';
import "../../styles/blog-globals.css";

export default function BlogPage() {
    const { id } = useParams();
    // const id = Number(useParams().id);
    const [post, setPost] = useState(null);
    const params = useParams();
    useEffect(() => {

        fetch(`/api/blog-posts/${id}`)
            .then((res) => res.json())
            .then((data) => setPost(data));
    }, []);

    if (!post && params.id != "Create") return ( 
    <div className='flex justify-center items-center h-screen bg-black'>
        <p className='text-white'>Loading...</p>
    </div>
);


    return ( 
        <>
            { post && <DetailBlog blog={post} /> }
        </>
    )
}
