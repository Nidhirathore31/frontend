import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Scripts from HTML */}
        <script src="/vendor/jquery/jquery.min.js"></script>
        <script src="/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/js/custom.js"></script>
        <script src="/assets/js/owl.js"></script>
        <script src="/assets/js/slick.js"></script>
        <script src="/assets/js/isotope.js"></script>
        <script src="/assets/js/accordions.js"></script>
      </body>
    </Html>
  )
}