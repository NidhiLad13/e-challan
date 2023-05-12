import { useContext, useEffect, useState } from 'react';
import context from "../Context/userContext.js";
import Cookies from "js-cookie";
import '../style/policeForm.css'
import { Layout } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Form, Select, Upload, Spin } from 'antd';
const { TextArea } = Input;

const { Header, Content, Footer } = Layout;
const PoliceForm = () => {

    const { user, logged, setLogged } = useContext(context)
    const { Option } = Select;
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 }, };
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const onFinish = async (vals) => {
        const d = new Date();
        const date = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        const due = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate());
        const dueDate = due.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const { pname, pid, offense, place, plateNum, vehicleType } = vals;
        const res = await fetch('http://localhost:7100/submitChallan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ pname, pid, offense, place, plateNum, vehicleType, date, time, dueDate })
        })

        const data = await res.json();
        console.log('data in police form :>> ', data);
        if (data?.err) {
            window.alert(data.err)
        }
        else if (data?.success) {
            window.alert(data.success)
        }
    };


    useEffect(() => {
        if (Cookies.get('person')) { setLogged(true) } else { setLogged(false) }
        console.log('user in form :>> ', user);
    }, [])

    if (!user.id) {
        return (
            <>
                <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin tip="Loading" size="large" />
                </div>
            </>
        )
    } else {
        return (
            <div >
                <Layout >
                    <Layout className="site-layout" style={{ marginLeft: 15, marginRight: 15, minHeight: '100vh' }} >
                        <Header className='header'>
                            <h4>Challan Form</h4>
                        </Header>

                        <Content className='dashboardContent' style={{ padding: 0, paddingBottom: 20 }}>
                            <div className="dashboardContainer">
                                <div style={{ padding: 20 }}>
                                    <Form name="validate_other"
                                        {...formItemLayout}
                                        onFinish={onFinish}
                                        style={{
                                            width: 600,
                                            border: '0px solid green'
                                        }}
                                    >
                                        <Form.Item className='label' initialValue={user?.name} label="Police name" name="pname">
                                            <Input disabled style={{ color: 'black' }} />
                                        </Form.Item>

                                        <Form.Item className='label' initialValue={user?.id} label="Police ID" name="pid" >
                                            <Input disabled style={{ color: 'black' }} />
                                        </Form.Item>

                                        <Form.Item className='label' name="vehicleType" label="Vehicle type" hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select Vehicle type!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder=" select Vehicle type">
                                                <Option value="2wheel">2 wheel</Option>
                                                <Option value="4wheel">4 wheel</Option>
                                                <Option value="rikshaw">Rickshaw</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item className='label' label="Vehicle number" name="plateNum" rules={[
                                            {
                                                required: true,
                                                message: 'Please fill Vehicle number!',
                                            },
                                        ]}><Input /></Form.Item>

                                        <Form.Item
                                            name="offense"
                                            label="Select Offenses"
                                            className='label'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please Select Offenses!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Select Offenses">
                                                <Option value="Violation of road regulations">Violation of road regulations</Option>
                                                <Option value="Driving without License">Driving without License</Option>
                                                <Option value="Over Speeding">Over Speeding</Option>
                                                <Option value="Drunken Driving">Drunken Driving</Option>
                                                <Option value="offense related to accident">offense related to accident</Option>
                                                <Option value="Violation of Parking regulations">Violation of Parking regulations</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item className='label' label="Offense place" name='place'>
                                            <TextArea rows={2} />
                                        </Form.Item>

                                        {/* <Form.Item
                                            name="img"
                                            className='label'
                                            label="Upload vehicle image"
                                            valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                        >
                                            <Upload name="logo" action="/upload.do" listType="picture">
                                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                                            </Upload>
                                        </Form.Item> */}

                                        <Form.Item wrapperCol={{ span: 12, offset: 8, }}>
                                            <Button type="primary" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </Content>

                        <Footer className='footer'>
                            Challan System - Design Engineering ©20cp016-20cp026-20cp034
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
};

export default PoliceForm;
