import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export const ImageDropZone = ({ images, setImages }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newImages = [];

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.onload = () => {
          const binaryStr = reader.result;
          console.log('binaryStr ->', binaryStr);

          const imageUrl = URL.createObjectURL(file);
          newImages.push(imageUrl); // 새 이미지 URL 추가
          console.log('newImages files', newImages);

          setImages((prevImages) => [...prevImages, imageUrl]); // 상태 업데이트
        };

        reader.readAsArrayBuffer('하위 컴포넌트 file ->', file);
        // console.log('하위 컴포넌트 file ->', file);
      });
    },
    [setImages],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <section
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors duration-300 ${
        isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-600">Drop the files here ...</p>
      ) : (
        <p className="text-gray-600">이곳으로 사진을 드래그하세요</p>
      )}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={image}
              alt={`Preview ${index}`}
              className="w-full h-auto" // 가로 폭을 100%로 하고 비율에 맞게 높이 조정
            />
          </div>
        ))}
      </div>
    </section>
  );
};
