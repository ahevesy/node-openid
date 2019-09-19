const { Issuer } = require('openid-client');
Issuer.discover('http://openam.archient.com:7003/openam/oauth2/F1DEV/.well-known/openid-configuration') // => Promise
  .then(function (googleIssuer) {
    console.log('Discovered issuer %s %O', googleIssuer.issuer, googleIssuer.metadata);


	const client = new googleIssuer.Client({
	          client_id: 'zELcpfANLqY7Oqas',
	          client_secret: 'TQV5U29k1gHibH5bx1layBo0OSAvAbRT3UYW3EWrSYBB5swxjVfWUa1BS8lqzxG/0v9wruMcrGadany3',
	          redirect_uris: ['http://localhost:3000/cb'],
	          response_types: ['code'],
	          // id_token_signed_response_alg (default "RS256")
	//         //   // token_endpoint_auth_method (default "client_secret_basic")
	//                 });

  	});


	const { generators } = require('openid-client');
	const code_verifier = generators.codeVerifier();
	// store the code_verifier in your framework's session mechanism, if it is a cookie based solution
	// it should be httpOnly (not readable by javascript) and encrypted.
 
 	const code_challenge = generators.codeChallenge(code_verifier);
  
  	client.authorizationUrl({
    		scope: 'address phone openid profile cn email',
      		resource: 'http://openam.archient.com:7003/openam/oauth2/realms/root/realms/F1DEV/authorize',
        	code_challenge,
          	code_challenge_method: 'S256',
    });

    const params = client.callbackParams(req);
    client.callback('https://client.example.com/callback', params, { code_verifier }) // => Promise
      .then(function (tokenSet) {
        console.log('received and validated tokens %j', tokenSet);
        console.log('validated ID Token claims %j', tokenSet.claims());
      });    


}); 
