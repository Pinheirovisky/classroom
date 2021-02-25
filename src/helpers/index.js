// require("./src/nfe.js");
// require("./src/cartao.js");
const days = [1, 2, 3, 4, 5];
const hours = [13, 14, 15, 16];

const sortRecurrence = () => {
	function randomIntFromInterval(min, max) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	return randomIntFromInterval(1, 2);
};

function getRandomIndex(items) {
	return items[Math.floor(Math.random() * items.length)];
}

const sortSchedule = (recurrence) => {
	const hour = getRandomIndex(hours);
	const day = getRandomIndex(days);

	if (recurrence === 1) {
		return {
			hour1: hour,
			day1: day,
		};
	}

	let hour2 = getRandomIndex(hours);
	let day2 = getRandomIndex(days);

	if (hour2 === hour && day2 === day) {
		while (day2 === day) {
			day2 = getRandomIndex(days);
		}
	}

	return {
		hour1: hour,
		day1: day,
		hour2: hour2,
		day2: day2,
	};
};

const makeStudent = () => {
	const recurrence = sortRecurrence();
	const sortSchedules = sortSchedule(recurrence);

	return {
		hour1: sortSchedules.hour1,
		day1: sortSchedules.day1,
		hour2: sortSchedules.hour2 || undefined,
		day2: sortSchedules.day2 || undefined,
		recurrence: recurrence,
	};
};

const listStudent = (number = 0) => {
	return Array.from(Array(number).keys()).map(() => makeStudent());
};

function makeString(student) {
	const day1 = student.day1 || '';
	const hour1 = student.hour1 || '';
	const day2 = student.day2 || null;
	const hour2 = student.hour2 || null;

	if (!day2) {
		return {
			one: `${day1}-${hour1}`,
		};
	}

	let recurrence = '';
	recurrence = `${day2}-${hour2}`;

	const scheduleSort = [`${day1}-${hour1}`, recurrence].sort();

	return {
		one: `${scheduleSort[0]}-${scheduleSort[1]}`,
		two: `${recurrence}-${day1}-${hour1}`,
	};
}

function makeRooms(students) {
	return students.reduce((acc, cur) => {
		const index = makeString(cur);

		if (acc[index.one]) {
			acc[index.one].push(cur);

			return acc;
		} else if (acc[index.two]) {
			acc[index.two].push(cur);

			return acc;
		}

		acc[index.one] = [cur];

		return acc;
	}, []);
}

function main(number: number) {
	const students = listStudent(number);
	const rooms = makeRooms(students);

	const keysMoreThanOneClass = Object.keys(rooms)
		.filter((key) => rooms[key].length > 12)
		.map((key) => {
			const length = rooms[key].length;

			return {
				key,
				students: length,
				rooms: Math.ceil(length / 12),
			};
		});

	const regex = /^(\d{1})-(\d{2})-?(\d{1})?-?(\d{2})?$/i;

	let schedules = [];

	Object.keys(rooms).map((key) => {
		const matches = regex.exec(key);

		if (matches[3]) {
			schedules.push(`${matches[3]}-${matches[4]}`);
		}

		schedules.push(`${matches[1]}-${matches[2]}`);
	});

	schedules = [...new Set(schedules)].sort();
	const schedulesByHour = schedules.map((schedule) => {
		const roomsCount = Object.keys(rooms).filter((key) => {
			const matches = regex.exec(key);

			const sch1 = `${matches[3]}-${matches[4]}`;
			const sch2 = `${matches[1]}-${matches[2]}`;
			if (sch1 === schedule || sch2 === schedule) {
				return true;
			}
		});

		const findKeyMoreThanOne = keysMoreThanOneClass.find(
			(keyMoreThanOne) => keyMoreThanOne.key === schedule
		);
		const moreThanOneClass = findKeyMoreThanOne
			? findKeyMoreThanOne.rooms - 1
			: 0;
		const totalRooms = roomsCount.length + moreThanOneClass;

		return {
			schedule,
			rooms_concurrently: totalRooms,
		};
	});
	const schedulesRooms = schedulesByHour.map(
		(schedule) => schedule.rooms_concurrently
	);

	return {
		max: Math.max(...schedulesRooms),
		min: Math.min(...schedulesRooms),
		schedules: schedulesByHour,
	};
}

export {main};
