'use client';
import React from 'react';
import { ArrowLeft, ArrowRight, Video, Palette, AudioLines, Film, Gauge, FastForward, Eraser, Scissors, Ghost, Layers, Sparkles, PackageCheck, Lightbulb, Box, Scale3d, Globe2, Rotate3D, Building2, Waves } from 'lucide-react';

interface OnboardingStep2Props {
  selectedService: string;
  setSelectedService: React.Dispatch<React.SetStateAction<string>>;
  selectedScale: string;
  setSelectedScale: React.Dispatch<React.SetStateAction<string>>;
  brief: string;
  setBrief: React.Dispatch<React.SetStateAction<string>>;
  onContinue?: () => void;
  onBack?: () => void;
}

const creativeServices = [
  {
    key: '2d',
    title: '2D Image & Video Services',
    desc: 'Clean, consistent backgrounds that make your products stand out. Perfect for e-commerce platforms, marketplaces, and catalogs.',
    features: [
      { icon: <Eraser className="w-5 h-5" color="#34A853" />, label: 'Background Removal' },
      { icon: <Scissors className="w-5 h-5" color="#34A853" />, label: 'Clipping & Masking' },
      { icon: <Ghost className="w-5 h-5" color="#34A853" />, label: 'Ghost Mannequin Effect' },
      { icon: <Layers className="w-5 h-5" color="#34A853" />, label: 'Batch Processing' },
      { icon: <Sparkles className="w-5 h-5" color="#34A853" />, label: 'Image Enhancement' },
      { icon: <Video className="w-5 h-5" color="#34A853" />, label: 'Profession Video Editing' },
      { icon: <Palette className="w-5 h-5" color="#34A853" />, label: 'Color Correction & Grading' },
      { icon: <AudioLines className="w-5 h-5" color="#34A853" />, label: 'Audio Enhancement' },
      { icon: <Film className="w-5 h-5" color="#34A853" />, label: 'Motion Graphics' },
      { icon: <Gauge className="w-5 h-5" color="#34A853" />, label: 'Video Optimization' },
      { icon: <FastForward className="w-5 h-5" color="#34A853" />, label: 'Fast Turnaround' },
    ],
  },
  {
    key: '3d',
    title: '3D Services',
    desc: 'Clean, consistent backgrounds that make your products stand out. Perfect for e-commerce platforms, marketplaces, and catalogs.',
    features: [
      { icon: <PackageCheck className="w-5 h-5" color="#34A853" />, label: 'Packaging mockups' },
      { icon: <Lightbulb className="w-5 h-5" color="#34A853" />, label: 'Concept rendering' },
      { icon: <Box className="w-5 h-5" color="#34A853" />, label: 'Interactive 3D models for e-commerce' },
      { icon: <Scale3d className="w-5 h-5" color="#34A853" />, label: '2D To 3D Modelling' },
      { icon: <Globe2 className="w-5 h-5" color="#34A853" />, label: 'Environment and world-building' },
      { icon: <Rotate3D className="w-5 h-5" color="#34A853" />, label: '360-degree walkthroughs' },
      { icon: <Building2 className="w-5 h-5" color="#34A853" />, label: 'Exterior and interior renders' },
      { icon: <Waves className="w-5 h-5" color="#34A853" />, label: 'Fluid and particle simulations' },
    ],
  },
];

const projectScales = [
  { key: 'small', label: 'Small Project', desc: 'Less than 1,000 assets/deliverables' },
  { key: 'medium', label: 'Medium Project', desc: 'Less than 10,000 assets/deliverables' },
  { key: 'large', label: 'Large Project', desc: 'Less than 20,000 assets/deliverables' },
  { key: 'enterprise', label: 'Enterprise Scale', desc: '50,000+ assets/deliverables' },
];

const OnboardingStep2: React.FC<OnboardingStep2Props> = ({ selectedService, setSelectedService, selectedScale, setSelectedScale, brief, setBrief, onContinue, onBack }) => {
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (onContinue) onContinue();
  };

  return (
    <form onSubmit={handleContinue} className="bg-white rounded-3xl p-12 max-w-6xl mx-auto mt-12 flex flex-col items-center shadow-sm">
      <h2 className="text-2xl font-bold mb-2 text-center">What creative services do you need?</h2>
      <p className="text-black mb-8 text-center font-medium">Help us understand your project requirements and scope.</p>
      {/* Creative Services */}
      <div className="flex flex-col md:flex-row gap-8 w-full mb-12">
        {creativeServices.map((service) => (
          <div
            key={service.key}
            className={`flex-1 rounded-xl border-2 p-8 cursor-pointer transition-all shadow-sm ${selectedService === service.key ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white'}`}
            onClick={() => setSelectedService(service.key)}
          >
            <div className="flex items-center gap-3 mb-2">
              <input
                type="radio"
                name="creativeService"
                checked={selectedService === service.key}
                onChange={() => setSelectedService(service.key)}
                className="accent-green-600 w-5 h-5"
                tabIndex={-1}
                aria-label={service.title}
              />
              <span className="font-bold text-lg">{service.title}</span>
            </div>
            <div className="text-black mb-4 text-md font-medium">{service.desc}</div>
            <ul className="space-y-3">
              {service.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-black font-medium"><span>{f.icon}</span> {f.label}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Project Scale */}
      <h3 className="text-xl font-bold mb-2 text-center">Project Scale</h3>
      <p className="text-black mb-8 text-center font-medium">Select the size of your project to help us better cater to your needs.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12 font-medium">
        {projectScales.map((scale) => (
          <div
            key={scale.key}
            className={`rounded-xl border-2 p-6 cursor-pointer transition-all shadow-sm ${selectedScale === scale.key ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white'}`}
            onClick={() => setSelectedScale(scale.key)}
          >
            <div className="flex items-center gap-3 mb-1">
              <input
                type="radio"
                name="projectScale"
                checked={selectedScale === scale.key}
                onChange={() => setSelectedScale(scale.key)}
                className="accent-green-600 w-5 h-5"
                tabIndex={-1}
                aria-label={scale.label}
              />
              <span className="font-semibold text-base">{scale.label}</span>
            </div>
            <div className="text-black text-sm">{scale.desc}</div>
          </div>
        ))}
      </div>
      {/* Project Brief */}
      <h3 className="text-xl font-bold mb-2 text-center">Project Brief (Optional)</h3>
      <p className="text-black mb-4 text-center font-medium">Tell us about your project, vision, goals & timeline.</p>
      <textarea
        className="w-full min-h-[120px] border-2 border-gray-300 rounded-md px-4 py-2 mb-8 focus:outline-none focus:border-green-600"
        placeholder="Describe your project..."
        value={brief}
        onChange={e => setBrief(e.target.value)}
      />
      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onBack}
        >
          <ArrowLeft size={18} /> Back
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
};

export default OnboardingStep2; 