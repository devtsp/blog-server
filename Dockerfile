FROM node:20-alpine3.17

WORKDIR /app

# Make the dependencies installation in a separate layer
# to allow caching
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; \
    then npm install --omit=dev; \
    else npm install; \
    fi

# Copy the rest of the app in different step 
# (this may be prone to change in development)
# This copy is overriden by a bind mount in development
# but still needed for production
COPY . ./

# The expose command is not necessary, but it's a good practice
# to document the ports that the app is listening on
EXPOSE 3500

CMD ["npm", "run", "dev"]