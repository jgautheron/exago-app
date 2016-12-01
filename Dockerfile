FROM node:7-slim
ADD . /app
WORKDIR /app
EXPOSE 3000
CMD ["npm", "run", "start"]
