import { useCallback } from 'react'
import { useStore } from '@store'

import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

import download from 'downloadjs'
import moment from 'moment'

import { withTranslation } from '@i18n'

const DownloadButton = ({ t }) => {
  const [mesosData] = useStore('mesos')
  const handleDownload = useCallback(() => {
    const data = JSON.stringify(mesosData, null, 2)
    download(
      data,
      `mesos-${moment().format('YYYY-MM-DD')}.json`,
      'application/json'
    )
  }, [mesosData])
  return (
    <Button icon={<DownloadOutlined />} onClick={handleDownload}>
      {t('table_download')}
    </Button>
  )
}

DownloadButton.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(DownloadButton)
