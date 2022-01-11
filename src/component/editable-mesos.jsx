import { useState, useCallback } from 'react'

import { InputNumber } from 'antd'

import numberFormat from '@utils/number-format'
import { useStore } from '@store'

import { UPDATE_MESOS_DATA } from '@store/mesos'

const EditableMesos = ({ region, name, difficulty, defaultMesos }) => {
  const [mesos, dispatch] = useStore(`mesos.${region}.${name}.${difficulty}`)
  const [isEdit, setIsEdit] = useState(false)
  const _mesos = mesos || defaultMesos
  const handleUpdate = useCallback(
    ({ target: { value } }) => {
      const editedMesos = +value
      editedMesos !== _mesos &&
        dispatch({
          type: UPDATE_MESOS_DATA,
          payload: {
            region,
            name,
            difficulty,
            mesos: editedMesos,
          },
        })
      setIsEdit(false)
    },
    [_mesos]
  )
  const handleEdit = useCallback(() => {
    setIsEdit(true)
  }, [])
  return isEdit ? (
    <InputNumber
      defaultValue={_mesos}
      onPressEnter={handleUpdate}
      onBlur={handleUpdate}
      autoFocus
    />
  ) : (
    <span onClick={handleEdit}>{numberFormat(_mesos)}</span>
  )
}

export default EditableMesos
