FROM node：14.17
RUN mkdir -p /home/nodejs/server
COPY ./server /home/nodejs/server
WORKDIR /home/nodejs/server
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --production; \
    fi
CMD ["npm", "run", "start"]