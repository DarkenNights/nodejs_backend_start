const mongoose = require('mongoose');
const { sellerInfosSchema } = require('./SellerInfos');
const { imageSchema } = require('./Image');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    slug: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    email_verified_at: {
      type: Date,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    first_name: {
      type: String,
      min: 6,
      max: 45,
    },
    last_name: {
      type: String,
      min: 6,
      max: 45,
    },
    address: {
      type: String,
      min: 6,
    },
    zipcode: {
      type: String,
      min: 3,
      max: 20,
    },
    country: {
      type: String,
      min: 6,
      max: 45,
    },
    phone: {
      type: String,
      min: 6,
      max: 45,
    },
    city: {
      type: String,
      min: 6,
      max: 45,
    },
    avatar: imageSchema,
    remember_token: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 3,
      required: true,
    },
    is_seller: {
      type: Boolean,
      default: false,
      required: true,
    },
    seller_infos: sellerInfosSchema,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('User', userSchema);
