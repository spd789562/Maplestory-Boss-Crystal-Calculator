import { useCallback } from 'react'
import { useDispatch } from '@store'

import { Upload, Button, notification } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

/* i18n */
import { withTranslation } from '@i18n'

import { INIT_MESOS_DATA } from '@store/mesos'

const validMesos = (text) => {
  if (text.startsWith('{')) {
    const data = JSON.parse(text)
    const valid = Object.keys(data).every((region) => {
      if (['TWMS', 'GMS'].includes(region)) {
        const regionData = data[region]
        return Object.keys(regionData).every((boss) => {
          const bossData = regionData[boss]
          return Object.keys(bossData).every((difficulty) => {
            const mesos = bossData[difficulty]
            return Number.isSafeInteger(mesos)
          })
        })
      }
      return false
    })
    if (valid) {
      return data
    }
  }
  return false
}

const UploadButton = ({ t }) => {
  const dispatch = useDispatch()
  const handleUpload = useCallback((file) => {
    const readPromise = new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = validMesos(e.target.result)
        if (!data) {
          notification.error({
            message: t('table_upload_fail'),
            description: t('table_upload_fail_desc'),
          })
          return
        }
        dispatch({ type: INIT_MESOS_DATA, payload: data })
        notification.success({
          message: t('table_upload_success'),
          description: t('table_upload_success_desc'),
        })
        reject('it success not error')
      }
      reader.readAsText(file)
    })
    return readPromise
  }, [])
  return (
    <Upload action={handleUpload} maxCount={1} showUploadList={false}>
      <Button icon={<UploadOutlined />}>{t('table_upload')}</Button>
    </Upload>
  )
}

UploadButton.getInitialProps = async () => ({
  namespacesRequired: ['index'],
})

export default withTranslation('index')(UploadButton)
