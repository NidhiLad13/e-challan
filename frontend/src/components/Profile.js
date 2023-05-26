import { useContext, useEffect, useState, React } from 'react';
import context from "../Context/userContext.js";
import { Layout, Spin, Descriptions } from 'antd';
import Cookies from "js-cookie";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DownOutlined, FrownFilled, MehOutlined, SmileOutlined, FrownOutlined } from '@ant-design/icons';
import '../style/profile.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const { Header, Content, Footer } = Layout;


export default function Profile() {
    const { user, logged, setLogged, challans } = useContext(context)
    var total=0;
    var challanId;
    useEffect(() => {
        if (Cookies.get('person')) { setLogged(true) } else { setLogged(false) }
        console.log('user in form :>> ', user);
        console.log('challans in profile :>> ', challans);
    }, [])

    const [totalAmt, setTotalAmt] = useState(0);
    const [am, setAm] = useState({
        name: "Pay Challan",
        description: "the sample code",
    })

    useEffect(() => {
        setTotalAmt(total)
    }, [challans])

    const doSet = async(currAmt,chid)=>{
        const response = await axios.post('http://localhost:7100/checkout', { currAmt,totalAmt,status:'paid',chid })
        console.log(response.status);
    }

    return (
        <Layout >
            <Layout className="site-layout" style={{ marginLeft: 15, marginRight: 15, minHeight: '100vh' }} >
                <Header className='header' style={{ justifyContent: 'center', marginTop: '20px' }}>
                    <h3 >Your Challan Details</h3>
                </Header> 
                <Content className='dashboardContent' style={{ padding: 0, paddingBottom: 20 }}>
                    <div className="user">
                        <div>Name : {challans[0].user}</div>
                        <div>Vehicle Number : {challans[0].vehicleNum}</div>
                    </div>
                    <div className="dashboardContainer">

                        {
                            Object.keys(challans).map((challan) =>{
                            {
                                challans[challan].status === "pending" ? total += challans[challan].amount : total += 0;
                            }
                            return (
                                <>
                                    <div className='challans'>
                                        <Descriptions
                                            title={"Challan ID :-  " + challans[challan]._id}
                                            bordered
                                            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                                        >
                                            <Descriptions.Item label="License number">{challans[challan].licenseNo}</Descriptions.Item>
                                            <Descriptions.Item label="Mobile number">{challans[challan].mobile}</Descriptions.Item>
                                            <Descriptions.Item label="Email">{challans[challan].email}</Descriptions.Item>
                                            <Descriptions.Item label="Vehicle type">{challans[challan].vehicleType}</Descriptions.Item>
                                            <Descriptions.Item label="Offense">{challans[challan].offense}</Descriptions.Item>
                                            <Descriptions.Item label="time">{challans[challan].time}</Descriptions.Item>
                                            <Descriptions.Item label="date">{challans[challan].date}</Descriptions.Item>
                                            <Descriptions.Item label="Due Date" ><span style={{ color: 'red' }}>{challans[challan].dueDate}</span></Descriptions.Item>
                                            <Descriptions.Item label="Amount"><b>{challans[challan].amount}</b></Descriptions.Item>
                                            <Descriptions.Item label="Status">
                                                <span style={challans[challan].status === 'pending' ? { color: 'red' } : { color: 'green' }}>{challans[challan].status}</span>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Police officer">{challans[challan].policeName}</Descriptions.Item>
                                            <Descriptions.Item label="Place">{challans[challan].place}</Descriptions.Item>
                                        </Descriptions>

                                    </div>
                                    {challans[challan].status === 'pending' ? <StripeCheckout className="center" stripeKey="pk_test_51N6ReOSElB0MiJYphkCJnPukTn75ZWmFWaPMabhoe6aaN3PbkLYwAsa9CBXMVbflwK2MdhTRe19ruzy4EyKlHkcw00y20l9U1D" token={()=>{doSet(challans[challan].amount,challans[challan]._id);  }} amount={challans[challan].amount*100} name={am.name} >
                                    </StripeCheckout>: <span></span>}
                                </>
                            )
                            })
                        }  
                        <hr />
                        <h5 className='total'>Total Pending Amount : {total}/-</h5>

                    </div>
                </Content>
                <Footer className='footer'>
                    Challan System - Design Engineering ©20cp016-20cp026-20cp034
                </Footer>
            </Layout>
        </Layout>
    )
}

