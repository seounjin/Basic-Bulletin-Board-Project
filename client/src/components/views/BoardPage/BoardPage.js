import React, { useEffect, useState } from 'react'
import './board.css';
import { withRouter, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { requestBoardList } from '../../../_actions/board_actions';
import { Button, Pagination } from 'antd';
import queryStirng from 'query-string'


function BoardPage(props) {

    const [List, setList] = useState([])
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0);

    const getPageSize = () => {
        const { search } = props.location;
        const queryObj = queryStirng.parse(search);
        const { list_num } = queryObj;
 
        if (list_num) {
            return parseInt(list_num)
        } else{
            return 10
        }
    }

    useEffect(() => {
        
        requestBoard()
    }, [props.match.params.pageNum,getPageSize()])

    const onShowSizeChange = (current, pageSize) => {
        console.log("onShowSizeChange", current, pageSize);

        const body = {
            currentPage : current,
            pageSize : pageSize
        }

        dispatch(requestBoardList(body))
            .then(response =>{
            if (response.payload.success){
                setList(response.payload.boardList);
                setTotal(response.payload.pageData.totalPage)
                props.history.push(`${current}?list_num=${pageSize}`)
            } else {
                alert('게시판 정보를 가져오는데 실패했습니다.')
            }

        })

    }

    const pageSelect = (page) => {
        console.log("page", page);
        const body = {
            currentPage : page,
            pageSize : getPageSize()
        }

        dispatch(requestBoardList(body))
            .then(response =>{
            if (response.payload.success){
                setList(response.payload.boardList);
                setTotal(response.payload.pageData.totalPage)

                if (getPageSize() === 10){
                    props.history.push(`${page}`)
                }
                else {
                    props.history.push(`${page}?list_num=${getPageSize()}`)
                }
            } else {
                alert('게시판 정보를 가져오는데 실패했습니다.')
            }

        })
    }


    const requestBoard = () => {

        let body = {
            currentPage : props.match.params.pageNum,
            pageSize : getPageSize()
        }

        dispatch(requestBoardList(body))
            .then(response =>{
                if (response.payload.success){
                    setList(response.payload.boardList);
                    setTotal(response.payload.pageData.totalPage)
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
                    [props.match.params.pageNum]
            }}>{ list.title }</Link></td>
            <td>{ list.writer }</td>
            <td>{ list.d }</td>
            <td>{ list.views }</td>
            <td>{ list.favorite }</td>
        </tr>

    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>

            <h2> 게시판 </h2>

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

            <div style={{ display: 'flex', justifyContent: 'flex-end', transform: 'translate( 0%, 25%)' }}>
                <Button type="primary" htmlType="submit">
                    <Link to={{
                    pathname : `/write`,
                    state :
                        [ 0,
                        "",
                        "",
                        0]
                    }}>글쓰기</Link>
                </Button>

            </div>

            <div style={{textAlign: 'center', transform: 'translate( 0%, 70%)'}}>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}

                    current={parseInt(props.match.params.pageNum)}
                    total={Total}
                    onChange = {pageSelect}
                    pageSizeOptions = {[10,15,20,30]}
                    pageSize = {getPageSize()}
                />
            </div>

        </div>
    )
}

export default withRouter(BoardPage)
