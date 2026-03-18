# 使用 Node 20 Alpine 作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 先复制依赖文件，利用缓存
COPY package*.json ./

# 安装所有依赖
# 这里不用 --omit=dev，原因是这个项目的脚本和运行方式比较“开发化”
# 为避免遗漏依赖，生产直接完整安装更稳
RUN npm install

# 复制后端源码
COPY . .

# 创建数据目录
RUN mkdir -p /app/data

# 生产环境变量
ENV NODE_ENV=production

# 暴露后端端口
EXPOSE 9501

# 直接用 node 启动，避免 package.json 里 start -> dev -> nodemon 的问题
CMD ["node", "server.js"]
