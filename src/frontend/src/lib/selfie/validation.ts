const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function validateSelfieFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Please upload a JPEG, PNG, or WebP image.';
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'File size must be less than 10MB.';
  }

  return null;
}
