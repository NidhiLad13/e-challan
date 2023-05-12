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
    id: '',
    email: '',
    adhaar: '',
    mobile: '',
    password: '',
    address: '',
    bday: '',
    picture: null,
}

export default function Register({ registerFor }) {

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
                id: Yup.string().min(5).max(255).required('ID is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                adhaar: Yup.number().test('len', 'must be 12 digits', val => val.toString().length === 12).required('adhaar number is required'),
                mobile: Yup.number().test('len', 'enter valid number', val => val.toString().length === 10).required('mobile number is required'),
                password: Yup.string().min(5, 'use least 5 characters').max(255).required('Password is required'),
                address: Yup.string().max(255).required('address is required'),
                bday: Yup.string().max(255).required('Birth date is required'),

            })
        ,
        onSubmit: async (vals) => {
            console.log('vals :>> ', vals);
            const { name, id, bday, email, adhaar, password, mobile, address } = vals;
            const gender = genderr;
            const registerfor = registerFor;

            const res = await fetch("http://localhost:7100/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, id, bday, email, adhaar, password, mobile, gender, address, registerfor })
            })
            const data = await res.json();
            console.log('data :>> ', data);
            if (data.err) {
                showMsg(data.err);
            }
            else if (data.success) {
                showMsg(data.success);
                values.name = '';
                values.mobile = '';
                values.adhaar = '';
                values.password = '';
                values.address = '';
                values.bday = '';
                values.email = '';
                values.id = '';
                values.picture = null
                // window.alert(registerFor + " registration successful")
                // history.push('/login')
            }
        }
    })
    console.log('errors :>> ', errors);
    // console.log('errors :>> ', errors.length);
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    return (
        <>
            {contextHolder}
            <div className="container">

                <h3 align="center">Register new {registerFor === 'Police' ? 'Police 👮' : 'Admin 👤'}</h3>
                <br />

                <Form onSubmit={handleSubmit}>

                    {/* <FormGroup className='profileContainer'>
                        <input ref={imgRef} hidden size='sm' type="file" name='picture' id='picture' onChange={(e) => { setFieldValue("picture", e.target.files[0]) }} />
                        {values?.picture ? <DisplayPicture file={values?.picture} /> : <img className='profilePic' src='https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg' alt="profile img" />}
                        <button className='profileBtn' onClick={(e) => { e.preventDefault(); imgRef.current.click() }}>Profile Picture</button>
                        {errors.picture && touched.picture ? <p className='form-error' >{errors.picture}</p> : null}

                    </FormGroup> */}
                    <FormGroup>
                        <Label for="Name"><b>Name</b></Label>
                        <Input invalid={errors.name && touched.name} valid={!errors.name && touched.name} placeholder="name..." type="text" name='name' id='name' size='sm' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                        {errors.name && touched.name ? <p className='form-error' color='red'>{errors.name}</p> : null}
                    </FormGroup>

                    <Row className="row-cols-sm-auto g-5 align-items-center">
                        <FormGroup>
                            <Label for="id"><b>ID</b></Label>
                            <Input invalid={errors.id && touched.id} valid={!errors.id && touched.id} placeholder="id..." type="text" name='id' id='id' size='sm' value={values.id} onChange={handleChange} onBlur={handleBlur} />
                            {errors.id && touched.id ? <p className='form-error' color='red'>{errors.id}</p> : null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDate">
                                <b>Birth Date</b>
                            </Label>
                            <Input
                                id="exampleDate"
                                name="bday"
                                placeholder="date placeholder"
                                type="date"
                                size='sm'
                                onChange={handleChange} onBlur={handleBlur} value={values.bday}
                                invalid={errors.bday && touched.bday} valid={!errors.bday && touched.bday}
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
                            <Label for="mobile"><b>mobile number</b></Label>
                            <Input invalid={errors.mobile && touched.mobile} valid={!errors.mobile && touched.mobile} placeholder="mobile..." size='sm' type="number" name='mobile' id='mobile' value={values.mobile} onChange={handleChange} onBlur={handleBlur} />
                            {errors.mobile && touched.mobile ? <p className='form-error' color='red'>{errors.mobile}</p> : null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="adhaar"><b>Adhaar card number</b></Label>
                            <Input invalid={errors.adhaar && touched.adhaar} valid={!errors.adhaar && touched.adhaar} placeholder="adhaar number..." size='sm' type="number" name='adhaar' id='adhaar' value={values.adhaar} onChange={handleChange} onBlur={handleBlur} />
                            {errors.adhaar && touched.adhaar ? <p className='form-error' color='red'>{errors.adhaar}</p> : null}
                        </FormGroup>
                    </Row>

                    <Label for="password"><b>Gender</b></Label>
                    <FormGroup check>
                        <Input name="gender" value='male' type="radio" onChange={(e) => { setGender(e.target.value) }} />
                        <Label >male</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input name="gender" value='female' type="radio" onChange={(e) => { setGender(e.target.value) }} />
                        <Label>female</Label>
                    </FormGroup>


                    <FormGroup>
                        <Label for="password"><b>Set Password</b></Label>
                        <InputGroup size='sm'>
                            <Input invalid={errors.password && touched.password} valid={!errors.password && touched.password} placeholder="password..." type={showPassword ? 'text' : 'password'} name='password' size='sm' id='password' value={values.password} onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }} />
                            <Button
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size='sm'
                            >
                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </Button>
                        </InputGroup>
                        {errors.password && touched.password ? <p className='form-error' color='red'>{errors.password}</p> : null}
                    </FormGroup>

                    <FormGroup style={{ display: level ? 'flex' : 'none', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{
                            backgroundColor: level?.color,
                            height: '4.5px',
                            width: level?.width,
                            borderRadius: '6px',
                            display: level ? 'flex' : 'none'
                        }}></div>&nbsp;&nbsp;
                        {level?.label}
                    </FormGroup>

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


        </>
    )
}



