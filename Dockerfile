FROM busybox
ADD deploy /app
VOLUME ["/app"]
CMD ["/bin/tail", "/dev/null"]
