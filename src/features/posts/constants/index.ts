// 🎯 Form 관련 상수
export const FORM_MODES = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
} as const;

// 📝 Validation 관련 상수
export const POST_VALIDATION = {
  TITLE_MIN_LENGTH: 1,
  TITLE_MAX_LENGTH: 100,
  CONTENT_MIN_LENGTH: 10,
  CONTENT_MAX_LENGTH: 10000,
  MAX_TAGS: 5,
} as const;

// 📄 Pagination 관련 상수
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// 🔔 성공/오류 메시지
export const MESSAGES = {
  CREATE_SUCCESS: '게시글이 성공적으로 작성되었습니다.',
  UPDATE_SUCCESS: '게시글이 성공적으로 수정되었습니다.',
  DELETE_SUCCESS: '게시글이 성공적으로 삭제되었습니다.',
  CREATE_ERROR: '게시글 작성 중 오류가 발생했습니다.',
  UPDATE_ERROR: '게시글 수정 중 오류가 발생했습니다.',
  DELETE_ERROR: '게시글 삭제 중 오류가 발생했습니다.',
} as const;

// 📝 폼 관련 텍스트
export const FORM_TEXTS = {
  // 페이지 제목
  PAGE_TITLE_CREATE: '새 게시글 작성',
  PAGE_TITLE_EDIT: '게시글 수정',
  
  // 버튼 텍스트
  BUTTON_CREATE: '작성하기',
  BUTTON_EDIT: '수정하기',
  BUTTON_CANCEL: '취소',
  BUTTON_PROCESSING: '처리 중...',
  BACK_TO_LIST: '← 목록으로 돌아가기',
  
  // 라벨 및 플레이스홀더
  TITLE_LABEL: '제목 *',
  CONTENT_LABEL: '내용 *',
  TITLE_PLACEHOLDER: '게시글 제목을 입력해 주세요',
  CONTENT_PLACEHOLDER: '게시글 내용을 입력해 주세요',
  
  // 검증 메시지
  TITLE_REQUIRED: '제목을 입력해 주세요.',
  TITLE_MAX_LENGTH: (max: number) => `제목은 ${max}자 이내로 입력해 주세요.`,
  CONTENT_REQUIRED: '내용을 입력해 주세요.',
  CONTENT_MIN_LENGTH: (min: number) => `내용은 최소 ${min}자 이상 입력해 주세요.`,
  CONTENT_MAX_LENGTH: (max: number) => `내용은 ${max}자 이내로 입력해 주세요.`,
  
  // 글자 수 카운터
  TITLE_COUNTER: (current: number, max: number) => `${current}/${max}자`,
  CONTENT_COUNTER: (current: number, max: number, min: number) => `${current}/${max}자 (최소 ${min}자)`,
} as const;

// 📋 목록 페이지 관련 텍스트
export const LIST_TEXTS = {
  // 페이지 헤더
  PAGE_TITLE: '게시판',
  POST_COUNT: (count: number) => `총 ${count}개의 게시글`,
  
  // 버튼
  BUTTON_NEW_POST: '새 글 작성',
  BUTTON_NEW_POST_COMPACT: '새 글 작성하기',
  BUTTON_RETRY: '다시 시도',
  BUTTON_VIEW_DETAIL: '자세히 보기',
  
  // 검색
  SEARCH_PLACEHOLDER: '제목, 내용, 태그로 검색...',
  
  // 상태 메시지
  LOADING: '로딩 중...',
  NO_POSTS: '게시글이 없습니다',
  NO_SEARCH_RESULTS: '검색 결과가 없습니다',
  EMPTY_MESSAGE: '첫 번째 게시글을 작성해 보세요',
  SEARCH_EMPTY_MESSAGE: '다른 키워드로 검색해 보세요',
  ERROR_TITLE: '데이터를 불러올 수 없습니다',
} as const;

// 🔍 API 관련 에러 메시지
export const API_ERRORS = {
  FETCH_POSTS_FAILED: '게시글을 불러오는데 실패했습니다.',
  POST_NOT_FOUND: '게시글을 찾을 수 없습니다.',
  POST_FETCH_FAILED: '게시글 조회에 실패했습니다.',
  POST_CREATE_FAILED: '게시글 작성에 실패했습니다.',
  POST_UPDATE_FAILED: '게시글 수정에 실패했습니다.',
  POST_DELETE_FAILED: '게시글 삭제에 실패했습니다.',
  SEARCH_FAILED: '검색에 실패했습니다.',
} as const;

// 🏷️ 태그 관련 텍스트
export const TAG_TEXTS = {
  PREFIX: '#',
} as const;