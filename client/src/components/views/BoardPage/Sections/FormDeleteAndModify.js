import React from 'react'
import { Button } from 'antd'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'



function FormDeleteAndModify(props) {

    const DeletePost = (event) => {
        event.preventDefault();

      const body = {
          pNum : props.num
      }

      axios.post('/api/board/deletePost', body)
            .then(response => {
                if (response.data.success) {
                    props.history.push(`/board/${window.sessionStorage.currentPage}`)
                } else {
                    alert('글 삭제에 실패했습니다.')
                }
            })
    }

    // // 신고버튼
    // if (user.userData && !user.userData.isAuth) {
    // } 
    // else { // 수정, 삭제 버튼
    // }

    return (
        <div style={{ display: 'flex'}}>
            {/* 수정,삭제 버튼 */}
                <Button>
                    <Link to={{
                        pathname : `/write`,
                        state : 
                            [ props.num,
                              props.title,
                              props.content,]    
                    }}>수 정</Link>
                </Button>

                {/* 수정,삭제 버튼 */}
                <Button 
                    style={{marginLeft: '0.2rem'}}
                    onClick={DeletePost}>
                    삭제            
                </Button>
            </div>
    )
}

export default withRouter(FormDeleteAndModify)
