import React, { useEffect, useContext } from 'react'
import { Layout, Menu, theme, message, Result } from 'antd';
import Cookies from 'js-cookie';
import context from '../Context/userContext'


export default function ErrorPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const { setLogged } = useContext(context)
    const ErrorMsg = () => {
        messageApi.open({
            type: 'error',
            content: (
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                />
            ),
            duration: 2,
            style: {
                marginTop: '10vh',
            },
        });

    };
    useEffect(() => {
        ErrorMsg();
        if (Cookies.get('person')) { setLogged(true) } else { setLogged(false) }

    }, []);
    return (
        <div style={{ color: 'red', textAlign: 'center', paddingTop: '15vh' }}>
            {contextHolder}
            <h1>Error...</h1>
            <h3 >You can not access this page </h3>
        </div>
    )
}
