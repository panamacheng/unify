import apisauce from 'apisauce';
import {store} from '../reducers';
import config from '../config';


const authMiddleWare = (api) => {
  const appState = store.getState().app;
  const token = appState.data.token_type + ' ' +appState.data.access_token;
  api.setHeader('Authorization', token)
  return api;
}

const create = (baseURL = config.API_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      // 50 second timeout...
    timeout: 50000,
  });
  
  // Auth
  const postLogin = payload => api.post('/auth/login', payload);

  // User stories.
  const getAllFeatures = () => authMiddleWare(api).get('/feature-requests');
  const createNewFeature = payload => authMiddleWare(api).post('/feature-requests', payload);
  const updateFeature = payload => {
    const id = payload.id;
    delete payload.id;
    return authMiddleWare(api).put(`/feature-requests/${id}`, payload);
  }
  const getUserStory = () => authMiddleWare(api).get('/user-stories');

  return {
    postLogin,
    getAllFeatures,
    createNewFeature,
    updateFeature,
    getUserStory,
  }
}

export default {
  create
}