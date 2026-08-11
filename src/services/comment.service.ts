import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCommentsByPost, getUserById } from "../api";
import { COMMENT_STORAGE_KEY } from "../constants";
import { CommentWithUser, CreateCommentDto } from "../types";

class CommentService {
  private async getLocalComments(): Promise<CommentWithUser[]> {
    const data = await AsyncStorage.getItem(COMMENT_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  private async saveLocalComments(comments: CommentWithUser[]): Promise<void> {
    await AsyncStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(comments));
  }

  async getCommentsByPostId(postId: number): Promise<CommentWithUser[]> {
    const localComments = await this.getLocalComments();
    const postComments = localComments.filter(
      (comment) => comment.postId === postId,
    );

    const data = await getCommentsByPost(postId);

    return [...postComments, ...data.comments];
  }

  //add comment to local storage
  async add(comment: CreateCommentDto): Promise<CommentWithUser> {
    const localComments = await this.getLocalComments();
    const user = await getUserById(comment.userId);

    const newComment: CommentWithUser = {
      id: Number(localComments.length + 1),
      postId: comment.postId,
      body: comment.body,
      likes: 0,
      user: {
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
      },
    };

    localComments.push(newComment);

    await this.saveLocalComments(localComments);
    return newComment;
  }

  async update(
    comment: CreateCommentDto,
    id: number,
  ): Promise<CommentWithUser> {
    const comments = await this.getLocalComments();
    const index = comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      throw new Error("Comment not found");
    }

    comments[index] = {
      ...comments[index],
      body: comment.body,
    };

    await this.saveLocalComments(comments);

    return comments[index];
  }

  async delete(commentId: number): Promise<void> {
    const comments = await this.getLocalComments();

    const filteredComments = comments.filter(
      (comment) => comment.id !== commentId,
    );

    await this.saveLocalComments(filteredComments);
  }
}

export default new CommentService();
