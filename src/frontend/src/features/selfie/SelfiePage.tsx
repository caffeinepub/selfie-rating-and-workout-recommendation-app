import { useState, useRef } from 'react';
import { useCamera } from '../../camera/useCamera';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { validateSelfieFile } from '../../lib/selfie/validation';
import { uploadSelfieImage } from '../../lib/selfie/upload';
import { useSubmitSelfie } from '../../hooks/useQueries';
import ScoreCard from '../../components/score/ScoreCard';
import type { CrossRealityScore } from '../../backend';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function SelfiePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submittedScore, setSubmittedScore] = useState<CrossRealityScore | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitSelfie = useSubmitSelfie();

  const {
    isActive: cameraActive,
    isSupported: cameraSupported,
    error: cameraError,
    isLoading: cameraLoading,
    startCamera,
    stopCamera,
    capturePhoto,
    videoRef,
    canvasRef,
  } = useCamera({
    facingMode: 'user',
    width: 1280,
    height: 720,
    quality: 0.9,
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateSelfieFile(file);
    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setSubmittedScore(null);
  };

  const handleCameraCapture = async () => {
    const photo = await capturePhoto();
    if (photo) {
      setSelectedFile(photo);
      setPreviewUrl(URL.createObjectURL(photo));
      setSubmittedScore(null);
      await stopCamera();
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setValidationError(null);
    setSubmittedScore(null);
    setUploadProgress(0);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      const imageId = await uploadSelfieImage(selectedFile, (progress) => {
        setUploadProgress(progress);
      });

      const score = await submitSelfie.mutateAsync({ imageId });
      setSubmittedScore(score);
      setUploadProgress(0);
    } catch (error) {
      console.error('Submission error:', error);
      setValidationError('Failed to submit selfie. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartCamera = async () => {
    setSubmittedScore(null);
    const success = await startCamera();
    if (!success) {
      setValidationError('Unable to start camera. Please use Upload Photo instead.');
    }
  };

  const showCameraOption = cameraSupported !== false && !cameraError;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Take a Selfie</h2>
        <p className="text-muted-foreground">
          Capture or upload a selfie to get your rating and discover your potential.
        </p>
      </div>

      {!cameraActive && !previewUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Method</CardTitle>
            <CardDescription>
              Upload a photo from your device, or use your camera if available.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              size="lg"
              className="w-full"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Photo
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            {showCameraOption && (
              <Button
                onClick={handleStartCamera}
                disabled={cameraLoading}
                variant="outline"
                size="lg"
                className="w-full"
              >
                {cameraLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Starting Camera...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-5 w-5" />
                    Use Camera
                  </>
                )}
              </Button>
            )}

            {cameraError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Camera unavailable:</strong> {cameraError.message}
                  <br />
                  <span className="text-xs mt-1 block">Please use the Upload Photo option above.</span>
                </AlertDescription>
              </Alert>
            )}

            {cameraSupported === false && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Camera is not supported on this device. Please use the Upload Photo option.
                </AlertDescription>
              </Alert>
            )}

            {validationError && (
              <Alert variant="destructive">
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {cameraActive && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', minHeight: '300px' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-2">
              <Button onClick={handleCameraCapture} size="lg" className="flex-1" disabled={!cameraActive}>
                <Camera className="mr-2 h-5 w-5" />
                Capture Photo
              </Button>
              <Button onClick={stopCamera} variant="outline" size="lg">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {previewUrl && !submittedScore && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full rounded-lg object-cover max-h-[500px]"
              />
              <Button
                onClick={handleRemoveImage}
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isUploading || submitSelfie.isPending}
              size="lg"
              className="w-full"
            >
              {isUploading || submitSelfie.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isUploading ? `Uploading... ${uploadProgress}%` : 'Analyzing...'}
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Submit Selfie
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {submittedScore && previewUrl && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <img
                src={previewUrl}
                alt="Submitted selfie"
                className="w-full rounded-lg object-cover max-h-[400px]"
              />
            </CardContent>
          </Card>

          <ScoreCard score={submittedScore} />

          <Button onClick={handleRemoveImage} variant="outline" className="w-full">
            Take Another Selfie
          </Button>
        </div>
      )}
    </div>
  );
}
