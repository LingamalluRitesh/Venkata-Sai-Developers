FROM public.ecr.aws/docker/library/python:3.13-slim-bookworm@sha256:01f42367a0a94ad4bc17111776fd66e3500c1d87c15bbd6055b7371d39c124fb

WORKDIR /app

# Install required agent harness tools, Go compiler, and system utilities
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        asciinema \
        ca-certificates \
        git \
        golang-go \
        tmux \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app/data /app/output

COPY setup.sh /app/setup.sh
COPY data/HARMONY_CLINIC.md /app/data/HARMONY_CLINIC.md
COPY data/session.script /app/data/session.script
COPY data/song.chord /app/data/song.chord

RUN bash /app/setup.sh
