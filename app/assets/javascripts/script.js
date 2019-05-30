$(function(){
  function appendList(message){
    let text = message.text ? `${message.text}` : "";
    let image = message.image.url ? `${message.image.url}` : "";
    let html = `
                <li class="message-item">
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
});
