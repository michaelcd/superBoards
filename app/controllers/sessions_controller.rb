class SessionsController < ApplicationController

  def omniauth_facebook
    @user = User.find_or_create_by_auth_hash(auth_hash)
    sign_in(@user)
    redirect_to root_url + '#/'
  end

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(
     params[:user][:username],
     params[:user][:password]
   )

    if @user
      sign_in(@user)
      redirect_to root_url
    else
      flash[:errors] = ["Invalid credentials"]
      redirect_to new_sessions_url
    end
  end

  def destroy
    sign_out
    redirect_to new_sessions_url
  end

  private
  def auth_hash
    request.env['omniauth.auth']
  end

end
