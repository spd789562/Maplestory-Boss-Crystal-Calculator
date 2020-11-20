/* store */
import { useStore } from '@store'
import { CHANGE_REGION, CHANGE_ADVANCED } from '@store/meta'

/* components */
import { Row, Col, Card, Select, Form, Switch } from 'antd'

/* i18n */
import { withTranslation } from '@i18n'

/* utils */
import { pick } from 'ramda'

const SettingCard = ({ t }) => {
  const [{ region, advanced }, dispatch] = useStore('meta')
  const handleChangeRegion = (value) => {
    dispatch({ type: CHANGE_REGION, payload: value })
  }
  const handleChangeAdvanced = (value) => {
    dispatch({ type: CHANGE_ADVANCED, payload: value })
  }
  return (
    <Card title={t('setting')}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item label={t('advanced_mode')} shouldUpdate>
            <Switch onChange={handleChangeAdvanced} value={advanced} />
          </Form.Item>
        </Col>
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
