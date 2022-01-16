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

