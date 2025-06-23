# 📚 React TypeScript Blog - 코드 구조 설명

이 문서는 React + TypeScript + Firebase로 구축된 블로그 프로젝트의 코드 구조와 각 파일의 역할을 설명합니다.

## 🏗️ 프로젝트 구조

```
src/
├── App.tsx                     # 메인 앱 컴포넌트
├── index.tsx                   # 엔트리 포인트
├── index.css                   # 글로벌 스타일
├── components/                 # 공통 컴포넌트
│   └── Header.tsx             # 헤더 컴포넌트
├── features/                   # 기능별 모듈
│   └── posts/                 # 게시글 관련 기능
│       ├── api/               # API 레이어
│       ├── components/        # 게시글 관련 컴포넌트
│       ├── constants/         # 상수 정의
│       ├── hooks/             # 커스텀 훅
│       ├── pages/             # 페이지 컴포넌트
│       └── types/             # 타입 정의
├── lib/                       # 외부 라이브러리 설정
│   └── firebase.ts           # Firebase 설정
└── routes/                    # 라우팅 설정
    └── AppRouter.tsx         # 라우터 구성
```

## 📁 핵심 파일별 설명

### 🚀 엔트리 포인트

#### `src/index.tsx`
```typescript
// 애플리케이션의 진입점
- React 앱을 DOM에 렌더링
- BrowserRouter로 라우팅 기능 제공
- StrictMode로 개발 시 추가 검사 활성화
```

#### `src/App.tsx`
```typescript
// 메인 애플리케이션 컴포넌트
- 전체 레이아웃 구성 (Header + Main)
- 다크모드 지원을 위한 클래스 적용
- 글로벌 스타일링 적용
```

### 🌐 라우팅

#### `src/routes/AppRouter.tsx`
```typescript
// 애플리케이션 라우팅 설정
- React Router를 사용한 페이지 네비게이션
- 게시글 관련 모든 라우트 정의:
  • / → /posts (리다이렉트)
  • /posts → 게시글 목록
  • /posts/new → 새 글 작성
  • /posts/:id → 게시글 상세보기
  • /posts/:id/edit → 게시글 수정
```

### 🔥 Firebase 설정

#### `src/lib/firebase.ts`
```typescript
// Firebase 서비스 초기화 및 설정
- 환경변수에서 Firebase 설정 로드
- Firestore, Auth, Storage 서비스 초기화
- 다른 모듈에서 사용할 수 있도록 export
```

### 🎯 Posts 기능 모듈

#### `src/features/posts/types/index.ts`
```typescript
// 게시글 관련 타입 정의
- Post: 게시글 데이터 구조
- PostFormData: 폼 입력 데이터
- CreatePostRequest: 게시글 생성 요청
- UpdatePostRequest: 게시글 수정 요청
- PostsResponse: 목록 조회 응답
- PostFormModeType: 폼 모드 (생성/수정)
```

#### `src/features/posts/constants/index.ts`
```typescript
// 모든 상수와 텍스트 중앙 관리
- FORM_MODES: 폼 모드 상수
- POST_VALIDATION: 유효성 검사 기준
- PAGINATION: 페이지네이션 설정
- MESSAGES: 성공/오류 메시지
- FORM_TEXTS: 폼 관련 모든 텍스트
- LIST_TEXTS: 목록 페이지 텍스트
- API_ERRORS: API 오류 메시지
- TAG_TEXTS: 태그 관련 텍스트

💡 특징:
- 모든 하드코딩된 문자열 제거
- '~해 주세요' 형태로 띄어쓰기 통일
- 함수형 메시지로 동적 데이터 지원
```

#### `src/features/posts/api/firebase.ts`
```typescript
// Firebase Firestore와의 데이터 통신
- getPosts(): 게시글 목록 조회 (페이지네이션 지원)
- getPost(): 특정 게시글 상세 조회
- createPost(): 새 게시글 생성
- updatePost(): 게시글 수정
- deletePost(): 게시글 삭제
- searchPosts(): 게시글 검색 (클라이언트 사이드)

💡 특징:
- Firestore 문서를 Post 타입으로 변환
- 에러 처리 및 적절한 에러 메시지 제공
- Timestamp 자동 관리 (createdAt, updatedAt)
```

#### `src/features/posts/hooks/usePosts.ts`
```typescript
// 게시글 데이터 관리를 위한 커스텀 훅
- 상태 관리: posts, isLoading, error, hasMore
- fetchPosts(): 게시글 목록 불러오기
- searchPosts(): 검색 기능
- loadMore(): 무한 스크롤용 추가 로딩
- refresh(): 데이터 새로고침

💡 특징:
- React Query 대신 자체 상태 관리
- 무한 스크롤 지원
- 검색과 일반 목록 분리 관리
```

