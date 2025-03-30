import mongoose, { models } from "mongoose";
const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },

}, {
    // Adds createdAt and updatedAt fields automatically
    timestamps: true
});

// Compound index to ensure same user can't add same product multiple times
cartSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Cart = models.Cart || mongoose.model('Cart', cartSchema);

export default Cart