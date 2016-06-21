FROM node:6-slim
ADD . /app
WORKDIR /app
EXPOSE 3000
CMD ["npm", "run", "start"]
