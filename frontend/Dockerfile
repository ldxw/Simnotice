# =============================
# 第一阶段：构建前端
# =============================
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 先复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制前端源码
COPY . .

# 构建生产静态文件
RUN npm run build


# =============================
# 第二阶段：使用 nginx 提供静态站点
# =============================
FROM nginx:alpine

# 删除默认站点配置
RUN rm -f /etc/nginx/conf.d/default.conf

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制前端构建产物到 nginx 静态目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露 nginx 端口
EXPOSE 80
