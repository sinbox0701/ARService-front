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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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


const SearchBar = ({bio,setData}) =>  {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const {register,handleSubmit,getValues} = useForm({
        mode:"onChange"
    });
    const onSubmitValid = (data) => {
        const {searchType, keyword} = getValues();
        let createdMinY = "";
        let createdMinM = "";
        let createdMinD = "";
        let createdMaxY = "";
        let createdMaxM = "";
        let createdMaxD = "";
        if(startDate){
            createdMinY = startDate.getFullYear();
            createdMinM = startDate.getMonth() + 1;
            createdMinD = startDate.getDate();
        }
        if(endDate){
            createdMaxY = endDate.getFullYear();
            createdMaxM = endDate.getMonth() + 1;
            createdMaxD = endDate.getDate();
        }

        setData([searchType,keyword, createdMinY, createdMinM, createdMinD, createdMaxY, createdMaxM, createdMaxD]);
    }
    return (
        <TableContainer component={Paper}>
            <form onSubmit={handleSubmit(onSubmitValid)}>
            <Table className="tb_search" style={{alignContent:"center"}}>
                <TableBody>
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
                        검색
                    </TableCell>
                    <TableCell className="col3">
                        <select name="search_kind" className="select">
                          <option value="multi">이름검색</option>
                          <option value="phone">전화번호</option>
                        </select>
                            에서 
                        <select name="searchType" ref={register()} className="select">
                          <option value={0}>검색단어로 시작</option>
                          <option value={1}>검색단어를 포함</option>
                          <option value={2}>검색단어와 일치</option>
                        </select>
                        으로 
                        <SearchInput type="text" name="keyword" placeholder="단어 입력"  ref={register()} />
                        을 
                        <SearchSubmitbutton type="submit" value="검색" className="inputc1" />
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </form>
        </TableContainer>
    );
}

export default SearchBar;