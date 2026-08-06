import { Post } from '../types/post';
import { api } from './client';
import { ENDPOINTS } from './endpoints';

export const getPosts = async (): Promise<Post[]> => {
    const {data} = await api.get<Post[]>(ENDPOINTS.POSTS);
    return data;
}

export const getPostById  = async (id: number): Promise<Post> => {
    const {data} = await api.get<Post>(`${ENDPOINTS.POSTS}/${id}`);
    return data;
}

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
    const {data} = await api.post<Post>(ENDPOINTS.POSTS, post);
    return data;
}

export const updatePost = async (id: number, post: Partial<Omit<Post, 'id'>>): Promise<Post> => {
    const {data} = await api.put<Post>(`${ENDPOINTS.POSTS}/${id}`, post);
    return data;
}

export const deletePost = async (id: number): Promise<void> => {
    await api.delete(`${ENDPOINTS.POSTS}/${id}`);
}