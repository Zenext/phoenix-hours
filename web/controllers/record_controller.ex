defmodule Hours.RecordController do
  use Hours.Web, :controller

  alias Hours.Record
  
  import Hours.TimexHelpers, only: [to_db_format: 1]

  def index(conn, _params) do
    records = Record.all() |> Repo.all    
    
    render(conn, "index.json", records: records)
  end

  def hours(conn, %{"game_id" => game_id, "start_date" => start_date, "end_date" => end_date}) do
    records = Record
      |> Record.by_game_id(game_id)
      |> Record.by_time_interval(start_date, end_date)
      |> Repo.all

    render(conn, "hours.json",  records: records)
  end

  def hours(conn, %{"game_id" => game_id}) do
    records = Record
      |> Record.by_game_id(game_id)
      |> Repo.all
    
    render(conn, "hours.json", records: records)
  end
  
  def create(conn, params) do
    date = to_db_format(params["date"])
    changeset = Record.changeset(%Record{}, %{params | "date" => date})

    case Repo.insert(changeset) do
      {:ok, record} ->
        IO.inspect record
        conn
        |> put_status(:created)
        |> render("show.json", record: record)
      {:error, changeset} ->
        render(conn, "error.json", changeset: changeset)
    end
  end
end
