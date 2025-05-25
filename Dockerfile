FROM ubuntu:focal

RUN /usr/bin/apt-get update && \
    /usr/bin/apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    /usr/bin/apt-get update && \
    /usr/bin/apt-get upgrade -y && \
    /usr/bin/apt-get install -y nodejs ffmpeg

WORKDIR /home/app

# Copying Procecss Shell Script.
COPY process.sh .

# Copying NodeJs Service to Upload Final Files to S3.
COPY final-upload-service .

# Executing Script!
RUN chmod +x process.sh


# ENTRYPOINT [ "bash" ]
ENTRYPOINT ["./process.sh"]
