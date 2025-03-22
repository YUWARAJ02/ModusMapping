# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker cache)
COPY package*.json ./

# Install dependencies (including react-router-dom)
RUN npm install react-router-dom react-icons react-paginate && npm install

# Copy the entire project
COPY . .

# Expose port 3000 (default for React)
EXPOSE 3000

# Start the React application
CMD ["npm", "run", "start"]