# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /spr_scraper

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Run the build:css and setup scripts
RUN npm run build:css

# Final stage - this stage will only include the necessary files
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /spr_scraper

# Copy dependencies from the builder stage
COPY --from=builder /spr_scraper/node_modules ./node_modules

# Copy the built application files and any modified files
COPY --from=builder /spr_scraper .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
