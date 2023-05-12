import React from 'react'
import { useState, useContext, useEffect } from 'react';
import context from "../Context/userContext";
import { useHistory, NavLink, useLocation } from "react-router-dom"
import Register from './Register';
import InfoCard from './dhashboard components/InfoCard';
import ViewChallan from './dhashboard components/ViewChallan';
import Viewadmin from './dhashboard components/Viewadmin';
import '../style/dashboard.css'
import Cookies from "js-cookie";
import {
    QuestionCircleOutlined,
    DashboardOutlined,
    SnippetsOutlined,
    HomeOutlined,
    PlusCircleOutlined,
    SettingOutlined,
    UsergroupAddOutlined,
    UnorderedListOutlined,
    ExclamationCircleOutlined,
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, message, Result, Spin } from 'antd';
import logo from '../assets/logo.png'
import Viewpolice from './dhashboard components/ViewPolice';
const { Header, Content, Footer, Sider } = Layout;


export default function Dashboard() {

    const { user, setUser, nav, setNav, setLogged } = useContext(context);
    const [collapsed, setCollapsed] = useState(false);
    const [sliderItem, setSliderItem] = useState('dashboard')
    const [registerFor, setRegisterFor] = useState('')
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [messageApi, contextHolder] = message.useMessage();
    const SuccessMsg = () => {
        messageApi.open({
            type: 'success',
            content: (
                <Result
                    status="success"
                    title={Cookies.get('person') + " Login successful"}
                />
            ),
            duration: 3,
            style: {
                marginTop: '10vh',
            },
        });

    };
    useEffect(() => {
        setNav(false);
        if (Cookies.get('person')) { setLogged(true) } else { setLogged(false) }
        SuccessMsg();
        console.log('user in dashboard :>> ', user);
    }, []);
    console.log('sliderItem :>> ', sliderItem);


    const history = useHistory()
    if (!user.id) {
        return (
            <>
                <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin tip="Loading" size="large" />
                </div>
            </>
        )
    }
    else {
        return (
            <>
                {/* {contextHolder} */}
                <div className='dashboard'>
                    <Layout hasSider className='main'>
                        <Sider className='sider' collapsible trigger={null} collapsed={collapsed} width={210}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <img src={logo} alt="logo" className='logo' />
                            </div>

                            <div className="menubar">

                                <div className="up">
                                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}
                                        items={[
                                            {
                                                key: '1',
                                                icon: <UsergroupAddOutlined />,
                                                label: 'Registration',
                                                children: [
                                                    Cookies.get('person') === 'superAdmin' &&
                                                    {
                                                        key: 'admin',
                                                        icon: <UserOutlined />,
                                                        label: 'Admin',
                                                        onClick: () => {
                                                            setSliderItem('registration')
                                                            setRegisterFor('Admin')
                                                        }
                                                    },
                                                    Cookies.get('person') === 'admin' &&
                                                    {
                                                        key: 'police',
                                                        icon: <UserOutlined />,
                                                        label: 'Policeman',
                                                        onClick: () => {
                                                            setSliderItem('registration')
                                                            setRegisterFor('Police')
                                                        }
                                                    }
                                                ],

                                            },
                                            {
                                                key: 'challans',
                                                icon: <UnorderedListOutlined />,
                                                label: Cookies.get('person') === 'admin' ? 'view challans' : 'view admins',
                                                children: [
                                                    Cookies.get('person') === 'admin' &&
                                                    {
                                                        key: 'all',
                                                        icon: <SnippetsOutlined />,
                                                        label: 'All',
                                                        onClick: () => {
                                                            setSliderItem('all')
                                                        }
                                                    },

                                                    Cookies.get('person') === 'admin' &&
                                                    {
                                                        key: 'pending',
                                                        icon: <ExclamationCircleOutlined />,
                                                        label: 'Pending',
                                                        onClick: () => {
                                                            setSliderItem('pending')
                                                        }
                                                    },

                                                    Cookies.get('person') === 'superAdmin' &&
                                                    {
                                                        key: 'Admins',
                                                        icon: <ExclamationCircleOutlined />,
                                                        label: 'Admins',
                                                        onClick: () => {
                                                            setSliderItem('Admins')
                                                        }
                                                    }
                                                ],

                                            },
                                            {
                                                key: 'Polices',
                                                icon: <UnorderedListOutlined />,
                                                label: 'view police' ,
                                                children:[
                                                    {
                                                    key: 'Polices',
                                                        icon: <ExclamationCircleOutlined />,
                                                        label: 'Polices',
                                                        onClick: () => {
                                                            setSliderItem('Polices')
                                                        }
                                                    }
                                                ],
                                            },
                                            {
                                                key: 'dashboard',
                                                icon: <DashboardOutlined />,
                                                label: 'Dashboard',
                                                onClick: () => {
                                                    setSliderItem('dashboard')
                                                }
                                            },

                                        ]} />
                                </div>
                                <div className="down">
                                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}
                                        items={[

                                            {
                                                key: 'home',
                                                icon: <HomeOutlined />,
                                                label: 'Home',
                                                onClick: () => {
                                                    setNav(true)
                                                    setSliderItem('home')
                                                    history.push('/')
                                                },
                                            },
                                        ]} />
                                </div>
                            </div>

                        </Sider>

                        <Layout
                            className="site-layout"
                            style={{
                                marginLeft: 15,
                                marginRight: 15,
                                minHeight: '100vh'
                            }}
                        >
                            <Header className='header'>
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: () => setCollapsed(!collapsed),
                                })}
                                <h4>{Cookies.get('person')} Dashboard</h4>
                            </Header>

                            <Content className='dashboardContent' style={{ padding: 0, paddingBottom: 20 }}>
                                <div className="dashboardContainer">
                                    <div style={{ padding: 20 }}>
                                        {sliderItem === 'registration' && <Register registerFor={registerFor} />}
                                        {sliderItem === 'dashboard' && <InfoCard />}
                                        {sliderItem === 'all' && <ViewChallan status={'All Challans'} />}
                                        {sliderItem === 'pending' && <ViewChallan status={'Pending Challans'} />}
                                        {sliderItem === 'Polices' && <Viewpolice /> } 
                                        {sliderItem === 'Admins' && <Viewadmin />}
                                    </div>
                                </div>
                            </Content>

                            <Footer className='footer'>
                                Challan System - Design Engineering ©20cp026-20cp034-20cp016
                            </Footer>
                        </Layout>
                    </Layout>
                </div>
            </>
        )
    }
}
