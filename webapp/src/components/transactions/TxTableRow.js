import React from 'react'
import { transaction } from '../../utils/types'
import { css } from '@emotion/core'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { TxSubTable } from './TxSubTable'
import { TxRowDropdown } from './TxRowDropdown'
import { currency } from '../../utils/currency'

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTableRow(props) {
  const { id, user, insertedAt, merchant, amount, credit, debit, description } = props.transaction
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" onClick={() => setOpen(!open)} size="small">
            {open ? <KeyboardArrowUpIcon data-testid="up-icon" /> : <KeyboardArrowDownIcon data-testid="down-icon" />}
          </IconButton>
        </TableCell>
        <TableCell data-testid={makeDataTestId('userName', id)}>{`${user.firstName} ${user.lastName}`}</TableCell>
        <TableCell data-testid={makeDataTestId('transactionDate', id)} align="right">
          {insertedAt}
        </TableCell>
        <TableCell data-testid={makeDataTestId('merchantName', id)} align="right">
          {merchant.name}
        </TableCell>
        <TableCell data-testid={makeDataTestId('amount', id)} align="right">
          {currency.convertToString(amount)}
        </TableCell>
        <TableCell css={css({ maxWidth: 50 })}>
          <TxRowDropdown transaction={props.transaction} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div css={collapsibleCellStyle}>
              <Box margin={1}>
                <TxSubTable credit={credit} debit={debit} description={description} merchant={merchant} />
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