### 📄 페이지 컴포넌트

#### `src/features/posts/pages/PostListPage.tsx`
```typescript
// 게시글 목록 페이지
- usePosts 훅을 사용한 데이터 관리
- 검색 기능 (실시간 검색)
- 로딩/에러/빈 상태 처리
- 게시글 카드 목록 표시
- 태그 표시 및 미리보기 텍스트

💡 주요 기능:
- 반응형 레이아웃
- 다크모드 지원
- 검색어에 따른 실시간 필터링
- "새 글 작성" 버튼
```

#### `src/features/posts/pages/PostFormPage.tsx`
```typescript
// 게시글 작성/수정 페이지
- 생성/수정 모드 지원 (mode prop)
- 실시간 유효성 검사
- 글자 수 카운터
- Firebase에 실제 데이터 저장

💡 주요 기능:
- 제목/내용 필수 입력 검증
- 최소/최대 글자 수 제한
- 에러 메시지 표시
- 저장 중 로딩 상태
- 취소/저장 버튼
```

#### `src/features/posts/pages/PostDetailPage.tsx`
```typescript
// 게시글 상세보기 페이지 (미구현)
- 현재는 기본 컴포넌트만 존재
- 향후 개별 게시글 표시 예정
```

## 🎨 디자인 시스템

### 스타일링
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **다크모드**: `dark:` 접두사로 다크 테마 지원
- **반응형**: 모바일 퍼스트 반응형 디자인
- **그라데이션**: primary-brand 그라데이션 사용

### 컬러 시스템
```css
/* tailwind.config.js에서 정의 */
primary: 블루 계열 메인 컬러
brand: 보조 컬러
gray: 텍스트 및 배경용 그레이 스케일
```

## 🔧 개발 설정

### TypeScript 설정
```json
// tsconfig.json
- baseUrl: "src" (절대 경로 설정)
- paths: 주요 폴더별 별칭 설정
- strict: 엄격한 타입 검사
```

### 절대 경로 사용
```typescript
// 상대 경로 ❌
import { usePosts } from '../hooks/usePosts';

// 절대 경로 ✅
import { usePosts } from 'features/posts/hooks/usePosts';
```

## 🔒 Firebase 보안

### Firestore 규칙
```javascript
// firestore.rules
- 개발 모드: 모든 읽기/쓰기 허용
- posts 컬렉션: 읽기는 누구나, 쓰기는 개발 단계에서 모두 허용
- 향후 인증 기능 추가 시 규칙 강화 예정
```

## 📊 데이터 구조

### Firestore 컬렉션
```
posts/ {
  documentId: {
    title: string,
    content: string,
    author: string,
    createdAt: Timestamp,
    updatedAt: Timestamp,
    tags: string[]
  }
}
```

## 🚀 주요 기능

### ✅ 구현 완료
- 게시글 목록 조회
- 게시글 작성
- 검색 기능
- 반응형 디자인
- 다크모드 지원
- 중앙화된 텍스트 관리

### 🔄 향후 구현 예정
- 게시글 상세보기
- 게시글 수정/삭제
- 사용자 인증
- 이미지 업로드
- 댓글 시스템
- 태그 시스템 개선

## 💡 개발 모범 사례

### 1. Feature-based 구조
- 기능별로 폴더를 분리하여 모듈성 증대
- 각 기능은 독립적으로 개발/테스트 가능

### 2. 타입 안전성
- TypeScript를 활용한 컴파일 타임 에러 방지
- 모든 데이터 구조에 대한 타입 정의

### 3. 관심사 분리
- API 로직과 UI 로직 분리
- 커스텀 훅을 통한 상태 관리 추상화

### 4. 일관성 유지
- 중앙화된 상수 관리
- 통일된 코딩 스타일
- 절대 경로 사용으로 import 일관성

### 5. 에러 처리
- 각 단계별 적절한 에러 처리
- 사용자 친화적인 에러 메시지
- 로딩 상태 관리

## 🛠️ 개발 명령어

```bash
# 개발 서버 실행
npm start

# 빌드
npm run build

# 타입 검사
npm run type-check

# 린트 검사
npm run lint
```

---

## 📝 파일 수정 이력

- **절대 경로 적용**: 모든 import문을 절대 경로로 변경
- **텍스트 중앙화**: 하드코딩된 문자열을 constants로 이동
- **띄어쓰기 통일**: '~해 주세요' 형태로 통일
- **Firebase 연동**: 실제 Firestore와 데이터 통신 구현

이 문서는 프로젝트의 전체적인 이해를 돕기 위해 작성되었습니다. 새로운 기능 추가나 수정 시 이 문서도 함께 업데이트해 주세요. 