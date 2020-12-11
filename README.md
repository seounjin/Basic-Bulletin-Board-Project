서버-클라이언트 웹애플리케이션
===        

- 사용스택: JavaScript, NodeJS - Express FrameWork, React, Redux, MongoDB, Ant Design
- 개발환경: Ubuntu
- 개발도구: Visual Studio Code, WorkBench
- 프로젝트기간: 20. 05 ~ 20. 06
- 프로젝트인원: 2명

<br/>

프로젝트 설명
-----------

+ ### 서버    
	+ Node.js Express 기반 REST API 개발  
	+ 로그인 처리  
		+ 사용자 로그인을 처리할시 password를 비대칭 암호화 방식을 사용하여 데이터 전달  
		+ 클라이언트에서 로그인 요청시 전달받은 crypto 모듈로 암호화된 password를 서버에 있는 개인키를 사용하여 복호화 한다음 DB에 저장되있는 password와 비교함  
		+ 클라이언트에서 회원등록 요청시 공개키 전달
	+ 사용자 인증  
		+ Access Token과 Refresh Token의 인증 방식을 사용함  
		+ Access Token과 Refresh Token은 쿠키에 저장 하며 RefreshToken은 DB에 저장  
		+ Access Token이 만료 되었을때 클라이언트에 정보를 알려주며 Token 요청시 쿠키에있는 RefreshToken과 db에 있는 RefreshToken을 비교하여 검증이 되었을시 새로운 Access Token을 발급해줌  
		+ 로그아웃 요청시 쿠키에 있는 Token과 DB에있는 RefreshToken제거  
	+ 미들웨어  
		+ Access Token을 사용하여 사용자 인증  
		+ 클라이언트에서 보내는 데이터를 express-validator 모듈을 사용하여 유효성 검증 
		
		
		
+ ### 클라이언트    
	
	+ 서버에 정보를 요청하는 페이지는 응답 받은 정보를 화면에 보임.    
	+ 게시글 목록에서 사용자가 보기 희망하는 게시글의 제목을 눌렀을 경우
	 서버에 요청하여 해당 게시글의 내용을 사용자에게 보여줌.      
	+ 로그인 하지 않았을 경우에는 해당 게시글을 읽는 기능만을 제공함.    
	+ 좋아요, 댓글 기능을 state-hook으로 관리함.    
	+ 부적절한 게시글일 경우 타사용자에 의해 신고당할 수 있게 서버에 요청하는 기능을 넣음.    
    	
	+ 기본적으로 삽입, 수정, 삭제를 서버에 요청하고 응답을 받으므로써 기능의 동작이 이뤄짐.    
	+ 수정, 삽입(등록), 삭제 등의 side-effect를 component에 effect-hook을 사용하여 수행함.    
	+ 댓글이 많아졌을 경우 페이지를 나눠 볼 수 있게 페이지네이션 기능을 넣음.    
	+ 댓글 계층의 구조를 두 단계로 나눠 댓글과 그에 뒤따르는 대댓글까지 보일 수 있게 하였고
	 대댓글 중에 원하는 대댓글에    
	 다시 댓글을 등록할 시 달고자 하는 대댓글 작성자의 아이디가
	 우선되어 대댓글에 대한 댓글이 작성될 수 있게 하였음.    
	+ 기본 등록순으로 보이게 하고 필요시 최신순으로 보일 수 있게 하였음.    
	
	+ 페이지네이션의 경우 사용자의 선택에 따라 정해진 페이지를 서버에 요청하여 해당 부분을 보임.    
	+ 한 페이지에서 사용자가 지정한 수(기본 10개)의 게시글 목록을 해당 페이지 내에서 최신 순서로 보임.    

<br/>

클라이언트 동작 화면
-------------

| 회원가입, 로그인, 로그아웃 |
|:----------------------------------------:|
|<img src="https://user-images.githubusercontent.com/44724951/87519458-97bb3080-c6bc-11ea-9d79-49520e55c11d.gif" width=1000  />|

| 게시글 페이지네이션, 검색 |
|:----------------------------------------:|
|<img src="https://user-images.githubusercontent.com/44724951/87519700-f08ac900-c6bc-11ea-86a5-133a79d7997e.gif" width=1000 >|

| 게시글 작성, 수정, 삭제 |
|:----------------------------------------:|
|<img src="https://user-images.githubusercontent.com/44724951/87519713-f385b980-c6bc-11ea-830b-169c6910fddd.gif" width=1000  />|

| 게시글 및 게시글 댓글 |
|:----------------------------------------:|
|<img src="https://user-images.githubusercontent.com/44724951/87519686-e9fc5180-c6bc-11ea-948e-d3d0213ed59f.gif" width=1000  />|

| 마이페이지 |
|:----------------------------------------:|
|<img src="https://user-images.githubusercontent.com/44724951/87519705-f1bbf600-c6bc-11ea-85f2-869e846ffa3b.gif" width=1000  />|

| 관리자페이지 |
|:----------------------------------------:|
|<img src="https://user-images.githubusercontent.com/44724951/87519710-f2ed2300-c6bc-11ea-8ed4-43f9fa45e6fd.gif" width=1000  />

<br/>

참고
-------------
https://github.com/jaewonhimnae/boilerplate-mern-stack

