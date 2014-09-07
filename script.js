var publicKeyString, privateKeyString, publicKey;
var keyData;

$('document').ready(function() {
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
		console.log
		
		// Replace text in DOM 
		document.querySelector("[name=message_body]").value = encryptedMsg;
	
		callback();
	}
	
	keyData;
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
        return t;
    }

    function checkForDecrypt () {
    	console.log("checking for decryption");
		console.log(getLastMessage().substring());
    	if(getLastMessage().substring(0, 26) === "-----BEGIN PGP MESSAGE-----") {
    		console.log("this should be decrypted");
    	}
    }

    var remotePublicKey;
	generateKeys(function() {
		function checkForEncrypt (text) {

			if (!remotePublicKey) {
				var isPgpBlock = /^-----BEGIN PGP PUBLIC KEY BLOCK-----/mi.test(text);
				if (isPgpBlock) {
					if (text !== publicKey)
					remotePublicKey = text;
					console.log(remotePublicKey);
				}
				return;
			} 

			var clearText = decrypt(text);
			console.log(clearText);
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
});
