import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { css } from '@emotion/core'
import Link from '@material-ui/core/Link'

export const Home = () => {
  return (
    <div css={centerPageStyle}>
      <div css={cardContainerStyle}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" variant="h3" gutterBottom>
              Welcome!
            </Typography>

            <Typography variant="body2" component="p">
              I hope this day finds you well! To finish{' '}
              <Link color="secondary" href="https://github.com/DivvyPayHQ/web-homework">
                divvy's web-homework
              </Link>
              , I used the elixir server and a dockerized postges database. The database can be started with
              `docker-compose up`, and can be seeded using `mix exto.setup`. Here are the objectives completed from the
              frontend and backend readme files:
            </Typography>

            <Typography variant="body2" component="div">
              <ul css={listStyle}>
                <li>
                  Write a basic user inerface that allows users to enter, edit, and remove transactions.
                  <ul css={sublistStyle}>
                    <li>A transaction creation form can be found on the '/entry' route to enter transactions.</li>
                    <li>
                      Transaction editing can found in the drop down on each transaction table row, through a modal.
                    </li>
                    <li>Transaction deletion can be found in the drop down on each table row.</li>
                  </ul>
                </li>
                <li>
                  Add a user experience that showcases your abilities on the front end
                  <ul css={sublistStyle}>
                    <li>Installed material UI.</li>
                    <li>Set up a dark theme.</li>
                    <li>Added side navigation.</li>
                    <li>Improved the transaction table with nested views.</li>
                    <li>Improved data shown from GQL query in transaction table.</li>
                    <li>Added a dropdown and modal to improve edit, delete transaction operations.</li>
                  </ul>
                </li>
                <li>
                  Write filtering options for transactions, users, and/or merchants.
                  <ul css={sublistStyle}>
                    <li>
                      Implemented fuzzy searching for a user by first and last name on the graphql api. This was added
                      to the Users query.
                    </li>
                    <li>Implemented fuzzy searching for a merchant by name. This was added to the Merchants query.</li>
                    <li>
                      Implemented arguments in the Transactions query to filter results by minimum and maximum amount.
                    </li>
                  </ul>
                </li>
                <li>
                  Write a new schema, queries, and mutations to add companies to the app
                  <ul css={sublistStyle}>
                    <li>
                      Company has a name, credit_line, and available_credit which is the credit_line minus the total
                      amount of transactions for the company.
                    </li>
                    <li>
                      Users belong to a company. I added the available_credit database field as a virtual field in ecto,
                      so I didnt feel like I needed to require transactions to pass in a company_id.
                    </li>
                  </ul>
                </li>
                <li>
                  Seed the database.
                  <ul css={sublistStyle}>
                    <li>Implemented with provided seeds.ex file.</li>
                  </ul>
                </li>
                <li>
                  Find the bug with transactions
                  <ul css={sublistStyle}>
                    <li>Found and fixed the omission of :debit from the transactions ecto changeset.</li>
                  </ul>
                </li>
              </ul>
            </Typography>
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
const listStyle = css`
  padding: 10px 25px;
`
const sublistStyle = css`
  padding-left: 25px;
`
