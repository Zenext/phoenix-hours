defmodule Hours.Game do
  use Hours.Web, :model

  @derive {Poison.Encoder, only: [:game_id, :title, :start_date, :abbrevation]}
  alias Hours.Record

  schema "games" do
    field :title, :string
    field :abbrevation, :string
    field :start_date, :date

    has_many :records, Record, on_delete: :delete_all

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :start_date, :abbrevation])
    |> put_assoc(:records, [])
    |> validate_required([:title, :start_date, :abbrevation])
    |> validate_length(:title, max: 40)
    |> validate_length(:abbrevation, max: 10)
  end
  
  def changeset_update(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :abbrevation])
    |> validate_required([:title, :abbrevation])
    |> validate_length(:title, max: 30)
    |> validate_length(:abbrevation, max: 10)
  end

  def preload_records(query) do
    query |> preload(:records)
  end

  def order_by_date(query) do
    query
      |> order_by([g], [desc: g.start_date])
  end
end