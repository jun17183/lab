// ✅ constants에서 import해서 타입만 정의
import { FORM_MODES } from 'features/posts/constants';

export type PostFormModeType = typeof FORM_MODES[keyof typeof FORM_MODES];

// 🎯 Post 관련 기본 타입들
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface PostFormData {
  title: string;
  content: string;
  tags?: string[];
}

// 🔄 API 관련 타입들
export interface CreatePostRequest {
  title: string;
  content: string;
  tags?: string[];
}

export interface UpdatePostRequest extends CreatePostRequest {
  id: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  lastDoc?: any; // Firebase QueryDocumentSnapshot for pagination
} 