import React, { useEffect, useState } from 'react'
import './board.css';
import { withRouter, Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { requestBoardList } from '../../../_actions/board_actions';
import { Button, Pagination } from 'antd';
import queryStirng from 'query-string'


function BoardPage(props) {

    window.sessionStorage.setItem('currentDoc', '/board/');
    // console.log("props.match.params.pageNum", props.match.params.pageNum)
    // console.log("props.match.params.pageSize", props.match.params.pageSize)
    //console.log("props.history", props.history)

    const [List, setList] = useState([])
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)

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
                        "",
                        0]
                    }}>글쓰기</Link>
                </Button>

            </div>

            <div>
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
// import React, { useEffect, useState } from 'react'
// import './board.css';
// import { withRouter, Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
// import { requestBoardList } from '../../../_actions/board_actions';
// import { Button, Pagination } from 'antd';
// import queryStirng from 'query-string'


// function BoardPage(props) {

//     console.log("props",   props.history)

//     // 3번 호출되는거 알아봐야 함 
//     // console.log("props.match.params.pageNum",   props.match.params.pageNum)
//     // console.log("props.match.params.pageSize",   props.match.params.pageSize)
//     // console.log("props.history",   props.history)
//     // console.log("props.location",   props.location)

//     const [List, setList] = useState([])
//     const dispatch = useDispatch();
//     const [Total, setTotal] = useState(0)

//     const [currentPage, setCurrentPage] = useState(parseInt(props.match.params.pageNum))

//     const [PageSize, setPageSize] = useState(()=> {

//         const { search } = props.location;
//         const queryObj = queryStirng.parse(search);
//         const { list_num } = queryObj;
 
//         if (list_num) {
//             return parseInt(list_num)
//         } else{
//             return 10
//         }

//     })

//     useEffect(() => {
        
//         requestBoard()
        
//     }, [])

//     const onShowSizeChange = (current, pageSize) => {
//         console.log("onShowSizeChange", current, pageSize);

//         const body = {
//             currentPage : current,
//             pageSize : pageSize
//         }

//         dispatch(requestBoardList(body))
//             .then(response =>{
//             if (response.payload.success){
//                 setList(response.payload.boardList);
//                 setTotal(response.payload.pageData.totalPage)
//                 setCurrentPage(current);
//                 props.history.push(`${current}?list_num=${pageSize}`)
//                 setPageSize(pageSize)
//             } else {
//                 alert('게시판 정보를 가져오는데 실패했습니다.')
//             }

//         })

//     }

//     const pageSelect = (page) => {

//         console.log("page", page);
//         setCurrentPage(page)
//         const body = {
//             currentPage : page,
//             pageSize : PageSize
//         }

//         dispatch(requestBoardList(body))
//             .then(response =>{
//             if (response.payload.success){
//                 setList(response.payload.boardList);

//                 setTotal(response.payload.pageData.totalPage)
//                 setCurrentPage(page);

//                 if (PageSize === 10)
//                     props.history.push(`${page}`)
//                 else {
//                     props.history.push(`${page}?list_num=${PageSize}`)
//                 }
//             } else {
//                 alert('게시판 정보를 가져오는데 실패했습니다.')
//             }

//         })
//     }


//     const requestBoard = () => {

//         let body = {
//             currentPage : currentPage,
//             pageSize : PageSize
//         }

//         dispatch(requestBoardList(body))
//             .then(response =>{
//             if (response.payload.success){
//                 setList(response.payload.boardList);

//                 setTotal(response.payload.pageData.totalPage)
//             } else {
//                 alert('게시판 정보를 가져오는데 실패했습니다.')
//             }

//         })
//     }

//     window.onpopstate = e => {
//         //your code...
//         alert("백버튼이 눌렸어요!!!!!!");
//         console.log("지금페이지의 번호는?", e)
//     }

//     const boardList = List.map((list, index) => {

//         return <tr key = { index }>
//             <td>{ list.postnum }</td>
//             <td><Link to={{
//                 pathname : `/boardform/${list.postnum}`,
//                 state : 
//                     [ list.title, 
//                       list.writer,
//                       list.views, 
//                       list.favorite]    
//             }}>{ list.title }</Link></td>
//             <td>{ list.writer }</td>
//             <td>{ list.d }</td>
//             <td>{ list.views }</td>
//             <td>{ list.favorite }</td>
//         </tr>

//     })

//     return (
//         <div style={{ width: '85%', margin: '3rem auto' }}>

//             <h2> VS 게시판 </h2>

//             <hr />

