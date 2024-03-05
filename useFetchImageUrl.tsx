import { useState, useEffect } from 'react';
import apiService from '../apis/apiService';

/**
 * Custom hook for fetching an image URL.
 * @param {string} url The URL to fetch the image from.
 * @return {string} The fetched image URL or an empty string if not yet fetched or in case of an error.
 */
const useFetchImageUrl = (url : string) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        // Define the function inside the effect to avoid defining it on each render
        const fetchImage = async () => {
            try {
                const response = await apiService.get(url);
                setImageUrl(response.data); // Assuming response.data contains the image URL
            } catch (error) {
                console.error('Failed to fetch image:', error);
                setImageUrl(''); // Optionally, set to a fallback image URL here
            }
        };

        if (url) {
            fetchImage();
        }
    }, [url]); // Depend on the `url` so the effect runs again if the URL changes

    return imageUrl;
};

export default useFetchImageUrl;
