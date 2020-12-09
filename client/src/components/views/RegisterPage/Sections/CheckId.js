import React, { useState } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { getId } from '../../../../_actions/user_actions'

const CheckId = ({ availableId }) => {
  const dispatch = useDispatch();

   const [userId, setUserId] = useState("false");
   const [isModalVisible, setIsModalVisible] = useState(false);

   const onIdHandler = (event) => {
    setUserId(event.currentTarget.value); 
    } 

   const showModal = () => {
    setIsModalVisible(true);
   };

   const handleOk = () => {
    setUserId(""); 
    setIsModalVisible(false);
    availableId(userId);
    };

   const handleCancel = () => {
    setUserId(""); 
    setIsModalVisible(false);
   };

   const checkClick = () => {
    
    const body = {
        userId: userId
    }

    
    dispatch(getId(body))
    .then(response => {
        if (response.payload.success) {
            if (response.payload.available){
                alert('사용할 수 있는 아이디입니다.');
            } else {
                alert('사용할 수 없는 아이디입니다.');
            }

        } else {
            alert('Id check 실패');
        }

    });


  } ;

  return (
    <>
      <button style={{marginLeft: '5px'}} type="button" onClick={showModal}>
        중복 체크
      </button>
      
      <Modal
        title="아이디 중복체크"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>Id를 입력해주세요</label>
        <div style={{flexGrow:'0'}}>
            <input type="id" value={userId.replace(/(\s*)/g, "")}  onChange={onIdHandler}/>
            <button style={{marginLeft: '5px'}} type="button" onClick={checkClick}> Check </button>
        </div>


      </Modal>
    </>
  );
}

export default CheckId
