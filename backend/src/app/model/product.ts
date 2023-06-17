import mongoose, { Document, Schema, Model } from 'mongoose';

interface IProduct extends Document {
  gtin: number;
  name: string;
  image: string;
  brand: string;
  category: string;
  color: string;
  stock: number;
  price: number;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    gtin: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

// Pre-save middleware to generate unique GTIN
ProductSchema.pre<IProduct>('save', async function (next) {
    let generatedGTIN: number | undefined;
  
    // Retry generation until a unique GTIN is obtained
    while (!generatedGTIN) {
      const candidateGTIN = Math.floor(1000000000000 + Math.random() * 9000000000000);
      const existingProduct = await ProductModel.findOne({ gtin: candidateGTIN });
  
      if (!existingProduct) {
        generatedGTIN = candidateGTIN;
      }
    }
  
    this.gtin = generatedGTIN;
    console.log('Generated GTIN:', this.gtin);
    next();
  });
  
const ProductModel: Model<IProduct> = mongoose.model<IProduct>('products', ProductSchema);

export default ProductModel;
