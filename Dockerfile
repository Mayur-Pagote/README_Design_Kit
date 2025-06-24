# Development Dockerfile for Readme Design Kit


FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start Vite dev server on all network interfaces so it is reachable from host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


#To run this file use 
# docker run -it -p 5173:5173 readme-design-kit