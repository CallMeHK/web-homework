import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

export function TxSubTable({ credit, debit, description, merchant }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          <TableRow>
            <TableCell>Purchase Type</TableCell>
            <TableCell align="right">{credit ? 'Credit' : debit ? 'Debit' : 'Other'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Transaction Description</TableCell>
            <TableCell align="right">{description}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Merchant Description</TableCell>
            <TableCell align="right">{merchant.description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
