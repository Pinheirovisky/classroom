const parseDay = (number) => {
	switch (number) {
		case 1:
			return 'Segunda';
		case 2:
			return 'Terça';
		case 3:
			return 'Quarta';

		case 4:
			return 'Quinta';
		case 5:
			return 'Sexta';

		default:
			return 'NOT VALID';
	}
};

export {parseDay};
