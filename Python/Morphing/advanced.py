import dlib
import cv2
import numpy as np
from PIL import Image
from scipy.spatial import Delaunay

# Initialize dlib's face detector and shape predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

def get_landmarks(image):
    if image is None:
        raise ValueError("Image not loaded correctly.")
    
    print(f"Image shape: {image.shape}")
    print(f"Image dtype: {image.dtype}")
    
    if len(image.shape) == 2:  # If image is already grayscale
        gray = image
    elif len(image.shape) == 3 and image.shape[2] == 3:  # If image is RGB/BGR
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    else:
        raise ValueError("Unsupported image type, must be 8bit gray or RGB image.")

    faces = detector(gray)
    if len(faces) == 0:
        raise ValueError("No faces detected in the image.")
    
    landmarks = []
    for face in faces:
        shape = predictor(gray, face)
        landmarks = np.array([(p.x, p.y) for p in shape.parts()])
    
    if len(landmarks) == 0:
        raise ValueError("Could not find landmarks in the detected face.")

    return landmarks

def warp_triangle(img1, img2, t1, t2):
    r1 = cv2.boundingRect(np.float32(t1))
    r2 = cv2.boundingRect(np.float32(t2))
    
    t1_rect = []
    t2_rect = []
    for i in range(3):
        t1_rect.append(((t1[i][0] - r1[0]), (t1[i][1] - r1[1])))
        t2_rect.append(((t2[i][0] - r2[0]), (t2[i][1] - r2[1])))
    
    M = cv2.getAffineTransform(np.float32(t1_rect), np.float32(t2_rect))
    
    img2_warped = cv2.warpAffine(img1, M, (r2[2], r2[3]), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101)
    
    img2_rect = img2[r2[1]:r2[1] + r2[3], r2[0]:r2[0] + r2[2]]
    mask = np.zeros_like(img2_rect)
    
    cv2.fillConvexPoly(mask, np.int32(t2_rect), (1.0, 1.0, 1.0), 16, 0)
    img2_rect = img2_rect * (1.0 - mask) + img2_warped * mask

    img2[r2[1]:r2[1] + r2[3], r2[0]:r2[0] + r2[2]] = img2_rect

def create_morph_gif(img1_path, img2_path, output_path='morphing.gif', num_frames=30):
    img1 = cv2.imread(img1_path)
    img2 = cv2.imread(img2_path)

    if img1 is None or img2 is None:
        raise ValueError("One or both images could not be loaded. Check the file paths.")
    
    if img1.shape != img2.shape:
        img2 = cv2.resize(img2, (img1.shape[1], img1.shape[0]))

    landmarks1 = get_landmarks(img1)
    landmarks2 = get_landmarks(img2)
    
    tri = Delaunay(landmarks1)
    images = []

    for i in range(num_frames):
        alpha = i / (num_frames - 1)
        morphed_image = np.zeros_like(img1)

        for simplex in tri.simplices:
            t1 = landmarks1[simplex]
            t2 = landmarks2[simplex]

            warped_img1 = warp_triangle(img1, morphed_image, t1, (1 - alpha) * t1 + alpha * t2)
            warped_img2 = warp_triangle(img2, morphed_image, t2, (1 - alpha) * t1 + alpha * t2)

            morphed_image = cv2.addWeighted(warped_img1, 1 - alpha, warped_img2, alpha, 0)

        pil_image = Image.fromarray(cv2.cvtColor(morphed_image, cv2.COLOR_BGR2RGB))
        images.append(pil_image)

    images[0].save(output_path, save_all=True, append_images=images[1:], duration=100, loop=0)

    return output_path

# Example usage
img1_path = 'img2.jpeg'
img2_path = 'img3.jpeg'
output_path = 'morphing_adv1.gif'
num_frames = 30  # Number of frames in the GIF

gif_path = create_morph_gif(img1_path, img2_path, output_path, num_frames)
print(f"Animated GIF saved at: {gif_path}")
