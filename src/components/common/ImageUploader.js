import styles from './styles/ImageUploader.module.css';
import { useState } from 'react';
import { useNotify } from '../../hooks';


export function ImageUploader() {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const { notify } = useNotify();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;

    if (file && file.size > maxSize) {
      notify('File size exceeds the 5MB limit.', 'error');
      return;
    }

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

    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1];
      
      setImageObj({
        data: base64String,
        name: file.name,
        type: file.type,
      });
    }

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
        name='image'
        type='hidden'
        value={JSON.stringify(imageObj)}
      />
      <input
        id='imageUploader'
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
