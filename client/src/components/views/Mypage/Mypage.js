import React, { useEffect, useState } from 'react'
import { Space, Card } from 'antd';
import { withRouter, Link } from 'react-router-dom'
import ImageUpload from '../BoardPage/Sections/ImageUpload';
import axios from 'axios';

function Mypage(props) {

    const [Id, setId] = useState("");
    const [Email, setEmail] = useState("");
    // const [ConnectDate, setConnectDate] = useState("첫 방문");
    const [nComment, setnComment] = useState(0);

    const [Img , setImg] = useState("");
    
    useEffect(() => {

        //console.log("마이페이지 아이디 출력", localStorage.getItem('userId'))

        const body = {
            id : localStorage.getItem('userId')
        }

        axios.post('/api/mypage/profile', body)
              .then(response => {
                  if (response.data.success) {
                      console.log("data", response.data.info)
                      setId(localStorage.getItem('userId'))
                      setEmail(response.data.info[0])
                      window.sessionStorage.setItem('totalActivityPost', response.data.info[1]);
                      window.sessionStorage.setItem('totalActivityComment', response.data.info[4]);
                      setnComment(response.data.info[2]);
                      setImg(response.data.info[5]);
                    //   if (response.data.info[3]) {
                    //     setConnectDate(response.data.info[3]);
                    //   }
                  } else {
                    alert('정보를 가져올 수 없습니다. \n잠시후 다시 시도해주세요.')
                    props.history.push(``)
                  }
              })
        
    }, [])

    return (
        // <div style={{ width: '50%', margin: '4rem auto' }}>
        <div style={{ position: "absolute", top: '42%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <h2> 마이 페이지 </h2>
            <Space direction="horizontal">
                <Card title="기본 정보" style={{ width: 638, height: 200 }}>
                    <div>
                        <div style={{ width: '200px', height: '150', float: 'left' }}>
                            <ImageUpload image={Img}/>
                           
                        </div>
                        <div style={{ width: '200px', height: '150', float: 'left', marginLeft: 135 }}>
                            <p>I D : {Id}</p>
                            <p>Email : {Email}</p>
                            <p><Link to={{pathname : `/pwcheck`, state : { Email } }}>개인 정보 변경</Link></p>
                        </div>
                    </div>
                </Card>
            </Space>
            <br/><br/>
            <Space direction="horizontal">
                <Card title="활동 내역" style={{ width: 300, height: 200 }}>
                    <p>작성한 게시물 수 : <Link to={{pathname : '/activitydetails/1', state : { con: "0"} }}  >{window.sessionStorage.totalActivityPost}</Link></p>
                    <p>작성한 댓글 수 : <Link to={{pathname : '/activitydetails/1', state : { con: "1"} }} >{nComment} </Link>  / {window.sessionStorage.totalActivityComment} posts </p>
                    {/* <p>최근 접속 일자 : {ConnectDate}</p> */}
                </Card>
                <Card 
                    title="신 고 내 역" 
                    style={{ width: 300, height: 200, marginLeft: 30 }}>
                        <br/>
                        <p><Link to={{pathname : `/MyReport` }}>신고 내역 확인</Link></p>
                </Card>
            </Space>
        </div>
    )
}

export default withRouter(Mypage)
