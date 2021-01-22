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
import Paper from '@material-ui/core/Paper'
import { TxTableRow } from './TxTableRow'
import { EditModal } from '../modal/EditModal'
import { ModalContextProvider } from '../../context/modal.context'

const styles = css`
  .header {
    font-weight: bold;
  }
`

export function TxTable({ data, setData }) {
  console.log(data)
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <ModalContextProvider>
        <EditModal merchants={data.merchants} users={data.users} setData={setData} />
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="right">Transaction Date</TableCell>
                <TableCell align="right">Merchant</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell css={css({ maxWidth: 50 })} />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.transactions.map(row => (
                <TxTableRow
                  txId={row.id}
                  key={row.id}
                  user={row.user}
                  insertedAt={row.insertedAt}
                  merchant={row.merchant}
                  amount={(row.amount / 10).toFixed(2).toString()}
                  credit={row.credit}
                  debit={row.debit}
                  description={row.description}
                  setData={setData}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ModalContextProvider>
    </>
  )
}

TxTable.propTypes = {
  data: arrayOf(
    shape({
      id: string,
      user_id: string,
      description: string,
      merchant_id: string,
      debit: bool,
      credit: bool,
      amount: number
    })
  )
}
