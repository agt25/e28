let Example = {
    data() {
        return {
            playerName: '',
            level: '',
            answer: '',
            imageSource: null,
            imageAlt: null,
            correct: null,
            feedbackClass: null,
            showHint: false,
            statements: [],
            statementsFeedback: {},
            bonusChallenges: {
                oddNumber: 'Is the answer an odd number?',
                greaterThan10: 'Is the answer greater than 10?',
                divisibleBy3: 'Is the answer evenly divisible by 3?'
            },
            user: {},
            firstName: '',
            lastName: '',
            phoneNumber: '',
        }
    },
    computed: {
        randomNumber1() {
            return this.getRandomNumber(this.level);
        },
        randomNumber2() {
            return this.getRandomNumber(this.level);
        },
        fullName() {
            return this.firstName + ' ' + this.lastName;
        },
        displayPhoneNumber() {
            let cleaned = ('' + this.phoneNumber).replace(/\D/g, '')
            let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
            if (match) {
                return '(' + match[1] + ') ' + match[2] + '-' + match[3]
            }
            return null
        }
    },
    mounted() {
        //console.log('mounted hook was triggered');
    },
    created() {
        this.loadUser();
    },
    methods: {
        getRandomNumber(level) {
            // Default: Easy
            let min = 1;
            let max = 10;

            if (level == 'medium') {
                min = 50;
                max = 100;
            } else if (level == 'hard') {
                min = 1000;
                max = 5000
            }

            return Math.floor((Math.random() * max) + min)
        },
        getFullName() {
            return this.firstName + ' ' + this.lastName;
        },
        loadUser() {
            fetch('https://api.mocki.io/v1/ce5f60e2')
                .then(response => response.json())
                .then(data => {
                    this.user = data;
                });
        },
        submitAnswer() {
            let correctAnswer = this.randomNumber1 + this.randomNumber2;

            if (this.answer === correctAnswer) {
                this.imageSource = 'happy';
                this.imageAlt = 'Happy smiley face';
                this.correct = true;
                this.feedbackClass = 'correct';
            } else {
                this.imageSource = 'sad';
                this.imageAlt = 'Sad frowny face';
                this.correct = false;
                this.feedbackClass = 'incorrect';
            }

            Object.keys(this.bonusChallenges).forEach((key) => {

                let isTrue = null;

                if (key == 'oddNumber') {
                    isTrue = this.answer % 2 != 0;
                } else if (key == 'greaterThan10') {
                    isTrue = this.answer > 10;
                } else if (key == 'divisibleBy3') {
                    isTrue = this.answer % 3 == 0;
                }

                let feedback = isTrue && this.statements.includes(key) || !isTrue && !this.statements.includes(key);

                this.statementsFeedback[key] = [isTrue, feedback];
            });


        }
    },
}

const app = Vue.createApp(Example).mount('#app');
