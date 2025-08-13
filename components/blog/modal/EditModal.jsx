"use client";

import { useEffect, useState } from "react";

const EditModal = ({ isOpen, onClose, onSubmit, initialData }) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [time, setTime] = useState(initialData?.time || "");
    const [view, setView] = useState(initialData?.view || "");
    const [img, setImg] = useState(initialData?.img || "");

    useEffect(() => {
        setTitle(initialData.title)
        setContent(initialData.content)
    }, [initialData])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            id: initialData.id,
            title,
            content,
            time: initialData.time,
            view: initialData.view,
            img: initialData.img
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
            <div className="border bg-black p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded px-3 py-2"
                        placeholder="Blog Title"
                    />
                    <input
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="border rounded px-3 py-2"
                        placeholder="Time"
                    />

                    <input
                        type="number"
                        value={view}
                        onChange={(e) => setView(e.target.value)}
                        className="border rounded px-3 py-2"
                        placeholder="Views"
                    />

                    <input
                        type="text"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        className="border rounded px-3 py-2"
                        placeholder="Image URL"
                    />

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border rounded px-3 py-2 h-32"
                        placeholder="Blog Content"
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-white"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
