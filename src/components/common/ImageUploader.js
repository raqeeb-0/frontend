import styles from './styles/ImageUploader.module.css';
import { useState } from 'react';
import { LuX } from 'react-icons/lu';

export function ImageUploader() {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      readImageFile(file);
    } else {
      setImageSrc(null);
    }
  };

  const readImageFile = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    
    reader.onload = () => {
      setImageSrc(reader.result);
    };

    reader.onerror = () => {
      console.log(reader.error);
    }
  };

  return (
    <div
      className={`${styles.imageUploader} ${
        imageSrc ? styles.containsImage : ''
      }`}
    >
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
      />
      {
        imageSrc
        ? <img
            src={imageSrc}
            alt='Selected image'
          />
        : <div className={styles.message}>
            Click here to select an image
          </div>
      }
    </div>
  );
}
