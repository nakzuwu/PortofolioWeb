import os
import json

image_dir = 'images'
video_dir = 'videos'
output_dir = 'data'
os.makedirs(output_dir, exist_ok=True)

images = sorted([
    f"{image_dir}/{img}" for img in os.listdir(image_dir)
    if img.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))
])

videos = sorted([
    f"{video_dir}/{vid}" for vid in os.listdir(video_dir)
    if vid.lower().endswith(('.mp4', '.webm', '.mov'))
])

data = {
    "images": images,
    "videos": videos
}

with open(f'{output_dir}/portfolio.json', 'w') as f:
    json.dump(data, f, indent=2)

print("✅ portfolio.json updated.")
