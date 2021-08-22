FROM node
VOLUME /build
WORKDIR /build
CMD ["./docker-build.sh"]
