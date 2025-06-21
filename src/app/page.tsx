'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import HeroSection from "../components/HeroSection";
import Stepper from "../components/Stepper";
import OnboardingForm from "../components/OnboardingForm";
import OnboardingStep2 from "../components/OnboardingStep2";
import OnboardingStep3 from "../components/OnboardingStep3";
import ReactModal from 'react-modal';
import { ArrowLeft, Send, User, Phone as PhoneIcon, Mail, Building, Layers, Ruler, Link as LinkIcon, FileText } from 'lucide-react';

// Modal styles for centering and blocking background
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    margin: 'auto',
    maxWidth: '95vw',
    width: '100%',
    maxHeight: '95vh',
    borderRadius: '1.5rem',
    border: 'none',
    padding: '2rem',
    background: '#fff',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    inset: 0,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [showHero, setShowHero] = useState(true);
  // OnboardingForm state
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
  });
  // OnboardingStep2 state
  const [selectedService, setSelectedService] = useState('2d');
  const [selectedScale, setSelectedScale] = useState('small');
  const [brief, setBrief] = useState('');
  // OnboardingStep3 state
  const [sop, setSop] = useState('');
  const [testFiles, setTestFiles] = useState<File[]>([]);
  const [outputFiles, setOutputFiles] = useState<File[]>([]);
  const [fileMethod, setFileMethod] = useState('');
  const [fileLink, setFileLink] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showConfirmationScreen, setShowConfirmationScreen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('Thank you, we have received your file.');

  const handleStart = () => {
    setShowHero(false);
    setStep(1);
    setTimeout(() => {
      const el = document.getElementById('onboarding-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex flex-col items-center py-4 sm:py-8 px-1 sm:px-2">
      {showHero && <HeroSection onStart={handleStart} />}
      {!showHero && (
        <section id="onboarding-form" className="w-full max-w-6xl mt-8 sm:mt-12 px-0 sm:px-4">
          <Stepper currentStep={step} />
          {step === 1 && (
            <OnboardingForm
              form={form}
              setForm={setForm}
              onContinue={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <OnboardingStep2
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedScale={selectedScale}
              setSelectedScale={setSelectedScale}
              brief={brief}
              setBrief={setBrief}
              onContinue={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <OnboardingStep3
              sop={sop}
              setSop={setSop}
              testFiles={testFiles}
              setTestFiles={setTestFiles}
              outputFiles={outputFiles}
              setOutputFiles={setOutputFiles}
              fileMethod={fileMethod}
              setFileMethod={setFileMethod}
              fileLink={fileLink}
              setFileLink={setFileLink}
              onReview={() => setShowReviewModal(true)}
              onBack={() => setStep(2)}
            />
          )}
          <ReactModal
            isOpen={showReviewModal}
            onRequestClose={() => setShowReviewModal(false)}
            style={modalStyles}
            ariaHideApp={false}
            contentLabel="Review and Confirm"
          >
            <h2 className="text-2xl font-bold mb-2 text-center">Review Your Submission</h2>
            <div className="space-y-6">
              {/* Personal Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">Personal Information</h3>
                <ul className="list-none pl-0 space-y-1 text-gray-800">
                  <li className="flex items-center gap-2"><User size={16} className="text-gray-500" /><span className="font-medium">Full Name:</span> {form.fullName}</li>
                  <li className="flex items-center gap-2"><PhoneIcon size={16} className="text-gray-500" /><span className="font-medium">Phone:</span> {form.phone}</li>
                  <li className="flex items-center gap-2"><Mail size={16} className="text-gray-500" /><span className="font-medium">Email:</span> {form.email}</li>
                  {form.company && <li className="flex items-center gap-2"><Building size={16} className="text-gray-500" /><span className="font-medium">Company:</span> {form.company}</li>}
                </ul>
              </div>
              {/* Creative Needs */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">Creative Needs</h3>
                <ul className="list-none pl-0 space-y-1 text-gray-800">
                  <li className="flex items-center gap-2"><Layers size={16} className="text-gray-500" /><span className="font-medium">Service Type:</span> {selectedService === '2d' ? '2D Image & Video Services' : '3D Services'}</li>
                  <li className="flex items-center gap-2"><Ruler size={16} className="text-gray-500" /><span className="font-medium">Project Scale:</span> {selectedScale}</li>
                  {brief && <li><span className="font-medium">Project Brief:</span> {brief}</li>}
                </ul>
              </div>
              {/* Files & SOP */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">Files & Preferences</h3>
                <ul className="list-none pl-0 space-y-1 text-gray-800">
                  <li className="flex items-center gap-2"><FileText size={16} className="text-gray-500" /><span className="font-medium">File Method:</span> {fileMethod || 'N/A'}</li>
                  {fileLink && <li className="flex items-center gap-2"><LinkIcon size={16} className="text-gray-500" /><span className="font-medium">File Link:</span> {fileLink}</li>}
                  {testFiles.length > 0 && <li><span className="font-medium">Test Files:</span> {testFiles.map(f => f.name).join(', ')}</li>}
                  {outputFiles.length > 0 && <li><span className="font-medium">Sample Output Files:</span> {outputFiles.map(f => f.name).join(', ')}</li>}
                  {sop && <li><span className="font-medium">SOP / Notes:</span> {sop}</li>}
                </ul>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button
                className="btn btn-secondary btn-sm flex-1"
                onClick={() => setShowReviewModal(false)}
                type="button"
              >
                <ArrowLeft size={16} className="inline-block mr-2" /> Edit
              </button>
              <button
                className="btn btn-primary btn-sm flex-1"
                onClick={() => {
                  setShowReviewModal(false);
                  setShowConfirmationScreen(true);
                  setConfirmationMessage('Thank you, we have received your file.');
                  setTimeout(() => {
                    setConfirmationMessage('Our team will contact you shortly. Meanwhile, take a look at some of our work at thekowcompany.com');
                  }, 2500);
                }}
                type="button"
              >
                <Send size={16} className="inline-block mr-2" /> Confirm &amp; Send
              </button>
            </div>
          </ReactModal>
          {showConfirmationScreen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white/90 via-green-50 to-green-100">
              <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 max-w-lg w-full flex flex-col items-center border border-green-100 mx-2">
                <div className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-6 transition-all min-h-[3.5rem] flex items-center justify-center">
                  {confirmationMessage}
                </div>
                {confirmationMessage.startsWith('Our team') && (
                  <button
                    className="btn btn-primary mt-6 px-8 py-3 text-lg"
                    onClick={() => window.open('https://thekowcompany.com', '_blank')}
                  >
                    Visit Website
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
