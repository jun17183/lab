import { useState, useEffect } from 'react';
import { Post, PostsResponse } from 'features/posts/types';
import { getPosts, searchPosts } from 'features/posts/api/firebase';
import { API_ERRORS } from 'features/posts/constants';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);

  // 게시글 목록 불러오기
  const fetchPosts = async (reset = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const response: PostsResponse = await getPosts(10, reset ? undefined : lastDoc);
      
      if (reset) {
        setPosts(response.posts);
      } else {
        setPosts(prev => [...prev, ...response.posts]);
      }
      
      setLastDoc(response.lastDoc);
      setHasMore(response.posts.length === response.limit);
    } catch (err) {
      setError(err instanceof Error ? err.message : API_ERRORS.FETCH_POSTS_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색
  const searchPostsData = async (searchTerm: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!searchTerm.trim()) {
        // 검색어가 없으면 전체 목록 다시 로드
        await fetchPosts(true);
        return;
      }

      const searchResults = await searchPosts(searchTerm);
      setPosts(searchResults);
      setHasMore(false); // 검색 결과에는 더 불러올 데이터 없음
    } catch (err) {
      setError(err instanceof Error ? err.message : API_ERRORS.SEARCH_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  // 더 많은 게시글 불러오기 (무한 스크롤용)
  const loadMore = () => {
    if (!isLoading && hasMore) {
      fetchPosts(false);
    }
  };

  // 새로고침
  const refresh = () => {
    fetchPosts(true);
  };

  // 초기 로딩
  useEffect(() => {
    fetchPosts(true);
  }, []);

  return {
    posts,
    isLoading,
    error,
    hasMore,
    searchPosts: searchPostsData,
    loadMore,
    refresh
  };
}; 