import React, { useEffect, useState } from 'react'
import './board.css';
import { withRouter, Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { requestBoardList } from '../../../_actions/board_actions';
import { Button, Pagination } from 'antd';
import queryStirng from 'query-string'


function BoardPage(props) {

    // console.log("props.match.params.pageNum",   props.match.params.pageNum)
    // console.log("props.match.params.pageSize",   props.match.params.pageSize)
    console.log("props.history",   props.history)
    console.log("props.location",   props.location)

    const [List, setList] = useState([])
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [currentPage, setcurrentPage] = useState(parseInt(props.match.params.pageNum))
    const [PageSize, setPageSize] = useState(10)

    useEffect(() => {
        
        const { search } = props.location;
        const queryObj = queryStirng.parse(search);
        const { list_num } = queryObj;

        
        console.log("list_num      ", list_num)

        if (list_num) {
            console.log("fffffffffffff      ", list_num)
            setPageSize(parseInt(list_num))
        }

        requestBoard()
        
    }, [])

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
                setcurrentPage(current);
                props.history.push(`${current}?list_num=${pageSize}`)
                setPageSize(pageSize)
            } else {
                alert('게시판 정보를 가져오는데 실패했습니다.')
            }

        })

    }

    const pageSelect = (page) => {

        console.log("page", page);

        const body = {
            currentPage : page,
            pageSize : PageSize
        }

        dispatch(requestBoardList(body))
            .then(response =>{
            if (response.payload.success){
                setList(response.payload.boardList);
                setTotal(response.payload.pageData.totalPage)
                setcurrentPage(page);

                if (PageSize === 10)
                    props.history.push(`${page}`)
                else {
                    props.history.push(`${page}?list_num=${PageSize}`)
                }
            } else {
                alert('게시판 정보를 가져오는데 실패했습니다.')
            }

        })
    }


    const requestBoard = () => {

        const { search } = props.location;
        const queryObj = queryStirng.parse(search);
        const { list_num } = queryObj;

        let body = {
            currentPage : currentPage,
            pageSize : PageSize
        }

        if (list_num) {
            console.log("fffffffffffff      ", list_num)
            setPageSize(parseInt(list_num))

            body = {
                currentPage : currentPage,
                pageSize : parseInt(list_num)
            }
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
                        pathname : `/write`,
                        state : 
                            [ 0,
                            "",
                            ""]    
                    }}>글쓰기</Link>
                </Button>

            </div>

            <div>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    current={currentPage}
                    total={Total}
                    onChange = {pageSelect}
                    pageSizeOptions = {[10,15,20,30]}
                    pageSize = {PageSize}
                    />
            </div>
            

        </div>
    )
}

export default withRouter(BoardPage)