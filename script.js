$('document').ready(function() {
		
	// disable old button (hidden)
	// insert new button into chat dom
	// set event listener for new button
	// change chat text to encrypted
	// when event listener end, call old button's event listener
	console.log($("._1r_").attr("aria-checked"));
	if($("._1r_").attr("aria-checked") != false)
	{
		$("._1s0").trigger("click");
		console.log("Disable enter to send");
	}
	$("._1r-").hide();
	
	var keyData;
	var options = {
		numBits: 1024,
		passphrase: "pass",
		userId: "ui"
	}
	
	function generateKeys(callback) {
		console.log("genkeys");
		console.log(openpgp);
		keyData = openpgp.generateKeyPair(options);
		console.log(openpgp);
		console.log(keyData.publicKeyArmored);
		var publicKeyString = keyData.publicKeyArmored;
		console.log(openpgp);
		var privateKeyString = keyData.privateKeyArmored;
		callback();
	}

	function encrypt(str) {
		console.log("encrypt");
		console.log(openpgp);
		console.log(keyData);
		console.log(keyData.publicKeyArmored);
		var publicKey = openpgp.key.readArmored(keyData.publicKeyArmored);
		var pgpMessage = openpgp.encryptMessage(publicKey.keys, str);
		console.log(pgpMessage);
		return pgpMessage;
	}

	function decrypt(pgpMessage) {
		console.log("decrypt");
		console.log(openpgp);
		var privateKey = openpgp.key.readArmored(keyData.privateKeyArmored).keys[0];
		privateKey.decrypt('pass');
		pgpMessage = openpgp.message.readArmored(pgpMessage);
		var plaintext = openpgp.decryptMessage(privateKey, pgpMessage);
		return plaintext;
	}

	function findTypedMessage () {
		var t = document.querySelector("[name=message_body]");
		var str = t.value;
		console.log(str);
		return str;
	}

	generateKeys( function() {
		console.log(decrypt(encrypt('Hello World')));
	});


});