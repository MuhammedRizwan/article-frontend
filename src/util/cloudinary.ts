export async function uploadToCloudinary(
    file: File,
    resourceType: 'image' | 'video'
  ): Promise<{ secure_url: string; public_id: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
  
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
  
    if (!response.ok) {
      throw new Error('Upload to Cloudinary failed');
    }
  
    return await response.json();
  }
  
 
  export async function deleteFromCloudinary(
    publicId: string,
    resourceType: 'image' | 'video'
  ): Promise<void> {
    try {
      const response =await fetch('/article/cloudinary/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          publicId,
          resourceType,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete resource from Cloudinary');
      }
    } catch (error) {
      console.error('Error deleting resource from Cloudinary:', error);
      throw error;
    }
  }
  