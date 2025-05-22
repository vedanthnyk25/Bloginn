import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageError, setImageError] = useState(false);

    // Fetch existing image when in edit mode
    useEffect(() => {
        const fetchExistingImage = async () => {
            if (post?.featuredImage) {
                try {
                    const url = await appwriteService.getFilePreview(post.featuredImage);
                    setImageUrl(url);
                    setImageError(false);
                } catch (error) {
                    console.error("Error loading existing image:", error);
                    setImageError(true);
                }
            }
        };

        fetchExistingImage();
    }, [post?.featuredImage]);

    const submit = async (data) => {
        setLoading(true);

        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // Handle image preview on file input change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageUrl(URL.createObjectURL(file));
            setImageError(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title"
                    placeholder="Title"
                    className="mb-4 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                    {...register("title", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label={<span className="text-indigo-600 dark:text-indigo-400">Featured Image</span>}
                    type="file"
                    className="mb-4 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                    onChange={handleImageChange}
                />
                {loading ? (
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4"></div>
                ) : imageError ? (
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-gray-500 dark:text-gray-400">Error loading image</span>
                    </div>
                ) : imageUrl ? (
                    <div className="w-full mb-4">
                        <img
                            src={imageUrl}
                            alt="Featured"
                            className="w-full h-48 object-cover rounded-lg shadow-md"
                            onError={() => setImageError(true)}
                        />
                    </div>
                ) : (
                    <div className="w-full h-48 mb-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800">
                        <svg className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center px-4">
                            {post ? "Click to change image" : "Click to upload image"}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            PNG, JPG, GIF up to 10MB
                        </p>
                    </div>
                )}
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-600" : "bg-indigo-600"}
                    className="w-full mt-4 hover:bg-opacity-90 transition-all duration-300"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
