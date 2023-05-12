import { Button, Form, Input } from 'antd';
import { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import context from "../Context/userContext.js";
import '../style/login.css'
import { Layout, Menu, theme, message, Result, Spin, Alert } from 'antd';
import Msg from './Msg.js';

import userImg from '../assets/user.png';
import adminImg from '../assets/Admin.png';
import policeImg from '../assets/police.png';
import PoliceForm from './PoliceForm.js';
import Cookies from 'js-cookie';

const Login = () => {

    const history = useHistory()
    const params = useParams();
    const { person } = params;

    const { user, setUser, challans, setChallans, setLogged } = useContext(context);
    const [uname, setUname] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const arr = [];
    const [messageApi, contextHolder] = message.useMessage();
    const [load, setLoad] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoad(true)
        const res = await fetch('http://localhost:7100/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ uname, password, person })
        })

        const data = await res.json();
        console.log('data in login :>> ', data);

        if (data?.err) {
            window.alert(data.err)
        }
        else if (data?.success) {
            setLoad(true)
            if (person === 'admin') {
                if (Cookies.get('person') === 'superAdmin')
                    setUser({ name: data?.name, id: data?.superId });
                if (Cookies.get('person') === 'admin')
                    setUser({ name: data.aName, id: data.aId });
                setLogged(true);
                history.push('/dashboard')
            }

            if (person === 'police') {
                setUser({ name: data.pName, id: data.pId });
                setLogged(true)
                history.push('/policeForm')
            }
            if (person === 'user') {
                alert(data.success)
                let lastPropertyName = Object.keys(data).pop();
                delete data[lastPropertyName];
                console.log(data);
                setChallans(data);
                setUser({ name: data[0].user, id: data[0].licenseNo });
                setLogged(true)
                history.push('/profile')
            }
            console.log('msg in login:>> ', msg);
        }
        setLoad(false)
    }

    if (load) {
        return (
            <>
                <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin tip="Checking Credentials... Please wait" size="large" />
                    <Msg msg={msg} />
                </div>
            </>
        )
    } else {
        return (
            <>
                {/* {contextHolder} */}

                <main className='padding-top'>
                    <div class="box">
                        <div class="inner-box">
                            <div className="left">


                                <div class="logo">
                                    <img src="./img/logo.png" alt="logo" />
                                    {/* <h4>Logo</h4> */}
                                </div>

                                <div >
                                    <h2>Welcome Back</h2>
                                    <h5>Login as {person}</h5>
                                </div>
                                <div class="forms-wrap">
                                    <Form name="basic" initialValues={{ remember: true, }} >

                                        <Form.Item
                                            label={person === 'user' ? "vehicle number" : person + " ID"}
                                            name="userID"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your registered mobile number!',
                                                },
                                            ]}
                                        >
                                            <Input onChange={(e) => setUname(e.target.value)} />
                                        </Form.Item>

                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            style={person !== 'user' ? { display: 'block' } : { display: 'none' }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                            ]}
                                        >
                                            {person !== 'user' &&
                                                <Input.Password onChange={(e) => setPassword(e.target.value)} />}
                                        </Form.Item>


                                        <Form.Item wrapper Col={{ offset: 8, span: 16, }}>
                                            <Button type="primary" htmlType='submit' onClick={handleLogin}>
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    <p class="text">
                                        Forgotten your password or you login datails?
                                        <a href="#">Get help</a> signing in
                                    </p>
                                </div>
                            </div>

                            <div className="right">
                                {person === 'admin' &&
                                    <img src={adminImg} alt="admin" width='70%' height='70%' />}
                                {person === 'police' &&
                                    <img src={policeImg} alt="police" width='100%' height='70%' />}
                                {person === 'user' &&
                                    <img src={userImg} alt="user" width='90%' height='75%' />}
                            </div>

                        </div>
                    </div>
                </main>
            </>
        )
    }
};
export default Login;