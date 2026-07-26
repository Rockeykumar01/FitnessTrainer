from PIL import Image
import numpy as np

def remove_bg_and_crop(input_path, output_path):
    # Open image and convert to RGBA
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # Get the background color from the top-left corner
    bg_color = data[0, 0, :3]
    
    # Calculate distance of all pixels from background color
    rgb = data[:, :, :3]
    diff = np.abs(rgb.astype(int) - bg_color.astype(int))
    dist = np.sum(diff, axis=2)
    
    # Create mask where distance is small (similar to background)
    threshold = 60  # tolerance
    mask = dist < threshold
    
    # Make background transparent
    data[mask, 3] = 0
    
    # Convert back to image
    img_transparent = Image.fromarray(data)
    
    # Crop to bounding box
    bbox = img_transparent.getbbox()
    if bbox:
        img_cropped = img_transparent.crop(bbox)
        img_cropped.save(output_path)
        print("Successfully processed and saved.")
    else:
        print("Image is entirely empty after background removal.")

if __name__ == "__main__":
    remove_bg_and_crop("frontend/src/assets/header_img.png", "frontend/src/assets/header_img.png")
