FROM node:lts-alpine

# Copy code.
ADD . /opt/server
WORKDIR /opt/server

# Install dependencies and build app.
# TODO: Make image multi-stage prior to deploying to prod
RUN npm ci
RUN npm run build

# Export port.
EXPOSE 3111

# Start application.
CMD [ "npm", "start" ]
