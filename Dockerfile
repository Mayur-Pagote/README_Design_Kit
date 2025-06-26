# Development Dockerfile for Readme Design Kit

FROM node:20-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose Vite default port
EXPOSE 5173

# Set environment variables for Vite HMR
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Start Vite dev server with HMR enabled
CMD ["vite", "--host", "0.0.0.0", "--port", "5173"]

# To run this container with hot reloading, use:
# docker build -t readme-design-kit .
# docker run -it --rm -p 5173:5173 -v ${PWD}:/app -v /app/node_modules -e CHOKIDAR_USEPOLLING=true readme-design-kit