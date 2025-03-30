import { ConnectToDatabase } from "../../../../../config/Database";
import { NextRequest, NextResponse } from 'next/server';
import { cloudinary } from "../../../../../lib/cloudinary";
import Product from "../../../../../Model/Product";

export async function POST(req: NextRequest) {
    try {

      
      await ConnectToDatabase();
      const formData = await req.formData();
      
      const file = formData.get('ProductImage') as File; // Changed from 'image'
      const name = formData.get('ProductName') as string; // Changed from 'name'
      const description = formData.get('ProductDescription') as string; // Changed from 'description'
      const priceStr = formData.get('ProductPrice') as string; // Changed from 'price'
      
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
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'products' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      const product = new Product({
        name,
        description,
        price,
        imageUrl: (uploadResult as any).secure_url
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

export async function GET(req:NextRequest) {
  try {
    await ConnectToDatabase()
    const products = await Product.find({})
    return NextResponse.json({success : 200 ,  products})
  } catch (error) {
    return NextResponse.json({success : 500 , error})
  }
}

export async function DELETE(req : NextRequest){
  try {
    const id = req.nextUrl.searchParams.get('id')
    if(!id){
      return NextResponse.json({success : 400 , msg : "id not found"})

    }

    await Product.findByIdAndDelete(id)
  } catch (error) {
    return NextResponse.json({success : 500 , error})
  }
}