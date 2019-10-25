const utils = {
    slugify: function(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w-]+/g, '')       // Remove all non-word chars
            .replace(/--+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    },
    passwordChecker: function(password) {
        let strength = 0;

        if (password.length >= 4 && password.length <= 6) {
            strength += 1;
        } else if (password.length >= 7 && password.length <= 9) {
            strength += 2;
        } else if (password.length >= 10) {
            strength += 4;
        }

        if (password.match(/[A-Z]/)) {
            strength += 3;
        }

        if (password.match(/[0-9]/)) {
            strength += 3;
        }
        return strength;
    },
    getMonthSetup: function(year, month) {
        let first = new Date(year, month, 1),
            last = new Date(year, month + 1, 0);

        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        let currentMonth = {
            start: days[first.getDay()],
            end: last.getDate()
        };

        return currentMonth;
    },
    getDayPos: function(day) {
        let startPos = {
            "Mon": 0,
            "Tue": 1,
            "Wed": 2,
            "Thu": 3,
            "Fri": 4,
            "Sat": 5,
            "Sun": 6
        };

        return startPos[day];
    },
    getDateAsString: function(date) {
        let y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate(),
            dateAsString = d + "/" + m + "/" + y;

        return dateAsString;
    },
    getMonthNames: function() {
        const months = {
            "January": 0,
            "Feburary": 1,
            "March": 2,
            "April": 3,
            "May": 4,
            "June": 5,
            "July": 6,
            "August": 7,
            "September": 8,
            "October": 9,
            "November": 10,
            "December": 11
        };

        return months;
    },
    isToday: function(someDate) {
        const today = new Date();

        /*eslint-disable */
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
        /*eslint-enable */
    },
    countryList: function() {
        let countries = [
            "Albania",
            "Andorra",
            "Armenia",
            "Austria",
            "Azerbaijan",
            "Belarus",
            "Belgium",
            "Bosnia and Herzegovina",
            "Bulgaria",
            "Croatia",
            "Cyprus",
            "Czechia",
            "Denmark",
            "Estonia",
            "Finland",
            "France",
            "Georgia",
            "Germany",
            "Greece",
            "Hungary",
            "Iceland",
            "Ireland",
            "Italy",
            "Kazakhstan",
            "Kosovo",
            "Latvia",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Malta",
            "Moldova",
            "Monaco",
            "Montenegro",
            "Netherlands",
            "North Macedonia",
            "Norway",
            "Poland",
            "Portugal",
            "Romania",
            "Russia",
            "San Marino",
            "Serbia",
            "Slovakia",
            "Slovenia",
            "Spain",
            "Sweden",
            "Switzerland",
            "Turkey",
            "Ukraine",
            "United Kingdom",
            "Vatican City"
        ];

        return countries;
    }
};

export default utils;
