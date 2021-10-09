FROM hayd/alpine-deno:1.0.0

EXPOSE 8000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

USER deno
RUN deno cache --unstable --importmap import_map.json app.ts
CMD ["run", "--allow-read", "--allow-net", "--unstable", "--importmap importmap.json", "app.ts"]