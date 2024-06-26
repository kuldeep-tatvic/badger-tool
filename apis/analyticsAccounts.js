// utils/api.js

import axios from 'axios';

const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAnalyticsAccount = async (accessToken, pageSize, pageToken) => {

    try {
        const response = await axios.get(
            "https://analyticsadmin.googleapis.com/v1beta/accountSummaries",
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
                params: {
                    pageSize,
                    pageToken
                }
            });
        return response.data;
    } catch (error) {
        // Handle error response correctly
        console.error('API call error:', error);
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(error.response.data.message || 'Server Error');
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('Network Error');
        } else {
            // Something else happened while setting up the request
            throw new Error(error.message);
        }
    }
};
