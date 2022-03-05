import React, {useRef} from 'react';
import  { IoIosChatboxes } from "react-icons/io";
import Dropdown from "react-bootstrap/dropdown";
import Image from 'react-bootstrap/Image'
import {useDispatch, useSelector} from "react-redux";
import firebase from "../../firebase";
import mime from 'mime-types'
import { setPhotoURL } from '../../redux/actions/user_actions'

const UserPanel = () => {
    // 로그인한 유저 정보 가져오기
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch()
    const inputOpenImageRef = useRef()
    const handleLogout = () => {
        firebase.auth().signOut();
    }

    const handleOpenImageRef = () => {
        // 숨긴 input이 클릭되는거처럼 ref 연결해서 강제로 클릭되도록
        inputOpenImageRef.current.click();
    };

    // 파이어베이스에게 업로드한 이미지 전달

    const handleUploadImage =async (event) => {
        // 해주기 전에 firebase 스토리지 사용할수 있게 설정하기
        let file = event.target.file[0];
        console.log(file,'file');

        const metadata = {contentType: mime.lookup(file.name)}
        if (!file) return;

        try {
            let uploadTaskSnapshot = await firebase.storage()// firebase 스토리지에 접근
                .ref()
                .child(`user_image/${user.uid}`) // 이미지 파일이 어디에 저장이 되는지 정해주는거임
                .put(file, metadata) // 파일을 넣어줄땐 put 사용 첫번째 인자로 파일의 데이터,두번째 인자로 메타 데이터(콘텐츠 데이터 타입)

            console.log(uploadTaskSnapshot,'uploadTaskSnapshot') // 업러드가 잘되면 response 가 옴
            let downloadUrl = await  uploadTaskSnapshot.ref.getDownloadURL(); // 스토리지에서 꺼낸다 url을
            await firebase.auth().currentUser.updateProfile({
                photoURL: downloadUrl
            })

            // firebase 스토리지, 유저의 이미지 url를 변경해줫으면 리덕스 안에서두 변경해줘야한다.

            dispatch(setPhotoURL(downloadUrl));

            // epdlxjqpdltmdp 이미지 url저장
            await firebase.database.ref() // 데이블
                .child(user.uid) // row 부분 '
                .update({
                    image: downloadUrl
                })
        } catch (e) {

        }
        // 1. 이미지 클릭후 FB 스토리지에 저장

            //mime이라는 라이브러리가 잇음 lookup 하면 자동으로 파일타입이 무엇인지 리턴해줌
        // npm i mime-types --save

    }
    return (
        <div>
            <h3>
                {/*react-icons 라이브러리 이렇게 사용가능*/}
                <IoIosChatboxes />{" "} Chat App
            </h3>
            {/* 부트스트랩트 드랍다운 사용 */}
            <div>
                <Image src={user && user.photoURL} roundedCircle={} />
                {/* 숨겨주고 ref 연결후 다른거 클릭하면 임의로 이게 클릭 되도록 연결 */}

                <Dropdown>

                    <Dropdown.Toggle
                        style={{background:'transparent'}}
                        id="dropdown-basic">
                        {user && user.displayName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleOpenImageRef}>프로필 사진 변경</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <input type="file"
                       onChange={handleUploadImage}
                       ref={inputOpenImageRef}
                       style={{display:'none'}}
                       accept={'image/jpeg, image/png'}
                />

            </div>
        </div>
    );
};

export default UserPanel;