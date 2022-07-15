import axios from "axios";
const axiosApi = axios.create();
axiosApi.interceptors.request.use(
    async config => {
        const apiKey = localStorage.getItem("token");
        config.headers = {
            ...config.headers.common,
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config;
    },
)

axiosApi.interceptors.response.use((response) => {
    return response
}, async function (error) {
        if (
            error.response.status === 401 || 
            error.response.status===403
        ) {
            localStorage.clear();
            window.location.href = window.location.origin + "/";

        }
        else{
            throw error;
        }
    
});
export {axiosApi}