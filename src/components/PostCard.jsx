import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            if (featuredImage) {
                setLoading(true);
                try {
                    const url = await appwriteService.getFilePreview(featuredImage);
                    setImageUrl(url);
                    setError(false);
                } catch (err) {
                    console.error("Error loading image:", err);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchImage();
    }, [featuredImage]);

    return (
        <Link to={`/post/${$id}`} className="block">
            <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-full justify-center mb-4">
                    {loading ? (
                        <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                    ) : error || !imageUrl ? (
                        <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400">No image available</span>
                        </div>
                    ) : (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-40 object-cover rounded-xl"
                            onError={() => setError(true)}
                        />
                    )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
