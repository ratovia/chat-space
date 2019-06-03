class MessagesController < ApplicationController
  def index
    @group = Group.find(group_params[:group_id])
    @groups = current_user.groups.includes(:messages)
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @group = Group.find(group_params[:group_id])
    @message = Message.create(messages_params)
    respond_to do |format|
      format.html {redirect_to group_messages_path(@group)}
      format.json
    end
  end

  private
    def group_params
      params.permit(:group_id)
    end

    def messages_params
      params.require(:message).permit(:text,:image).merge(group_id: group_params[:group_id]).merge(user_id: current_user.id)
    end
end
