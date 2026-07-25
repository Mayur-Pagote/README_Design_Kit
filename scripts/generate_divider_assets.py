import math
import os
from PIL import Image, ImageDraw, ImageFilter

output_dir = r"c:\Users\tejj1\OneDrive\Desktop\New folder (2)\New folder (2)\README_Design_Kit\public\Assets"
os.makedirs(output_dir, exist_ok=True)

# -------------------------------------------------------------
# 1. Generate aurora-glow-line.svg & aurora-glow-line.png
# -------------------------------------------------------------
# Pure SVG multi-layer static glow (no feGaussianBlur needed, 100% GitHub Markdown compatible)
aurora_svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 24" width="100%" height="24">
  <defs>
    <linearGradient id="aurora-glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4f46e5" stop-opacity="0" />
      <stop offset="15%" stop-color="#6366f1" stop-opacity="0.85" />
      <stop offset="35%" stop-color="#a855f7" stop-opacity="1" />
      <stop offset="50%" stop-color="#ec4899" stop-opacity="1" />
      <stop offset="65%" stop-color="#f43f5e" stop-opacity="1" />
      <stop offset="85%" stop-color="#f43f5e" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#f43f5e" stop-opacity="0" />
    </linearGradient>
  </defs>
  <!-- Outer Glow Aura Layers -->
  <line x1="20" y1="12" x2="1180" y2="12" stroke="url(#aurora-glow-grad)" stroke-width="20" stroke-linecap="round" opacity="0.08" />
  <line x1="20" y1="12" x2="1180" y2="12" stroke="url(#aurora-glow-grad)" stroke-width="16" stroke-linecap="round" opacity="0.15" />
  <line x1="20" y1="12" x2="1180" y2="12" stroke="url(#aurora-glow-grad)" stroke-width="12" stroke-linecap="round" opacity="0.25" />
  <line x1="20" y1="12" x2="1180" y2="12" stroke="url(#aurora-glow-grad)" stroke-width="8" stroke-linecap="round" opacity="0.45" />
  <line x1="20" y1="12" x2="1180" y2="12" stroke="url(#aurora-glow-grad)" stroke-width="5" stroke-linecap="round" opacity="0.75" />
  <!-- Core Crisp Gradient Line -->
  <line x1="20" y1="12" x2="1180" y2="12" stroke="url(#aurora-glow-grad)" stroke-width="2.5" stroke-linecap="round" opacity="1.0" />
</svg>"""

with open(os.path.join(output_dir, "aurora-glow-line.svg"), "w", encoding="utf-8") as f:
    f.write(aurora_svg_content)

# Generate PNG for aurora glow line
width, height = 1200, 32
img_aurora = Image.new("RGBA", (width, height), (0, 0, 0, 0))
draw = ImageDraw.Draw(img_aurora)

stops = [
    (0.0, (79, 70, 229, 0)),
    (0.15, (99, 102, 241, 215)),
    (0.35, (168, 85, 247, 255)),
    (0.50, (236, 72, 153, 255)),
    (0.65, (244, 63, 94, 255)),
    (0.85, (244, 63, 94, 215)),
    (1.0, (244, 63, 94, 0))
]

def lerp_color(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(4))

def get_aurora_color(pos):
    for i in range(len(stops) - 1):
        p1, col1 = stops[i]
        p2, col2 = stops[i+1]
        if p1 <= pos <= p2:
            t = (pos - p1) / (p2 - p1)
            return lerp_color(col1, col2, t)
    return stops[-1][1]

glow_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow_img)

for x in range(20, 1180):
    col = get_aurora_color((x - 20) / 1160.0)
    glow_col = (col[0], col[1], col[2], int(col[3] * 0.6))
    glow_draw.line([(x, height//2 - 5), (x, height//2 + 5)], fill=glow_col, width=10)
    draw.line([(x, height//2 - 1), (x, height//2 + 1)], fill=col, width=3)

glow_blurred = glow_img.filter(ImageFilter.GaussianBlur(radius=5))
final_aurora = Image.alpha_composite(glow_blurred, img_aurora)
final_aurora.save(os.path.join(output_dir, "aurora-glow-line.png"))

print("Created aurora-glow-line.svg and aurora-glow-line.png")

# -------------------------------------------------------------
# 2. Generate tech-pulse-dotted-line.svg, .png, and .gif
# -------------------------------------------------------------
tech_svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 32" width="100%" height="32">
  <defs>
    <linearGradient id="tech-dots-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#14b8a6" stop-opacity="0.15" />
      <stop offset="35%" stop-color="#06b6d4" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#22d3ee" stop-opacity="1" />
      <stop offset="65%" stop-color="#06b6d4" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#14b8a6" stop-opacity="0.15" />
    </linearGradient>
  </defs>
  <!-- Cyberpunk Dotted Line -->
  <line x1="40" y1="16" x2="960" y2="16" stroke="url(#tech-dots-grad)" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round" />
  <!-- Central Diamond Badge -->
  <g transform="translate(500, 16)">
    <!-- Outer Diamond Layer -->
    <polygon points="0,-12 12,0 0,12 -12,0" fill="none" stroke="#22d3ee" stroke-width="2" opacity="0.7" />
    <!-- Solid Inner Diamond -->
    <polygon points="0,-7 7,0 0,7 -7,0" fill="#06b6d4" />
    <!-- Center Core Dot -->
    <circle cx="0" cy="0" r="2" fill="#ffffff" />
  </g>
</svg>"""

