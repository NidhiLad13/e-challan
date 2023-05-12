import { useContext, useEffect, useState, React } from 'react';
import emailjs from "@emailjs/browser";
import { Descriptions } from 'antd';
export default function ViewChallan({ status }) {
    const [challans, setChallans] = useState({})
    console.log('status :>> ', status);
    var count = 1;

    const sendMemo = (e) => {
        e.preventDefault();
        console.log("Target : ", e.target);
        emailjs
            .sendForm(
                "service_yjfe9fe",
                "template_aqpfrpa",
                e.target,
                "P3B5ZzH7DRso2tdGN"
            )
            .then((res) => {
                alert("Your message has been sent successfully...!");
            })
            .catch((err) => { alert("Server is busy! Please try after sometime!"); console.log(err); });
    }
    useEffect(async () => {
        try {
            // setLoad(true)
            const res = await fetch("http://localhost:7100/getChallans", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await res.json();
            // console.log('data in view challans :>> ', data);

            // if (data[0].user) setLoad(false)
            setChallans(data)

        } catch (err) {
            console.log('err in info card :>> ', err);
        }
    }, [])
    return (
        <>
            <div>

                <h4 align="center">{status} </h4>
                {
                    Object.keys(challans).map((challan) => {
                        return (

                            <div className='challans'>
                                {status === 'All Challans' &&
                                    <>

                                        <Descriptions
                                            title={count++ + ".  Challan ID :-  " + challans[challan]._id}
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
                                            <Descriptions.Item label="Due Date" >
                                                <span style={{ color: 'red' }}>{challans[challan].dueDate}</span>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Amount"><b>{challans[challan].amount}</b></Descriptions.Item>
                                            <Descriptions.Item label="Status">
                                                <span style={challans[challan].status === 'pending' ? { color: 'red' } : { color: 'green' }}>{challans[challan].status}</span>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Police officer">{challans[challan].policeName}</Descriptions.Item>
                                            <Descriptions.Item label="Place">
                                                {challans[challan].place}
                                            </Descriptions.Item>
                                        </Descriptions>
                                        <form onSubmit={sendMemo}>
                                            <input type="hidden" name="name" value={challans[challan].user} />
                                            <input type="hidden" name="offense" value={challans[challan].offense} />
                                            <input type="hidden" name="date" value={challans[challan].date} />
                                            <input type="hidden" name="amount" value={challans[challan].amount} />
                                            <input type="hidden" name="place" value={challans[challan].place} />
                                            <input type="hidden" name="toemail" value={challans[challan].email} />
                                            {challans[challan].status === 'pending' && (
                                                <button className='btn btn-primary' type="submit" style={{ margin: '10px' }}>
                                                    Send Memo
                                                </button>
                                            )}
                                        </form>
                                    </>
                                }
                                {status === 'Pending Challans' && challans[challan].status === 'pending' &&
                                    <>
                                        <Descriptions Descriptions
                                            title={count++ + ".  Challan ID :-  " + challans[challan]._id
                                            }
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
                                        <form onSubmit={sendMemo}>
                                            <input type="hidden" name="name" value={challans[challan].user} />
                                            <input type="hidden" name="offense" value={challans[challan].offense} />
                                            <input type="hidden" name="date" value={challans[challan].date} />
                                            <input type="hidden" name="amount" value={challans[challan].amount} />
                                            <input type="hidden" name="place" value={challans[challan].place} />
                                            <input type="hidden" name="toemail" value={challans[challan].email} />
                                            {challans[challan].status === 'pending' && (
                                                <button className='btn btn-primary' type="submit" style={{ margin: '10px' }}>
                                                    Send Memo
                                                </button>
                                            )}
                                        </form>
                                    </>
                                }

                            </div>


                        )
                    })
                }
            </div >
        </>
    )
}
