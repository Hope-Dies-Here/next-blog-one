"use client";

import { useState, useEffect } from "react";
import LoginModal from './modal/LoginModal';
import EditModal from './modal/EditModal';
import DeleteModal from './modal/DeleteModal';
import Link from "next/link";
import { useParams } from "next/navigation";

const DetailBlog = ({ blog: post }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState('user');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [blog, setBlog] = useState([]);
    const createdAt = new Date(blog.created_at)

    useEffect(() => {
        setBlog(post);
    }, [post]);
    const onClose = () => setIsOpen(false);

    const submit = (username, password) => {
        fetch('/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(result => result.json())
            .then(data => {
                console.log(data.message);
                setIsOpen(false);
                if (data.message === 'Login successful') {
                    setUserRole('admin');
                    localStorage.setItem('token', data.token);
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    let leftArrow = Number(useParams().id) - 1
    let rightArrow = Number(useParams().id) + 1

    if (blog.img == '') {
        blog.img = '/noimage1.svg'
    }
    const handleEditSubmit = (updatedData) => {
        setIsEditOpen(false);

        fetch(`/api/blog-posts/${blog.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(response => setBlog(response.blog))
            .catch(err => console.error(err));
    };

    const handleDelete = () => {
        // redirect to /blog if finished correctly
        setIsDeleteOpen(false);
        fetch(`/api/blog-posts/${blog.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: blog.id })
        })
            .then(res => res.json())
            .then(response =>  window.location.href = '/blog')
            .catch(err => console.error(err));
    };
    if (post.error) return ( 
    <div className='flex justify-center items-center h-screen bg-black'>
        <p className='text-red-500 text-lg'>NO Post Found!</p>
        <Link href={`${leftArrow}`}><img src="/arrowleft.svg" alt="" className="w-24 fixed left-[5%] top-1/2" /></Link>
        <Link href={`${rightArrow}`}><img src="/arrowright.svg" alt="" className="w-24 fixed right-[5%] top-1/2" /></Link>
    </div>
)
    return (
        <>
            {userRole && userRole === "admin" ? (
                <div className="p-4 border-b-2">
                    <button onClick={() => {
                        localStorage.removeItem('token');
                        setUserRole('user');
                        window.location.reload();
                    }} className="border rounded py-1 px-4">
                        Logout
                    </button>
                </div>
            ) : (
                <div className="p-4 border-b-2">
                    <button onClick={() => setIsOpen(true)} className="border rounded py-1 px-4">
                        Login
                    </button>
                </div>
            )}

             <div className="max-w-360 mx-auto py-20 flex justify-center items-center">
                <div className="w-[50rem]">
                    <div className="text-5xl font-bold pb-1 font-afcad flex justify-between items-center">
                        {blog.title}

                        {userRole === "admin" &&  (
                            <div className="flex gap-3 font-afcad text-sm">
                                <button
                                    onClick={() => setIsEditOpen(true)}
                                    className="px-3 py-1 rounded border border-amber-400 text-amber-400 bg-transparent hover:bg-amber-500 hover:text-gray-900 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => setIsDeleteOpen(true)}
                                    className="px-3 py-1 rounded border border-red-500 text-red-500 bg-transparent hover:bg-red-600 hover:text-white transition"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center gap-2 py-5">
                            <img src="/clock.png" alt="" width={25} />
                            <p>{createdAt.toLocaleString()}</p>
                        </div>
                        
                    </div>

                    <Link href={`${leftArrow}`}><img src="/arrowleft.svg" alt="" className="w-24 fixed left-[5%] top-1/2" /></Link>
                    <Link href={`${rightArrow}`}><img src="/arrowright.svg" alt="" className="w-24 fixed right-[5%] top-1/2" /></Link>
                    <img src="/gta6.png" alt="" className="rounded-md w-full h-150 object-cover" />

                    <div className="py-5 grid gap-5 text-lg">
                        <p>{blog.content}</p>
                    </div>
                </div>
            </div > 

            {/* Login Modal */}
            < LoginModal
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={submit} />

            {/* Edit Modal */}
            < EditModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSubmit={handleEditSubmit}
                initialData={blog}
            />

            {/* Delete Modal */}
            < DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                blogTitle={blog.title}
            />
        </>
    );
};

export default DetailBlog;
