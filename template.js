export default ({ markup }) => {
  return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          >
          <title>CONSAMS</title>
        </head>
        <body style="margin:0">
          <div id="root">${markup}</div>
          <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>`;
};
