class Api::CommentsController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    comment.author_id = current_user.id
    comment.save

    @card = Card.find_by_id(comment.card_id)
    render 'api/cards/show'
  end

  def update
    render 'api/cards/show'
  end

  def destroy
    render 'api/cards/show'
  end

  private
  def comment_params
    params.require(:comment).permit(:card_id, :body)
  end

end
