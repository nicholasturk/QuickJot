class Note {
	constructor(time, content) {
		this.time = time;
		this.content = content;
	}

	getContent() {
		return this.content;
	}

	getTime() {
		return this.time;
	}

	getTimeSince() {
		var seconds = Math.floor((new Date() - this.time) / 1000);
		if (seconds === 0) {
			return "just now";
		}

		var interval = seconds / 31536000;
		var timeCode = "";

		if (interval >= 1) {
			timeCode = "year";
		} else {
			interval = seconds / 2592000;
			if (interval >= 1) {
				timeCode = "month";
			} else {
				interval = seconds / 86400;
				if (interval >= 1) {
					timeCode = "day";
				} else {
					interval = seconds / 3600;
					if (interval >= 1) {
						timeCode = "hour";
					} else {
						interval = seconds / 60;
						if (interval >= 1) {
							timeCode = "minute";
						} else {
							timeCode = "second";
						}
					}
				}
			}
		}
	}
}