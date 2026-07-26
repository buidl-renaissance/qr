import Head from "next/head";
import QrStudio from "@/components/QrStudio";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>QR — Code Customizer</title>
        <meta
          name="description"
          content="Generate QR codes with full control over modules, eyes, colors, gradients, and logo."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QrStudio />
    </>
  );
}
