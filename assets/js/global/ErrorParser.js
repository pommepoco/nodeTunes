function ErrorParser(jwres) {
	if(jwres.error) {
		if(jwres.error.raw && jwres.error.raw.code) {
			switch (jwres.error.raw.code) {
				case 11000:
					return 'username already used';
					break;
				default :
					console.log(jwres);
					return 'unknow error appends';
					break;
			}
		}
	}
}