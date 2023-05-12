import React, { useContext } from 'react'
import context from "../Context/userContext.js";

export default function Home() {
    const { user, setUser } = useContext(context);
    console.log("User in Home ; ", user);
    return (
        <>
            <div className="home">


                <h1 className='content'>Welcome to E-challan system</h1>
                {/* {Cookies.get('person') && <h1>Hello {Cookies.get('person')}</h1>} */}

            </div>


        </>
    )
}
