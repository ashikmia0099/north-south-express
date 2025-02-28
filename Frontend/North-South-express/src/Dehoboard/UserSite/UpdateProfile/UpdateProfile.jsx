import React, { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProfile = () => {
    const { users, setLoading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        const form = e.target;
        const photourl = form.photourl.files[0];

        try {
            let photoURL = users.photoURL;

            
            if (photourl) {
                const formData = new FormData();
                formData.append("image", photourl);

                const imageResponse = await axiosPublic.post(image_hosting_api, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (imageResponse.data?.data?.url) {
                    photoURL = imageResponse.data.data.url;
                } else {
                    throw new Error("Failed to upload image");
                }
            }

            
            await updateProfile(users, { photoURL });

            
            const updatedData = { photo: photoURL };
            const result = await axiosPublic.put(`/user?email=${users.email}`, updatedData);

            if (result.data.message === "User updated successfully") {
                Swal.fire({
                    title: "Success!",
                    text: "Profile updated successfully!",
                    icon: "success",
                    confirmButtonText: "Cool",
                });
            } else {
                throw new Error("Database update failed");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire({
                title: "Error!",
                text: error.message || "An error occurred while updating your profile.",
                icon: "error",
                confirmButtonText: "Try Again",
            });
        } finally {
            setIsUpdating(false);
        }
    };



    return (
        <div className="card bg-base-100 w-full shadow-2xl">
            <div className="avatar mx-auto">
                <div className="w-32 rounded-full">
                    <img src={users?.photoURL || "default-image-url.jpg"} alt="User Avatar" />
                </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-white font-semibold">Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={users?.displayName}
                        disabled
                        placeholder="Name"
                        className="input input-bordered"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-white font-semibold">Email</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={users?.email}
                        disabled
                        placeholder="Email"
                        className="input input-bordered"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-white font-semibold">Photo URL</span>
                    </label>
                    <input
                        type="file"
                        name="photourl"
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                <div className="form-control w-full mt-6 mb-4">
                    <button
                        type="submit"
                        className={`btn bg-black border-none text-[#A4DBC1] text-xl font-semibold w-full hover:rounded-full hover:bg-[#6b9481] hover:text-black ${isUpdating ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Update Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
