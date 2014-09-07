var publicKeyString, privateKeyString, publicKey;
var keyData;

var firstString = "Hey! Let's chat on Facebook in a secure way. Download the Chrome extension at google.com";

$('document').ready(function() {
     $("._li").append("<div id='newDiv'><div id='title'>FBCRYPT</div></div>");

    var encryptEnable = false;

    // ** This styling still does not work perfectly
    // Create class for position of button so it is
    // applied at the correct time??
    // Put this is a css file if we make one
    var buttonStyle = document.createElement('style');
    buttonStyle.type = 'text/css';
    buttonStyle.innerHTML = '.cssClass { left: -70px; }';
    document.getElementsByTagName('head')[0].appendChild(buttonStyle);
    
    // Insert encrypt checkbox option
    var $option = $('<a class="_1r_ buttonStyle2" role="checkbox" href="#" aria-checked="false" id="encrypt_option"><span class="_3da _6qy">Encrypt</span><span class="_1s0" id="encrypt_checkbox"></span></a>');
    $option.appendTo($("._1r-"));
    
    // Set event handler for encrypt checkbox
    $option.click( function() {
        encryptEnable = !encryptEnable;
        if(encryptEnable)
        {
            // Set to Reply button sends only and hide other checkbox & button
            $option.find('._1s0').css({'background-position': "0 -392px"});
            $("._1r_").hide();
            $("#js_2").hide();
            $input.show();
            $option.show();
        }
        else
        {
            // Make sure other checkbox and button are visible
            $option.find('._1s0').css({'background-position': "0 -372px"});
            $("._1r_").show();
            $("#js_2").show();
            $("._1s0").trigger("click");
            console.log("Disable enter to send");
        }
    });
    
    // Insert new Reply Encrypted button
    // The id js_3 is based off the other button label's id, js_2
    // The id u_0_s2 is based off the other button input's id, u_0_s
    var $input = $('<label class="_1ri uiButton uiButtonConfirm buttonStyle" for="u_0_s" id="js_3" style="position: inherit;left: -70px;"><input value="Encrypt & Reply" type="submit" id="u_0_s2" class="_5f0v" tabindex="-1"></label>');
    $input.appendTo($("._1r-"));
    $input.hide();
    
    // Set event listener for new button
    $("#u_0_s2").click( function() {        
        encryptSendText( function() {
            // Call original Reply button's event listener (on callback)
            $("#u_0_s").trigger("click");
        });     
    });

    function encryptSendText(callback) {
        // Find text in DOM
        var t = document.querySelector("[name=message_body]");

        // Encrypt text
        encryptedMsg = encrypt(t.value);
        
        // Replace text in DOM 
        document.querySelector("[name=message_body]").value = encryptedMsg;

        displayInDOM(t.value);
        callback();
    }
    
    
    var options = {
        numBits: 1024,
        passphrase: "pass",
        userId: "ui"
    }
    
    function generateKeys(callback) {
        keyData = openpgp.generateKeyPair(options);
        publicKeyString = keyData.publicKeyArmored;
        privateKeyString = keyData.privateKeyArmored;
        console.log(publicKeyString);
        callback();
    }

    function encrypt(str) {
        publicKey = openpgp.key.readArmored(keyData.publicKeyArmored);
        var pgpMessage = openpgp.encryptMessage(publicKey.keys, str);
        return pgpMessage;
    }

    function decrypt(pgpMessage) {
        var privateKey = openpgp.key.readArmored(keyData.privateKeyArmored).keys[0];
        privateKey.decrypt('pass');
        pgpMessage = openpgp.message.readArmored(pgpMessage);
        var plaintext = openpgp.decryptMessage(privateKey, pgpMessage);
        console.log("The decrypt is: " + plaintext);
        return plaintext;
    }

    function findTypedMessage () {
        var t = document.querySelector("[name=message_body]");
        var str = t.value;
        console.log("this is the string");
        console.log(str);
        return str;
    }

    function getLastMessage () {
        console.log("get last message");
        var t = $('.webMessengerMessageGroup .clearfix p:nth-last-child(2)').text();
        console.log("this is the last message" + t);
    }

    function checkForDecrypt () {
        console.log("checking for decryption");
        console.log(getLastMessage().substring());
        if(getLastMessage().substring(0, 26) === "-----BEGIN PGP MESSAGE-----") {
            console.log("this should be decrypted");
        }
    }

    function insertToTextField (str) {
    $('textarea._1rv').val(str);
    
    }

    var remotePublicKey = "empty String";
    generateKeys(function() {
        function checkForEncrypt (text) {

            if (!remotePublicKey) {
                var isPgpBlock = /^-----BEGIN PGP PUBLIC KEY BLOCK-----/mi.test(text);
                if (isPgpBlock) {
                    if (text !== publicKeyString)
                    remotePublicKey = text;
                    console.log("This is remotePublicKey" + remotePublicKey);
                }
                return;
            } 

            var clearText = decrypt(text);
            console.log("This is the clearText" + clearText);
        }

        var numberOfMessages = $('._38').length;
        setInterval(function () { 
            var newNumberOfMessages = $('._38').length;
            if (newNumberOfMessages !== numberOfMessages) {
                var text = $($('._38')[newNumberOfMessages - 1]).text();
                checkForEncrypt(text);
                numberOfMessages = newNumberOfMessages;
            }
        }, 100);
    });

    var tempr = "-----BEGIN PGP MESSAGE-----\n" + "Version: OpenPGP.js v0.7.2\nComment: http://openpgpjs.org\n\n";
    //This function is called at the beginning to launch the extension.
    function makeShift () {
        insertToTextField(firstString);
                setTimeout (function () {
                    insertToTextField(publicKeyString);
                }, 6000);;
        
    }
    
    makeShift();

    //replaces DOM
    function replaceDOM () {
        console.log('running replaceDOM');
        var string1 = "-----END PGP MESSAGE-----\nVersion: OpenPGP.js v0.7.2\nComment: http://openpgpjs.org";
        var string3 = "\n-----END PGP MESSAGE-----\n"
        
        var temp2 = $('p:nth-of-type(2)').text();
        temp2 = string1.concat(temp2);
        temp2 = temp2.concat(string3);
        console.log("This is temp2" + "\n" +temp2 + "\n");
        var temp3 = decrypt(temp2);
        console.log("This is temp3" + temp3);

        var temp1 = $('.webMessengerMessageGroup .clearfix p:nth-of-type(2)').text();
        

        $('p:nth-of-type(2)').replaceAll("<p>"+ temp3.text() + "</p>");
    }

    function displayInDOM(plaintext) {
        if (encryptEnable) {
            $("#newDiv").append("<h1 class='myplaintext'>" + decrypt(plaintext) + "</h1>");
        }
    }

    $('#u_0_s2').click(function(){
        console.log('dwadwad');
        replaceDOM();

        setTimeout(function(){

            // $('.webMessengerMessageGroup .clearfix .direction_ltr p').last().replaceWith("<p></p>");
        }, 500);
    });
    

    

    
});
