class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where("id > ?",params[:message_id]).where("group_id = ?",params[:group_id])
    respond_to do |format|
      format.json
    end
  end
end
