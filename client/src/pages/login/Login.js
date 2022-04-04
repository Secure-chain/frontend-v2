//rafce
import React from 'react'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios'
import './login.scss';
const Login = (props) => {

    let history = useHistory();
    document.title = 'login';
    const [userReg, setUserReg] = useState({
        email: '',
        password: ''
    });

    let flag = 1;
    useEffect(() => {
        console.log('useEffect of login')
    }, [])
    const [errors, setErrors] = useState({});
    // const [records, setRecords] = useState([]);

    const handleInput = (e) => {
        const nameOfInput = e.target.name;
        const value = e.target.value;
        // console.log(e.target.value)
        setUserReg({ ...userReg, [nameOfInput]:value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        const newUser = {
            ...userReg,
            id: new Date().getTime().toString(),
        };

        if (flag === 1) {
            Axios.post('http://127.0.0.1:8000/login/', {
                email: userReg.email,
                password: userReg.password
            }).then((response) => {
                localStorage.setItem("token", response.data.Token)
                localStorage.setItem("username", response.data.user_name);
                if (response.data.message) {
                    alert(response.data.message);
                }
                else {
                    console.log(response.data.Token);
                    history.push('/dashboard/ownedsupplychains');
                }
                
            });
        }
        e.target.reset();
    };

    return (
        <div>
            <div className="login_background_image">
                <div className="container-1">
                    <form onSubmit={submitForm}>
                        <div className="Title">
                            <h1>Login</h1>
                        </div>
                        <div className="Login">
                            <p>Don't have an account?<a href="/register"> Register Now!</a></p>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="email">Email</label><br/>
                            <input onChange={handleInput} className="formInput" type="text" name="email" id="email" required></input>
                        </div>
                        <div className="form-group">
                            <label className="formLabel" htmlFor="password">Password</label><br/>
                            <input onChange={handleInput} className="formInput" type="password" name="password" id="password" required></input>
                        </div>
                        <div className="form-submit">
                            <input className="formButton" type="submit" value="Submit"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
