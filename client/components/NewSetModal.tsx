import React, { useState } from 'react';
import { X, Plus, Camera, ArrowUp } from 'lucide-react';

interface NewSetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSet: (setData: any) => void;
}

const NewSetModal: React.FC<NewSetModalProps> = ({
  isOpen,
  onClose,
  onCreateSet,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    ambientSound: '',
    description: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.name.trim()) {
      onCreateSet(formData);
      setFormData({
        name: '',
        ambientSound: '',
        description: '',
      });
      onClose();
    }
  };

  const handleGenerateSet = () => {
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-app-bg rounded-2xl p-6 w-[1116px] h-[920px] flex flex-col gap-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-text-primary text-xl font-normal leading-6" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
            Create set
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-12 h-12 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <X size={16} className="text-text-primary" strokeWidth={1.6} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex gap-12">
          {/* Left Side - Form */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <label className="text-text-primary text-base font-normal leading-6" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
                Name your set
              </label>
              <input
                type="text"
                placeholder="Enter a set name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="flex items-center min-w-[240px] px-4 py-3 rounded-lg bg-nav-bg border-0 text-text-secondary text-base font-normal outline-none focus:ring-2 focus:ring-brand-primary"
                style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}
              />
            </div>

            {/* Ambient Sound Field */}
            <div className="flex flex-col gap-2">
              <label className="text-text-primary text-base font-normal leading-6" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
                Ambient sound
              </label>
              <div className="relative">
                <select
                  value={formData.ambientSound}
                  onChange={(e) => handleInputChange('ambientSound', e.target.value)}
                  className="flex items-center min-w-[240px] px-4 py-3 rounded-lg bg-nav-bg border-0 text-text-secondary text-base font-normal outline-none focus:ring-2 focus:ring-brand-primary appearance-none w-full pr-10"
                  style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  <option value="">Select an ambient sound</option>
                  <option value="city-traffic">City Traffic</option>
                  <option value="ocean-waves">Ocean Waves</option>
                  <option value="forest-birds">Forest Birds</option>
                  <option value="rain">Rain</option>
                  <option value="wind">Wind</option>
                  <option value="cafe-chatter">Cafe Chatter</option>
                  <option value="campfire">Campfire</option>
                  <option value="none">None / Silence</option>
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-primary pointer-events-none" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Environment Description Field */}
            <div className="flex flex-col gap-2">
              <label className="text-text-primary text-base font-normal leading-6" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
                Upload photo or describe environment
              </label>
              <div className="flex flex-col gap-2 p-2 rounded-2xl bg-black bg-opacity-50">
                <textarea
                  placeholder="A misty cliffside at dawn, overlooking a vast ocean. Jagged rocks frame the horizon, waves crash below, and a lone lighthouse blinks in the distance. The atmosphere is quiet, eerie, and poetic, perfect for a reflective or suspenseful scene."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="flex items-start min-w-[240px] min-h-[189px] px-4 py-3 rounded-lg bg-nav-bg border-0 text-text-secondary text-base font-normal outline-none focus:ring-2 focus:ring-brand-primary resize-none flex-1"
                  style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif', lineHeight: '140%' }}
                />
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-1.5">
                    <button className="flex items-center justify-center p-2 rounded-lg hover:bg-brand-primary transition-colors">
                      <Plus size={16} className="text-text-primary" strokeWidth={1.6} />
                    </button>
                    <button className="flex items-center justify-center p-2 rounded-lg bg-black bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-colors">
                      <Camera size={16} className="text-text-primary" strokeWidth={1.6} />
                    </button>
                  </div>
                  <button className="flex items-center justify-center p-2 rounded-lg hover:bg-brand-primary transition-colors">
                    <ArrowUp size={16} className="text-text-primary" strokeWidth={1.6} />
                  </button>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateSet}
              className="flex items-center justify-center gap-2 px-3 py-3 border border-border-neutral rounded-lg bg-surface-neutral text-text-dark text-base font-normal hover:bg-opacity-90 transition-colors"
              style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Bring set to life!
            </button>
          </div>

          {/* Right Side - Preview */}
          <div className="flex-1 flex flex-col justify-center items-center bg-nav-bg rounded-2xl">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-primary"></div>
                <span className="text-text-primary text-base">Generating set...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 w-36">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M10 42H38C40.2091 42 42 40.2091 42 38V10C42 7.79086 40.2091 6 38 6H10C7.79086 6 6 7.79086 6 10V38C6 40.2091 7.79086 42 10 42ZM10 42L32 20L42 30M20 17C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17C14 15.3431 15.3431 14 17 14C18.6569 14 20 15.3431 20 17Z" stroke="#B3B3B3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-text-secondary text-base text-center leading-6">
                  Preview goes here
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleSubmit}
            disabled={!formData.name.trim()}
            className="flex items-center justify-center gap-2 px-3 py-3 border border-border-neutral rounded-lg bg-surface-neutral text-text-dark text-base font-normal hover:bg-opacity-90 transition-colors disabled:opacity-50"
            style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            Create set
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSetModal;
