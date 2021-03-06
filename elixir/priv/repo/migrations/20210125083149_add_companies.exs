defmodule Homework.Repo.Migrations.AddCompanies do
  use Ecto.Migration

  def change do
    create table(:companies, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:name, :string)
      add(:credit_line, :integer)

      timestamps()
    end
  end
end
