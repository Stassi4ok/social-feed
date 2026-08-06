export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  likes: number;
  user:{
    id: number;
    username: string;
    fullName: string;
  }
}