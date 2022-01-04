import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Paper } from '@mui/material';
import { Input, SearchInput, SearchSubmitbutton, Submitbutton } from '../shared';
import DatePicker from "react-datepicker";
import styled from 'styled-components';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import { useState } from 'react';
import { gql } from '@apollo/client';

const DateContainer = styled.div`
    display:flex;
    align-items: center;
    
`;

const SDatePicker = styled(DatePicker)`
    width: 100px;
    height: 20px;
    border: 1px solid #C4C4C4;
    border-radius: 30px;
    cursor: pointer;
    text-align: center;
    color: #666666;
    margin-right:10px;
`;

const SEARCH_USER = gql`
    query searchUser(
            $keyword:String, 
            $searchType:Int,
            $bio:SEX, 
            $createdMinY:String,
            $createdMinM:String,
            $createdMinD:String 
            $createdMaxY:String,
            $createdMaxM:String,
            $createdMaxD:String
        ){
            searchUser(
                keyword:$keyword
                searchType:$searchType
                bio:$bio
                createdMinY:$createdMinY
                createdMinM:$createdMinM
                createdMinD:$createdMinD
                createdMaxY:$createdMaxY
                createdMaxM:$createdMaxM
                createdMaxD:$createdMaxD
            ){
                nickname
                age
                bio
                profile
                intro
                local
                phone 
                email
                loginCount 
                createdAt
                updatedAt 
            }
        }
`;

const SearchBar = ({bio}) =>  {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    return (
        <TableContainer component={Paper}>
            <Table className="tb_search" style={{alignContent:"center"}}>
                <TableBody>
                <TableRow>
                    <TableCell className="col2">
                        검색
                    </TableCell>
                    <TableCell className="col3">
                        <select name="search_kind" className="select">
                          <option value="multi">통합검색</option>
                          <option value="id">전화번호</option>
                        </select>
                            에서 
                        <select name="sk" className="select">
                          <option value="i" selected>검색단어를 포함</option>
                          <option value="f">검색단어로 시작</option>
                          <option value="s">검색단어와 일치</option>
                        </select>
                        으로 
                        <SearchInput type="text" name="search_data" placeholder="단어 입력" className="input" />
                        을 
                        <SearchSubmitbutton type="submit" value="검색" className="inputc1" />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="col2">
                        범위
                    </TableCell>
                    <TableCell className="col3">
                        가입일
                        <DateContainer>
                        <div>
                            <SDatePicker
                                className="mt-2"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)} 
                                locale={ ko }
                                dateFormat="MM월 dd일"
                            />
                        </div>
                        <div style={{marginRight:"10px"}}>~</div>
                        <div>
                        <SDatePicker
                            className="mt-2"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)} 
                            locale={ ko }
                            dateFormat="MM월 dd일"
                        />
                        </div>
                        </DateContainer>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="col2">
                        설정
                    </TableCell>
                    <TableCell className="col3">
                        한페이지에 리스트 수 <input type="text" name="count_a_page" size={3} defaultValue={20} style={{textAlign: 'right'}} /> 
                        페이지 블럭 수 <input type="text" name="page_block" size={3} defaultValue={10} style={{textAlign: 'right'}} />
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SearchBar;