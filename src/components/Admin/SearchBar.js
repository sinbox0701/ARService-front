import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Paper } from '@mui/material';
import { SearchInput, SearchSubmitbutton } from '../shared';
import DatePicker from "react-datepicker";
import styled from 'styled-components';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import { useState } from 'react';
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
                        ??????
                    </TableCell>
                    <TableCell className="col3">
                        ?????????
                        <DateContainer>
                        <div>
                            <SDatePicker
                                className="mt-2"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)} 
                                locale={ ko }
                                dateFormat="MM??? dd???"
                            />
                        </div>
                        <div style={{marginRight:"10px"}}>~</div>
                        <div>
                        <SDatePicker
                            className="mt-2"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)} 
                            locale={ ko }
                            dateFormat="MM??? dd???"
                        />
                        </div>
                        </DateContainer>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="col2">
                        ??????
                    </TableCell>
                    <TableCell className="col3">
                        <select name="search_kind" className="select">
                          <option value="multi">????????????</option>
                          <option value="phone">????????????</option>
                        </select>
                            ?????? 
                        <select name="searchType" ref={register()} className="select">
                          <option value={0}>??????????????? ??????</option>
                          <option value={1}>??????????????? ??????</option>
                          <option value={2}>??????????????? ??????</option>
                        </select>
                        ?????? 
                        <SearchInput type="text" name="keyword" placeholder="?????? ??????"  ref={register()} />
                        ??? 
                        <SearchSubmitbutton type="submit" value="??????" className="inputc1" />
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </form>
        </TableContainer>
    );
}

export default SearchBar;