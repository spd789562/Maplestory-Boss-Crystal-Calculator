import React, { Fragment, useCallback, useEffect } from 'react'

/* component */
import { Avatar, Layout, Select, Space, Table, Form, Card } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import EditableMesos from '@components/editable-mesos'
import DownloadButton from '@components/mesos-data/download'
import UploadButton from '@components/mesos-data/upload'
/* i18n */
import { withTranslation } from '../src/i18n'

/* store */
import { useStore } from '@store'
import { UPDATE_META } from '@store/meta'
import { INIT_MESOS_DATA } from '@store/mesos'

/* helper */
import { assoc, evolve, propEq, equals, path } from 'ramda'
import numberFormat, { unitFormat } from '@utils/number-format'

/* mapping */
import BossListMapping from '@mapping/boss'

import styles from '../styles/Home.module.css'

const { Content } = Layout

const useTableData = (t, region, lang) => {
  const _tableData = []
  BossListMapping[region].forEach((boss) => {
    const { difficulties, ...bossData } = boss
    const difficultiesCount = difficulties.length
    difficulties.forEach((df, index) => {
      _tableData.push({
        ...bossData,
        ...df,
        name: `${!boss.withoutDifficulty ? t(df.difficulty) : ''}${t(
          boss.name
        )}`,
        hasRedStone: df.drops?.find(equals('red_stone')),
        crusaderCoin:
          (df.drops?.find(propEq('name', 'crusaders_coin')) || {}).value || 0,
        avatar: boss.name,
        key: `${boss.id}-${df.difficulty}`,
        linkIndex: index === 0 ? difficultiesCount : 0,
      })
    })
  })
  const _unitFormat = unitFormat(lang)
  const hidden = region !== 'TWMS'
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      fixed: 'left',
      render: (text, { name, avatar }) => (
        <Space>
          <Avatar shape="square" alt={name} src={`/boss/${avatar}.png`} />
          {text}
        </Space>
      ),
    },
    {
      title: 'difficulty',
      dataIndex: 'difficulty',
      align: 'center',
      render: (_, { difficulty }) => t(difficulty),
    },
    {
      title: 'table_defeatTime',
      dataIndex: 'defeatTime',
      align: 'center',
      render: (_, { defeatTime, defeatType, linkIndex }) => {
        return {
          children: (
            <span>
              {defeatTime} / {t(`times_${defeatType}`)}
            </span>
          ),
          props: {
            rowSpan: linkIndex,
          },
        }
      },
    },
    {
      title: 'table_hp',
      dataIndex: 'hp',
      align: 'center',
      render: (_, { hp }) => (
        <span>
          {Array.isArray(hp)
            ? hp.map((h) => (h ? _unitFormat(h, 2) : '？')).join(' / ')
            : hp
            ? _unitFormat(hp, 2)
            : '？'}
        </span>
      ),
      hidden,
    },
    {
      title: () => (
        <span>
          {t('mesos')}
          <br />
          <span
            style={{
              fontSize: '0.8rem',
              color: '#666',
            }}
          >
            ({t('table_mesos_edit_tip')})
          </span>
        </span>
      ),
      dataIndex: 'mesos',
      align: 'right',
      render: (_, { avatar, difficulty, mesos }) => (
        <EditableMesos
          {...{ region, name: avatar, difficulty, defaultMesos: mesos }}
        />
      ),
    },
    {
      title: 'crusader',
      dataIndex: 'crusaderCoin',
      align: 'center',
      hidden,
    },
    {
      title: 'red_stone',
      dataIndex: 'hasRedStone',
      align: 'center',
      render: (_, { hasRedStone }) => hasRedStone && <CheckOutlined />,
      hidden,
    },
    {
      title: 'table_self_contribution',
      dataIndex: 'contribution',
      align: 'center',
      render: (_, { contribution: { self = 0 } = {} }) => self,
    },
    {
      title: 'table_party_contribution',
      dataIndex: 'contribution',
      align: 'center',
      render: (_, { contribution: { party = 0 } = {} }) => party,
    },
  ]

  return {
    tableData: _tableData,
    columns: columns.filter(({ hidden }) => !hidden),
  }
}

function BossTable({ t, i18n }) {
  const [region, dispatch] = useStore('meta.region')
  const handleChangeRegion = (value) => {
    dispatch({
      type: UPDATE_META,
      payload: {
        region: value,
      },
    })
  }
  const { tableData, columns } = useTableData(t, region, i18n.language)
  useEffect(() => {
    const storageData = JSON.parse(
      localStorage.getItem('MAPLESTORY_BOSS_MESOS_DATA') || '{}'
    )
    dispatch({
      type: INIT_MESOS_DATA,
      payload: storageData,
    })
  }, [])

  return (
    <Fragment>
      <Content className={styles.content}>
        <Card
          title={
            <Space wrap>
              {t('boss_data_table')}
              <Form.Item shouldUpdate noStyle>
                <Select
                  onChange={handleChangeRegion}
                  defaultValue={'TWMS'}
                  style={{ width: 100, marginLeft: 8 }}
                  value={region}
                >
                  <Select.Option value="TWMS">TWMS</Select.Option>
                  <Select.Option value="GMS">GMS</Select.Option>
                </Select>
              </Form.Item>
              <DownloadButton />
              <UploadButton />
            </Space>
          }
        >
          <Table
            columns={columns.map(
              evolve({
                title: (text) => (typeof text === 'string' ? t(text) : text),
              })
            )}
            dataSource={tableData}
            pagination={false}
            rowKey="key"
            size="small"
            scroll={{ x: true }}
            bordered
            sticky
          />
        </Card>
      </Content>
    </Fragment>
  )
}

BossTable.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(BossTable)
