import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from 'features/posts/hooks/usePosts';
import { Post } from 'features/posts/types';
import { LIST_TEXTS, TAG_TEXTS } from 'features/posts/constants';

const PostListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { posts, isLoading, error, searchPosts, refresh } = usePosts();
  
  // 검색어가 변경될 때 검색 실행
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      searchPosts(value);
    } else {
      refresh(); // 검색어가 없으면 전체 목록 다시 로드
    }
  };
  
  // 날짜 포맷팅
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // 내용 미리보기 (150자로 제한)
  const truncateContent = (content: string, maxLength = 150) => {
    return content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  };

  // 에러가 있는 경우 에러 표시
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 text-red-500">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
                             <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                 {LIST_TEXTS.ERROR_TITLE}
               </h3>
               <p className="text-gray-600 dark:text-gray-400 mb-6">
                 {error}
               </p>
               <button
                 onClick={refresh}
                 className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
               >
                 {LIST_TEXTS.BUTTON_RETRY}
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {LIST_TEXTS.PAGE_TITLE}
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {LIST_TEXTS.POST_COUNT(posts.length)}
                </p>
              </div>
              <Link
                to="/posts/new"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-brand text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 no-underline"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {LIST_TEXTS.BUTTON_NEW_POST}
              </Link>
            </div>
          </div>
          
          {/* 검색 영역 */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={LIST_TEXTS.SEARCH_PLACEHOLDER}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* 게시글 목록 */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">{LIST_TEXTS.LOADING}</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {searchTerm ? LIST_TEXTS.NO_SEARCH_RESULTS : LIST_TEXTS.NO_POSTS}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm ? LIST_TEXTS.SEARCH_EMPTY_MESSAGE : LIST_TEXTS.EMPTY_MESSAGE}
              </p>
              {!searchTerm && (
                <Link
                  to="/posts/new"
                  className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors no-underline"
                >
                  {LIST_TEXTS.BUTTON_NEW_POST_COMPACT}
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post: Post) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link
                          to={`/posts/${post.id}`}
                          className="group no-underline"
                        >
                          <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors mb-2">
                            {post.title}
                          </h2>
                        </Link>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                          {truncateContent(post.content)}
                        </p>
                        
                        {/* 태그 */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                              >
                                {TAG_TEXTS.PREFIX}{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* 메타 정보 */}
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium">{post.author}</span>
                          <span className="mx-2">•</span>
                          <time dateTime={post.createdAt.toISOString()}>
                            {formatDate(post.createdAt)}
                          </time>
                        </div>
                      </div>
                      
                      {/* 액션 버튼 */}
                      <div className="ml-4 flex-shrink-0">
                        <Link
                          to={`/posts/${post.id}`}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 transition-colors no-underline"
                        >
                          {LIST_TEXTS.BUTTON_VIEW_DETAIL}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostListPage;