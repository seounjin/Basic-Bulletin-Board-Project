import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function BoardPage() {

    const [List, setList] = useState([])

    useEffect(() => {

        requestBoardList()
        
    }, [])


    const requestBoardList = () => {
        Axios.get('/api/board/openpage') // 무엇을 보내야 할까
        .then(response =>{
            if (response.data.success){
                setList(response.data.boardList);
            } else {
                alert('실패요')
            }
        });

    }

    const boardList = List.map((list, index) => {

        return <tr key = { index }>

            <td>{ list.postnum }</td>
            <td>{ list.title }</td>
            <td>{ list.writer }</td>
            <td>{ list.date }</td>
            <td>{ list.view }</td>
            <td>{ list.favorite }</td>

        </tr>

    })



    return (
        <div>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <td>작성자</td>
                        <td>작성일</td>
                        <td>조회</td>
                        <td>좋아요</td>
                    </tr>
                </thead>
                <tbody>

                    { boardList }
                
                </tbody>
            </table>


        </div>
    )
}

export default withRouter(BoardPage)
