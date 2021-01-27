import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import { useQuery } from '@apollo/client'
import GET_TABLE_DATA from '../gql/transactions.gql'
import { TxTable } from '../components/transactions/TxTable'
import CircularProgress from '@material-ui/core/CircularProgress'

export function Transactions () {
  const [data, setData] = React.useState({ transactions: [] })
  const { loading, error } = useQuery(GET_TABLE_DATA, {
    onCompleted: fetched => setData(fetched)
  })

  if (loading) {
    return (
      <div css={loadingStyle}>
        <CircularProgress color='secondary' />
      </div>
    )
  }

  if (error) {
    return <Fragment>¯\_(ツ)_/¯</Fragment>
  }

  return (
    <Fragment>
      <TxTable data={data} setData={setData} />
    </Fragment>
  )
}

const loadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`
