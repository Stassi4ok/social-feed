import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPostById, getPosts, getUserById } from '../api';
import { POST_STORAGE_KEY } from '../constants';
import { CreatePostDto, Post, PostWithUser, PostsWithUserResponse, UpdatePostDto } from '../types';

class PostService {
  private async getLocalPosts(): Promise<PostWithUser[]> {
  const data = await AsyncStorage.getItem(POST_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

private async saveLocalPosts(posts: PostWithUser[]): Promise<void> {
  await AsyncStorage.setItem(POST_STORAGE_KEY, JSON.stringify(posts));
}


  async getAll(limit = 10, skip = 0): Promise<PostsWithUserResponse> {
  const data = await getPosts(limit, skip);

  const apiPosts = await Promise.all(
    data.posts.map(async post => ({
      ...post,
      user: await getUserById(post.userId),
    }))
  );

  const localPosts = await this.getLocalPosts();

  const result =
    skip === 0
      ? {
          ...data,
          posts: [...localPosts, ...apiPosts],
          total: data.total + localPosts.length,
        }
      : {
          ...data,
          posts: apiPosts,
        };

  return result;
}

  async getById(id: number): Promise<PostWithUser> {
   const localPosts = await this.getLocalPosts();

    const localPost = localPosts.find(post => post.id === id);

    if (localPost) {
      return localPost;
    }
    const post = await getPostById(id);
    const user = await getUserById(post.userId);

    return {
      ...post,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };

    
  }

  async create(data: CreatePostDto): Promise<PostWithUser> {
  const posts = await this.getLocalPosts();

  const user = await getUserById(data.userId);

  const newPost: PostWithUser = {
    id:Date.now() + Math.floor(Math.random() * 1000),
    title: data.title,
    body: data.body,
    userId: data.userId,
    tags: [],
    reactions: {
      likes: 0,
      dislikes: 0,
    },
    views: 0,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };

  posts.unshift(newPost);

  await this.saveLocalPosts(posts);

  return newPost;
}

  async update(id: number, data: UpdatePostDto): Promise<Post> {
    const posts = await this.getLocalPosts();

    const index = posts.findIndex(post => post.id === id);

    if (index === -1) {
      throw new Error("Post not found");
    }

    posts[index] = {
      ...posts[index],
      ...data,
    };

    await this.saveLocalPosts(posts);

    return posts[index];
  }

  

  async delete(id: number): Promise<void> {
    const posts = await this.getLocalPosts();

    const filteredPosts = posts.filter(post => post.id !== id);

    await this.saveLocalPosts(filteredPosts);
  }


}

export default new PostService();