class Api::ListsController < ApplicationController
  def create
    list = List.create(list_params)
    @board = Board.find_by_id(list_params[:board_id])
    @lists = @board.lists.sort_by {|list| list.ord}
    render 'api/boards/show'
  end

  def update
    @list = List.find_by_id(list_params[:id])
    @list.update(list_params)

    @board = Board.find_by_id(list_params[:board_id])
    @lists = @board.lists.sort_by {|list| list.ord}
    render 'api/boards/show'
  end

  def destroy
    @list = List.find_by_id(list_params[:id])
    @list.destroy
    
    @board = Board.find_by_id(list_params[:board_id])
    @lists = @board.lists.sort_by {|list| list.ord}
    render 'api/boards/show'
  end

  private
  def list_params
    params.require(:list).permit(:id, :title, :board_id, :archived, :ord)
  end

end
