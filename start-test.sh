git pull

#下载依赖、打包文件
# docker run --rm \
#   -v $PWD:/home \
#   -w /home \
#   node:10 sh -c "yarn --registry=https://registry.npm.taobao.org/ && yarn build:staging"

yarn build

#删除容器
echo "Start removing docker container"
docker rm -f sgcc-frontend-wechat &> /dev/null
echo "Done removing docker container"

sleep 5
echo "Done sleep"

# 运行容器
docker run -d --restart=on-failure:5 \
    -p 3350:80 \
    -v $PWD/dist:/usr/share/nginx/html/sgcc-frontend-wechat:ro \
    -v $PWD/default.conf:/etc/nginx/conf.d/default.conf \
    --name sgcc-frontend-wechat nginx:1.13
