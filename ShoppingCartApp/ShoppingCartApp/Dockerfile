FROM nginx:alpine 
LABEL author="Luka Djordjevic"
COPY ./dist/ShoppingCartApp /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]