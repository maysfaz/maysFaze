
// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  category: { type: String, required: true },
  brand: String,
  image: { type: String, required: true },
  images: [String],
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  specifications: {
    type: Map,
    of: String
  },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;