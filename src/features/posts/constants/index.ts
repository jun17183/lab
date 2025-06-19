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

// 🔔 Messages
export const MESSAGES = {
  CREATE_SUCCESS: '게시글이 성공적으로 작성되었습니다.',
  UPDATE_SUCCESS: '게시글이 성공적으로 수정되었습니다.',
  DELETE_SUCCESS: '게시글이 성공적으로 삭제되었습니다.',
  CREATE_ERROR: '게시글 작성 중 오류가 발생했습니다.',
  UPDATE_ERROR: '게시글 수정 중 오류가 발생했습니다.',
  DELETE_ERROR: '게시글 삭제 중 오류가 발생했습니다.',
} as const;