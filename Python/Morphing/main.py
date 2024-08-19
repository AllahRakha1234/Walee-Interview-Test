import cv2
import numpy as np
from PIL import Image

def resize_images_to_same(img1, img2):
    # Resize img2 to the dimensions of img1
    height, width, _ = img1.shape
    resized_img2 = cv2.resize(img2, (width, height))
    return resized_img2

def create_morph_gif(img1_path, img2_path, output_path='morphing.gif', num_frames=30):
    # Load images
    img1 = cv2.imread(img1_path)
    img2 = cv2.imread(img2_path)

    if img1.shape != img2.shape:
        print("Images have different dimensions. Resizing img2 to match img1...")
        img2 = resize_images_to_same(img1, img2)

    height, width, _ = img1.shape
    images = []

    for i in range(num_frames):
        alpha = i / (num_frames - 1)
        morphed_image = cv2.addWeighted(img1, 1 - alpha, img2, alpha, 0)
        
        # Convert to PIL Image and append to list
        pil_image = Image.fromarray(cv2.cvtColor(morphed_image, cv2.COLOR_BGR2RGB))
        images.append(pil_image)

    # Save as GIF
    images[0].save(output_path, save_all=True, append_images=images[1:], duration=100, loop=0)

    return output_path

# Example usage
# img1_path = 'batman.png'
# img2_path = 'joker.png'
img1_path = 'img2.jpeg'
img2_path = 'img3.jpeg'
output_path = 'morphing.gif'
num_frames = 30  # Number of frames in the GIF

gif_path = create_morph_gif(img1_path, img2_path, output_path, num_frames)
print(f"Animated GIF saved at: {gif_path}")
