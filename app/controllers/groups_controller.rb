class GroupsController < ApplicationController
  protect_from_forgery except: :create
  before_action :set_group, except: [:new,:create]

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(groups_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @group.update(groups_params)
      redirect_to group_messages_path(@group)
    else
      render :edit
    end
  end

  private
    def groups_params
      params.require(:group).permit(:name, { user_ids: [] })
    end

    def set_group
      @group = Group.find(params[:id])
    end
end
