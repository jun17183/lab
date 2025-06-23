import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from 'lib/firebase';
import { Post, CreatePostRequest, UpdatePostRequest, PostsResponse } from 'features/posts/types';
import { API_ERRORS } from 'features/posts/constants';

// 컬렉션 이름
const POSTS_COLLECTION = 'posts';

// Firestore 문서를 Post 타입으로 변환
const convertFirestorePost = (doc: QueryDocumentSnapshot<DocumentData>): Post => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    content: data.content,
    author: data.author,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
    tags: data.tags || []
  };
};

// 📋 게시글 목록 조회
export const getPosts = async (
  pageSize: number = 10,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<PostsResponse> => {
  try {
    let q = query(
      collection(db, POSTS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    // 페이지네이션을 위한 시작점 설정
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(convertFirestorePost);

    return {
      posts,
      total: querySnapshot.size,
      page: lastDoc ? 2 : 1, // 간단한 페이지 계산
      limit: pageSize,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
    };
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    throw new Error(API_ERRORS.FETCH_POSTS_FAILED);
  }
};

// 📄 게시글 상세 조회
export const getPost = async (id: string): Promise<Post> => {
  try {
    const docRef = doc(db, POSTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error(API_ERRORS.POST_NOT_FOUND);
    }

    return convertFirestorePost(docSnap as QueryDocumentSnapshot<DocumentData>);
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    throw error;
  }
};

// ✏️ 게시글 생성
export const createPost = async (postData: CreatePostRequest): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
      ...postData,
      author: 'Anonymous', // TODO: 사용자 인증 후 실제 사용자 정보로 교체
      createdAt: now,
      updatedAt: now,
      tags: postData.tags || []
    });

    return docRef.id;
  } catch (error) {
    console.error('게시글 생성 실패:', error);
    throw new Error(API_ERRORS.POST_CREATE_FAILED);
  }
};

// 📝 게시글 수정
export const updatePost = async (postData: UpdatePostRequest): Promise<void> => {
  try {
    const docRef = doc(db, POSTS_COLLECTION, postData.id);
    await updateDoc(docRef, {
      title: postData.title,
      content: postData.content,
      tags: postData.tags || [],
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    throw new Error(API_ERRORS.POST_UPDATE_FAILED);
  }
};

// 🗑️ 게시글 삭제
export const deletePost = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, POSTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    throw new Error(API_ERRORS.POST_DELETE_FAILED);
  }
};

// 🔍 게시글 검색
export const searchPosts = async (searchTerm: string): Promise<Post[]> => {
  try {
    // Firestore는 전체 텍스트 검색을 지원하지 않으므로
    // 제목에서만 검색하거나 클라이언트 측에서 필터링해야 함
    const q = query(
      collection(db, POSTS_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(convertFirestorePost);

    // 클라이언트 측 검색 (제목, 내용, 태그)
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  } catch (error) {
    console.error('게시글 검색 실패:', error);
    throw new Error(API_ERRORS.SEARCH_FAILED);
  }
}; 