# pull official base image
FROM node:18-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
#COPY package-lock.json ./

RUN npm install --silent
RUN npm run build

# add app
COPY . ./

EXPOSE 3001

# start app
CMD [ "npm", "run", "preview" ]
