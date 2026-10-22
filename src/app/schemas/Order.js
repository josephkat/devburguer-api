import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        user: {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
        },
        products: [
            {
                id: {
                    type: Number,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: String,
                    required: true,
                },
                category: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        status: {
            type: String,
            required: true,
            enum: ['pending', 'preparing', 'delivering', 'delivered'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);