import React from 'react';

export default function DeleteModal({ handleDeleteModalRow, handleCloseModal, deleteMessage }) {
  return (
    <div onClick={handleCloseModal}>
    <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }}
    >
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            padding: '10px',
        }}
        >
        <div className="chartCardTop">
        <div className="kyccustomformheading">
            <h3 style={{ fontWeight: 'bold' }}>{deleteMessage}</h3>
        </div>
        </div>
        <div className='confirm_p_w_del mTB00 button-container rspacing'>
            <button className='blackbtn aryousureBTN_del confirmBtnR_del'
            onClick={handleCloseModal}
            >
                No
            </button>
            <button className='aryousureBTN_del confirmBtnR_del'
            onClick={handleDeleteModalRow}
            >
                Yes
            </button>
        </div>
    </div>
</div>
</div>
  )
}
