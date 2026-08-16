/**
 * CloudStorageService
 * 
 * Provides persistent cloud image storage architecture.
 * Validates, resizes, and compresses image files locally using HTML5 Canvas
 * before uploading to a persistent cloud storage CDN API.
 * 
 * Returns ONLY HTTPS URLs (e.g. https://files.catbox.moe/... or https://i.ibb.co/...).
 * NEVER returns raw Base64 data URLs.
 */

export class CloudStorageService {
  /**
   * Compress image file locally using Canvas API (Max 1920x1080, 85% JPEG quality)
   */
  public static async compressImage(file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.85): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        reject(new Error('Selected file is not a valid image.'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas context unavailable'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Image compression failed'));
              }
            },
            'image/jpeg',
            quality
          );
        };
        img.onerror = () => reject(new Error('Failed to load image file.'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read image file.'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Upload image file to persistent cloud storage and return permanent public HTTPS URL
   */
  public static async uploadImage(file: File, onProgress?: (percent: number) => void): Promise<string> {
    if (!file || !file.type.startsWith('image/')) {
      throw new Error('Invalid file type. Please select a JPEG, PNG, or WebP image.');
    }

    if (onProgress) onProgress(20);

    // Compress image first for optimal web load speed
    let blob: Blob;
    try {
      blob = await this.compressImage(file, 1920, 1080, 0.85);
    } catch (e) {
      blob = file; // Fallback to original file
    }

    if (onProgress) onProgress(50);

    // Option A: Check for VITE_IMGBB_API_KEY environment variable if user configures custom ImgBB key
    const envApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (envApiKey) {
      try {
        const formData = new FormData();
        formData.append('image', blob, file.name || 'venture_photo.jpg');
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${envApiKey}`, {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          const json = await res.json();
          if (json?.data?.url && json.data.url.startsWith('https://')) {
            if (onProgress) onProgress(100);
            return json.data.url;
          }
        }
      } catch (err) {
        console.warn('Custom ImgBB storage API fallback:', err);
      }
    }

    // Option B: Primary Persistent Cloud Storage API (Catbox CDN)
    try {
      const formData = new FormData();
      formData.append('reqtype', 'fileupload');
      formData.append('fileToUpload', blob, file.name || 'venture_photo.jpg');

      const res = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const publicUrl = (await res.text()).trim();
        if (publicUrl.startsWith('https://')) {
          if (onProgress) onProgress(100);
          return publicUrl;
        }
      }
    } catch (err) {
      console.warn('Primary cloud storage failed, attempting secondary provider:', err);
    }

    // Option C: Secondary Persistent Cloud Storage Fallback (FreeImage Host API)
    try {
      const reader = new FileReader();
      const base64: string = await new Promise((resolve, reject) => {
        reader.onload = () => {
          const resStr = reader.result as string;
          resolve(resStr.split(',')[1] || resStr);
        };
        reader.onerror = () => reject(new Error('File read failed'));
        reader.readAsDataURL(blob);
      });

      const params = new URLSearchParams();
      params.append('key', '6d000714986472f5a647882203363168');
      params.append('action', 'upload');
      params.append('source', base64);
      params.append('format', 'json');

      const res = await fetch('https://freeimage.host/api/1/upload', {
        method: 'POST',
        body: params,
      });

      if (res.ok) {
        const json = await res.json();
        if (json?.image?.url && json.image.url.startsWith('https://')) {
          if (onProgress) onProgress(100);
          return json.image.url;
        }
      }
    } catch (err) {
      console.warn('Secondary cloud storage failed:', err);
    }

    throw new Error('Cloud image upload failed. Please verify your internet connection and try again.');
  }
}
