FROM node:10.11.0

RUN apt-get update && apt-get install -y curl xvfb chromium

RUN npm i -g @angular/cli@6.2.6

ADD xvfb-chromium /usr/bin/xvfb-chromium
RUN ln -s /usr/bin/xvfb-chromium /usr/bin/google-chrome && \
  ln -s /usr/bin/xvfb-chromium /usr/bin/chromium-browser && \
  chmod +x /usr/bin/xvfb-chromium

ENV CHROME_BIN=/usr/bin/xvfb-chromium

WORKDIR /app

EXPOSE 4200 9876

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

CMD ["ng", "serve", "--host=0.0.0.0"]