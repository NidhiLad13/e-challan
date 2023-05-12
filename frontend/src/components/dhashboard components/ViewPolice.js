import { useContext, useEffect, useState, React } from 'react';
import { Descriptions } from 'antd';
export default function Viewpolice() {
    const [polices, setPolices] = useState({})
    var count = 1;

    
    useEffect(async () => {
        try {
            // setLoad(true)
            const res = await fetch("http://localhost:7100/getPolices", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await res.json();
            // console.log('data in view polices :>> ', data);

            // if (data[0].user) setLoad(false)
            setPolices(data)

        } catch (err) {
            console.log('err in info card :>> ', err);
        }
    }, [])
    return (
        <>
            <div>

                <h4 align="center">Polices</h4>
                {
                    Object.keys(polices).map((police) => {
                        return (

                            <div className='polices'>

                                        <Descriptions
                                            title={count++ + ".  Police ID :-  " + polices[police]._id}
                                            bordered
                                            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                                        >
                                            <Descriptions.Item label="Police ID">{polices[police].pId}</Descriptions.Item>
                                            <Descriptions.Item label="Police name">{polices[police].pName}</Descriptions.Item>
                                            <Descriptions.Item label="Police email">{polices[police].pEmail}</Descriptions.Item>
                                            <Descriptions.Item label="Police gender">{polices[police].pGender}</Descriptions.Item>
                                            <Descriptions.Item label="Police mobile">{polices[police].pMobile}</Descriptions.Item>
                                            <Descriptions.Item label="Police Aadhar">{polices[police].pAdhaar}</Descriptions.Item>
                                            <Descriptions.Item label="Police Address">{polices[police].pAddress}</Descriptions.Item>
                                        </Descriptions>
                            </div>


                        )
                    })
                }
            </div >
        </>
    )
}
