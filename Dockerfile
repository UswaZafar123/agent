# Use an official Node.js runtime as the base image
FROM node:16-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm install -g npm@9.8.0

# Install project dependencies
RUN npm install --force  --legacy-peer-deps

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

################
# Run in NGINX #
################
FROM nginx:alpine
COPY --from=build /dist /usr/share/nginx/html
RUN chmod -R 775 /usr/share/nginx/html/
