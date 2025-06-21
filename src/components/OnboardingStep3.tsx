'use client';
import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, Box, Server, ArrowLeft, Send, ClipboardList, CheckCircle } from 'lucide-react';

interface OnboardingStep3Props {
  sop: string;
  setSop: React.Dispatch<React.SetStateAction<string>>;
  testFiles: File[];
  setTestFiles: React.Dispatch<React.SetStateAction<File[]>>;
  outputFiles: File[];
  setOutputFiles: React.Dispatch<React.SetStateAction<File[]>>;
  fileMethod: string;
  setFileMethod: React.Dispatch<React.SetStateAction<string>>;
  fileLink: string;
  setFileLink: React.Dispatch<React.SetStateAction<string>>;
  onReview: () => void;
  onBack: () => void;
}

const OnboardingStep3: React.FC<OnboardingStep3Props> = ({ sop, setSop, testFiles, setTestFiles, outputFiles, setOutputFiles, fileMethod, setFileMethod, fileLink, setFileLink, onReview, onBack }) => {
  const [activeTab, setActiveTab] = useState<'test' | 'call'>('test');
  const [confirmation, setConfirmation] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const testInputRef = useRef<HTMLInputElement>(null);
  const outputInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, setFiles: React.Dispatch<React.SetStateAction<File[]>>) => {
    e.preventDefault();
    setFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFiles: React.Dispatch<React.SetStateAction<File[]>>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleSend = () => {
    // Here you would handle routing files based on fileTransferMethod
    // For now, just log the method and files
    console.log('Preferred File Transfer Method:', fileMethod);
    console.log('Test Files:', testFiles);
    console.log('Output Files:', outputFiles);
    setShowConfirmation(true);
    if (onReview) onReview();
  };

  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => setShowConfirmation(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);

  return (
    <div className="bg-white rounded-3xl w-full max-w-6xl mx-auto p-12 flex flex-col items-center shadow-sm mt-8">
      {/* Send Test Work / Schedule A Call */}
      <div className="w-full flex flex-col items-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Send Test Work / Schedule A Call</h2>
        <p className="text-black text-center mb-4">You can send us a test work for free or schedule a call with us.</p>
        <div className="flex gap-4 mb-6">
          <div className="flex rounded-full bg-gray-100 p-2 shadow-inner border border-gray-400">
            <button
              type="button"
              className={`btn font-bold rounded-full text-lg px-8 py-3 transition-all duration-200 whitespace-nowrap
                ${activeTab === 'test'
                  ? 'bg-green-600 text-white shadow-green-200 shadow-md'
                  : 'bg-white text-gray-700 border-0 border-gray-300 hover:bg-gray-50'}`}
              style={{ borderTopRightRadius: '9999px', borderBottomRightRadius: '9999px', borderTopLeftRadius: '9999px', borderBottomLeftRadius: '9999px', marginRight: '16px', zIndex: activeTab === 'test' ? 2 : 1 }}
              onClick={() => { setActiveTab('test'); setConfirmation(''); }}
            >
              Send Test Work
            </button>
            <button
              type="button"
              className={`btn font-bold rounded-full text-lg px-8 py-3 transition-all duration-200 whitespace-nowrap
                ${activeTab === 'call'
                  ? 'bg-green-600 text-white shadow-green-200 shadow-md'
                  : 'bg-white border border-gray-300 hover:bg-gray-0'}`}
              style={{ borderTopRightRadius: '9999px', borderBottomRightRadius: '9999px', borderTopLeftRadius: '9999px', borderBottomLeftRadius: '9999px', marginLeft: '-1px', zIndex: activeTab === 'call' ? 2 : 1 }}
              onClick={() => setActiveTab('call')}
            >
              Schedule A Call
            </button>
          </div>
        </div>
      </div>
      {/* Inline Calendly or Test Work Form */}
      {activeTab === 'call' ? (
        <div className="w-full max-w-2xl mx-auto mb-8">
          <iframe
            src="https://calendly.com/talk2kow/30min"
            width="100%"
            height="600"
            frameBorder="0"
            title="Schedule a Call"
            className="rounded-xl"
            allow="camera; microphone; fullscreen"
          ></iframe>
        </div>
      ) : null}
      {activeTab === 'test' && confirmation && (
        <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-center font-semibold">
          {confirmation}
        </div>
      )}
      {activeTab === 'test' && (
        <div className="w-full max-w-4xl mb-8">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Upload Test & Target Work</h3>
          <p className="text-black mb-6 text-base font-medium">Kindly upload the files you'd like us to work on, and share a sample or demo of the desired final output.</p>

          {/* File Method Selection */}
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-base">How would you like to share your files?</label>
            <div className="flex flex-wrap gap-3">
              {['Link', 'Direct Upload'].map((method) => (
                <button
                  key={method}
                  type="button"
                  className={`px-5 py-2 rounded-full border font-semibold transition text-base whitespace-nowrap
                    ${fileMethod === method ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                  onClick={() => { setFileMethod(method); setFileLink(''); }}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional UI based on method */}
          {fileMethod === 'Link' && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Please provide your file URL</label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-600 shadow-sm"
                placeholder="Paste your link or FTP credentials..."
                value={fileLink}
                onChange={e => setFileLink(e.target.value)}
              />
            </div>
          )}
          {fileMethod === 'Direct Upload' && (
            <>
              <div className="mb-4 text-sm text-gray-600 text-center">
                You can upload multiple files and zip files. <br />
                <span className="font-semibold">Maximum total size: 500MB.</span> If your files exceed this, please use the Link option above.
              </div>
              <div className="flex flex-col md:flex-row gap-8 justify-center">
                {/* Test Files Dropzone */}
                <div
                  className="flex-1 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-8 min-h-[220px] cursor-pointer bg-gray-50 hover:border-green-600 transition group"
                  onClick={() => testInputRef.current?.click()}
                  onDrop={e => handleDrop(e, setTestFiles)}
                  onDragOver={e => e.preventDefault()}
                >
                  <input
                    type="file"
                    multiple
                    ref={testInputRef}
                    className="hidden"
                    onChange={e => handleFileChange(e, setTestFiles)}
                  />
                  <div className="flex flex-col items-center">
                    <UploadCloud size={48} color="#9ca3af" />
                    <span className="font-semibold text-gray-700 text-lg mb-1">Click here to select files</span>
                    <span className="text-xs text-gray-400 mb-2">or drag and drop</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {testFiles.length > 0 && (
                      <div className="flex flex-col gap-2 mt-2 w-full">
                        {testFiles.map((file, idx) => (
                          <div key={idx} className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1 bg-white">
                            {file.type.startsWith('image/') && (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-10 h-10 object-cover rounded-md border"
                              />
                            )}
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800 text-xs truncate max-w-[120px]">{file.name}</span>
                              <span className="text-gray-400 text-xs">{file.type || file.name.split('.').pop()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="inline-block border border-gray-300 px-4 py-1 font-bold text-gray-700 rounded-full">
                      Test Files (Required)
                    </div>
                  </div>
                </div>
                {/* Output Files Dropzone */}
                <div
                  className="flex-1 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-8 min-h-[220px] cursor-pointer bg-gray-50 hover:border-green-600 transition group"
                  onClick={() => outputInputRef.current?.click()}
                  onDrop={e => handleDrop(e, setOutputFiles)}
                  onDragOver={e => e.preventDefault()}
                >
                  <input
                    type="file"
                    multiple
                    ref={outputInputRef}
                    className="hidden"
                    onChange={e => handleFileChange(e, setOutputFiles)}
                  />
                  <div className="flex flex-col items-center">
                    <UploadCloud size={48} color="#9ca3af" />
                    <span className="font-semibold text-gray-700 text-lg mb-1">Click here to select files</span>
                    <span className="text-xs text-gray-400 mb-2">or drag and drop</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {outputFiles.length > 0 && (
                      <div className="flex flex-col gap-2 mt-2 w-full">
                        {outputFiles.map((file, idx) => (
                          <div key={idx} className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1 bg-white">
                            {file.type.startsWith('image/') && (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-10 h-10 object-cover rounded-md border"
                              />
                            )}
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800 text-xs truncate max-w-[120px]">{file.name}</span>
                              <span className="text-gray-400 text-xs">{file.type || file.name.split('.').pop()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="inline-block border border-gray-300 px-4 py-1 font-bold text-gray-700 rounded-full">
                      Sample Output (Optional)
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {/* Standard Operating Procedures Section (moved below) */}
      <div className="w-full max-w-4xl mb-8">
        <h3 className="text-xl md:text-2xl font-bold mb-2">Standard Operating Procedures</h3>
        <p className="text-gray-600 mb-3 text-base font-medium">Share your standard operating procedures and preferred file transfer methods.</p>
        <label className="block text-sm font-medium mb-1">Write Description or Upload Document</label>
        <textarea
          className="w-full h-40 border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:border-green-600 resize-none shadow-sm mb-4"
          value={sop}
          onChange={e => setSop(e.target.value)}
          placeholder="Describe your SOPs or upload a document below."
        />
      </div>
      {/* Send Button (only for test work) */}
      {activeTab === 'test' && (
        <div className="flex justify-center gap-4 w-full max-w-2xl mt-8">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onBack}
          >
            <ArrowLeft size={18} /> Back
          </button>
          <button
            className="btn btn-primary"
            onClick={onReview}
            type="button"
          >
            <ClipboardList size={20} /> Review
          </button>
        </div>
      )}
      {/* Confirmation Overlay */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white/80 via-green-50 to-green-100">
          <div className="bg-white rounded-2xl p-8 max-w-xs w-full flex flex-col items-center shadow-2xl border border-green-100 relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="rounded-full bg-green-100/80 p-2 shadow-lg shadow-green-200 animate-pulse">
                <CheckCircle size={72} color="#22c55e" />
              </div>
            </div>
            <div className="pt-12 pb-2 px-2 text-lg font-bold text-gray-900 text-center tracking-tight">Thank you! We've received your files and will be in touch shortly.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingStep3; 