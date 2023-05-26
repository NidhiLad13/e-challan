import { React, useRef, useState, useEffect } from 'react'
import '../style/register.css'
import { strengthColor, strengthIndicator } from '../utilities-design/password-strength';
import DisplayPicture from '../utilities-design/DisplayPicture.js'
import { Form, FormGroup, Label, Input, Button, Row, InputGroup, InputGroupText } from 'reactstrap';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { message, Result } from 'antd';



const initialStates = {
    name: '',
    email: '',
    aadharNo: '',
    contact: '',
    address: '',
    dob: '',
    licenseNo: '',
    vehicleNo: '',

}

export default function UserForm({ registerFor }) {

    const [messageApi, contextHolder] = message.useMessage();

    const showMsg = (msg) => {
        messageApi.open({
            type: msg[0] === 'r' ? 'success' : 'error',
            content: (
                <Result
                    status={msg[0] === 'r' ? 'success' : 'error'}
                    title={registerFor + " " + msg}
                />
            ),
            duration: 3,
            style: {
                marginTop: '10vh',
            },
        });

    };


    const imgRef = useRef(null)
    const [genderr, setGender] = useState('')
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialStates,
        validationSchema:
            Yup.object().shape({
                name: Yup.string().min(2).max(25).required('Name is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                aadharNo: Yup.number().test('len', 'must be 12 digits', val => val.toString().length === 12).required('adhaar number is required'),
                contact: Yup.number().test('len', 'enter valid number', val => val.toString().length === 10).required('mobile number is required'),
                licenseNo: Yup.string().test('len', 'must be 15 digits', val => val.toString().length === 15).required('license number is required'),
                vehicleNo: Yup.string().test('len', 'enter valid vehicle number', val => val.toString().length === 13).required('vehicle number is required'),
                address: Yup.string().max(255).required('address is required'),
                dob: Yup.string().max(255).required('Birth date is required'),

            })
        ,
        onSubmit: async (vals) => {
            console.log('vals :>> ', vals);
            const { name, email, contact, aadharNo, address, dob, licenseNo, vehicleNo } = vals;

            const res = await fetch("http://localhost:7100/userform", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, contact, aadharNo, address, dob, licenseNo, vehicleNo })
            })
            const data = await res.json();
            console.log('data :>> ', data);
            if (data.err) {
                showMsg(data.err);
            }
            else if (data.success) {
                showMsg(data.success);
                values.name = '';
                values.email = '';
                values.contact = '';
                values.aadharNo = '';
                values.address = '';
                values.dob = '';
                values.dob = '';
                values.licenseNo = '';
                values.vehicleNo = '';
                // window.alert(registerFor + " registration successful")
                // history.push('/login')
            }
        }
    })
    console.log('errors :>> ', errors);
    // console.log('errors :>> ', errors.length);
    const [level, setLevel] = useState();

    return (
        <>
        <div className="dashboardContainer" style={{ margin: 'auto', marginTop: '60px'}} >
            <div style={{ padding: 20 }}>
            {contextHolder}
            <div className="container" >

                <h3 align="center">Register New User👮 </h3>
                <br />

                <Form onSubmit={handleSubmit}>

                <FormGroup>
                        <Label for="name"> <b>Name</b>  </Label>
                        <Input invalid={errors.name && touched.name} valid={!errors.name && touched.name} placeholder="Namee..." size='sm' type="text" name='name' id='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                        {errors.name && touched.name ? <p className='form-error' >{errors.name}</p> : null}
                    </FormGroup>

                    <Row className="row-cols-sm-auto g-5 align-items-center">
                        <FormGroup>
                            <Label for="exampleDate">
                                <b>Birth Date</b>
                            </Label>
                            <Input
                                id="exampleDate"
                                name="dob"
                                placeholder="date placeholder"
                                type="date"
                                size='sm'
                                onChange={handleChange} onBlur={handleBlur} value={values.dob}
                                invalid={errors.dob && touched.dob} valid={!errors.bday && touched.dob}
                            />
                            {errors.bday && touched.bday ? <p className='form-error' color='red'>{errors.bday}</p> : null}
                        </FormGroup>
                    </Row>
                    <FormGroup>
                        <Label for="exampleEmail"><b>Email</b></Label>
                        <Input invalid={errors.email && touched.email} valid={!errors.email && touched.email} placeholder="email..." size='sm' type="email" name='email' id='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        {errors.email && touched.email ? <p className='form-error' color='red'>{errors.email}</p> : null}
                    </FormGroup>

                    <Row className="row-cols-sm-auto g-5 align-items-center">
                        <FormGroup>
                            <Label for="contact"><b>mobile number</b></Label>
                            <Input invalid={errors.contact && touched.contact} valid={!errors.contact && touched.contact} placeholder="mobile..." size='sm' type="number" name='contact' id='contact' value={values.contact} onChange={handleChange} onBlur={handleBlur} />
                            {errors.mobile && touched.mobile ? <p className='form-error' color='red'>{errors.mobile}</p> : null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="aadharNo"><b>Adhaar card number</b></Label>
                            <Input invalid={errors.aadharNo && touched.aadharNo} valid={!errors.aadharNo && touched.aadharNo} placeholder="adhaar number..." size='sm' type="number" name='aadharNo' id='aadharNo' value={values.aadharNo} onChange={handleChange} onBlur={handleBlur} />
                            {errors.aadharNo && touched.aadharNo ? <p className='form-error' color='red'>{errors.aadharNo}</p> : null}
                        </FormGroup>
                    </Row>

                    <Row className="row-cols-sm-auto g-5 align-items-center">
                        <FormGroup>
                            <Label for="licenseNo"><b>License number</b></Label>
                            <Input invalid={errors.licenseNo && touched.licenseNo} valid={!errors.licenseNo && touched.licenseNo} placeholder="license..." size='sm' type="text" name='licenseNo' id='licenseNo' value={values.licenseNo} onChange={handleChange} onBlur={handleBlur} />
                            {errors.licenseNo && touched.licenseNo ? <p className='form-error' color='red'>{errors.licenseNo}</p> : null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="vehicleNo"><b>Vehicle number</b></Label>
                            <Input invalid={errors.vehicleNo && touched.vehicleNo} valid={!errors.vehicleNo && touched.vehicleNo} placeholder="vehical number..." size='sm' type="text" name='vehicleNo' id='vehicleNo' value={values.vehicleNo} onChange={handleChange} onBlur={handleBlur} />
                            {errors.vehicleNo && touched.vehicleNo ? <p className='form-error' color='red'>{errors.vehicleNo}</p> : null}
                        </FormGroup>
                    </Row>

                    <FormGroup>
                        <Label for="exampleSelect"> <b>Residential Address</b>  </Label>
                        <Input invalid={errors.address && touched.address} valid={!errors.address && touched.address} placeholder="address..." size='sm' type="text" name='address' id='address' value={values.address} onChange={handleChange} onBlur={handleBlur} />
                        {errors.address && touched.address ? <p className='form-error' >{errors.address}</p> : null}
                    </FormGroup>

                    <Button Button color='success' >
                        Submit
                    </Button>

                </Form>

            </div>

</div>
</div>
        </>
    )
}



