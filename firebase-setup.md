# 🔥 Firebase 설정 가이드

## 1️⃣ Firebase 프로젝트 생성

### Firebase Console에서 프로젝트 생성
1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: `react-ts-blog`)
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

## 2️⃣ Firebase 앱 등록

### Web 앱 추가
1. 프로젝트 개요 페이지에서 "웹" 아이콘 클릭
2. 앱 닉네임 입력 (예: `React TS Blog`)
3. Firebase Hosting 설정 (선택사항)
4. "앱 등록" 클릭

### 설정 정보 복사
앱 등록 후 나타나는 설정 정보를 복사하세요:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

## 3️⃣ 환경변수 설정

### .env 파일 생성
프로젝트 루트에 `.env` 파일을 생성하고 아래 내용을 입력하세요:

```bash
# Firebase 설정
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id

# 개발 환경 설정
REACT_APP_ENV=development
```

⚠️ **중요**: 실제 값으로 교체해주세요!

## 4️⃣ Firestore 데이터베이스 설정

### 데이터베이스 생성
1. Firebase Console에서 "Firestore Database" 메뉴 클릭
2. "데이터베이스 만들기" 클릭
3. 보안 규칙 모드 선택:
   - **테스트 모드**: 개발 초기 (30일 후 만료)
   - **프로덕션 모드**: 보안 규칙 직접 설정
4. 데이터베이스 위치 선택 (예: `asia-northeast3 (Seoul)`)

### 보안 규칙 설정
1. "규칙" 탭으로 이동
2. 프로젝트의 `firestore.rules` 파일 내용을 복사
3. Firebase Console에 붙여넣기
4. "게시" 클릭

## 5️⃣ Firebase CLI 설정 (선택사항)

### CLI 설치 및 로그인
```bash
npm install -g firebase-tools
firebase login
```

### 프로젝트 초기화
```bash
firebase init firestore
```

## 6️⃣ 테스트 연결

### 개발 서버 실행
```bash
npm start
```

### 브라우저 콘솔 확인
1. 개발자 도구 열기 (F12)
2. Console 탭에서 Firebase 관련 오류 확인
3. 정상 연결 시 오류 메시지 없음

## 7️⃣ 첫 번째 데이터 추가

### 샘플 게시글 작성
1. `/posts/new` 페이지로 이동
2. 제목과 내용 입력
3. "작성하기" 버튼 클릭
4. Firestore Console에서 데이터 확인

## 🛠️ 문제 해결

### 일반적인 오류들

**1. Firebase 설정 오류**
```
Firebase: Error (auth/invalid-api-key)
```
→ `.env` 파일의 API 키 확인

**2. 권한 오류**
```
FirebaseError: Missing or insufficient permissions
```
→ Firestore 보안 규칙 확인

**3. 프로젝트 ID 오류**
```
Firebase: Error (app/invalid-credential)
```
→ 프로젝트 ID가 올바른지 확인

### 도움이 되는 링크
- [Firebase 문서](https://firebase.google.com/docs/web/setup)
- [Firestore 보안 규칙](https://firebase.google.com/docs/firestore/security/rules-structure)
- [React와 Firebase 연동](https://firebase.google.com/docs/web/setup#add-sdks-initialize)

## ✅ 설정 완료 체크리스트

- [ ] Firebase 프로젝트 생성
- [ ] Web 앱 등록
- [ ] 환경변수 설정 (`.env` 파일)
- [ ] Firestore 데이터베이스 생성
- [ ] 보안 규칙 설정
- [ ] 개발 서버에서 연결 테스트
- [ ] 첫 번째 게시글 작성/조회 테스트

모든 단계를 완료하면 Firebase와 React 앱이 성공적으로 연결됩니다! 🎉 