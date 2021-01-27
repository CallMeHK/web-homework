import React from 'react'
import Card from '@material-ui/core/Card'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useQuery } from '@apollo/client'
import { TxTable } from '../components/transactions/TxTable'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { TransactionForm } from '../components/entry-form/TransactionForm'
import GET_MERCHANTS_AND_USERS from '../gql/get_merchants_and_users.gql'
import { css } from '@emotion/core'

export const EntryPage = () => {
  const [data, setData] = React.useState({})
  const { loading, error, _data = {} } = useQuery(GET_MERCHANTS_AND_USERS, {
    onCompleted: fetched =>
      setData({
        ...fetched,
        transactions: []
      })
  })

  if (error) {
    return <Fragment>¯\_(ツ)_/¯</Fragment>
  }

  if (loading || !data.transactions) {
    return (
      <div css={loadingStyle}>
        <CircularProgress color="secondary" />
      </div>
    )
  }

  const formCallback = newTransaction => setData(old => ({
    ...old,
    transactions: [
      newTransaction,
      ...old.transactions
    ]
  }))

  return (
    <div css={centerPageStyle}>
      <div css={cardContainerStyle}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Transaction Entry Form
            </Typography>
            <Typography variant="body2" component="p">
              Please enter the transaction information.
            </Typography>
            <TransactionForm data={data} formCallback={formCallback} />
          </CardContent>
        </Card>
        <div css={cardSpacerStyle} />
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Transactions added
            </Typography>
            <TxTable data={data} setData={setData} />
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
