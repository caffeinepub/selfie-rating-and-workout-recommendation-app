export class ExternalBlob {
  private url: string;
  private bytes?: Uint8Array;
  private progressCallback?: (percentage: number) => void;

  private constructor(url: string, bytes?: Uint8Array) {
    this.url = url;
    this.bytes = bytes;
  }

  static fromURL(url: string): ExternalBlob {
    return new ExternalBlob(url);
  }

  static fromBytes(bytes: Uint8Array): ExternalBlob {
    // Create a new Uint8Array with ArrayBuffer to satisfy TypeScript's strict type checking
    const arrayBuffer = new ArrayBuffer(bytes.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    uint8Array.set(bytes);
    
    const blob = new Blob([uint8Array]);
    const url = URL.createObjectURL(blob);
    return new ExternalBlob(url, uint8Array);
  }

  withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob {
    this.progressCallback = onProgress;
    if (this.progressCallback) {
      setTimeout(() => this.progressCallback?.(100), 100);
    }
    return this;
  }

  getDirectURL(): string {
    return this.url;
  }

  async getBytes(): Promise<Uint8Array> {
    if (this.bytes) {
      return this.bytes;
    }

    const response = await fetch(this.url);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }
}
