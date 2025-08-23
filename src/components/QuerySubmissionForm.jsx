// src/components/QuerySubmissionForm.jsx
import { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Camera, 
  Upload, 
  X, 
  Send, 
  AlertTriangle, 
  Clock, 
  Zap,
  ImageIcon,
  FileText,
  MapPin
} from 'lucide-react';

export default function QuerySubmissionForm({ onSubmit, onClose, isSubmitting = false }) {
  const { translate } = useLanguage();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    query_text: '',
    urgency: 'medium',
    crop_type: '',
    location: '',
    symptoms_duration: '',
    weather_conditions: '',
    previous_treatments: ''
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const urgencyLevels = [
    { 
      value: 'low', 
      label: 'Low Priority', 
      icon: Clock, 
      color: 'text-green-600 bg-green-100',
      description: 'General inquiry, not time-sensitive' 
    },
    { 
      value: 'medium', 
      label: 'Medium Priority', 
      icon: AlertTriangle, 
      color: 'text-yellow-600 bg-yellow-100',
      description: 'Moderate concern, needs attention' 
    },
    { 
      value: 'high', 
      label: 'High Priority', 
      icon: Zap, 
      color: 'text-red-600 bg-red-100',
      description: 'Urgent issue, immediate help needed' 
    }
  ];

  const commonCrops = [
    'Wheat', 'Rice', 'Cotton', 'Tomato', 'Potato', 'Onion', 
    'Sugarcane', 'Maize', 'Soybean', 'Groundnut', 'Banana', 'Mango'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }));
        return;
      }

      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.query_text.trim()) {
      newErrors.query_text = 'Please describe your farming issue';
    } else if (formData.query_text.trim().length < 10) {
      newErrors.query_text = 'Please provide more details (at least 10 characters)';
    }

    if (!formData.crop_type.trim()) {
      newErrors.crop_type = 'Please specify your crop type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const queryData = {
      ...formData,
      image: selectedImage,
      imagePreview
    };

    onSubmit(queryData);
  };

  const selectedUrgency = urgencyLevels.find(level => level.value === formData.urgency);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-farmGreen-100 sticky top-0 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold gradient-text font-display">
                {translate('askQuestion')}
              </h2>
              <p className="text-farmGreen-600 mt-1">
                {translate('aiSolutions')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Main Query Text */}
          <div>
            <label className="block text-sm font-medium text-farmGreen-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              {translate('describeChallenge')} *
            </label>
            <textarea
              value={formData.query_text}
              onChange={(e) => handleInputChange('query_text', e.target.value)}
              className={`input-field resize-none ${errors.query_text ? 'border-red-300 focus:border-red-500' : ''}`}
              rows="4"
              placeholder="Describe your farming challenge in detail. Include symptoms, affected area, when you first noticed the issue, etc."
            />
            {errors.query_text && (
              <p className="text-red-600 text-sm mt-1">{errors.query_text}</p>
            )}
            <p className="text-farmGreen-500 text-sm mt-1">
              💡 Tip: The more details you provide, the better help you'll receive
            </p>
          </div>

          {/* Basic Information Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Crop Type */}
            <div>
              <label className="block text-sm font-medium text-farmGreen-700 mb-2">
                Crop Type *
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={formData.crop_type}
                  onChange={(e) => handleInputChange('crop_type', e.target.value)}
                  className={`input-field ${errors.crop_type ? 'border-red-300 focus:border-red-500' : ''}`}
                  placeholder="e.g., Tomato, Wheat, Cotton"
                  list="crops"
                />
                <datalist id="crops">
                  {commonCrops.map(crop => (
                    <option key={crop} value={crop} />
                  ))}
                </datalist>
                {errors.crop_type && (
                  <p className="text-red-600 text-sm">{errors.crop_type}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-farmGreen-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Farm Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="input-field"
                placeholder="Village, District, State"
              />
            </div>
          </div>

          {/* Additional Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Symptoms Duration */}
            <div>
              <label className="block text-sm font-medium text-farmGreen-700 mb-2">
                How long have you noticed this issue?
              </label>
              <select
                value={formData.symptoms_duration}
                onChange={(e) => handleInputChange('symptoms_duration', e.target.value)}
                className="input-field"
              >
                <option value="">Select duration</option>
                <option value="1-2 days">1-2 days</option>
                <option value="3-7 days">3-7 days</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="2-4 weeks">2-4 weeks</option>
                <option value="more than a month">More than a month</option>
              </select>
            </div>

            {/* Weather Conditions */}
            <div>
              <label className="block text-sm font-medium text-farmGreen-700 mb-2">
                Recent Weather Conditions
              </label>
              <select
                value={formData.weather_conditions}
                onChange={(e) => handleInputChange('weather_conditions', e.target.value)}
                className="input-field"
              >
                <option value="">Select weather</option>
                <option value="hot and dry">Hot and dry</option>
                <option value="hot and humid">Hot and humid</option>
                <option value="rainy">Rainy</option>
                <option value="cold">Cold</option>
                <option value="windy">Windy</option>
                <option value="normal">Normal conditions</option>
              </select>
            </div>
          </div>

          {/* Previous Treatments */}
          <div>
            <label className="block text-sm font-medium text-farmGreen-700 mb-2">
              Previous treatments tried (if any)
            </label>
            <textarea
              value={formData.previous_treatments}
              onChange={(e) => handleInputChange('previous_treatments', e.target.value)}
              className="input-field resize-none"
              rows="2"
              placeholder="List any fertilizers, pesticides, or other treatments you've already used"
            />
          </div>

          {/* Urgency Selection */}
          <div>
            <label className="block text-sm font-medium text-farmGreen-700 mb-3">
              Priority Level
            </label>
            <div className="grid md:grid-cols-3 gap-3">
              {urgencyLevels.map((level) => {
                const Icon = level.icon;
                const isSelected = formData.urgency === level.value;
                
                return (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => handleInputChange('urgency', level.value)}
                    className={`p-4 border-2 rounded-lg transition-all duration-200 text-left ${
                      isSelected
                        ? `border-${level.value === 'low' ? 'green' : level.value === 'medium' ? 'yellow' : 'red'}-300 ${level.color}`
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{level.label}</span>
                    </div>
                    <p className="text-sm opacity-75">{level.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-farmGreen-700 mb-3">
              <Camera className="w-4 h-4 inline mr-2" />
              Add Photos (Optional)
            </label>
            
            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-farmGreen-300 rounded-lg p-8 text-center cursor-pointer hover:border-farmGreen-400 hover:bg-farmGreen-50 transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-farmGreen-100 rounded-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-farmGreen-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-farmGreen-800">
                      Upload crop photos
                    </p>
                    <p className="text-farmGreen-600 text-sm">
                      Clear photos help our experts provide better advice
                    </p>
                    <p className="text-farmGreen-500 text-xs mt-2">
                      Max 5MB • JPG, PNG, WebP supported
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Selected crop"
                  className="w-full max-w-md h-64 object-cover rounded-lg mx-auto border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="text-center mt-2">
                  <p className="text-sm text-farmGreen-600">
                    {selectedImage?.name} • {(selectedImage?.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-farmGreen-600 hover:text-farmGreen-800 text-sm underline mt-1"
                  >
                    Change image
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            )}
            
            {errors.image && (
              <p className="text-red-600 text-sm mt-2">{errors.image}</p>
            )}
          </div>

          {/* Photo Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center">
              <Camera className="w-4 h-4 mr-2" />
              📸 Photo Guidelines for Best Results:
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h5 className="font-semibold mb-1">✅ Good Photos:</h5>
                <ul className="space-y-1">
                  <li>• Clear focus on affected areas</li>
                  <li>• Good natural lighting</li>
                  <li>• Multiple angles if possible</li>
                  <li>• Close-up of symptoms</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-1">❌ Avoid:</h5>
                <ul className="space-y-1">
                  <li>• Blurry or dark images</li>
                  <li>• Too far from the issue</li>
                  <li>• Poor lighting conditions</li>
                  <li>• Obstructed views</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Current Selection Summary */}
          {formData.query_text.trim() && (
            <div className="bg-farmGreen-50 border border-farmGreen-200 rounded-lg p-4">
              <h4 className="font-medium text-farmGreen-800 mb-3">📋 Query Summary:</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Crop:</strong> {formData.crop_type || 'Not specified'}</div>
                <div><strong>Priority:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${selectedUrgency?.color}`}>
                    {selectedUrgency?.label}
                  </span>
                </div>
                {formData.location && <div><strong>Location:</strong> {formData.location}</div>}
                {formData.symptoms_duration && <div><strong>Duration:</strong> {formData.symptoms_duration}</div>}
                {selectedImage && <div><strong>Photos:</strong> 1 image attached</div>}
                <div><strong>Description:</strong> {formData.query_text.substring(0, 100)}{formData.query_text.length > 100 ? '...' : ''}</div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-4 pt-6 border-t border-farmGreen-100">
            <button
              type="submit"
              disabled={isSubmitting || !formData.query_text.trim() || !formData.crop_type.trim()}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting query...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>{translate('submitQuery')}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-farmGreen-300 text-farmGreen-700 rounded-lg hover:bg-farmGreen-50 transition-colors font-medium"
              disabled={isSubmitting}
            >
              {translate('cancel')}
            </button>
          </div>

          {/* Help Text */}
          <div className="text-center pt-4 border-t border-farmGreen-100">
            <p className="text-farmGreen-600 text-sm">
              🚀 Your query will be analyzed by AI instantly and reviewed by expert officers
            </p>
            <p className="text-farmGreen-500 text-xs mt-1">
              Expect a response within 2-6 hours depending on priority level
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}