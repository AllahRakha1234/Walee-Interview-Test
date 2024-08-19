import dlib
import cv2

# Initialize the dlib face detector
detector = dlib.get_frontal_face_detector()

# Load the image
image = cv2.imread('img3.jpeg')

# Check if the image was loaded successfully
if image is None:
    raise ValueError("Image not loaded correctly. Please check the file path.")

# Print the image properties
print(f"Image shape: {image.shape}")
print(f"Image dtype: {image.dtype}")

# Convert the image to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Detect faces in the grayscale image
faces = detector(gray)

# Print the number of faces detected
print(f"Number of faces detected: {len(faces)}")
