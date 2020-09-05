import { BaseStyles } from "@primer/components"
import Head from "next/head"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { Layout } from "./Layout"
import { Routes } from "./Routes"
import Provider from "./Provider"

export default function App() {
  return (
    <BrowserRouter>
      <Provider>
        <BaseStyles>
          <Head>
            <title>bozz</title>
          </Head>
          <Layout>
            <Provider>
              <Routes />
            </Provider>
          </Layout>
        </BaseStyles>
      </Provider>
    </BrowserRouter>
  )
}
