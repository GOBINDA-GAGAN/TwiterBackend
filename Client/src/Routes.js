// src/api/endpoints.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ENDPOINTS = {
  // ✅ Auth
  LOGIN: `${BASE_URL}/auth/sign-up`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  GET_PROFILE: `${BASE_URL}/profile/`,

  // ✅ Users
  GET_ALL_USERS: `${BASE_URL}/users`,
  GET_USER_BY_ID: (id) => `${BASE_URL}/users/${id}`,
  FOLLOW_USER: (id) => `${BASE_URL}/users/${id}/follow`,
  UNFOLLOW_USER: (id) => `${BASE_URL}/users/${id}/unfollow`,

  // ✅ Posts
  GET_ALL_POSTS: `${BASE_URL}/posts`,
  GET_POST_BY_ID: (id) => `${BASE_URL}/posts/${id}`,
  CREATE_POST: `${BASE_URL}/posts`,
  DELETE_POST: (id) => `${BASE_URL}/posts/${id}`,
  LIKE_POST: (id) => `${BASE_URL}/posts/${id}/like`,
  UNLIKE_POST: (id) => `${BASE_URL}/posts/${id}/unlike`,

  // ✅ Comments
  ADD_COMMENT: (postId) => `${BASE_URL}/posts/${postId}/comment`,
  DELETE_COMMENT: (postId, commentId) =>
    `${BASE_URL}/posts/${postId}/comment/${commentId}`,

  // ✅ Notifications
  GET_NOTIFICATIONS: `${BASE_URL}/notifications`,
};

export default ENDPOINTS;
