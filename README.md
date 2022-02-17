## firebase로 채팅앱 만들기

### firebase와 소켓의 차이
- 

### useRef
- 리액트 함수형 컴포넌트에서 ref라는 것을 이용홰서 DOM을 선택
- 사용법: useRef 를 사용해서 ref 을 생성
```
const myRef = useRef(null)

return (
    <div ref={myRef}>
    </div>
) 
```
- 사용 이유
리렌더링해주려면 useState를 사용해야하는데 리렌더링을 원하지 않을땐 var, const, let같은 변수 사용, 근데 변수를 함수 안에 선언하면 함수가 다시 불려질때마다 초기에 설정된 값으로 초기화됨, 그래서 함수 밖으로 빼면 싱글톤일땐 상관 없는데 여러군데서 사용될경우 변수공유로 인해서 원하는 결과가 안나올 수 있음, 그 때!! useRef를 사용하면 함수 안에 사용해도 리렌더링해도 초기에 설정한 값으로 초기화되는 것이 아닌 값이 유지됨!
### UseForm 라이브러리
- 유효성 체크 해주는 라이브러리
- register 사용으로 유효성 하구 싶은 인풋의 네이명을 기재, 옵션을 기재 하면 됨
```
// 에러 문구, submit시 핸들링, watch(추적) 가능, register(등록)
 const { register, watch, formState: { errors }, handleSubmit } = useForm();
```
```
 <input
                    name="email"
                    type="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
```
### 디자인 패턴
#### 싱글톤 패턴
- 싱글톤 패턴(singleton)은 전체 시스템에서 클래스의 인스턴스를 하나만 존재하도록 하는 패턴이다. 보통 객체를 만들 때 하나의 생성자로 여러 개의 서로 다른 객체를 만들 수 있다. 그러나 싱글톤에서는 단 하나의 객체만 존재하는 것이 보장된다.
### 사용 모듈
- react-hook-form: 손쉡게 유효성체크를 도와준다.


## 강의 챕터별 정리
#### firebase에서 이메일로 유저 생성시 생기는 문제점
- 서브밋을 하면 firebase에서 에러를 던져준다 -> firebase의 콘솔에서 authencatuin,에서 해당 인증 방법을을 enable 해줘야함
(firebase에서 이메일로 회원가입 할수 있게 허락해주기)
Aythentication의 Sign-i method에서 제공하는 방법중 할 방법 enable 해주기

#### firebase에 생성한 유저에 상세 정보 추가하기
업데이트 할방법은?
updateProfile: firebase에서 제공하는 메소드 업데이트 하구 싶은 데이터 업데이트 가능
-MD5란: 유니크한 값을 가지려고 사용하는 모듈

#### firebase에 생성한 유저 데이터 베이스에 저장
- 지금까지는 생성을 할때 인증 서비스 부분에서만 유저를 생성함 ->
어플리케이션에서 유저를 사용할려면 데이터베이스에서 유저 정보를 가져와야함 ->
그렇기때문에 데이터 베이스에서도 저장을 해줘야함 ->
저장을 하는곳은:!!
Realtime Database!

-FB에서 데이터베이스 사용하는 방법

#### 로그인페이지 만들기
- fireBase의 인증 서비스에서 
signInWithEmailAndPassword 메서드를 이용해서 로그인을 할것임 (메서드 안에 사용자가 입력한 이메일과 패스와드를  보내줌)

####  인증된 이후에 페이지 이동 & useHistory
- useHistory를 사용해두 에러가 생김 -> 원인은 
App 컴포넌트가 BrowerRouter보다 밑에(BrowerRouterrk App을 감싸구 있어야 App안에서 history를 사용가능)
App 컴포넌트 상위인 index.js에사
```<BrouserRouer>
    <App />
</BrouserRouer
```  
- 이런식을 감싸주자!  

#### 채팅페이지 UI
```javascript
// 컴포넌트 구조
<ChatPage>
    <sidePanel>
        <UserPanel/>
        <Favorited/>
        <ChatRooms/>
        <DireactMessages/>
    </sidePanel>

    <MainPanel>
        <MessageHeader/>
        <Message/>
        <MessageForm/>
    </MainPanel>
</ChatPage>
```

##### 로그아웃 & 리덕스 스토어 유저 정보 지워주기
- 로그인도 firebase햇으니 로그아웃도 firebase.auto()를 통해 접근후 제공해주는 siginOut() 메소드로 해야함

#### 프로필 이미지 수정
- firebase storage에 이미지 파일 넣어주고 이미지에 대한 정보(어디에 저장됫는지, 크기 등등)
firebase DB에 넣어준다 그정보는

proccess
1. 프로필 변경 클릭하면 이미지 업로드 패널이 나오게 한다.
 - 업로드 패널이 나올려면 input type file사용 -> 
 useRef을 이용해 디폴트 이미지 업로드 패널은 style변경이 안되니 
 display: none으로 안보이게 함
 style 먹인 div를 클릭하면 임의로input type file 클릭되게 
 input type file에 연결한 useRef로 만든 ref클릭 되도록  
 
 ```javascript
// 파이어베이스에게 업로드한 이미지 전달
    const handleUploadImage = () => {
        // 해주기 전에 firebase 스토리지 사용할수 있게 설정하기
        // firebase 콘솔가서 storage클릭 -> 시작하기 클릭 
    }

```

```javascript
// 파이어베이스에게 업로드한 이미지 전달

    const handleUploadImage =async (event) => {
        // 해주기 전에 firebase 스토리지 사용할수 있게 설정하기
        let file = event.target.file[0];
        console.log(file,'file');

        const metadata = {contentType: mime.lookup(file.name)}
        if (!file) return;

        try {
            let uploadTaskSnapshot = await firebase.storage()// firebase 스토리지에 접근
                .ref()
                .child(`user_image/${user.uid}`) // 이미지 파일이 어디에 저장이 되는지 정해주는거임
                .put(file, metadata) // 파일을 넣어줄땐 put 사용
            //
            // put
            //
            // 첫번째 인자로 파일의 데이터
            //
            // 두번째 인자로 메타 데이터(콘텐츠 데이터 타입)

            console.log(uploadTaskSnapshot,'uploadTaskSnapshot') // 업러드가 잘되면 response 가 옴
        } catch (e) {

        }
        // 1. 이미지 클릭후 FB 스토리지에 저장

            //mime이라는 라이브러리가 잇음 lookup 하면 자동으로 파일타입이 무엇인지 리턴해줌
        // npm i mime-types --save

    }
````

- 순서
1. irebase storage에 이미지 파일 넣어주고 이미지에 대한 정보(어디에 저장됫는지, 크기 등등)
   firebase DB에 넣어준다 그정보는
   그리고 디스패치의 img url도 변경해줘야만 화면단에서 이미지 변경두 이루워진다.
   

#### 채팅 룸 리스트 URL