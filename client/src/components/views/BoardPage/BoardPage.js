import React, { useEffect, useState } from 'react'
import './board.css';
import { withRouter, Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { requestBoardList } from '../../../_actions/board_actions';
import { Button } from 'antd';



function BoardPage(props) {

    const [List, setList] = useState([])
    const dispatch = useDispatch();

    const boardInfo = useSelector(state => state.board) // state에서 state유저정보를 가져와서



    useEffect(() => {

        requestBoard()
        
    }, [])


    const requestBoard = () => {

        dispatch(requestBoardList())
            .then(response =>{
            if (response.payload.success){
                setList(response.payload.boardList);
            } else {
                alert('게시판 정보를 가져오는데 실패했습니다.')
            }

        })
    }

    const boardList = List.map((list, index) => {

        return <tr key = { index }>
            <td>{ list.postnum }</td>
            <td><Link to={{
                pathname : `/boardform/${list.postnum}`,
                state : 
                    [ list.title, 
                      list.writer,
                      list.views, 
                      list.favorite]    
            }}>{ list.title }</Link></td>
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
                        <th>번 호</th>
                        <th>제 목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조 회</th>
                        <th>좋아요</th>
                    </tr>
                </thead>
                <tbody>
                    { boardList }
                </tbody>
            </table>

            <hr />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                
                <Button type="primary" htmlType="submit">
                    <Link to={{
                        pathname : `/board/write`,
                        state : 
                            [ 0,
                            "",
                            ""]    
                    }}>글쓰기</Link>
                </Button>

            </div>

        </div>
    )
}

export default withRouter(BoardPage)