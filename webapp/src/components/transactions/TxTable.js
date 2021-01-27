import React from 'react'
import { arrayOf, shape, func } from 'prop-types'
import { transaction, user, merchant } from '../../utils/types'
import { css } from '@emotion/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { TxTableRow } from './TxTableRow'
import { EditModal } from '../modal/EditModal'
import { FormContextProvider } from '../../context/form.context'

export function TxTable ({ data, setData }) {
  return (
    <>
      <FormContextProvider setData={setData}>
        <EditModal merchants={data.merchants} setData={setData} users={data.users} />
        <TableContainer component={Paper}>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align='right'>Transaction Date</TableCell>
                <TableCell align='right'>Merchant</TableCell>
                <TableCell align='right'>Amount</TableCell>
                <TableCell css={css({ maxWidth: 50 })} />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.transactions.map(row => (
                <TxTableRow key={row.id} transaction={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </FormContextProvider>
    </>
  )
}

TxTable.propTypes = {
  data: shape({
    transactions: arrayOf(transaction),
    users: arrayOf(user),
    merchants: arrayOf(merchant)
  }).isRequired,
  setData: func.isRequired
}
