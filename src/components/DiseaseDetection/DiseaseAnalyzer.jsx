import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, Upload, X, Loader, AlertCircle, CheckCircle } from 'lucide-react';

export default function DiseaseAnalyzer() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedImage({
        file,
        preview: URL.createObjectURL(file)
      });
      setResult(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const analyzeDisease = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage.file);
      if (additionalInfo.trim()) {
        formData.append('additional_info', additionalInfo.trim());
      }

      const response = await fetch('http://127.0.0.1:8000/ai/disease-detect', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAnalysis = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    setAdditionalInfo('');
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">🔬 Disease Detection</h2>
        <p className="text-farmGreen-600 text-lg">
          Upload an image of your crop to get instant AI-powered disease analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-farmGreen-800 mb-4">Upload Image</h3>
            
            {!selectedImage ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  isDragActive 
                    ? 'border-farmGreen-400 bg-farmGreen-50' 
                    : 'border-gray-300 hover:border-farmGreen-400 hover:bg-farmGreen-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-farmGreen-100 rounded-full flex items-center justify-center">
                    {isDragActive ? (
                      <Upload className="w-8 h-8 text-farmGreen-600" />
                    ) : (
                      <Camera className="w-8 h-8 text-farmGreen-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-medium text-farmGreen-800">
                      {isDragActive ? 'Drop image here' : 'Upload crop image'}
                    </p>
                    <p className="text-farmGreen-600 text-sm">
                      Drag & drop or click to select • Max 10MB • JPG, PNG, WebP
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={selectedImage.preview}
                    alt="Selected crop"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={clearAnalysis}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-farmGreen-600 text-center">
                 {selectedImage.file.name} • {(selectedImage.file.size / 1024 / 1024).toFixed(2)} MB
               </p>
             </div>
           )}
         </div>

         {/* Additional Information */}
         <div className="card p-6">
           <h3 className="text-xl font-semibold text-farmGreen-800 mb-4">Additional Information</h3>
           <div className="space-y-4">
             <textarea
               value={additionalInfo}
               onChange={(e) => setAdditionalInfo(e.target.value)}
               placeholder="Describe symptoms, location, weather conditions, or any other relevant details..."
               className="input-field resize-none"
               rows="4"
             />
             <p className="text-sm text-farmGreen-500">
               💡 Tip: Include details like crop type, symptoms observed, duration, and growing conditions for better analysis
             </p>
           </div>
         </div>

         {/* Analyze Button */}
         <button
           onClick={analyzeDisease}
           disabled={!selectedImage || isAnalyzing}
           className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
         >
           {isAnalyzing ? (
             <div className="flex items-center justify-center space-x-2">
               <Loader className="w-5 h-5 animate-spin" />
               <span>Analyzing image...</span>
             </div>
           ) : (
             <div className="flex items-center justify-center space-x-2">
               <Camera className="w-5 h-5" />
               <span>Analyze Disease</span>
             </div>
           )}
         </button>
       </div>

       {/* Results Section */}
       <div className="space-y-6">
         {/* Error Display */}
         {error && (
           <div className="card p-6 border-l-4 border-red-500 bg-red-50">
             <div className="flex items-start space-x-3">
               <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
               <div>
                 <h3 className="font-semibold text-red-800 mb-2">Analysis Failed</h3>
                 <p className="text-red-700">{error}</p>
               </div>
             </div>
           </div>
         )}

         {/* Results Display */}
         {result && !error && (
           <div className="card p-6">
             <div className="flex items-center space-x-2 mb-6">
               <CheckCircle className="w-6 h-6 text-green-600" />
               <h3 className="text-xl font-semibold text-farmGreen-800">Analysis Results</h3>
             </div>

             {/* Main Prediction */}
             <div className="space-y-4 mb-6">
               <div className="flex items-center justify-between p-4 bg-farmGreen-50 rounded-lg">
                 <div>
                   <h4 className="font-semibold text-farmGreen-800 text-lg">
                     {result.prediction}
                   </h4>
                   <p className="text-farmGreen-600">Primary diagnosis</p>
                 </div>
                 <div className="text-right">
                   <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                     {(result.confidence * 100).toFixed(1)}% confident
                   </div>
                 </div>
               </div>

               {/* Top Predictions */}
               {result.top_predictions && result.top_predictions.length > 1 && (
                 <div>
                   <h5 className="font-medium text-farmGreen-800 mb-3">Alternative possibilities:</h5>
                   <div className="space-y-2">
                     {result.top_predictions.slice(1).map((pred, index) => (
                       <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                         <span className="text-gray-700">{pred.disease}</span>
                         <span className="text-sm text-gray-600">
                           {(pred.confidence * 100).toFixed(1)}%
                         </span>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
             </div>

             {/* Recommendations */}
             {result.recommendations && (
               <div className="border-t pt-4">
                 <h4 className="font-semibold text-farmGreen-800 mb-3">🩺 Treatment Recommendations</h4>
                 <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                   <p className="text-green-800 leading-relaxed">{result.recommendations}</p>
                 </div>
               </div>
             )}

             {/* Enhanced Response with Additional Info */}
             {result.enhanced_response && (
               <div className="border-t pt-4 mt-4">
                 <h4 className="font-semibold text-farmGreen-800 mb-3">📋 Detailed Analysis</h4>
                 <div className="prose prose-sm max-w-none">
                   <div className="whitespace-pre-wrap text-farmGreen-700 bg-farmGreen-50 p-4 rounded-lg">
                     {result.enhanced_response}
                   </div>
                 </div>
               </div>
             )}

             {/* Action Buttons */}
             <div className="flex gap-3 mt-6 pt-4 border-t">
               <button
                 onClick={() => window.print()}
                 className="btn-secondary flex-1"
               >
                 Print Report
               </button>
               <button
                 onClick={clearAnalysis}
                 className="px-6 py-3 border border-farmGreen-300 text-farmGreen-700 rounded-lg hover:bg-farmGreen-50 transition-colors"
               >
                 New Analysis
               </button>
             </div>
           </div>
         )}

         {/* Instructions */}
         {!result && !error && (
           <div className="card p-6">
             <h3 className="text-xl font-semibold text-farmGreen-800 mb-4">📖 How to Use</h3>
             <div className="space-y-3 text-farmGreen-700">
               <div className="flex items-start space-x-3">
                 <span className="w-6 h-6 bg-farmGreen-100 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">1</span>
                 <p>Upload a clear image of the affected plant part</p>
               </div>
               <div className="flex items-start space-x-3">
                 <span className="w-6 h-6 bg-farmGreen-100 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">2</span>
                 <p>Add any additional symptoms or context</p>
               </div>
               <div className="flex items-start space-x-3">
                 <span className="w-6 h-6 bg-farmGreen-100 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">3</span>
                 <p>Click "Analyze Disease" to get AI-powered diagnosis</p>
               </div>
               <div className="flex items-start space-x-3">
                 <span className="w-6 h-6 bg-farmGreen-100 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">4</span>
                 <p>Follow the treatment recommendations provided</p>
               </div>
             </div>

             <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
               <h4 className="font-medium text-blue-800 mb-2">📸 Best Practices for Photos:</h4>
               <ul className="text-sm text-blue-700 space-y-1">
                 <li>• Take photos in good lighting conditions</li>
                 <li>• Focus on affected areas clearly</li>
                 <li>• Include multiple angles if possible</li>
                 <li>• Avoid blurry or low-resolution images</li>
               </ul>
             </div>
           </div>
         )}
       </div>
     </div>
   </div>
 );
}