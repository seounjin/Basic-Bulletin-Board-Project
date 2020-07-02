import React, { useState } from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios';

function ImageUpload() {

    const [img, setImage] = useState(null);
    const [Loading, setLoading] = useState(false);

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

        console.log("handleChange");

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
            getBase64(info.file.originFileObj, async (imageUrl) =>{
                //서버에 이미지 보내기.
                // body = {
                //     image : imageUrl
                // }

                let output = document.getElementById('data')
                output = imageUrl
                console.log("dfdsfsdfsdfsd",info.file.originFileObj)

                setImage(imageUrl)
                setLoading(false)
                const formData = new FormData();
                await formData.append('img', info.file.originFileObj);
                axios.post('/api/mypage/imageUpload', formData)
                    .then(response => {
                        if (response.data.url) {
                            console.log("dfdsfsdfsdfsd",response.data.url)
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
                {img ? <img src={img} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </div>
    )
}

export default withRouter(ImageUpload)
