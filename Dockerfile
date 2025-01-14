# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Ensure the .env file is included (copied from the correct branch)
COPY .env .env

# Expose the port
EXPOSE 3000

# Command to run the server
CMD ["node", "server.js"]