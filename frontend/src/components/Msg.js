import React, { useEffect } from 'react'
import { Layout, Menu, theme, message, Result, Spin } from 'antd';
import Cookies from 'js-cookie';

export default function Msg({ msg }) {
    const [messageApi, contextHolder] = message.useMessage();
    console.log('msg  :>> ', msg);
    useEffect(() => {
        const ck = Cookies.get('person');
        messageApi.open({
            type: 'success',
            content: (
                <Result
                    status='success'
                    title='login successful'
                />
            ),
            duration: 3,
            style: {
                marginTop: '10vh',
            },
        });
    }, [])

    return (
        <>
            {contextHolder}
        </>
    )
}
