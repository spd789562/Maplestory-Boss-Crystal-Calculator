import { useCallback } from 'react'
import { useDispatch } from '@store'

import { Upload, Button, notification } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { INIT_MESOS_DATA } from '@store/mesos'

const UploadButton = () => {
  const dispatch = useDispatch()
  const handleUpload = useCallback((file) => {
    const readPromise = new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result)
        dispatch({ type: INIT_MESOS_DATA, payload: data })
        notification.success({
          message: 'Import Success',
          description: 'Import data successfully',
        })
        reject('it success not error')
      }
      reader.readAsText(file)
    })
    return readPromise
  }, [])
  return (
    <Upload action={handleUpload} maxCount={1} showUploadList={false}>
      <Button icon={<UploadOutlined />}>Import</Button>
    </Upload>
  )
}

export default UploadButton
