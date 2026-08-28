import React from 'react'
import { useState } from 'react'
import './OrderForm.css'

const OrderForm = () => {

    const [form, setForm] = useState({
        name: "",
        phone: "",
    })
    
    const handleForm = (e) => {
        const {name, value} = e.target;

        setForm({
            ...form,
            [name]: value,
        })
    }

    const valid = /^(?:\+251|0)9\d{8}$/.test(form.phone);

    return (
        <section className='form-wrapper'>
            <div className="order-form">
                <h2>Pay With Telebirr</h2>
                <form action="">
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id='name'
                            placeholder='John'
                            name='name'
                            value={form.name}
                            onChange={handleForm}
                        />
                        {/* {!form.name && <p className='error'>Name is required</p>} */}
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id='phone'
                            placeholder='+251912345678'
                            value={form.phone}
                            name='phone'
                            onChange={handleForm}
                        />
                        {/* {!form.phone && <p className='error'>Phone is required</p>} */}
                        {form.phone && !valid && <p className='error'>Use 09... or +251...</p>}
                    </div>
                    <button type='submit' disabled={!valid}>
                        Pay
                    </button>
                </form>
            </div>
        </section>
    )
}

export default OrderForm