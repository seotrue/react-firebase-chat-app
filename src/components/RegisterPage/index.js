import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';

import md5 from 'md5';



function RegisterPage() {
    // 유효성체크 해주는 라이브러리 => 사용하므루 handleSubmit함수를따로 안만들구 라이브러리꺼 쓰고 그안에 onSubmit이라는 함수는 내가 만든다
    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    const {errorFromSubmit, setErrorFromSubmit} =useState('')
    const [loading, setLoading] = useState(false)
    const onSubmit = async (data) => {
        console.log(data) // 데이터 안에 이미엘정도, 패스워드 정보가 들어있음 => useForm을 쓰니깐 state에 안담기구
        //베 아디랑pw 이용해서 유저를 생성
        // uuseForm에서 유효성체크 하구 넘어온 데이터를 파라미터로 받는다.
        try {
            setLoading(true)
            // 비동기로 파이어베이스에게 이렇게 데이터를 넘기면 파베에서 만듬 -> 결과값을 createUser에 담김
            let creatUser = await firebase.auth() // auth 서비스에 접근
                .createUserWithEmailAndPassword(data.email, data.password);

            //updateProfile FB 메소드 업데이트 하는
            await creatUser.user.updateProfile({
                displayName: data.name,
                photoURL:`http://gravatar.com/avatar/${md5(creatUser.user.email)}` // 유니크한 값을 만들어줌
            })

            // Firebase 데이터베이스에 저장해주기
            await firebase.database() // firebase의 데이터 베이스에 접급
                .ref('users')// 저희가 접근하고자하는 데이터베이스의 위치(데이블 이름)
                .child(creatUser.user.uid)// row의 아이디(유저의 아디) creatUser.user.uid => 유저의 유니크한 아이디 를 넣어줌
                .set({ // 유저의 유니크한 아이디 아래에 해당 정보를 넣어줌
                    name: creatUser.user.displayName,
                    image: creatUser.user.photoURL
                })
            setLoading(false)
        }catch (e) {
            setErrorFromSubmit(error.message)
            setTimeout(()=>{
                setErrorFromSubmit('')
            },5000)
        }
    };



    return (

        <div className="auth-wrapper">
            <div style={{ textAlign: 'center' }}>
                <h3>Register</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />

                {errors.email && <p>This email field is required</p>}

                <label>Name</label>
                <input
                    name="name"
                    {...register("name", { required: true, maxLength: 10 })}

                />

                {errors.name && errors.name.type === "required" && <p>This name field is required</p>}
                {errors.name && errors.name.type === "maxLength" && <p>Your input exceed maximum length</p>}

                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    {...register("password", { required: true, minLength: 6 })}
                />

                {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
                {errors.password && errors.password.type === "minLength" && <p>Password must have at least 6 characters</p>}



                <label>Password Confirm</label>
                <inpu

                    name="password_confirm"

                    type="password"

                    {...register("password_confirm", {

                        required: true,

                        validate: (value) =>

                            value === password.current

                    })}

                />

                {errors.password_confirm && errors.password_confirm.type === "required" && <p>This password confirm field is required</p>}

                {errors.password_confirm && errors.password_confirm.type === "validate" && <p>The passwords do not match</p>}



                {errorFromSubmit &&

                 <p>{errorFromSubmit}</p>

                }



                <input type="submit" disabled={loading} />

                <Link style={{ color: 'gray', textDecoration: 'none' }} to="login">이미 아이디가 있다면... </Link>

            </form>



        </div>

    )

}



export default RegisterPage