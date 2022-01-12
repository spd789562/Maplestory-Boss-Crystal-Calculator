import { useCallback } from 'react'
import { useStore } from '@store'

import { Upload, Button, notification } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

import download from 'downloadjs'
import moment from 'moment'

const DownloadButton = () => {
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
      Export
    </Button>
  )
}

export default DownloadButton
