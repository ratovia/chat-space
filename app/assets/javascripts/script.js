$(function(){
  const POLING_TIME = 5000;

  function append_message_list(message){
    let text = message.text ? `${message.text}` : "";
    let image = message.image.url ? `${message.image.url}` : "";
    let html = `
                <li class="message-item" data-message data-id="${message.id}">
                  <div class="message-item__upper">
                    <p class="message-item__upper__username">
                      ${message.user_name}
                    </p>
                    <p class="message-item__upper__timestamp">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="message-item__under">
                    <p>${text}</p>
                    <img src="${image}" class="message-item__under__image"></img>
                  </div>
                </li>
              `
    $(".message-list").append(html)
  }


  $('#new_message').on("submit",function(e){
    e.preventDefault();
    let formData = new FormData(this);
    $.ajax({
      method: "POST",
      url: $(this).attr("action"),
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    }).done(function(message){
      if (!(message.text == "" && message.image.url == null)){
        appendList(message);
        $(".main-center").animate({scrollTop: $(".message-list")[0].scrollHeight }, 'fast');
      }
      $('.message-form__submit').prop("disabled",false);
      $("#new_message")[0].reset();
    }).fail(function(e){
      $('.message-form__submit').prop("disabled",false);
      alert("エラーが発生しました");
    });
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/[0-9]+\/messages/)){
      let last_message_id = $(".message-item").eq(-1).data("id");
      $.ajax({
        url: "./api/messages",
        type: 'get',
        dataType: 'json',
        data: {message_id: last_message_id}
      }).done(function(messages) {
        messages.forEach(function(message){
          append_message_list(message);
        })
        $(".main-center").animate({scrollTop: $(".message-list")[0].scrollHeight }, 'fast');
      }).fail(function() {
        alert('新規メッセージをロードできませんでした。');
      });
    }
  };

  setInterval(reloadMessages,POLING_TIME);
});
