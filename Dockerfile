FROM nginx:1.17.3-alpine

MAINTAINER liunewshine@qq.com

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && mkdir -p /my-app

WORKDIR /my-app

ADD /dist/  /usr/share/nginx/html/
ADD /nginx.conf /etc/nginx/nginx.conf

ENV env "test"

CMD sed -i "s/vueEnv.active/\"${env}\"/g" /usr/share/nginx/html/config.js && nginx -g 'daemon off;'
