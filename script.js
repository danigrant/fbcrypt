$(function() {
	openpgp.init();
	var pkeys = openpgp.generate_key_pair(1,1024,'anton@headnet.dk', 'mysecret');
	console.log(pkeys.privateKeyArmored);
	console.log(pkeys.publicKeyArmored);
})