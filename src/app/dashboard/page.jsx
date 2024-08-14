'use client';

import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { PickerOverlay } from 'filestack-react';
import { Button, Select } from 'flowbite-react';

import { useProductContext } from '@/context/ProductProvider';


function Dashboard() {
	const { products, setProducts } = useProductContext();

	const [showPicker, setShowPicker] = useState(false);
	const [storeProducts, setStoreProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState();
	const [imageFile, setImageFile] = useState('');

	
	useEffect(() => {
		const getData = async () => {
		  const url = 'https://dummyjson.com/products?limit=5';
		  const response = await fetch(url);
		  const data = await response.json();
		  setStoreProducts(data.products);
		};
		getData();
	}, []);

	
	const handleSelectProduct = (e) => {
		setSelectedProduct(e.target.value);
	};


	
	const addToStorage = (file) => {
		const newProduct = { file, title: selectedProduct };
	  	setProducts((prevProducts) => [...prevProducts, newProduct]);
	  	setImageFile(file)
  };
  

  return (
    <div>		  
			{products.length > 0 && imageFile ? (
				<Image
				src={`https://cdn.filestackcontent.com/${imageFile}`}
				alt="uploaded image"
				width={200}
				height={200}
				/>
			) : (
				<Image
				src="/assets/imagePlaceHolder.jpg"
				alt="placeholder image"
				width={200}
				height={200}
				/>
			)}

		  <Select onChange={handleSelectProduct}>
		  <option value=''>Please select a product ...</option>
        {storeProducts.map((storeProduct, index) => (
          <Fragment key={index}>
            <option value={storeProduct.title}>{storeProduct.title}</option>
          </Fragment>
        ))}
      </Select>

      <Button color='success' onClick={() => setShowPicker(true)}>
        Upload Image for {selectedProduct}
      </Button>

      {showPicker && (
        <PickerOverlay
          apikey={process.env.NEXT_PUBLIC_FILESTACK_API}
          pickerOptions={{
            accept: ['image/*'],
            maxSize: 1000 * 1000 * 10,
            imageMax: [1000, 1000],
			  onClose: () => setShowPicker(false),
			  onOpen: () => {
				  if (!selectedProduct) {
					  alert(" please select a product first")
					  setShowPicker(false)
				  }
				  
			  },
            onUploadDone: (res) => {
				const fileHandle = res.filesUploaded[0].handle;
				addToStorage(fileHandle)
              setShowPicker(false);
            },
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;