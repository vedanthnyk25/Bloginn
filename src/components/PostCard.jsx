import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImagePreview = async () => {
            if (featuredImage) {
                const previewUrl = await appwriteService.getFilePreview(featuredImage);
                setImageUrl(previewUrl);
            }
        };

        fetchImagePreview();
    }, [featuredImage]);

    if (!imageUrl) {
        // Show a loading spinner or fallback image while the image is being fetched
        return (
            <Link to={`/post/${$id}`}>
                <div className="w-full bg-gray-100 rounded-xl p-4">
                    <div className="w-full justify-center mb-4">
                        <img
                            src="path_to_fallback_image_or_loading_spinner.gif"
                            alt="Loading..."
                            className="w-full h-40 object-cover rounded-xl"
                        />
                    </div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                </div>
            </Link>
        );
    }

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img
                        src={imageUrl} // Use the fetched image URL here
                        alt={title}
                        className="w-full h-40 object-cover rounded-xl"
                    />
                </div>
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
