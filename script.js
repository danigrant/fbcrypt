$(function() {
	
	//will need key gen function
	var key = openpgp.generate_key_pair(1, 2048, "username", "");

		// '-----BEGIN PGP PUBLIC KEY BLOCK-----\n' +
		// 'Version: SKS 1.1.4\n' +
		// 'Comment: Hostname: pgp.mit.edu\n' +
		// '\n' +
		// 'mQENBFQDSPMBCADFLRcvHgo45ALJ8UtmD3xdS5jHR7/ENUVDiBQSkZhCH+3rnW24jBKyRdXP\n' +
		// 'BUSp6G4f1cMf5LBFhbL8J/aXtaLV0JcrU0BplJQVxLFB6a7Omgiy6dqcJUFhChAmPr4j9Ibc\n' +
		// 'aCB2sRq34RfhCcdqrgzvXzpt7FSby4aAGUSLh+xX5lSLrpDlb6zf7FKY4+/Yzcz6g32sKMEp\n' +
		// '8E4ZKphaGnD9DFZ/eny+zFpxFJ6YwRf9PxNUCbuviSZDTPX0FOHbqZxLPV7BsD8u6Lfb9fM7\n' +
		// 'Ng+uWrU4lnE03U8F4Qcjz3KzrPA9jfyoM9UsF41Vc4IAUdQWrxcp0Fl6QJnr8qm0a9rjABEB\n' +
		// 'AAG0IURhbmkgR3JhbnQgPGRkYW5pZ3JhbnRAZ21haWwuY29tPokBPQQTAQoAJwUCVANI8wIb\n' +
		// 'AwUJB4YfgAULCQgHAwUVCgkICwUWAgMBAAIeAQIXgAAKCRBj+HGnkdp+hJqvB/0dMLBxripd\n' +
		// 'mPNalfUt2u92jXkGtaDjpCplbJ+klBi4D99+hkNKdC0HOk5Fh6Bh0Dt5wlUTD/sWHnFfYmhA\n' +
		// 'c5zpuzoZ0l12/peHGGShBOMmeIGP93O8+ZU4X532K/LcWF2/bzfK9j1Tu7q2jZD+h7myM8yE\n' +
		// '4d5onc/EV+ldGqB+DvqM6lDtjPAXIeinOdRntiDsgZqo/lZbd9VCO4H+PP+39LsSHF/9t9vp\n' +
		// 'WxDtTHdeMy7YRYDGA+IEs8Xjpyetgdnl1n4nvt+P2SWXXIzlHmNgPS4YwtrusxleIFQYh4pC\n' +
		// 'iqoiMUzlKpQ7sN4WXpMydysPchsAkC3hV0/KXL7ZsuDwuQENBFQDSPMBCAC0xMIboiUr97bn\n' +
		// '0tVGGZnjShQAxllJ8/CW/N6qnO044AuLEXfFlZ16cCtiTplE6Bxd/FL8nrNA6KSa+d7gTl8B\n' +
		// '5zlQl9PzIsDyrlIY1qf2hN1C9B04hmN1Zcq1GyrWg9ot9JQMnpOK4O9cdW+/21qLTipGp4Xv\n' +
		// 'K+liVKkmppGcbhGkv0GW1yPaF+ivO7GUxC0l7uulzOy9uchXUKvy1PXIJ8o4W0aWp4EL52+N\n' +
		// 'G13FXuZ3eDxyfnNWQHPto0ZkNRKHYNDLI2eSQKzFHawUCCJzXtu3FdDI6EnLYH12h/sHtyOq\n' +
		// 'SWX/grqd15GCZA3w/tYn3iAI1xBkwLZLLy9kamT5ABEBAAGJASUEGAEKAA8FAlQDSPMCGwwF\n' +
		// 'CQeGH4AACgkQY/hxp5HafoTjWAf+OzDfxZF1aUMM4fcMOe+9J6pC7nBNkPrm1LwseDTLS07s\n' +
		// 'K9JbwChjwiPuyrxZkjLhLGvqfdZeH5hlTAYE5ntSIpbdtaX0G5DCL/WXwfPC4Hf5j0HWdQEk\n' +
		// 'p8Q6LwmNe1d4zWh5P/S26kBCFgyBVC6RjNr4gAt84aUG77jKSmtTVID9q08dI1+XIiiIN/vB\n' +
		// '4kFiiajEMdqCB0Mal5IXPIdjCQDEDo/JuXYMIr8mveLBX1h5cD25kGxXDFt746kR4wbxTPMY\n' +
		// 'HO3XSPeobCXQm0V4lSrSEXm24ZSMJvGMYROOPvB17817jPN6hGHTGvpLStl3zaQx/GCqC7pa\n' +
		// 'YSVV6EVk5w==\n' +
		// '=fjic\n' +
		// '-----END PGP PUBLIC KEY BLOCK-----';

	function encrypt(str) {
		var publicKey = openpgp.key.readArmored(key);
		var pgpMessage = openpgp.encryptMessage(publicKey.keys, str);
		console.log(pgpMessage);
		return pgpMessage;
	}

	function decrypt(str) {
		var key = '-----BEGIN PGP PRIVATE KEY BLOCK ... END PGP PRIVATE KEY BLOCK-----';
		var privateKey = openpgp.key.readArmored(key).keys[0];
		privateKey.decrypt('passphrase');
		var pgpMessage = '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----';
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

	console.log(decrypt(encrypt('Hello World')));

})