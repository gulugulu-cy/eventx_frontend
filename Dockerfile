# 使用Node.js官方镜像作为基础镜像
FROM node:20 AS build

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json以安装依赖
COPY package*.json ./

# 安装项目依赖
RUN npm install -g pnpm && pnpm install

# 复制项目文件到工作目录
COPY . .

# 构建项目
RUN pnpm run build

# 使用nginx提供构建后的静态文件
FROM nginx:alpine

# 复制构建的文件到nginx的html目录
COPY --from=build /app/dist /usr/share/nginx/html/assets/

# 添加自定义nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]