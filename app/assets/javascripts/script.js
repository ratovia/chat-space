$(function(){
// link_to "HOME", root_path, data: {"turbolinks" => false}
// https://qiita.com/hodosan/items/ee84482d18d6dccd9488
// $(document).on("turbolinks:load",function(){

  const POLING_TIME = 7000;

  function append_member_list(id,name){
    let html = `
                <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>
              `;
    $('#chat-group-users').append(html);
  }

  function remove_member_list(id_selector){
    $("#" + id_selector).remove();
  }

  function append_user_list(users){
    users.forEach(function(user){
      let appendFlag = true;
      $(".chat-group-user__name").each(function(){
        name = $(this).text().replace(/\r?\n/g, '');
        if(name == user.name){
          appendFlag = false;
        }
      });
      if(appendFlag){
        let html = `
                    <div class="chat-group-user clearfix chat-group-form__field--right">
                      <p class="chat-group-user__name">${user.name}</p>
                      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                    </div>
                  `
        $('#user-search-result').append(html);
      }
    })
  }

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
    $(".message-list").append(html);
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
        append_message_list(message);
        $(".main-center").animate({scrollTop: $(".message-list")[0].scrollHeight }, 'fast');
      }
      $('.message-form__submit').prop("disabled",false);
      $("#new_message")[0].reset();
    }).fail(function(){
      $('.message-form__submit').prop("disabled",false);
      alert("エラーが発生しました");
    });
  });

  $("#user-search-field").on("keyup",function(event){
    if(event.code === "Space"){
      return;
    }else{
      $('#user-search-result').empty();
      let input = $(this).val();
      $.ajax({
        method: "GET",
        url: "/users",
        data: { keyword: input },
        dataType: "json",
      }).done(function(data){
        let users = []
        data.forEach(function(user) {
          users.push(user);
        });
        append_user_list(users);
        if(event.key === "Backspace"){
          if(input == ""){
            $('#user-search-result').empty();
          }
        }
      }).fail(function(){
        alert("ユーザー検索に失敗しました");
      });
    }
  });

  $(document).on("click", ".chat-group-user__btn--add",function(){
    $('#user-search-result').empty();
    let id = $(this).attr("data-user-id");
    let name = $(this).attr("data-user-name");
    append_member_list(id,name);
  });

  $(document).on("click", ".chat-group-user__btn--remove",function(){
    let id_selector = $(this).parent().attr("id");
    remove_member_list(id_selector);
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
        if(messages.length){
          $(".main-center").animate({scrollTop: $(".message-list")[0].scrollHeight }, 'fast');
        }
      }).fail(function() {
        alert('新規メッセージをロードできませんでした。');
      });
    }
  };

  setInterval(reloadMessages,POLING_TIME);
});
