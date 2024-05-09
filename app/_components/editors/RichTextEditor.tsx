import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module';
import { Quill } from 'react-quill';
Quill.register('modules/ImageResize', ImageResize);

var Size = Quill.import('attributors/style/size');
Size.whitelist = [
  '9px',
  '10px',
  '11px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '22px',
  '24px',
  '26px',
  '28px',
];
Quill.register(Size, true);

const modules = {
  toolbar: [
    [{ size: Size.whitelist }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    [{ direction: 'rtl' }],
    ['link', 'image', 'video'],
  ],
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
  },
};
export default function RichTextEditor({
  setState,
  defaultValue,
}: {
  setState: any;
  defaultValue?: any;
}) {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      onChange={(value: any) => setState(value)}
      value={defaultValue}
      placeholder="متن "
    />
  );
}
