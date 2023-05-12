import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import context from '../Context/userContext'
import Cookies from 'js-cookie';


export default function Logout() {

    const history = useHistory()
    const { user, logged, setLogged, setUser } = useContext(context)

    useEffect(async () => {
        const res = await fetch('http://localhost:7100/logout', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        const data = await res.json();
        console.log('data :>> ', data);
        window.alert(data.loggedOut)
        setUser({ name: null, id: null });
        setLogged(false)
        history.push('/', { replace: true })
    }
        , [])

    if (!user.id) {
        return (
            <>
                <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>loading...</h2>
                </div>
            </>
        )
    } else {
        return (
            <div>
                {/* <h1>Logout</h1> */}
            </div>
        )
    }
}
