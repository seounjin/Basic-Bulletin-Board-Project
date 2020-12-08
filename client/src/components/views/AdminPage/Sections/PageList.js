import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd';

function PageList(props) {

   
    const reportList = props.pageList.map((list, index) => {

        if (props.state === 'reportComment') {
            
            return <tr key = { index }>
                <td style={{ width: '8%' }}> <Link to={{
                    pathname : `/boardform/${list.pNum}` 
                }}>{ list.pNum }</Link> </td>
                <td > { list.content } </td>
                <td > { list.rContent } </td>
                <td style={{ width: '10%' }}> { list.fromId.id } </td>
                <td style={{ width: '10%' }}> { list.date } </td>
                <td style={{ width: '10%' }}> <Button onClick={ (e) => props.deleteClick(list.cGroupSquence, e) }>삭제</Button> </td>
            </tr>

        } else if(props.state === 'reportPost'){
            
            return <tr key = { index }>
                    <td style={{ width: '8%' }}> <Link to={{
                        pathname : `/boardform/${list.pNum}` 
                    }}>{ list.pNum }</Link> </td>
                    <td > { list.rContent } </td>
                    <td style={{ width: '10%' }}> { list.fromId.id } </td>
                    <td style={{ width: '10%' }}> { list.date } </td>
                    <td style={{ width: '10%' }}> <Button onClick={ (e) => props.deleteClick(list.pNum, e) }>삭제</Button> </td>
                </tr>

        } else if(props.state === 'myReport'){
          
          return <tr key = { index }>
                    <td style={{ width: '5%' }}> <Link to={{
                        pathname : `/boardform/${list.pNum}` 
                    }}>{ list.pNum }</Link> </td>
                    <td style={{ width: '50%' }}> { list.content } </td>
                    <td yle={{ width: '20%' }}> { list.rContent } </td>
                    <td style={{ width: '5%' }}> { list.toId.writer ? list.toId.writer : list.toId.id} </td>
                    <td style={{ width: '10%' }}> { list.date } </td>
                    <td style={{ width: '5%' }}> <Button onClick={ (e) => props.deleteClick(list._id, e) }> 취소 </Button> </td>
                </tr>
        
        } 
      
    })
  
    if (props.state === 'reportComment') {
            return (
            <div>
                <h2> 관리자 게시판 (댓글)</h2>

                <hr />

                <table>
                    <thead>
                        <tr>
                            <th>글번호</th>
                            <th>댓글내용</th>
                            <th>신고사유</th>
                            <th>신고자</th>
                            <th>작성일</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        { reportList }
                    </tbody>
                </table>

                <hr />
            </div>
        )
    } else if(props.state === 'reportPost') {

        return (
            <div>
    
                <h2> 관리자 게시판 (게시글)</h2>
    
                <hr />
    
                <table>
                    <thead>
                        <tr>
                            <th>글번호</th>
                            <th>신고사유</th>
                            <th>신고자</th>
                            <th>작성일</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        { reportList }
                    </tbody>
                </table>
    
                <hr />

            </div>
        )

    } else if(props.state === 'myReport'){
    
        return (
            <div>
    
                <h2>  신고 알림 </h2>
    
                <hr />
    
                <table>
                    <thead>
                        <tr>
                            <th>글번호</th>
                            <th>내용</th>
                            <th>신고사유</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>취소</th>
                        </tr>
                    </thead>
                    <tbody>
                        { reportList }
                    </tbody>
                </table>
    
                <hr />

            </div>
        )
    } 
    
}

export default PageList
