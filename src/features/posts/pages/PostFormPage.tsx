import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PostFormModeType, PostFormData } from 'features/posts/types';
import { FORM_MODES, MESSAGES, POST_VALIDATION, FORM_TEXTS } from 'features/posts/constants';
import { createPost } from 'features/posts/api/firebase';

// ✅ 단일 소스 원칙 적용
interface PostFormPageProps {
  mode: PostFormModeType;
}

const PostFormPage = ({ mode }: PostFormPageProps) => {
  const navigate = useNavigate();
  const isCreateMode = mode === FORM_MODES.CREATE;
  const isEditMode = mode === FORM_MODES.EDIT;
  
  const pageTitle = isCreateMode ? FORM_TEXTS.PAGE_TITLE_CREATE : FORM_TEXTS.PAGE_TITLE_EDIT;
  const submitText = isCreateMode ? FORM_TEXTS.BUTTON_CREATE : FORM_TEXTS.BUTTON_EDIT;
  
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
  });
  
  const [errors, setErrors] = useState<Partial<PostFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: Partial<PostFormData> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = FORM_TEXTS.TITLE_REQUIRED;
    } else if (formData.title.length > POST_VALIDATION.TITLE_MAX_LENGTH) {
      newErrors.title = FORM_TEXTS.TITLE_MAX_LENGTH(POST_VALIDATION.TITLE_MAX_LENGTH);
    }
    
    if (!formData.content.trim()) {
      newErrors.content = FORM_TEXTS.CONTENT_REQUIRED;
    } else if (formData.content.length < POST_VALIDATION.CONTENT_MIN_LENGTH) {
      newErrors.content = FORM_TEXTS.CONTENT_MIN_LENGTH(POST_VALIDATION.CONTENT_MIN_LENGTH);
    } else if (formData.content.length > POST_VALIDATION.CONTENT_MAX_LENGTH) {
      newErrors.content = FORM_TEXTS.CONTENT_MAX_LENGTH(POST_VALIDATION.CONTENT_MAX_LENGTH);
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (isCreateMode) {
        // Firebase에 새 게시글 생성
        const postId = await createPost({
          title: formData.title.trim(),
          content: formData.content.trim(),
          tags: formData.tags || []
        });
        console.log('게시글 생성 완료. ID:', postId);
        alert(MESSAGES.CREATE_SUCCESS);
      } else {
        // TODO: 수정 모드 구현
        console.log('수정 모드 - 폼 데이터:', formData);
        alert(MESSAGES.UPDATE_SUCCESS);
      }
      
      // 목록 페이지로 이동
      navigate('/posts');
    } catch (error) {
      console.error('제출 오류:', error);
      alert(isCreateMode ? MESSAGES.CREATE_ERROR : MESSAGES.UPDATE_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleInputChange = (field: keyof PostFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 에러가 있었다면 입력 시 제거
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {pageTitle}
              </h1>
              <Link
                to="/posts"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors no-underline"
              >
                {FORM_TEXTS.BACK_TO_LIST}
              </Link>
            </div>
          </div>
          
          {/* 폼 컨테이너 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* 제목 입력 */}
              <div>
                <label 
                  htmlFor="title" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {FORM_TEXTS.TITLE_LABEL}
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder={FORM_TEXTS.TITLE_PLACEHOLDER}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-gray-700 dark:text-white ${
                    errors.title 
                      ? 'border-red-300 dark:border-red-600' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  maxLength={POST_VALIDATION.TITLE_MAX_LENGTH}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.title}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {FORM_TEXTS.TITLE_COUNTER(formData.title.length, POST_VALIDATION.TITLE_MAX_LENGTH)}
                </p>
              </div>
              
              {/* 내용 입력 */}
              <div>
                <label 
                  htmlFor="content" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {FORM_TEXTS.CONTENT_LABEL}
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder={FORM_TEXTS.CONTENT_PLACEHOLDER}
                  rows={12}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-gray-700 dark:text-white resize-y ${
                    errors.content 
                      ? 'border-red-300 dark:border-red-600' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  maxLength={POST_VALIDATION.CONTENT_MAX_LENGTH}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.content}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {FORM_TEXTS.CONTENT_COUNTER(formData.content.length, POST_VALIDATION.CONTENT_MAX_LENGTH, POST_VALIDATION.CONTENT_MIN_LENGTH)}
                </p>
              </div>
              
              {/* 버튼 영역 */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/posts"
                  className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors no-underline"
                >
                  {FORM_TEXTS.BUTTON_CANCEL}
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-brand text-white text-sm font-medium rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? FORM_TEXTS.BUTTON_PROCESSING : submitText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFormPage;