class Api::UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      render "api/users/show"
    else
      flash.now[:errors] = @user.errors.full_messages
      render json: [flash.now[:errors]], status: 401
    end
  end

  private
  def user_params
    params.permit(:username, :password)
  end
end
