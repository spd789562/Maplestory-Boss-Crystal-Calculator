import React, { Fragment, useCallback, useEffect } from 'react'
import { Layout, Select, Button } from 'antd'

/* store */
import { useStore, useDispatch } from '@store'
import { INIT_BOSS_DATA, RESET_BOSS_DATA } from '@store/boss'

/* component */
import { Row, Col } from 'antd'
import GoogleAD from '../src/component/google-ad'
import BossList from '@components/boss-list'
import OptimalTable from '@components/optimal-table'
import SettingCard from '@components/setting-cards'

/* i18n */
import { withTranslation } from '../src/i18n'

/* helper */
import moment from 'moment'
import { assoc, clone, propEq } from 'ramda'

/* mapping */
import BossListMapping, { BossObject } from '@mapping/boss'

import styles from '../styles/Home.module.css'

const { Header, Content } = Layout

const storageKey = 'MAPLESTORY_BOSS_CRYSTAL_CALCULATOR_DATA'

const utcMoment = (date) => moment(date).utc()
const defineResetTime = (dayOfWeek, date) =>
  utcMoment(date).day() >= dayOfWeek
    ? utcMoment(date).day(dayOfWeek + 7)
    : utcMoment(date).day(dayOfWeek)

function Home({ t, i18n }) {
  const dispatch = useDispatch()
  useEffect(() => {
    if (process.browser) {
      let data = JSON.parse(window.localStorage.getItem(storageKey))
      const {
        region = 'GMS',
        advanced = true,
        resetDayOfWeek = 4,
        resetHour = 0,
      } = JSON.parse(localStorage.getItem('meta') || 'null') || {
        advanced: localStorage.getItem('advanced') === 'true',
        resetDayOfWeek: localStorage.getItem('resetDayOfWeek') || 4,
        resetHour: localStorage.getItem('resetHour') || 0,
      }
      const _lastOpen =
        +window.localStorage.getItem('lastOpenDate') || utcMoment()
      const lastOpen = utcMoment(_lastOpen)
      if (data && data.length) {
        const isDifferentDay = utcMoment().isAfter(lastOpen, 'day')
        const currentResetTime = defineResetTime(+resetDayOfWeek)
        const lastResetTime = defineResetTime(+resetDayOfWeek, lastOpen)
        const isDifferentCycle = !currentResetTime.isSame(lastResetTime, 'day')
        const isAfterResetHout = utcMoment().hour() >= +resetHour
        data = advanced
          ? data.map((boss) => {
              const { defeatType } = BossObject[region][boss.id] || {}
              let bossData = clone(boss)
              if (defeatType) {
                // today is different day with last open or defeatDate is different day
                if (
                  defeatType === 'day' &&
                  (isDifferentDay ||
                    (bossData.defeatDate &&
                      utcMoment().isAfter(
                        utcMoment(bossData.defeatDate),
                        'day'
                      )))
                ) {
                  bossData = assoc('defeatDate', 0, bossData)
                }
                // today is different cycle with last open or defeatDate is different week
                if (
                  (isDifferentCycle &&
                    isAfterResetHout &&
                    defeatType !== 'month') ||
                  (defeatType === 'week' &&
                    bossData.defeatDate &&
                    !currentResetTime.isSame(
                      defineResetTime(+resetDayOfWeek, bossData.defeatDate),
                      'day'
                    ))
                ) {
                  if (defeatType === 'week') {
                    bossData = assoc('defeatDate', 0, bossData)
                  }
                  // when corss reset time, reset all defeat count except monthly moss
                  bossData = assoc('defeatTime', 0, bossData)
                }
                if (defeatType === 'month' && bossData.defeatDate) {
                  const bossResetTime = defineResetTime(
                    +resetDayOfWeek,
                    utcMoment(bossData.defeatDate).add(1, 'month')
                  )
                  if (utcMoment().isAfter(bossResetTime)) {
                    bossData = assoc('defeatDate', 0, bossData)
                    bossData = assoc('defeatTime', 0, bossData)
                  }
                }
              }
              return bossData
            })
          : data
        dispatch({
          type: INIT_BOSS_DATA,
          payload: BossListMapping[region]
            .map(({ id, difficulties }) => ({
              id,
              defeatable: false,
              partyCount: 1,
              defeatTime: 0,
              difficulty: difficulties[difficulties.length - 1].difficulty,
            }))
            .map((boss) => {
              const mapping = data.find(propEq('id', boss.id))
              return mapping || boss
            }),
        })
        window.localStorage.setItem('lastOpenDate', new Date().getTime())
      }
    }
  }, [process.browser])
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
