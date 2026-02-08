import { ExternalBlob } from '../blob-storage';

export async function uploadSelfieImage(
  file: File,
  onProgress?: (percentage: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);

        let blob = ExternalBlob.fromBytes(uint8Array);

        if (onProgress) {
          blob = blob.withUploadProgress((percentage) => {
            onProgress(percentage);
          });
        }

        const url = blob.getDirectURL();
        resolve(url);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsArrayBuffer(file);
  });
}
