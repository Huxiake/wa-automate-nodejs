# ---- Base Stage: Node.js Environment ----
# Use an official Node.js runtime as a parent image. We choose Node 20, a stable LTS version.
FROM node:20-slim AS base

# Set the working directory in the container.
WORKDIR /usr/src/app

# ---- Dependencies Stage: Install NPM packages ----
# This stage is dedicated to installing dependencies. It will only be re-run if package.json or package-lock.json changes.
FROM base AS dependencies

# Copy package.json and package-lock.json to the working directory.
COPY package*.json ./

# Install app dependencies using npm ci, which is generally faster and more reliable for CI/CD environments.
RUN npm ci

# ---- Build Stage: Compile TypeScript to JavaScript ----
# This stage builds the application.
FROM dependencies AS build

# Copy the rest of the application source code.
COPY . .

# Run the build script defined in package.json.
RUN npm run build

# ---- Production Stage: Final, lean image ----
# This is the final image that will be used in production.
FROM base AS production

# Copy only the necessary files from the previous stages.
# 1. Copy installed dependencies from the 'dependencies' stage.
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# 2. Copy the compiled code from the 'build' stage.
COPY --from=build /usr/src/app/dist ./dist
# 3. Copy other necessary assets and scripts.
COPY bin ./bin
COPY web-ui ./web-ui
COPY public ./public

# Expose the port the app runs on.
EXPOSE 8081

# Define the command to run the application.
# This will start the server using the compiled JavaScript.
CMD ["node", "dist/index.js"]
