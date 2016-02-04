class Api::BoardSharesController < ApplicationController

  def create
    share = BoardShare.create(board_share_params)
    @board = Board.find_by_id(params[:share][:board_id])
    render 'api/boards/show'
  end

  def destroy
  end

  private
  def board_share_params
    params.require(:share).permit(:board_id, :user_id)
  end

end
