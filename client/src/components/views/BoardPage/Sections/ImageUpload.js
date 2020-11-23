import React, { useState, useEffect } from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios';

function ImageUpload(props) {

    console.log("이미지", props.image)
    const [Img, setImage] = useState(props.image);




    const [Loading, setLoading] = useState(false);

    const BASE_URL = "http://localhost:5000";

    const getBase64 = (img, callback)  => {

        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const beforeUpload = (file) => {

        console.log("beforeUpload");
        console.log("file", file);

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = (info) => {

        console.log("handleChange", info);

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
            getBase64(info.file.originFileObj, async (imageUrl) =>{
                const formData = new FormData();
                await formData.append('id', localStorage.getItem('userId'));
                await formData.append('img', info.file.originFileObj);
                axios.post('/api/mypage/avatar', formData)
                    .then(response => {
                        if (response.data.success) {
                            console.log("dfdsfsdfsdfsd",response.data)
                            setImage(response.data.file)
                            setLoading(false)
                            alert("이미지 업로드 성공");
                        } 
                        else {
                            alert("이미지 업로드 실패");
                        }
                })
            });
        }
    };

    const uploadButton = (
        <div>
          {Loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">Upload</div>
        </div>
    );
    
    return (
        <div>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >

                {/* {props.image  && <img src={`${BASE_URL}/img/${props.image}`} alt="avatar" style={{ width: '100%' }}/> } */}

                {Img ? <img src={`${BASE_URL}/img/${Img}`} alt="avatar" style={{ width: '100%' }}/> : 
                props.image ? <img src={`${BASE_URL}/img/${props.image}`} alt="avatar" style={{ width: '100%' }}/> :uploadButton }

                {/* {props.image && <img src={`${BASE_URL}/img/${props.image}`} alt="avatar" style={{ width: '100%' }}/>} */}

                {/* {img ? <img src={`${BASE_URL}/img/${img}`} alt="avatar" style={{ width: '100%' }}/> : uploadButton} */}

                {/* {img ? <img src={img} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
            </Upload>
        </div>
    )
}

export default withRouter(ImageUpload)
