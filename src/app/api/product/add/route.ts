import { ConnectToDatabase } from "../../../../../config/Database";
import { NextRequest, NextResponse } from 'next/server';
import { cloudinary } from "../../../../../lib/cloudinary";
import Product from "../../../../../Model/Product";

// Define the expected Cloudinary upload result type
interface CloudinaryUploadResult {
  secure_url: string;
  [key: string]: any; // For other potential Cloudinary response properties
}

export async function POST(req: NextRequest) {
  try {
    await ConnectToDatabase();
    const formData = await req.formData();
    
    const file = formData.get('ProductImage') as File;
    const name = formData.get('ProductName') as string;
    const description = formData.get('ProductDescription') as string;
    const priceStr = formData.get('ProductPrice') as string;
    
    // Validate inputs
    if (!file || !name || !description || !priceStr) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    const price = parseFloat(priceStr);
    if (isNaN(price)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid price format' 
      }, { status: 400 });
    }

    // Upload image to Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'products' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResult);
        }
      ).end(buffer);
    });

    const product = new Product({
      name,
      description,
      price,
      imageUrl: uploadResult.secure_url
    });

    await product.save();
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Error in POST /api/product/add:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Server error' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ConnectToDatabase();
    const products = await Product.find({});
    return NextResponse.json({ success: true, products }); // Changed success to boolean
  } catch (error) {
    return NextResponse.json({ success: false, error }); // Changed success to boolean
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    console.log(id);
    
    if (!id) {
      return NextResponse.json({ success: false, msg: "id not found" }); // Changed success to boolean
    }
    
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Item deleted" }); // Changed success to boolean
  } catch (error) {
    return NextResponse.json({ success: false, error }); // Changed success to boolean
  }
}