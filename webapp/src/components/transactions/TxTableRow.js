import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { transaction } from '../../utils/types'
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
import { TxSubTable } from './TxSubTable'
import { TxRowDropdown } from './TxRowDropdown'
import { currency } from '../../utils/currency'

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTableRow(props) {
  const { user, insertedAt, merchant, amount, credit, debit, description } = props.transaction
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
        <TableCell align="right">{insertedAt}</TableCell>
        <TableCell align="right">{merchant.name}</TableCell>
        <TableCell align="right">{currency.convertToString(amount)}</TableCell>
        <TableCell css={css({ maxWidth: 50 })}>
          <TxRowDropdown transaction={props.transaction} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div css={collapsibleCellStyle}>
              <Box margin={1}>
                <TxSubTable credit={credit} debit={debit} merchant={merchant} description={description} />
              </Box>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

TxTableRow.propTypes = {
  transaction: transaction.isRequired
}
const collapsibleCellStyle = css({
  maxWidth: 600,
  width: '50%',
  minWidth: 400
})
