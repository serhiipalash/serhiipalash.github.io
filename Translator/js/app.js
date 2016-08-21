// app.js

var Translator = angular.module('Translator', []);

Translator.controller('mainCtrl', function ($scope) {
    $scope.number = null;
    $scope.languages = dataModel;

    $scope.pageLanguage = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase();
    $scope.languages[$scope.pageLanguage].show = true;

    $scope.translateNumber = function (number, language) {
        number += '';
        translation = '';
        words = $scope.languages[language].words;
        a = '';

        String.prototype.f1 = function () {
            return this;
        };
        String.prototype.f2 = function () {
            return this;
        };

        if (/^[1-9][0-9]*$/.test(number) && number.length <= 102) {

            for (var i = 0; i < number.length%3; i++) {
                number = '0'.concat(number);
            }

            number = number.match(/.{1,3}/g);

            for (var i = 0; i < number.length; i++) {
                number[i] = number[i].replace(/^0+/g, '');
            }

            for (var i = 0; i < number.length; i++) {
                switch (language) {
                    case 'de':
                        String.prototype.f1 = function () {
                            if (number[i-1] == 1 || (number[i-1][number[i-1].length-1] == 1 && number[i-1][number[i-1].length-2] == 0)) {
                                return this.replace(/den /,'de ').replace(/nen /,'n ');
                            } else {
                                return this;
                            }
                        };

                        String.prototype.f2 = function () {
                            return this.replace(/(.+)\s(.+)/i,"$2und$1");
                        };

                        if ((number[i] == 1 || number[i]%100==1) && i == number.length-1) {
                            words[0][1] = 'eins';
                        } else if ((number[i] == 1 || number[i]%100 == 1) && i < number.length-2) {
                            words[0][1] = 'eine';
                        } else {
                            words[0][1] = 'ein';
                        }

                        break;
                    case 'en':
                        if (number[i] < 99 && number[i-1] == null) {
                            a = '';
                        } else {
                            a = 'and ';
                        }

                        String.prototype.f2 = function () {
                            return this.replace(/\s(?=.)/,'-');
                        };

                        break;
                    case 'en-us':
                        String.prototype.f2 = function () {
                            return this.replace(/\s(?=.)/,'-');
                        };

                        break;
                    case 'es':
                        String.prototype.f1 = function () {
                            if (number[i-1] == 1 && (number.length-i)%2 == 0) {
                                return this.replace(/ones /,'ón ');
                            } else if (number[i] != 0 && i < number.length-2) {
                                return words[3][number.length-i].replace(/(.+)\s(.+)/,"$1 ");
                            } else {
                                return this;
                            }
                        };

                        String.prototype.f2 = function () {
                            if (number[i][number[i].length-2] == 2 && number[i][number[i].length-1] != 0) {
                                return this.replace(/\s(?=.)/,'').replace(/dos /,'dós ').replace(/tres /,'trés ').replace(/seis /,'séis ').replace(/un /,'ún ');
                            } else if (number[i][number[i].length-2] > 2 && number[i][number[i].length-1] != 0) {
                                return this.replace(/\s(?=.)/,' y ');
                            } else {
                                return this;
                            }
                        };

                        if (number[i] == 100) {
                            words[2][1] = 'cien ';
                        } else {
                            words[2][1] = 'ciento ';
                        }

                        if (parseInt(number[i].substr(1)) == 20 || number[i] == 20) {
                            words[1][2] = 'veinte ';
                        } else {
                            words[1][2] = 'veinti ';
                        }

                        if (number[i] == 1 && (number.length-i)%2 == 0) {
                            words[0][1] = '';
                        } else if (i == number.length-1) {
                            words[0][1] = 'uno ';
                        } else {
                            words[0][1] = 'un ';
                        }

                        break;
                    case 'fr':
                        if (number[i] == 1 || number[i].substr(1) == '01' || number[i][number[i].length-2] == 8) {
                            words[0][1] = 'un ';
                        } else {
                            words[0][1] = 'et un ';
                        }

                        if (number[number.length-2] == 1 && i == number.length-2) {
                            words[0][1] = '';
                        }

                        if (number[i][number[i].length-2] == 7) {
                            words[0][11] = 'et onze ';
                        } else {
                            words[0][11] = 'onze ';
                        }

                        if (number[i]%100 == 0 && number[i] > 199 && i != number.length-2) {
                            words[2][2] = 'deux cents ';
                            words[2][3] = 'trois cents ';
                            words[2][4] = 'quatre cents ';
                            words[2][5] = 'cinq cents ';
                            words[2][6] = 'six cents ';
                            words[2][7] = 'sept cents ';
                            words[2][8] = 'huit cents ';
                            words[2][9] = 'neuf cents ';
                        } else {
                            words[2][2] = 'deux cent ';
                            words[2][3] = 'trois cent ';
                            words[2][4] = 'quatre cent ';
                            words[2][5] = 'cinq cent ';
                            words[2][6] = 'six cent ';
                            words[2][7] = 'sept cent ';
                            words[2][8] = 'huit cent ';
                            words[2][9] = 'neuf cent ';
                        }

                        if ((number[i] == 80 || number[i].substr(1) == '80') && i != number.length-2) {
                            words[1][8] = 'quatre-vingts ';
                        } else {
                            words[1][8] = 'quatre-vingt ';
                        }

                        String.prototype.f1 = function () {
                            if (number[i-1] == 1 || number[i-1].substr(1) == '01') {
                                return this.replace(/s /,' ');
                            } else {
                                return this;
                            }
                        };

                        if ((number[i][number[i].length-1] != 1 && number[i][number[i].length-2] > 1 && number[i][number[i].length-2] < 7) || number[i][number[i].length-2] == 8) {
                            String.prototype.f2 = function () {
                                return this.replace(/\s(?=.)/,'-');
                            };
                        } else if ((number[i][number[i].length-2] == 7 && number[i][number[i].length-1] != 1) || number[i][number[i].length-2] == 9) {
                            String.prototype.f2 = function () {
                                return this.replace(/(.+)\-(.+)/i,"$1-") + words[0][ parseInt(number[i][number[i].length-1]) + 10 ];
                            };
                        } else if (number[i] == 71 || number[i].substr(1) == '71') {
                            String.prototype.f2 = function () {
                                return this.replace(/(.+)\-(.+)/i,"$1 ") + words[0][ parseInt(number[i][number[i].length-1]) + 10 ];
                            };
                        }

                        break;
                    case 'ru':
                        String.prototype.f1 = function () {
                            if (number[i-1][number[i-1].length-1] < 5 && number[i-1][number[i-1].length-1] > 1 && number[i-1][number[i-1].length-2] != 1) {
                                return this.replace(/ч /,'чи ').replace(/ов /,'а ');
                            } else if (number[i-1][number[i-1].length-1] == 1 && number[i-1][number[i-1].length-2] != 1) {
                                return this.replace(/ч /,'ча ').replace(/ов /,' ');
                            } else {
                                return this;
                            }
                        };

                        if (i == number.length-2) {
                            words[0][1] = 'одна ';
                            words[0][2] = 'две ';
                        } else {
                            words[0][1] = 'один ';
                            words[0][2] = 'два ';
                        }

                        break;
                    case 'tr':
                        if (number[i] == 1 && i == number.length-2) {
                            words[0][1] = '';
                        } else {
                            words[0][1] = 'bir ';
                        }

                        break;
                    case 'uk':
                        String.prototype.f1 = function () {
                            if (number[i-1][number[i-1].length-1] < 5 && number[i-1][number[i-1].length-1] > 1 && number[i-1][number[i-1].length-2] != 1) {
                                return this.replace(/ч /,'чі ').replace(new RegExp('.в '), 'и ');
                            } else if (number[i-1][number[i-1].length-1] == 1 && number[i-1][number[i-1].length-2] != 1) {
                                return this.replace(/ч /,'ча ').replace(new RegExp('.в '), ' ');
                            } else {
                                return this;
                            }
                        };

                        if (i == number.length-2) {
                            words[0][1] = 'одна ';
                            words[0][2] = 'дві ';
                        } else {
                            words[0][1] = 'один ';
                            words[0][2] = 'два ';
                        }

                        break;
                }

                if (i > 0 && number[i-1] != 0)
                    translation += words[3][number.length-i].f1();

                if (number[i] == 0)
                    translation += '';
                else if (number[i] < 20)
                    translation += a + words[0][number[i]];
                else if (number[i] >= 20 && number[i] < 100)
                    translation += a + (words[1][number[i][0]] + words[0][number[i][1]]).f2();
                else if (number[i]%100 == 0)
                    translation += words[2][number[i][0]];
                else if (number[i] >= 100 && number[i][1] <= 1)
                    translation += words[2][number[i][0]] + a + words[0][parseInt(number[i].substr(1))];
                else if (number[i] >= 100 && number[i][1] >= 2)
                    translation += words[2][number[i][0]] + a + (words[1][number[i][1]] + words[0][number[i][2]]).f2();
            }
        } else if ($scope.number != null) {
            translation = $scope.languages[language]['error'];
        }

        return translation;
    };
});
