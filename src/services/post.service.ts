import { getPostById, getPosts } from '../api/posts';
import { Post, PostsResponse } from '../types';
class PostService {
  async getAll(limit = 10, skip = 0): Promise<PostsResponse> {
    const  data  = await getPosts(limit, skip);
    return data;  
  }
  async getById(id: number): Promise<Post> {
    const  data  = await getPostById(id);
    return data;
  }
  /* 
  async create(post: Omit<Post, 'id'>): Promise<Post> {
    const { data } = await createPost(post);
    return data;
  }

  async update(id: number, post: Partial<Omit<Post, 'id'>>): Promise<Post> {
    const { data } = await updatePost(id, post);
    return data;
  }

  async delete(id: number): Promise<void> {
    await deletePost(id);
  }
  */
}

export default new PostService();