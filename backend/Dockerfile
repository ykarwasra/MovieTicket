FROM node:14-alpine
WORKDIR  /app/
COPY package*json ./
COPY . .
EXPOSE 5000
RUN npm install
CMD ["node","app.js"]