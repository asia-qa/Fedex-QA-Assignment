FROM mcr.microsoft.com/playwright:v1.58.2-noble
# Set working directory inside the container
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
