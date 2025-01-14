# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY .env .env
# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 3000

# Command to run the server
CMD ["node", "server.js"]
