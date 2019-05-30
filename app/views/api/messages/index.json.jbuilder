json.array! @messages do |message|
  json.id message.id
  json.text message.text
  json.image message.image
  json.created_at message.created_at.strftime("%Y/%m/%d %H:%M")
  json.user_name message.user.name
end
