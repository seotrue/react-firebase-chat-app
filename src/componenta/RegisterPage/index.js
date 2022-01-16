import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';

import md5 from 'md5';



function RegisterPage() {
    // 유효성체크 해주는 라이브러리
    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    const {errorFromSubmit, setErrorFromSubmit} =useState('')

    const onSubmit = async (data) => {
        // uuseForm에서 유효성체크 하구 넘어온 데이터를 파라미터로 받는다.
        try {
            let creatUser = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        }catch (e) {
            setErrorFromSubmit(error.message)
            setTimeout(()=>{
                setE
            })
        }
    }

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