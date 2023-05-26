import React from 'react'
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const Service = () => {
    return (
        <div>
            <Layout>
                <Layout className="site-layout" style={{ marginLeft: 15, marginRight: 15, minHeight: '100vh' }} >
                    <Header className='header' style={{ justifyContent: 'center', marginTop: '20px' }}>
                        <h3>SERVICE</h3>
                    </Header>
                    <Content style={{ padding: 0, paddingBottom: 20, fontSize: 25 }}>
                        <div style={{ color: 'black' }}>
                            <div style={{ marginLeft: 40 }}>
                            <br />‣Learnings for sharing
                                eChallan system has evolved through a process of learning, changes and enhancements. In the process of implementation in different states, various new requirements, situations, issues etc. have provided a rich learning experience and opportunities – which have made the product more robust and richer in terms of features, functionalities and security. A host of sophisticated tools and technologies and also management and support processes have been incorporated to make the project a success.
                                <br /><br />‣ Digital Empowerment
                                Payment of Challans is facilitated through various options like Online Payment, PoS based payment – both on-spot and through portal.

                                <br /><br /> Although this is primarily a departmental app/ application (from Transport and Traffic Police), however, concerned citizen is also automatically made a stakeholder so that he/she can make challan payments through digital mode or follow-up/ grievance options etc. by logging into the portal.

                                <br /><br />The system has provided bi-lingual support (Hindi and English) as of now. But shortly, state-specific language customization option is being provided as per the requirements received from users.
                                <br /><br />TeChallan system envisages a complete shift of traffic enforcement operations from a primarily manual process to a technology-intensive process – which is much more efficient, comprehensive, transparent and at the same time very user-friendly. The process of challan issuance and disposal, management and monitoring of concerned staff and their performance, payment collection system and so on – all are set to be provided on a technological platform. Monitoring, Reporting, Back-end processing and integration with concerned stake-holders are all going to be much more comprehensive and feature-rich.
                                <br /><br />T‣Capacity Building
                                Comprehensive training and hand-holding to all operational staffs of the concerned department (Transport Enforcement/ Traffic Police) provided before and after implementation. Starting with demonstration of app/application to top-level officials, to detailed training schedule to operational staff, field level run with actual device and then finally to real challaning operations – at all stages, complete support is provided by NIC support team.
                                <br /><br />T ‣State-wise, department-wise customization
                                eChallan is a generic app/ application which can be used by all states (both Transport Enforcement and Traffic Police) as deployed on a common platform. However, all necessary configurations, customizations and additional enhancements are taken care of and integrated into the system as per the requirements of the state/ department, in order to meet specific acts/ rules/ processes/ formats/ protocols etc.
                            </div>
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

export default Service;