FROM busybox
ADD dist /app
VOLUME ["/app"]
CMD ["/bin/tail", "/dev/null"]
