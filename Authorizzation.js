const AuthorizzationToken = require("./AuthorizzationToken");

module.exports = class Authorizzation {

	static NOT_LOGGED = new AuthorizzationToken({
		mustBeNotLogged: true
	});

	static LOGGED = new AuthorizzationToken({
		mustBeLogged: true
	});

	static LOGGED_AS_ATHLETE = new AuthorizzationToken({
		mustBeLogged: true,
		mustBeAthlete: true
	});

	static LOGGED_AS_COACH = new AuthorizzationToken({
		mustBeLogged: true,
		mustBeCoach: true
	});

	static LOGGED_AS_PROFESSIONAL = new AuthorizzationToken({
		mustBeLogged: true,
		mustBeProfessional: true
	});

	static merge(arr) {
		for (let i = 1; i < arr.length; i++) {
			Object.keys(arr[0]).forEach(k => {
				arr[0][k] = arr[0][k] && arr[i][k];
			})
		}
		return arr[0];
	}

	static execute(requiredToken, session) {
		var ret = {
			status: true,
			errors: []
		}
		if (requiredToken.mustBeNotLogged)
			checkMustBeNotLogged(session, ret);

		if (requiredToken.mustBeLogged)
			checkMustBeLogged(session, ret);

		if (requiredToken.mustBeAthlete)
			checkMustBeAthlete(session, ret);

		if (requiredToken.mustBeCoach)
			checkMustBeCoach(session, ret);

		if (requiredToken.mustBeProfessional)
			checkMustBeProfessional(session, ret);

		return ret;
	}

	//Check if must be not logged
	checkMustBeNotLogged(session, ret) {
		if (session != undefined && session != {}) {
			ret.status = false;
			ret.errors.push({ code: 1, msg: "Must be not logged in" });
		}
	}

	//Check if must be logged
	checkMustBeLogged(session, ret) {
		if (session == undefined || session == {}) {
			ret.status = false;
			ret.errors.push({ code: 2, msg: "Must be logged in" });
		}
	}

	//Check if must be a athlete
	checkMustBeAthlete(session, ret) {
		if (session == undefined || session.type != 2) {
			ret.status = false;
			ret.errors.push({ code: 3, msg: "Must be logged as athlete" });
		}
	}

	//Check if must be a coach
	checkMustBeCoach(session, ret) {
		if (session == undefined || session.type != 4) {
			ret.status = false;
			ret.errors.push({ code: 3, msg: "Must be logged as coach" });
		}
	}

	//Check if must be a professional
	checkMustBeProfessional(session, ret) {
		if (session == undefined || session.type != 3) {
			ret.status = false;
			ret.errors.push({ code: 3, msg: "Must be logged as professional" });
		}
	}

}