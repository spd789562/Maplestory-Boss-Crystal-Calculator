import { Fragment } from 'react'
import App from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { appWithTranslation, withTranslation } from '@i18n'
import { Provider, useDispatch } from '@store'

import { Layout, BackTop, Select, Button } from 'antd'
import GoogleAD from '../src/component/google-ad'

import '@styles/antd.less'
import '@styles/globals.css'

import styles from '@styles/Home.module.css'

const { Header, Content, Footer } = Layout

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

const AppHeader = withTranslation('index')(({ t, i18n }) => {
  const dispatch = useDispatch()

  const handelReset = () => {
    dispatch({ type: RESET_BOSS_DATA })
  }
  return (
    <Header className={styles.header}>
      <div className={styles['header-container']}>
        <h2 style={{ marginBottom: 0 }}>
          <Link href="/">{t('title')}</Link>
          &nbsp;
        </h2>
        <div style={{ marginLeft: 'auto' }}>
          <Button onClick={handelReset} style={{ marginRight: '.5rem' }}>
            {t('reset')}
          </Button>
          <Select
            onChange={(value) =>
              i18n.changeLanguage && i18n.changeLanguage(value)
            }
            defaultValue={i18n.language}
          >
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="zh_tw">繁體中文</Select.Option>
            <Select.Option value="zh_cn">简体中文</Select.Option>
          </Select>
        </div>
      </div>
    </Header>
  )
})

const AppFooter = withTranslation('index')(({ t }) => (
  <Footer className={styles.footer}>
    <div>
      {t('other_tools')}：
      <a href="https://maplestory-arcane-symbol-calculator.vercel.app/">
        {t('web_arcane_symbol_calculator')}
      </a>
      、<a href="https://maplesalon.vercel.app">{t('web_maplesalon')}</a>
    </div>
    {t('title')} ©2020 Created by 丫村
  </Footer>
))

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <NextHead />
      <Layout>
        <BackTop />
        <Provider>
          <AppHeader />
          <Component {...pageProps} />
        </Provider>
        <AppFooter />
      </Layout>
    </Fragment>
  )
}

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
})

export default appWithTranslation(MyApp)