//             <table>
//                 <thead>
//                     <tr>
//                         <th>번 호</th>
//                         <th>제 목</th>
//                         <th>작성자</th>
//                         <th>작성일</th>
//                         <th>조 회</th>
//                         <th>좋아요</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     { boardList }
//                 </tbody>
//             </table>

//             <hr />

//             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                
//                 <Button type="primary" htmlType="submit">
//                     <Link to={{
//                         pathname : `/write`,
//                         state : 
//                             [ 0,
//                             "",
//                             ""]    
//                     }}>글쓰기</Link>
//                 </Button>

//             </div>

//             <div>
//                 <Pagination
//                     showSizeChanger
//                     onShowSizeChange={onShowSizeChange}

//                     current={currentPage}
//                     total={Total}
//                     onChange = {pageSelect}
//                     pageSizeOptions = {[10,15,20,30]}
//                     pageSize = {PageSize}
//                     />
//             </div>
            

//         </div>
//     )
// }

// export default withRouter(BoardPage)

// import React, { useEffect, useState } from 'react'
// import './board.css';
// import { withRouter, Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux';
// import { requestBoardList } from '../../../_actions/board_actions';
// import { Button, Pagination } from 'antd';


// function BoardPage(props) {

//     console.log("props.history",props.history)

//     console.log("currentPage", window.sessionStorage.currentPage)

//     console.log("pageSize", window.sessionStorage.pageSize)

//     const [List, setList] = useState([])
//     const dispatch = useDispatch();

//     useEffect(() => {

//         window.sessionStorage.setItem('currentDoc', '/board/');
//         requestBoard()
        
//     }, [])

//     const onShowSizeChange = (current, pageSize) => {

//         window.sessionStorage.setItem('pageSize', pageSize);
//         window.sessionStorage.setItem('currentPage', current);

//         requestBoard()
//         props.history.push(`${window.sessionStorage.currentPage}`)
//         window.scrollTo(0,0);
//     }

//     //페이지네이션
//     const pageSelect = (page) => {

//         window.sessionStorage.setItem('currentPage', page);

//         requestBoard()
//         props.history.push(`${window.sessionStorage.currentPage}`)
//         window.scrollTo(0,0);
//     }

//     const requestBoard = () => {

//         let body = {
//             currentPage : window.sessionStorage.currentPage,
//             pageSize : window.sessionStorage.pageSize
//         }

//         dispatch(requestBoardList(body))
//             .then(response =>{
//             if (response.payload.success){
//                 setList(response.payload.boardList);
//                 //console.log('response.payload.pageData.totalPage', response.payload.pageData.totalPage)
//                 window.sessionStorage.setItem('totalPost', response.payload.pageData.totalPage);
//             } else {
//                 alert('게시판 정보를 가져오는데 실패했습니다.')
//             }

//         })
//     }

//     const boardList = List.map((list, index) => {

//         return <tr key = { index }>
//             <td style={{ width: '8%' }}>{ list.postnum }</td>
//             <td style={{ width: '40%' }}><Link to={{
//                 pathname : `/boardform/${list.postnum}`,
//                 state : {
//                     writer : list.writer
//                 } 
//             }}>{ list.title }</Link></td>
//             <td style={{ width: '20%' }}>{ list.writer }</td>
//             <td style={{ width: '10%' }}>{ list.d }</td>
//             <td style={{ width: '10%' }}>{ list.views }</td>
//             <td style={{ width: '10%' }}>{ list.favorite }</td>
//         </tr>

//     })

//     return (
//         <div style={{ width: '85%', margin: '3rem auto' }}>

//             <h2> VS 게시판 </h2>

//             <hr />

//             <table>
//                 <thead>
//                     <tr>
//                         <th>번 호</th>
//                         <th>제 목</th>
//                         <th>작성자</th>
//                         <th>작성일</th>
//                         <th>조 회</th>
//                         <th>좋아요</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     { boardList }
//                 </tbody>
//             </table>

//             <hr />

//             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                
//                 <Button type="primary" htmlType="submit">
//                     <Link to={{
//                         pathname : `/write`,
//                         state : 
//                             [ 0,
//                             "",
//                             "",]    
//                     }}>글쓰기</Link>
//                 </Button>

//             </div>

//             <div>
//                 <Pagination
//                     showSizeChanger
//                     onShowSizeChange={onShowSizeChange}
//                     current={parseInt(window.sessionStorage.currentPage)}
//                     total={window.sessionStorage.totalPost}
//                     onChange = {pageSelect}
//                     pageSizeOptions = {[10,15,20,30]}
//                     pageSize = {parseInt(window.sessionStorage.pageSize)}
//                     />
//             </div>
            

//         </div>
//     )
// }

// export default withRouter(BoardPage)