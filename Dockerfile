# 1. Use a lightweight Node.js image
FROM node:20-slim

# 2. Set the working directory
WORKDIR /usr/src/app

# 3. Copy package files first for faster builds (cache)
COPY package*.json ./

# 4. Install dependencies
# Using 'npm install' is fine for development
RUN npm install

# 5. Copy the rest of your admin backend code
COPY . .

# 6. Expose the port (I'll assume 2001 to avoid conflict with the other backend)
EXPOSE 2001

# 7. Start the admin server
CMD [ "npm", "start" ]