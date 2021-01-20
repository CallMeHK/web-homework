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

  @items [{"Ring of Health", 175},
   {"Platemail", 1400},
    {"Mjolnir", 5675},
    {"Daedalus",4950},
    {"Mask of Madness",1750},
    {"Sheepstick", 5310},
    {"BKB", 4375},
    {"MKB", 4600},
    {"Heart of Tarrasque", 5150},
    {"Eye of Skadi", 5925}]


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

  def seed_users do
    Repo.insert_all(User,
      [%{first_name: "cloud", last_name: "strife", dob: "1/1/1994"},
      %{first_name: "tifa", last_name: "lockhart", dob: "2/2/1995"},
      %{first_name: "aerith", last_name: "gainsborough", dob: "6/6/1999"},
      %{first_name: "barret", last_name: "wallace", dob: "3/3/1996"}]
      |> add_insert_update_dates,
      returning: true
      )
  end

  def seed_merchants do
    query = Repo.insert_all(Merchant,
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
      for n <- 1..Enum.random(3..10), do:
        Map.merge(rand_transaction_data(), %{ user_id: &1, merchant_id: Enum.random(merchant_ids) })))
      |> List.flatten

    Repo.insert_all(Transaction,
      transactions |> add_insert_update_dates,
      returning: true
    )
  end


  def run_seed do
    {_num_inserted_users, users} = seed_users()
    {_num_inserted_merchants, merchants} = seed_merchants()

    seed_transactions(Enum.map(users, &(&1.id)), Enum.map(merchants, &(&1.id)))

  end

end

Homework.SeedDB.run_seed()
