class Api::ListsController < ApplicationController
  def create
    list = List.create(list_params)
    @board = Board.find_by_id(list_params[:board_id])
    @lists = @board.lists.sort_by {|list| list.ord}
    render 'api/boards/show'
  end

  def update
    @list = List.find_by_id(list_params[:id])

    if params[:reorder]
      lists = @list.board.lists
      List.reorder_lists(@list.ord, list_params[:ord].to_i, lists)
    else
      @list.update(list_params)
    end

    @board = @list.board
    render 'api/boards/show'
  end

  def destroy
    @list = List.find_by_id(params[:id])
    @board = @list.board
    @list.destroy

    render 'api/boards/show'
  end

  private
  def list_params
    params.require(:list).permit(:id, :title, :board_id, :archived, :ord)
  end

end
