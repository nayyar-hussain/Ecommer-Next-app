"use client";
import React, { useState } from 'react';

function AddProduct() {
  interface IAddProduct {
    ProductName: string;
    ProductDescription: string;
    ProductPrice: string;
  }

  const [addProduct, setAddProduct] = useState<IAddProduct>({
    ProductName: '',
    ProductDescription: '',
    ProductPrice: ''
  });
  const [productImage, setProductImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddProduct(prev => ({
      ...prev,
      [name === 'pname' ? 'ProductName' :
        name === 'pdesc' ? 'ProductDescription' :
          name === 'pprice' ? 'ProductPrice' : name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
    }
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productImage) {
      alert('Please select an image');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('ProductName', addProduct.ProductName);
    formData.append('ProductDescription', addProduct.ProductDescription);
    formData.append('ProductPrice', addProduct.ProductPrice);
    formData.append('ProductImage', productImage);

    try {
      const response = await fetch('/api/product/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setAddProduct({
          ProductName: '',
          ProductDescription: '',
          ProductPrice: ''
        });
        setProductImage(null);
        alert('Product added successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while adding the product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex justify-center'>
      <form onSubmit={handleAddProduct}>
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box" disabled={isSubmitting}>
          <legend className="fieldset-legend">Add Products</legend>

          <div className="form-control">
            <label className="fieldset-label">Product Name</label>
            <input
              value={addProduct.ProductName}
              name="pname"
              type="text"
              className="input input-bordered"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="fieldset-label">Product Description</label>
            <textarea
              value={addProduct.ProductDescription}
              name="pdesc"
              className="textarea textarea-bordered"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="fieldset-label">Product Price</label>
            <input
              value={addProduct.ProductPrice}
              name="pprice"
              type="number"
              step="0.01"
              className="input input-bordered"
              onChange={handleInputChange}
              required
              min="0"
            />
          </div>

          <div className="form-control">
            <label className="fieldset-label">Product Image</label>
            <input
              type="file"
              name="pimage"
              className="file-input file-input-bordered"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary text-primary-content mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default AddProduct;