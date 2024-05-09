'use client';

import { PinturaEditor } from '@pqina/react-pintura';
import { getEditorDefaults } from '@pqina/pintura';

import '@pqina/pintura/pintura.css';
import apiCall from '@/app/_apiCall/apiCall';

function ImageEditor({
  image,
  resultSet,
  className,
  imageSet,
  createFile,
}: {
  image: any;
  imageSet: any;
  resultSet: any;
  className?: string;
  createFile?: boolean;
}) {
  return (
    <div className={`h-[300px] w-full rounded-lg ${className}`}>
      <PinturaEditor
        className=""
        {...getEditorDefaults()}
        src={image ?? ''}
        onProcess={(response) => {
          if (createFile) {
            const formData = new FormData();
            formData?.append('file', response?.dest);

            apiCall({
              url: '/api/createFile',
              method: 'post',
              data: formData,
              formDataIsNeeded: true,
              callback: (res, er) => {
                if (res && res?.file) {
                  resultSet(res.file);
                }
              },
            });
          } else {
            resultSet(response.dest);
          }

          imageSet('');
        }}
      />
    </div>
  );
}

export default ImageEditor;
