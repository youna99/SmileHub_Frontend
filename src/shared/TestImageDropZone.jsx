import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export const TestImageDropZone = ({ images, setImages }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const formData = new FormData();
      console.log('formData', formData);

      acceptedFiles.forEach((file) => {
        const imageUrl = URL.createObjectURL(file); // Blob URL 생성
        console.log('imageUrl->', imageUrl);

        formData.append('images', file); // FormData에 파일 추가
        console.log('file', file);

        // 상태 업데이트
        setImages((prevImages) => [...prevImages, imageUrl]);
      });

      // 필요한 경우 formData를 서버에 전송하는 로직을 추가
      // 예: axios.post('/your-upload-url', formData)
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
        {/* {images.map((image, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={image}
              alt={`Preview ${index}`}
              className="w-full h-auto" // 가로 폭을 100%로 하고 비율에 맞게 높이 조정
            />
          </div> */}
        ))}
      </div>
    </section>
  );
};
