import { PostsResponse } from '@/types/postsResponse';
import { Post } from '../types/post';
import { api } from './client';
import { ENDPOINTS } from './endpoints';

export const getPosts = async (limit?: number, skip?: number): Promise<PostsResponse> => {
    const {data} = await api.get<PostsResponse>(
        `${ENDPOINTS.POSTS}?limit=${limit}&skip=${skip}&select=title,reactions,userId,tags,views,body`
    );
    return data;
    
}

export const getPostById  = async (id: number): Promise<Post> => {
    const {data} = await api.get<Post>(`${ENDPOINTS.POSTS}/${id}`);
    return data;
}

export const createPost = async (post: Omit<Post, 'id'>): Promise<PostsResponse> => {
    const {data} = await api.post<PostsResponse>(ENDPOINTS.POSTS, post);
    return data;
}

export const updatePost = async (id: number, post: Partial<Omit<Post, 'id'>>): Promise<Post> => {
    const {data} = await api.put<Post>(`${ENDPOINTS.POSTS}/${id}`, post);
    return data;
}

export const deletePost = async (id: number): Promise<void> => {
    await api.delete(`${ENDPOINTS.POSTS}/${id}`);
}