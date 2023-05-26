import React from 'react'
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const About = () => {
    return (
        <section id="about">
        <div>
            <Layout>
                <Layout className="site-layout" style={{ marginLeft: 15, marginRight: 15, minHeight: '100vh' }} >
                    <Header className='header' style={{ justifyContent: 'center', marginTop: '20px' }}>
                        <h3>ABOUT US</h3>
                    </Header>
                    <Content style={{ padding: 0, paddingBottom: 20, fontSize: 25 }}>
                        <div style={{ color: 'black' }}>
                            <div style={{ marginLeft: 40 }}>
                                <br /> e-Challan is a sophisticated software application comprising Android based mobile app and web interface, developed for the purpose of providing an comprehensive solution for Transport Enforcement Officers and Traffic Policemen.
                                <br /><br />This app-cumapplication is integrated with Vahan and Sarathi applications and provides a number of user-friendly features while covering all major functionalities of Traffic Enforcement System.

                                <br /><br />This is an end to end automated system with digital interface for all the stakeholders in purview of challan eco-system. The application offers customized interfaces for the following stakeholders:
                                <br />‣ Enforcement officers
                                <br />‣ Citizens (private or commercial car owners/drivers)
                                <br /> ‣ State transport office
                                <br /> ‣ Regional transport/Traffic office
                                <br />‣ NIC admin
                                <br />‣ Ministry of Road and Transport

                                <br /><br />The application introduces a novel concept of using mobile based app for issuing eChallan.
                                <br /><br /> The mobile based access to the system is available only to enforcement officers through android smart phones. While the web based access is available to all the rest of the stakeholders, mobile based access ensures the services are available anytime anywhere.
                                <br /><br />This application is built in line with the requirements of Vahan 4 and Sarathi 4 and shall be accessing and updating data from/to national databases.ication introduces a novel concept of using mobile based app for issuing eChallan. The mobile based access to the system is available only to enforcement officers through android smart phones. While the web based access is available to all the rest of the stakeholders, mobile based access ensures the services are available anytime anywhere.
                                <br /><br />This application is built in line with the requirements of Vahan 4 and Sarathi 4 and shall be accessing and updating data from/to national databases.

                                Connecting all the stakeholders through a common system will ensure data integrity, reliability and transparency.

                                <br /><br /> ‣ Efficient use of technology in providing an easy, efficient and comprehensive traffic enforcement system – which will ensure nation-wide data sharing and lead to better traffic discipline and road safety.
                                <br /><br /> ‣ The system aims to provide a perfect solution for the current challenges which the transport departments is facing with respect to issuance of traffic challans, managing records/ back-end operations, tracking offence history, payments, reports etc. by leveraging latest technologies which are easy to use, adapt and implement at the ground level.
                                <br /><br /> ‣ Connecting all the stakeholders through a common system which is ensuring data integrity, reliability and transparency. End to end automation of the process will ensure efficiency at each level of users. 100% digitization and documentation of records will help in improving the visibility on offenders, types of offences frequently committed, payments received on time etc.
                                <br /><br />‣ Minimizing time and efforts of citizen in making payments or follow-up actions which they face after getting challan on Road
                                <br /><br />‣ Minimizing Revenue loss and enhance transparency
                                <br /><br /> ‣ Providing real time Road Safety implementation report to the Ministry/ State Govts for data driven policy making.
                                <br /><br />‣ Easy and efficient challaning option for Transport Enforcement Officers and Traffic Police officers Completely customizable as per state/ department requirements
                                <br /><br /> ‣ Central Monitoring of Road Safety Policy implementation.
                                <br /><br /> ‣ No duplicate or fake challans (Comprehensive monitoring, audit option for each individual challan or concerned official by department remotely)
                                <br /><br /> ‣ Online payment of challans by citizen “anytime and anywhere”
                                <br /><br />‣ Court disposal will reflect directly to citizen / Department page. It will save lots of efforts and time of citizen and department officials.
                                <br /><br /> ‣ Any transaction on concerned vehicle/license will get blocked at RTO in case of pending challan
                                <br /><br />‣ Subsequent penalty to accused owner at all the state where challan is implemented. This will stop revenue loss of States.

                            </div> </div></Content>
                    <Footer className='footer'>
                        Challan System - Design Engineering ©20cp016-20cp026-20cp034
                    </Footer>
                </Layout>
            </Layout>
        </div>
        </section>
    )

};

export default About;
