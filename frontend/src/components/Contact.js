import React from 'react'
import { Layout } from 'antd';
import '../style/contact.css'

const { Header, Content, Footer } = Layout;

const Contact = () => {
    return (
        <div>
            <Layout>
                <Layout className="site-layout" style={{ marginLeft: 15, marginRight: 15, minHeight: '100vh' }} >
                    <Header className='header' style={{ justifyContent: 'center', marginTop: '20px' }}>
                        <h3>CONTACT US</h3>
                    </Header>
                   
                    <Content  style={{ padding: 0, paddingBottom: 20, fontSize: 25,  marginLeft: 80, marginRight: 80}}>                       
                    <div style={{ color: 'black' }} className="cont">
                    <img src='	https://parivahan.gov.in/parivahan/sites/default/files/img/icon-mail-circle.png'></img>
                          <br/><b>Write to Us:</b>
                                    <br />For any query regarding this website, please contact the Web Information Manager:-
                                    <br / >Name: eChallan Team                                    
                                    <br />Email: nidhilad412@gmail.com
                                     <br />Phone:  0120-4925505  (Timings: 6:00 AM - 10:00 PM)
                    </div>
                    </Content>
                    <Footer className='footer'>
                            Challan System - Design Engineering ©20cp016-20cp026-20cp034
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )

};

export default Contact;
