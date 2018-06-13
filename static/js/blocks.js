function Blocks() { //klasa przechowująca klocki    

    /*var I = [               //stałe niezmienne wzory bloczków
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ];

    var J = [
        [0, 2, 0],
        [0, 2, 0],
        [2, 2, 0]
    ];

    var L = [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3]
    ];

    var O = [
        [4, 4],
        [4, 4]
    ];

    var S = [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
    ];

    var Z = [
        [6, 6, 0],
        [0, 6, 6],
        [0, 0, 0]
    ];

    var T = [
        [7, 7, 7],
        [0, 7, 0],
        [0, 0, 0]
    ]*/

    this.getBlock = function (type) {

        switch (type) {
            case 'I':
                return ([               //stałe niezmienne wzory bloczków
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0]
                ]);
                break;
            case 'J':
                return [
                    [0, 2, 0],
                    [0, 2, 0],
                    [2, 2, 0]
                ];
                break;
            case 'L':
                return [
                    [0, 3, 0],
                    [0, 3, 0],
                    [0, 3, 3]
                ];
                break;
            case 'S':
                return [
                    [0, 5, 5],
                    [5, 5, 0],
                    [0, 0, 0]
                ];
                break;
            case 'Z':
                return [
                    [6, 6, 0],
                    [0, 6, 6],
                    [0, 0, 0]
                ];
                break;
            case 'T':
                return [
                    [7, 7, 7],
                    [0, 7, 0],
                    [0, 0, 0]
                ];
                break;
            case 'O':
                return [
                    [4, 4],
                    [4, 4]
                ];
                break;
        }
    }




}