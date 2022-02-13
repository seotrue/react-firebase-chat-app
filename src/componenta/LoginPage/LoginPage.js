import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';

function LoginPage() {
    // 유효성체크 해주는 라이브러리 => 사용하므루 handleSubmit함수를따로 안만들구 라이브러리꺼 쓰고 그안에 onSubmit이라는 함수는 내가 만든다
    const { register, formState: { errors }, handleSubmit } = useForm();
    const {errorFromSubmit, setErrorFromSubmit} =useState('')
    const [loading, setLoading] = useState(false)
    const onSubmit = async (data) => {
        console.log(data) // 데이터 안에 이미엘정도, 패스워드 정보가 들어있음 => useForm을 쓰니깐 state에 안담기구

        try {
            setLoading(true)

            await firebase.auth()
                .signInWithEmailAndPassword(data.email,data.password);
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
                <h3>Login</h3>
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


                <input type="submit" disabled={loading} />

                <Link style={{ color: 'gray', textDecoration: 'none' }} to="Register">아직 아이디가 없다면</Link>

            </form>



        </div>

    )

}



export default LoginPage