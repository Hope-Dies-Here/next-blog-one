"use client";

const DeleteModal = ({ isOpen, onClose, onConfirm, blogTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Delete</h2>
                <p className="mb-6 text-black">
                    Are you sure you want to delete <strong>{blogTitle}</strong>?
                    This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
