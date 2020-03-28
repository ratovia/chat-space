class UsersController < ApplicationController
  def index
    @users = User.where("name LIKE ?", "#{search_params[:keyword]}%")
    respond_to do |format|
      format.json
    end
  end

  def show
    @groups = current_user.groups.includes(:messages)
  end

  def edit
  end

  def update
    if current_user.update(users_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private
    def users_params
      params.require(:user).permit(:name,:email)
    end

    def search_params
      params.permit(:keyword)
    end
end
