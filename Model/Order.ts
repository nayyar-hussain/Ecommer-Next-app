import mongoose, { models, Schema } from "mongoose";


interface IAddress {
    street : String,
    city : String,
    country : String,
    state : String,
    zipcode : String,
    name : String,
    email : String
}

interface IOrder {
    userId : String,
    cartItems :mongoose.Types.ObjectId[],
    address : IAddress,
    status : string
}

const orderSchema = new Schema<IOrder>({
    userId : {type : String, required : true},
    
    cartItems : [{
        type : mongoose.Types.ObjectId,
        ref : 'Cart',
        required : true
    }],
    address: { 
        type: {
            
            street: { 
                type: String, 
                required: [true, 'Street is required'] 
            },
            name: { 
                type: String, 
                required: [true, 'Street is required'] 
            },
            email: { 
                type: String, 
                required: [true, 'Street is required'] 
            },
            city: { 
                type: String, 
                required: [true, 'City is required'] 
            },
            state: { 
                type: String, 
                required: [true, 'State is required'] 
            },
            zipcode: { 
                type: String, 
                required: [true, 'Postal code is required'] 
            },
            country: { 
                type: String, 
                required: [true, 'Country is required'] 
            }
        },
        required: true
    },
    status: { 
        type: String, 
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending' 
    }
}, {timestamps : true})

const Order = models.Order || mongoose.model<IOrder>("Order", orderSchema);
export default Order;