with open(os.path.join(output_dir, "tech-pulse-dotted-line.svg"), "w", encoding="utf-8") as f:
    f.write(tech_svg_content)

gif_width, gif_height = 1000, 32
num_frames = 24
frames = []

for frame_idx in range(num_frames):
    t = frame_idx / float(num_frames)
    scale = 1.0 + 0.7 * (0.5 + 0.5 * math.sin(2 * math.pi * t))
    pulse_opacity = 0.3 + 0.7 * (0.5 + 0.5 * math.sin(2 * math.pi * t))
    
    frame_img = Image.new("RGBA", (gif_width, gif_height), (0, 0, 0, 0))
    f_draw = ImageDraw.Draw(frame_img)
    center_x, center_y = gif_width // 2, gif_height // 2
    
    for x in range(40, center_x - 20, 12):
        pos_factor = (x - 40) / float(center_x - 40)
        alpha = int(255 * (0.2 + 0.8 * pos_factor))
        f_draw.ellipse([x-1.5, center_y-1.5, x+1.5, center_y+1.5], fill=(6, 182, 212, alpha))
        
    for x in range(center_x + 24, gif_width - 40, 12):
        pos_factor = (gif_width - 40 - x) / float(center_x - 40)
        alpha = int(255 * (0.2 + 0.8 * pos_factor))
        f_draw.ellipse([x-1.5, center_y-1.5, x+1.5, center_y+1.5], fill=(6, 182, 212, alpha))
    
    glow_layer = Image.new("RGBA", (gif_width, gif_height), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_layer)
    
    size_outer = 8 * scale
    pts_outer = [
        (center_x, center_y - size_outer),
        (center_x + size_outer, center_y),
        (center_x, center_y + size_outer),
        (center_x - size_outer, center_y)
    ]
    outer_alpha = int(255 * pulse_opacity * 0.8)
    g_draw.polygon(pts_outer, outline=(34, 211, 238, outer_alpha), width=2)
    glow_blurred = glow_layer.filter(ImageFilter.GaussianBlur(radius=3))
    
    pts_core = [
        (center_x, center_y - 6),
        (center_x + 6, center_y),
        (center_x, center_y + 6),
        (center_x - 6, center_y)
    ]
    f_draw.polygon(pts_core, fill=(6, 182, 212, 255), outline=(34, 211, 238, 255))
    f_draw.ellipse([center_x-2, center_y-2, center_x+2, center_y+2], fill=(255, 255, 255, 255))
    
    combined = Image.alpha_composite(glow_blurred, frame_img)
    frames.append(combined)

frames[0].save(
    os.path.join(output_dir, "tech-pulse-dotted-line.gif"),
    save_all=True,
    append_images=frames[1:],
    duration=80,
    loop=0,
    disposition=2
)

frames[6].save(os.path.join(output_dir, "tech-pulse-dotted-line.png"))

print("Created tech-pulse-dotted-line.svg, .gif, and .png")
