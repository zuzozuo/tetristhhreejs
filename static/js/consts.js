//STAŁE GLOBALNE

var MAP_HEIGHT = 22, //wysokość w kafelkach
    MAP_WIDTH = 10, //szerokość w kafelkach
    STATE_GET_RANDOM_BLOCK = 1, //stan losowania klocka
    STATE_FALLING_BLOCK = 2, //stan upadania klocka
    STATE_FALLEN_BLOCK = 3, //stan upadłego klocka (klocek spadł i nie może sie ruszyć)
    STATE_GAME_OVER = 4, //stan końca gry (nie ma miejsca na klocki)
    FALLING_SPEED = 10, //prędkość spadania
    KEY_RIGHT = 39, //klawisze
    KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_DOWN = 40,
    BLOCK_TYPES = 'TLJOZSI',
    POS_Z = -10,  //pozycja Z
    GLOBAL_STATE_LOSE = 0,
    GLOBAL_STATE_STOP = 1,
    GLOBAL_STATE_PLAY = 2,
    MAP_POS_X = -30,
    MAP_POS_Y = -100