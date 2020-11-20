import React, { Fragment, useCallback, useEffect } from 'react'
import { Layout, Select, Button } from 'antd'

/* store */
import { useDispatch } from '@store'
import { INIT_BOSS_DATA, RESET_BOSS_DATA } from '@store/boss'

/* component */
import { Row, Col } from 'antd'
import GoogleAD from '../src/component/google-ad'
import BossList from '@components/boss-list'
import OptimalTable from '@components/optimal-table'
import SettingCard from '@components/setting-cards'

/* mapping */

/* helper */
import { withTranslation } from '../src/i18n'

import styles from '../styles/Home.module.css'

import { debounce } from 'throttle-debounce'

const { Header, Content } = Layout

const storageKey = 'MAPLESTORE_BOSS_CRYSTAL_CALCULATOR_DATA'

const initialValues = {}

function Home({ t, i18n }) {
  const dispatch = useDispatch()
  useEffect(() => {
    if (process.browser) {
      const data = JSON.parse(window.localStorage.getItem(storageKey))
      data && data.length && dispatch({ type: INIT_BOSS_DATA, payload: data })
    }
  }, [])
  const handelReset = () => {
    dispatch({ type: RESET_BOSS_DATA })
  }
  return (
    <Fragment>
      <Header className={styles.header}>
        <div className={styles['header-container']}>
          <h2 style={{ marginBottom: 0 }}>
            {t('title')}
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
      <Content className={styles.content}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <SettingCard />
          </Col>
          <Col span={24}>
            <BossList />
          </Col>
          <Col span={24}>
            <OptimalTable />
          </Col>
        </Row>
      </Content>
      <Content className={styles.content}>
        <div className={styles.info}>
          <div className={styles['info-text']}>
            {t('just_a_advertisement')}(´・ω・`)
          </div>
          <GoogleAD />
        </div>
      </Content>
    </Fragment>
  )
}

Home.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(Home)
