import { getPostById, getPosts, getUserById } from '../api';
import { PostWithUser, PostsWithUserResponse } from '../types';

class PostService {
  async getAll(
    limit = 10,
    skip = 0
  ): Promise<PostsWithUserResponse> {
    const data = await getPosts(limit, skip);

    const posts = await Promise.all(
      data.posts.map(async (post) => ({
        ...post,
        user: await getUserById(post.userId),
      }))
    );

    return {
      ...data,
      posts,
    };
  }

  async getById(id: number): Promise<PostWithUser> {
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
}

export default new PostService();