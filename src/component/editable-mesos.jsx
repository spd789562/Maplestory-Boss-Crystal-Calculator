import { useState, useCallback } from 'react'

import { InputNumber } from 'antd'

import numberFormat from '@utils/number-format'
import { useDispatch } from '@store'

import { UPDATE_MESOS_DATA } from '@store/mesos'

const EditableMesos = ({ region, name, difficulty, mesos }) => {
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()
  const handleUpdate = useCallback(({ target: { value } }) => {
    const _mesos = +value
    _mesos !== mesos &&
      dispatch({
        type: UPDATE_MESOS_DATA,
        payload: {
          region,
          name,
          difficulty,
          mesos: +value,
        },
      })
    setIsEdit(false)
  }, [])
  const handleEdit = useCallback(() => {
    setIsEdit(true)
  }, [])
  return isEdit ? (
    <InputNumber
      defaultValue={mesos}
      onPressEnter={handleUpdate}
      onBlur={handleUpdate}
      autoFocus
    />
  ) : (
    <span onClick={handleEdit}>{numberFormat(mesos)}</span>
  )
}

export default EditableMesos
