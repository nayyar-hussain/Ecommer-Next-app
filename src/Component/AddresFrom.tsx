"use client"
import React from 'react'

function AddresFrom() {

    const handleAddressForm = (formdata: FormData) => {
        
        try {
            const name = formdata.get('name') as string
            const email = formdata.get('email') as string
            const address = formdata.get('address') as string
            const phone = formdata.get('phone') as string
            const zipcode = formdata.get('zipcode') as string
            const state = formdata.get('state') as string
            const country = formdata.get('country') as string
            const city = formdata.get('city') as string
            interface IFormData {
            name : string
            email : string
            address : string,
            phone : string,
            zipcode : string,
            state : string,
            country : string
            city : string
            }
           const payload : IFormData = {
            name,
            email,
            address,
            phone,
            zipcode,
            state,
            country,
            city,
            
           }

           console.log(payload);
           
           
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <form className='w-full' action={handleAddressForm}>

        <fieldset className="fieldset w-full md:w-3/6  bg-base-200 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">Address</legend>

            {/* Full Name - Single Column */}
            <div>
                <label className="fieldset-label">Full Name</label>
                <input name='name' type="text" className="input w-full" placeholder="Full Name" />
            </div>

            <div>
                <label className="fieldset-label">Address</label>
                <textarea name='address' className="textarea w-full" placeholder="Address"></textarea>
            </div>

            {/* Grid Container for 2 Columns (Baaki Fields) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Left Column */}
                <div>
                    <label className="fieldset-label">Email</label>
                    <input name='email' type="email" className="input w-full" placeholder="Email" />
                </div>

                {/* Right Column */}
                <div>
                    <label className="fieldset-label">Phone</label>
                    <input name='phone' type="text" className="input w-full" placeholder="Phone" />
                </div>

                {/* Left Column */}


                {/* Right Column */}
                <div>
                    <label className="fieldset-label">Zip Code</label>
                    <input name='zipcode' type="text" className="input w-full" placeholder="Zip Code" />
                </div>

                {/* Left Column */}
                <div>
                    <label className="fieldset-label">Country</label>
                    <input name='country' type="text" className="input w-full" placeholder="Country" />
                </div>

                {/* Right Column */}
                <div>
                    <label className="fieldset-label">State</label>
                    <input name='state' type="text" className="input w-full" placeholder="State" />
                </div>

                {/* Left Column */}
                <div>
                    <label className="fieldset-label">City</label>
                    <input name='city' type="text" className="input w-full" placeholder="City" />
                </div>
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary text-primary-content mt-4 w-full">Submit</button>
        </fieldset>
        </form>
    )
}

export default AddresFrom