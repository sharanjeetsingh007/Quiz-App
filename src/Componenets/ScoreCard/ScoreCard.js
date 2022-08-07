import React from 'react'
import './ScoreCard.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));





function ScoreCard({ finalReport, score }) {
    return (
        <div className='scorecard'>
            <div className='score__header'>

                <h3>Score Report</h3>
                <h3>Total Score {score}</h3>
            </div>

            <div className='scorecard__main'
                style={{ overflow: 'scroll', height: '450px' }}
            >

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }}
                        aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Question</StyledTableCell>
                                <StyledTableCell align="right">Correct Answer</StyledTableCell>
                                <StyledTableCell align="right">Your Answer</StyledTableCell>
                                <StyledTableCell align="right">Correct</StyledTableCell>
                                {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {finalReport.map((data, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {data.question}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{data.correctAnswer}</StyledTableCell>
                                    <StyledTableCell align="right">{data.yourAnswer}</StyledTableCell>
                                    <StyledTableCell align="right">{data.yourAnswer == data.correctAnswer ? "✅" : "❌"}</StyledTableCell>
                                </StyledTableRow>
                            ))}

                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell align="right">{score}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>


        </div>
    )
}

export default ScoreCard