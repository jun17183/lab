import { PostFormModeType } from '../types';
import { FORM_MODES, MESSAGES } from '../constants';

// ✅ 단일 소스 원칙 적용
interface PostFormPageProps {
  mode: PostFormModeType;
}

const PostFormPage = ({ mode }: PostFormPageProps) => {
  const isCreateMode = mode === FORM_MODES.CREATE;
  const isEditMode = mode === FORM_MODES.EDIT;
  
  const pageTitle = isCreateMode ? '새 게시글 작성' : '게시글 수정';
  const submitText = isCreateMode ? '작성하기' : '수정하기';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">
          {pageTitle}
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-gray-600 dark:text-gray-300">
            모드: {mode} ({isCreateMode ? '생성' : '수정'})
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            상수 사용 예시: {FORM_MODES.CREATE} / {FORM_MODES.EDIT}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostFormPage;