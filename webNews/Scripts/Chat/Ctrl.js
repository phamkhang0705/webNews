$(function () {

    var $historyChat = $("#historyChat");
    var $memberList = $("#member_list");
    var $profile = {};
    var $currentChat = {};

    var addConversation = function (message) {
        var html = '';
        html += message.IsAuthor ?
            '<li class="right clearfix admin_chat"><span class="chat-img1 pull-right">' :
            '<li class="left clearfix"><span class="chat-img1 pull-left">';
        html += '<img src="' + message.Image + '" alt="' + message.FromUserName + '" class="img-circle">';
        html += '</span><div class="chat-body1 clearfix">';
        html += '<p>' + message.Message + '</p>';
        html += message.IsAuthor
            ? '<div class="chat_time pull-left">' + message.CreateDate + '</div>'
            : '<div class="chat_time pull-right">' + message.CreateDate + '</div>';

        $historyChat.append(html);

        var height = $historyChat[0].scrollHeight;
        $historyChat.scrollTop(height);
    }

    //Add recent History
    var addRecentHistory = function (con) {
        var html = "";
        html += '<li class="left clearfix" data-value="'+ con.GroupId +'" private="false">';
        html += '<span class="chat-img pull-left">';
        html += '<img src="' + con.Image + '" alt="' + con.GroupName + '" class="img-circle">';
        html += '</span><div class="chat-body clearfix"><div class="header_sec">';
        html += '<strong class="primary-font">' + con.GroupName + '</strong> <strong class="pull-right">';
        html += con.RecentTime + '</strong></div>';
        html += '<div class="contact_sec"><i class="primary-font">' + con.Description + '</i> <span class="badge pull-right">3</span>';
        html += '</div></li>';

        $memberList.append(html);

        var height = $memberList[0].scrollHeight;
        $memberList.scrollTop(height);
    }
    function registerClientMethods(chatHub) {

        // Calls when user successfully logged in
        chatHub.client.onConnected = function (profile, groups) {
            $profile = profile;
            debugger;
            // Add All Users
            for (i = 0; i < groups.length; i++) {

                addRecentHistory(groups[i]);
            }
            $(".member_list li").on("click",
                function(e) {
                    $(".member_list li").removeClass("selected");
                    $(this).addClass("selected");
                    $currentChat.groupId = $(this).attr("data-value");

                    chatHub.server.getGroupHistoryChat(1, 1);
                });
        }

        // On New User Connected
        chatHub.client.onNewUserConnected = function (id, name) {

            AddUser(chatHub, id, name);
        }


        // On User Disconnected
        chatHub.client.onUserDisconnected = function (id, userName) {

            $('#' + id).remove();

            var ctrId = 'private_' + id;
            $('#' + ctrId).remove();


            var disc = $('<div class="disconnect">"' + userName + '" logged off.</div>');

            $(disc).hide();
            $('#divusers').prepend(disc);
            $(disc).fadeIn(200).delay(2000).fadeOut(200);

        }

        chatHub.client.messageReceived = function (userName, message) {

            AddMessage(userName, message);
        }


        chatHub.client.sendPrivateMessage = function (windowId, fromUserName, message) {

            var ctrId = 'private_' + windowId;


            if ($('#' + ctrId).length == 0) {

                createPrivateChatWindow(chatHub, windowId, ctrId, fromUserName);

            }

            $('#' + ctrId).find('#divMessage').append('<div class="message"><span class="userName">' + fromUserName + '</span>: ' + message + '</div>');

            // set scrollbar
            var height = $('#' + ctrId).find('#divMessage')[0].scrollHeight;
            $('#' + ctrId).find('#divMessage').scrollTop(height);

        }
        // Create a function that the hub can call to broadcast messages.
        chatHub.client.broadcastMessage = function (name, message) {
            // Html encode display name and message.
            var encodedName = $('<div />').text(name).html();
            var encodedMsg = $('<div />').text(message).html();

            // Add the message to the page.
            $('#ChatHistory').append('<p><i>' + new Date().toLocaleString() + '</i><br><b>' + encodedName
                + '</b>:&nbsp;&nbsp;' + encodedMsg + '</p>');
        };

        chatHub.client.onUpdateHistory = function (messages) {
            for (var i = 0; i < messages.length; i++) {
                addConversation(messages[i]);
            }
        }
    }

    // Declare a proxy to reference the hub.
    var chat = $.connection.chatHub;
    $.connection.hub.url = "http://localhost:52527/signalr";

    registerClientMethods(chat);

   
    // Get the user name and store it to prepend to messages.
    // Set initial focus to message input box.
    $('#txtMessage').focus();
    $("#txtMessage").keypress(function (e) {
        if (e.which == 13) {
            $('#btnSendMessage').click();
            setTimeout(function () {
                e.preventDefault();
                $('#txtMessage').val("");
            }, 10);
        }
    });


    // Start the connection.
    $.connection.hub.start().done(function () {
        //chat.server.connect(userId);
        chat.server.connect(1);
        $('#btnSendMessage').click(function () {

            var mess = {
                FromUserId: $profile.Id,
                FromUserName: $profile.UserName,
                Date: new Date().toLocaleTimeString(),
                Message: $('#txtMessage').val(),
                Image: $profile.Image,
                IsAuthor: true,
                GroupId: $currentChat.groupId,
                Private: false
            };
            addConversation(mess);
            // Call the Send method on the hub.
            //chat.server.send($('#displayname').val(), $('#message').val());
            chat.server.send(mess);
            // Clear text box and reset focus for next comment.
            $('#txtMessage').val("").focus();
        });
    });
});