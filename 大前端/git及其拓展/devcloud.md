export PATH=$PATH:/root/.npm-global/bin
#设置Devcloud镜像仓加速构建
npm config set registry https://mirrors.huaweicloud.com/repository/npm/
npm config set prefix '~/.npm-global'
#如需安装node-sass
#npm config set sass_binary_site https://repo.huaweicloud.com/node-sass/
#npm install node-sass
#加载依赖
npm install
#默认构建
npm run build

