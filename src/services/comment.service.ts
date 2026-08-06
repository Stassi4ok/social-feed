import { getCommentsByPost } from '../api';
import { Comment } from '../types';
class CommentService {
    async getCommentsByPost(postId: number): Promise<Comment[]> {
      const data = await getCommentsByPost(postId);
    return data.comments;
  }
}

export default new CommentService();