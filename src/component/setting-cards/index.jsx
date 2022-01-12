import { useEffect, useCallback, Fragment } from 'react'

/* store */
import { useStore } from '@store'
import { UPDATE_META } from '@store/meta'

/* components */
import {
  Row,
  Col,
  Card,
  Select,
  Form,
  Switch,
  Tooltip,
  InputNumber,
} from 'antd'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import moment from 'moment'
import {
  assoc,
  dissoc,
  pick,
  times,
  T,
  ifElse,
  isNil,
  prop,
  pipe,
  not,
  identity,
  has,
  mergeLeft,
  join,
  evolve,
  split,
} from 'ramda'

const FORMAT = 'YYYY/MM/DD HH:mm'

const hasValue = (field) => pipe(prop(field), isNil, not)
const removeFieldWhenNeil = (field) =>
  ifElse(hasValue(field), identity, dissoc(field))
const integrateByField = (field) =>
  ifElse(
    has(field),
    identity,
    ifElse(
      isNil,
      () => identity,
      (data) => {
        localStorage.removeItem(field)
        return assoc(field, data)
      }
    )(localStorage.getItem(field))
  )

const TimeZone = {
  TWMS: 480,
  GMS: 0,
}

const getResetDay = (momentObj, dayOfWeek) =>
  (momentObj.day() >= dayOfWeek
    ? momentObj.day(dayOfWeek + 7)
    : momentObj.day(dayOfWeek)
  ).startOf('day')

const SettingCard = ({ t, i18n: { language } }) => {
  const [
    { region, isReboot, resetDayOfWeek, resetHour, remainDays, weekMax },
    dispatch,
  ] = useStore('meta')

  const nextResetTime = getResetDay(moment(), resetDayOfWeek)
    .hour(resetHour)
    .startOf('hour')
    .utc()
  const currentTimeZone = nextResetTime.clone().utcOffset(moment().utcOffset())
  const serverResetTime = nextResetTime.clone().utcOffset(TimeZone[region])
  const getRemainDays = useCallback(
    () => Math.ceil(currentTimeZone.diff(moment(), 'days', true)),
    [currentTimeZone]
  )
  const handleChangeRegion = (value) => {
    const serverTime = getResetDay(
      moment().utcOffset(TimeZone[value]),
      4
    ).utcOffset(moment().utcOffset())
    dispatch({
      type: UPDATE_META,
      payload: {
        region: value,
        resetDayOfWeek: serverTime.day(),
        resetHour: serverTime.hour(),
      },
    })
  }
  const handleChangeMeta = (field) => (value) => {
    dispatch({
      type: UPDATE_META,
      payload: {
        [field]: value,
      },
    })
  }
  useEffect(() => {
    if (process.browser) {
      const meta = JSON.parse(localStorage.getItem('meta'))
      const updatedMeta = pipe(
        removeFieldWhenNeil('region'),
        removeFieldWhenNeil('isReboot'),
        removeFieldWhenNeil('advanced'),
        removeFieldWhenNeil('resetDayOfWeek'),
        removeFieldWhenNeil('resetHour'),
        removeFieldWhenNeil('remainDays'),
        removeFieldWhenNeil('weekMax'),
        removeFieldWhenNeil('bossOptions'),
        removeFieldWhenNeil('filterOption'),
        evolve({ bossOptions: split(',') })
      )(meta)
      const integrateOldMeta = pipe(
        integrateByField('region'),
        integrateByField('isReboot'),
        integrateByField('advanced'),
        integrateByField('resetDayOfWeek'),
        integrateByField('resetHour'),
        integrateByField('remainDays'),
        integrateByField('weekMax'),
        integrateByField('bossOptions'),
        integrateByField('filterOption')
      )(updatedMeta)
      dispatch({
        type: UPDATE_META,
        payload: integrateOldMeta,
      })
      if (!integrateOldMeta.region) {
        handleChangeRegion(language === 'zh_tw' ? 'TWMS' : 'GMS')
      }
    }
  }, [])

  return (
    <Card title={t('setting')}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item label={t('game_region')} shouldUpdate>
            <Select
              onChange={handleChangeRegion}
              defaultValue={'TWMS'}
              style={{ width: 100 }}
              value={region}
            >
              <Select.Option value="TWMS">TWMS</Select.Option>
              <Select.Option value="GMS">GMS</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t('remain_days')} shouldUpdate>
            <Select
              onChange={handleChangeMeta('remainDays')}
              defaultValue={7}
              style={{ width: 80 }}
              value={remainDays}
            >
              {times(
                (index) => (
                  <Select.Option value={index + 1} key={`remain_day_${index}`}>
                    {index + 1}
                  </Select.Option>
                ),
                7
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t('week_max')} shouldUpdate>
            <InputNumber
              onChange={handleChangeMeta('weekMax')}
              defaultValue={180}
              style={{ width: 80 }}
              value={weekMax}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Reboot"
            shouldUpdate={T}
            style={{
              display: 'inline-flex',
            }}
          >
            <Switch
              onChange={handleChangeMeta('isReboot')}
              checked={isReboot}
              key={`tools-${isReboot}`}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  )
}

SettingCard.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(SettingCard)
