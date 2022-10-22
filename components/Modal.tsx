import React from 'react'
import MuiModal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtoms';

function Modal() {
  const [modalVisible, setModalVisible] = useRecoilState(modalState);

  const handleClose = () => {
    setModalVisible(false);
  }

  return (
    <MuiModal open={modalVisible} onClose={handleClose}>
      <>
        Modal
      </>
    </MuiModal>
  )
}

export default Modal