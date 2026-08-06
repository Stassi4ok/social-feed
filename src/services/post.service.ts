import { api } from '../api';
import { Post, PostsResponse } from '../types';

class PostService {
  async getAll(): Promise<PostsResponse> {
    const { data } = await api.get<PostsResponse>('/posts');
    return data;
  }

  async getById(id: number): Promise<Post> {
    const { data } = await api.get<Post>(`/posts/${id}`);
    return data;
  }

  async create(post: Omit<Post, 'id'>): Promise<Post> {
    const { data } = await api.post<Post>('/posts', post);
    return data;
  }

  async update(id: number, post: Partial<Omit<Post, 'id'>>): Promise<Post> {
    const { data } = await api.put<Post>(`/posts/${id}`, post);
    return data;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`/posts/${id}`);
  }
}

export default new PostService();