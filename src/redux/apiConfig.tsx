import axios from 'axios';
import {BASE_URL, REFRESH_TOKEN} from './API';
import {token_storage} from './storage';
import {Alert} from 'react-native';
import {resetAndNavigate} from '../utils/NavigationUtil';

export const appAxios = axios.create({
  baseURL: BASE_URL, //Sets the base URL for all API requests.
});
// omterceptors - works a middleware 
//Before sending a request, it attaches the access token (if available) to the Authorization header.
appAxios.interceptors.request.use(async config => {
  const access_token = token_storage.getString('access_token');
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

appAxios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refresh_tokens();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log('Error Refreshing Token');
      }
    }
    
    //If the server responds with 401 Unauthorized, it attempts to refresh the token: Calls refresh_tokens(). If successful, it retries the failed request with the new token. If it fails, the user is logged out and redirected to LoginScreen.
    // For non-401 errors, it shows a native alert with the error message:
    if (error.response && error.response.status != 401) {
      const errorMessage = error.response.data.msg || 'something went wrong';
      Alert.alert(errorMessage);
    }
    return Promise.reject(error);
  },
);

export const refresh_tokens = async () => {
  try {
    const refresh_token = token_storage.getString('refresh_token');
    const response = await axios.post(REFRESH_TOKEN, {
      refresh_token,
    });
    const new_access_token = response.data.access_token;
    const new_refresh_token = response.data.refresh_token;
    token_storage.set('access_token', new_access_token);
    token_storage.set('refresh_token', new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.log('REFRESH TOKEN ERROR');
    token_storage.clearAll();
    resetAndNavigate('LoginScreen');
  }
};


//This code configures a custom axios instance (appAxios) to:

// Automatically attach access tokens to requests.
// Handle expired tokens by refreshing them.
// Redirect users to the login screen if token refresh fails.
// Show alerts when other API errors occur.