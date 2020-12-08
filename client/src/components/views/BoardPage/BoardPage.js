import React, { useEffect, useState } from 'react'
import './board.css';
import { withRouter, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { requestBoardList, requestKeywordList } from '../../../_actions/board_actions';
import { Button, Pagination, Input } from 'antd';
import queryStirng from 'query-string'


function BoardPage(props) {

    const [List, setList] = useState([])
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0);
    const [KeyWord, setKeyWord] = useState("");

    const onKeyWordHandler = (event) => {
        setKeyWord(event.currentTarget.value)
    }

    const getPageSize = () => { // 한 페이지 당 게시물 개수.
        const { search } = props.location;
        const queryObj = queryStirng.parse(search);
        const { list_num } = queryObj;
 
        if (list_num) {
            return parseInt(list_num)
        } else{
            return 10
        }
    }

    const getKeyword = () => {

        const { search } = props.location;
        const queryObj = queryStirng.parse(search);
        const { keyword } = queryObj;

        if (keyword) {
            return keyword
        } else{
            return ""
        }
    }

    useEffect(() => {

        //alert(getKeyword())
        setKeyWord(getKeyword())
        
        if (!getKeyword()) {
            requestBoard();
            setKeyWord("");
        } else {
            const body = {
                keyword : getKeyword(),
                currentPage : props.match.params.pageNum, // 문자열.
                pageSize : getPageSize()
            }

            dispatch(requestBoardList(body))
            .then(response =>{
                if (response.payload.success){
                    setList(response.payload.boardList);
                    setTotal(response.payload.totalPage);
                    setKeyWord(response.payload.keyWord);
                    window.scrollTo(0, 0);
                } else {
                    alert('게시판 정보를 가져오는데 실패했습니다.');
                }
            })
        }        
    }, [props.match.params.pageNum, getPageSize(), getKeyword()])

    const onShowSizeChange = (current, pageSize) => {

        let body = null;

        if(!getKeyword()) {
            body = {
                currentPage : current,
                pageSize : pageSize
            }
        }
        else {
            body = {
                keyword : getKeyword(),
                currentPage : current,
                pageSize : pageSize
            }
        }

        dispatch(requestBoardList(body))
            .then(response =>{
            if (response.payload.success){
                setList(response.payload.boardList);
                setTotal(response.payload.totalPage)
                
                if (!getKeyword()) {
                    props.history.push(`${current}?list_num=${pageSize}`)
                } else {
                    props.history.push(`${current}?list_num=${pageSize}&keyword=${getKeyword()}`)
                    setKeyWord(response.payload.keyWord);
                }
                window.scrollTo(0, 0)
            } else {
                alert('게시판 정보를 가져오는데 실패했습니다.')
            }
        })
    }

    const pageSelect = (page) => {

        let body = null;

        if (!getKeyword()) {
            body = {
                currentPage : page,
                pageSize : getPageSize()
            }
        } else {
            body = {
                keyword : getKeyword(),
                currentPage : page, // 문자열.
                pageSize : getPageSize()
            }
        }

        dispatch(requestBoardList(body))
        .then(response =>{
            if (response.payload.success){
                setList(response.payload.boardList);
                setTotal(response.payload.totalPage);
                window.scrollTo(0, 0);

                if (!getKeyword()) {

                    if (getPageSize() === 10){
                        props.history.push(`${page}`);
                    }
                    else {
                        props.history.push(`${page}?list_num=${getPageSize()}`);
                    }
                } 
                else {
                    //alert(KeyWord)
                    props.history.push(`${page}?list_num=${getPageSize()}&keyword=${getKeyword()}`)
                    setKeyWord(response.payload.keyWord);
                }

            } else {
                alert('게시판 정보를 가져오는데 실패했습니다.');
            }
        })
    }


    const requestBoard = () => {

        let body = {
            currentPage : props.match.params.pageNum, //문자열
            pageSize : getPageSize()
        }

        dispatch(requestBoardList(body))
            .then(response =>{
                if (response.payload.success){
                    setList(response.payload.boardList);
                    setTotal(response.payload.totalPage)
                    window.scrollTo(0, 0)
                } else {
                    alert('게시판 정보를 가져오는데 실패했습니다.')
                }

        })
    }

    const searchKeyword = (value) => { // value ==> string type!!

        if (!value) {
            alert("검색어를 입력해주세요.");
            return;
        }

        //Null이 아닌 value가 들어왔을 때 그 value를 저장하고 관리하는 메모리가 필요할 수도 있음.

        let body = {
            keyword : value,
            currentPage : "1", // 문자열.
            pageSize : getPageSize()
        }

        dispatch(requestBoardList(body))
            .then(response =>{
                if (response.payload.success){
                    setList(response.payload.boardList);
                    setTotal(response.payload.totalPage)
                    props.history.push(`1?list_num=${getPageSize()}&keyword=${value}`)
                    setKeyWord(response.payload.keyWord);
                    window.scrollTo(0, 0)
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
            <td>{ list.date }</td>
            <td>{ list.views }</td>
            <td>{ list.favorite }</td>
        </tr>

    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>

            <div style={{ transform: 'translate( 0%, 53%)' }}>
                <h2> 게시판 </h2>
                <div style={{ transform: 'translate( 0%, -140%)', float: 'right' }}>
                    <Input style={{ width: '196px'}} placeholder="검색어를 입력해주세요" value={KeyWord} onChange={onKeyWordHandler} />
                    <Button style={{ width: '60px', marginLeft: 5 }} onClick={() => searchKeyword(KeyWord)} type="primary" htmlType="submit">검 색</Button>
                </div>

                <hr />
            </div>

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

            {/* <br /> */}
            <hr />

            <div style={{ display: 'flex', justifyContent: 'flex-end', transform: 'translate( 0%, 15%)' }}>
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
