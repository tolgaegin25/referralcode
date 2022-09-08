$("#podo").on("click",function(){
  var notf=document.getElementById('notf');
  var notf2=document.getElementById('notf2');
  notf.style.display="none";   
  notf2.style.display="none"; 
  var chatbot=document.getElementById("chatbot");
  chatbot.style.display="block";  
const data = {
    "button": [
      {
        "id": "1",
        "buttonName": "What is advantage of the campaign?",
        
      },
      {
        "id": "2",
        "buttonName": "How long can the offer be used?",
         
      },
      {
        "id": "3",
        "buttonName": "Which plan does the offer apply?",
         
      },
      {
        "id": "4",
        "buttonName": "Will there be a price increase on the plan after the offer?",
        
      },

      {
        "id": "5",
        "buttonName": "Is there a refund in case of cancellation?",
       
      },
      {
        "id": "6",
        "buttonName": "What happens after a year when the plan is finished?",
        
        
      }
    ]
  };

  
  class Messenger {
    constructor() {
      this.messageList = [];
      this.me = 1;
      this.them = 5;
      this.onRecieve = (message) => console.log('Recieved: ' + message.text);
      this.onSend = (message) => console.log('Sent: ' + message.text);
      this.onButtonOption = (message) => console.log('ButtonOption: ' + message.text);
    }
  
    buttonOption(text = '') {
      let buttonOpt = document.createElement("div")
      buttonOpt.classList = "fadeIn buttons";
      text.forEach((item,index) => {
        buttonOpt.innerHTML += item;
      })
      if (this.validate(text)) {
        let message = {
          user: this.them,
          text: buttonOpt,
          time: new Date().getTime()
        };
  
        this.messageList.push(message); 
        this.onButtonOption(message);
      }
    }
  
    send(text = '') {
      let onSend = this.onSend;
      this.chatMain(text, "me", onSend)
    }
  
    recieve(text = '') {
      let onReceive = this.onRecieve
      this.chatMain(text, "them", onReceive)
    }
  
    chatMain(text, meThem, sendReceive) {
      if (this.validate(text)) {
        let message = {
          user: this.meThem,
          text: text,
          time: new Date().getTime()
        };
  
        this.messageList.push(message);
        sendReceive(message);
      }
    }
  
    validate(input) {
      return !!input.length;
    }
  }
    
  function safeText(text) {
    $content.find('.message-wrapper').last().find('.text-wrapper').text(text);
  }
    
  function animateText() {
    setTimeout(() => {
      $content.find('.message-wrapper').last().find('.text-wrapper').addClass('animated fadeIn');
    }, 350)
  }
    
  function scrollBottom() {
    $($inner).animate({
      scrollTop: $($content).offset().top + $($content).outerHeight(true)
    }, {
      queue: false,
      duration: 'ease'
    });
  }
    
  function buildSent(message) {
    $content.append(buildHTML.me(message.text));
    safeText(message.text);
    animateText();
    scrollBottom();
  }
    
  function buildRecieved(message) {
    $content.append(buildHTML.them(message.text));
    safeText(message.text);
    animateText();
    scrollBottom();
  }
  
  function buidButton(message) {
    $content.append(buildHTML.me(message.text));
    $content.find('.message-wrapper').last().find('.text-wrapper').addClass("noBg").html(message.text);
    animateText();
    scrollBottom();
  }
  
  function addMessage(message, buttonVal) {
    buttonOption.forEach((item,index) => {
      if(item.buttonName === buttonVal){
        $content.append(buildHTML.me(item.buttonName));
        safeText(item.buttonName);
        animateText();
        scrollBottom();
        response(item.id);
        setTimeout(() => {
            buttonMain();
          }, 1000);
        
      }
    })
  }
  function response(id){
    if(id==1){
        messenger.recieve('By using this special offer, you can choose one of the annual plans and get 50% discount.');
    }
    if(id==2){
        messenger.recieve('This offer is limited to one time only. ');
    }
    if(id==3){
        messenger.recieve('Offer does not apply to Jotform Enterprise. The 50% discount applies to the annual Bronze, Silver, or Gold plans.You can upgrade your plan, not downgrade.');
    }
    if(id==4){
        messenger.recieve('The price of your current plan will remain the same as long as your subscription continues.');
    }
    if(id==5){
        messenger.recieve('A full refund will be issued if you cancel your account within 30 days of the original payment date.');
    }
    if(id==6){
        messenger.recieve('Plans will automatically renew at full price one year after the discount is applied. After one year, plans can also be adjusted to a full-priced monthly plan unless canceled.');
    }
  }
    
  class BuildHTML {
    constructor() {
      this.messageWrapper = 'message-wrapper';
      this.textWrapper = 'text-wrapper';
      this.meClass = 'me';
      this.themClass = 'them';
    }
    
    build(text, who) {
      return `<div class="${this.messageWrapper} ${this[who + 'Class']}">
                <div class="${this.textWrapper}">...</div>
              </div>`;
    }
    
    me(text) {
      return this.build(text, 'me');
    }
    
    them(text) {
      return this.build(text, 'them');
    }
  }
  
  let messenger = new Messenger(),
      buildHTML = new BuildHTML(),
      $input = $('#input'),
      $send = $('#send'),
      $content = $('#podoContent'),
      $inner = $('#podoInner'),
      buttonOption = data.button;
  
  class Button {
    buttonClick() {
      let $buttons = $(".buttons a"),
          buttonVal = this.text;
      
      event.preventDefault();
      buttonOption.forEach((item,index) => {
        switch (buttonVal) {
          case item.buttonName:
            addMessage(item.buttonName, buttonVal);
            break;
        }
      });
      for (var i = 0; i < $buttons.length; i++) {
        $buttons[i].text != buttonVal ? $buttons[i].remove() : $buttons[i].classList = "active";
      }
    }
  }
  
  function sendMessage() {
    let text = $input.val();
    messenger.send(text);
    $input.val('');
    $input.focus();
    setTimeout(() => {
      messenger.recieve('Thank you for using PodoBot.');
    }, 1500);
    setTimeout(()=>{
      var chatbot=document.getElementById("chatbot");
      chatbot.style.display="none";
    },3000);  
    setTimeout(()=>{
      $('#podoContent').empty();
    },4500);  
        
  }
  
  function buttonMain() {
    let tempArray = [];
    buttonOption.forEach(function(item, index){
      tempArray.push(`<a href=${item.link} target="_blank">${item.buttonName}</a>`);
    })
  
    messenger.buttonOption(tempArray)
    let button = new Button(),
        $buttons = $(".buttons a");
  
    for (var i = 0; i < $buttons.length; i++) {
      $buttons[i].addEventListener("click", button.buttonClick);
    }
  }
  
  messenger.onSend = buildSent;
  messenger.onRecieve = buildRecieved;
  messenger.onButtonOption = buidButton;
  
  setTimeout(() => {
    messenger.recieve("5 days left until your monthly plan expires. It's time to choose the yearlyplan with Jotform's special offer for you.");
  }, 1500);  
  setTimeout(() => {
    buttonMain();
  }, 3500);
  
  $input.focus();
  send.addEventListener("click", sendMessage);
  
  input.addEventListener('keydown', (e) => {
    let key = e.which || e.keyCode;
    
    if (key === 13) {
      e.preventDefault();
      sendMessage();
    }
  });
});
