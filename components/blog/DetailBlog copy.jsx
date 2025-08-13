"use client";
import { useState, useEffect } from "react";
import LoginModal from "./modal/LoginModal";
import EditModal from "./modal/EditModal";
import DeleteModal from "./modal/DeleteModal";
import Link from "next/link";

const DetailBlog = ({ blog }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (!blog) return <p>Blog not found</p>;

  const onClose = () => setIsOpen(false);

  const submit = (username, password) => {
    fetch("auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data.message);
        setIsOpen(false);
        if (data.message === "Login successful") {
          setUserRole("admin");
          localStorage.setItem("token", data.token);
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  let leftArrow;
  let rightArrow;
  if (blog.id != 1) {
    leftArrow = blog.id - 1;
  } else {
    leftArrow = blog.id;
  }
  if (blog.id != 4) {
    rightArrow = blog.id + 1;
  } else {
    rightArrow = blog.id;
  }

  if (blog.img == "") {
    blog.img = "/noimage1.svg";
  }
  const handleEditSubmit = (updatedData) => {
    setIsEditOpen(false);

    fetch("auth/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    setIsDeleteOpen(false);
    fetch("auth/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: blog.id }),
    })
      .then((res) => res.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <>
      {userRole && userRole === "admin" ? (
        <div className="p-4 border-b-2">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setUserRole("user");
              window.location.reload();
            }}
            className="border rounded py-1 px-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="p-4 border-b-2">
          <button
            onClick={() => setIsOpen(true)}
            className="border rounded py-1 px-4"
          >
            Login
          </button>
        </div>
      )}

      <div className="px-70 py-20 flex justify-center items-center">
        <div className="w-[50rem]">
          <div className="text-5xl font-bold pb-1 font-afcad flex justify-between items-center">
            {blog.title}

            {userRole === "admin" && (
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
              <p>{blog.time}</p>
            </div>
            <div className="flex items-center gap-2 py-5">
              <img src="eye.png" alt="" width={25} />
              <p>{blog.view}K Views</p>
            </div>
          </div>

          <Link href={`${leftArrow}`}>
            <img
              src="/arrowleft.svg"
              alt=""
              className="w-24 fixed left-[5%] top-1/2"
            />
          </Link>
          <img src={blog.img} alt="" className="rounded-md w-full" />
          <Link href={`${rightArrow}`}>
            <img
              src="/arrowright.svg"
              alt=""
              className="w-24 fixed right-[5%] top-1/2"
            />
          </Link>

          <div className="py-5 grid gap-5">
            <p>{blog.content}</p>
            <p>{blog.content}</p>
            <div>
              <p className="font-bold">Big ASS Title GTA VI</p>
              <p>{blog.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isOpen} onClose={onClose} onSubmit={submit} />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={blog}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        blogTitle={blog.title}
      />
    </>
  );
};

export default DetailBlog;
