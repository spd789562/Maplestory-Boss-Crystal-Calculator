import { Fragment } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { Layout, BackTop } from 'antd'
import { appWithTranslation, withTranslation } from '../src/i18n'
import '../styles/antd.less'
import '../styles/globals.css'

import styles from '../styles/Home.module.css'

const NextHead = withTranslation('index')(({ t, i18n: { language } }) => (
  <Head>
    <title>{t('title')}</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <meta name="description" content={t('seo_desc')} />
    <meta
      name="keywords"
      content="Maplstory Boss Crystal,Intense Power Crystal,強力的力量結晶,力量結晶計算機"
    />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={t('seo_desc')} />
    <meta
      property="og:url"
      content="https://maplestory-boss-crystal-calculator.vercel.app/"
    />
    <meta property="og:locale" content={language} />
    <meta property="og:site_name" content={t('title')} />
    <meta property="og:title" content={t('title')} />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap"
      rel="stylesheet"
    />
    {language === 'zh_cn' && (
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap"
        rel="stylesheet"
      />
    )}
  </Head>
))

const AppFooter = withTranslation('index')(({ t }) => (
  <Layout.Footer className={styles.footer}>
    <div>
      Other tools：
      <a href="https://maplestory-arcane-symbol-calculator.vercel.app/">
        Arcane Calcaulator
      </a>
      、<a href="https://maplesalon.vercel.app/">MapleSalon</a>
    </div>
    {t('title')} ©2020 Created by 丫村
  </Layout.Footer>
))

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <NextHead />
      <Layout>
        <BackTop />
        <Component {...pageProps} />
        <AppFooter />
      </Layout>
    </Fragment>
  )
}

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
})

export default appWithTranslation(MyApp)
