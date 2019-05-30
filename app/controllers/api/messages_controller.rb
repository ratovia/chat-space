class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where("id > ?",message_params[:message_id])
    respond_to do |format|
      format.json
    end
  end

  private
    def message_params
      params.permit(:message_id)
    end
end
