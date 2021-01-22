import React from 'react'
import Card from '@material-ui/core/Card'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useQuery } from '@apollo/client'
import { TxTable } from '../components/transactions/TxTable'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { TransactionForm } from '../components/entry-form/TransactionForm'
import GET_MERCHANTS_AND_USERS from '../gql/get_merchants_and_users.gql'
import { css } from '@emotion/core'

export const EntryPage = () => {
  const { loading, error, data = {} } = useQuery(GET_MERCHANTS_AND_USERS)
  const [newTransactions, setNewTransactions] = React.useState([])

  const addTransactionToNew = transaction => setNewTransactions(old => [transaction, ...old])

  if (loading) {
    return (
      <div css={loadingStyle}>
        <CircularProgress color="secondary" />
      </div>
    )
  }

  if (error) {
    return <Fragment>¯\_(ツ)_/¯</Fragment>
  }
  return (
    <div css={centerPageStyle}>
      <div css={cardContainerStyle}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Transaction Entry Form
            </Typography>
            <Typography variant="body2" component="p">
              Please enter the transaction information below to the best of your ability.
            </Typography>
            <TransactionForm data={data} transactionAddedCallback={addTransactionToNew} />
          </CardContent>
        </Card>
        <div css={cardSpacerStyle} />
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Transactions added
            </Typography>
            <TxTable data={newTransactions} setData={setNewTransactions}/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const centerPageStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

const cardSpacerStyle = css`
  height: 20px;
`

const cardContainerStyle = css`
  max-width: 720px;
`
const loadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`
