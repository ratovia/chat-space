class MessagesController < ApplicationController
  def index
    @group = Group.find(group_params[:group_id])
    @messages = @group.messages
    @message = Message.new
  end

  def create
    @group = Group.find(group_params[:group_id])
    # binding.pry
    @message = Message.create(messages_params)
    redirect_to group_messages_path(@group)
  end

  private
    def group_params
      params.permit(:group_id)
    end

    def messages_params
      params.require(:message).permit(:text,:image).merge(group_id: group_params[:group_id]).merge(user_id: current_user.id)
    end
end
