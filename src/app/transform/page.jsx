'use client';

import React, { useState } from 'react';
import * as filestack from 'filestack-js';

const client = filestack.init('AoKHpSFqS8a0XxWxLNUzgz');

function Transform() {
  const [imageUrl, setImageUrl] = useState('https://cdn.filestackcontent.com/Jn1zahFFS3uo0M6OV4Xu');
  const [transformedUrl, setTransformedUrl] = useState('');

  const handleTransform = async () => {
    try {
      // Apply a simple transformation (resize) to the image URL
      const transformed = client.transform(imageUrl, {
        resize: {
          width: 200,
          height: 200,
        },
      });

      setTransformedUrl(transformed);
    } catch (error) {
      console.error('Error transforming the image:', error);
    }
  };

  return (
    <>
      <button onClick={handleTransform}>Transform Image</button>
      {transformedUrl ? (
        <img id="result" src={transformedUrl} alt="Transformed" />
      ) : (
        <div id="result">Transform</div>
      )}
    </>
  );
}

export default Transform;
