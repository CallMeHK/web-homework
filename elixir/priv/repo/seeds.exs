# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Homework.Repo.insert!(%Homework.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Homework.SeedDB do
  alias Homework.Repo

  alias Homework.Users.User
  alias Homework.Merchants.Merchant
  alias Homework.Transactions.Transaction
  alias Homework.Companies.Company

  @items [{"Needed to fix buster", 175},
   {"Potions for mom", 1400},
    {"Doctor visit, bitten by large snake", 5675},
    {"Daedalus for next dinner",4950},
    {"Arena fees",1750},
    {"Potions for a client", 5310},
    {"Unexpected motorcycle maintenance", 4375},
    {"Train ride to the Dons", 4600},
    {"Entertainment", 5150},
    {"Ferry fair for Fairfield", 5925}]


  def add_insert_update_dates(mappable) do
    now = NaiveDateTime.truncate(NaiveDateTime.utc_now(), :second)
    Enum.map(mappable,
      &(Map.merge(&1, %{
          inserted_at: now,
          updated_at: now
          })
        )
    )
  end

  def seed_companies do
    Repo.insert_all(Company,
      [%{name: "Shinra", credit_line: 600000000},
      %{name: "Avalanche", credit_line: 12300060},
      %{name: "Potions and Stuff", credit_line: 4000099}]
      |> add_insert_update_dates,
      returning: true
      )
  end

  def seed_users(company_id_map) do
    Repo.insert_all(User,
      [%{first_name: "cloud", last_name: "strife", dob: "1/1/1994",company_id: company_id_map["Avalanche"]},
      %{first_name: "tifa", last_name: "lockhart", dob: "2/2/1995",company_id: company_id_map["Avalanche"]},
      %{first_name: "aerith", last_name: "gainsborough", dob: "6/6/1999",company_id: company_id_map["Avalanche"]},
      %{first_name: "rufus", last_name: "Shinra", dob: "6/6/1999",company_id: company_id_map["Shinra"]},
      %{first_name: "rude", last_name: "Henchman", dob: "6/6/1999",company_id: company_id_map["Shinra"]},
      %{first_name: "reno", last_name: "Henchman", dob: "6/6/1999",company_id: company_id_map["Shinra"]},
      %{first_name: "shopkeeper", last_name: "ron", dob: "6/6/1999",company_id: company_id_map["Potions and Stuff"]},
      %{first_name: "shopkeeper", last_name: "bill", dob: "6/6/1999",company_id: company_id_map["Potions and Stuff"]},
      %{first_name: "shopkeeper", last_name: "jerry", dob: "6/6/1999",company_id: company_id_map["Potions and Stuff"]},
      %{first_name: "barret", last_name: "wallace", dob: "3/3/1996",company_id: company_id_map["Avalanche"]}]
      |> add_insert_update_dates,
      returning: true
      )
  end

  def seed_merchants do
    Repo.insert_all(Merchant,
    [%{name: "side shop", description: "a shop with basic items"},
      %{name: "secret shop", description: "a shop with special items"},
      %{name: "shop shop", description: "a shop with more basic items, but no secret items"}]
      |> add_insert_update_dates,
      returning: true
      )
  end

  def rand_transaction_data do
    { item, amount } = Enum.random(@items)
    is_credit = Enum.random([true, false])
    %{
      amount: amount,
      credit: is_credit,
      debit: !is_credit,
      description: item
    }
  end

  def seed_transactions(user_ids, merchant_ids) do

    transactions = Enum.map(user_ids, &(
      for _n <- 1..Enum.random(3..10), do:
        Map.merge(rand_transaction_data(), %{ user_id: &1, merchant_id: Enum.random(merchant_ids) })))
      |> List.flatten

    Repo.insert_all(Transaction,
      transactions |> add_insert_update_dates,
      returning: true
    )
  end


  def run_seed do
    {_num_inserted_companies, seeded_companies} = seed_companies()

    company_id_map = Enum.reduce(seeded_companies, %{}, fn(comp, accumulator) ->
      Map.merge(accumulator, %{comp.name => comp.id})
    end)

    {_num_inserted_users, users} = seed_users(company_id_map)
    {_num_inserted_merchants, merchants} = seed_merchants()

    seed_transactions(Enum.map(users, &(&1.id)), Enum.map(merchants, &(&1.id)))
  end

end

Homework.SeedDB.run_seed()
