class MessagesController < ApplicationController
  before_action :set_group, except: [:index,:create]
  def index
    @groups = current_user.groups.includes(:messages) #サイドバー用のグループ
    @message = Message.new #form_for用の新規にメッセージ送る用
    @messages = @group.messages.includes(:user) #現在のグループのメッセージ　ユーザも名前を表示する
  end

  def create
    @message = Message.new(messages_params)
    if @message.save
      respond_to do |format|
        format.html {redirect_to group_messages_path(@group)}
        format.json
      end
    else
      flash.now[:alert] = "メッセージを入力してください"
      render :index
    end
  end

  private
    def group_params
      params.permit(:group_id)
    end

    def set_group
      @group = Group.find(group_params[:group_id]) #現在のグループ
    end

    def messages_params
      params.require(:message).permit(:text,:image).merge(group_id: group_params[:group_id]).merge(user_id: current_user.id)
    end
end
