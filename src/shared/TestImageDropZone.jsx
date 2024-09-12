import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const TestImageDropZone = ({ handleSetImageFiles }) => {
  const [previewUrls, setPreviewUrls] = useState([]); // 미리보기 URL을 상태로 관리
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newPreviewUrls = []; // 각 파일에 대한 Blob URL 저장할 배열.
      const newImageFiles = []; // 각 파일에 대한 실제 객체 저장할 배열.

      acceptedFiles.forEach((file) => {
        const imageUrl = URL.createObjectURL(file); // Blob URL 생성 // 단순히 미리보기용!
        // Blob URL은 미리보기 할 수 있도록 임시 URL만 생성해주는 역할.
        // 즉, 이미지 파일의 실제 데이터는 file 객체에 담겨있음.

        newPreviewUrls.push(imageUrl); // 미리보기 URL 배열에 추가
        newImageFiles.push(file); // 원본 파일 배열에 추가

        console.log('imageUrl:', imageUrl);
        console.log('file:', file);
      });
      // 부모 컴포넌트로 원본 파일 객체 전달
      handleSetImageFiles(newImageFiles);

      // 미리보기 URL 상태 업데이트 (밑에서 map으로 미리보기를 보여주기 위해서!)
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    },
    // handleSetImageFiles 값이 변할 때 마다 재실행 (새로운 파일 업로드 할때 마다라는 것이죠!)
    [handleSetImageFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

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
        {previewUrls.map((image, index) => (
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
