import React, { useEffect, useState } from 'react'
import './board.css';
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { requestBoardList } from '../../../_actions/board_actions';


function BoardPage(props) {

    const [List, setList] = useState([])
    const dispatch = useDispatch(); 

    useEffect(() => {

        requestBoard()
        
    }, [])


    const requestBoard = () => {

        dispatch(requestBoardList())
            .then(response =>{
                console.log("보드리스트",response)
            if (response.payload.success){
                setList(response.payload.boardList);
            } else {
                alert('게시판 정보를 가져오는데 실패했습니다.')
            }

        })
    }
    
    // 타이틀을 눌렀을 시 해당 게시글로 가게 함.
    const goToPost = () => {
    }

    //<td>{ list.title }</td> 누르면 내용을 보는 페이지로 가게끔 해야함.
    const boardList = List.map((list, index) => {

        return <tr key = { index }>
            <td>{ list.postnum }</td>
            <td><a href={`/boardform/${list.postnum}`}>{ list.title }</a></td>
            <td>{ list.writer }</td>
            <td>{ list.date }</td>
            <td>{ list.views }</td>
            <td>{ list.favorite }</td>
        </tr>

    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>

            <h2> VS 게시판 </h2>

            <hr />

            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회</th>
                        <th>좋아요</th>
                    </tr>
                </thead>
                <tbody>
                    { boardList }
                </tbody>
            </table>

            <hr />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="button"> 글쓰기 </button>
            </div>

        </div>
    )
}

export default withRouter(BoardPage)
