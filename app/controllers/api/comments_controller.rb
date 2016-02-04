class Api::CommentsController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    comment.author_id = current_user.id
    comment.save

    @card = Card.find_by_id(comment.card_id)
    render 'api/cards/show'
  end

  def update
    comment = Comment.find_by_id(comment_params[:id])
    comment.update(body: comment_params[:body])

    @card = Card.find_by_id(comment.card_id)
    render 'api/cards/show'
  end

  def destroy
    comment = Comment.find_by_id(params[:id])
    @card = Card.find_by_id(comment.card_id)
    comment.destroy
    render 'api/cards/show'
  end

  private
  def comment_params
    params.require(:comment).permit(:id, :card_id, :body)
  end

end
