import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageUrl, setImageUrl] = useState(""); // State for image URL
    const [loading, setLoading] = useState(true); // Loading state for image
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    useEffect(() => {
        if (post && post.featuredImage) {
            appwriteService
                .getFilePreview(post.featuredImage)
                .then((url) => {
                    setImageUrl(url);  
                    setLoading(false); 
                })
                .catch((error) => {
                    console.error("Error fetching image:", error);
                    setLoading(false); 
                });
        }
    }, [post]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {loading ? (
                        <p>Loading...</p> // Show loading text or spinner
                    ) : imageUrl ? (
                        <img 
                            src={imageUrl}
                            alt={post.title}
                            className="h-80 w-full object-cover rounded-xl"
                            onLoad={() => console.log('Image Loaded')}
                        />
                    ) : (
                        <p>Image not available</p> // If image URL is not available
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-4xl font-family['Dancing Script', cursive] text-indigo-600 font-bold">
                        {post.title}
                    </h1>
                </div>
                <div className="browser-css text-2xl font-family['Dancing Script', cursive] text-gray-400">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
