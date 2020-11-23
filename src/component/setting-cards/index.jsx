/* store */
import { useStore } from '@store'
import {
  CHANGE_REGION,
  CHANGE_ADVANCED,
  CHANGE_RESET_DAY_OF_WEEK,
  CHANGE_RESET_HOUR,
} from '@store/meta'

/* components */
import { Row, Col, Card, Select, Form, Switch, Tooltip, Space } from 'antd'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import moment from 'moment'
import { pick, times } from 'ramda'
import { Fragment } from 'react/cjs/react.production.min'

const FORMAT = 'YYYY/MM/DD HH:mm'

const TimeZone = {
  TWMS: 480,
  GMS: 0,
}

const SettingCard = ({ t }) => {
  const [{ region, advanced, resetDayOfWeek, resetHour }, dispatch] = useStore(
    'meta'
  )
  const handleChangeRegion = (value) => {
    dispatch({ type: CHANGE_REGION, payload: value })
  }
  const handleChangeAdvanced = (value) => {
    dispatch({ type: CHANGE_ADVANCED, payload: value })
  }
  const handleChangeDay = (value) => {
    dispatch({ type: CHANGE_RESET_DAY_OF_WEEK, payload: value })
  }
  const handleChangeHour = (value) => {
    dispatch({ type: CHANGE_RESET_HOUR, payload: value })
  }
  const nextResetTime = (moment().day() >= resetDayOfWeek
    ? moment().day(resetDayOfWeek + 7)
    : moment().day(resetDayOfWeek)
  )
    .hour(resetHour)
    .startOf('hour')
    .utc()
  const currentTimeZone = nextResetTime.clone().utcOffset(moment().utcOffset())
  const serverResetTime = nextResetTime.clone().utcOffset(TimeZone[region])
  return (
    <Card title={t('setting')}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Tooltip title={t('advanced_mode_description')} key={advanced}>
            <Form.Item
              label={t('advanced_mode')}
              shouldUpdate
              style={{
                display: 'inline-flex',
                marginBottom: advanced ? 4 : 24,
              }}
            >
              <Switch
                onChange={handleChangeAdvanced}
                defaultValue={advanced}
                checked={advanced}
              />
            </Form.Item>
          </Tooltip>
        </Col>
        {advanced && (
          <Col span={24} style={{ marginBottom: 24 }}>
            <Tooltip title={t('reset_description')}>
              <Form.Item
                label={t('reset_day')}
                shouldUpdate
                style={{ display: 'inline-flex', marginBottom: 0 }}
              >
                <Select
                  onChange={handleChangeDay}
                  style={{ width: 100 }}
                  value={+resetDayOfWeek}
                >
                  {times(
                    (index) => (
                      <Select.Option value={index} key={`day_${index}`}>
                        {t(`day_${index}`)}
                      </Select.Option>
                    ),
                    7
                  )}
                </Select>
              </Form.Item>
              &nbsp;
              <Form.Item
                label={t('reset_hour')}
                shouldUpdate
                style={{ display: 'inline-flex', marginBottom: 0 }}
              >
                <Select
                  onChange={handleChangeHour}
                  style={{ width: 80 }}
                  value={+resetHour}
                >
                  {times(
                    (index) => (
                      <Select.Option value={index} key={`hour_${index}`}>
                        {index}
                      </Select.Option>
                    ),
                    24
                  )}
                </Select>
              </Form.Item>
              &nbsp;
              <div style={{ color: '#878787' }}>
                {t('next_reset_time')}:&nbsp;
                {currentTimeZone.isSame(serverResetTime) ? (
                  currentTimeZone.format(FORMAT)
                ) : (
                  <Fragment>
                    <div>
                      {t('current_zone')}: {currentTimeZone.format(FORMAT)}
                    </div>
                    <div>
                      {t('server_zone')}: {serverResetTime.format(FORMAT)}
                    </div>
                  </Fragment>
                )}
              </div>
            </Tooltip>
          </Col>
        )}
        <Col span={24}>
          <Form.Item label={t('game_region')} shouldUpdate>
            <Select
              onChange={handleChangeRegion}
              defaultValue={'TWMS'}
              style={{ width: 100 }}
              value={region}
            >
              <Select.Option value="TWMS">TWMS</Select.Option>
            </Select>
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
