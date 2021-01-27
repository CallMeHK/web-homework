import React from 'react'
import { string, bool, shape } from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

export function TxSubTable ({ credit, debit, description, merchant }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableBody>
          <TableRow>
            <TableCell>Purchase Type</TableCell>
            <TableCell data-testid="payment" align='right'>{credit ? 'Credit' : debit ? 'Debit' : 'Other'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Transaction Description</TableCell>
            <TableCell data-testid="transactionDescription" align='right'>{description}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Merchant Description</TableCell>
            <TableCell data-testid="merchantDescription" align='right'>{merchant.description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

TxSubTable.propTypes = {
  credit: bool.isRequired,
  debit: bool.isRequired,
  description: string.isRequired,
  merchant: shape({
    description: string.isRequired
  }).isRequired
}
