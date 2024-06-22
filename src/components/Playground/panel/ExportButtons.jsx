import React from 'react';
import { toPng, toSvg } from 'html-to-image';
import { useFlowchart } from '../../../context/FlowchartContext';


const DownloadURL = (dataURL, filename) => {
    var link = document.createElement('a');
    link.download = filename;
    link.href = dataURL;
    link.click();
}
function ExportButtons({ icon, ...props }) {
    const { SetNodes } = useFlowchart();
    const DownloadImage = () => {
        toPng(document.querySelector('.react-flow__viewport'), {
            backgroundColor: '#eff6ff',
        })
            .then((url) => DownloadURL(url, "diagram.png"));
    }
    const DownloadSVG = () => {
        toSvg(document.querySelector('.react-flow__renderer'), {
            backgroundColor: '#eff6ff',
        })
            .then((url) => DownloadURL(url, "diagram.svg"));
    }
    return (
        <div className="inline-flex rounded-md" role="group">
            <button type="button" onClick={() => DownloadImage()} className='px-2.5 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700'>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}><path d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2"></path><path d="m2 12.5l1.752-1.533a2.3 2.3 0 0 1 3.14.105l4.29 4.29a2 2 0 0 0 2.564.222l.299-.21a3 3 0 0 1 3.731.225L21 18.5"></path><path strokeLinejoin="round" d="M17 11V2m0 9l3-3m-3 3l-3-3"></path></g></svg> */}
                PNG
            </button>
            {/* <button type="button" onClick={() => SetNodes([{id:"01",label:"D"},{id:"02",label:"D"}])} className="px-2.5 py-1 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}><path d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2"></path><path d="m2 12.5l1.752-1.533a2.3 2.3 0 0 1 3.14.105l4.29 4.29a2 2 0 0 0 2.564.222l.299-.21a3 3 0 0 1 3.731.225L21 18.5"></path><path strokeLinejoin="round" d="M17 11V2m0 9l3-3m-3 3l-3-3"></path></g></svg>
            </button> */}
            <button type="button" onClick={() => DownloadSVG()} className="px-2.5 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}><path d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2"></path><path d="m2 12.5l1.752-1.533a2.3 2.3 0 0 1 3.14.105l4.29 4.29a2 2 0 0 0 2.564.222l.299-.21a3 3 0 0 1 3.731.225L21 18.5"></path><path strokeLinejoin="round" d="M17 11V2m0 9l3-3m-3 3l-3-3"></path></g></svg> */}
                SVG
            </button>
        </div>
    )
}

export default ExportButtons