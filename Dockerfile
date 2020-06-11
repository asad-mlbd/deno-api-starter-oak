FROM hayd/alpine-deno:1.0.0

EXPOSE 8000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

USER deno
RUN deno cache app.ts
CMD ["run", "--allow-read", "--allow-net", "--unstable", "app.ts"]