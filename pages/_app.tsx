import { BaseStyles } from "@primer/components"
import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import Head from "next/head"
import React from "react"
import "react-toastify/dist/ReactToastify.css"
import "~/styles/globals.css"
import { Layout } from "~/components/Layout"

const Provider = dynamic(() => import("~/components/Provider"), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <BaseStyles>
        <Head>
          <title>bozz</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BaseStyles>
    </Provider>
  )
}
